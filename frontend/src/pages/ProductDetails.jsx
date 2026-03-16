import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../services/api';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
        setError('Produto não encontrado.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-[#080b0f] flex items-center justify-center">
      <p className="text-emerald-500 font-mono text-xs tracking-widest">// carregando produto...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-[#080b0f] flex items-center justify-center">
      <p className="text-red-500 font-mono text-xs tracking-widest">!! {error}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#080b0f]">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Breadcrumb */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-400 font-mono text-xs tracking-widest uppercase transition-colors duration-200 mb-10 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
          voltar para a loja
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Imagem */}
          <div className="relative overflow-hidden bg-[#0d1117] border border-white/5">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover max-h-[480px] brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117]/60 via-transparent to-transparent pointer-events-none" />
            {product.category?.name && (
              <span className="absolute top-3 left-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] font-mono tracking-[2px] px-2 py-1 uppercase">
                {product.category.name}
              </span>
            )}
          </div>

          {/* Detalhes */}
          <div className="flex flex-col">

            {/* Nome */}
            <p className="text-emerald-500 text-[10px] font-mono tracking-[3px] uppercase mb-2">
              // detalhes do produto
            </p>
            <h1 className="text-4xl font-bold text-gray-100 uppercase tracking-wide leading-tight mb-1">
              {product.name}
            </h1>

            {/* Preço + estoque */}
            <div className="flex items-center gap-4 mt-5 pb-5 border-b border-white/5">
              <div className="text-3xl font-bold text-gray-100 tracking-wide">
                <span className="text-gray-500 text-base font-normal mr-1">R$</span>
                {Number(product.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <span className={`font-mono text-[9px] tracking-widest px-2 py-1 border ${
                product.stock_quantity > 0
                  ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
                  : 'text-red-400 border-red-500/30 bg-red-500/10'
              }`}>
                {product.stock_quantity > 0 ? `${product.stock_quantity} EM ESTOQUE` : 'ESGOTADO'}
              </span>
            </div>

            {/* Descrição */}
            <p className="text-gray-500 text-sm leading-relaxed mt-5 mb-6">
              {product.description}
            </p>

            {/* Especificações */}
            <div className="bg-[#0d1117] border border-white/5 relative overflow-hidden mb-8">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
              <div className="px-5 py-3 border-b border-white/5">
                <p className="text-emerald-500 font-mono text-[10px] tracking-[3px] uppercase">
                  // especificações técnicas
                </p>
              </div>
              <ul className="divide-y divide-white/[0.04]">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <li key={key} className="flex justify-between items-center px-5 py-3 hover:bg-white/[0.02] transition-colors">
                    <span className="text-gray-500 font-mono text-xs tracking-widest uppercase">{key}</span>
                    <span className="text-gray-200 text-sm font-medium">{value}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Botão */}
            <button
              onClick={() => addToCart(product)}
              disabled={product.stock_quantity === 0}
              className="w-full py-4 bg-emerald-500/10 border border-emerald-500/25 hover:bg-emerald-500/20 hover:border-emerald-500 disabled:opacity-30 disabled:cursor-not-allowed text-emerald-400 font-bold text-sm tracking-widest uppercase transition-all duration-200"
            >
              {product.stock_quantity > 0 ? '+ Adicionar ao Carrinho' : 'Produto Esgotado'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;