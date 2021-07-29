import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './db/connection';
import routes from './routes';
require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', routes);

connectToDatabase().then(() => {
    app.listen(port, () => console.log(`🚀 Serverlistening on ${port}`));
});
