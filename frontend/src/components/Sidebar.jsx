import { useEffect, useState } from 'react';
import api from '../services/api';

function Sidebar({ onFilterCategory, onFilterPrice }) {
  const [categories, setCategories] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    api.get('/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error("Erro ao buscar categorias", err));
  }, []);

  const handlePriceFilter = (e) => {
    e.preventDefault();
    onFilterPrice(minPrice, maxPrice);
  };

  return (
    <aside className="w-64 pr-8 hidden md:block">
      <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2 tracking-tight">Categorias</h2>
      <ul className="space-y-3 mb-8">
        <li>
          <button 
            onClick={() => onFilterCategory('')}
            className="text-gray-600 hover:text-blue-600 font-semibold transition-colors duration-200"
          >
            Todos os Produtos
          </button>
        </li>
        {categories.map(cat => (
          <li key={cat.id}>
            <button 
              onClick={() => onFilterCategory(cat.slug)}
              className="text-gray-500 hover:text-blue-600 transition-colors duration-200 capitalize text-sm text-left w-full"
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2 tracking-tight">Preço</h2>
      <form onSubmit={handlePriceFilter} className="space-y-3">
        <div>
          <label className="text-xs text-gray-500 uppercase font-bold">Mínimo</label>
          <input 
            type="number" 
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="R$ 0"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 uppercase font-bold">Máximo</label>
          <input 
            type="number" 
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="R$ 10.000"
          />
        </div>
        <button 
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition shadow-md"
        >
          Filtrar
        </button>
      </form>
    </aside>
  );
}

export default Sidebar;