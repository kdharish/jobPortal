const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = "mongodb+srv://harishkd:7uQWn3CU6362sPyG@cluster0.cjrzcck.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"//process.env.MONGO_URI;

// MongoDB connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Sample route
app.get('/', (req, res) => {
  res.send('API is working');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
