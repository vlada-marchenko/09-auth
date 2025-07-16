import { create } from 'zustand';
import  User from '../../types/user';
import { persist } from 'zustand/middleware';

export type AuthStore = {
    isAuth: boolean;
    user: User | null
    setUser: (user: User) => void
    clearUser: () => void
}

export const useAuth = create<AuthStore>()(
    persist(
        (set) => ({
            isAuth: false,
            user: null,
            setUser: (user: User) => set(() => ({ user, isAuth: true })),
            clearUser: () => set(() => ({ user: null, isAuth: false }))
        }),
        {
            name: 'auth-storage',
            partialize: (state: AuthStore) => ({
                isAuth: state.isAuth,
                user: state.user
            }) 
        }
    )
)