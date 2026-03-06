const express = require('express');
const path = require('path');
const { extraerReceta } = require('./src/scraper');
const { traducirReceta } = require('./src/conversor');

const app = express();

// CONFIGURACIÓN
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

// Guardamos las recetas en memoria
const recetasGuardadas = [];

// ─────────────────────────────────────────
// RUTA PRINCIPAL → Listado de recetas
// ─────────────────────────────────────────
app.get('/', (req, res) => {
    res.render('index', { recetas: recetasGuardadas, error: null });
});

// ─────────────────────────────────────────
// RUTA POST → Extraer nueva receta
// ─────────────────────────────────────────
app.post('/traducir', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.render('index', { recetas: recetasGuardadas, error: 'Por favor, introduce una URL.' });
    }

    const receta = await extraerReceta(url);

    if (receta.error) {
        return res.render('index', { recetas: recetasGuardadas, error: receta.error });
    }

    // Añadimos las traducciones a la receta
    receta.traducciones = traducirReceta(receta.instrucciones);
    receta.id = Date.now(); // ID único para enlazar a la página de detalle
    receta.url = url;

    // Guardamos en el array (evitamos duplicados por URL)
    const yaExiste = recetasGuardadas.find(r => r.url === url);
    if (!yaExiste) recetasGuardadas.push(receta);

    // Redirigimos a la página de detalle
    res.redirect(`/receta/${receta.id}`);
});

// ─────────────────────────────────────────
// RUTA DETALLE → Página de una receta
// ─────────────────────────────────────────
app.get('/receta/:id', (req, res) => {
    const receta = recetasGuardadas.find(r => r.id === parseInt(req.params.id));

    if (!receta) {
        return res.redirect('/');
    }

    res.render('receta', { receta });
});

// ─────────────────────────────────────────
// ARRANQUE DEL SERVIDOR
// ─────────────────────────────────────────
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor funcionando en http://localhost:${PORT}`);
});