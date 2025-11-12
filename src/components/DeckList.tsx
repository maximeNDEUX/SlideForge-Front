import { useEffect, useState } from 'react';
import DeckModal from '../components/DeckModal';
import { deckService } from '../services/deckServices';
import { useNotification } from '../hooks/useNotification';
import {
	ImageUpscaleIcon,
	PaletteIcon,
	PencilIcon,
	PlayIcon,
	PlusCircleIcon,
	Trash2Icon,
} from 'lucide-react';
import type { Deck } from '../types/DeckType';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function DeckList() {
	const [decks, setDecks] = useState<Deck[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { showError, showSuccess } = useNotification();
	const { isAuthenticated } = useAuth();

	const navigate = useNavigate();

	const fetchDecks = async () => {
		try {
			const data = await deckService.getAll();
			setDecks(data);
		} catch {
			showError('Erreur de chargement des decks');
		}
	};

	useEffect(() => {
		fetchDecks();
	}, []);

	// rechargement à la création
	const handleCreated = () => fetchDecks();

	// Suppression d’un deck
	const handleDelete = async (id: number) => {
		if (!confirm('Supprimer cette présentation ?')) return;
		try {
			await deckService.remove(id);
			showSuccess('Présentation supprimée');
			fetchDecks();
		} catch {
			showError('Erreur lors de la suppression');
		}
	};

	// Navigation vers le deck
	const handleView = (id: number) => {
		navigate(`/deck/${id}/view`);
	};

	// Édition
	const handleEdit = (id: number) => {
		navigate(`/deck/${id}/edit`);
	};

	const themeClasses: Record<string, string> = {
		dark: 'bg-gray-800',
		light: 'bg-gray-200',
		blue: 'bg-blue-500',
		green: 'bg-green-500',
		red: 'bg-red-500',
		purple: 'bg-purple-500',
		default: 'bg-gray-400',
	};

	if (!isAuthenticated) return null;

	return (
		<div className="flex flex-col space-y-8">
			<div className="mb-6 flex items-center justify-between">
				<h1 className="text-text text-3xl font-medium">Mes présentations</h1>

				<button
					onClick={() => setIsModalOpen(true)}
					className="bg-primary hover:bg-primary-hover text-highlight focus:ring-primary flex gap-2 rounded-md px-4 py-2 font-medium shadow-sm transition-colors duration-200 hover:cursor-pointer focus:ring-2 focus:ring-offset-2 focus:outline-none"
				>
					<PlusCircleIcon />
					<p className="hidden sm:block">Nouvelle présentation</p>
				</button>
			</div>

			{/* Liste des decks */}
			{decks.length === 0 ? (
				<p className="text-text-muted mt-10 text-center">Aucune présentation trouvée</p>
			) : (
				<div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
					{decks.map((deck) => (
						<div key={deck.id} className="bg-bg rounded-lg p-4 shadow-md">
							{/* Bande colorée */}
							<div
								className={`mb-3 h-2 rounded-lg ${themeClasses[deck.theme] ?? themeClasses.default}`}
							/>

							<div className="">
								{/* Infos principales */}
								<h3 className="mb-4 truncate text-xl font-semibold">
									{deck.title}
								</h3>
								<div className="mb-2 flex items-center gap-2">
									<PaletteIcon className="text-text-muted h-4 w-4" />
									<p className="text-md">
										Thème : <span className="font-medium">{deck.theme}</span>
									</p>
								</div>

								<div className="mb-2 flex items-center gap-2">
									<ImageUpscaleIcon className="text-text-muted h-4 w-4" />
									<p className="text-md">
										Ratio : <span className="font-medium">{deck.ratio}</span>
									</p>
								</div>
								<p className="text-text-muted text-md">
									Créé le {new Date(deck.createdAt).toLocaleDateString('fr-FR')}
								</p>
							</div>

							{/* Actions */}
							<div className="mt-4 flex items-center justify-start gap-4">
								<button
									onClick={() => handleEdit(deck.id)}
									className="bg-bg-light text-primary hover:border-primary-hover hover:text-primary-hover focus:ring-primary flex gap-2 rounded-md border-2 border-transparent px-4 py-2 font-medium shadow-sm transition-colors duration-200 hover:cursor-pointer hover:border-2 focus:ring-2 focus:ring-offset-2 focus:outline-none"
								>
									<PencilIcon />
								</button>

								<button
									onClick={() => handleView(deck.id)}
									className="bg-bg-light text-secondary hover:border-secondary-hover hover:text-secondary-hover focus:ring-secondary flex gap-2 rounded-md border-2 border-transparent px-4 py-2 font-medium shadow-sm transition-colors duration-200 hover:cursor-pointer hover:border-2 focus:ring-2 focus:ring-offset-2 focus:outline-none"
								>
									<PlayIcon />
								</button>

								<button
									onClick={() => handleDelete(deck.id)}
									className="bg-bg-light text-danger hover:border-danger-hover hover:text-danger-hover focus:ring-danger flex gap-2 rounded-md border-2 border-transparent px-4 py-2 font-medium shadow-sm transition-colors duration-200 hover:cursor-pointer hover:border-2 focus:ring-2 focus:ring-offset-2 focus:outline-none"
								>
									<Trash2Icon />
								</button>
							</div>
						</div>
					))}
				</div>
			)}

			{/* Modal */}
			<DeckModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onCreated={handleCreated}
			/>
		</div>
	);
}
