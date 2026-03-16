import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (password !== confirm) {
            return setError('As senhas não coincidem');
        }
        if (password.length < 6) {
            return setError('A senha deve ter pelo menos 6 caracteres');
        }

        setLoading(true);
        try {
            await register(name, email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Erro ao criar conta');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#080b0f] flex items-center justify-center px-4">
            <div className="w-full max-w-md">

                {/* Logo */}
                <div className="text-center mb-8">
                    <p className="text-emerald-500 font-mono text-[10px] tracking-[3px] uppercase mb-2">
                        // novo acesso
                    </p>
                    <h1 className="text-3xl font-bold text-gray-100 uppercase tracking-widest">
                        Registro
                    </h1>
                </div>

                {/* Card */}
                <div className="bg-[#0d1117] border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />

                    <div className="p-8 space-y-5">
                        {error && (
                            <p className="text-red-400 font-mono text-xs tracking-widest text-center border border-red-500/20 bg-red-500/5 py-2">
                                !! {error}
                            </p>
                        )}

                        <div>
                            <label className="text-gray-600 font-mono text-[9px] tracking-[2px] uppercase block mb-1">
                                Nome completo
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="João da Silva"
                                className="w-full bg-white/[0.02] border border-white/10 hover:border-emerald-500/30 focus:border-emerald-500/60 text-gray-300 placeholder-gray-700 text-xs font-mono px-3 py-2 outline-none transition-all duration-200"
                            />
                        </div>

                        <div>
                            <label className="text-gray-600 font-mono text-[9px] tracking-[2px] uppercase block mb-1">
                                E-mail
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="seu@email.com"
                                className="w-full bg-white/[0.02] border border-white/10 hover:border-emerald-500/30 focus:border-emerald-500/60 text-gray-300 placeholder-gray-700 text-xs font-mono px-3 py-2 outline-none transition-all duration-200"
                            />
                        </div>

                        <div>
                            <label className="text-gray-600 font-mono text-[9px] tracking-[2px] uppercase block mb-1">
                                Senha
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-white/[0.02] border border-white/10 hover:border-emerald-500/30 focus:border-emerald-500/60 text-gray-300 placeholder-gray-700 text-xs font-mono px-3 py-2 outline-none transition-all duration-200"
                            />
                        </div>

                        <div>
                            <label className="text-gray-600 font-mono text-[9px] tracking-[2px] uppercase block mb-1">
                                Confirmar senha
                            </label>
                            <input
                                type="password"
                                value={confirm}
                                onChange={e => setConfirm(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-white/[0.02] border border-white/10 hover:border-emerald-500/30 focus:border-emerald-500/60 text-gray-300 placeholder-gray-700 text-xs font-mono px-3 py-2 outline-none transition-all duration-200"
                            />
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={loading || !name || !email || !password || !confirm}
                            className="w-full py-3 bg-emerald-500/10 border border-emerald-500/25 hover:bg-emerald-500/20 hover:border-emerald-500 disabled:opacity-30 disabled:cursor-not-allowed text-emerald-400 font-mono text-xs tracking-widest uppercase transition-all duration-200 mt-2"
                        >
                            {loading ? '// criando conta...' : '→ Criar conta'}
                        </button>
                    </div>

                    <div className="px-8 py-4 border-t border-white/5 text-center">
                        <p className="text-gray-700 font-mono text-[10px] tracking-widest">
                            Já tem conta?{' '}
                            <Link to="/login" className="text-emerald-500/70 hover:text-emerald-400 transition-colors">
                                Faça login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;