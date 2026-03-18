import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
    { path: '/admin', label: 'Dashboard', icon: '▣' },
    { path: '/admin/products', label: 'Produtos', icon: '◈' },
    { path: '/admin/categories', label: 'Categorias', icon: '≡' },
    { path: '/admin/users', label: 'Usuários', icon: '○' },
];

function AdminLayout({ children }) {
    const { pathname } = useLocation();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-[#080b0f] flex">

            {/* Overlay mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-20 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed md:sticky top-0 h-screen w-56 bg-[#0d1117] border-r border-white/5 flex flex-col z-30 transition-transform duration-300 ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            }`}>
                <div className="relative px-5 py-6 border-b border-white/5">
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                    <p className="text-emerald-500 font-mono text-[9px] tracking-[3px] uppercase mb-1">// painel admin</p>
                    <Link to="/" className="text-gray-200 font-bold text-lg uppercase tracking-widest hover:text-emerald-400 transition-colors duration-200">
                        PC Store
                    </Link>
                </div>

                <nav className="flex-1 px-3 py-4 space-y-1">
                    {navItems.map(item => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setSidebarOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2 font-mono text-xs tracking-widest uppercase transition-all duration-200 border-l-2 ${
                                pathname === item.path
                                    ? 'text-emerald-400 border-emerald-500 bg-emerald-500/5'
                                    : 'text-gray-500 border-transparent hover:text-gray-300 hover:border-white/20 hover:bg-white/[0.02]'
                            }`}
                        >
                            <span className="text-base">{item.icon}</span>
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="px-5 py-4 border-t border-white/5 space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                        <span className="text-gray-400 font-mono text-[10px] tracking-widest truncate">{user?.name}</span>
                    </div>
                    <button onClick={handleLogout} className="w-full text-left text-gray-600 hover:text-red-400 font-mono text-[9px] tracking-widest uppercase transition-colors duration-200">
                        // sair
                    </button>
                </div>
            </aside>

            {/* Conteúdo */}
            <div className="flex-1 min-w-0 flex flex-col">

                {/* Topbar mobile */}
                <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#0d1117] border-b border-white/5 sticky top-0 z-10">
                    <span className="text-gray-200 font-bold text-sm uppercase tracking-widest">Admin</span>
                    <button onClick={() => setSidebarOpen(p => !p)} className="flex flex-col justify-center items-center w-8 h-8 gap-1.5">
                        <span className="block w-5 h-px bg-gray-400" />
                        <span className="block w-5 h-px bg-gray-400" />
                        <span className="block w-5 h-px bg-gray-400" />
                    </button>
                </div>

                <main className="flex-1 p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;