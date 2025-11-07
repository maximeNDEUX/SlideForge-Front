import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types/User';
import { authService } from '../services/authServices';
import type { AxiosError } from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import type { AuthContextType } from '../types/AuthContextType';

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProfile = async () => {
			if (token) {
				try {
					const profile = await authService.getProfile();
					console.log('profile ', profile);
					setUser(profile);
				} catch (error) {
					console.warn('Impossible de charger le profil :', error);
					localStorage.removeItem('token');
					setUser(null);
					setToken(null);
				}
			}
			setLoading(false);
		};
		fetchProfile();
	}, [token]);

	const register: AuthContextType['register'] = async (name, email, password) => {
		try {
			const { token, user } = await authService.register(name, email, password);
			localStorage.setItem('token', token);
			setToken(token);
			setUser(user);
			return { success: true, message: 'Inscription réussie' };
		} catch (err: unknown) {
			const error = err as AxiosError<{ message: string }>;
			return {
				success: false,
				message: error.response?.data?.message || 'Une erreur est survenue',
			};
		}
	};

	const login: AuthContextType['login'] = async (email, password) => {
		try {
			const { token, user } = await authService.login(email, password);
			localStorage.setItem('token', token);
			setToken(token);
			setUser(user);
			return { success: true, message: 'Connexion réussie' };
		} catch (err: unknown) {
			const error = err as AxiosError<{ message: string }>;
			return {
				success: false,
				message: error.response?.data?.message || 'Une erreur est survenue',
			};
		}
	};

	const logout = () => {
		localStorage.removeItem('token');
		setToken(null);
		setUser(null);
	};

	const isAuthenticated = () => !!token;

	return (
		<AuthContext.Provider value={{ user, register, login, logout, isAuthenticated, loading }}>
			{children}
		</AuthContext.Provider>
	);
};
