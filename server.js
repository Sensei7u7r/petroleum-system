/**
 * Sistema Petrolero AR — Backend API
 * Stack: Node.js + Express
 * DB:    data/db.json (migrable a PostgreSQL/MongoDB sin cambiar rutas)
 * Auth:  Bearer token estático (reemplazar por JWT en producción)
 */

const express  = require('express');
const fs       = require('fs');
const path     = require('path');
const cors     = require('cors');

const app  = express();
const PORT = process.env.PORT || 3001;
const DB   = path.join(__dirname, 'data', 'db.json');
const TOKEN = process.env.API_TOKEN || 'petroleum-ar-2025';

// ── Middlewares ───────────────────────────────────────────────────────────────

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Logger simple
app.use((req, _res, next) => {
  console.log(`[${new Date().toLocaleTimeString('es-AR')}] ${req.method} ${req.path}`);
  next();
});

// Auth middleware — aplicar a rutas que lo necesiten
function auth(req, res, next) {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  if (token !== TOKEN) return res.status(401).json({ error: 'Token inválido' });
  next();
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function readDB() {
  return JSON.parse(fs.readFileSync(DB, 'utf8'));
}

function writeDB(data) {
  fs.writeFileSync(DB, JSON.stringify(data, null, 2), 'utf8');
}

// ── RUTAS PÚBLICAS ───────────────────────────────────────────────────────────

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', ts: new Date().toISOString() });
});

// ── RUTAS PROTEGIDAS ─────────────────────────────────────────────────────────

// Vista general
app.get('/api/overview', auth, (_req, res) => {
  const db = readDB();
  res.json({ ...db.overview, config: db.config });
});

// Histórico para gráfico principal
app.get('/api/historico', auth, (_req, res) => {
  const { historico } = readDB();
  res.json(historico);
});

// Campos
app.get('/api/campos', auth, (_req, res) => {
  res.json(readDB().campos);
});

app.patch('/api/campos/:id', auth, (req, res) => {
  const db = readDB();
  const idx = db.campos.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Campo no encontrado' });
  db.campos[idx] = { ...db.campos[idx], ...req.body };
  writeDB(db);
  res.json(db.campos[idx]);
});

// Pozos
app.get('/api/pozos', auth, (_req, res) => {
  res.json(readDB().pozos);
});

app.patch('/api/pozos/:id', auth, (req, res) => {
  const db = readDB();
  const idx = db.pozos.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Pozo no encontrado' });
  db.pozos[idx] = { ...db.pozos[idx], ...req.body };
  writeDB(db);
  res.json(db.pozos[idx]);
});

// Tanques
app.get('/api/tanques', auth, (_req, res) => {
  res.json(readDB().tanques);
});

// Productos
app.get('/api/productos', auth, (req, res) => {
  const { provincia, tipo } = req.query;
  let productos = readDB().productos;
  if (provincia) productos = productos.filter(p => p.provincia === provincia);
  if (tipo)      productos = productos.filter(p => p.tipo === tipo);
  res.json(productos);
});

app.patch('/api/productos/:id', auth, (req, res) => {
  const db = readDB();
  const idx = db.productos.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Producto no encontrado' });
  db.productos[idx] = { ...db.productos[idx], ...req.body };
  writeDB(db);
  res.json(db.productos[idx]);
});

// Provincias
app.get('/api/provincias', auth, (_req, res) => {
  res.json(readDB().provincias);
});

app.get('/api/provincias/:id', auth, (req, res) => {
  const prov = readDB().provincias.find(p => p.id === req.params.id);
  if (!prov) return res.status(404).json({ error: 'Provincia no encontrada' });
  res.json(prov);
});

// Costos
app.get('/api/costos', auth, (_req, res) => {
  res.json(readDB().costos);
});

// Sistemas SCADA
app.get('/api/sistemas', auth, (_req, res) => {
  res.json(readDB().sistemas);
});

app.patch('/api/sistemas/:id', auth, (req, res) => {
  const db = readDB();
  const idx = db.sistemas.findIndex(s => s.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Sistema no encontrado' });
  db.sistemas[idx] = { ...db.sistemas[idx], ...req.body };
  writeDB(db);
  res.json(db.sistemas[idx]);
});

// Alertas
app.get('/api/alertas', auth, (_req, res) => {
  res.json(readDB().alertas);
});

app.patch('/api/alertas/:id/reconocer', auth, (req, res) => {
  const db = readDB();
  const idx = db.alertas.findIndex(a => a.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Alerta no encontrada' });
  db.alertas[idx].reconocida = true;
  writeDB(db);
  res.json(db.alertas[idx]);
});

// Mensajes
app.get('/api/mensajes', auth, (_req, res) => {
  res.json(readDB().mensajes);
});

app.post('/api/mensajes', auth, (req, res) => {
  const { texto } = req.body;
  if (!texto || !texto.trim()) return res.status(400).json({ error: 'Texto vacío' });
  const db = readDB();
  const msg = {
    origen: 'campo',
    texto: texto.trim(),
    ts: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
  };
  db.mensajes.push(msg);
  writeDB(db);
  res.status(201).json(msg);
});

// ── INICIO ───────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`\n Sistema Petrolero AR — API corriendo`);
  console.log(` URL:   http://localhost:${3001}`);
  console.log(` Token: ${TOKEN}`);
  console.log(` Rutas: /api/health | /api/overview | /api/campos | /api/pozos`);
  console.log(`        /api/tanques | /api/productos | /api/provincias`);
  console.log(`        /api/costos | /api/sistemas | /api/alertas | /api/mensajes\n`);
});
