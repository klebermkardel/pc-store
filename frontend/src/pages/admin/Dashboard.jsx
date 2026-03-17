import { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import api from '../../services/api';

function MetricCard({ label, value, color = 'emerald' }) {
    const colors = {
        emerald: 'border-emerald-500/20 text-emerald-400',
        red: 'border-red-500/20 text-red-400',
        blue: 'border-blue-500/20 text-blue-400',
        amber: 'border-amber-500/20 text-amber-400',
    };

    return (
        <div className={`bg-[#0d1117] border ${colors[color]} relative overflow-hidden p-6`}>
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-current to-transparent opacity-40" />
            <p className="text-gray-600 font-mono text-[9px] tracking-[3px] uppercase mb-2">{label}</p>
            <p className={`font-bold text-4xl tracking-wide ${colors[color].split(' ')[1]}`}>{value ?? '—'}</p>
        </div>
    );
}

function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await api.get('/admin/dashboard');
                setData(res.data);
            } catch {
                setError('Erro ao carregar métricas.');
            } finally {
                setLoading(false);
            }
        };
        fetchDashboard();
    }, []);

    return (
        <AdminLayout>
            <div className="mb-8 pb-5 border-b border-white/5 relative">
                <div className="absolute bottom-[-1px] left-0 w-20 h-[2px] bg-emerald-500" />
                <p className="text-emerald-500 font-mono text-[10px] tracking-[3px] uppercase mb-1">// visão geral</p>
                <h1 className="text-3xl font-bold text-gray-100 uppercase tracking-widest leading-none">Dashboard</h1>
            </div>

            {loading && <p className="text-emerald-500 font-mono text-xs tracking-widest">// carregando...</p>}
            {error && <p className="text-red-400 font-mono text-xs tracking-widest">!! {error}</p>}

            {data && (
                <div className="space-y-8">
                    {/* Métricas */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <MetricCard label="Total de Produtos" value={data.totalProducts} color="emerald" />
                        <MetricCard label="Categorias" value={data.totalCategories} color="blue" />
                        <MetricCard label="Clientes" value={data.totalUsers} color="amber" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Sem estoque */}
                        <div className="bg-[#0d1117] border border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
                            <div className="px-5 py-3 border-b border-white/5">
                                <p className="text-red-400 font-mono text-[10px] tracking-[3px] uppercase">// sem estoque</p>
                            </div>
                            {data.lowStock.length === 0 ? (
                                <p className="text-gray-700 font-mono text-xs tracking-widest px-5 py-4">
                                    Todos os produtos têm estoque.
                                </p>
                            ) : (
                                <ul className="divide-y divide-white/[0.04]">
                                    {data.lowStock.map(p => (
                                        <li key={p.id} className="flex justify-between px-5 py-3">
                                            <span className="text-gray-400 text-xs font-mono">{p.name}</span>
                                            <span className="text-red-400 font-mono text-[10px] tracking-widest">ESGOTADO</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Clientes recentes */}
                        <div className="bg-[#0d1117] border border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
                            <div className="px-5 py-3 border-b border-white/5">
                                <p className="text-emerald-500 font-mono text-[10px] tracking-[3px] uppercase">// clientes recentes</p>
                            </div>
                            {data.recentUsers.length === 0 ? (
                                <p className="text-gray-700 font-mono text-xs tracking-widest px-5 py-4">
                                    Nenhum cliente cadastrado.
                                </p>
                            ) : (
                                <ul className="divide-y divide-white/[0.04]">
                                    {data.recentUsers.map(u => (
                                        <li key={u.id} className="flex justify-between items-center px-5 py-3">
                                            <div>
                                                <p className="text-gray-300 text-xs font-mono">{u.name}</p>
                                                <p className="text-gray-600 text-[10px] font-mono">{u.email}</p>
                                            </div>
                                            <span className="text-gray-700 font-mono text-[9px] tracking-widest">
                                                {new Date(u.created_at).toLocaleDateString('pt-BR')}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

export default Dashboard;