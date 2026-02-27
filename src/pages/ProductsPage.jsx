import { useLoaderData, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

function ProductCard({ p, onAdd, adding }) {
  return (
    <Link
      to={`/products/${p.id}`}
      className="group flex flex-col bg-ink-800 border border-white/[0.07] rounded-2xl overflow-hidden hover:border-amber-500/25 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5"
    >
      <div className="aspect-[4/3] overflow-hidden bg-ink-700">
        {p.imageUrl ? (
          <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl opacity-20">🏷️</div>
        )}
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        {p.category && <span className="text-[11px] font-semibold tracking-widest uppercase text-amber-500">{p.category.name}</span>}
        <h3 className="font-display font-semibold text-sm text-ink-100 line-clamp-2 group-hover:text-amber-100 transition-colors leading-snug">{p.name}</h3>
        {p.description && <p className="text-ink-500 text-xs line-clamp-2 leading-relaxed">{p.description}</p>}
        <div className="mt-auto pt-3 flex items-center justify-between border-t border-white/[0.06]">
          <span className="font-mono font-medium text-amber-400">${Number(p.price).toFixed(2)}</span>
          <button
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
              p.stock === 0 ? 'bg-ink-700 text-ink-600 cursor-not-allowed' :
              adding ? 'bg-amber-500/20 text-amber-400 cursor-wait' :
              'bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-ink-950'
            }`}
            disabled={p.stock === 0 || adding}
            onClick={e => { e.preventDefault(); onAdd(p.id); }}
          >
            {adding ? '…' : p.stock > 0 ? '+ Ajouter' : 'Rupture de stock'}
          </button>
        </div>
      </div>
    </Link>
  );
}

export default function ProductsPage() {
  const { products, categories } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const { add } = useCart();
  const [addingId, setAddingId] = useState(null);

  const search = searchParams.get('search') || '';
  const categoryId = searchParams.get('categoryId') || '';

  const setFilter = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value); else next.delete(key);
    setSearchParams(next);
  };

  const handleAdd = async (productId) => {
    setAddingId(productId);
    try { await add(productId, 1); } finally { setAddingId(null); }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-2">Catalogue</p>
          <h1 className="font-display font-bold text-4xl text-ink-50">Tous les produits</h1>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8 p-4 bg-ink-800/50 border border-white/[0.06] rounded-2xl">
          <div className="flex-1 min-w-[200px]">
            <input
              className="input text-sm"
              placeholder="Rechercher des produits…"
              value={search}
              onChange={e => setFilter('search', e.target.value)}
            />
          </div>
          <select
            className="input text-sm w-auto min-w-[180px]"
            value={categoryId}
            onChange={e => setFilter('categoryId', e.target.value)}
          >
            <option value="">Toutes les catégories</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          {(search || categoryId) && (
            <button className="btn-ghost text-xs" onClick={() => setSearchParams({})}>
              ✕ Effacer
            </button>
          )}
        </div>

        {/* Grid */}
        {products.length === 0 ? (
          <div className="text-center py-24 text-ink-600">
            <p className="text-4xl mb-4">🔍</p>
            <p className="font-display text-xl text-ink-400">Aucun produit trouvé</p>
            <p className="text-sm mt-2">Essayez d'ajuster vos filtres.</p>
          </div>
        ) : (
          <>
            <p className="text-xs text-ink-600 mb-5">{products.length} produit{products.length !== 1 ? 's' : ''}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {products.map(p => (
                <ProductCard key={p.id} p={p} onAdd={handleAdd} adding={addingId === p.id} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
