import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-slate-900 text-white p-5 mb-8 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Tornando o Logo também um link para a Home */}
        <Link to="/" className="text-2xl font-bold hover:opacity-80 transition">
          PC Store 🖥️
        </Link>
        
        <nav>
          <ul className="flex gap-6 font-medium">
            <li>
              <Link to="/" className="hover:text-blue-400 cursor-pointer transition">
                Home
              </Link>
            </li>
            <li className="hover:text-blue-400 cursor-pointer transition">
              Categorias
            </li>
            <li className="hover:text-blue-400 cursor-pointer transition">
              Carrinho
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;