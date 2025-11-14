import { useEffect, useState } from 'react';
import type { Slide } from '../types/SlideType';
import {
	Code2Icon,
	EyeIcon,
	HeadingIcon,
	LinkIcon,
	ListIcon,
	PaintBucketIcon,
	PlusIcon,
	QuoteIcon,
	SaveIcon,
	SignatureIcon,
	TextAlignStartIcon,
	Trash2,
	TypeIcon,
	XIcon,
} from 'lucide-react';

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
					<div className="space-y-8">
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<HeadingIcon className="text-text-muted h-4 w-4" />
								<label className="text-text font-medium">Titre</label>
							</div>
							<input
								type="text"
								name="title"
								value={formData.title || ''}
								onChange={handleChange}
								className="border-border-muted focus:ring-primary bg-bg-light w-full rounded-md border px-2 py-1 transition-shadow duration-200 focus:border-none focus:ring-2 focus:outline-none"
								placeholder="Titre du slide"
							/>
						</div>
					</div>
				);

			case 'text':
				return (
					<div className="space-y-8">
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<HeadingIcon className="text-text-muted h-4 w-4" />
								<label className="text-text font-medium">Titre</label>
							</div>
							<input
								type="text"
								name="title"
								value={formData.title || ''}
								onChange={handleChange}
								className="border-border-muted focus:ring-primary bg-bg-light w-full rounded-md border px-2 py-1 transition-shadow duration-200 focus:border-none focus:ring-2 focus:outline-none"
								placeholder="Titre du slide"
							/>
						</div>

						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<TextAlignStartIcon className="text-text-muted h-4 w-4" />
								<label className="text-text font-medium">Contenu</label>
							</div>
							<textarea
								name="content"
								value={formData.content || ''}
								onChange={handleChange}
								rows={5}
								className="border-border-muted focus:ring-primary bg-bg-light w-full rounded-md border px-2 py-1 transition-shadow duration-200 focus:border-none focus:ring-2 focus:outline-none"
								placeholder="Texte de la slide"
							/>
						</div>
					</div>
				);

			case 'image':
				return (
					<div className="space-y-8">
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<HeadingIcon className="text-text-muted h-4 w-4" />
								<label className="text-text font-medium">Titre</label>
							</div>
							<input
								type="text"
								name="title"
								value={formData.title || ''}
								onChange={handleChange}
								className="border-border-muted focus:ring-primary bg-bg-light w-full rounded-md border px-2 py-1 transition-shadow duration-200 focus:border-none focus:ring-2 focus:outline-none"
								placeholder="Titre du slide"
							/>
						</div>

						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<LinkIcon className="text-text-muted h-4 w-4" />
								<label className="text-text font-medium">URL de l'image</label>
							</div>
							<input
								type="text"
								name="imageUrl"
								value={formData.imageUrl || ''}
								onChange={handleChange}
								className="border-border-muted focus:ring-primary bg-bg-light w-full rounded-md border px-2 py-1 transition-shadow duration-200 focus:border-none focus:ring-2 focus:outline-none"
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
					</div>
				);

			case 'list':
				return (
					<div className="space-y-8">
						{/* Titre */}
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<HeadingIcon className="text-text-muted h-4 w-4" />
								<label className="text-text font-medium">Titre</label>
							</div>
							<input
								type="text"
								name="title"
								value={formData.title || ''}
								onChange={handleChange}
								className="border-border-muted focus:ring-primary bg-bg-light w-full rounded-md border px-2 py-1 transition-shadow duration-200 focus:border-none focus:ring-2 focus:outline-none"
								placeholder="Titre de la slide"
							/>
						</div>

						{/* Liste */}
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<ListIcon className="text-text-muted h-4 w-4" />
								<label className="text-text font-medium">Liste d'éléments</label>
							</div>
							<textarea
								name="content"
								value={formData.content || ''}
								onChange={handleChange}
								rows={5}
								className="border-border-muted focus:ring-primary bg-bg-light w-full rounded-md border px-2 py-1 transition-shadow duration-200 focus:border-none focus:ring-2 focus:outline-none"
								placeholder="Éléments de la liste"
							/>
							<p className="text-text-muted text-xs">
								Saisissez un élément par ligne
							</p>
						</div>
					</div>
				);

			case 'quote':
				return (
					<div className="space-y-8">
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<QuoteIcon className="text-text-muted h-4 w-4" />
								<label className="text-text font-medium">Citation</label>
							</div>
							<textarea
								name="content"
								value={formData.content || ''}
								onChange={handleChange}
								rows={3}
								className="border-border-muted focus:ring-primary bg-bg-light w-full rounded-md border px-2 py-1 transition-shadow duration-200 focus:border-none focus:ring-2 focus:outline-none"
								placeholder="Contenu de la citation"
							/>
						</div>
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<SignatureIcon className="text-text-muted h-4 w-4" />
								<label className="text-text font-medium">Auteur</label>
							</div>
							<input
								type="text"
								name="title"
								value={formData.title || ''}
								onChange={handleChange}
								className="border-border-muted focus:ring-primary bg-bg-light w-full rounded-md border px-2 py-1 transition-shadow duration-200 focus:border-none focus:ring-2 focus:outline-none"
								placeholder="Auteur de la citation"
							/>
						</div>
					</div>
				);

			case 'code':
				return (
					<div className="space-y-8">
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<HeadingIcon className="text-text-muted h-4 w-4" />
								<label className="text-text font-medium">Titre</label>
							</div>
							<input
								type="text"
								name="title"
								value={formData.title || ''}
								onChange={handleChange}
								className="border-border-muted focus:ring-primary bg-bg-light w-full rounded-md border px-2 py-1 transition-shadow duration-200 focus:border-none focus:ring-2 focus:outline-none"
								placeholder="Titre de la slide"
							/>
						</div>

						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<Code2Icon className="text-text-muted h-4 w-4" />
								<label className="text-text font-medium">Code</label>
							</div>
							<textarea
								name="content"
								value={formData.content || ''}
								onChange={handleChange}
								rows={6}
								className="border-border-muted focus:ring-primary bg-bg-light w-full rounded-md border px-2 py-1 transition-shadow duration-200 focus:border-none focus:ring-2 focus:outline-none"
								placeholder="Contenu du code"
							/>
						</div>
					</div>
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
				className="rounded-lg border p-6 shadow-md transition-all duration-300"
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
			<h2 className="text-text pb-8 text-2xl font-bold">{title}</h2>

			<div className="space-y-8">
				{/* Type de slide */}
				<div className="space-y-2">
					<div className="flex items-center gap-2">
						<TypeIcon className="text-text-muted h-4 w-4" />
						<label className="text-text font-medium">Type de slide</label>
					</div>
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
					<hr className="border-muted my-8 border border-dashed" />
				</div>

				{/* Rendu dynamique */}
				{renderFields()}

				{/* Couleur de fond */}
				<div className="space-y-2">
					<div className="flex items-center gap-2">
						<PaintBucketIcon className="text-text-muted h-4 w-4" />
						<label className="text-text font-medium">Couleur de fond</label>
					</div>
					<input
						type="color"
						name="bg"
						value={formData.bg || '#ffffff'}
						onChange={handleChange}
						className="border-border-muted focus:ring-primary bg-bg-light h-15 w-full cursor-pointer rounded-md border p-1 px-2 py-1 transition-shadow duration-200 hover:cursor-pointer focus:border-none focus:ring-2 focus:outline-none"
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
						{slide ? (
							<div className="flex items-center gap-2">
								<SaveIcon />
								<p>Mettre à jour</p>
							</div>
						) : (
							<div className="flex items-center gap-2">
								<PlusIcon />
								<p>Ajouter la slide</p>
							</div>
						)}
					</button>
				</div>
			</div>
			<hr className="border-muted my-8 border border-dashed" />

			{/* 🚀 Aperçu dynamique */}
			<div className="space-y-2">
				<div className="flex items-center gap-2">
					<EyeIcon className="text-text-muted h-4 w-4" />
					<label className="text-text font-medium">Aperçu en direct</label>
				</div>{' '}
				{renderPreview()}
			</div>
		</form>
	);
}
