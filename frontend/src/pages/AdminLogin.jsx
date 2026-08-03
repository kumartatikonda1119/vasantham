import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('https://vasanthambackend.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('vasantham_token', data.token);
      localStorage.setItem('vasantham_admin', data.username);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-[#F6EEDF]">
      <div className="bg-[#F8F1E4] rounded-3xl p-8 max-w-md w-full border border-[#E6D7BD] shadow-xl text-center">
        
        {/* Header */}
        <h2 className="font-serif text-3xl font-bold text-[#3B6533] mb-1">
          వసంతం – నిర్వహణ
        </h2>
        <p className="font-sans text-xs text-[#A08530] font-medium tracking-wider mb-6">
          ADMINISTRATOR LOGIN
        </p>

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2.5 rounded-xl text-xs font-medium mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4 text-left">
          <div>
            <label className="block text-xs font-semibold text-[#5C4328] mb-1">
              యూజర్ నేమ్ (Username)
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#D8C6A5] bg-[#FDF8EF] text-[#4A3520] focus:outline-none focus:ring-2 focus:ring-[#3B6533] text-sm"
              placeholder="admin"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#5C4328] mb-1">
              పాస్‌వర్డ్ (Password)
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#D8C6A5] bg-[#FDF8EF] text-[#4A3520] focus:outline-none focus:ring-2 focus:ring-[#3B6533] text-sm"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#3B6533] text-[#F5EBDC] font-semibold text-sm hover:bg-[#2F5228] transition-colors mt-2 shadow-md disabled:opacity-50"
          >
            {loading ? 'ప్రవేశిస్తున్నారు...' : 'లాగిన్ (Login)'}
          </button>
        </form>

      </div>
    </div>
  );
};

export default AdminLogin;
