import express from 'express';
import { readFileSync, writeFileSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH  = join(__dirname, '../src/data/cv.json');
const PHOTO_PATH = join(__dirname, '../public/profile.jpg');

const app = express();
app.use(express.json({ limit: '2mb' }));
app.use(express.static(join(__dirname, 'public')));

const upload = multer({ dest: '/tmp' });

// ── API ───────────────────────────────────────────────────────

app.get('/api/data', (_req, res) => {
  res.json(JSON.parse(readFileSync(DATA_PATH, 'utf8')));
});

app.post('/api/data', (req, res) => {
  writeFileSync(DATA_PATH, JSON.stringify(req.body, null, 2));
  res.json({ ok: true });
});

app.post('/api/photo', upload.single('photo'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });
  copyFileSync(req.file.path, PHOTO_PATH);
  res.json({ ok: true });
});

// ── Arrancar ──────────────────────────────────────────────────
const PORT = process.env.PORT || 4322;
app.listen(PORT, () => {
  console.log(`✅ CV Admin corriendo en http://localhost:${PORT}`);
});
