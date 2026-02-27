import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function SignInPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try { await signIn(form.email, form.password); navigate(from, { replace: true }); }
    catch (err) { setError(err.message || 'Invalid credentials'); }
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
          <h2 className="font-display font-bold text-3xl text-ink-50 mb-4">Bienvenue.</h2>
          <p className="text-ink-500 leading-relaxed">Connectez-vous pour accéder à vos commandes, articles enregistrés et recommandations personnalisées.</p>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {['Electronics', 'Clothing', 'Books'].map(c => (
              <div key={c} className="px-3 py-2 rounded-xl bg-ink-800/60 border border-white/[0.06] text-xs text-ink-500 font-medium">{c}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h1 className="font-display font-bold text-3xl text-ink-50 mb-2">Se connecter</h1>
            <p className="text-ink-500 text-sm">Vous n'avez pas de compte ? <Link to="/sign-up" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">S'inscrire</Link></p>
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
            <div className="space-y-2">
              <label className="text-xs font-semibold text-ink-400 uppercase tracking-wider">Email</label>
              <input className="input" type="email" placeholder="vous@example.com" value={form.email} onChange={e => set('email', e.target.value)} required autoComplete="email" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-ink-400 uppercase tracking-wider">Mot de passe</label>
              <input className="input" type="password" placeholder="••••••••" value={form.password} onChange={e => set('password', e.target.value)} required autoComplete="current-password" />
            </div>
            <button type="submit" className="btn-amber w-full justify-center py-3.5 rounded-xl text-sm mt-6" disabled={loading}>
              {loading ? 'Connexion…' : 'Se connecter →'}
            </button>
          </form>

          <div className="mt-8 p-4 rounded-xl bg-ink-800/50 border border-white/[0.06] space-y-2">
            <p className="text-xs font-semibold text-ink-500 uppercase tracking-wider">Comptes de démonstration</p>
            <div className="text-xs text-ink-600 space-y-1 font-mono">
              <p><span className="text-amber-500">Admin :</span> admin@shopnest.com / Admin1234!</p>
              <p><span className="text-ink-500">Client :</span> customer@example.com / Customer123!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
