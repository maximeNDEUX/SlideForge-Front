import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deckService } from '../services/deckServices';
import { slideService } from '../services/slideServices';
import { useNotification } from '../hooks/useNotification';
import type { Deck } from '../types/DeckType';
import type { Slide } from '../types/SlideType';
import { ArrowLeft, ArrowRight, Home, Undo2Icon } from 'lucide-react';

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
	}, [id, showError]);

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

	const deckThemes: Record<Deck['theme'], string> = {
		default: '#ffffff',
		dark: '#111827',
		light: '#f3f4f6',
		blue: '#3B82F6',
		green: '#10b910',
		red: '#EF4444',
		purple: '#8B5CF6',
	};

	const deckRatios: Record<Deck['ratio'], string> = {
		'16:9': 'aspect-[16/9]',
		'4:3': 'aspect-[4/3]',
		'16:10': 'aspect-[16/10]',
	};

	// -------------------------------
	// Rendu
	// -------------------------------
	if (loading) return <p className="text-muted text-center">Chargement du diaporama...</p>;
	if (!deck || slides.length === 0)
		return (
			<div className="text-muted flex h-screen flex-col items-center justify-center space-y-4">
				<p>Aucune slide à afficher</p>
				<button
					onClick={() => navigate(-1)}
					className="bg-primary hover:bg-primary-hover text-highlight focus:ring-primary flex gap-2 rounded-md px-4 py-2 font-medium shadow-sm transition-colors duration-200 hover:cursor-pointer focus:ring-2 focus:ring-offset-2 focus:outline-none"
				>
					<Undo2Icon />
					<p>Retour</p>
				</button>
			</div>
		);

	const slide = slides[currentIndex];

	return (
		<div
			className="flex h-dvh w-full items-center justify-center transition-colors duration-500"
			style={{
				backgroundColor: deckThemes[deck.theme] ?? '#ffffff',
			}}
		>
			{/* Conteneur ratio */}
			<div
				className={`w-full max-w-7xl ${deckRatios[deck.ratio]} flex items-center justify-center overflow-hidden rounded-xl shadow-xl`}
				style={{
					backgroundColor: slide.bg ?? '#ffffff',
				}}
			>
				{/* Contenu de la slide */}
				<div className="mx-auto flex max-w-4xl flex-1 flex-col items-center justify-center overflow-hidden p-4 text-center sm:p-6 md:p-8">
					{slide.kind === 'title' && (
						<h1 className="text-3xl leading-snug font-semibold tracking-wide sm:text-4xl md:text-5xl lg:text-6xl">
							{slide.title}
						</h1>
					)}

					{slide.kind === 'text' && (
						<div className="max-w-4xl space-y-6 sm:space-y-8">
							<h2 className="text-2xl leading-snug font-semibold tracking-wide sm:text-3xl md:text-4xl lg:text-5xl">
								{slide.title}
							</h2>

							<p className="text-text-muted line-clamp-6 text-lg leading-relaxed tracking-wide sm:text-xl md:line-clamp-8 md:text-2xl lg:text-3xl">
								{slide.content}
							</p>
						</div>
					)}

					{slide.kind === 'quote' && (
						<div className="max-w-4xl space-y-6 sm:space-y-8">
							<blockquote className="text-text-muted line-clamp-6 text-lg leading-relaxed tracking-wide italic sm:text-xl md:line-clamp-8 md:text-2xl lg:text-3xl">
								“ {slide.content} ”
							</blockquote>

							<h2 className="text-2xl leading-snug font-semibold tracking-wide sm:text-3xl md:text-4xl lg:text-5xl">
								{slide.title}
							</h2>
						</div>
					)}

					{slide.kind === 'image' && (
						<div className="max-w-4xl space-y-6 sm:space-y-8">
							{slide.title && (
								<h2 className="text-2xl leading-snug font-semibold tracking-wide sm:text-3xl md:text-4xl lg:text-5xl">
									{slide.title}
								</h2>
							)}

							<img
								src={slide.imageUrl || "Pas d'image"}
								alt={slide.title || 'Slide image'}
								className="/* Mobile : très petite */ /* Tablet */ /* Petit desktop */ /* Grand écran */ h-auto max-h-[20vh] w-full rounded-lg object-contain shadow-lg sm:max-h-[30vh] md:max-h-[40vh] lg:max-h-[50vh]"
							/>
						</div>
					)}

					{slide.kind === 'code' && (
						<div className="max-w-4xl space-y-6 sm:space-y-8">
							<h2 className="text-2xl leading-snug font-semibold tracking-wide sm:text-3xl md:text-4xl lg:text-5xl">
								{slide.title}
							</h2>

							<pre className="max-w-3xl overflow-auto rounded bg-gray-900 p-4 text-left text-sm text-green-400 sm:p-6 sm:text-base md:text-lg lg:text-xl">
								{slide.content}
							</pre>
						</div>
					)}

					{slide.kind === 'list' && (
						<div className="max-w-4xl space-y-6 sm:space-y-8">
							{slide.title && (
								<h2 className="text-2xl leading-snug font-semibold tracking-wide sm:text-3xl md:text-4xl lg:text-5xl">
									{slide.title}
								</h2>
							)}

							<ul className="list-inside list-disc space-y-2 text-left text-xl leading-relaxed tracking-wide sm:space-y-3 sm:text-2xl md:space-y-4 md:text-3xl">
								{slide.content
									?.split('\n')
									.filter((item) => item.trim() !== '')
									.slice(0, 5) // <-- Afficher max 5 éléments
									.map((item, index) => (
										<li key={index}>{item.replace(/^[-•]\s*/, '')}</li>
									))}
							</ul>
						</div>
					)}
				</div>
			</div>

			{/* Navigation */}
			<div className="absolute bottom-0 mx-auto flex w-full max-w-7xl flex-row items-center justify-between px-4 py-4 text-white">
				<button
					onClick={prevSlide}
					className="rounded-full bg-black/30 p-3 hover:cursor-pointer hover:bg-black/60"
				>
					<ArrowLeft size={28} />
				</button>

				<div className="flex items-center gap-8">
					<p className="bg-bg-light text-text flex items-center gap-2 rounded-md px-4 py-2 shadow-sm">
						<span className="font-semibold">{deck.title}</span> {currentIndex + 1}/
						{slides.length}
					</p>
					<button
						onClick={() => navigate(-1)}
						className="bg-secondary hover:bg-secondary-hover text-highlight focus:ring-secondary flex items-center gap-2 rounded-md px-4 py-2 font-medium shadow-sm transition-colors duration-200 hover:cursor-pointer focus:ring-2 focus:ring-offset-2 focus:outline-none"
					>
						<Home size={16} />
						Retour
					</button>
				</div>

				<button
					onClick={nextSlide}
					className="rounded-full bg-black/30 p-3 hover:cursor-pointer hover:bg-black/60"
				>
					<ArrowRight size={28} />
				</button>
			</div>
		</div>
	);
}
