const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Job = require('./models/Job');

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

// Get all jobs
app.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error: error.message });
  }
});

// Post a new job
app.post('/jobs', async (req, res) => {
  const { role, location, salary, company, skills, experience } = req.body;

  // Basic validation
  if (!role || !location || !salary || !company || !skills || experience === undefined) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newJob = new Job({ role, location, salary, company, skills, experience });
    const savedJob = await newJob.save();
    res.status(201).json({ message: 'Job posted successfully', job: savedJob });
  } catch (error) {
    res.status(500).json({ message: 'Error posting job', error: error.message });
  }
});

// Delete a job
app.delete('/jobs/:id', async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job', error: error.message });
  }
});

// Apply to a job
app.post('/jobs/:id/apply', async (req, res) => {
  const { userId } = req.body;
  
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user has already applied
    if (job.applicants.includes(userId)) {
      return res.status(400).json({ message: 'You have already applied to this job' });
    }

    job.applicants.push(userId);
    await job.save();
    
    res.status(200).json({ message: 'Application submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error applying to job', error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));