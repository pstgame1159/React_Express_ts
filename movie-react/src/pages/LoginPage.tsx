import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useAuthStore } from '../stores';
import Button from '../components/ui/Button';

const LoginPage = observer(() => {
  const auth = useAuthStore();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await auth.login(username, password);
      navigate('/movies');
    } catch {
    }
  };

  const inputBase = 'w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition';

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-8 py-10 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-8">ระบบจัดการภาพยนตร์</h1>
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">ชื่อผู้ใช้</label>
            <input
              className={inputBase}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">รหัสผ่าน</label>
            <input
              className={inputBase}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          {auth.error && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-100">
              {auth.error}
            </p>
          )}
          <Button type="submit" loading={auth.loading} className="w-full justify-center">
            เข้าสู่ระบบ
          </Button>
        </form>
      </div>
    </div>
  );
});

export default LoginPage;
