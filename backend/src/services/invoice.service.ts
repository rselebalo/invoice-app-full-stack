import {isEmpty} from 'lodash';
import { IInvoice} from '../interfaces';
import { Invoice } from '../db/schema/invoice.schema';
import { connectToDatabase } from '../db/connection';

const getInvoices = async (): Promise<IInvoice[]> => {
    try {
        // establish db connection
        await connectToDatabase();

        const invoices: IInvoice[] = await Invoice.find({});

        return Promise.resolve(invoices);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getInvoice = async (id: string): Promise<IInvoice | null> => {
    try {
        // establish db connection
        await connectToDatabase();

        const invoice: IInvoice | null = await Invoice.findOne({id});

        return Promise.resolve(invoice);

    } catch (error) {
        return Promise.reject(error);
    }
};

const setInvoice = async (invoice: IInvoice): Promise<string> => {
    try {
        // establish db connection
        await connectToDatabase();

        // upsert invoice
        if(isEmpty(invoice.id)){

            //generate id
            const _id = await generateInvoiceId();

            invoice.id = _id;
        }

        const query = { id: invoice.id };
        const update = {
            $set: { ...invoice },
        };

        const options = { upsert: true };

        await Invoice.updateOne(query, update, options);

        return Promise.resolve('success');
    } catch (error) {
        return Promise.reject(error);
    }
};

const generateInvoiceId = async() => {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        
        // generate 2 random characters
        const randomCharacters = alphabet[Math.floor(Math.random() * alphabet.length)] + alphabet[Math.floor(Math.random() * alphabet.length)];
        
        // generate 4 random numbers
        const randomNumbers = `${Math.floor(Math.random() * 9000 + 1)}`;

        let id = `${randomCharacters}${randomNumbers}`;

        // check if id exists - if exists regenerate
        const exists = await Invoice.find({id});

        if (exists.length > 0) id = await generateInvoiceId();

        return id;
};

export { getInvoices, getInvoice, setInvoice };
