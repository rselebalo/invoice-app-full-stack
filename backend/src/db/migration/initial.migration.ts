import { Connection } from 'mongoose';
import { MigrationInterface } from 'migration-mongoose';
import { Invoice } from '../schema/invoice.schema';
import { connectToDatabase } from '../connection';
import data from '../seed/data.json';


export class InitialInvoiceMigration implements MigrationInterface {
  async up(connection: Connection): Promise<void> {
try{
    await connectToDatabase();
    const invoices = await Invoice.find({});
    
    if(invoices.length === 0){
    
      await Invoice.insertMany(data);
      
    }
      console.log('running migration23344');
    
    } catch(err) {
        console.log(err);
    }

    return Promise.resolve()
  }

  async down(connection: Connection): Promise<void> {
    
    await Invoice.deleteMany({});
    return Promise.resolve()
  }
}