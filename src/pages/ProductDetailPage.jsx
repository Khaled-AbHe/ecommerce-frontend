import { useState } from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export default function ProductDetailPage() {
  const { product } = useLoaderData();
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const { add } = useCart();

  const handleAdd = async () => {
    setAdding(true);
    try {
      await add(product.id, qty);
      setAdded(true);
      setTimeout(() => setAdded(false), 2500);
    } finally { setAdding(false); }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <Link to="/products" className="btn-ghost text-xs mb-8 inline-flex">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Retour aux produits
        </Link>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden bg-ink-800 border border-white/[0.07] aspect-square">
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl opacity-10">🏷️</div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-6 py-4">
            {product.category && (
              <span className="text-xs font-bold tracking-widest uppercase text-amber-500">{product.category.name}</span>
            )}
            <h1 className="font-display font-bold text-3xl md:text-4xl text-ink-50 leading-tight">{product.name}</h1>

            {product.description && (
              <p className="text-ink-400 text-base leading-relaxed">{product.description}</p>
            )}

            <div className="flex items-baseline gap-3">
              <span className="font-mono font-bold text-4xl text-amber-400">${Number(product.price).toFixed(2)}</span>
            </div>

            {/* Stock indicator */}
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-jade-400' : 'bg-rose-400'}`} />
              <span className={`text-sm font-medium ${product.stock > 0 ? 'text-jade-400' : 'text-rose-400'}`}>
                {product.stock > 0 ? `${product.stock} en stock` : 'Rupture de stock'}
              </span>
            </div>

            {/* Qty + Add */}
            {product.stock > 0 && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-0 bg-ink-800 border border-white/[0.08] rounded-xl overflow-hidden">
                  <button
                    className="w-10 h-10 flex items-center justify-center text-ink-400 hover:text-ink-100 hover:bg-white/[0.06] transition-colors text-lg font-light"
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                  >−</button>
                  <span className="w-10 text-center text-sm font-semibold text-ink-100">{qty}</span>
                  <button
                    className="w-10 h-10 flex items-center justify-center text-ink-400 hover:text-ink-100 hover:bg-white/[0.06] transition-colors text-lg font-light"
                    onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                  >+</button>
                </div>
                <button
                  className={`flex-1 btn-amber py-3 rounded-xl text-sm justify-center ${added ? 'bg-jade-500 hover:bg-jade-500 shadow-none' : ''}`}
                  onClick={handleAdd}
                  disabled={adding}
                >
                  {added ? (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      Ajouté au panier !
                    </>
                  ) : adding ? 'Ajout…' : 'Ajouter au panier'}
                </button>
              </div>
            )}

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { icon: '🚚', text: 'Livraison gratuite' },
                { icon: '↩️', text: 'Retours de 30 jours' },
                { icon: '🔒', text: 'Paiement sécurisé' },
              ].map(b => (
                <div key={b.text} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-ink-800/60 border border-white/[0.05] text-center">
                  <span className="text-lg">{b.icon}</span>
                  <span className="text-[11px] text-ink-500 font-medium">{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
