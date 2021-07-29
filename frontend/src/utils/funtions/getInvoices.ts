import axios from 'axios';
import { IInvoice } from '../../interfaces';

export const getInvoices = async (): Promise<IInvoice[]> => {
  try {
    const result = await axios.request({
      url: `${process.env.REACT_APP_BASE_URL}/invoices`,
      method: 'GET',
      headers: {
        contentType: 'application/json',
      },
    });
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
