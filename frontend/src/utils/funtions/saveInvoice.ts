import axios from 'axios';
import { IInvoice } from '../../interfaces';

export const saveInvoice = async (invoice: IInvoice): Promise<string> => {
  try {
    const result = await axios.request({
      url: `${process.env.REACT_APP_BASE_URL}/invoices`,
      method: 'POST',
      headers: {
        contentType: 'application/json',
      },
      data: invoice,
    });
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
