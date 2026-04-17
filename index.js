import express from 'express';
import dotenv from 'dotenv';
import studentRoutes from './routes/studentRoutes.js';

dotenv.config();
const app = express();
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('TEST MIC');
});

app.use('/api', studentRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});