import { useState } from 'react';

import { registerUser, resendOtp, verifiedEmail } from './api/auth.api.js';
import Alert from './components/Alert.jsx';
import Button from './components/Button.jsx';
import InputField from './components/InputField.jsx';
import Login from './components/Login.jsx';
import OtpInput from './components/OtpInput.jsx';

function App() {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    phoneNumber: '',
    password: '',
  });
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('register');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  }

  async function handleRegister(event) {
    event.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    const userName = formData.userName.trim();
    const normalizedEmail = formData.email.trim().toLowerCase();
    const phoneNumber = formData.phoneNumber.trim();

    if (userName.length < 3 || userName.length > 8) {
      setErrorMessage('Username must be between 3 and 8 characters.');
      return;
    }
    if (formData.password.length < 8 || formData.password.length > 32) {
      setErrorMessage('Password must be between 8 and 32 characters.');
      return;
    }

    setLoading(true);
    try {
      const result = await registerUser({
        userName,
        email: normalizedEmail,
        phoneNumber,
        password: formData.password,
      });

      if (!result.success) {
        setErrorMessage(result.message);
        return;
      }

      setEmail(result.data.email || normalizedEmail);
      setOtp('');
      setStep('verify');
      setSuccessMessage(result.message);
    } catch {
      setErrorMessage('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleVerify(event) {
    event.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (otp.length !== 6) {
      setErrorMessage('Enter the complete 6-character code from your email.');
      return;
    }

    setLoading(true);
    try {
      const result = await verifiedEmail({ email, otp });
      if (!result.success) {
        setErrorMessage(result.message);
        return;
      }

      setStep('complete');
      setSuccessMessage(result.message);
    } catch {
      setErrorMessage('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleResendOtp() {
    setSuccessMessage('');
    setErrorMessage('');
    setLoading(true);
    try {
      const result = await resendOtp({ email });
      if (!result.success) {
        setErrorMessage(result.message);
        return;
      }
      setOtp('');
      setSuccessMessage(result.message);
    } catch {
      setErrorMessage('Could not resend the code. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function showLogin() {
    setStep('login');
    setSuccessMessage('');
    setErrorMessage('');
  }

  function showRegister() {
    setStep('register');
    setSuccessMessage('');
    setErrorMessage('');
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6 sm:grid sm:place-items-center">
      {step === 'login' ? (
        <Login onRegister={showRegister} />
      ) : (
        <section className="mx-auto w-full max-w-lg space-y-6 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <header>
            <h1 className="text-2xl font-bold text-slate-800">
              {step === 'register' && 'Create your account'}
              {step === 'verify' && 'Verify your email'}
              {step === 'complete' && 'Email verified'}
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              {step === 'register' && 'Register to get started.'}
              {step === 'verify' && `Enter the 6-character code sent to ${email}.`}
              {step === 'complete' && 'Your account is ready. You can now log in.'}
            </p>
          </header>

          <Alert type="success" message={successMessage} />
          <Alert type="error" message={errorMessage} />

          {step === 'register' && (
            <>
              <form onSubmit={handleRegister} className="space-y-4">
                <InputField
                  label="Username (3–8 characters)"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  disabled={loading}
                />
                <InputField
                  label="Email address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  disabled={loading}
                />
                <InputField
                  label="Phone number"
                  name="phoneNumber"
                  type="tel"
                  autoComplete="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  disabled={loading}
                />
                <InputField
                  label="Password (8–32 characters)"
                  name="password"
                  type="password"
                  inputMode="text"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  disabled={loading}
                />
                <Button type="submit" loading={loading}>
                  Create account
                </Button>
              </form>
              <p className="text-sm text-slate-600">
                Already have an account?{' '}
                <button type="button" onClick={showLogin} className="font-medium text-blue-700 hover:underline">
                  Log in
                </button>
              </p>
            </>
          )}

          {step === 'verify' && (
            <div className="space-y-5">
              <form onSubmit={handleVerify} className="space-y-4">
                <OtpInput value={otp} onChange={setOtp} disabled={loading} />
                <Button type="submit" loading={loading}>
                  Verify email
                </Button>
              </form>
              <Button
                type="button"
                variant="secondary"
                onClick={handleResendOtp}
                loading={loading}
              >
                Resend code
              </Button>
            </div>
          )}

          {step === 'complete' && (
            <Button type="button" onClick={showLogin}>
              Go to login
            </Button>
          )}
        </section>
      )}
    </main>
  );
}

export default App;
