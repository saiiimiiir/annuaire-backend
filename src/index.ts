import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import toolRoutes from './routes/tools.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tools', toolRoutes);

// MongoDB connection
const mongoURI = 'mongodb://saiiimiiir:DJ%24m3b310@localhost:27017/annuaire?authSource=admin';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Annuaire IA Backend running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
