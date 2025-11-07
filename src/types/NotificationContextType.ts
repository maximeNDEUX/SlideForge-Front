export interface Notification {
	id: string;
	message: string;
	type: 'success' | 'error' | 'info' | 'warning';
}

export interface NotificationContextType {
	notifications: Notification[];
	addNotification: (message: string, type: Notification['type']) => void;
	removeNotification: (id: string) => void;
	showSuccess: (message: string) => void;
	showError: (message: string) => void;
	showInfo: (message: string) => void;
	showWarning: (message: string) => void;
}
