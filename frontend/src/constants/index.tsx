import { format } from 'date-fns';
import { IInvoice } from '../interfaces';

export const DEFAULT_INVOICE: IInvoice = {
  id: '',
  createdAt: format(new Date(), 'yyyy-MM-dd'),
  paymentDue: format(new Date(), 'yyyy-MM-dd'),
  description: '',
  paymentTerms: 1,
  clientName: '',
  clientEmail: '',
  status: 'draft',
  senderAddress: {
    street: '',
    city: '',
    postCode: '',
    country: '',
  },
  clientAddress: {
    street: '',
    city: '',
    postCode: '',
    country: '',
  },
  items: [
    {
      name: '',
      quantity: 1,
      price: 0,
      total: 0,
    },
  ],
  total: 0,
};
