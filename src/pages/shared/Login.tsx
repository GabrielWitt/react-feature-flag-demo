import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      const loggedUser = await login({ email: email.trim(), password: password.trim() });
      navigate(loggedUser.role === 'admin' ? '/admin' : '/tenant', { replace: true });
    } catch {
      // Error is surfaced by auth context.
    }
  };

  return (
    <MainLayout title="Welcome Back" subtitle="Enter home again, where every detail is made for you." showNavigator={false}>
      <div className="rounded-xl border border-slate-200 p-4">
        <h2 className="text-2xl font-semibold mb-4 text-slate-900">Demo Accounts</h2>
        <div className="flex flex-wrap gap-2">
          {DEMO_CREDENTIALS.map((credential) => (
            <Button
              key={credential.email}
              variant="secondary"
              onClick={() => {
                setEmail(credential.email);
                setPassword(credential.password);
              }}
              className="text-sm"
            >
              {credential.label}
            </Button>
          ))}
        </div>
      </div>

      {authError ? <p className="mt-4 text-sm text-red-700">{authError}</p> : null}

      <form className="mt-6 space-y-4" onSubmit={(event) => void handleSubmit(event)}>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-base leading-relaxed"
        />

        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-base leading-relaxed"
        />

        <Button type="submit" disabled={authLoading} className="text-sm" aria-label="Login">
          {authLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </MainLayout>
  );
};

export default Login;
