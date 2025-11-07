// /src/pages/Login.jsx

// import { useState } from 'react';
// import wallpaper from '../assets/login-wallpaper.jpg';
// import AppLogo from '../components/AppLogo';

// import { useAuth } from '../hooks/useAuth';
// import { Link, useNavigate } from 'react-router-dom';
// import { KeyRoundIcon, MailIcon, OctagonAlertIcon } from 'lucide-react';
// import type { User } from '../types/User';

export default function Login() {
	// const { login } = useAuth();
	// const navigate = useNavigate();

	// const [formData, setFormData] = useState<User>({
	// 	// email: '',
	// 	// password: '',
	// });

	// const [errorMessage, setErrorMessage] = useState<string | null>(null);

	// const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	// setFormData({ ...formData, [e.target.name]: e.target.value });
	// };

	// const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
	// 	// e.preventDefault();
	// 	// setErrorMessage('');
	// 	// const result = await login(formData.email, formData.password);
	// 	// if (result.success) {
	// 	// 	navigate('/');
	// 	// } else {
	// 	// 	setErrorMessage(result.error || null);
	// 	// }
	// };

	return (
		<div>Login page</div>
		// <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
		// 	Formulaire d'inscription
		// 	<div className="bg-bg-dark flex flex-col items-center justify-center">
		// 		<div className="bg-bg w-full max-w-md space-y-8 rounded-lg p-8 shadow-lg">
		// 			{/* Titre */}
		// 			<AppLogo />
		// 			<div className="space-y-2">
		// 				<h2 className="text-text text-2xl font-bold">Connexion</h2>
		// 				<p className="text-text-muted">Connectez-vous pour accéder à ce contenu</p>
		// 			</div>
		// 			{/* Formulaire */}
		// 			<form onSubmit={handleSubmit} className="space-y-8">
		// 				{/* Email */}
		// 				<div className="flex flex-col space-y-2">
		// 					<div className="flex items-center gap-2">
		// 						<MailIcon className="text-text-muted h-4 w-4" />
		// 						<label className="text-text font-medium">Adresse email</label>
		// 					</div>
		// 					<input
		// 						id="email"
		// 						name="email"
		// 						value={formData.email}
		// 						onChange={handleChange}
		// 						type="email"
		// 						placeholder="Entrez votre adresse mail"
		// 					<div className="flex items-center gap-2">
		// 						<KeyRoundIcon className="text-text-muted h-4 w-4" />
		// 						<label className="text-text font-medium">Mot de passe</label>
		// 					</div>{' '}
		// 					<input
		// 						id="password"
		// 						name="password"
		// 						// value={formData.password}
		// 						onChange={handleChange}
		// 						type="password"
		// 						placeholder="Entrez votre mot de passe"
		// 						className="bg-bg-light border-border-muted focus:ring-primary w-full rounded-md border px-2 py-1 transition-shadow duration-200 focus:border-none focus:ring-2 focus:outline-none"
		// 					></input>
		// 				</div>

		// 				{/* Message d'erreur */}
		// 				{errorMessage && (
		// 					<div className="border-danger bg-bg-danger flex items-center gap-2 rounded-md border p-2">
		// 						<OctagonAlertIcon className="text-danger h-4 w-4" />
		// 						<p className="text-danger justify-center font-medium">
		// 							{errorMessage}
		// 						</p>
		// 					</div>
		// 				)}

		// 				{/* Bouton de validation */}
		// 				<button
		// 					type="submit"
		// 					className="bg-primary hover:bg-primary-hover text-highlight focus:ring-primary w-full rounded-md px-4 py-2 font-medium shadow-sm transition-colors duration-200 hover:cursor-pointer focus:ring-2 focus:ring-offset-2 focus:outline-none"
		// 				>
		// 					Connexion
		// 				</button>
		// 			</form>

		// 			<p className="mt-4 text-center text-sm text-gray-600">
		// 				Pas de compte ?{' '}
		// 				<Link
		// 					to="/register"
		// 					className="text-primary hover:text-primary-hover font-semibold hover:underline"
		// 				>
		// 					Inscrivez-vous
		// 				</Link>
		// 			</p>
		// 		</div>
		// 	</div>
		// 	{/* Image décorative */}
		// 	<div className="bg-bg-darker hidden flex-col lg:flex">
		// 		<img
		// 			src={wallpaper}
		// 			alt="Login Wallpaper"
		// 			className="m-8 h-full rounded-lg object-cover shadow-2xl grayscale"
		// 		/>
		// 	</div>						className="border-border-muted focus:ring-primary bg-bg-light w-full rounded-md border px-2 py-1 transition-shadow duration-200 focus:border-none focus:ring-2 focus:outline-none"
		// 					></input>
		// 				</div>
		// 				{/* Mot de passe */}
		// 				<div className="flex flex-col space-y-2">

		// </div>
	);
}
