import { create } from 'zustand';
import  User from '../../types/user';
import { persist } from 'zustand/middleware';

export type AuthStore = {
    isAuthenticated: boolean;
    user: User | null
    setUser: (user: User) => void
    clearUser: () => void
}

export const useAuth = create<AuthStore>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            user: null,
            setUser: (user: User) => set(() => ({ user, isAuthenticated: true })),
            clearUser: () => set(() => ({ user: null, isAuthenticated: false }))
        }),
        {
            name: 'auth-storage',
            partialize: (state: AuthStore) => ({
                isAuthenticated: state.isAuthenticated,
                user: state.user
            }) 
        }
    )
)