import { createContext } from 'react';
import type { NotificationContextType } from '../types/NotificationContextType';

export const NotificationContext = createContext<NotificationContextType | null>(null);
