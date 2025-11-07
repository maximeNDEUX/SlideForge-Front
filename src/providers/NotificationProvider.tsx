import { useState } from 'react';
import type { ReactNode } from 'react';
import type { NotificationContextType, Notification } from '../types/NotificationContextType';
import { NotificationContext } from '../contexts/NotificationContext';
import Toast from '../components/Toast';

interface NotificationProviderProps {
	children: ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const addNotification = (message: string, type: Notification['type']) => {
		const id = crypto.randomUUID();
		setNotifications((prev) => [...prev, { id, message, type }]);
	};

	const removeNotification = (id: string) => {
		setNotifications((prev) => prev.filter((n) => n.id !== id));
	};
	const showSuccess = (message: string) => addNotification(message, 'success');
	const showError = (message: string) => addNotification(message, 'error');
	const showInfo = (message: string) => addNotification(message, 'info');
	const showWarning = (message: string) => addNotification(message, 'warning');

	const value: NotificationContextType = {
		notifications,
		addNotification,
		removeNotification,
		showSuccess,
		showError,
		showInfo,
		showWarning,
	};

	return (
		<NotificationContext.Provider value={value}>
			{children}
			<div className="fixed top-4 right-4 z-50 space-y-2">
				{notifications.map((n, index) => (
					<div key={n.id} style={{ marginTop: index > 0 ? '0.5rem' : '0' }}>
						<Toast
							message={n.message}
							type={n.type}
							onClose={() => removeNotification(n.id)}
							duration={3000}
						/>
					</div>
				))}
			</div>
		</NotificationContext.Provider>
	);
};
