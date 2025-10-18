'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    terms: false,
    privacy: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState('en');
  const router = useRouter();

  const t = translations[lang];

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.phone || !form.terms || !form.privacy)
      return setError(t.errorRequired);

    setLoading(true);
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      router.push('/thank-you');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      {/* 🌐 Language Toggle */}
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

      {/* 🎟️ Form Card */}
      <div className="card">
        <h1>🎉 {t.title}</h1>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-group">
            <input
              type="text"
              placeholder=" "
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
            />
            <label>{t.fullName}</label>
          </div>

          {/* Phone */}
          <div className="form-group">
            <input
              type="text"
              placeholder=" "
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              required
            />
            <label>{t.phone}</label>
          </div>

          {/* Checkboxes */}
         <div className="checkboxes">
  <label>
    <input
      type="checkbox"
      checked={form.terms}
      onChange={e => setForm({ ...form, terms: e.target.checked })}
    />{' '}
    {t.acceptTerms}{' '}
    <a
      href="/"
      // target="_blank"
      rel="noopener noreferrer"
      style={{
        color: '#ddd',
        textDecoration: 'none',
        marginLeft:0,
        display: 'inline-block',
        // transform : 'rotate(-45deg)'
      }}
     onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
      onMouseLeave={e => e.currentTarget.style.color = '#ddd'}
    >
      {t.termsLink} 🔗
    </a>
  </label>

  <label>
    <input
      type="checkbox"
      checked={form.privacy}
      onChange={e => setForm({ ...form, privacy: e.target.checked })}
    />{' '}
    {t.acceptPrivacy}{' '}
    <a
      href="/"
      // target="_blank"
      rel="noopener noreferrer"
      style={{
        color: '#ddd',
        textDecoration: 'none',
        marginLeft: 0,
        display: 'inline-block',
          // transform : 'rotate(-45deg)'
      }}
      onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
      onMouseLeave={e => e.currentTarget.style.color = '#ddd'}
    >
      {t.privacyLink} 🔗
    </a>
  </label>
</div>



          {/* Error */}
          {error && <div className="error">{error}</div>}

          {/* Submit Button */}
          <button className="btn" type="submit" disabled={loading}>
            {loading ? t.submitting : t.enterDraw}
          </button>

          {/* <p className="small">{t.notice}</p> */}
        </form>
      </div>
    </div>
  );
}

const translations = {
  en: {
    title: 'Join the Lottery Draw!',
    fullName: 'Full Name',
    phone: 'WhatsApp Number',
    acceptTerms: 'I accept Terms & Conditions',
    acceptPrivacy: 'I accept Privacy Policy',
    errorRequired: 'Please fill required fields',
    enterDraw: 'Enter the Draw',
    submitting: 'Submitting...',
    notice: 'Winners are picked every Friday at 6PM 🎊',
  },
  ru: {
    title: 'Присоединяйтесь к розыгрышу лотереи!',
    fullName: 'ФИО',
    phone: 'Номер WhatsApp',
    acceptTerms: 'Я принимаю Условия использования',
    acceptPrivacy: 'Я принимаю Политику конфиденциальности',
    errorRequired: 'Пожалуйста, заполните обязательные поля',
    enterDraw: 'Принять участие',
    submitting: 'Отправка...',
    notice: 'Победители выбираются каждую пятницу в 18:00 🎊',
  },
};
