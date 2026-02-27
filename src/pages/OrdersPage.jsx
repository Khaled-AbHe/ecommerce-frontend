import { useLoaderData, useRevalidator } from 'react-router-dom';
import { useState } from 'react';
import { updateOrderStatus } from '../services/api';

const STATUS_OPTIONS = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

export default function OrdersPage() {
  const { orders: initialOrders } = useLoaderData();
  const [orders, setOrders] = useState(initialOrders);
  const [expanded, setExpanded] = useState(null);
  const revalidator = useRevalidator();

  const handleStatus = async (id, status) => {
    await updateOrderStatus(id, status);
    revalidator.revalidate();
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-10">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-2">Historique</p>
          <h1 className="font-display font-bold text-4xl text-ink-50">Commandes</h1>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-32">
            <div className="w-20 h-20 rounded-2xl bg-ink-800 border border-white/[0.07] flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-ink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
              </svg>
            </div>
            <h2 className="font-display text-2xl text-ink-400 mb-3">Aucune commande pour le moment</h2>
            <p className="text-ink-600 text-sm">Complétez un paiement pour voir vos commandes ici.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map(o => (
              <div key={o.id} className="bg-ink-800 border border-white/[0.07] rounded-2xl overflow-hidden transition-all duration-200">
                {/* Row */}
                <button
                  className="w-full flex items-center gap-4 p-5 hover:bg-white/[0.02] transition-colors text-left"
                  onClick={() => setExpanded(expanded === o.id ? null : o.id)}
                >
                  <div className="w-10 h-10 rounded-xl bg-ink-900 border border-white/[0.06] flex items-center justify-center shrink-0">
                    <span className="font-mono text-xs text-ink-500">#{o.id}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-ink-100 truncate">{o.customerName}</p>
                    <p className="text-xs text-ink-500 mt-0.5 truncate">{o.customerEmail}</p>
                  </div>
                  <div className="hidden sm:block text-xs text-ink-600">
                    {new Date(o.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div className="font-mono font-semibold text-amber-400 text-sm">
                    ${Number(o.total).toFixed(2)}
                  </div>
                  <span className={`badge badge-${o.status} hidden sm:inline-flex`}>{o.status}</span>
                  <svg
                    className={`w-4 h-4 text-ink-600 shrink-0 transition-transform duration-200 ${expanded === o.id ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>

                {/* Expanded */}
                {expanded === o.id && (
                  <div className="border-t border-white/[0.06] p-5 bg-ink-900/30">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-3">Articles</p>
                        <div className="space-y-2">
                          {o.items?.map(i => (
                            <div key={i.id} className="flex justify-between text-sm">
                              <span className="text-ink-300">{i.product?.name} <span className="text-ink-600">×{i.quantity}</span></span>
                              <span className="font-mono text-ink-400">${(Number(i.unitPrice) * i.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                        {o.shippingAddress && (
                          <div className="mt-4">
                            <p className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-1">Livrer à</p>
                            <p className="text-sm text-ink-400">{o.shippingAddress}</p>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-3">Mettre à jour le statut</p>
                        <select
                          className="input text-sm"
                          value={o.status}
                          onChange={e => handleStatus(o.id, e.target.value)}
                        >
                          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s === 'pending' ? 'En attente' : s === 'confirmed' ? 'Confirmée' : s === 'shipped' ? 'Expédiée' : s === 'delivered' ? 'Livrée' : 'Annulée'}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
