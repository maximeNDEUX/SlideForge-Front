import { PencilIcon, Trash2Icon } from 'lucide-react';
import type { Slide } from '../types/SlideType';

interface DeckSlidesProps {
	slides: Slide[];
	onEdit?: (slide: Slide) => void;
	onDelete?: (id: number) => void;
}

export default function DeckSlides({ slides, onEdit, onDelete }: DeckSlidesProps) {
	if (!slides || slides.length === 0) {
		return <p className="text-text-muted text-center">Aucune slide pour ce deck</p>;
	}
	return (
		<div className="space-y-4">
			{slides.map((slide) => (
				<div
					key={slide.id}
					className="bg-bg flex items-center justify-between rounded-lg p-4 shadow transition hover:shadow-md"
				>
					{/* Bloc gauche : numéro + infos */}
					<div className="flex items-center gap-6">
						<p className="text-text-muted text-lg">
							# <span className="font-medium">{slide.order}</span>
						</p>

						<div className="flex flex-col">
							<p className="truncate font-semibold">{slide.title || 'Sans titre'}</p>
							<p className="text-sm text-gray-500">Type : {slide.kind}</p>
						</div>
					</div>

					{/* Bloc boutons, bien collé à droite */}
					<div className="flex items-center gap-4">
						<button
							onClick={() => onDelete?.(slide.id)}
							className="bg-bg-light text-danger hover:border-danger-hover hover:text-danger-hover focus:ring-danger flex gap-2 rounded-md border-2 border-transparent px-4 py-2 font-medium shadow-sm transition-colors duration-200 hover:cursor-pointer hover:border-2 focus:ring-2 focus:ring-offset-2 focus:outline-none"
						>
							<Trash2Icon />
							<span className="hidden sm:block">Supprimer</span>{' '}
						</button>
						<button
							onClick={() => onEdit?.(slide)}
							className="bg-bg-light text-secondary hover:border-secondary-hover hover:text-secondary-hover focus:ring-secondary flex gap-2 rounded-md border-2 border-transparent px-4 py-2 font-medium shadow-sm transition-colors duration-200 hover:cursor-pointer hover:border-2 focus:ring-2 focus:ring-offset-2 focus:outline-none"
						>
							<PencilIcon />
							<span className="hidden sm:block">Modifier</span>
						</button>
					</div>
				</div>
			))}
		</div>
	);
}
