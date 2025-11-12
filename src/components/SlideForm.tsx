import { useEffect, useState } from 'react';
import type { Slide } from '../types/SlideType';
import { SaveIcon, Trash2, XIcon } from 'lucide-react';

interface SlideFormProps {
	title?: string;
	slide?: Slide;
	onSubmit: (data: Partial<Slide>) => void;
	onCancel?: () => void;
	onDelete?: () => void;
}

export default function SlideForm({
	title = 'Nouvelle slide',
	slide,
	onSubmit,
	onCancel,
	onDelete,
}: SlideFormProps) {
	const [formData, setFormData] = useState<Partial<Slide>>({
		kind: slide?.kind || 'text',
		title: slide?.title || '',
		content: slide?.content || '',
		imageUrl: slide?.imageUrl || '',
		bg: slide?.bg || '#ffffff',
	});

	useEffect(() => {
		setFormData((prev) => {
			const cleaned = { ...prev };
			switch (prev.kind) {
				case 'title':
					delete cleaned.content;
					delete cleaned.imageUrl;
					break;
				case 'text':
					delete cleaned.imageUrl;
					break;
				case 'image':
					delete cleaned.content;
					break;
				case 'list':
				case 'quote':
				case 'code':
					delete cleaned.imageUrl;
					break;
			}
			return cleaned;
		});
	}, [formData.kind]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await onSubmit(formData);

		setFormData({
			title: '',
			content: '',
			bg: '#ffffff',
			kind: 'text', // revient par défaut au type texte
		});
	};

	// 🎨 Rendu conditionnel selon le type de slide
	const renderFields = () => {
		switch (formData.kind) {
			case 'title':
				return (
					<div className="mb-4">
						<label className="mb-1 block text-gray-700">Titre principal</label>
						<input
							type="text"
							name="title"
							value={formData.title || ''}
							onChange={handleChange}
							className="w-full rounded border p-2"
							placeholder="Ex : Introduction"
						/>
					</div>
				);

			case 'text':
				return (
					<>
						<div className="mb-4">
							<label className="mb-1 block text-gray-700">Titre</label>
							<input
								type="text"
								name="title"
								value={formData.title || ''}
								onChange={handleChange}
								className="w-full rounded border p-2"
							/>
						</div>

						<div className="mb-4">
							<label className="mb-1 block text-gray-700">Contenu</label>
							<textarea
								name="content"
								value={formData.content || ''}
								onChange={handleChange}
								rows={5}
								className="w-full rounded border p-2"
								placeholder="Texte de la slide..."
							/>
						</div>
					</>
				);

			case 'image':
				return (
					<>
						<div className="mb-4">
							<label className="mb-1 block text-gray-700">Titre</label>
							<input
								type="text"
								name="title"
								value={formData.title || ''}
								onChange={handleChange}
								className="w-full rounded border p-2"
							/>
						</div>

						<div className="mb-4">
							<label className="mb-1 block text-gray-700">URL de l’image</label>
							<input
								type="text"
								name="imageUrl"
								value={formData.imageUrl || ''}
								onChange={handleChange}
								className="w-full rounded border p-2"
								placeholder="https://exemple.com/mon-image.jpg"
							/>
						</div>

						{formData.imageUrl && (
							<img
								src={formData.imageUrl}
								alt="Aperçu"
								className="mt-2 max-h-48 rounded border object-cover shadow-sm"
							/>
						)}
					</>
				);

			case 'list':
				return (
					<>
						{/* Titre */}
						<div className="mb-4">
							<label className="mb-1 block text-gray-700">Titre</label>
							<input
								type="text"
								name="title"
								value={formData.title || ''}
								onChange={handleChange}
								className="w-full rounded border p-2"
								placeholder="Titre de la slide"
							/>
						</div>

						{/* Liste */}
						<div className="mb-4">
							<label className="mb-1 block text-gray-700">Liste d’éléments</label>
							<textarea
								name="content"
								value={formData.content || ''}
								onChange={handleChange}
								rows={5}
								className="w-full rounded border p-2 font-mono"
								placeholder="- Élément 1\n- Élément 2\n- Élément 3"
							/>
							<p className="mt-1 text-xs text-gray-500">
								💡 Saisis un élément par ligne ou commence chaque ligne par “- ”
							</p>
						</div>
					</>
				);

			case 'quote':
				return (
					<>
						<div className="mb-4">
							<label className="mb-1 block text-gray-700">Citation</label>
							<textarea
								name="content"
								value={formData.content || ''}
								onChange={handleChange}
								rows={3}
								className="w-full rounded border p-2 italic"
								placeholder="« La simplicité est la sophistication suprême. »"
							/>
						</div>
						<div className="mb-4">
							<label className="mb-1 block text-gray-700">Auteur</label>
							<input
								type="text"
								name="title"
								value={formData.title || ''}
								onChange={handleChange}
								className="w-full rounded border p-2"
								placeholder="Léonard de Vinci"
							/>
						</div>
					</>
				);

			case 'code':
				return (
					<>
						<div className="mb-4">
							<label className="mb-1 block text-gray-700">Titre (optionnel)</label>
							<input
								type="text"
								name="title"
								value={formData.title || ''}
								onChange={handleChange}
								className="w-full rounded border p-2"
							/>
						</div>

						<div className="mb-4">
							<label className="mb-1 block text-gray-700">Bloc de code</label>
							<textarea
								name="content"
								value={formData.content || ''}
								onChange={handleChange}
								rows={6}
								className="w-full rounded border bg-gray-50 p-2 font-mono"
							/>
						</div>
					</>
				);

			default:
				return (
					<p className="text-gray-500 italic">
						Sélectionnez un type de slide pour afficher les champs.
					</p>
				);
		}
	};
	// 🖼️ Preview dynamique
	const renderPreview = () => {
		const bgColor = formData.bg || '#ffffff';
		const textColor =
			formData.kind === 'title'
				? 'text-4xl'
				: formData.kind === 'quote'
					? 'italic text-2xl'
					: 'text-base';

		return (
			<div
				className="mt-8 rounded-lg border p-6 shadow-md transition-all duration-300"
				style={{ backgroundColor: bgColor }}
			>
				{/* Aperçu d'image */}
				{formData.kind === 'image' && formData.imageUrl ? (
					<img
						src={formData.imageUrl}
						alt="Aperçu"
						className="mb-4 h-64 w-full rounded-md object-cover"
					/>
				) : null}

				{/* Titre */}
				{formData.title && (
					<h3 className={`font-bold text-gray-800 ${textColor}`}>{formData.title}</h3>
				)}

				{/* Contenu selon le type */}
				{formData.kind === 'list' ? (
					<ul className="mt-2 list-inside list-disc space-y-1 text-gray-700">
						{formData.content
							?.split('\n')
							.filter((line) => line.trim() !== '')
							.map((line, index) => (
								<li key={index}>{line.replace(/^[-•]\s*/, '')}</li>
							))}
					</ul>
				) : formData.kind === 'code' ? (
					<pre className="mt-2 overflow-x-auto rounded bg-gray-900 p-4 text-sm text-green-400">
						{formData.content}
					</pre>
				) : (
					formData.content && (
						<p className="mt-2 whitespace-pre-line text-gray-700">{formData.content}</p>
					)
				)}
			</div>
		);
	};
	return (
		<form onSubmit={handleSubmit} className="bg-bg space-y-4 rounded-lg p-6 shadow-xl">
			<h2 className="mb-6 text-center text-2xl font-semibold text-gray-700">{title}</h2>

			{/* Type de slide */}
			<div className="mb-6">
				<label className="mb-1 block text-gray-700">Type de slide</label>
				<select
					name="kind"
					value={formData.kind}
					onChange={handleChange}
					className="border-border-muted focus:ring-primary bg-bg-light w-full rounded-md border px-2 py-1 transition-shadow duration-200 hover:cursor-pointer focus:border-none focus:ring-2 focus:outline-none"
				>
					<option value="title">Titre</option>
					<option value="text">Texte</option>
					<option value="image">Image</option>
					<option value="list">Liste</option>
					<option value="quote">Citation</option>
					<option value="code">Code</option>
				</select>
			</div>

			{/* Rendu dynamique */}
			{renderFields()}

			{/* Couleur de fond */}
			<div className="mb-6">
				<label className="mb-1 block text-gray-700">Couleur de fond</label>
				<input
					type="color"
					name="bg"
					value={formData.bg || '#ffffff'}
					onChange={handleChange}
					className="h-10 w-20 cursor-pointer rounded border"
				/>
			</div>

			{/* Boutons */}
			<div className="mt-6 flex justify-end gap-3">
				{onCancel && (
					<button
						type="button"
						onClick={onCancel}
						className="bg-bg-light text-danger hover:border-danger-hover hover:text-danger-hover focus:ring-danger flex gap-2 rounded-md border-2 border-transparent px-4 py-2 font-medium shadow-sm transition-colors duration-200 hover:cursor-pointer hover:border-2 focus:ring-2 focus:ring-offset-2 focus:outline-none"
					>
						<XIcon /> Annuler
					</button>
				)}
				{onDelete && (
					<button
						type="button"
						onClick={onDelete}
						className="bg-bg-light text-danger hover:border-danger-hover hover:text-danger-hover focus:ring-danger flex gap-2 rounded-md border-2 border-transparent px-4 py-2 font-medium shadow-sm transition-colors duration-200 hover:cursor-pointer hover:border-2 focus:ring-2 focus:ring-offset-2 focus:outline-none"
					>
						<Trash2 /> Supprimer
					</button>
				)}
				<button
					type="submit"
					className="bg-bg-light text-secondary hover:border-secondary-hover hover:text-secondary-hover focus:ring-secondary flex gap-2 rounded-md border-2 border-transparent px-4 py-2 font-medium shadow-sm transition-colors duration-200 hover:cursor-pointer hover:border-2 focus:ring-2 focus:ring-offset-2 focus:outline-none"
				>
					<SaveIcon /> {slide ? 'Mettre à jour' : 'Ajouter'}
				</button>
			</div>
			{/* 🚀 Aperçu dynamique */}
			<div className="mt-10">
				<h3 className="mb-2 text-lg font-semibold text-gray-700">Aperçu en direct</h3>
				{renderPreview()}
			</div>
		</form>
	);
}
