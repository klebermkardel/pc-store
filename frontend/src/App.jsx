import { useEffect, useState } from "react";
import api from './services/api';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Busca os produtos da sua API quando a página carrega
    api.get('/products')
      .then(response => setProducts(response.data))
      .catch(err => console.error("Erro ao carregar produtos", err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Loja de Hardware</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {products.map(product => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
            <img src={product.image_url} alt={product.name} style={{ width: '100%' }} />
            <h3>{product.name}</h3>
            <p>R$ {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;