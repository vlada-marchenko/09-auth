'use client'

import css from './SignInPage.module.css'
import { login, LoginRequest } from '../../../lib/api/clientApi'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const SignIn = () => {
    const [error, setError] = useState('')
    const router = useRouter()

        const handleSubmit = async (formData: FormData) => {
            try {
                const formValues = Object.fromEntries(formData) as unknown as LoginRequest
                const res = await login(formValues)
    
                if(res) {
                    router.push('/profile')
                } else {
                    setError('Login failed. Please try again.')
                }
            } catch (err) {
                console.error('Login error:', err);
            }
        }

    return (
        <main className={css.mainContent}>
 <form action={handleSubmit} className={css.form}>
    <h1 className={css.formTitle}>Sign in</h1>

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
        Log in
      </button>
    </div>

    {error && <p className={css.error}>{error}</p>}
  </form>
</main>
    )
}

export default SignIn;