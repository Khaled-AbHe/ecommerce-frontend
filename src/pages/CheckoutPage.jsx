import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createOrder } from '../services/api';
import { useCart } from '../contexts/CartContext';

export default function CheckoutPage() {
  const { cart, total, clear } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ customerName: '', customerEmail: '', shippingAddress: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const items = cart?.items || [];
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (!form.customerName || !form.customerEmail) { setError('Name and email are required.'); return; }
    setSubmitting(true); setError('');
    try {
      await createOrder({ ...form, items: items.map(i => ({ productId: i.productId, quantity: i.quantity })) });
      await clear();
      navigate('/orders');
    } catch (e) { setError(e.message); } finally { setSubmitting(false); }
  };

  if (items.length === 0) return (
    <div className="min-h-screen pt-24 flex items-center justify-center">
      <div className="text-center">
        <p className="font-display text-xl text-ink-400 mb-4">Votre panier est vide</p>
        <Link to="/products" className="btn-amber px-8 py-3 rounded-2xl">Acheter maintenant</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-10">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-2">Dernière étape</p>
          <h1 className="font-display font-bold text-4xl text-ink-50">Paiement</h1>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-3 px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
          {/* Form */}
          <div className="bg-ink-800 border border-white/[0.07] rounded-2xl p-8 space-y-6">
            <h2 className="font-display font-semibold text-lg text-ink-100">Informations d'expédition</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-ink-400 uppercase tracking-wider">Nom complet *</label>
                <input className="input" placeholder="Jane Doe" value={form.customerName} onChange={e => set('customerName', e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-ink-400 uppercase tracking-wider">Email *</label>
                <input className="input" type="email" placeholder="jane@example.com" value={form.customerEmail} onChange={e => set('customerEmail', e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-ink-400 uppercase tracking-wider">Adresse de livraison</label>
              <textarea className="input resize-none" rows={3} placeholder="123 Main St, Ville, Pays" value={form.shippingAddress} onChange={e => set('shippingAddress', e.target.value)} />
            </div>

            {/* Payment placeholder */}
            <div className="border-t border-white/[0.06] pt-6">
              <h2 className="font-display font-semibold text-lg text-ink-100 mb-4">Paiement</h2>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-ink-900/50 border border-white/[0.05] text-ink-500 text-sm">
                <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
                Intégration de paiement prête — mode démo, aucun frais.
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-ink-800 border border-white/[0.07] rounded-2xl p-6 space-y-5 sticky top-24">
            <h2 className="font-display font-semibold text-lg text-ink-100">Résumé</h2>
            <div className="space-y-3">
              {items.map(i => (
                <div key={i.id} className="flex justify-between items-center gap-3 text-sm">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-ink-500 shrink-0">×{i.quantity}</span>
                    <span className="text-ink-300 truncate">{i.product?.name}</span>
                  </div>
                  <span className="font-mono text-ink-400 shrink-0">${(Number(i.product?.price || 0) * i.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/[0.06] pt-4 flex justify-between items-baseline">
              <span className="font-semibold text-ink-100">Total</span>
              <span className="font-mono font-bold text-2xl text-amber-400">${total.toFixed(2)}</span>
            </div>
            <button
              className="btn-amber w-full justify-center py-3.5 rounded-xl text-sm"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? 'Passage de la commande…' : 'Passer la commande →'}
            </button>
            <Link to="/cart" className="btn-ghost w-full justify-center text-xs block text-center">← Retour au panier</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
