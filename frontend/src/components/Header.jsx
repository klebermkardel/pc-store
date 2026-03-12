import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${searchTerm}`);
  };

  return (
    <header className="bg-slate-900 text-white p-5 mb-8 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <Link to="/" className="text-2xl font-bold hover:opacity-80 transition whitespace-nowrap">
          PC Store 🖥️
        </Link>
        
        <form onSubmit={handleSearch} className="relative w-full max-w-md">
          <input 
            type="text"
            placeholder="O que você está procurando?"
            className="w-full py-2 px-4 pr-10 rounded-full bg-slate-800 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="absolute right-3 top-2 text-slate-400 hover:text-white">
            🔍
          </button>
        </form>

        <nav>
          <ul className="flex gap-6 font-medium">
            <li><Link to="/" className="hover:text-blue-400 transition">Home</Link></li>
            <li className="hover:text-blue-400 transition cursor-pointer">Carrinho</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;