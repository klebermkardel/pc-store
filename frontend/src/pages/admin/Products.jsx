import { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import api from '../../services/api';

const emptyForm = {
    name: '', description: '', price: '', stock_quantity: '',
    category_id: '', image_url: '', specifications: ''
};

function Products() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [formError, setFormError] = useState(null);
    const [saving, setSaving] = useState(false);

    const fetchProducts = async () => {
        try {
            const res = await api.get('/admin/products');
            setProducts(res.data);
        } catch {
            setError('Erro ao carregar produtos.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
        api.get('/categories').then(res => setCategories(res.data));
    }, []);

    const handleEdit = (product) => {
        setEditing(product.id);
        setForm({
            name: product.name,
            description: product.description || '',
            price: product.price,
            stock_quantity: product.stock_quantity,
            category_id: product.category_id || '',
            image_url: product.image_url || '',
            specifications: JSON.stringify(product.specifications || {})
        });
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
            const payload = {
                ...form,
                price: parseFloat(form.price),
                stock_quantity: parseInt(form.stock_quantity),
                specifications: form.specifications ? JSON.parse(form.specifications) : {}
            };

            if (editing) {
                await api.put(`/admin/products/${editing}`, payload);
            } else {
                await api.post('/admin/products', payload);
            }

            await fetchProducts();
            setShowForm(false);
        } catch (err) {
            setFormError(err.response?.data?.error || 'Erro ao salvar produto');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Tem certeza que deseja excluir este produto?')) return;
        try {
            await api.delete(`/admin/products/${id}`);
            setProducts(prev => prev.filter(p => p.id !== id));
        } catch {
            alert('Erro ao excluir produto.');
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
                        <h1 className="text-3xl font-bold text-gray-100 uppercase tracking-widest leading-none">Produtos</h1>
                    </div>
                    <button
                        onClick={handleNew}
                        className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/25 hover:bg-emerald-500/20 hover:border-emerald-500 text-emerald-400 font-mono text-xs tracking-widest uppercase transition-all duration-200"
                    >
                        + Novo Produto
                    </button>
                </div>
            </div>

            {/* Formulário */}
            {showForm && (
                <div className="bg-[#0d1117] border border-white/5 relative overflow-hidden mb-8">
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                    <div className="px-5 py-3 border-b border-white/5 flex justify-between items-center">
                        <p className="text-emerald-500 font-mono text-[10px] tracking-[3px] uppercase">
                            // {editing ? 'editar produto' : 'novo produto'}
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
                            <div className="sm:col-span-2">
                                <label className={labelClass}>Nome</label>
                                <input className={inputClass} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Nome do produto" />
                            </div>
                            <div className="sm:col-span-2">
                                <label className={labelClass}>Descrição</label>
                                <textarea className={inputClass} rows={2} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Descrição do produto" />
                            </div>
                            <div>
                                <label className={labelClass}>Preço (R$)</label>
                                <input className={inputClass} type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="0.00" />
                            </div>
                            <div>
                                <label className={labelClass}>Estoque</label>
                                <input className={inputClass} type="number" value={form.stock_quantity} onChange={e => setForm(f => ({ ...f, stock_quantity: e.target.value }))} placeholder="0" />
                            </div>
                            <div>
                                <label className={labelClass}>Categoria</label>
                                <select className={inputClass} value={form.category_id} onChange={e => setForm(f => ({ ...f, category_id: e.target.value }))}>
                                    <option value="">Selecione...</option>
                                    {categories.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className={labelClass}>URL da Imagem</label>
                                <input className={inputClass} value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} placeholder="https://..." />
                            </div>
                            <div className="sm:col-span-2">
                                <label className={labelClass}>Especificações (JSON)</label>
                                <textarea className={inputClass} rows={3} value={form.specifications} onChange={e => setForm(f => ({ ...f, specifications: e.target.value }))} placeholder='{"cores": 8, "socket": "AM5"}' />
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
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/5">
                                    <th className="text-left px-5 py-3 text-gray-600 font-mono text-[9px] tracking-[2px] uppercase">Produto</th>
                                    <th className="text-left px-5 py-3 text-gray-600 font-mono text-[9px] tracking-[2px] uppercase">Categoria</th>
                                    <th className="text-left px-5 py-3 text-gray-600 font-mono text-[9px] tracking-[2px] uppercase">Preço</th>
                                    <th className="text-left px-5 py-3 text-gray-600 font-mono text-[9px] tracking-[2px] uppercase">Estoque</th>
                                    <th className="text-left px-5 py-3 text-gray-600 font-mono text-[9px] tracking-[2px] uppercase">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.04]">
                                {products.map(p => (
                                    <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-[#111620] overflow-hidden shrink-0">
                                                    <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                                                </div>
                                                <span className="text-gray-300 text-xs font-mono truncate max-w-[200px]">{p.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3 text-gray-500 font-mono text-xs">{p.category?.name || '—'}</td>
                                        <td className="px-5 py-3 text-gray-300 font-mono text-xs">
                                            R$ {Number(p.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </td>
                                        <td className="px-5 py-3">
                                            <span className={`font-mono text-[9px] tracking-widest px-2 py-1 border ${
                                                p.stock_quantity > 0
                                                    ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
                                                    : 'text-red-400 border-red-500/30 bg-red-500/10'
                                            }`}>
                                                {p.stock_quantity > 0 ? p.stock_quantity : 'ESGOTADO'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => handleEdit(p)}
                                                    className="text-gray-500 hover:text-emerald-400 font-mono text-[10px] tracking-widest uppercase transition-colors duration-200"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(p.id)}
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
                </div>
            )}
        </AdminLayout>
    );
}

export default Products;