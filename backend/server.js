const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const initializeAchievements = require('./scripts/initializeAchievements');

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
    await initializeAchievements(); 
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

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/presets', presetRoutes);
app.use('/api/focus', focusRoutes); 
app.use('/api/achievements', achievementRoutes);
app.use('/api/friends', friendRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
