import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        api.get(`/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.error(err));
    }, [id]);

    if(!product) return <div className="p-10 text-center">Carregando...</div>

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <Link to="/" className="text-blue-600 hover:underline">← Voltar para a loja</Link>
      
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
                <img src={product.image_url} alt={product.name} className="w-full rounded-2xl shadow-lg" />
                <div>
                    <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
                    <p className="text-2xl text-blue-600 font-bold mt-4">R$ {product.price.toLocaleString('pt-BR')}</p>
                    <p className="text-gray-600 mt-6 leading-relaxed">{product.description}</p>
          
                    <div className="mt-8 p-6 bg-gray-100 rounded-xl">
                        <h3 className="font-bold mb-4">Especificações Técnicas:</h3>
                        <ul className="space-y-2">
                            {Object.entries(product.specifications).map(([key, value]) => (
                                <li key={key} className="text-sm border-b border-gray-200 pb-1">
                                    <span className="font-semibold capitalize">{key}:</span> {value}
                                </li>
                            ))}
                        </ul>
                    </div>        
          
                    <button className="w-full mt-8 bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-600 transition">
                        Adicionar ao Carrinho
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;