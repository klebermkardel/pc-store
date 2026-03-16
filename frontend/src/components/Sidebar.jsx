import { useEffect, useState } from 'react';
import api from '../services/api';

function Sidebar({ onFilterCategory, onFilterPrice }) {
  const [categories, setCategories] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    api.get('/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error('Erro ao buscar categorias:', err));
  }, []);

  const handleCategoryClick = (slug) => {
    setActiveCategory(slug);
    onFilterCategory(slug);
  };

  const handlePriceFilter = (e) => {
    e.preventDefault();
    onFilterPrice(minPrice, maxPrice);
  };

  const handleClearPrice = () => {
    setMinPrice('');
    setMaxPrice('');
    onFilterPrice('', '');
  };

  return (
    <aside className="w-56 shrink-0 hidden md:block">

      {/* Categorias */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5 relative">
          <div className="absolute bottom-[-1px] left-0 w-8 h-[1px] bg-emerald-500" />
          <p className="text-emerald-500 font-mono text-[10px] tracking-[3px] uppercase">
            // categorias
          </p>
        </div>

        <ul className="space-y-1">
          <li>
            <button
              onClick={() => handleCategoryClick('')}
              className={`w-full text-left px-3 py-2 font-mono text-xs tracking-widest uppercase transition-all duration-200 border-l-2 ${
                activeCategory === ''
                  ? 'text-emerald-400 border-emerald-500 bg-emerald-500/5'
                  : 'text-gray-500 border-transparent hover:text-gray-300 hover:border-white/20 hover:bg-white/[0.02]'
              }`}
            >
              Todos
            </button>
          </li>
          {categories.map(cat => (
            <li key={cat.id}>
              <button
                onClick={() => handleCategoryClick(cat.slug)}
                className={`w-full text-left px-3 py-2 font-mono text-xs tracking-widest uppercase transition-all duration-200 border-l-2 ${
                  activeCategory === cat.slug
                    ? 'text-emerald-400 border-emerald-500 bg-emerald-500/5'
                    : 'text-gray-500 border-transparent hover:text-gray-300 hover:border-white/20 hover:bg-white/[0.02]'
                }`}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Filtro de preço */}
      <div>
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5 relative">
          <div className="absolute bottom-[-1px] left-0 w-8 h-[1px] bg-emerald-500" />
          <p className="text-emerald-500 font-mono text-[10px] tracking-[3px] uppercase">
            // preço
          </p>
        </div>

        <form onSubmit={handlePriceFilter} className="space-y-3">
          <div>
            <label className="text-gray-600 font-mono text-[9px] tracking-[2px] uppercase block mb-1">
              Mínimo
            </label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="R$ 0"
              className="w-full bg-white/[0.02] border border-white/10 hover:border-emerald-500/30 focus:border-emerald-500/60 text-gray-300 placeholder-gray-700 text-xs font-mono px-3 py-2 outline-none transition-all duration-200"
            />
          </div>
          <div>
            <label className="text-gray-600 font-mono text-[9px] tracking-[2px] uppercase block mb-1">
              Máximo
            </label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="R$ 10.000"
              className="w-full bg-white/[0.02] border border-white/10 hover:border-emerald-500/30 focus:border-emerald-500/60 text-gray-300 placeholder-gray-700 text-xs font-mono px-3 py-2 outline-none transition-all duration-200"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-emerald-500/10 border border-emerald-500/25 hover:bg-emerald-500/20 hover:border-emerald-500 text-emerald-400 font-mono text-xs tracking-widest uppercase transition-all duration-200"
          >
            Filtrar
          </button>

          {(minPrice || maxPrice) && (
            <button
              type="button"
              onClick={handleClearPrice}
              className="w-full py-2 bg-white/[0.02] border border-white/[0.06] hover:border-white/20 text-gray-600 hover:text-gray-400 font-mono text-xs tracking-widest uppercase transition-all duration-200"
            >
              Limpar
            </button>
          )}
        </form>
      </div>
    </aside>
  );
}

export default Sidebar;