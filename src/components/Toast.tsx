import { useEffect } from 'react';
import type { ToastProps } from '../types/ToastType';
import { XIcon, InfoIcon, AlertTriangleIcon, XCircleIcon, CheckCircle2Icon } from 'lucide-react';

export default function Toast({ message, type = 'info', onClose, duration = 3000 }: ToastProps) {
	useEffect(() => {
		if (duration && onClose) {
			const timer = setTimeout(() => {
				onClose();
			}, duration);
			return () => clearTimeout(timer);
		}
	}, [duration, onClose]);

	const styles = {
		success: 'border bg-success border-border-success text-highlight',
		error: 'border bg-danger border-border-danger text-highlight',
		warning: 'border bg-warning border-border-warning text-highlight',
		info: 'border bg-info border-border-info text-highlight',
	};

	const icons = {
		success: <CheckCircle2Icon className="h-5 w-5 text-green-100" />,
		error: <XCircleIcon className="h-5 w-5 text-red-100" />,
		warning: <AlertTriangleIcon className="h-5 w-5 text-yellow-100" />,
		info: <InfoIcon className="h-5 w-5 text-blue-100" />,
	};

	return (
		<div
			className={`flex max-w-md min-w-80 items-center items-start justify-between rounded border-2 px-4 py-3 shadow-lg ${styles[type]}`}
		>
			<div className="flex items-center gap-3">
				<span className="text-xl font-bold">{icons[type]}</span>
				<p className="flex-1">{message}</p>
			</div>
			{onClose && (
				<button
					onClick={onClose}
					className="ml-4 text-xl font-bold opacity-70 hover:opacity-100"
				>
					<XIcon className="h-4 w-4" />
				</button>
			)}
		</div>
	);
}
