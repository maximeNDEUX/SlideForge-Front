import { AuthProvider } from './providers/AuthProvider';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { NotificationProvider } from './providers/NotificationProvider';

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<NotificationProvider>
					<Routes>
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />

						<Route path="/dashboard" element={<Dashboard />} />
					</Routes>
				</NotificationProvider>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
