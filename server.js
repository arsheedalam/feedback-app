require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

const authRoutes = require('./routes/auth.routes.js');
const feedbackRoutes = require('./routes/feedback.routes.js');
const adminRoutes = require('./routes/admin.routes');
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/admin', adminRoutes);

// Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/feedback', feedbackRoutes);

// Default route
app.get('/', (req, res) => {
  res.send("API Running...");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});