import { Connection } from 'mongoose';
import { isEmpty } from 'lodash';
import { MigrationInterface } from 'migration-mongoose';
import { Invoice } from '../schema/invoice.schema';
import { connectToDatabase } from '../connection';
import data from '../seed/data.json';


export class InitialInvoiceMigration implements MigrationInterface {
  async up(connection: Connection): Promise<void> {

    await connectToDatabase();
    const invoices = await Invoice.find({});
      
    if(isEmpty(invoices))
        await Invoice.insertMany(data);
  }

  down(connection: Connection): Promise<void> {
    return Promise.resolve()
  }
}