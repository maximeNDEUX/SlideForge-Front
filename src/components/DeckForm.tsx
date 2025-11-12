// src/components/DeckForm.tsx
import { useState, useEffect } from 'react';
import type { Deck } from '../types/DeckType';
import { ImageUpscaleIcon, InfoIcon, PaletteIcon, SaveIcon, Trash2 } from 'lucide-react';

interface DeckFormProps {
	deck: Deck;
	onSubmit: (data: Partial<Deck>) => void;
	onDelete?: () => void;
	showButtons?: boolean;
}

export default function DeckForm({ deck, onSubmit, onDelete, showButtons = true }: DeckFormProps) {
	const [formData, setFormData] = useState<Pick<Deck, 'title' | 'theme' | 'ratio'>>({
		title: deck.title || 'un titre',
		theme: deck.theme,
		ratio: deck.ratio,
	});

	useEffect(() => {
		setFormData({
			title: deck.title,
			theme: deck.theme,
			ratio: deck.ratio,
		});
	}, [deck]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
	};

	return (
		<form onSubmit={handleSubmit} className="bg-bg space-y-8 rounded-lg p-6 shadow-xl">
			{/* Titre */}
			<h2 className="text-text text-2xl font-bold">Modifier la présentation</h2>
			<div className="flex gap-8">
				<div className="flex-3 space-y-2">
					<div className="flex items-center gap-2">
						<InfoIcon className="text-text-muted h-4 w-4" />
						<label className="text-text font-medium">Titre</label>
					</div>
					<input
						type="text"
						name="title"
						value={formData.title}
						onChange={handleChange}
						className="border-border-muted focus:ring-primary bg-bg-light w-full rounded-md border px-2 py-1 transition-shadow duration-200 focus:border-none focus:ring-2 focus:outline-none"
					/>
				</div>

				{/* Thème */}
				<div className="flex-1 space-y-2">
					<div className="flex items-center gap-2">
						<PaletteIcon className="text-text-muted h-4 w-4" />
						<label className="text-text font-medium">Thème</label>
					</div>
					<select
						name="theme"
						value={formData.theme}
						onChange={handleChange}
						className="border-border-muted focus:ring-primary bg-bg-light w-full rounded-md border px-2 py-1 transition-shadow duration-200 hover:cursor-pointer focus:border-none focus:ring-2 focus:outline-none"
					>
						{['default', 'dark', 'light', 'blue', 'green', 'red', 'purple'].map((t) => (
							<option key={t} value={t}>
								{t}
							</option>
						))}
					</select>
				</div>
			</div>

			{/* Ratio */}
			<div>
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
							<input
								type="radio"
								name="ratio"
								value={ratio}
								checked={formData.ratio === ratio}
								onChange={handleChange}
								className="accent-primary cursor-pointer"
							/>
							<span>{ratio}</span>
						</label>
					))}
				</div>
			</div>

			{/* Boutons */}
			{showButtons && (
				<div className="flex justify-end gap-3 pt-6">
					{onDelete && (
						<button
							type="button"
							onClick={onDelete}
							className="bg-danger hover:bg-danger-hover text-highlight focus:ring-danger flex gap-2 rounded-md px-4 py-2 font-medium shadow-sm transition-colors duration-200 hover:cursor-pointer focus:ring-2 focus:ring-offset-2 focus:outline-none"
						>
							<Trash2 />
							<span>Supprimer présentation</span>
						</button>
					)}

					<button
						type="submit"
						className="bg-bg-light text-secondary hover:border-secondary-hover hover:text-secondary-hover focus:ring-secondary flex gap-2 rounded-md border-2 border-transparent px-4 py-2 font-medium shadow-sm transition-colors duration-200 hover:cursor-pointer hover:border-2 focus:ring-2 focus:ring-offset-2 focus:outline-none"
					>
						<SaveIcon />
						<span>Enregistrer</span>
					</button>
				</div>
			)}
		</form>
	);
}
