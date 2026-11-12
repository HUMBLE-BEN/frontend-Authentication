import { useState } from 'react';

import { userLogin } from '../api/auth.api.js';
import Alert from './Alert.jsx';
import Button from './Button.jsx';
import InputField from './InputField.jsx';

function Login({ onRegister }) {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setCredentials((previous) => ({ ...previous, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    const email = credentials.email.trim().toLowerCase();
    if (!email || !credentials.password) {
      setErrorMessage('Enter your email and password.');
      return;
    }

    setLoading(true);
    try {
      const result = await userLogin({ email, password: credentials.password });
      if (!result.success) {
        setErrorMessage(result.message);
        return;
      }
      setSuccessMessage(result.message || 'Login successful.');
    } catch {
      setErrorMessage('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto w-full max-w-lg space-y-6 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-800">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-600">Log in to your account.</p>
      </header>

      <Alert type="success" message={successMessage} />
      <Alert type="error" message={errorMessage} />

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="you@example.com"
          disabled={loading}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          inputMode="text"
          autoComplete="current-password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Enter your password"
          disabled={loading}
        />
        <Button type="submit" loading={loading}>
          Log in
        </Button>
      </form>

      <p className="text-sm text-slate-600">
        Don’t have an account?{' '}
        <button
          type="button"
          onClick={onRegister}
          className="font-medium text-blue-700 hover:underline"
        >
          Create one
        </button>
      </p>
    </section>
  );
}

export default Login;
