'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState('en'); // language state
  const router = useRouter();

  const t = translations[lang];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push('/admin/dashboard');
      } else {
        setError(data.error || t.loginFailed);
      }
    } catch (err) {
      setError(t.somethingWrong);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      fontFamily: "'Poppins', sans-serif",
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
      padding: 30,
      color: '#fff',
      flexDirection: 'column',
      gap: '20px'
    }}>
      {/* Language Toggle */}
      <div className="lang-toggle">
          <button
            onClick={() => setLang('en')}
            style={{
              background: lang === 'en' ? '#f5c400' : 'transparent',
              color: lang === 'en' ? '#000' : '#fff',
            }}
          >
            EN
          </button>
          <button
            onClick={() => setLang('ru')}
            style={{
              background: lang === 'ru' ? '#f5c400' : 'transparent',
              color: lang === 'ru' ? '#000' : '#fff',
            }}
          >
            RU
          </button>
        </div>

      <div style={{
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(16px)',
        padding: 36,
        borderRadius: 16,
        maxWidth: 510,
        width: '100%',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.35)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        textAlign: 'center',
        animation: 'fadeIn 0.8s ease'
      }}>
        <h2 style={{ color: '#ffd700', marginBottom: 12 }}>🎯 {t.adminPanel}</h2>
        <p style={{ color: '#ccc', marginBottom: 24, fontSize: 14 }}>{t.adminInfo}</p>

        {error && <div style={{ color: '#ff4f4f', marginBottom: 16, fontWeight: 'bold' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Username */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder=" "
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: 10,
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#fff',
                fontSize: '1rem'
              }}
            />
            <label style={{
              position: 'absolute',
              left: 16,
              top: username ? -10 : '50%',
              transform: username ? 'translateY(0)' : 'translateY(-50%)',
              fontSize: username ? '0.75rem' : '0.9rem',
              color: username ? '#ffd700' : '#ccc',
              padding: '0 6px',
              transition: '0.3s ease',
              pointerEvents: 'none'
            }}>{t.username}</label>
          </div>

          {/* Password */}
          <div style={{ position: 'relative' }}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: 10,
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#fff',
                fontSize: '1rem'
              }}
            />
            <label style={{
              position: 'absolute',
              left: 16,
              top: password ? -10 : '50%',
              transform: password ? 'translateY(0)' : 'translateY(-50%)',
              fontSize: password ? '0.75rem' : '0.9rem',
              color: password ? '#ffd700' : '#ccc',
              padding: '0 6px',
              transition: '0.3s ease',
              pointerEvents: 'none'
            }}>{t.password}</label>
          </div>

          <button type="submit" style={{
            width: '100%',
            padding: 14,
            fontSize: '1rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #ffd700, #ffb700)',
            color: '#000',
            border: 'none',
            borderRadius: 10,
            cursor: 'pointer',
            transition: 'background 0.3s ease'
          }} disabled={loading}>
            {loading ? t.loggingIn : t.login}
          </button>
        </form>

        <p style={{ marginTop: 28, fontSize: 12, color: '#bbb' }}>
          🚫 <span style={{ color: '#ffd700' }}>{t.authOnly}</span>
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

const translations = {
  en: {
    adminPanel: 'Admin Panel',
    adminInfo: 'Manage Draws, Participants, Winners & Reports',
    username: 'Username',
    password: 'Password',
    login: 'Login',
    loggingIn: 'Logging in...',
    loginFailed: 'Login failed',
    somethingWrong: 'Something went wrong',
    authOnly: 'Authorized personnel only. All login attempts are monitored.'
  },
  ru: {
    adminPanel: 'Панель Администратора',
    adminInfo: 'Управляйте розыгрышами, участниками, победителями и отчетами',
    username: 'Имя пользователя',
    password: 'Пароль',
    login: 'Войти',
    loggingIn: 'Вход...',
    loginFailed: 'Не удалось войти',
    somethingWrong: 'Произошла ошибка',
    authOnly: 'Только для авторизованных пользователей. Все попытки входа отслеживаются.'
  }
};
