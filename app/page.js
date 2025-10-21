'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';



export default function HomePage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    countryCode: '+91',
    terms: false,
    privacy: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState('en');
  const router = useRouter();

  const t = translations[lang];

 // ✅ WhatsApp validation helper (10–11 digits only)
const validatePhone = (num) => {
  const cleaned = num.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 11;
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
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <label>{t.fullName}</label>
          </div>

          {/* WhatsApp Number with Country Code */}
   {/* Phone */}
<div className="form-group phone-input">
  <div className="phone-wrapper">
    <select
      value={form.countryCode || '+91'}
      onChange={e => setForm({ ...form, countryCode: e.target.value })}
      className="country-select"
    >
     <option value="+93">🇦🇫 +93 &nbsp;&nbsp;&nbsp;Afghanistan</option>
  <option value="+355">🇦🇱 +355 &nbsp;Albania</option>
  <option value="+213">🇩🇿 +213 &nbsp;Algeria</option>
  <option value="+376">🇦🇩 +376 &nbsp;Andorra</option>
  <option value="+244">🇦🇴 +244 &nbsp;Angola</option>
  <option value="+54">🇦🇷 +54 &nbsp;&nbsp;&nbsp;Argentina</option>
  <option value="+374">🇦🇲 +374 &nbsp;Armenia</option>
  <option value="+43">🇦🇹 +43 &nbsp;&nbsp;&nbsp;Austria</option>
  <option value="+994">🇦🇿 +994 &nbsp;Azerbaijan</option>
  <option value="+973">🇧🇭 +973 &nbsp;Bahrain</option>
  <option value="+880">🇧🇩 +880 &nbsp;Bangladesh</option>
  <option value="+375">🇧🇾 +375 &nbsp;Belarus</option>
  <option value="+32">🇧🇪 +32 &nbsp;&nbsp;&nbsp;Belgium</option>
  <option value="+591">🇧🇴 +591 &nbsp;Bolivia</option>
  <option value="+387">🇧🇦 +387 &nbsp;Bosnia and Herzegovina</option>
  <option value="+55">🇧🇷 +55 &nbsp;&nbsp;&nbsp;Brazil</option>
  <option value="+359">🇧🇬 +359 &nbsp;Bulgaria</option>
  <option value="+226">🇧🇫 +226 &nbsp;Burkina Faso</option>
  <option value="+257">🇧🇮 +257 &nbsp;Burundi</option>
  <option value="+855">🇰🇭 +855 &nbsp;Cambodia</option>
  <option value="+237">🇨🇲 +237 &nbsp;Cameroon</option>
  <option value="+1">🇨🇦 +1 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Canada</option>
  <option value="+236">🇨🇫 +236 &nbsp;Central African Republic</option>
  <option value="+235">🇹🇩 +235 &nbsp;Chad</option>
  <option value="+56">🇨🇱 +56 &nbsp;&nbsp;&nbsp;Chile</option>
  <option value="+86">🇨🇳 +86 &nbsp;&nbsp;&nbsp;China</option>
  <option value="+57">🇨🇴 +57 &nbsp;&nbsp;&nbsp;Colombia</option>
  <option value="+269">🇰🇲 +269 &nbsp;Comoros</option>
  <option value="+243">🇨🇩 +243 &nbsp;Congo (DRC)</option>
  <option value="+242">🇨🇬 +242 &nbsp;Congo (Republic)</option>
  <option value="+682">🇨🇰 +682 &nbsp;Cook Islands</option>
  <option value="+506">🇨🇷 +506 &nbsp;Costa Rica</option>
  <option value="+225">🇨🇮 +225 &nbsp;Côte d’Ivoire</option>
  <option value="+385">🇭🇷 +385 &nbsp;Croatia</option>
  <option value="+53">🇨🇺 +53 &nbsp;&nbsp;&nbsp;Cuba</option>
  <option value="+357">🇨🇾 +357 &nbsp;Cyprus</option>
  <option value="+420">🇨🇿 +420 &nbsp;Czech Republic</option>
  <option value="+45">🇩🇰 +45 &nbsp;&nbsp;&nbsp;Denmark</option>
  <option value="+253">🇩🇯 +253 &nbsp;Djibouti</option>
  <option value="+20">🇪🇬 +20 &nbsp;&nbsp;&nbsp;Egypt</option>
  <option value="+503">🇸🇻 +503 &nbsp;El Salvador</option>
  <option value="+240">🇬🇶 +240 &nbsp;Equatorial Guinea</option>
  <option value="+291">🇪🇷 +291 &nbsp;Eritrea</option>
  <option value="+372">🇪🇪 +372 &nbsp;Estonia</option>
  <option value="+251">🇪🇹 +251 &nbsp;Ethiopia</option>
  <option value="+298">🇫🇴 +298 &nbsp;Faroe Islands</option>
  <option value="+679">🇫🇯 +679 &nbsp;Fiji</option>
  <option value="+358">🇫🇮 +358 &nbsp;Finland</option>
  <option value="+33">🇫🇷 +33 &nbsp;&nbsp;&nbsp;France</option>
  <option value="+594">🇬🇫 +594 &nbsp;French Guiana</option>
  <option value="+689">🇵🇫 +689 &nbsp;French Polynesia</option>
  <option value="+241">🇬🇦 +241 &nbsp;Gabon</option>
  <option value="+220">🇬🇲 +220 &nbsp;Gambia</option>
  <option value="+995">🇬🇪 +995 &nbsp;Georgia</option>
  <option value="+49">🇩🇪 +49 &nbsp;&nbsp;&nbsp;Germany</option>
  <option value="+233">🇬🇭 +233 &nbsp;Ghana</option>
  <option value="+350">🇬🇮 +350 &nbsp;Gibraltar</option>
  <option value="+30">🇬🇷 +30 &nbsp;&nbsp;&nbsp;Greece</option>
  <option value="+299">🇬🇱 +299 &nbsp;Greenland</option>
  <option value="+502">🇬🇹 +502 &nbsp;Guatemala</option>
  <option value="+44">🇬🇧 +44 &nbsp;&nbsp;&nbsp;United Kingdom</option>
  <option value="+240">🇬🇶 +240 &nbsp;Equatorial Guinea</option>
  <option value="+224">🇬🇳 +224 &nbsp;Guinea</option>
  <option value="+245">🇬🇼 +245 &nbsp;Guinea-Bissau</option>
  <option value="+595">🇵🇾 +595 &nbsp;Paraguay</option>
  <option value="+509">🇭🇹 +509 &nbsp;Haiti</option>
  <option value="+504">🇭🇳 +504 &nbsp;Honduras</option>
  <option value="+852">🇭🇰 +852 &nbsp;Hong Kong</option>
  <option value="+36">🇭🇺 +36 &nbsp;&nbsp;&nbsp;Hungary</option>
  <option value="+62">🇮🇩 +62 &nbsp;&nbsp;&nbsp;Indonesia</option>
  <option value="+98">🇮🇷 +98 &nbsp;&nbsp;&nbsp;Iran</option>
  <option value="+964">🇮🇶 +964 &nbsp;Iraq</option>
  <option value="+353">🇮🇪 +353 &nbsp;Ireland</option>
  <option value="+972">🇮🇱 +972 &nbsp;Israel</option>
  <option value="+39">🇮🇹 +39 &nbsp;&nbsp;&nbsp;Italy</option>
  <option value="+81">🇯🇵 +81 &nbsp;&nbsp;&nbsp;Japan</option>
  <option value="+962">🇯🇴 +962 &nbsp;Jordan</option>
  <option value="+7">🇷🇺 +7 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Russia</option>
  <option value="+82">🇰🇷 +82 &nbsp;&nbsp;&nbsp;South Korea</option>
  <option value="+965">🇰🇼 +965 &nbsp;Kuwait</option>
  <option value="+60">🇲🇾 +60 &nbsp;&nbsp;&nbsp;Malaysia</option>
  <option value="+91">🇮🇳 +91 &nbsp; &nbsp;India</option>
  <option value="+52">🇲🇽 +52 &nbsp;&nbsp;&nbsp;Mexico</option>
  <option value="+234">🇳🇬 +234 &nbsp;Nigeria</option>
  <option value="+31">🇳🇱 +31 &nbsp;&nbsp;&nbsp;Netherlands</option>
  <option value="+64">🇳🇿 +64 &nbsp;&nbsp;&nbsp;New Zealand</option>
  <option value="+47">🇳🇴 +47 &nbsp;&nbsp;&nbsp;Norway</option>
  <option value="+48">🇵🇱 +48 &nbsp;&nbsp;&nbsp;Poland</option>
  <option value="+351">🇵🇹 +351 &nbsp;Portugal</option>
  <option value="+974">🇶🇦 +974 &nbsp;Qatar</option>
  <option value="+40">🇷🇴 +40 &nbsp;&nbsp;&nbsp;Romania</option>
  <option value="+966">🇸🇦 +966 &nbsp;Saudi Arabia</option>
  <option value="+65">🇸🇬 +65 &nbsp;&nbsp;&nbsp;Singapore</option>
  <option value="+27">🇿🇦 +27 &nbsp;&nbsp;&nbsp;South Africa</option>
  <option value="+34">🇪🇸 +34 &nbsp;&nbsp;&nbsp;Spain</option>
  <option value="+46">🇸🇪 +46 &nbsp;&nbsp;&nbsp;Sweden</option>
  <option value="+41">🇨🇭 +41 &nbsp;&nbsp;&nbsp;Switzerland</option>
  <option value="+886">🇹🇼 +886 &nbsp;Taiwan</option>
  <option value="+66">🇹🇭 +66 &nbsp;&nbsp;&nbsp;Thailand</option>
  <option value="+90">🇹🇷 +90 &nbsp;&nbsp;&nbsp;Turkey</option>
  <option value="+971">🇦🇪 +971 &nbsp;United Arab Emirates</option>
  <option value="+1">🇺🇸 +1 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;United States</option>
  <option value="+84">🇻🇳 +84 &nbsp;&nbsp;&nbsp;Vietnam</option>
  <option value="+998">🇺🇿 +998 &nbsp;Uzbekistan</option>

      
    </select>
    <input
      type="text"
      placeholder=" "
      value={form.phone}
      onChange={e => setForm({ ...form, phone: e.target.value })}
      required
    />
    <label className='phone-label'>{t.phone}</label>
  </div>
</div>


          {/* Checkboxes */}
          <div className="checkboxes">
            <label>
              <input
                type="checkbox"
                checked={form.terms}
                onChange={(e) =>
                  setForm({ ...form, terms: e.target.checked })
                }
              />{' '}
              {t.acceptTerms}{' '}
              <a
                href="/"
                rel="noopener noreferrer"
                style={{
                  color: '#ddd',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#ddd')}
              >
                {t.termsLink} 🔗
              </a>
            </label>

            <label>
              <input
                type="checkbox"
                checked={form.privacy}
                onChange={(e) =>
                  setForm({ ...form, privacy: e.target.checked })
                }
              />{' '}
              {t.acceptPrivacy}{' '}
              <a
                href="/"
                rel="noopener noreferrer"
                style={{
                  color: '#ddd',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#ddd')}
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
        </form>
      </div>

      {/* Inline Styles for Phone Field */}
      <style jsx>{`
        .phone-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .country-select select {
          background: #222;
          color: #fff;
          border: 1px solid #555;
          border-radius: 8px;
          padding: 8px 10px;
          font-size: 1rem;
          cursor: pointer;
        }
        .country-select select:focus {
          outline: none;
          border-color: #f5c400;
        }
        .phone-group input[type='tel'] {
          flex: 1;
        }
      `}</style>
    </div>
  );
}

const translations = {
  en: {
    title: 'Join the Lottery Draw!',
    fullName: 'Full Name',
    phone: 'WhatsApp Number',
    acceptTerms: 'I accept Terms & Conditions',
    termsLink: 'Terms',
    acceptPrivacy: 'I accept Privacy Policy',
    privacyLink: 'Privacy',
    errorRequired: 'Please fill all required fields',
    errorInvalidPhone: 'Please enter a valid WhatsApp number',
    enterDraw: 'Enter the Draw',
    submitting: 'Submitting...',
  },
  ru: {
    title: 'Присоединяйтесь к розыгрышу лотереи!',
    fullName: 'ФИО',
    phone: 'Номер WhatsApp',
    acceptTerms: 'Я принимаю Условия использования',
    termsLink: 'Условия',
    acceptPrivacy: 'Я принимаю Политику конфиденциальности',
    privacyLink: 'Конфиденциальность',
    errorRequired: 'Пожалуйста, заполните обязательные поля',
    errorInvalidPhone: 'Введите действительный номер WhatsApp',
    enterDraw: 'Принять участие',
    submitting: 'Отправка...',
  },
};
