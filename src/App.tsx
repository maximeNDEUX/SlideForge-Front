import { AuthProvider } from './providers/AuthProvider';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { DeckEditPage } from './pages/DeckEditPage';

import { NotificationProvider } from './providers/NotificationProvider';
import ProtectedRoute from './components/ProtectedRoute';
import { TestPage } from './pages/TestPage';
import DeckViewPage from './pages/DeckViewPage';

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<NotificationProvider>
					<Routes>
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />

						<Route
							path="/dashboard"
							element={
								<ProtectedRoute>
									<Dashboard />
								</ProtectedRoute>
							}
						/>

						<Route
							path="/deck/:id/edit"
							element={
								<ProtectedRoute>
									<DeckEditPage />
								</ProtectedRoute>
							}
						/>

						<Route
							path="/deck/:id/view"
							element={
								<ProtectedRoute>
									<DeckViewPage />
								</ProtectedRoute>
							}
						/>

						<Route
							path="/test"
							element={
								<ProtectedRoute>
									<TestPage />
								</ProtectedRoute>
							}
						/>
					</Routes>
				</NotificationProvider>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
