import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Header from './components/Header';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import Categories from './pages/admin/Categories';
import Users from './pages/admin/Users';

function PrivateRoute({ children }) {
    const { user, loading } = useAuth();
    if (loading) return (
        <div className="min-h-screen bg-[#080b0f] flex items-center justify-center">
            <p className="text-emerald-500 font-mono text-[10px] tracking-[3px] uppercase">// carregando...</p>
        </div>
    );
    return user ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
    const { user, loading } = useAuth();
    if (loading) return (
        <div className="min-h-screen bg-[#080b0f] flex items-center justify-center">
            <p className="text-emerald-500 font-mono text-[10px] tracking-[3px] uppercase">// carregando...</p>
        </div>
    );
    if (!user) return <Navigate to="/login" />;
    if (!user.is_admin) return <Navigate to="/" />;
    return children;
}

function App() {
    return (
        <Routes>
            {/* Rotas da loja */}
            <Route path="/" element={<><Header /><Home /></>} />
            <Route path="/product/:id" element={<><Header /><ProductDetails /></>} />
            <Route path="/cart" element={<><Header /><Cart /></>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/checkout" element={
                <PrivateRoute>
                    <><Header /><Checkout /></>
                </PrivateRoute>
            } />

            {/* Rotas do admin */}
            <Route path="/admin" element={<AdminRoute><Dashboard /></AdminRoute>} />
            <Route path="/admin/products" element={<AdminRoute><Products /></AdminRoute>} />
            <Route path="/admin/categories" element={<AdminRoute><Categories /></AdminRoute>} />
            <Route path="/admin/users" element={<AdminRoute><Users /></AdminRoute>} />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;