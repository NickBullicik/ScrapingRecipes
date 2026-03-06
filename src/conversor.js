// ─────────────────────────────────────────
// MATRIZ DE CONVERSIÓN
// Tabla de equivalencias entre robots de cocina
// ─────────────────────────────────────────

const ROBOTS = ['Thermomix', 'Mambo', 'Monsieur Cuisine', 'Taurus', 'Moulinex'];

// Cada acción tiene:
//   - patron: RegExp para detectarla en el texto del paso
//   - robots: objeto con la descripción para cada robot
const MATRIZ = [
    {
        accion: 'picar',
        patron: /\b(picar|picad[oa]s?|triturad[oa]s? grueso|trocead[oa]s?)\b/i,
        robots: {
            'Thermomix':        'Vel 4 / 5 seg',
            'Mambo':            'Vel 5 / 5 seg',
            'Monsieur Cuisine': 'Vel 4 / 5 seg',
            'Taurus':           'Vel 4 / 5 seg',
            'Moulinex':         'Vel 6 / 5 seg',
        }
    },
    {
        accion: 'triturar',
        patron: /\b(triturar|tritura[rd]|batir|batid[oa]|pur[eé]|triturado fino)\b/i,
        robots: {
            'Thermomix':        'Vel 10 / tiempo indicado',
            'Mambo':            'Vel 10 / tiempo indicado',
            'Monsieur Cuisine': 'Vel 10 / tiempo indicado',
            'Taurus':           'Vel 10 / tiempo indicado',
            'Moulinex':         'Vel 12 / tiempo indicado',
        }
    },
    {
        accion: 'sofreir',
        patron: /\b(sofreír|sofre[ií]r|pochar|dorar|rehogar|saltear|freír)\b/i,
        robots: {
            'Thermomix':        '120°C / Vel 1 / tiempo indicado',
            'Mambo':            '120°C / Vel 1 / tiempo indicado',
            'Monsieur Cuisine': '120°C / Vel 1 / tiempo indicado',
            'Taurus':           '120°C (Función Sofreír) / tiempo indicado',
            'Moulinex':         '130°C / Vel 1 / tiempo indicado',
        }
    },
    {
        accion: 'amasar',
        patron: /\b(amasar|amas[ae]|masa|amasado)\b/i,
        robots: {
            'Thermomix':        'Función Espiga / tiempo indicado',
            'Mambo':            'Vel 2 / tiempo indicado',
            'Monsieur Cuisine': 'Función Amasar / tiempo indicado',
            'Taurus':           'Función Amasar / tiempo indicado',
            'Moulinex':         'Pastry P1 / tiempo indicado',
        }
    }
];

// ─────────────────────────────────────────
// FUNCIÓN PRINCIPAL DE CONVERSIÓN
// Recibe los pasos originales y devuelve
// un objeto con los pasos para cada robot
// ─────────────────────────────────────────
function traducirReceta(instrucciones) {
    const resultado = {};

    ROBOTS.forEach(robot => {
        resultado[robot] = instrucciones.map(paso => {
            return traducirPaso(paso, robot);
        });
    });

    return resultado;
}

// Traduce un paso individual para un robot concreto
function traducirPaso(paso, robot) {
    for (const entrada of MATRIZ) {
        if (entrada.patron.test(paso)) {
            const equivalencia = entrada.robots[robot];
            // Añadimos la equivalencia al final del paso entre corchetes
            return `${paso} → [${robot}: ${equivalencia}]`;
        }
    }
    // Si no coincide ninguna acción, devolvemos el paso sin cambios
    return paso;
}

module.exports = { traducirReceta, ROBOTS };