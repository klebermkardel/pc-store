import { useEffect, useState } from "react";
import api from '../services/api';
import Sidebar from '../components/Sidebar';
import { useSearchParams, Link } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortOrder, setSortOrder] = useState('');
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';

  useEffect(() => {
    let query = [];
    if (currentCategory) query.push(`category=${currentCategory}`);
    if (priceRange.min) query.push(`min_price=${priceRange.min}`);
    if (priceRange.max) query.push(`max_price=${priceRange.max}`);
    if (sortOrder) query.push(`sort=${sortOrder}`);
    if(searchTerm) query.push(`name=${searchTerm}`);
    
    const queryString = query.length > 0 ? `?${query.join('&')}` : '';

    api.get(`/products${queryString}`)
      .then(response => setProducts(response.data))
      .catch(err => console.error(err));
  }, [currentCategory, priceRange, sortOrder, searchTerm]);

  const handlePriceFilter = (min, max) => {
    setPriceRange({ min, max });
  };

  return (
    <main className="max-w-7xl mx-auto px-4 flex py-8">
      <Sidebar 
        onFilterCategory={setCurrentCategory} 
        onFilterPrice={handlePriceFilter} 
      />
      
      <div className="flex-1">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 capitalize tracking-tight">
            {currentCategory ? currentCategory.replace('-', ' ') : 'Destaques'}
          </h1>
          
          <select 
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Ordenar por</option>
            <option value="price_asc">Menor Preço</option>
            <option value="price_desc">Maior Preço</option>
          </select>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product.id} className="group bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300">
                <Link to={`/product/${product.id}`} className="relative overflow-hidden h-52 block">
                    <img 
                        src={product.image_url} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer" 
                    />
                </Link>
              <div className="p-6 flex flex-col flex-grow">
                <Link to={`/product/${product.id}`}>
                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1 hover:text-blue-600 transition-colors">
                        {product.name}
                    </h3>
                </Link>
                <p className="text-gray-500 text-sm mb-6 flex-grow line-clamp-2">{product.description}</p>
                <span className="text-2xl font-black text-slate-900">R$ {product.price.toLocaleString('pt-BR')}</span>
                
                <Link to={`/product/${product.id}`} className="w-full mt-4 bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors text-center block shadow-lg shadow-slate-200">
                  Ver detalhes
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Home;