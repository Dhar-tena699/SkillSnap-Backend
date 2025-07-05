// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth');
const aiRoutes = require('./routes/ai');

dotenv.config();
const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ CORS for Vercel frontend
app.use(cors({
  origin: 'https://skillsnap-frontend-deploy.vercel.app',
  methods: ['GET', 'POST'],
  credentials: true
}));

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);

// ✅ Default route
app.get('/', (req, res) => {
  res.send('SkillSnap Backend is live ✅');
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
