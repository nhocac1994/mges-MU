'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Account {
  username: string;
  characterName: string;
  email: string;
  createdDate: string | null;
  blockStatus: number;
  accountLevel: number;
}

export default function AdminAccounts() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState('');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const userData = localStorage.getItem('user_data');
        
        if (!token || !userData) {
          router.push('/login');
          return;
        }

        const userObj = JSON.parse(userData);
        const accountId = userObj.Username || userObj.username || userObj.memb___id;
        
        if (!accountId || userObj.AccountLevel < 11) {
          alert('Bạn không có quyền truy cập');
          router.push('/dashboard');
          return;
        }

        setUser(userObj);
        setLoading(false);
        fetchAccounts(accountId, 1, '');
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  const fetchAccounts = async (accountId: string, currentPage: number, searchTerm: string) => {
    try {
      const params = new URLSearchParams({
        accountId,
        page: currentPage.toString(),
        pageSize: pageSize.toString(),
      });
      if (searchTerm) params.append('search', searchTerm);

      const response = await fetch(`/api/admin/accounts?${params.toString()}`);
      const result = await response.json();

      if (result.success) {
        setAccounts(result.data.accounts || []);
        setTotalPages(result.data.totalPages || 1);
        setTotalCount(result.data.totalCount || 0);
      }
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };

  const handleSearch = () => {
    const accountId = user?.Username || user?.username || user?.memb___id;
    if (accountId) {
      setPage(1);
      fetchAccounts(accountId, 1, search);
    }
  };

  const handleBlock = async (targetAccountId: string, block: boolean) => {
    if (!confirm(block ? 'Bạn có chắc muốn block tài khoản này?' : 'Bạn có chắc muốn unblock tài khoản này?')) {
      return;
    }

    try {
      const accountId = user?.Username || user?.username || user?.memb___id;
      const response = await fetch(`/api/admin/accounts/${targetAccountId}/block?accountId=${accountId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ block }),
      });

      const result = await response.json();
      if (result.success) {
        alert(result.message);
        fetchAccounts(accountId, page, search);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error blocking account:', error);
      alert('Có lỗi xảy ra');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-xl">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Quản Lý Tài Khoản</h1>
            <p className="text-gray-300">Tổng số: {totalCount} tài khoản</p>
          </div>
          <Link href="/admin" className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
            ← Về Dashboard
          </Link>
        </div>

        {/* Search */}
        <div className="mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Tìm kiếm (username, email, character name)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 p-3 bg-black bg-opacity-70 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400"
          />
          <button
            onClick={handleSearch}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg"
          >
            Tìm kiếm
          </button>
        </div>

        {/* Table */}
        <div className="bg-black bg-opacity-70 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-white">Username</th>
                  <th className="px-4 py-3 text-left text-white">Character Name</th>
                  <th className="px-4 py-3 text-left text-white">Email</th>
                  <th className="px-4 py-3 text-left text-white">Created Date</th>
                  <th className="px-4 py-3 text-left text-white">Status</th>
                  <th className="px-4 py-3 text-left text-white">Level</th>
                  <th className="px-4 py-3 text-left text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account, index) => (
                  <tr key={index} className="border-t border-gray-700 hover:bg-gray-800">
                    <td className="px-4 py-3 text-white">{account.username}</td>
                    <td className="px-4 py-3 text-gray-300">{account.characterName || '-'}</td>
                    <td className="px-4 py-3 text-gray-300">{account.email || '-'}</td>
                    <td className="px-4 py-3 text-gray-300">
                      {account.createdDate ? new Date(account.createdDate).toLocaleDateString('vi-VN') : '-'}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded ${account.blockStatus === 1 ? 'bg-red-500' : 'bg-green-500'} text-white text-sm`}>
                        {account.blockStatus === 1 ? 'Blocked' : 'Active'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-300">{account.accountLevel}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleBlock(account.username, account.blockStatus === 0)}
                        className={`px-3 py-1 rounded text-sm ${
                          account.blockStatus === 1
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-red-500 hover:bg-red-600 text-white'
                        }`}
                      >
                        {account.blockStatus === 1 ? 'Unblock' : 'Block'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-4 py-4 flex justify-between items-center border-t border-gray-700">
              <button
                onClick={() => {
                  const newPage = page - 1;
                  if (newPage >= 1) {
                    setPage(newPage);
                    const accountId = user?.Username || user?.username || user?.memb___id;
                    if (accountId) fetchAccounts(accountId, newPage, search);
                  }
                }}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
              >
                ← Trước
              </button>
              <span className="text-white">
                Trang {page} / {totalPages}
              </span>
              <button
                onClick={() => {
                  const newPage = page + 1;
                  if (newPage <= totalPages) {
                    setPage(newPage);
                    const accountId = user?.Username || user?.username || user?.memb___id;
                    if (accountId) fetchAccounts(accountId, newPage, search);
                  }
                }}
                disabled={page === totalPages}
                className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
              >
                Sau →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

