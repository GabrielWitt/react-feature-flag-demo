import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

type RoleChoice = 'admin' | 'client';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [roleChoice, setRoleChoice] = useState<RoleChoice>('client');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const role = roleChoice === 'admin' ? 'admin' : 'user';
    const nameFromEmail = email.trim().split('@')[0];
    const fallbackName = role === 'admin' ? 'Admin User' : 'Client User';

    login({
      name: nameFromEmail || fallbackName,
      role,
    });

    navigate(role === 'admin' ? '/admin' : '/tenant', { replace: true });
    void rememberMe;
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#99b7d8] via-[#b1c8df] to-[#d2deec] px-4 py-8 sm:px-6 lg:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.26),transparent_40%),radial-gradient(circle_at_85%_80%,rgba(255,255,255,0.2),transparent_35%)]" />
      <div className="relative mx-auto mt-8 w-full max-w-4xl rounded-2xl bg-white shadow-[0_24px_70px_rgba(15,23,42,0.2)] sm:mt-14">
        <header className="rounded-t-2xl border-b border-slate-200 bg-[#f8fafc] px-5 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="grid h-7 w-7 place-items-center rounded-md bg-blue-500 text-sm font-bold text-white">G</div>
            <span className="text-lg font-semibold text-slate-800">Gabrodev</span>
          </div>
        </header>

        <section className="px-5 py-10 sm:px-10 sm:py-14">
          <div className="mx-auto w-full max-w-sm">
            <h1 className="text-center text-4xl font-bold tracking-tight text-slate-900">Welcome Back</h1>
            <p className="mt-2 text-center text-lg text-slate-500">Enter home again, where every detail is made for you.</p>

            <form className="mt-10 space-y-4" onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email"
                className="w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />

              <select
                value={roleChoice}
                onChange={(event) => setRoleChoice(event.target.value as RoleChoice)}
                className="w-full rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                aria-label="Password role selector"
              >
                <option value="client">Password (client)</option>
                <option value="admin">Password (admin)</option>
              </select>

              <label className="flex items-center gap-2 text-sm text-slate-500">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-500 focus:ring-blue-400"
                />
                Remember me
              </label>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="submit"
                  className="min-w-24 rounded-md bg-blue-500 px-6 py-2 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(59,130,246,0.35)] transition hover:bg-blue-600"
                >
                  Login
                </button>
                <a href="#" className="text-sm text-blue-500 underline-offset-2 hover:underline">
                  Forgot password?
                </a>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;
