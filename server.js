const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ Apply CORS globally
app.use(cors({
  origin: 'https://skillsnap-frontend-deploy.vercel.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
}));

// ✅ Handle preflight requests manually
app.options('*', cors()); // ← This is what you're missing

app.use(express.json());

// ✅ Routes
app.get('/', (req, res) => {
  res.send('SkillSnap Backend is live ✅');
});

const authRoutes = require('./routes/auth');
const aiRoutes = require('./routes/ai');

app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
