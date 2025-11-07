// /src/pages/Register.jsx

import { useState } from 'react';
import wallpaper from '../assets/login-wallpaper.jpg';
import AppLogo from '../components/AppLogo';
import { useNotification } from '../hooks/useNotification';

import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { KeyRoundIcon, MailIcon, UserIcon } from 'lucide-react';

export const Register = () => {
	const { register } = useAuth();
	const navigate = useNavigate();
	const { showError, showSuccess } = useNotification();
	// const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const result = await register(formData.name, formData.email, formData.password);
		if (result.success) {
			showSuccess('Inscription réussie ! Vous pouvez maintenant vous connecter.');
			navigate('/');
		} else {
			console.log(result.message);
			showError(result.message ?? 'Une erreur est survenue');
		}
	};

	return (
		<div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
			{/* Formulaire d'inscription */}
			<div className="bg-bg-dark flex flex-col items-center justify-center">
				<div className="bg-bg w-full max-w-md space-y-8 rounded-lg p-8 shadow-lg">
					{/* Titre */}
					<AppLogo />
					<div className="space-y-2">
						<h2 className="text-text text-2xl font-bold">Inscription</h2>
						<p className="text-text-muted">
							Créez un compte pour accéder à l'application
						</p>
					</div>
					{/* Formulaire */}
					<form onSubmit={handleSubmit} className="space-y-8">
						{/* Nom */}
						<div className="flex flex-col space-y-2">
							<div className="flex items-center gap-2">
								<UserIcon className="text-text-muted h-4 w-4" />
								<label className="text-text font-medium">Nom</label>
							</div>
							<input
								id="name"
								name="name"
								value={formData.name}
								onChange={handleChange}
								type="text"
								placeholder="Entrez votre nom"
								className="border-border-muted focus:ring-primary bg-bg-light w-full rounded-md border px-2 py-1 transition-shadow duration-200 focus:border-none focus:ring-2 focus:outline-none"
							></input>
						</div>
						{/* Email */}
						<div className="flex flex-col space-y-2">
							<div className="flex items-center gap-2">
								<MailIcon className="text-text-muted h-4 w-4" />
								<label className="text-text font-medium">Adresse email</label>
							</div>
							<input
								id="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								type="email"
								placeholder="Entrez votre adresse mail"
								className="border-border-muted focus:ring-primary bg-bg-light w-full rounded-md border px-2 py-1 transition-shadow duration-200 focus:border-none focus:ring-2 focus:outline-none"
							></input>
						</div>
						{/* Mot de passe */}
						<div className="flex flex-col space-y-2">
							<div className="flex items-center gap-2">
								<KeyRoundIcon className="text-text-muted h-4 w-4" />
								<label className="text-text font-medium">Mot de passe</label>
							</div>{' '}
							<input
								id="password"
								name="password"
								value={formData.password}
								onChange={handleChange}
								type="password"
								placeholder="Entrez votre mot de passe"
								className="bg-bg-light border-border-muted focus:ring-primary w-full rounded-md border px-2 py-1 transition-shadow duration-200 focus:border-none focus:ring-2 focus:outline-none"
							></input>
						</div>

						{/* Message d'erreur */}
						{/* {errorMessage && (
							<div className="border-danger bg-bg-danger flex items-center gap-2 rounded-md border p-2">
								<OctagonAlertIcon className="text-danger h-4 w-4" />
								<p className="text-danger justify-center font-medium">
									{errorMessage}
								</p>
							</div>
						)} */}

						{/* Bouton de validation */}
						<button
							type="submit"
							className="bg-primary hover:bg-primary-hover text-highlight focus:ring-primary w-full rounded-md px-4 py-2 font-medium shadow-sm transition-colors duration-200 hover:cursor-pointer focus:ring-2 focus:ring-offset-2 focus:outline-none"
						>
							Inscription
						</button>
					</form>

					<p className="mt-4 text-center text-sm text-gray-600">
						Déjà inscrit ?{' '}
						<Link
							to="/login"
							className="text-primary hover:text-primary-hover font-semibold hover:underline"
						>
							Connectez-vous
						</Link>
					</p>
				</div>
			</div>
			{/* Image décorative */}
			<div className="bg-bg-darker hidden flex-col shadow-sm lg:flex">
				<img
					src={wallpaper}
					alt="Login Wallpaper"
					className="m-8 h-full rounded-lg object-cover shadow-2xl"
				/>
			</div>
		</div>
	);
};
