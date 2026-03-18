import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const STEPS = ['Endereço', 'Pagamento', 'Confirmação'];

const initialForm = {
    nome: '',
    email: '',
    cpf: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    pagamento: '',
    cartao_numero: '',
    cartao_nome: '',
    cartao_validade: '',
    cartao_cvv: '',
    pix_confirmado: false,
};

function StepIndicator({ current }) {
    return (
        <div className="flex items-center gap-0 mb-8 md:mb-10">
            {STEPS.map((step, i) => (
                <div key={step} className="flex items-center">
                    <div className="flex flex-col items-center gap-1">
                        <div className={`w-7 h-7 md:w-8 md:h-8 flex items-center justify-center font-mono text-xs font-bold border transition-all duration-300 ${
                            i < current
                                ? 'bg-emerald-500 border-emerald-500 text-[#080b0f]'
                                : i === current
                                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                                : 'bg-white/[0.02] border-white/10 text-gray-600'
                        }`}>
                            {i < current ? '✓' : i + 1}
                        </div>
                        <span className={`font-mono text-[8px] md:text-[9px] tracking-widest uppercase ${
                            i === current ? 'text-emerald-400' : 'text-gray-600'
                        }`}>
                            {step}
                        </span>
                    </div>
                    {i < STEPS.length - 1 && (
                        <div className={`w-10 sm:w-20 h-[1px] mb-4 mx-1 transition-all duration-500 ${
                            i < current ? 'bg-emerald-500' : 'bg-white/10'
                        }`} />
                    )}
                </div>
            ))}
        </div>
    );
}

function InputField({ label, value, onChange, placeholder, type = 'text', className = '' }) {
    return (
        <div className={className}>
            <label className="text-gray-600 font-mono text-[9px] tracking-[2px] uppercase block mb-1">
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full bg-white/[0.02] border border-white/10 hover:border-emerald-500/30 focus:border-emerald-500/60 text-gray-300 placeholder-gray-700 text-xs font-mono px-3 py-2 outline-none transition-all duration-200"
            />
        </div>
    );
}

function StepEndereco({ form, setForm }) {
    const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

    const formatCPF = (value) => {
        return value.replace(/\D/g, '').slice(0, 11)
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    };

    const formatCEP = (value) => {
        return value.replace(/\D/g, '').slice(0, 8)
            .replace(/(\d{5})(\d)/, '$1-$2');
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Nome completo" value={form.nome} onChange={set('nome')} placeholder="João da Silva" className="sm:col-span-2" />
                <InputField label="Email" value={form.email} onChange={set('email')} placeholder="joao@email.com" type="email" />
                <InputField
                    label="CPF"
                    value={form.cpf}
                    onChange={(e) => setForm(f => ({ ...f, cpf: formatCPF(e.target.value) }))}
                    placeholder="000.000.000-00"
                />
            </div>

            <div className="border-t border-white/5 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                    label="CEP"
                    value={form.cep}
                    onChange={(e) => setForm(f => ({ ...f, cep: formatCEP(e.target.value) }))}
                    placeholder="00000-000"
                />
                <InputField label="Bairro" value={form.bairro} onChange={set('bairro')} placeholder="Centro" />
                <InputField label="Endereço" value={form.endereco} onChange={set('endereco')} placeholder="Rua das Flores" className="sm:col-span-2" />
                <InputField label="Número" value={form.numero} onChange={set('numero')} placeholder="123" />
                <InputField label="Complemento" value={form.complemento} onChange={set('complemento')} placeholder="Apto 4B (opcional)" />
                <InputField label="Cidade" value={form.cidade} onChange={set('cidade')} placeholder="São Paulo" />
                <div>
                    <label className="text-gray-600 font-mono text-[9px] tracking-[2px] uppercase block mb-1">Estado</label>
                    <select
                        value={form.estado}
                        onChange={set('estado')}
                        className="w-full bg-white/[0.02] border border-white/10 hover:border-emerald-500/30 focus:border-emerald-500/60 text-gray-300 text-xs font-mono px-3 py-2 outline-none transition-all duration-200"
                    >
                        <option value="">Selecione...</option>
                        {['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map(uf => (
                            <option key={uf} value={uf}>{uf}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}

function StepPagamento({ form, setForm }) {
    const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

    const formatCartao = (value) => {
        return value.replace(/\D/g, '').slice(0, 16)
            .replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    };

    const formatValidade = (value) => {
        return value.replace(/\D/g, '').slice(0, 4)
            .replace(/(\d{2})(\d)/, '$1/$2');
    };

    const metodos = [
        { id: 'cartao', label: 'Cartão', icon: '▣' },
        { id: 'pix',    label: 'PIX',    icon: '◈' },
        { id: 'boleto', label: 'Boleto', icon: '≡' },
    ];

    return (
        <div className="space-y-5">
            <div className="grid grid-cols-3 gap-2 md:gap-3">
                {metodos.map(m => (
                    <button
                        key={m.id}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, pagamento: m.id }))}
                        className={`flex flex-col items-center gap-1 md:gap-2 py-3 md:py-4 border font-mono text-[10px] md:text-xs tracking-widest uppercase transition-all duration-200 ${
                            form.pagamento === m.id
                                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                                : 'bg-white/[0.02] border-white/10 text-gray-600 hover:border-white/20 hover:text-gray-400'
                        }`}
                    >
                        <span className="text-base md:text-lg">{m.icon}</span>
                        {m.label}
                    </button>
                ))}
            </div>

            {form.pagamento === 'cartao' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <InputField
                        label="Número do cartão"
                        value={form.cartao_numero}
                        onChange={(e) => setForm(f => ({ ...f, cartao_numero: formatCartao(e.target.value) }))}
                        placeholder="0000 0000 0000 0000"
                        className="sm:col-span-2"
                    />
                    <InputField
                        label="Nome no cartão"
                        value={form.cartao_nome}
                        onChange={set('cartao_nome')}
                        placeholder="JOÃO DA SILVA"
                        className="sm:col-span-2"
                    />
                    <InputField
                        label="Validade"
                        value={form.cartao_validade}
                        onChange={(e) => setForm(f => ({ ...f, cartao_validade: formatValidade(e.target.value) }))}
                        placeholder="MM/AA"
                    />
                    <InputField
                        label="CVV"
                        value={form.cartao_cvv}
                        onChange={(e) => setForm(f => ({ ...f, cartao_cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                        placeholder="000"
                    />
                </div>
            )}

            {form.pagamento === 'pix' && (
                <div className="bg-[#0d1117] border border-white/5 p-6 flex flex-col items-center gap-4">
                    <p className="text-emerald-500 font-mono text-[10px] tracking-[3px] uppercase">// chave pix</p>
                    <div className="w-28 h-28 md:w-32 md:h-32 border border-emerald-500/20 flex items-center justify-center">
                        <span className="text-emerald-500/30 font-mono text-xs text-center leading-relaxed">QR CODE<br/>simulado</span>
                    </div>
                    <p className="text-gray-600 font-mono text-[10px] tracking-widest text-center">
                        Chave: <span className="text-gray-400">pc.store@pix.com.br</span>
                    </p>
                    <label className="flex items-center gap-2 cursor-pointer mt-1">
                        <input
                            type="checkbox"
                            checked={form.pix_confirmado}
                            onChange={(e) => setForm(f => ({ ...f, pix_confirmado: e.target.checked }))}
                            className="accent-emerald-500"
                        />
                        <span className="text-gray-500 font-mono text-[10px] tracking-widest uppercase">Confirmo que realizei o pagamento</span>
                    </label>
                </div>
            )}

            {form.pagamento === 'boleto' && (
                <div className="bg-[#0d1117] border border-white/5 p-5 md:p-6 space-y-3">
                    <p className="text-emerald-500 font-mono text-[10px] tracking-[3px] uppercase">// boleto bancário</p>
                    <p className="text-gray-500 font-mono text-xs leading-relaxed">
                        O boleto será gerado após a confirmação do pedido. O prazo de compensação é de até 3 dias úteis.
                    </p>
                    <div className="border border-white/10 px-3 md:px-4 py-3 font-mono text-[10px] md:text-xs text-gray-600 tracking-widest break-all">
                        1234.56789 0123.456789 01234.567890 1 00010000000000
                    </div>
                </div>
            )}
        </div>
    );
}

function StepConfirmacao({ form, cart, cartTotal }) {
    return (
        <div className="space-y-5">
            <div className="bg-[#0d1117] border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
                <div className="px-5 py-3 border-b border-white/5">
                    <p className="text-emerald-500 font-mono text-[10px] tracking-[3px] uppercase">// dados pessoais</p>
                </div>
                <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                        ['Nome', form.nome],
                        ['Email', form.email],
                        ['CPF', form.cpf],
                        ['CEP', form.cep],
                        ['Endereço', `${form.endereco}, ${form.numero}`],
                        ['Cidade', `${form.cidade} - ${form.estado}`],
                    ].map(([label, value]) => (
                        <div key={label}>
                            <p className="text-gray-700 font-mono text-[9px] tracking-widest uppercase mb-0.5">{label}</p>
                            <p className="text-gray-300 text-xs font-mono break-words">{value || '—'}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-[#0d1117] border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
                <div className="px-5 py-3 border-b border-white/5">
                    <p className="text-emerald-500 font-mono text-[10px] tracking-[3px] uppercase">// pagamento</p>
                </div>
                <div className="p-5">
                    <p className="text-gray-300 text-xs font-mono capitalize">
                        {form.pagamento === 'cartao'
                            ? `Cartão de crédito — **** **** **** ${form.cartao_numero.slice(-4)}`
                            : form.pagamento === 'pix' ? 'PIX'
                            : form.pagamento === 'boleto' ? 'Boleto bancário'
                            : '—'}
                    </p>
                </div>
            </div>

            <div className="bg-[#0d1117] border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
                <div className="px-5 py-3 border-b border-white/5">
                    <p className="text-emerald-500 font-mono text-[10px] tracking-[3px] uppercase">// itens do pedido</p>
                </div>
                <ul className="divide-y divide-white/[0.04]">
                    {cart.map(item => (
                        <li key={item.id} className="flex justify-between items-center px-5 py-3">
                            <span className="text-gray-400 text-xs font-mono truncate max-w-[180px]">
                                {item.name} <span className="text-gray-700">×{item.quantity}</span>
                            </span>
                            <span className="text-gray-200 text-xs font-mono shrink-0 ml-4">
                                R$ {(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-between items-center px-5 py-4 border-t border-white/5">
                    <span className="text-gray-400 font-mono text-xs tracking-widest uppercase">Total</span>
                    <span className="text-gray-100 font-bold text-lg tracking-wide">
                        <span className="text-gray-500 text-sm font-normal mr-1">R$</span>
                        {Number(cartTotal).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                </div>
            </div>
        </div>
    );
}

function Sucesso({ nome, onVoltar }) {
    return (
        <div className="min-h-screen bg-[#080b0f] flex flex-col items-center justify-center gap-4 text-center px-4">
            <div className="w-14 h-14 md:w-16 md:h-16 border border-emerald-500/40 bg-emerald-500/10 flex items-center justify-center mb-2">
                <span className="text-emerald-400 text-xl md:text-2xl">✓</span>
            </div>
            <p className="text-emerald-500 font-mono text-[10px] tracking-[3px] uppercase">// pedido confirmado</p>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-100 uppercase tracking-widest">
                Obrigado, {nome.split(' ')[0]}!
            </h1>
            <p className="text-gray-600 font-mono text-xs tracking-widest max-w-sm">
                Seu pedido foi recebido com sucesso. Você receberá um email de confirmação em breve.
            </p>
            <button
                onClick={onVoltar}
                className="mt-6 px-6 md:px-8 py-3 bg-emerald-500/10 border border-emerald-500/25 hover:bg-emerald-500/20 hover:border-emerald-500 text-emerald-400 font-mono text-xs tracking-widest uppercase transition-all duration-200"
            >
                Voltar à loja
            </button>
        </div>
    );
}

function Checkout() {
    const [step, setStep] = useState(0);
    const [form, setForm] = useState(initialForm);
    const [concluido, setConcluido] = useState(false);
    const { cart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const isValid = useMemo(() => {
        if (step === 0) {
            return !!(form.nome && form.email && form.cpf && form.cep &&
                      form.endereco && form.numero && form.cidade && form.estado);
        }
        if (step === 1) {
            if (!form.pagamento) return false;
            if (form.pagamento === 'cartao')
                return !!(form.cartao_numero && form.cartao_nome && form.cartao_validade && form.cartao_cvv);
            if (form.pagamento === 'pix') return form.pix_confirmado;
            return true;
        }
        return true;
    }, [step, form]);

    const handleNext = () => {
        if (!isValid) return;
        if (step < STEPS.length - 1) setStep(s => s + 1);
    };

    const handleFinalize = () => {
        clearCart();
        setConcluido(true);
    };

    if (concluido) return <Sucesso nome={form.nome} onVoltar={() => navigate('/')} />;

    if (cart.length === 0) return (
        <div className="min-h-screen bg-[#080b0f] flex flex-col items-center justify-center gap-4 px-4">
            <p className="text-gray-700 font-mono text-xs tracking-widest">// carrinho vazio</p>
            <Link to="/" className="text-emerald-400 font-mono text-xs tracking-widest uppercase hover:text-emerald-300 transition-colors">
                Voltar à loja
            </Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#080b0f]">
            <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 md:py-10">

                {/* Título */}
                <div className="mb-6 md:mb-8 pb-5 border-b border-white/5 relative">
                    <div className="absolute bottom-[-1px] left-0 w-20 h-[2px] bg-emerald-500" />
                    <p className="text-emerald-500 font-mono text-[10px] tracking-[3px] uppercase mb-1">
                        // finalizar compra
                    </p>
                    <h1 className="text-2xl md:text-4xl font-bold text-gray-100 uppercase tracking-widest leading-none">
                        Checkout
                    </h1>
                </div>

                <StepIndicator current={step} />

                {/* Conteúdo do step */}
                <div className="bg-[#0d1117] border border-white/5 relative overflow-hidden mb-6">
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                    <div className="px-4 md:px-5 py-3 border-b border-white/5">
                        <p className="text-emerald-500 font-mono text-[10px] tracking-[3px] uppercase">
                            // {STEPS[step].toLowerCase()}
                        </p>
                    </div>
                    <div className="p-4 md:p-5">
                        {step === 0 && <StepEndereco form={form} setForm={setForm} />}
                        {step === 1 && <StepPagamento form={form} setForm={setForm} />}
                        {step === 2 && <StepConfirmacao form={form} cart={cart} cartTotal={cartTotal} />}
                    </div>
                </div>

                {/* Botões de navegação */}
                <div className="flex gap-3">
                    {step > 0 && (
                        <button
                            onClick={() => setStep(s => s - 1)}
                            className="px-4 md:px-6 py-3 bg-white/[0.02] border border-white/[0.06] hover:border-white/20 text-gray-600 hover:text-gray-400 font-mono text-xs tracking-widest uppercase transition-all duration-200"
                        >
                            ← Voltar
                        </button>
                    )}

                    {step < STEPS.length - 1 ? (
                        <button
                            onClick={handleNext}
                            disabled={!isValid}
                            className="flex-1 py-3 bg-emerald-500/10 border border-emerald-500/25 hover:bg-emerald-500/20 hover:border-emerald-500 disabled:opacity-30 disabled:cursor-not-allowed text-emerald-400 font-mono text-xs tracking-widest uppercase transition-all duration-200"
                        >
                            Próximo →
                        </button>
                    ) : (
                        <button
                            onClick={handleFinalize}
                            className="flex-1 py-3 bg-emerald-500/10 border border-emerald-500/25 hover:bg-emerald-500/20 hover:border-emerald-500 text-emerald-400 font-mono text-xs tracking-widest uppercase transition-all duration-200"
                        >
                            ✓ Confirmar Pedido
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Checkout;