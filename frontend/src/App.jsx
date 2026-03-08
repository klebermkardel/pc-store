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
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <Header />
      
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <h1 style={{ color: '#333' }}>Destaques</h1>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
          gap: '20px' 
        }}>
          {products.map(product => (
            <div key={product.id} style={{ 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              overflow: 'hidden', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s'
            }}>
              <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '15px' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem' }}>{product.name}</h3>
                <p style={{ color: '#666', fontSize: '0.9rem', height: '40px', overflow: 'hidden' }}>{product.description}</p>
                <p style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#2c3e50' }}>R$ {product.price.toLocaleString('pt-BR')}</p>
                <button style={{ 
                  width: '100%', 
                  padding: '10px', 
                  backgroundColor: '#007bff', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>Adicionar ao Carrinho</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;