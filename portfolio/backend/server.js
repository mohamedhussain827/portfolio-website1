const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

const app = express();
app.use(helmet());
app.use(cors({ origin: (process.env.CLIENT_ORIGIN || '').split(',').map(s => s.trim()), methods: ['GET', 'POST'] }));
app.use(express.json({ limit: '10kb' }));
app.use('/api/contact', rateLimit({ windowMs: 15 * 60 * 1000, max: 20 }));

app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use((req, res) => res.status(404).json({ success: false, message: 'Not found' }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: 'Server error' });
});

const PORT = process.env.PORT || 5000;
if (!process.env.MONGODB_URI) { console.error('MONGODB_URI missing'); process.exit(1); }
connectDB().then(() => app.listen(PORT, () => console.log(`API on ${PORT}`)))
  .catch(e => { console.error(e.message); process.exit(1); });
