import DeckList from '../components/DeckList';
import NavBar from '../components/NavBar';

export const Dashboard = () => {
	return (
		<div className="bg-bg-dark flex min-h-screen flex-col">
			<NavBar />
			<main className="mx-auto flex w-full max-w-7xl grow flex-col space-y-8 px-4 py-8 sm:px-6 sm:py-12 md:space-y-12 lg:space-y-16 lg:px-8 lg:py-16">
				<div className="space-y-8">
					<DeckList />
				</div>
			</main>
		</div>
	);
};
