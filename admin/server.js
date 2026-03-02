import express from 'express';
import { readFileSync, writeFileSync, copyFileSync, mkdirSync } from 'fs';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH   = join(__dirname, '../src/data/cv.json');
const PHOTO_PATH  = join(__dirname, '../public/profile.jpg');
const LOGOS_DIR   = join(__dirname, '../public/logos');

mkdirSync(LOGOS_DIR, { recursive: true });

const ADMIN_USER = process.env.ADMIN_USER || 'agosalvez';
const ADMIN_PASS = process.env.ADMIN_PASS || 'Agosalvez#314';

function basicAuth(req, res, next) {
  const auth = req.headers['authorization'];
  if (!auth || !auth.startsWith('Basic ')) {
    res.set('WWW-Authenticate', 'Basic realm="CV Admin"');
    return res.status(401).send('Acceso no autorizado');
  }
  const [user, pass] = Buffer.from(auth.slice(6), 'base64').toString().split(':');
  if (user !== ADMIN_USER || pass !== ADMIN_PASS) {
    res.set('WWW-Authenticate', 'Basic realm="CV Admin"');
    return res.status(401).send('Credenciales incorrectas');
  }
  next();
}

const app = express();
app.use(basicAuth);
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

app.post('/api/logo', upload.single('logo'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });
  const ext = extname(req.file.originalname).toLowerCase() || '.png';
  const name = (req.body.name || Date.now()) + ext;
  const dest = join(LOGOS_DIR, name);
  copyFileSync(req.file.path, dest);
  res.json({ ok: true, path: `/logos/${name}` });
});

// ── Arrancar ──────────────────────────────────────────────────
const PORT = process.env.PORT || 4322;
app.listen(PORT, () => {
  console.log(`✅ CV Admin corriendo en http://localhost:${PORT}`);
});
