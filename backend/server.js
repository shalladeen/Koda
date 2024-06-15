const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const initializeAchievements = require('./scripts/initializeAchievements');
const initializeLists = require('./scripts/initializeLists'); // Import the script to initialize lists

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected');
    try {
      await initializeAchievements();
      console.log('Achievements initialized');
      await initializeLists(); // Initialize the default lists
      console.log('Default lists initialized');
    } catch (err) {
      console.error('Error during initialization:', err);
    }
  })
  .catch((err) => console.error('MongoDB connection error:', err));

// Import routes
const authRoutes = require('./routes/auth');
const noteRoutes = require('./routes/note');
const taskRoutes = require('./routes/task');
const eventRoutes = require('./routes/event');
const presetRoutes = require('./routes/preset');
const focusRoutes = require('./routes/focus');
const achievementRoutes = require('./routes/achievement');
const friendRoutes = require('./routes/friend');
const userRoutes = require('./routes/user');
const listRoutes = require('./routes/list');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/presets', presetRoutes);
app.use('/api/focus', focusRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/users', userRoutes);
app.use('/api/lists', listRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
