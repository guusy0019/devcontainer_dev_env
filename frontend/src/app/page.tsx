'use client';

import { useEffect, useState } from 'react';
import { User } from '../types/user';
import { getUsers, createUser } from '../api/users';

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser(name, email);
      setName('');
      setEmail('');
      fetchUsers();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">ユーザー一覧</h1>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="名前"
            className="border p-2 rounded"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="メールアドレス"
            className="border p-2 rounded"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            追加
          </button>
        </div>
      </form>

      <div className="grid gap-4">
        {users.map((user) => (
          <div key={user.id} className="border p-4 rounded">
            <p className="font-bold">{user.name}</p>
            <p className="text-gray-600">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
