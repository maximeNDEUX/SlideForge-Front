// /src/components/ProtectedRoute.jsx

import type { ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';

import { Navigate } from 'react-router-dom';
export default function ProtectedRoute({ children }: { children: ReactNode }) {
	const { isAuthenticated, user } = useAuth();

	if (!isAuthenticated() || !user) {
		return <Navigate to="/login" replace />;
	}

	return children;
}
