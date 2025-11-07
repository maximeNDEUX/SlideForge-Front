export interface ToastProps {
	message: string;
	type?: 'success' | 'error' | 'warning' | 'info'; // 👈 typage du type de message
	onClose?: () => void; // 👈 fonction optionnelle
	duration?: number; // 👈 durée optionnelle
}
