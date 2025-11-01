'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function AdminMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Export CSV
  const handleExport = async () => {
    try {
      const res = await fetch('/api/admin/export');
      if (!res.ok) return alert('⚠️ Failed to export.');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'submissions.csv';
      a.click();
      a.remove();
      setOpen(false);
    } catch (err) {
      alert('Error exporting data.');
    }
  };

  // Clear all entries
  const handleClear = async () => {
    if (!confirm('⚠️ Are you sure you want to delete all entries?')) return;
    try {
      const res = await fetch('/api/admin/clear', { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        alert('✅ All entries deleted successfully.');
        window.location.reload();
      } else {
        alert('❌ Failed to delete entries.');
      }
    } catch {
      alert('Server error while deleting.');
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout');
      window.location.href = '/admin/login';
    } catch {
      alert('Logout failed');
    }
  };

  return (
    <div ref={menuRef} style={{ position: 'relative', display: 'inline-block' }}>
      {/* ⋮ Toggle Button */}
      <button
        onClick={() => setOpen((p) => !p)}
        aria-label="Admin menu"
        style={{
          background: 'none',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          color: '#d6af66',
          padding: '4px 8px',
          transition: 'color 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#d6af66')}
      >
        ⋮
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div style={dropdownStyle}>
          <DropdownItem
            icon="🎮"
            text="Game Page"
            as={Link}
            href="/admin/dashboard/game"
            onClick={() => setOpen(false)}
          />
          <DropdownItem icon="⬇️" text="Export CSV" onClick={handleExport} />
          <DropdownItem1 icon="🗑️" text="Clear Entries" danger onClick={handleClear}/>
          <div style={dividerStyle}></div>
          <DropdownItem icon="🚪" text="Logout" onClick={handleLogout} />
        </div>
      )}
    </div>
  );
}

function DropdownItem({ icon, text, onClick, href, as: Component = 'button', danger = false }) {
  const baseStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    padding: '10px 14px',
    fontSize: '14px',
    color: danger ? '#ff6b6b' : '#fff',
    background: 'transparent',
    border: 'none',
    textDecoration: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    // marginTop: '-20px'
  };

  const hoverStyle = {
    background: 'rgba(255, 255, 255, 0.08)',
    transform: 'translateX(3px)',
  };

  const [hover, setHover] = useState(false);

  return (
    <Component
      href={href}
      onClick={onClick}
      style={{
        ...baseStyle,
        ...(hover ? hoverStyle : {}),
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span style={{ width: 20, textAlign: 'center' }}>{icon}</span>
      <span>{text}</span>
    </Component>
  );
}
function DropdownItem1({ icon, text, onClick, href, as: Component = 'button', danger = false }) {
  const baseStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    padding: '10px 14px',
    fontSize: '14px',
    color: danger ? '#ff6b6b' : '#fff',
    background: 'transparent',
    border: 'none',
    textDecoration: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginTop: '-20px'
  };

  const hoverStyle = {
    background: 'rgba(255, 255, 255, 0.08)',
    transform: 'translateX(3px)',
  };

  const [hover, setHover] = useState(false);

  return (
    <Component
      href={href}
      onClick={onClick}
      style={{
        ...baseStyle,
        ...(hover ? hoverStyle : {}),
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span style={{ width: 20, textAlign: 'center' }}>{icon}</span>
      <span>{text}</span>
    </Component>
  );
}

const dropdownStyle = {
  position: 'absolute',
  right: 0,
  top: '110%',
  background: '#1e1e1e',
  border: '1px solid #333',
  borderRadius: 10,
  width: 190,
  overflow: 'hidden',
  boxShadow: '0 8px 18px rgba(0,0,0,0.45)',
  zIndex: 1000,
  animation: 'fadeIn 0.15s ease',
};

const dividerStyle = {
  height: 1,
  background: '#333',
  margin: '4px 0',
};
