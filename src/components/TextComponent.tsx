import { useAuth } from '../hooks/useAuth';

export default function TestComponent() {
	const { user, logout, isAuthenticated } = useAuth();

	return (
		<nav className="gap-4 bg-gray-800 p-4 text-white">
			{isAuthenticated() ? (
				<div>
					<span>Bonjour, {user?.name}</span>
					<button onClick={logout} className="ml-2 rounded bg-red-600 px-3 py-1">
						Déconnexion
					</button>
				</div>
			) : (
				<a href="/login">Connexion</a>
			)}
		</nav>
	);
}
