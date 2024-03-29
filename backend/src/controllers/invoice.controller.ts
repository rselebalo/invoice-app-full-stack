import express from 'express';
import { isEmpty } from 'lodash';
import { ERROR_MESSAGE } from '../constants';
import { IInvoice } from '../interfaces';
import { getInvoices, getInvoice, getInvoicesByStatus, setInvoice } from '../services/invoice.service';

export const invoices = async (
    req: express.Request,
    res: express.Response,
) => {
    try {
        const query = req.query;
        let resp = [];

        if(!isEmpty(query))
          resp = await getInvoicesByStatus(<string>(query.status));

        else resp = await getInvoices();
        res.status(200).json(resp);
    } catch (error) {
        res.status(500).json(ERROR_MESSAGE);
    }
};

export const invoice = async (
    req: express.Request,
    res: express.Response,
) => {
    try {
        const id = req.params.id;

        const resp = await getInvoice(id ||'');
        res.status(200).json(resp);
    } catch (error) {
        res.status(500).json(ERROR_MESSAGE);
    }
};

export const saveInvoice = async (
    req: express.Request,
    res: express.Response,
) => {
    try {
        //@ts-ignore
        const invoice = req.body;
        
        const resp = await setInvoice(invoice);
        res.status(200).json(resp);
    } catch (error) {
        res.status(500).json(ERROR_MESSAGE);
    }
};
