import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/ui/Card';
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
    <MainLayout title="Welcome Back" subtitle="Sign in to continue" >
      <Card className="mx-auto max-w-xl border border-slate-200">
        <h2 className="text-2xl font-medium mb-4">Demo Accounts</h2>
        <div className="mb-6 flex flex-wrap gap-2">
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

        {authError ? <p className="mb-4 text-sm text-red-600">{authError}</p> : null}

        <form className="space-y-4" onSubmit={(event) => void handleSubmit(event)}>
          <div>
            <label className="text-sm text-gray-500" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base focus-visible:ring-2 focus-visible:ring-[#56CCF2]"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base focus-visible:ring-2 focus-visible:ring-[#56CCF2]"
            />
          </div>

          <Button type="submit" disabled={authLoading} className="w-full" aria-label="Login">
            {authLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Card>
    </MainLayout>
  );
};

export default Login;
