require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://my-skill-app-ten.vercel.app',
  process.env.CLIENT_URL
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // Izinkan request tanpa origin seperti Postman/curl/health check
    if (!origin) {
      return callback(null, true);
    }

    const isAllowedOrigin = allowedOrigins.includes(origin);
    const isVercelOrigin = origin.endsWith('.vercel.app');

    if (isAllowedOrigin || isVercelOrigin) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'My Skill API is running'
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    message: 'My Skill API is healthy',
    status: 'OK'
  });
});

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/contents', require('./routes/content.routes'));

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();