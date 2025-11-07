import { useAuth } from '../../hooks/useAuth';

export default function UserInfos() {
	const { user, loading } = useAuth();

	if (loading) return <p>Chargement...</p>; // facultatif
	if (!user || !user.name) return null; // ou un fallback

	return (
		<div className="flex items-center gap-3">
			<div className="bg-bg-light text-text-muted flex h-8 w-8 items-center justify-center rounded-full font-medium shadow-sm">
				{user.name[0].toUpperCase()}
			</div>
			<p className="hidden lg:block">{user.name}</p>
		</div>
	);
}
