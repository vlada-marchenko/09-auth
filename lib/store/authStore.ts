import { create } from 'zustand';
import  User from '../../types/user';

export type AuthStore = {
    isAuth: boolean;
    user: User | null
    setUser: (user: User) => void
    clearUser: () => void
}

export const useAuth = create<AuthStore>((set) => ({
    isAuth: false,
    user: null,
    setUser: (user: User) => set(() => ({user, isAuth: true})),
    clearUser: () => set(() => ({user: null, isAuth: false}))
}))