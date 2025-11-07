export interface Slide {
	id: number;
	deckId: number;
	kind: 'title' | 'text' | 'image' | 'split' | 'list' | 'quote' | 'code';
	title: string;
	content: string;
	imageUrl?: string | null;
	order: number;
	bg: string;
	createdAt: string;
	updatedAt: string;
}
