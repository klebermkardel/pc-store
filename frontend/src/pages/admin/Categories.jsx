import { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import api from '../../services/api';

const emptyForm = { name: '', slug: '' };

function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [formError, setFormError] = useState(null);
    const [saving, setSaving] = useState(false);

    const fetchCategories = async () => {
        try {
            const res = await api.get('/admin/categories');
            setCategories(res.data);
        } catch {
            setError('Erro ao carregar categorias.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchCategories(); }, []);

    const handleEdit = (cat) => {
        setEditing(cat.id);
        setForm({ name: cat.name, slug: cat.slug });
        setFormError(null);
        setShowForm(true);
    };

    const handleNew = () => {
        setEditing(null);
        setForm(emptyForm);
        setFormError(null);
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null);
        setSaving(true);
        try {
            if (editing) {
                await api.put(`/admin/categories/${editing}`, form);
            } else {
                await api.post('/admin/categories', form);
            }
            await fetchCategories();
            setShowForm(false);
        } catch (err) {
            setFormError(err.response?.data?.error || 'Erro ao salvar categoria');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Tem certeza que deseja excluir esta categoria?')) return;
        try {
            await api.delete(`/admin/categories/${id}`);
            setCategories(prev => prev.filter(c => c.id !== id));
        } catch {
            alert('Erro ao excluir categoria.');
        }
    };

    const inputClass = "w-full bg-white/[0.02] border border-white/10 hover:border-emerald-500/30 focus:border-emerald-500/60 text-gray-300 placeholder-gray-700 text-xs font-mono px-3 py-2 outline-none transition-all duration-200";
    const labelClass = "text-gray-600 font-mono text-[9px] tracking-[2px] uppercase block mb-1";

    return (
        <AdminLayout>
            <div className="mb-8 pb-5 border-b border-white/5 relative">
                <div className="absolute bottom-[-1px] left-0 w-20 h-[2px] bg-emerald-500" />
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-emerald-500 font-mono text-[10px] tracking-[3px] uppercase mb-1">// gerenciar</p>
                        <h1 className="text-3xl font-bold text-gray-100 uppercase tracking-widest leading-none">Categorias</h1>
                    </div>
                    <button
                        onClick={handleNew}
                        className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/25 hover:bg-emerald-500/20 hover:border-emerald-500 text-emerald-400 font-mono text-xs tracking-widest uppercase transition-all duration-200"
                    >
                        + Nova Categoria
                    </button>
                </div>
            </div>

            {/* Formulário */}
            {showForm && (
                <div className="bg-[#0d1117] border border-white/5 relative overflow-hidden mb-8">
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                    <div className="px-5 py-3 border-b border-white/5 flex justify-between items-center">
                        <p className="text-emerald-500 font-mono text-[10px] tracking-[3px] uppercase">
                            // {editing ? 'editar categoria' : 'nova categoria'}
                        </p>
                        <button onClick={() => setShowForm(false)} className="text-gray-600 hover:text-gray-300 font-mono text-xs transition-colors">✕</button>
                    </div>
                    <div className="p-5">
                        {formError && (
                            <p className="text-red-400 font-mono text-xs tracking-widest border border-red-500/20 bg-red-500/5 px-3 py-2 mb-4">
                                !! {formError}
                            </p>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className={labelClass}>Nome</label>
                                <input
                                    className={inputClass}
                                    value={form.name}
                                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                    placeholder="Ex: Processadores"
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Slug</label>
                                <input
                                    className={inputClass}
                                    value={form.slug}
                                    onChange={e => setForm(f => ({ ...f, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') }))}
                                    placeholder="Ex: processadores"
                                />
                            </div>
                        </div>
                        <div className="flex gap-3 mt-5">
                            <button
                                onClick={handleSubmit}
                                disabled={saving}
                                className="px-6 py-2 bg-emerald-500/10 border border-emerald-500/25 hover:bg-emerald-500/20 hover:border-emerald-500 disabled:opacity-30 text-emerald-400 font-mono text-xs tracking-widest uppercase transition-all duration-200"
                            >
                                {saving ? '// salvando...' : '✓ Salvar'}
                            </button>
                            <button
                                onClick={() => setShowForm(false)}
                                className="px-6 py-2 bg-white/[0.02] border border-white/[0.06] hover:border-white/20 text-gray-600 hover:text-gray-400 font-mono text-xs tracking-widest uppercase transition-all duration-200"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {loading && <p className="text-emerald-500 font-mono text-xs tracking-widest">// carregando...</p>}
            {error && <p className="text-red-400 font-mono text-xs tracking-widest">!! {error}</p>}

            {/* Tabela */}
            {!loading && !error && (
                <div className="bg-[#0d1117] border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="text-left px-5 py-3 text-gray-600 font-mono text-[9px] tracking-[2px] uppercase">Nome</th>
                                <th className="text-left px-5 py-3 text-gray-600 font-mono text-[9px] tracking-[2px] uppercase">Slug</th>
                                <th className="text-left px-5 py-3 text-gray-600 font-mono text-[9px] tracking-[2px] uppercase">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.04]">
                            {categories.map(c => (
                                <tr key={c.id} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="px-5 py-3 text-gray-300 font-mono text-xs">{c.name}</td>
                                    <td className="px-5 py-3 text-gray-500 font-mono text-xs">{c.slug}</td>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => handleEdit(c)}
                                                className="text-gray-500 hover:text-emerald-400 font-mono text-[10px] tracking-widest uppercase transition-colors duration-200"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleDelete(c.id)}
                                                className="text-gray-500 hover:text-red-400 font-mono text-[10px] tracking-widest uppercase transition-colors duration-200"
                                            >
                                                Excluir
                                            </button>
                                        </div>
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

export default Categories;