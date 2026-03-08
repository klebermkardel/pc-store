import { useEffect, useState } from "react";
import api from './services/api';
import Header from './components/Header'; // Importando o Header

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products')
      .then(response => setProducts(response.data))
      .catch(err => console.error("Erro ao carregar produtos", err));
  }, []);

  return (
  <div className="min-h-screen">
    <Header />
    
    <main className="max-w-7xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Destaques</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col">
            <div className="h-48 overflow-hidden">
              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
              
              <div className="flex justify-between items-center mt-auto">
                <span className="text-xl font-extrabold text-slate-900">
                  R$ {product.price.toLocaleString('pt-BR')}
                </span>
              </div>
              
              <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                Adicionar
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  </div>
);
}

export default App;