function Header() {
  return (
    <header style={{ padding: '20px', backgroundColor: '#20232a', color: 'white', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ margin: 0 }}>PC Store 🖥️</h2>
        <nav>
          <ul style={{ display: 'flex', listStyle: 'none', gap: '20px', margin: 0 }}>
            <li>Home</li>
            <li>Categorias</li>
            <li>Carrinho</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;