import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { cartCount } = useCart();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) navigate(`/?search=${searchTerm}`);
  };

  const handleLogoClick = () => {
    setSearchTerm('');
  };

  return (
    <header className="bg-[#080b0f] border-b border-white/5 sticky top-0 z-50">
      <div className="h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">

        {/* Logo */}
        <Link to="/" onClick={handleLogoClick} className="flex items-center gap-3 group whitespace-nowrap">
          <div className="w-8 h-8 border border-emerald-500/40 group-hover:border-emerald-500 bg-emerald-500/10 flex items-center justify-center transition-all duration-300">
            <span className="text-emerald-400 text-sm font-mono font-bold">PC</span>
          </div>
          <div>
            <span className="text-gray-100 font-bold text-lg uppercase tracking-widest group-hover:text-emerald-400 transition-colors duration-200">
              Store
            </span>
            <span className="block text-[9px] font-mono text-emerald-500/60 tracking-[3px] leading-none -mt-0.5">
              // hardware & tech
            </span>
          </div>
        </Link>

        {/* Busca */}
        <form onSubmit={handleSearch} className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="buscar produto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 pl-4 pr-10 bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 focus:border-emerald-500/60 text-gray-300 placeholder-gray-600 text-xs font-mono tracking-widest outline-none transition-all duration-200"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-emerald-400 transition-colors duration-200 font-mono text-xs"
          >
            ⌕
          </button>
        </form>

        {/* Nav */}
        <nav>
          <ul className="flex items-center gap-6">
            <li>
              <Link
                to="/"
                className="text-gray-500 hover:text-emerald-400 font-mono text-xs tracking-widest uppercase transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link to="/cart" className="flex items-center gap-2 group">
                <span className="text-gray-500 group-hover:text-emerald-400 font-mono text-xs tracking-widest uppercase transition-colors duration-200">
                  Carrinho
                </span>
                <div className="relative w-8 h-8 border border-white/10 group-hover:border-emerald-500/40 bg-white/[0.02] group-hover:bg-emerald-500/10 flex items-center justify-center transition-all duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .963-.343 1.087-.835l1.624-6.09A1.125 1.125 0 0018.375 6H5.907L5.106 3H2.25" />
                  </svg>
                  {cartCount > 0 && (
                    <span
                      key={cartCount}
                      className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-[#080b0f] text-[9px] font-bold h-4 w-4 flex items-center justify-center font-mono leading-none animate-ping-once"
                    >
                      {cartCount}
                    </span>
                  )}
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;