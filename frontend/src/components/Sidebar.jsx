import { useEffect, useState } from "react";
import api from '../services/api';

function Sidebar({ onFilterCategory }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Busca as categorias do Banco de Dados
        api.get('/categories')
            .then(res => setCategories(res.data))
            .catch(err => console.error("Erro ao buscar categorias", err));
    }, []);

    return (
        <aside className="w-64 pr-8 hidden md:block">
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2 tracking-tight">Categorias</h2>
            <ul className="space-y-3">
                <li>
                    <button 
                        onClick={() => onFilterCategory('')}
                        className="text-gray-600 hover:text-blue-600 font-semifold transition-colors duration-200"
                    >
                        Todos os produtos
                    </button>
                </li>
                {categories.map(cat => (
                  <li key={cat.id}>
                    <button
                        onClick={() => onFilterCategory(cat.slug)}
                        className="text-gray-500 hover:text-blue-600 transition-colors duration-200 capitalize text-sm"
                    >
                        {cat.name}
                    </button>
                  </li>  
                ))}
            </ul>
        </aside>
    );
}

export default Sidebar;