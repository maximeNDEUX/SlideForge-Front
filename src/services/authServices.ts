import api from '../api/api.ts';
import type { User } from '../types/User';

interface AuthResponse {
	token: string;
	user: User;
}

export const authService = {
	/** Enregistre un nouvel utilisateur */
	async register(name: string, email: string, password: string): Promise<AuthResponse> {
		const response = await api.post('/auth/register', { name, email, password });

		// const response = await api.post('/auth/login', { email, password });
		return response.data; // { token, user }
	},

	/** Connecte un utilisateur */
	async login(email: string, password: string): Promise<AuthResponse> {
		const response = await api.post('/auth/login', { email, password });
		return response.data;
	},

	async getProfile() {
		const res = await api.get('/auth/me');
		return res.data;
	},
};
