import axios from 'axios';
import { IInvoice } from '../../interfaces';

export const getInvoicesByStatus = async (status: string): Promise<IInvoice[]> => {
  try {
    const result = await axios.request({
      url: `${process.env.REACT_APP_BASE_URL}/invoices?status=${status}`,
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
