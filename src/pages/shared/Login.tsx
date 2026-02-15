import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';

type DemoCredential = {
  label: string;
  email: string;
  password: string;
};

const DEMO_CREDENTIALS: DemoCredential[] = [
  { label: 'admin@gabrodev.com', email: 'admin@gabrodev.com', password: 'admin' },
  { label: 'tenant@gabrodev.com', email: 'tenant@gabrodev.com', password: 'client' },
];

const Login = () => {
  const navigate = useNavigate();
  const { login, authLoading, authError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      const loggedUser = await login({
        email: email.trim(),
        password: password.trim(),
        rememberSession: rememberMe,
      });
      navigate(loggedUser.role === 'admin' ? '/admin' : '/tenant', { replace: true });
    } catch {
      // Error is surfaced by auth context.
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#84A9D7] via-[#ABC2DE] to-[#E9EEF5] px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/15 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-32 right-12 h-72 w-72 rounded-full bg-white/20 blur-2xl" />

      <section className="mx-auto w-full max-w-4xl overflow-hidden rounded-3xl border border-white/40 bg-white/95 shadow-[0_35px_90px_rgba(15,23,42,0.28)]">
        <header className="flex items-center gap-3 border-b border-slate-200 bg-[#F3F5F8] px-6 py-4">
          <img src="/GabroDevLogo.png" alt="Gabrodev logo" className="h-8 w-8 object-contain" />
          <span className="text-2xl font-semibold tracking-tight text-slate-800">Gabrodev</span>
        </header>

        <div className="px-6 py-10 sm:px-12 sm:py-14">
          <div className="mx-auto max-w-sm">
            <h1 className="text-center text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Welcome Back
            </h1>
            <p className="mt-3 text-center text-lg text-slate-500">
              Enter home again, where every detail is made for you.
            </p>

            {authError ? (
              <p className="mt-6 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                {authError}
              </p>
            ) : null}

            <form className="mt-8 space-y-4" onSubmit={(event) => void handleSubmit(event)}>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-700 outline-none transition focus:border-[#2F80ED] focus:ring-2 focus:ring-[#56CCF2]/40"
              />

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-700 outline-none transition focus:border-[#2F80ED] focus:ring-2 focus:ring-[#56CCF2]/40"
              />

              <div className="flex items-center justify-between gap-3">
                <label
                  htmlFor="remember-me"
                  className="flex items-center gap-2 text-sm text-slate-500"
                >
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-[#2F80ED] focus:ring-[#56CCF2]"
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  className="text-sm font-medium text-[#2F80ED] hover:text-[#1c6fe0]"
                >
                  Forgot password?
                </button>
              </div>

              <div className="pt-1">
                <Button
                  type="submit"
                  disabled={authLoading}
                  className="mx-auto block min-w-40"
                  aria-label="Login"
                >
                  {authLoading ? 'Logging in...' : 'Login'}
                </Button>
              </div>
            </form>

            <div className="mt-8 border-t border-slate-200 pt-5">
              <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Demo Accounts
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {DEMO_CREDENTIALS.map((credential) => (
                  <button
                    key={credential.email}
                    type="button"
                    onClick={() => {
                      setEmail(credential.email);
                      setPassword(credential.password);
                    }}
                    className="rounded-full border border-[#2F80ED]/30 bg-[#2F80ED]/5 px-3 py-1 text-sm font-medium text-[#2F80ED] transition hover:bg-[#2F80ED]/10"
                  >
                    {credential.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
