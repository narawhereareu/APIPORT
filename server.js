import 'dotenv/config'; // <- ensure this is first
import express from "express";
import cors from 'cors';
// ...existing code...
import "./configs/firebaseAdmin.js";
import authRoutes from './routes/auth.js';
// ...existing code...

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
// replace body-parser with built-in parser
app.use(express.json());

app.get('/', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));