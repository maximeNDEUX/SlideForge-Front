import NavBar from '../components/NavBar';

export const Dashboard = () => {
	const handleDeskCreation = () => {
		console.log('Click');
	};

	return (
		<div className="bg-bg-dark flex min-h-screen flex-col">
			<NavBar />
			<main className="mx-auto flex w-full max-w-7xl grow flex-col space-y-8 px-4 py-4 sm:px-6 sm:py-12 md:space-y-12 lg:space-y-16 lg:px-8 lg:py-16">
				<div className="space-y-4">
					<h1 className="text-text text-3xl font-medium">Mes présentations</h1>

					<div>
						<p>Présentations ici</p>
						<button onClick={handleDeskCreation} className="bg-primary p-4">
							Créer un deck
						</button>
					</div>
				</div>
			</main>
		</div>
	);
};
