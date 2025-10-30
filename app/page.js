'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function HomePage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    countryCode: '+971',
    terms: false,
    privacy: true,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState('en');
  const [submitted, setSubmitted] = useState(false);
  const [customerId, setCustomerId] = useState('');

  const t = translations[lang];

  // ✅ WhatsApp validation helper
  const validatePhone = (num) => {
    const cleaned = num.replace(/\D/g, '');
    return cleaned.length >= 9 && cleaned.length <= 11;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.phone || !form.terms || !form.privacy)
      return setError(t.errorRequired);

    if (!validatePhone(form.phone))
      return setError(t.errorInvalidPhone);

    setLoading(true);
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          phone: `${form.countryCode}${form.phone.replace(/\D/g, '')}`,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // ✅ Set success
      setSubmitted(true);

      // ✅ Extract customer ID from cookie
      const match = document.cookie.match(/(^| )lottery_user=([^;]+)/);
      if (match) setCustomerId(match[2]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // ✅ If submitted, show Thank You section
  if (submitted) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#0f0f0f',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          fontFamily: "'Poppins', sans-serif",
          padding: 20,
        }}
      >
        {/* Language Toggle */}
        <div className="lang-toggle" style={{ marginBottom: 20 }}>
          <button
            onClick={() => setLang('en')}
            style={{
              background: lang === 'en' ? '#d6af66' : 'transparent',
              color: lang === 'en' ? '#000' : '#fff',
              marginRight: 8,
            }}
          >
            EN
          </button>
          <button
            onClick={() => setLang('ru')}
            style={{
              background: lang === 'ru' ? '#d6af66' : 'transparent',
              color: lang === 'ru' ? '#000' : '#fff',
            }}
          >
            RU
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Image src="/logo.PNG" alt="Logo" width={230} height={230} priority />
        </div>

        <h1 style={{ fontSize: '2.2rem', color: '#d6af66', marginBottom: 10 }} className='thank-title'>
          🎉 {t.thankYou}
        </h1>
        <p style={{ fontSize: '1rem', color: '#ccc', maxWidth: 500 }} className='font2'>
          {t.success}
        </p>

        {customerId ? (
          <p style={{ marginTop: 20, fontSize: '1.2rem', color: '#d6af66' }} className='font2'>
            {t.customerId}: <strong>{customerId}</strong>
          </p>
        ) : (
          <p style={{ marginTop: 20, color: '#aaa' }}>{t.loading}</p>
        )}
      </div>
    );
  }

  // ✅ Otherwise, show registration form
  return (
    <div className="container">
      {/* 🌐 Language Toggle */}
      <div className="lang-toggle">
        <button
          onClick={() => setLang('en')}
          style={{
            background: lang === 'en' ? '#d6af66' : 'transparent',
            color: lang === 'en' ? '#000' : '#fff',
          }}
        >
          EN
        </button>
        <button
          onClick={() => setLang('ru')}
          style={{
            background: lang === 'ru' ? '#d6af66' : 'transparent',
            color: lang === 'ru' ? '#000' : '#fff',
          }}
        >
          RU
        </button>
      </div>

      {/* 🎟️ Registration Card */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          maxWidth: 600,
          width: '100%',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Image src="/logo.PNG" alt="Logo" width={230} height={230} className="logo" priority />
        </div>

        <div className="card">
          <h1 className="title">🎉 {t.title}</h1>
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="form-group font2">
              <input
                type="text"
                placeholder=" "
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="font2"
              />
              <label className="font2 name-label">{t.fullName}</label>
            </div>

            {/* Phone */}
            <div className="form-group phone-input">
              <div className="phone-wrapper">
                <select
                  value={form.countryCode || '+971'}
                  onChange={(e) => setForm({ ...form, countryCode: e.target.value })}
                  className="country-select font2"
                >
                  <option value="+971">🇦🇪 +971 UAE</option>
                  <option value="+91">🇮🇳 +91 India</option>
                  <option value="+7">🇷🇺 +7 Russia</option>
                  <option value="+44">🇬🇧 +44 UK</option>
                  <option value="+1">🇺🇸 +1 USA</option>
                </select>
                <input
                  type="text"
                  placeholder=" "
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                  className="font2"
                />
                <label className="phone-label font2">{t.phone}</label>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="checkboxes">
              <label className="font2">
                <input
                  type="checkbox"
                  checked={form.terms}
                  onChange={(e) => setForm({ ...form, terms: e.target.checked })}
                />{' '}
                <span className="text-desktop">
                  I have read and agree to the{' '}
                  <a href="https://www.doremi.art/terms-and-conditions" target="_blank" className="link-text">
                    Terms & Conditions
                  </a>.
                </span>
                <span className="text-mobile">
                  I accept the{' '}
                  <a href="https://www.doremi.art/terms-and-conditions" target="_blank" className="link-text">
                    Terms & Conditions
                  </a>.
                </span>
              </label>
            </div>

            {error && <div className="error">{error}</div>}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
              <button className="btn" type="submit" disabled={loading}>
                {loading ? t.submitting : t.enterDraw}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// ✅ Translations (merged both page texts)
const translations = {
  en: {
    title: 'Join the Lottery Draw!',
    fullName: 'Full Name',
    phone: 'WhatsApp Number',
    errorRequired: 'Please fill all required fields',
    errorInvalidPhone: 'Please enter a valid WhatsApp number',
    enterDraw: 'Enter the Draw',
    submitting: 'Submitting...',
    thankYou: 'Thank You for Registering!',
    success: 'Your entry has been successfully submitted. Winners will be announced soon!',
    customerId: 'Your Customer ID',
    loading: 'Loading your details...',
  },
  ru: {
    title: 'Присоединяйтесь к розыгрышу призов!',
    fullName: 'ФИО',
    phone: 'Номер WhatsApp',
    errorRequired: 'Пожалуйста, заполните обязательные поля',
    errorInvalidPhone: 'Введите действительный номер WhatsApp',
    enterDraw: 'Принять участие',
    submitting: 'Отправка...',
    thankYou: 'Спасибо за регистрацию!',
    success: 'Ваша заявка успешно отправлена. Победители будут объявлены в ближайшее время!',
    customerId: 'Ваш идентификатор клиента',
    loading: 'Загрузка ваших данных...',
  },
};
