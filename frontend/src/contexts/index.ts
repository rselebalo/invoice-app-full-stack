import { createContext } from 'react';

export const ThemeContext = createContext({ themeMode: 'light' });
export const InvoiceContext = createContext({ selectedInvoice: {} });
