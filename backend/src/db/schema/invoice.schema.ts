import { model, Schema, Model } from 'mongoose';
import { IInvoice } from '../../interfaces';

const InvoiceSchema: Schema = new Schema({
  
  createdAt: { type: String, required: true },
  paymentDue: { type: String, required: true },
  description: { type: String, required: true },
  paymentTerms: { type: Number, required: true },
  clientName: { type: String, required: true },
  clientEmail: { type: String, required: true },
  status: { type: String, required: true },
  senderAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    postCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  clientAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    postCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  items: [{
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    total:{ type: Number, required: true },
  }],
  total: { type: Number, required: true },
});

export const Invoice: Model<IInvoice> = model('Invoice', InvoiceSchema);
