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

const FLOW_RATE_THRESHOLD = 100; // Example threshold value, adjust as needed

// Routes
app.get('/api/water', async (req, res) => {
  try {
    const data = await Water.find().sort({ timestamp: -1 });
    res.send(data);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

app.post('/api/water', async (req, res) => {
  try {
    const water = new Water(req.body);
    await water.save();

    // Perform overflow check
    if (water.flowRate > FLOW_RATE_THRESHOLD) {
      console.log('Water is overflowing!');
      // Add your notification logic here (e.g., send an email or SMS alert)
    }

    res.send(water);
  } catch (error) {
    res.status(500).send('Error saving data');
  }
});

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
