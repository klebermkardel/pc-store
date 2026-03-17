import { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import api from '../../services/api';

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await api.get('/admin/users');
                setUsers(res.data);
            } catch {
                setError('Erro ao carregar usuários.');
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm('Tem certeza que deseja excluir este usuário?')) return;
        try {
            await api.delete(`/admin/users/${id}`);
            setUsers(prev => prev.filter(u => u.id !== id));
        } catch {
            alert('Erro ao excluir usuário.');
        }
    };

    return (
        <AdminLayout>
            <div className="mb-8 pb-5 border-b border-white/5 relative">
                <div className="absolute bottom-[-1px] left-0 w-20 h-[2px] bg-emerald-500" />
                <div>
                    <p className="text-emerald-500 font-mono text-[10px] tracking-[3px] uppercase mb-1">// gerenciar</p>
                    <h1 className="text-3xl font-bold text-gray-100 uppercase tracking-widest leading-none">Usuários</h1>
                </div>
            </div>

            {loading && <p className="text-emerald-500 font-mono text-xs tracking-widest">// carregando...</p>}
            {error && <p className="text-red-400 font-mono text-xs tracking-widest">!! {error}</p>}

            {!loading && !error && (
                <div className="bg-[#0d1117] border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="text-left px-5 py-3 text-gray-600 font-mono text-[9px] tracking-[2px] uppercase">Nome</th>
                                <th className="text-left px-5 py-3 text-gray-600 font-mono text-[9px] tracking-[2px] uppercase">E-mail</th>
                                <th className="text-left px-5 py-3 text-gray-600 font-mono text-[9px] tracking-[2px] uppercase">Cadastro</th>
                                <th className="text-left px-5 py-3 text-gray-600 font-mono text-[9px] tracking-[2px] uppercase">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.04]">
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-5 py-8 text-center text-gray-700 font-mono text-xs tracking-widest">
                                        // nenhum usuário cadastrado
                                    </td>
                                </tr>
                            ) : users.map(u => (
                                <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="px-5 py-3 text-gray-300 font-mono text-xs">{u.name}</td>
                                    <td className="px-5 py-3 text-gray-500 font-mono text-xs">{u.email}</td>
                                    <td className="px-5 py-3 text-gray-600 font-mono text-[10px]">
                                        {new Date(u.created_at).toLocaleDateString('pt-BR')}
                                    </td>
                                    <td className="px-5 py-3">
                                        <button
                                            onClick={() => handleDelete(u.id)}
                                            className="text-gray-500 hover:text-red-400 font-mono text-[10px] tracking-widest uppercase transition-colors duration-200"
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </AdminLayout>
    );
}

export default Users;