import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function SignUpPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) { setError('Les mots de passe ne correspondent pas'); return; }
    if (form.password.length < 6) { setError('Le mot de passe doit contenir au moins 6 caractères'); return; }
    setLoading(true);
    try { await signUp({ firstName: form.firstName, lastName: form.lastName, email: form.email, password: form.password }); navigate('/'); }
    catch (err) { setError(err.message || 'Sign up failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen pt-16 flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-ink-900 border-r border-white/[0.06] items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/[0.07] rounded-full blur-3xl" />
        <div className="relative text-center px-12">
          <div className="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center mx-auto mb-6 shadow-glow-amber">
            <span className="text-ink-950 text-2xl font-bold font-display">S</span>
          </div>
          <h2 className="font-display font-bold text-3xl text-ink-50 mb-4">Rejoignez ShopNest.</h2>
          <p className="text-ink-500 leading-relaxed">Créez votre compte gratuit et commencez à découvrir les produits premium sélectionnés rien que pour vous.</p>
          <div className="mt-10 space-y-3">
            {['✓  Livraison gratuite et rapide sur toutes les commandes', '✓  Retours sans problème de 30 jours', '✓  Offres exclusives pour les membres'].map(f => (
              <p key={f} className="text-sm text-ink-500">{f}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h1 className="font-display font-bold text-3xl text-ink-50 mb-2">Créer un compte</h1>
            <p className="text-ink-500 text-sm">Vous en avez déjà un ? <Link to="/sign-in" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">Se connecter</Link></p>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-3 px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-ink-400 uppercase tracking-wider">Prénom</label>
                <input className="input" placeholder="Jane" value={form.firstName} onChange={e => set('firstName', e.target.value)} required autoComplete="given-name" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-ink-400 uppercase tracking-wider">Nom</label>
                <input className="input" placeholder="Doe" value={form.lastName} onChange={e => set('lastName', e.target.value)} required autoComplete="family-name" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-ink-400 uppercase tracking-wider">Email</label>
              <input className="input" type="email" placeholder="vous@example.com" value={form.email} onChange={e => set('email', e.target.value)} required autoComplete="email" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-ink-400 uppercase tracking-wider">Mot de passe <span className="text-ink-600 normal-case tracking-normal font-normal">(min. 6 caractères)</span></label>
              <input className="input" type="password" placeholder="••••••••" value={form.password} onChange={e => set('password', e.target.value)} required autoComplete="new-password" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-ink-400 uppercase tracking-wider">Confirmer le mot de passe</label>
              <input className="input" type="password" placeholder="••••••••" value={form.confirm} onChange={e => set('confirm', e.target.value)} required autoComplete="new-password" />
            </div>
            <button type="submit" className="btn-amber w-full justify-center py-3.5 rounded-xl text-sm mt-2" disabled={loading}>
              {loading ? 'Création du compte…' : 'Créer un compte →'}
            </button>
          </form>

          <p className="text-xs text-ink-600 text-center mt-6">
            En créant un compte, vous acceptez nos Conditions d'utilisation et notre Politique de confidentialité.
          </p>
        </div>
      </div>
    </div>
  );
}
