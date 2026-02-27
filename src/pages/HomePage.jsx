import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ProductCard({ product, delay = 0 }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="group relative flex flex-col bg-ink-800 border border-white/[0.07] rounded-2xl overflow-hidden hover:border-amber-500/30 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="aspect-[4/3] overflow-hidden bg-ink-700">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl opacity-30">🏷️</span>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col gap-2 flex-1">
        {product.category && (
          <span className="text-[11px] font-semibold tracking-widest uppercase text-amber-500">
            {product.category.name}
          </span>
        )}
        <h3 className="font-display font-semibold text-ink-100 text-base leading-snug line-clamp-2 group-hover:text-amber-100 transition-colors">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-ink-500 text-xs leading-relaxed line-clamp-2">{product.description}</p>
        )}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/[0.06]">
          <span className="font-mono font-medium text-amber-400 text-base">
            ${Number(product.price).toFixed(2)}
          </span>
          <span className={`text-xs font-medium ${product.stock > 0 ? 'text-jade-400' : 'text-rose-400'}`}>
            {product.stock > 0 ? `${product.stock} en stock` : 'Rupture de stock'}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const { products, categories } = useLoaderData();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-24 px-6">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-amber-500/[0.05] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-amber-600/[0.06] rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-8 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            Nouvelles arrivées chaque semaine
          </div>
          <h1 className="font-display font-bold text-5xl md:text-7xl text-ink-50 leading-[1.05] tracking-tight mb-6 animate-fade-up">
            Découvrez les produits
            <br />
            <span className="text-gradient italic">qui méritent d'être gardés</span>
          </h1>
          <p className="text-ink-400 text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-10 animate-fade-up animate-delay-100">
            Collections sélectionnées de produits premium, livrés à votre porte avec soin.
          </p>
          <div className="flex items-center justify-center gap-3 animate-fade-up animate-delay-200">
            <Link to="/products" className="btn-amber px-7 py-3 text-sm rounded-2xl">
              Acheter maintenant
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link to="/sign-up" className="btn-outline px-7 py-3 text-sm rounded-2xl">Créer un compte</Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-white/[0.06] bg-ink-900/50 py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '12+', label: 'Produits' },
            { value: '5', label: 'Catégories' },
            { value: 'Gratuit', label: 'Livraison' },
            { value: '24/7', label: 'Support' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="font-display font-bold text-2xl text-amber-400">{s.value}</div>
              <div className="text-ink-500 text-xs mt-1 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        {/* Categories */}
        {categories.length > 0 && (
          <section>
            <h2 className="font-display font-semibold text-2xl text-ink-100 mb-6">Parcourir par catégorie</h2>
            <div className="flex gap-3 flex-wrap">
              {categories.map(c => (
                <Link
                  key={c.id}
                  to={`/products?categoryId=${c.id}`}
                  className="px-5 py-2.5 rounded-xl bg-ink-800 border border-white/[0.07] text-sm font-medium text-ink-300 hover:text-amber-400 hover:border-amber-500/30 hover:bg-ink-700 transition-all duration-150"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Featured Products */}
        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-2">En vedette</p>
              <h2 className="font-display font-semibold text-2xl text-ink-100">Dernières arrivées</h2>
            </div>
            <Link to="/products" className="btn-ghost text-sm">Voir tout →</Link>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-24 text-ink-600">
              <p className="text-4xl mb-4">📦</p>
              <p className="font-display text-lg">Aucun produit pour le moment</p>
              <p className="text-sm mt-2">Ajoutez des produits dans le panneau d'administration pour commencer.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {products.map((p, i) => <ProductCard key={p.id} product={p} delay={i * 50} />)}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
