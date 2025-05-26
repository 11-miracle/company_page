'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Blacklist() {
  const [username, setUsername] = useState('');
  const [reason, setReason] = useState('');
  const [blacklist, setBlacklist] = useState([]);
  const [message, setMessage] = useState('');
  const router = useRouter();

  // Fetch blacklist data
  const fetchBlacklist = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/blacklist');
      if (response.data.success) {
        setBlacklist(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching blacklist:', error);
    }
  };

  // Add to blacklist
  const addToBlacklist = async () => {
    if (!username || !reason) {
      setMessage('请填写用户名和原因');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/blacklist', {
        username,
        reason
      });
      
      if (response.data.success) {
        setMessage('添加成功');
        setUsername('');
        setReason('');
        fetchBlacklist();
      } else {
        setMessage(response.data.message || '添加失败');
      }
    } catch (error) {
      console.error('Error adding to blacklist:', error);
      setMessage('添加出错');
    }
  };

  // Remove from blacklist
  const removeFromBlacklist = async (username) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/blacklist/${username}`);
      if (response.data.success) {
        setMessage('移除成功');
        fetchBlacklist();
      } else {
        setMessage('移除失败');
      }
    } catch (error) {
      console.error('Error removing from blacklist:', error);
      setMessage('移除出错');
    }
  };

  // Initial fetch
  useState(() => {
    fetchBlacklist();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">黑名单管理</h2>
      
      <div className="mb-4">
        <button
          onClick={() => router.push('/page/home')}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 mr-4"
        >
          返回首页
        </button>
      </div>
      
      {/* Add to Blacklist Form */}
      <div className="mb-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2">用户名</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="输入用户名"
            />
          </div>
          <div>
            <label className="block mb-2">原因</label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="输入原因"
            />
          </div>
        </div>
        <button
          onClick={addToBlacklist}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          添加到黑名单
        </button>
      </div>
      
      {/* Message */}
      {message && (
        <div className="mb-4 p-2 bg-blue-100 text-blue-800 rounded">
          {message}
        </div>
      )}
      
      {/* Blacklist Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="border px-4 py-2">用户名</th>
              <th className="border px-4 py-2">原因</th>
              <th className="border px-4 py-2">操作</th>
            </tr>
          </thead>
          <tbody>
            {blacklist.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.username}</td>
                <td className="border px-4 py-2">{item.reason}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => removeFromBlacklist(item.username)}
                    className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                  >
                    移除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}