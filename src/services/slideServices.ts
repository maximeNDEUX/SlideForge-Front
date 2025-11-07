import api from '../api/api';

export const slideService = {
	async getAll(deckId: number) {
		const response = await api.get(`/decks/${deckId}/slides`);
		return response.data.slides;
	},
	async create(deckId: number, slide: unknown) {
		const response = await api.post(`/decks/${deckId}/slides`, slide);
		return response.data;
	},
	async update(slideId: number, data: unknown) {
		const response = await api.put(`/slides/${slideId}`, data);
		return response.data;
	},
	async remove(slideId: number) {
		await api.delete(`/slides/${slideId}`);
	},
};
