// /src/components/auth/RegisterButton.tsx

import { IdCardLanyardIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RegisterButton() {
	return (
		<Link
			to="/register"
			className="bg-secondary hover:bg-secondary-hover text-highlight focus:ring-secondary flex gap-2 rounded-md px-4 py-2 font-medium shadow-md transition-colors duration-200 hover:cursor-pointer focus:ring-2 focus:ring-offset-2 focus:outline-none"
		>
			<IdCardLanyardIcon />
			<p className="hidden sm:block">Inscription</p>
		</Link>
	);
}
