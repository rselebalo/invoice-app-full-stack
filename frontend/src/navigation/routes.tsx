import Invoices from '../containers/Invoices';
import EditInvoice from '../containers/Invoices';
import Invoice from '../containers/Invoices/invoice';

const ROUTES = [
  {
    exact: true,
    path: '/',
    positionInNav: 1,
    breadcrumbs: [{ path: '/', title: 'Invoices' }],
    component: Invoices,
    title: 'Invoices',
  },
  {
    exact: true,
    path: '/edit/:id',
    positionInNav: 2,
    breadcrumbs: [{ path: '/edit', title: 'Edit' }],
    component: EditInvoice,
    title: 'EditInvoice',
  },
  {
    exact: true,
    path: '/invoice/',
    positionInNav: 3,
    breadcrumbs: [{ path: '/invoice', title: 'Invoice' }],
    component: Invoice,
    title: 'Invoice',
  },
];

export { ROUTES };
