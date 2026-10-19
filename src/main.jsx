import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

function Icon({ name, size = 20 }) {
  const paths = {
    home: <><path d="m3 10 9-7 9 7v10H3Z" /><path d="M9 20v-7h6v7" /></>,
    balance: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 9h18M15 14h3" /></>,
    cards: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18M7 15h3" /></>,
    transactions: <><path d="M4 7h16l-4-4M20 17H4l4 4M20 7v5M4 17v-5" /></>,
    recipients: <><circle cx="9" cy="7" r="3" /><path d="M3 21v-4a6 6 0 0 1 12 0v4M17 4a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 5v2" /></>,
    integrations: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    settings: <><circle cx="12" cy="12" r="4" /><path d="m9 3-1 3-3 1-2 5 2 5 3 1 1 3h6l1-3 3-1 2-5-2-5-3-1-1-3Z" /></>,
    help: <><circle cx="12" cy="12" r="9" /><path d="M9 9a3 3 0 0 1 6 0c0 2-3 2-3 5M12 17h.01" /></>,
    support: <><path d="M4 14v-3a8 8 0 0 1 16 0v3M20 17v2h-8" /><rect x="2" y="11" width="4" height="7" rx="2" /><rect x="18" y="11" width="4" height="7" rx="2" /></>,
    search: <><circle cx="10" cy="10" r="6" /><path d="m15 15 5 5" /></>,
    bell: <><path d="M5 17h14l-2-3V9a5 5 0 0 0-10 0v5ZM10 21h4" /></>,
    send: <path d="M12 21V3m-6 6 6-6 6 6" />,
    request: <path d="M12 3v18m-6-6 6 6 6-6" />,
    chevron: <path d="m10 7 5 5-5 5" />,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function App() {
  const [page, setPage] = useState(() => window.location.hash === '#/cards' ? 'Cards' : 'Dashboard');
  const isCards = page === 'Cards';

  useEffect(() => {
    const onHashChange = () => setPage(window.location.hash === '#/cards' ? 'Cards' : 'Dashboard');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const mainLinks = ['Dashboard', 'Balance', 'Cards', 'Transactions', 'Recipients'];
  const otherLinks = ['Integrations', 'Settings', 'Get Help'];
  const names = ['home', 'balance', 'cards', 'transactions', 'recipients', 'integrations', 'settings', 'help'];

  return <div className="app">
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark">◇</span><span>Finance App</span><span className="collapse">‹</span></div>
      <nav aria-label="Main navigation">
        {[mainLinks, otherLinks].map((links, group) => <div className="nav-group" key={group}>
          <p className="nav-label">{group === 0 ? 'MAIN' : 'OTHER'}</p>
          {links.map((label, i) => {
            const content = <><Icon name={names[group === 0 ? i : i + 5]} /><span>{label}</span></>;
            return label === 'Dashboard' || label === 'Cards'
              ? <a key={label} href={label === 'Cards' ? '#/cards' : '#/'} className={`nav-item ${label === page ? 'active' : ''}`} aria-current={label === page ? 'page' : undefined}>{content}</a>
              : <div key={label} className="nav-item">{content}</div>;
          })}
        </div>)}
      </nav>
      <div className="sidebar-bottom">
        <section className="support-card">
          <div className="support-heading"><Icon name="support" size={18} /><span>Need Support?</span></div>
          <p>contact with one of our experts to get supports</p>
          <button type="button" className="contact-button">Contact Us</button>
        </section>
        <div className="profile"><span className="avatar">AJ</span><div><strong>Alexajohn</strong><span>John@mail.com</span></div><span className="profile-arrow"><Icon name="chevron" size={14} /></span></div>
      </div>
    </aside>
    <main>
      <header className="dashboard-header">
        <div><h1>{isCards ? 'Cards' : 'Your Financial Dashboard'}</h1><p>Welcome back, Max Verstappen!</p></div>
        <div className="header-actions">
          <button type="button" className="icon-button" aria-label="Search"><Icon name="search" /></button>
          <button type="button" className="icon-button" aria-label="Notifications"><Icon name="bell" /></button>
          <button type="button" className="exchange-button">Exchange Rate</button>
        </div>
      </header>
      <section className={`balance-card${isCards ? ' wallet-card' : ''}`} aria-labelledby="balance-title">
        <div className="card-heading"><h2 id="balance-title"><Icon name="balance" size={16} />{isCards ? 'My Wallet' : 'My Balance'}</h2><button type="button" className="more-button">More Option <span aria-hidden="true">⚙</span></button></div>
        <div className="currency">{isCards ? 'US Currency' : 'US Dolar'} <span role="img" aria-label="United States">🇺🇸</span></div>
        <p className="amount">$63,48,100</p>
        <p className="growth"><span aria-hidden="true">↗</span> 15.43% {isCards ? 'than' : 'Than'} last month</p>
        <div className="balance-actions"><button type="button"><Icon name="send" size={14} />Send</button><button type="button"><Icon name="request" size={14} />Request</button></div>
      </section>
    </main>
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);
