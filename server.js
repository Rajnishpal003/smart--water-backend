const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors'); 
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://raj345pal:M3RPRiJ9URYLe2rf@cluster0.t75jj.mongodb.net/?retryWrites=true&w=majority&appName=cluster0');

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
