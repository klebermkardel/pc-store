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

function PrivateRoute({ children }) {
    const { user, loading } = useAuth();
    if (loading) return (
        <div className="min-h-screen bg-[#080b0f] flex items-center justify-center">
            <p className="text-emerald-500 font-mono text-[10px] tracking-[3px] uppercase">
                // carregando...
            </p>
        </div>
    );
    return user ? children : <Navigate to="/login" />;
}

function App() {
    return (
        <div className="min-h-screen bg-[#080b0f]">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={
                    <PrivateRoute>
                        <Checkout />
                    </PrivateRoute>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;