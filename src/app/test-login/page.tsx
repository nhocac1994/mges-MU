'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Account {
  AccountID: string;
  CharacterName: string;
  cLevel: number;
  Class: number;
  Money: number;
  ResetCount: number;
  MasterResetCount: number;
  memb_name: string;
  mail_addr: string;
  bloc_code: string;
}

export default function TestLogin() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await fetch('/api/accounts');
      const result = await response.json();
      
      if (result.success) {
        setAccounts(result.data.accounts);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching accounts:', error);
      setLoading(false);
    }
  };

  const loginAsAccount = (account: Account) => {
    // Tạo token và user data giả
    const token = 'temp_token_' + Date.now();
    const userData = {
      memb___id: account.AccountID,
      memb_name: account.memb_name
    };

    // Lưu vào localStorage
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_data', JSON.stringify(userData));

    // Redirect to dashboard
    router.push('/dashboard');
  };

  const getClassName = (classId: number): string => {
    const classNames: { [key: number]: string } = {
      0: 'Dark Wizard',
      1: 'Soul Master', 
      16: 'Dark Knight',
      17: 'Blade Knight',
      32: 'Fairy Elf',
      33: 'Muse Elf',
      48: 'Magic Gladiator',
      64: 'Dark Lord',
      65: 'Lord Emperor',
      80: 'Summoner',
      81: 'Bloody Summoner',
      96: 'Rage Fighter',
      97: 'Fist Master'
    };
    return classNames[classId] || `Class ${classId}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Đang tải danh sách account...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image 
              src="/icon.jpg" 
              alt="Mu Online Logo" 
              width={40} 
              height={40}
              className="rounded-lg"
            />
            <h1 className="text-2xl font-bold">Test Login - MuOnline</h1>
          </div>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
          >
            Về trang chủ
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">Chọn Account để Test</h2>
          <p className="text-gray-300">Click vào account để đăng nhập và xem dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map((account, index) => (
            <div
              key={index}
              onClick={() => loginAsAccount(account)}
              className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg cursor-pointer transition-colors border border-gray-600 hover:border-blue-500"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-bold text-blue-400">{account.CharacterName}</h3>
                  <p className="text-sm text-gray-400">Account: {account.AccountID}</p>
                </div>
                <div className="text-right">
                  <div className="text-yellow-400 font-bold">Level {account.cLevel}</div>
                  <div className="text-xs text-gray-400">{getClassName(account.Class)}</div>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Reset:</span>
                  <span className="text-green-400 font-semibold">{account.ResetCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Master Reset:</span>
                  <span className="text-purple-400 font-semibold">{account.MasterResetCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Money:</span>
                  <span className="text-yellow-400 font-semibold">
                    {account.Money.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Email:</span>
                  <span className="text-gray-300 text-xs truncate max-w-32">
                    {account.mail_addr || 'N/A'}
                  </span>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-600">
                <div className="text-xs text-gray-500">
                  Status: {account.bloc_code === '0' ? 'Active' : 'Blocked'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {accounts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-xl">Không tìm thấy account nào</div>
          </div>
        )}
      </div>
    </div>
  );
}
