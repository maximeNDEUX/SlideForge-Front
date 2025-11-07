import type { User } from './User';

export interface AuthContextType {
	user: User | null;
	register: (
		name: string,
		email: string,
		password: string
	) => Promise<{ success: boolean; message?: string }>;
	login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
	logout: () => void;
	isAuthenticated(): boolean;
	loading: boolean;
}
