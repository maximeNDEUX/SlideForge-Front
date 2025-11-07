// /src/components/auth/LogginButton.tsx

import { LogInIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LoginButton() {
	return (
		<Link
			to="/login"
			className="bg-primary hover:bg-primary-hover text-highlight focus:ring-primary flex gap-2 rounded-md px-4 py-2 font-medium shadow-sm transition-colors duration-200 hover:cursor-pointer focus:ring-2 focus:ring-offset-2 focus:outline-none"
		>
			<LogInIcon />
			<p className="hidden sm:block">Connexion</p>
		</Link>
	);
}
