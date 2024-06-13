const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Achievement = require('./models/Achievement'); // Adjust the path as necessary

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const achievements = [
  {
    title: "First Focus Session",
    description: "Complete your first focus session.",
    icon: "FaPlay",
    threshold: 1,
    type: "session",
    completed: false,
  },
  {
    title: "First Milestone",
    description: "Focus for 10 hours in total.",
    icon: "FaClock",
    threshold: 10,
    type: "focus",
    completed: false,
  },
  {
    title: "Steady Progress",
    description: "Focus for 25 hours in total.",
    icon: "FaClock",
    threshold: 25,
    type: "focus",
    completed: false,
  },
  {
    title: "Halfway There",
    description: "Focus for 50 hours in total.",
    icon: "FaClock",
    threshold: 50,
    type: "focus",
    completed: false,
  },
  {
    title: "Centurion",
    description: "Focus for 100 hours in total.",
    icon: "FaClock",
    threshold: 100,
    type: "focus",
    completed: false,
  },
  {
    title: "Daily Grind",
    description: "Focus for 7 days in a row.",
    icon: "FaCalendarDay",
    threshold: 7,
    type: "streak",
    completed: false,
  },
  {
    title: "Two-Week Streak",
    description: "Focus for 14 days in a row.",
    icon: "FaCalendarDay",
    threshold: 14,
    type: "streak",
    completed: false,
  },
  {
    title: "Consistency King",
    description: "Focus for 30 days in a row.",
    icon: "FaCalendarDay",
    threshold: 30,
    type: "streak",
    completed: false,
  },
  {
    title: "Marathoner",
    description: "Focus for 500 hours in total. Outstanding!",
    icon: "FaClock",
    threshold: 500,
    type: "focus",
    completed: false,
  },
  {
    title: "Weekly Warrior",
    description: "Studied for 4 weeks straight. Fantastic commitment!",
    icon: "FaCalendarWeek",
    threshold: 28,
    type: "streak",
    completed: false,
  },
  {
    title: "Monthly Master",
    description: "Studied for 6 months straight. Incredible dedication!",
    icon: "FaCalendarAlt",
    threshold: 180,
    type: "streak",
    completed: false,
  },
  {
    title: "Yearly Hero",
    description: "Studied for a year straight. You’re a legend!",
    icon: "FaCalendarAlt",
    threshold: 365,
    type: "streak",
    completed: false,
  },
  {
    title: "Ultimate Achiever",
    description: "Unlocked all achievements. You’ve reached the pinnacle!",
    icon: "FaCalendarAlt",
    threshold: 20, // Assuming this is the total number of achievements
    type: "total",
    completed: false,
  },
  {
    title: "Task Master",
    description: "Complete 50 tasks.",
    icon: "FaTasks",
    threshold: 50,
    type: "task",
    completed: false,
  },
  {
    title: "Task Conqueror",
    description: "Complete 100 tasks.",
    icon: "FaTasks",
    threshold: 100,
    type: "task",
    completed: false,
  },
  {
    title: "Task Overlord",
    description: "Complete 200 tasks.",
    icon: "FaTasks",
    threshold: 200,
    type: "task",
    completed: false,
  },
  {
    title: "Time Management Guru",
    description: "Manage your time for 10 days straight.",
    icon: "FaCalendarCheck",
    threshold: 10,
    type: "time_management",
    completed: false,
  },
  {
    title: "Efficiency Expert",
    description: "Manage your time for 30 days straight.",
    icon: "FaCalendarCheck",
    threshold: 30,
    type: "time_management",
    completed: false,
  },
  {
    title: "Goal Setter",
    description: "Set and achieve 10 goals.",
    icon: "FaBullseye",
    threshold: 10,
    type: "goal",
    completed: false,
  },
  {
    title: "Goal Crusher",
    description: "Set and achieve 20 goals.",
    icon: "FaBullseye",
    threshold: 20,
    type: "goal",
    completed: false,
  }
];

const populateAchievements = async () => {
  try {
    await Achievement.insertMany(achievements);
    console.log('Achievements populated!');
    mongoose.disconnect();
  } catch (err) {
    console.error('Error populating achievements:', err);
  }
};

populateAchievements();
