const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect('mongodb://localhost/smartwater');

const waterSchema = new mongoose.Schema({
  userId: String,
  flowRate: Number,
  quantity: Number,
  timestamp: { type: Date, default: Date.now }
});

const Water = mongoose.model('Water', waterSchema);

app.get('/api/water', async (req, res) => {
  const data = await Water.find();
  res.send(data);
});

app.post('/api/water', async (req, res) => {
  const water = new Water(req.body);
  await water.save();
  res.send(water);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
