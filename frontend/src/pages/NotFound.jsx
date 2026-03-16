import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function NotFound() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f9f9f8',
      fontFamily: "'Courier New', monospace",
    }}>
      <div style={{
        textAlign: 'center',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}>
        <p style={{
          fontSize: '11px',
          letterSpacing: '4px',
          color: '#aaa',
          textTransform: 'uppercase',
          marginBottom: '16px',
        }}>
          Erro 404
        </p>

        <h1 style={{
          fontSize: '80px',
          fontWeight: '300',
          color: '#1a1a1a',
          margin: '0 0 8px',
          letterSpacing: '-4px',
          lineHeight: 1,
        }}>
          Página não encontrada
        </h1>

        <p style={{
          fontSize: '14px',
          color: '#999',
          marginBottom: '40px',
          fontFamily: 'sans-serif',
          fontWeight: 300,
        }}>
          O endereço que você acessou não existe ou foi removido.
        </p>

        <button
          onClick={() => navigate('/')}
          style={{
            background: '#1a1a1a',
            color: '#f9f9f8',
            border: 'none',
            padding: '12px 28px',
            fontSize: '12px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            cursor: 'pointer',
            fontFamily: "'Courier New', monospace",
            transition: 'opacity 0.2s ease',
          }}
          onMouseEnter={e => e.target.style.opacity = '0.75'}
          onMouseLeave={e => e.target.style.opacity = '1'}
        >
          Voltar ao início
        </button>
      </div>
    </div>
  );
}

export default NotFound;