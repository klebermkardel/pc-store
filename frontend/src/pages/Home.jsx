import { useEffect, useState } from "react";
import api from '../services/api';
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom'; // Importante para o botão

function Home() {
  const [products, setProducts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('');

  useEffect(() => {
    const query = currentCategory ? `?category=${currentCategory}` : '';
    api.get(`/products${query}`)
      .then(response => setProducts(response.data))
      .catch(err => console.error("Erro ao carregar produtos", err));
  }, [currentCategory]);

  return (
    <main className="max-w-7xl mx-auto px-4 flex py-8">
      <Sidebar onFilterCategory={setCurrentCategory} />
      
      <div className="flex-1">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 capitalize tracking-tight">
            {currentCategory ? currentCategory.replace('-', ' ') : 'Destaques'}
          </h1>
          <span className="text-sm text-gray-500 font-medium">
            {products.length} {products.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
          </span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product.id} className="group bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300">
              <img src={product.image_url} alt={product.name} className="h-52 w-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-6 flex-grow line-clamp-2">{product.description}</p>
                <span className="text-2xl font-black text-slate-900">R$ {product.price.toLocaleString('pt-BR')}</span>
                
                {/* Transformando o botão em Link */}
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