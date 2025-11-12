// src/components/DeckModal.tsx
import { useState } from 'react';
import { deckService } from '../services/deckServices';
import { useNotification } from '../hooks/useNotification';
import { ImageUpscaleIcon, InfoIcon, PaletteIcon, PlusIcon, XIcon } from 'lucide-react';

interface DeckModalProps {
	isOpen: boolean;
	onClose: () => void;
	onCreated?: () => void;
}

export default function DeckModal({ isOpen, onClose, onCreated }: DeckModalProps) {
	const { showSuccess, showError } = useNotification();
	const [loading, setLoading] = useState(false);

	const [formData, setFormData] = useState({
		title: '',
		theme: 'default',
		ratio: '16:9',
	});

	if (!isOpen) return null;
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			await deckService.create(formData);
			showSuccess('Présentation créée !');
			onCreated?.();
			onClose();
			setFormData({ title: '', theme: 'default', ratio: '16:9' });
		} catch {
			showError('Erreur lors de la création du deck');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
			<div className="bg-bg relative w-full max-w-md rounded-lg p-6 shadow-xl">
				{/* Bouton fermeture */}
				<button
					onClick={onClose}
					className="absolute top-2 right-3 text-xl text-gray-500 hover:text-gray-700"
				>
					&times;
				</button>

				<div className="space-y-8">
					<h2 className="text-text text-2xl font-bold">Nouvelle présentation</h2>

					<form onSubmit={handleSubmit} className="space-y-4">
						{/* Champ Titre */}
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<InfoIcon className="text-text-muted h-4 w-4" />
								<label className="text-text font-medium">Titre</label>
							</div>
							<input
								id="title"
								name="title"
								value={formData.title}
								onChange={handleChange}
								placeholder="Nom de la présentation"
								required
								className="border-border-muted focus:ring-primary bg-bg-light w-full rounded-md border px-2 py-1 transition-shadow duration-200 focus:border-none focus:ring-2 focus:outline-none"
							/>
						</div>

						{/* Sélecteur de thème */}
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<PaletteIcon className="text-text-muted h-4 w-4" />
								<label className="text-text font-medium">Thème</label>
							</div>
							<select
								id="theme"
								name="theme"
								value={formData.theme}
								onChange={handleChange}
								className="border-border-muted focus:ring-primary bg-bg-light w-full rounded-md border px-2 py-1 transition-shadow duration-200 hover:cursor-pointer focus:border-none focus:ring-2 focus:outline-none"
							>
								<option value="default">Default</option>
								<option value="dark">Dark</option>
								<option value="light">Light</option>
								<option value="blue">Blue</option>
								<option value="green">Green</option>
								<option value="red">Red</option>
								<option value="purple">Purple</option>
							</select>
						</div>

						{/* Sélecteur de ratio */}
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<ImageUpscaleIcon className="text-text-muted h-4 w-4" />
								<label className="text-text font-medium">Ratio</label>
							</div>
							<div className="mt-2 flex gap-4">
								{['16:9', '4:3', '16:10'].map((ratio) => (
									<label
										key={ratio}
										className={`flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 transition ${
											formData.ratio === ratio
												? 'bg-bg-light text-primary border-primary font-medium'
												: 'text-text-muted bg-bg-light border-border hover:border-primary-hover hover:text-primary-hover'
										}`}
									>
										{/* input radio natif */}
										<input
											type="radio"
											name="ratio"
											value={ratio}
											checked={formData.ratio === ratio}
											onChange={(e) =>
												setFormData({
													...formData,
													ratio: e.target.value as
														| '16:9'
														| '4:3'
														| '16:10',
												})
											}
											className="accent-primary cursor-pointer"
										/>
										<span>{ratio}</span>
									</label>
								))}
							</div>
						</div>

						{/* Boutons d’action */}
						<div className="flex justify-end gap-3 pt-2">
							<button
								type="button"
								onClick={onClose}
								className="bg-muted hover:bg-muted-hover text-highlight focus:ring-muted flex gap-2 rounded-md px-4 py-2 font-medium shadow-sm transition-colors duration-200 hover:cursor-pointer focus:ring-2 focus:ring-offset-2 focus:outline-none"
							>
								<XIcon />
								Annuler
							</button>
							<button
								type="submit"
								disabled={loading}
								className="bg-primary hover:bg-primary-hover text-highlight focus:ring-primary flex gap-2 rounded-md px-4 py-2 font-medium shadow-sm transition-colors duration-200 hover:cursor-pointer focus:ring-2 focus:ring-offset-2 focus:outline-none"
							>
								<PlusIcon />
								{loading ? 'Création...' : 'Créer'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
