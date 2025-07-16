'use client'

import css from './SignUpPage.module.css';
import { register, RegisterRequest } from '../../../lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SignUp = () => {
    const router = useRouter();
    const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const formValues = {
      email: form.get('email') as string,
      password: form.get('password') as string,
    } as RegisterRequest;

    try {
      const user = await register(formValues); 
      if (user) {
        router.push('/profile');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err: unknown) {
      console.error('Registration error:', err);
      if (err instanceof Error) {
        setError(err.message || 'Registration failed.');
      } else {
        setError('Registration failed.');
      }
    }
  };

    return (
        <main className={css.mainContent}>
  <h1 className={css.formTitle}>Sign up</h1>
	<form className={css.form} onSubmit={handleSubmit}>
    <div className={css.formGroup}>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" className={css.input} required />
    </div>

    <div className={css.formGroup}>
      <label htmlFor="password">Password</label>
      <input id="password" type="password" name="password" className={css.input} required />
    </div>

    <div className={css.actions}>
      <button type="submit" className={css.submitButton}>
        Register
      </button>
    </div>

    {error && <p className={css.error}>{error}</p>}
  </form>
</main>
    )
}

export default SignUp;