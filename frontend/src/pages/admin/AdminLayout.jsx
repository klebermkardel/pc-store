import { Link, useLocation, useNavigate } from 'react-router-dom';
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

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-[#080b0f] flex">

            {/* Sidebar */}
            <aside className="w-56 shrink-0 bg-[#0d1117] border-r border-white/5 flex flex-col sticky top-0 h-screen">
                <div className="relative px-5 py-6 border-b border-white/5">
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                    <p className="text-emerald-500 font-mono text-[9px] tracking-[3px] uppercase mb-1">
                        // painel admin
                    </p>
                    <Link to="/" className="text-gray-200 font-bold text-lg uppercase tracking-widest hover:text-emerald-400 transition-colors duration-200">
                        PC Store
                    </Link>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-4 space-y-1">
                    {navItems.map(item => (
                        <Link
                            key={item.path}
                            to={item.path}
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

                {/* Footer */}
                <div className="px-5 py-4 border-t border-white/5 space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                        <span className="text-gray-400 font-mono text-[10px] tracking-widest truncate">
                            {user?.name}
                        </span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full text-left text-gray-600 hover:text-red-400 font-mono text-[9px] tracking-widest uppercase transition-colors duration-200"
                    >
                        // sair
                    </button>
                </div>
            </aside>

            {/* Conteúdo */}
            <main className="flex-1 min-w-0 p-8">
                {children}
            </main>
        </div>
    );
}

export default AdminLayout;