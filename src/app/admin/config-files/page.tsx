'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ConfigFile {
  fileName: string;
  content: any;
  isJson: boolean;
}

export default function AdminConfigFiles() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<string>('config.json');
  const [fileContent, setFileContent] = useState<string>('');
  const [isJson, setIsJson] = useState(false);
  const [files, setFiles] = useState<string[]>(['config.json', 'event.txt', 'urldownload.txt']);

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
        loadFile(accountId, selectedFile);
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router, selectedFile]);

  const loadFile = async (accountId: string, fileName: string) => {
    try {
      const response = await fetch(`/api/config-files/${fileName}?accountId=${accountId}`);
      const result = await response.json();

      if (result.success && result.data) {
        setIsJson(result.data.isJson || fileName.endsWith('.json'));
        if (result.data.isJson) {
          setFileContent(JSON.stringify(result.data.content, null, 2));
        } else {
          setFileContent(typeof result.data.content === 'string' 
            ? result.data.content 
            : JSON.stringify(result.data.content, null, 2));
        }
      }
    } catch (error) {
      console.error('Error loading file:', error);
    }
  };

  const handleSave = async () => {
    if (!confirm('Bạn có chắc muốn lưu file này?')) {
      return;
    }

    try {
      setSaving(true);
      const accountId = user?.Username || user?.username || user?.memb___id;
      
      let contentToSave: any = fileContent;
      if (isJson) {
        try {
          contentToSave = JSON.parse(fileContent);
        } catch (e) {
          alert('JSON không hợp lệ! Vui lòng kiểm tra lại.');
          setSaving(false);
          return;
        }
      }

      const response = await fetch(`/api/config-files/${selectedFile}?accountId=${accountId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contentToSave),
      });

      const result = await response.json();
      if (result.success) {
        alert('Lưu file thành công!');
      } else {
        alert(result.message || 'Có lỗi xảy ra');
      }
    } catch (error) {
      console.error('Error saving file:', error);
      alert('Có lỗi xảy ra khi lưu file');
    } finally {
      setSaving(false);
    }
  };

  const handleFileChange = (fileName: string) => {
    setSelectedFile(fileName);
    const accountId = user?.Username || user?.username || user?.memb___id;
    if (accountId) {
      loadFile(accountId, fileName);
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
            <h1 className="text-4xl font-bold text-white mb-2">Quản Lý Config Files</h1>
            <p className="text-gray-300">Quản lý các file cấu hình: config.json, event.txt, urldownload.txt</p>
          </div>
          <Link href="/admin" className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
            ← Về Dashboard
          </Link>
        </div>

        {/* File Selector */}
        <div className="mb-6 bg-black bg-opacity-70 rounded-lg p-4">
          <label className="block text-white mb-2">Chọn file:</label>
          <div className="flex gap-4 flex-wrap">
            {files.map((file) => (
              <button
                key={file}
                onClick={() => handleFileChange(file)}
                className={`px-4 py-2 rounded ${
                  selectedFile === file
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {file}
              </button>
            ))}
          </div>
        </div>

        {/* Editor */}
        <div className="bg-black bg-opacity-70 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Nội dung: {selectedFile}</h2>
            <span className="text-gray-400 text-sm">
              {isJson ? 'JSON Format' : 'Text Format'}
            </span>
          </div>
          
          <textarea
            value={fileContent}
            onChange={(e) => setFileContent(e.target.value)}
            className="w-full h-96 p-4 bg-gray-900 text-white font-mono text-sm border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400"
            placeholder={isJson ? 'Nhập JSON...' : 'Nhập nội dung...'}
          />

          {isJson && (
            <div className="mt-2 text-yellow-400 text-sm">
              💡 Tip: File JSON sẽ được format tự động khi lưu
            </div>
          )}

          {selectedFile === 'event.txt' && (
            <div className="mt-4 p-4 bg-blue-900 bg-opacity-50 rounded text-sm text-gray-300">
              <strong>Format cho event.txt:</strong>
              <pre className="mt-2">
{`# Format: EventName|Description|TimeSlots
# TimeSlots: Danh sách giờ cách nhau bởi dấu phẩy (HH:mm)
EventName|Description|0:00,2:00,4:00,6:00,8:00,10:00,12:00,14:00,16:00,18:00,20:00,22:00

# Ví dụ:
DoubleExp|Sự kiện EXP x2|0:00,2:00,4:00,6:00,8:00,10:00,12:00,14:00,16:00,18:00,20:00,22:00
DoubleDrop|Sự kiện Drop x2|1:00,3:00,5:00,7:00,9:00,11:00,13:00,15:00,17:00,19:00,21:00,23:00`}
              </pre>
            </div>
          )}

          {selectedFile === 'urldownload.txt' && (
            <div className="mt-4 p-4 bg-blue-900 bg-opacity-50 rounded text-sm text-gray-300">
              <strong>Format cho urldownload.txt:</strong>
              <pre className="mt-2">
{`# Format: Type|URL
# Type: mega, media, launcher
mega|https://mega.nz/file/xxxxx
media|https://mediafire.com/file/xxxxx
launcher|https://example.com/download/Launcher.exe`}
              </pre>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <button
            onClick={() => {
              const accountId = user?.Username || user?.username || user?.memb___id;
              if (accountId) loadFile(accountId, selectedFile);
            }}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
          >
            🔄 Tải Lại
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg disabled:opacity-50"
          >
            {saving ? 'Đang lưu...' : '💾 Lưu File'}
          </button>
        </div>
      </div>
    </div>
  );
}

