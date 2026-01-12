import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
