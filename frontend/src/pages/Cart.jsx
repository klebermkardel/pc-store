import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Cart() {
    const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();

    if (cart.length === 0) return (
        <div className="min-h-screen bg-[#080b0f] flex flex-col items-center justify-center gap-4 px-4">
            <p className="text-emerald-500 font-mono text-[10px] tracking-[3px] uppercase mb-2">
                // carrinho vazio
            </p>
            <p className="text-gray-700 font-mono text-xs tracking-widest text-center">
                Nenhum item adicionado ainda.
            </p>
            <Link
                to="/"
                className="mt-4 px-6 py-2 bg-emerald-500/10 border border-emerald-500/25 hover:bg-emerald-500/20 hover:border-emerald-500 text-emerald-400 font-mono text-xs tracking-widest uppercase transition-all duration-200"
            >
                Voltar à loja
            </Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#080b0f]">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">

                {/* Título */}
                <div className="mb-6 md:mb-8 pb-5 border-b border-white/5 relative">
                    <div className="absolute bottom-[-1px] left-0 w-20 h-[2px] bg-emerald-500" />
                    <p className="text-emerald-500 font-mono text-[10px] tracking-[3px] uppercase mb-1">
                        // seu carrinho
                    </p>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-100 uppercase tracking-widest leading-none">
                        Carrinho
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

                    {/* Lista de itens */}
                    <div className="lg:col-span-2 space-y-3">
                        {cart.map(item => (
                            <div
                                key={item.id}
                                className="group bg-[#0d1117] border border-white/5 hover:border-emerald-500/20 flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 sm:p-4 transition-all duration-300 relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Imagem */}
                                <Link
                                    to={`/product/${item.id}`}
                                    className="shrink-0 w-full sm:w-20 h-40 sm:h-20 bg-[#111620] overflow-hidden block"
                                >
                                    <img
                                        src={item.image_url}
                                        alt={item.name}
                                        className="w-full h-full object-cover brightness-90 group-hover:brightness-100 transition-all duration-300"
                                    />
                                </Link>

                                {/* Info */}
                                <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-start gap-3">
                                    <div className="flex-1 min-w-0">
                                        <Link
                                            to={`/product/${item.id}`}
                                            className="text-gray-200 font-bold text-sm tracking-wide hover:text-emerald-400 transition-colors truncate block mb-1"
                                        >
                                            {item.name}
                                        </Link>
                                        {item.category?.name && (
                                            <span className="text-[9px] font-mono tracking-[2px] text-emerald-500/60 uppercase">
                                                {item.category.name}
                                            </span>
                                        )}

                                        {/* Controles de quantidade */}
                                        <div className="flex items-center gap-3 mt-3">
                                            <div className="flex items-center border border-white/10">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-7 h-7 text-gray-500 hover:text-emerald-400 hover:bg-emerald-500/10 font-mono text-sm transition-all duration-200 flex items-center justify-center"
                                                >
                                                    −
                                                </button>
                                                <span className="w-8 text-center text-gray-200 font-mono text-xs">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-7 h-7 text-gray-500 hover:text-emerald-400 hover:bg-emerald-500/10 font-mono text-sm transition-all duration-200 flex items-center justify-center"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-gray-700 hover:text-red-400 font-mono text-[9px] tracking-widest uppercase transition-colors duration-200"
                                            >
                                                remover
                                            </button>
                                        </div>
                                    </div>

                                    {/* Preço */}
                                    <div className="text-left sm:text-right shrink-0">
                                        <p className="text-gray-100 font-bold text-base tracking-wide">
                                            <span className="text-gray-600 text-xs font-normal mr-1">R$</span>
                                            {(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </p>
                                        {item.quantity > 1 && (
                                            <p className="text-gray-700 font-mono text-[9px] tracking-wide mt-1">
                                                R$ {Number(item.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} cada
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Limpar carrinho */}
                        <div className="flex justify-end pt-2">
                            <button
                                onClick={clearCart}
                                className="text-gray-700 hover:text-red-400 font-mono text-[9px] tracking-widest uppercase transition-colors duration-200"
                            >
                                // limpar carrinho
                            </button>
                        </div>
                    </div>

                    {/* Resumo */}
                    <div className="lg:col-span-1">
                        <div className="bg-[#0d1117] border border-white/5 relative overflow-hidden lg:sticky lg:top-24">
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />

                            <div className="px-5 py-4 border-b border-white/5">
                                <p className="text-emerald-500 font-mono text-[10px] tracking-[3px] uppercase">
                                    // resumo do pedido
                                </p>
                            </div>

                            <div className="p-5 space-y-3">
                                {cart.map(item => (
                                    <div key={item.id} className="flex justify-between items-center">
                                        <span className="text-gray-600 text-xs font-mono truncate max-w-[160px]">
                                            {item.name} <span className="text-gray-700">×{item.quantity}</span>
                                        </span>
                                        <span className="text-gray-400 text-xs font-mono shrink-0">
                                            R$ {(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="px-5 py-4 border-t border-white/5">
                                <div className="flex justify-between items-center mb-5">
                                    <span className="text-gray-400 font-mono text-xs tracking-widest uppercase">Total</span>
                                    <div className="text-right">
                                        <p className="text-gray-100 font-bold text-xl tracking-wide">
                                            <span className="text-gray-500 text-sm font-normal mr-1">R$</span>
                                            {Number(cartTotal).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </p>
                                    </div>
                                </div>

                                <Link
                                    to="/checkout"
                                    className="w-full py-3 bg-emerald-500/10 border border-emerald-500/25 hover:bg-emerald-500/20 hover:border-emerald-500 text-emerald-400 font-mono text-xs tracking-widest uppercase transition-all duration-200 text-center block"
                                >
                                    Finalizar Compra →
                                </Link>

                                <Link
                                    to="/"
                                    className="w-full py-3 mt-2 bg-white/[0.02] border border-white/[0.06] hover:border-white/20 text-gray-600 hover:text-gray-400 font-mono text-xs tracking-widest uppercase text-center block transition-all duration-200"
                                >
                                    Continuar Comprando
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;