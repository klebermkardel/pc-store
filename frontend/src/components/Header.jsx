function Header() {
  return (
    <header className="bg-slate-900 text-white p-5 mb-8 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h2 className="text-2xl font-bold">PC Store 🖥️</h2>
        <nav>
          <ul className="flex gap-6 font-medium">
            <li className="hover:text-blue-400 cursor-pointer transition">Home</li>
            <li className="hover:text-blue-400 cursor-pointer transition">Categorias</li>
            <li className="hover:text-blue-400 cursor-pointer transition">Carrinho</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;