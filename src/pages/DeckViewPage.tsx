import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deckService } from '../services/deckServices';
import { slideService } from '../services/slideServices';
import { useNotification } from '../hooks/useNotification';
import type { Deck } from '../types/DeckType';
import type { Slide } from '../types/SlideType';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';

export default function DeckViewPage() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { showError } = useNotification();

	const [deck, setDeck] = useState<Deck | null>(null);
	const [slides, setSlides] = useState<Slide[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [loading, setLoading] = useState(true);

	// -------------------------------
	// Fetch deck + slides
	// -------------------------------
	useEffect(() => {
		const fetchData = async () => {
			if (!id) return;
			try {
				const deckData = await deckService.getOne(Number(id));
				const slidesData = await slideService.getAll(Number(id));

				setDeck(deckData.deck);
				setSlides(slidesData);
			} catch {
				showError('Erreur lors du chargement du diaporama');
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [id]);

	// -------------------------------
	// Navigation dans les slides
	// -------------------------------
	const nextSlide = useCallback(() => {
		setCurrentIndex((prev) => (prev + 1) % slides.length);
	}, [slides]);

	const prevSlide = useCallback(() => {
		setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
	}, [slides]);

	// Gestion clavier ← →
	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === 'ArrowRight') nextSlide();
			if (e.key === 'ArrowLeft') prevSlide();
		};
		window.addEventListener('keydown', handleKey);
		return () => window.removeEventListener('keydown', handleKey);
	}, [nextSlide, prevSlide]);

	// -------------------------------
	// Rendu
	// -------------------------------
	if (loading)
		return <p className="mt-10 text-center text-gray-500">Chargement du diaporama...</p>;
	if (!deck || slides.length === 0)
		return (
			<div className="flex h-screen flex-col items-center justify-center text-gray-400">
				<p>Aucune slide à afficher.</p>
				<button
					onClick={() => navigate(-1)}
					className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
				>
					Retour
				</button>
			</div>
		);

	const slide = slides[currentIndex];

	return (
		<div
			className="relative flex h-screen w-full flex-col items-center justify-center text-center transition-colors duration-500"
			style={{ backgroundColor: slide.bg || '#ffffff' }}
		>
			{/* En-tête */}
			<div className="absolute top-4 left-4 flex items-center gap-3">
				<button
					onClick={() => navigate(-1)}
					className="flex items-center gap-2 rounded bg-white/20 px-3 py-2 text-sm font-medium text-white backdrop-blur hover:bg-white/40"
				>
					<Home size={16} />
					Retour
				</button>
				<p className="text-sm text-white/80">
					{deck.title} ({currentIndex + 1}/{slides.length})
				</p>
			</div>

			{/* Contenu de la slide */}
			<div className="max-w-4xl p-8 text-gray-900">
				{slide.kind === 'title' && <h1 className="text-5xl font-bold">{slide.title}</h1>}

				{slide.kind === 'text' && (
					<div>
						<h2 className="mb-4 text-3xl font-semibold">{slide.title}</h2>
						<p className="text-lg leading-relaxed">{slide.content}</p>
					</div>
				)}

				{slide.kind === 'quote' && (
					<blockquote className="text-2xl text-gray-700 italic">
						“{slide.content}”
					</blockquote>
				)}

				{slide.kind === 'image' && (
					<div className="flex flex-col items-center">
						{slide.title && (
							<h2 className="mb-4 text-3xl font-semibold">{slide.title}</h2>
						)}
						<img
							src={slide.content}
							alt={slide.title || 'Slide image'}
							className="max-h-[70vh] rounded-lg object-contain shadow-lg"
						/>
					</div>
				)}

				{slide.kind === 'code' && (
					<pre className="mx-auto max-w-3xl overflow-auto rounded bg-gray-900 p-6 text-left text-sm text-green-400">
						{slide.content}
					</pre>
				)}
				{slide.kind === 'list' && (
					<div className="mx-auto max-w-xl text-left">
						{slide.title && (
							<h2 className="mb-4 text-3xl font-semibold">{slide.title}</h2>
						)}
						<ul className="list-inside list-disc space-y-2 text-lg">
							{slide.content
								?.split('\n')
								.filter((item) => item.trim() !== '')
								.map((item, index) => (
									<li key={index}>{item.replace(/^[-•]\s*/, '')}</li>
								))}
						</ul>
					</div>
				)}
			</div>

			{/* Contrôles navigation */}
			<div className="absolute bottom-8 flex w-full justify-between px-10 text-white">
				<button
					onClick={prevSlide}
					className="rounded-full bg-black/30 p-3 transition hover:bg-black/60"
				>
					<ArrowLeft size={28} />
				</button>
				<button
					onClick={nextSlide}
					className="rounded-full bg-black/30 p-3 transition hover:bg-black/60"
				>
					<ArrowRight size={28} />
				</button>
			</div>
		</div>
	);
}
