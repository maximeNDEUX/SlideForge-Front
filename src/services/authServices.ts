import api from '../api.ts';

export const authService = {
	async getProfile() {
		const res = await api.get('/auth/me');
		return res.data.data;
	},
};
