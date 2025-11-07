import api from '../api/api.ts';
import type { Deck } from '../types/DeckType';

export const deckService = {
	async getAll(): Promise<Deck[]> {
		const resp = await api.get('/decks');
		return resp.data.decks;
	},
	async getOne(id: number): Promise<Deck> {
		const resp = await api.get(`/decks/${id}`);
		return resp.data;
	},
	async create(data: { title: string; theme: string; ratio: string }): Promise<Deck> {
		const response = await api.post('/decks', data);
		return response.data;
	},
	async update(id: number, data: Partial<Deck>): Promise<Deck> {
		const response = await api.put(`/decks/${id}`, data);
		return response.data;
	},
	async remove(id: number): Promise<void> {
		await api.delete(`/decks/${id}`);
	},
};
