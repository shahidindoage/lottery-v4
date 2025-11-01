'use client';
import { useEffect, useState } from 'react';

export default function FlipPage() {
  const [cards, setCards] = useState([]);
  const [assignedWinners, setAssignedWinners] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [popupText, setPopupText] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [lang, setLang] = useState('en');

const t = {
  en: { 
    title: 'Choose the Winners', 
    youWon: 'Winner', 
    close: 'Close', 
    resetSuccess: 'Game has been successfully reset!' 
  },
  ru: { 
    title: 'Выберите победителей', 
    youWon: 'Победитель', 
    close: 'Закрыть', 
    resetSuccess: 'Игра успешно сброшена!' 
  }
}[lang];


  const prizes = [
    'AC', 'TV', 'Mobile', 'Laptop', 'Headphones',
    'AC', 'TV', 'Mobile', 'Laptop', 'Headphones'
  ];

  // Initialize cards and fetch users
  useEffect(() => {
    const initCards = prizes.map((prize, idx) => ({
      index: idx,
      prize,
      flipped: false,
      winner: null,
      fixed: false
    }));
    setCards(initCards);

    // Fetch all users
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setAllUsers(data.users || []));
  }, [lang]);

 const handleFlip = async (index) => {
  const card = cards[index];
  if (card.flipped || card.fixed || allUsers.length === 0) return;

  // Filter users who are not already winners
  const assignedIds = Object.values(assignedWinners).map(u => u.uniqueId);
  const availableUsers = allUsers.filter(u => !assignedIds.includes(u.uniqueId));
  if (availableUsers.length === 0) return;

  // Pick random winner
  const winner = availableUsers[Math.floor(Math.random() * availableUsers.length)];

  // Save winner in DB
  await fetch('/api/assign-winner', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uniqueId: winner.uniqueId, prize: card.prize })
  });

  // Update card state
  const newCards = [...cards];
  newCards[index] = { ...card, flipped: true, winner, fixed: true };

  // Shuffle remaining unflipped cards
  const unflipped = newCards.filter(c => !c.flipped);
  for (let i = unflipped.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [unflipped[i], unflipped[j]] = [unflipped[j], unflipped[i]];
  }

  // Merge shuffled unflipped cards back into the main array
  const merged = newCards.map(c => c.flipped ? c : unflipped.shift());
  setCards(merged);
  setAssignedWinners(prev => ({ ...prev, [index]: winner }));

  // Show popup
  setPopupText(`${t.youWon}\n\nCustomer ID: ${winner.uniqueId}`);
  setShowPopup(true);
};


  const handleReset = async () => {
    // Call reset route
    const res = await fetch('/api/reset-winners', { method: 'POST' });
    if (res.ok) {
      // Reset cards in UI
      const resetCards = prizes.map((prize, idx) => ({
        index: idx,
        prize,
        flipped: false,
        winner: null,
        fixed: false
      }));
      setCards(resetCards);
      setAssignedWinners({});
      // Show success popup
      setPopupText(t.resetSuccess);
      setShowPopup(true);
    }
  };

  const closePopup = () => setShowPopup(false);

  const getCardStyle = (card) => ({
    backgroundColor: card.fixed ? '#ccc' : '#fff',
    cursor: card.fixed ? 'default' : 'pointer',
    color: card.fixed ? '#666' : '#000',
  });

  return (
    <div className="flip-wrapper">
      {/* Language Toggle */}
      <div className="lang-toggle1">
        <button className={lang==='en'?'active':''} onClick={()=>setLang('en')}>EN</button>
        <button className={lang==='ru'?'active':''} onClick={()=>setLang('ru')}>RU</button>
      </div>

      <h1 className="flip-title" style={{fontFamily:"PP-NEUE"}}>{t.title}</h1>

     

      <div className="card-container1" style={{fontFamily:"playfair-display-v2" }}>
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={`card1 ${card.flipped?'flipped':''}`}
            style={getCardStyle(card)}
            onClick={() => handleFlip(idx)}
          >
            <div className="front"><span>?</span></div>
            <div className="back">
              {card.flipped && card.winner ? (
                <>
                  Winner <br />
                  {/* {card.prize} <br /> */}
                  <span style={{color:'green',fontFamily:"playfair-display-v2" }}>
                    ID - {card.winner.uniqueId}
                  </span>
                </>
              ) : ''}
            </div>
          </div>
        ))}
      </div>
{/* Reset Game Button */}
<button
  onClick={handleReset}
  style={{
    marginBottom: 20,
    padding: '10px 20px',
    background: '#d6af66',
    color: '#000',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '1.3rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
    fontFamily:"PP-NEUE"
  }}
  onMouseEnter={(e) => e.currentTarget.style.background = '#deb76fff'}
  onMouseLeave={(e) => e.currentTarget.style.background = '#d6af66'}
>
  Reset Game
</button>

      {showPopup && (
        <div className="popup1">
          <div className="popup-content1">
            <pre style={{ whiteSpace: 'pre-line' ,fontFamily:"playfair-display-v2"}}>{popupText}</pre>
            <button onClick={closePopup} style={{  fontFamily:"playfair-display-v2",marginTop:10}}>{t.close}</button>
          </div>
        </div>
      )}
    </div>
  );
}
