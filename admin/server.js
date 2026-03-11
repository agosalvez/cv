import express from 'express';
import { readFileSync, writeFileSync, copyFileSync, mkdirSync } from 'fs';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __dirname = dirname(fileURLToPath(import.meta.url));

// En Docker APP_ROOT=/app; en local dev se infiere desde la ubicación del script
const ROOT      = process.env.APP_ROOT || join(__dirname, '..');
const DATA_PATH  = join(ROOT, 'src/data/cv.json');
const PHOTO_PATH = join(ROOT, 'public/profile.jpg');
const LOGOS_DIR  = join(ROOT, 'public/logos');
const DIST_DIR   = join(ROOT, 'dist');
const UI_DIR     = join(__dirname, 'ui');

mkdirSync(LOGOS_DIR, { recursive: true });
mkdirSync(join(ROOT, 'src/data'), { recursive: true });

const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASS = process.env.ADMIN_PASS;
if (!ADMIN_USER || !ADMIN_PASS) {
  console.error('❌ Faltan ADMIN_USER y/o ADMIN_PASS en las variables de entorno');
  process.exit(1);
}

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
const upload = multer({ dest: '/tmp' });

app.use(express.json({ limit: '2mb' }));

// ── CV estático — público ───────────────────────────────────
app.use(express.static(DIST_DIR));
app.use(express.static(join(ROOT, 'public')));

app.get('/', (_req, res) => res.redirect(301, '/es'));

// ── Admin panel — protegido ─────────────────────────────────
app.use('/admin', basicAuth, express.static(UI_DIR));

// ── API — protegida ─────────────────────────────────────────
app.get('/api/data', basicAuth, (_req, res) => {
  res.json(JSON.parse(readFileSync(DATA_PATH, 'utf8')));
});

app.post('/api/data', basicAuth, (req, res) => {
  writeFileSync(DATA_PATH, JSON.stringify(req.body, null, 2));
  res.json({ ok: true });
});

app.post('/api/photo', basicAuth, upload.single('photo'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });
  copyFileSync(req.file.path, PHOTO_PATH);
  res.json({ ok: true });
});

app.post('/api/logo', basicAuth, upload.single('logo'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });
  const ext = extname(req.file.originalname).toLowerCase() || '.png';
  const name = (req.body.name || Date.now()) + ext;
  const dest = join(LOGOS_DIR, name);
  copyFileSync(req.file.path, dest);
  res.json({ ok: true, path: `/logos/${name}` });
});

// ── Arrancar ────────────────────────────────────────────────
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`✅ CV en http://localhost:${PORT}/es`);
  console.log(`🔐 Admin en http://localhost:${PORT}/admin`);
});
