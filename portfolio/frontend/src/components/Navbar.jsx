import { useState } from 'react';
const links = ['home', 'about', 'skills', 'projects', 'experience', 'resume', 'contact'];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <a href="#home" className="logo">&lt;MH /&gt;</a>
      <button className="burger" aria-label="Toggle menu" onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button>
      <nav className={open ? 'open' : ''}>
        {links.map(l => <a key={l} href={`#${l}`} onClick={() => setOpen(false)}>{l}</a>)}
      </nav>
    </header>
  );
}
