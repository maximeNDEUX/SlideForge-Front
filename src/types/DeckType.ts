import type { Slide } from './SlideType.ts';

export interface Deck {
	id: number;
	title: string;
	theme: 'default' | 'dark' | 'light' | 'blue' | 'green' | 'red' | 'purple';
	ratio: '16:9' | '4:3' | '16:10';
	userId: number;
	slides?: Slide[];
	createdAt: string;
	updatedAt: string;
}
