import { useCart } from '../context/CartContext';
import { useEffect, useState } from 'react';
import api from '../services/api';
import Sidebar from '../components/Sidebar';
import { useSearchParams, Link } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentCategory, setCurrentCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortOrder, setSortOrder] = useState('');
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';

  const buildQueryString = () => {
    const query = [];
    if (currentCategory) query.push(`category=${currentCategory}`);
    if (priceRange.min)  query.push(`min_price=${priceRange.min}`);
    if (priceRange.max)  query.push(`max_price=${priceRange.max}`);
    if (sortOrder)       query.push(`sort=${sortOrder}`);
    if (searchTerm)      query.push(`name=${searchTerm}`);
    return query.length > 0 ? `?${query.join('&')}` : '';
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/products${buildQueryString()}`);
        setProducts(response.data);
      } catch (err) {
        console.error(err);
        setError('Falha na conexão com o servidor.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentCategory, priceRange, sortOrder, searchTerm]);

  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-[#080b0f]">
      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
        <Sidebar
          onFilterCategory={setCurrentCategory}
          onFilterPrice={(min, max) => setPriceRange({ min, max })}
        />

        <div className="flex-1 min-w-0">

          {/* Topbar */}
          <div className="flex justify-between items-end mb-8 pb-5 border-b border-emerald-900/40 relative">
            <div className="absolute bottom-[-1px] left-0 w-20 h-[2px] bg-emerald-500" />
            <div>
              <p className="text-emerald-500 text-[10px] tracking-[3px] uppercase font-mono mb-1">
                // catálogo
              </p>
              <h1 className="text-4xl font-bold text-gray-100 uppercase tracking-widest leading-none font-sans">
                {currentCategory ? currentCategory.replace(/-/g, ' ') : 'Todos os produtos'}
              </h1>
            </div>

            <select
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value)}
              className="bg-white/5 border border-emerald-900/50 hover:border-emerald-500 text-gray-400 hover:text-gray-100 px-3 py-2 text-xs font-mono tracking-widest outline-none transition-colors cursor-pointer"
            >
              <option value="">ORDENAR_POR</option>
              <option value="price_asc">MENOR_PREÇO</option>
              <option value="price_desc">MAIOR_PREÇO</option>
            </select>
          </div>

          {/* Feedback states */}
          {loading && (
            <p className="text-center text-emerald-500 font-mono text-xs tracking-widest py-20">
              // carregando produtos...
            </p>
          )}
          {error && (
            <p className="text-center text-red-500 font-mono text-xs tracking-widest py-20">
              !! {error}
            </p>
          )}
          {!loading && !error && products.length === 0 && (
            <p className="text-center text-gray-700 font-mono text-xs tracking-widest py-20">
              // nenhum produto encontrado
            </p>
          )}

          {/* Grid */}
          {!loading && !error && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map(product => (
                <div
                  key={product.id}
                  className="group bg-[#0d1117] border border-white/5 hover:border-emerald-500/30 flex flex-col transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                >
                  {/* Linha superior que acende no hover */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Imagem */}
                  <Link to={`/product/${product.id}`} className="relative h-48 overflow-hidden block bg-[#111620]">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent" />
                    {product.category?.name && (
                      <span className="absolute top-2 left-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] font-mono tracking-[2px] px-2 py-1 uppercase">
                        {product.category.name}
                      </span>
                    )}
                  </Link>

                  {/* Corpo */}
                  <div className="p-4 flex flex-col flex-1">
                    <Link
                      to={`/product/${product.id}`}
                      className="text-gray-200 font-bold text-base tracking-wide hover:text-emerald-400 transition-colors truncate mb-1 block"
                    >
                      {product.name}
                    </Link>
                    <p className="text-gray-600 text-xs leading-relaxed line-clamp-2 flex-1 mb-4">
                      {product.description}
                    </p>

                    {/* Preço + estoque */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-gray-100 font-bold text-xl tracking-wide">
                        <span className="text-gray-500 text-sm font-normal mr-1">R$</span>
                        {Number(product.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                      <span className="text-emerald-500 font-mono text-[9px] tracking-widest">
                        {product.stock_quantity > 0 ? `${product.stock_quantity} EM ESTOQUE` : 'ESGOTADO'}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="w-full py-2 mb-2 bg-emerald-500/10 border border-emerald-500/25 hover:bg-emerald-500/20 hover:border-emerald-500 text-emerald-400 text-xs font-bold tracking-widest uppercase transition-all duration-200"
                    >
                      + Adicionar ao Carrinho
                    </button>

                    <Link
                      to={`/product/${product.id}`}
                      className="w-full py-2 bg-white/[0.02] border border-white/[0.06] hover:border-white/20 hover:text-gray-200 text-gray-500 text-xs font-bold tracking-widest uppercase text-center transition-all duration-200 block"
                    >
                      Ver Detalhes
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;