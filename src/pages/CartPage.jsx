import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export default function CartPage() {
  const { cart, loading, update, remove, clear, total, itemCount } = useCart();
  const items = cart?.items || [];

  if (loading) return (
    <div className="min-h-screen pt-24 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-ink-700 border-t-amber-500 rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-2">Votre sélection</p>
          <div className="flex items-end justify-between">
            <h1 className="font-display font-bold text-4xl text-ink-50">Panier</h1>
            {items.length > 0 && (
              <button className="btn-ghost text-xs text-rose-400 hover:text-rose-300" onClick={clear}>Tout effacer</button>
            )}
          </div>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-32">
            <div className="w-20 h-20 rounded-2xl bg-ink-800 border border-white/[0.07] flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-ink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
            </div>
            <h2 className="font-display text-2xl text-ink-400 mb-3">Votre panier est vide</h2>
            <p className="text-ink-600 text-sm mb-8">Parcourez notre collection et ajoutez des articles pour commencer.</p>
            <Link to="/products" className="btn-amber px-8 py-3 rounded-2xl">Parcourir les produits</Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
            {/* Items */}
            <div className="bg-ink-800 border border-white/[0.07] rounded-2xl overflow-hidden">
              {items.map((item, idx) => (
                <div key={item.id} className={`flex items-center gap-4 p-5 ${idx !== items.length - 1 ? 'border-b border-white/[0.06]' : ''}`}>
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-ink-700 shrink-0">
                    {item.product?.imageUrl ? (
                      <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xl opacity-30">🏷️</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-ink-100 truncate">{item.product?.name}</p>
                    <p className="text-xs text-ink-500 mt-0.5">Unité : ${Number(item.product?.price || 0).toFixed(2)}</p>
                  </div>
                  {/* Qty control */}
                  <div className="flex items-center gap-0 bg-ink-900 border border-white/[0.08] rounded-lg overflow-hidden">
                    <button
                      className="w-8 h-8 flex items-center justify-center text-ink-500 hover:text-ink-100 hover:bg-white/[0.06] transition-colors"
                      onClick={() => item.quantity > 1 ? update(item.id, item.quantity - 1) : remove(item.id)}
                    >−</button>
                    <span className="w-8 text-center text-xs font-semibold text-ink-200">{item.quantity}</span>
                    <button
                      className="w-8 h-8 flex items-center justify-center text-ink-500 hover:text-ink-100 hover:bg-white/[0.06] transition-colors"
                      onClick={() => update(item.id, item.quantity + 1)}
                    >+</button>
                  </div>
                  <div className="text-right min-w-[64px]">
                    <p className="font-mono font-semibold text-amber-400 text-sm">
                      ${(Number(item.product?.price || 0) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <button
                    className="text-ink-600 hover:text-rose-400 transition-colors ml-1"
                    onClick={() => remove(item.id)}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-ink-800 border border-white/[0.07] rounded-2xl p-6 space-y-5 sticky top-24">
              <h2 className="font-display font-semibold text-lg text-ink-100">Résumé de la commande</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-ink-400">
                  <span>Sous-total ({itemCount} article{itemCount !== 1 ? 's' : ''})</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-ink-400">
                  <span>Livraison</span>
                  <span className="text-jade-400 font-medium">Gratuit</span>
                </div>
                <div className="flex justify-between text-ink-400">
                  <span>Taxe</span>
                  <span>Calculée à la caisse</span>
                </div>
              </div>
              <div className="border-t border-white/[0.07] pt-4 flex justify-between items-baseline">
                <span className="font-semibold text-ink-100">Total</span>
                <span className="font-mono font-bold text-2xl text-amber-400">${total.toFixed(2)}</span>
              </div>
              <Link to="/checkout" className="btn-amber w-full justify-center py-3.5 rounded-xl text-sm block text-center">
                Procéder à la caisse →
              </Link>
              <Link to="/products" className="btn-ghost w-full justify-center text-xs block text-center">
                Continuer vos achats
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
