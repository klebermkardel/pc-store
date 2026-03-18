import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function Header() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { cartCount } = useCart();
    const { user, logout } = useAuth();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/?search=${searchTerm}`);
            setMenuOpen(false);
        }
    };

    const handleLogoClick = () => setSearchTerm('');

    const handleLogout = async () => {
        setShowDropdown(false);
        setMenuOpen(false);
        await logout();
        navigate('/');
    };

    return (
        <header className="bg-[#080b0f] border-b border-white/5 sticky top-0 z-50">
            <div className="h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">

                {/* Linha principal */}
                <div className="flex items-center justify-between gap-4">

                    {/* Logo */}
                    <Link to="/" onClick={handleLogoClick} className="flex items-center gap-2 group shrink-0">
                        <div className="w-8 h-8 border border-emerald-500/40 group-hover:border-emerald-500 bg-emerald-500/10 flex items-center justify-center transition-all duration-300">
                            <span className="text-emerald-400 text-sm font-mono font-bold">PC</span>
                        </div>
                        <div className="hidden sm:block">
                            <span className="text-gray-100 font-bold text-lg uppercase tracking-widest group-hover:text-emerald-400 transition-colors duration-200">
                                Store
                            </span>
                            <span className="block text-[9px] font-mono text-emerald-500/60 tracking-[3px] leading-none -mt-0.5">
                                // hardware & tech
                            </span>
                        </div>
                    </Link>

                    {/* Busca — oculta em mobile, visível em md+ */}
                    <form onSubmit={handleSearch} className="relative hidden md:flex flex-1 max-w-md">
                        <input
                            type="text"
                            placeholder="buscar produto..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full py-2 pl-4 pr-10 bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 focus:border-emerald-500/60 text-gray-300 placeholder-gray-600 text-xs font-mono tracking-wider outline-none transition-all duration-200"
                        />
                        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-emerald-400 transition-colors duration-200 font-mono text-xs">
                            ⌕
                        </button>
                    </form>

                    {/* Ações direita */}
                    <div className="flex items-center gap-3">

                        {/* Nav desktop */}
                        <nav className="hidden md:block">
                            <ul className="flex items-center gap-5">
                                <li>
                                    <Link to="/" className="text-gray-500 hover:text-emerald-400 font-mono text-xs tracking-wider uppercase transition-colors duration-200">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/cart" className="flex items-center group">
                                        <div className="relative w-8 h-8 border border-white/10 group-hover:border-emerald-500/40 bg-white/[0.02] group-hover:bg-emerald-500/10 flex items-center justify-center transition-all duration-200">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .963-.343 1.087-.835l1.624-6.09A1.125 1.125 0 0018.375 6H5.907L5.106 3H2.25" />
                                            </svg>
                                            {cartCount > 0 && (
                                                <span key={cartCount} className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-[#080b0f] text-[9px] font-bold h-4 w-4 flex items-center justify-center font-mono leading-none">
                                                    {cartCount}
                                                </span>
                                            )}
                                        </div>
                                    </Link>
                                </li>
                                <li className="relative">
                                    {user ? (
                                        <>
                                            <button onClick={() => setShowDropdown(p => !p)} className="flex items-center group">
                                                <div className="w-8 h-8 rounded-full border border-white/10 group-hover:border-emerald-500/40 bg-white/[0.02] group-hover:bg-emerald-500/10 flex items-center justify-center transition-all duration-200">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                                    </svg>
                                                </div>
                                            </button>
                                            {showDropdown && (
                                                <div className="absolute right-0 top-11 w-48 bg-[#0d1117] border border-white/10 z-50">
                                                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
                                                    <div className="px-4 py-3 border-b border-white/5">
                                                        <p className="text-gray-300 font-mono text-xs truncate">{user.name}</p>
                                                        <p className="text-gray-600 font-mono text-[10px] truncate">{user.email}</p>
                                                    </div>
                                                    {user.is_admin && (
                                                        <Link to="/admin" onClick={() => setShowDropdown(false)} className="flex items-center gap-2 px-4 py-2 text-emerald-500/70 hover:text-emerald-400 hover:bg-white/[0.02] font-mono text-[10px] tracking-wider uppercase transition-all duration-200">
                                                            ▣ Painel Admin
                                                        </Link>
                                                    )}
                                                    <button onClick={handleLogout} className="w-full text-left flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-400 hover:bg-white/[0.02] font-mono text-[10px] tracking-wider uppercase transition-all duration-200">
                                                        ← Sair
                                                    </button>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <Link to="/login" className="text-gray-500 hover:text-emerald-400 font-mono text-xs tracking-wider uppercase transition-colors duration-200">
                                            Login
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </nav>

                        {/* Ícones mobile */}
                        <div className="flex items-center gap-3 md:hidden">
                            <Link to="/cart" className="relative flex items-center justify-center w-8 h-8 border border-white/10 bg-white/[0.02]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .963-.343 1.087-.835l1.624-6.09A1.125 1.125 0 0018.375 6H5.907L5.106 3H2.25" />
                                </svg>
                                {cartCount > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-[#080b0f] text-[9px] font-bold h-4 w-4 flex items-center justify-center font-mono leading-none">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            {/* Hamburguer */}
                            <button onClick={() => setMenuOpen(p => !p)} className="flex flex-col justify-center items-center w-8 h-8 gap-1.5">
                                <span className={`block w-5 h-px bg-gray-400 transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                                <span className={`block w-5 h-px bg-gray-400 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
                                <span className={`block w-5 h-px bg-gray-400 transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Menu mobile expandido */}
                {menuOpen && (
                    <div className="md:hidden mt-3 pt-3 border-t border-white/5 space-y-3">
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                placeholder="buscar produto..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="w-full py-2 pl-4 pr-10 bg-white/[0.03] border border-white/10 text-gray-300 placeholder-gray-600 text-xs font-mono outline-none"
                            />
                            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 font-mono text-xs">⌕</button>
                        </form>

                        <Link to="/" onClick={() => setMenuOpen(false)} className="block text-gray-500 hover:text-emerald-400 font-mono text-xs tracking-wider uppercase py-2 transition-colors">
                            Home
                        </Link>

                        {user ? (
                            <>
                                <div className="py-2 border-t border-white/5">
                                    <p className="text-gray-400 font-mono text-xs">{user.name}</p>
                                    <p className="text-gray-600 font-mono text-[10px]">{user.email}</p>
                                </div>
                                {user.is_admin && (
                                    <Link to="/admin" onClick={() => setMenuOpen(false)} className="block text-emerald-500/70 hover:text-emerald-400 font-mono text-xs tracking-wider uppercase py-2 transition-colors">
                                        ▣ Painel Admin
                                    </Link>
                                )}
                                <button onClick={handleLogout} className="block w-full text-left text-gray-600 hover:text-red-400 font-mono text-xs tracking-wider uppercase py-2 transition-colors">
                                    ← Sair
                                </button>
                            </>
                        ) : (
                            <Link to="/login" onClick={() => setMenuOpen(false)} className="block text-gray-500 hover:text-emerald-400 font-mono text-xs tracking-wider uppercase py-2 transition-colors">
                                Login
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;