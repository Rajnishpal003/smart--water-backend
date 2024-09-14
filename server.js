const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://raj345pal:M3RPRiJ9URYLe2rf@cluster0.t75jj.mongodb.net/?retryWrites=true&w=majority&appName=cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define schema and model
const waterSchema = new mongoose.Schema({
  userId: String,
  flowRate: Number,
  quantity: Number,
  timestamp: { type: Date, default: Date.now }
});

const Water = mongoose.model('Water', waterSchema);

// Routes
app.get('/api/water', async (req, res) => {
  try {
    const data = await Water.find();
    res.send(data);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

app.post('/api/water', async (req, res) => {
  try {
    const water = new Water(req.body);
    await water.save();
    res.send(water);
  } catch (error) {
    res.status(500).send('Error saving data');
  }
});

/* Handle saveData endpoint
app.post('/api/saveData', async (req, res) => {
  const { data } = req.body;
  try {
    await Water.insertMany(data);
    res.status(200).send('Data saved successfully');
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).send('Error saving data');
  }
}); */

// Log incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
