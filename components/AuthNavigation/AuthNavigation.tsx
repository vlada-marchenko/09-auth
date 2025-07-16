'use client'

import css from './AuthNavigation.module.css';
import Link from 'next/link';
import { useAuth } from '../../lib/store/authStore';
import { useRouter } from 'next/navigation';
import { logOut } from '../../lib/api/clientApi';

const AuthNavigation = () => {
const user = useAuth(state => state.user)
const isAuth = useAuth(state => state.isAuth)
const clearUser = useAuth(state => state.clearUser)
  const router = useRouter()

    const handleLogOut = async () => {
    await logOut()
    clearUser()
    router.replace('/sign-in')
  }

    return (
      <ul>
        {isAuth ? (
          <>
            <li className={css.navigationItem}>
              <Link href="/profile" prefetch={false} className={css.navigationLink}>
                Profile
              </Link>
            </li>
            <li className={css.navigationItem}>
              <p className={css.userEmail}>{user?.email}</p>
              <button onClick={handleLogOut} className={css.logoutButton}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className={css.navigationItem}>
              <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
                Login
              </Link>
            </li>
            <li className={css.navigationItem}>
              <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
                Sign up
              </Link>
            </li>
          </>
        )}
      </ul>
    );
}

export default AuthNavigation;