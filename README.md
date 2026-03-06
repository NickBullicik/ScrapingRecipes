# Traductor Universal de Recetas

Herramienta web que extrae recetas de cualquier URL y traduce automáticamente sus parámetros a los 5 robots de cocina principales.

## ¿Qué hace?

1. Pegas la URL de una receta
2. Extrae automáticamente título, imagen, ingredientes e instrucciones
3. Detecta para qué robot fue escrita
4. Muestra las instrucciones adaptadas para Thermomix, Mambo, Monsieur Cuisine, Taurus y Moulinex

## Tecnologías

- **Node.js** — entorno de ejecución
- **Express** — servidor web
- **EJS** — plantillas HTML dinámicas
- **Axios** — descarga el HTML de la URL
- **Cheerio** — lee y extrae datos del HTML
- **Bootstrap 5** — diseño visual

## Instalación

```bash
npm install
```

## Uso

```bash
node app.js
```

Abre el navegador en `http://localhost:3000`

## Estructura

```
ScrapingRecipes/
├── src/
│   ├── scraper.js      # Extrae la receta de la URL
│   └── conversor.js    # Traduce los pasos a cada robot
├── views/
│   ├── index.ejs       # Página principal
│   └── receta.ejs      # Página de detalle
├── app.js              # Servidor y rutas
└── package.json
```

## Webs compatibles

Funciona con cualquier web que tenga datos estructurados JSON-LD (Schema.org Recipe)

## Robots soportados

| Robot |
|-------|
| Thermomix |
| Mambo | Cecotec |
| Monsieur Cuisine |
| Taurus |
| Moulinex |
