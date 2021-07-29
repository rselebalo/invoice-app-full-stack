import express from 'express';
import {invoice, invoices, saveInvoice} from '../controllers/invoice.controller';

const router = express.Router();

//invoices
router.get('/invoices', invoices);
router.post('/invoice', saveInvoice);
router.get('/invoice/:id', invoice);


export default router;
