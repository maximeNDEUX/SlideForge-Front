// /src/components/auth/LogoutButton.tsx

import { LogOutIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

export default function LogoutButton() {
	const { logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate('/login');
	};

	return (
		<button
			onClick={handleLogout}
			className="bg-danger hover:bg-danger-hover text-highlight focus:ring-danger flex gap-2 rounded-md px-4 py-2 font-medium shadow-sm transition-colors duration-200 hover:cursor-pointer focus:ring-2 focus:ring-offset-2 focus:outline-none"
		>
			<LogOutIcon />
			<p className="hidden sm:block">Déconnexion</p>
		</button>
	);
}
