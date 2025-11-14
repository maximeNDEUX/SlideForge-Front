import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import DeckForm from '../components/DeckForm';
import DeckSlides from '../components/DeckSlides';
import SlideForm from '../components/SlideForm';
import { deckService } from '../services/deckServices';
import { slideService } from '../services/slideServices';
import { useNotification } from '../hooks/useNotification';
import type { Deck } from '../types/DeckType';
import type { Slide } from '../types/SlideType';

export const DeckEditPage = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { showSuccess, showError } = useNotification();

	const [deck, setDeck] = useState<Deck | null>(null);
	const [slides, setSlides] = useState<Slide[]>([]);
	const [selectedSlide, setSelectedSlide] = useState<Slide | null>(null);
	const [loading, setLoading] = useState(true);

	// -------------------------------
	// Fetch du deck et des slides
	// -------------------------------
	useEffect(() => {
		const fetchData = async () => {
			if (!id) return;

			try {
				const deckData = await deckService.getOne(Number(id));
				setDeck(deckData.deck);

				const slidesData = await slideService.getAll(Number(id));
				setSlides(slidesData);
			} catch {
				showError('Erreur lors du chargement du deck');
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [id]);

	// -------------------------------
	// Handlers Deck
	// -------------------------------
	const handleDeckUpdate = async (data: Partial<Deck>) => {
		if (!id) return;
		try {
			const updated = await deckService.update(Number(id), data);
			setDeck(updated);
			showSuccess('Présentation mise à jour !');
		} catch {
			showError('Erreur lors de la mise à jour du deck');
		}
	};

	const handleDeckDelete = async () => {
		if (!id) return;
		if (!confirm('Supprimer cette présentation ?')) return;

		try {
			await deckService.remove(Number(id));
			showSuccess('Présentation supprimée');
			navigate('/dashboard');
		} catch {
			showError('Erreur lors de la suppression du deck');
		}
	};

	// -------------------------------
	// Handlers Slides
	// -------------------------------
	const refreshSlides = async () => {
		if (!id) return;
		const all = await slideService.getAll(Number(id));
		setSlides(all);
	};

	const handleSlideSubmit = async (data: Partial<Slide>) => {
		if (!id) return;

		try {
			if (selectedSlide) {
				await slideService.update(selectedSlide.id, data);
				showSuccess('Slide mise à jour avec succès');
			} else {
				await slideService.create(Number(id), data);
				showSuccess('Nouvelle slide ajoutée');
			}

			await refreshSlides(); // ✅ on attend la mise à jour complète
			setSelectedSlide(null);
		} catch {
			showError('Erreur lors de la sauvegarde de la slide');
		}
	};

	const handleSlideEdit = (slide: Slide) => {
		setSelectedSlide(slide);
	};

	const handleSlideDelete = async (slideId: number) => {
		if (!confirm('Supprimer cette slide ?')) return;
		try {
			await slideService.remove(slideId);
			showSuccess('Slide supprimée');
			refreshSlides();
		} catch {
			showError('Erreur lors de la suppression');
		}
	};

	if (loading) return <p className="mt-10 text-center text-gray-500">Chargement du deck...</p>;

	// -------------------------------
	// Rendu principal
	// -------------------------------
	return (
		<div className="bg-bg-dark flex min-h-screen flex-col">
			<NavBar />

			<main className="mx-auto flex w-full max-w-7xl grow flex-col space-y-8 px-4 py-8 sm:px-6 sm:py-12 md:space-y-12 lg:space-y-16 lg:px-8 lg:py-16">
				{/* ---------------- DECK FORM ---------------- */}
				<section>
					{deck ? (
						<DeckForm
							deck={deck}
							onSubmit={handleDeckUpdate}
							onDelete={handleDeckDelete}
							showButtons={true}
						/>
					) : (
						<p className="text-text-muted">Aucune présentation trouvée.</p>
					)}
				</section>

				{/* ---------------- SLIDE FORM ---------------- */}
				<section>
					<SlideForm
						key={selectedSlide?.id || 'new'} // ✅ force le remount après changement
						title={
							selectedSlide
								? `Modifier la slide : ${selectedSlide.title || 'Sans titre'}`
								: 'Ajouter une nouvelle slide'
						}
						slide={selectedSlide || undefined}
						onSubmit={handleSlideSubmit}
						onCancel={() => setSelectedSlide(null)}
					/>
				</section>

				{/* ---------------- SLIDE LIST ---------------- */}
				<section>
					<h2 className="text-text pb-8 text-2xl font-bold">Slides du deck</h2>
					<DeckSlides
						slides={slides}
						onEdit={handleSlideEdit}
						onDelete={handleSlideDelete}
					/>
				</section>
			</main>
		</div>
	);
};
