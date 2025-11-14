// /src/components/AppLogo.tsx

import { PresentationIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AppLogo() {
	return (
		<Link
			to="/dashboard"
			className="bg-bg-light text-primary hover:text-primary-hover flex items-center justify-center gap-2 rounded-md px-4 py-2"
		>
			<PresentationIcon className="" />
			<p className="text-xl font-medium tracking-wide">SlideForge</p>
		</Link>
	);
}
