/**
 * @file Calcula el área de un rectánguloa partir de sus dos lados.
 * @author José Miguel Sánchez Alés <jsanale860@g.educaand.es>
 */

/**
 * Controla si se genera una entrada alteatoria o no.
 * @type {boolean}
 */
const aleatorio = true;

/**
 * Límite inferior predefinido para generar aleatorios.
 * @type {number}
 */
const MIN = 1,
/**
 * Límite superior predefinido para generar aleatorios.
 * @type {number}
 */
      MAX = 50;

/**
 * Ancho predeterminado.
 * @type {number}
 */
const ANCHO =  15,
/**
 * Alto predeterminado.
 * @type {number}
 */
      ALTO  =  20;


/**
 * Genera un entero aleatorio entre un límite inferior
 * y un límite superior
 *
 * @param {number} min - El límite inferior.
 * @param {number} max - El límite superior.
 * 
 * @example
 * // Devuelve un entero entre 0 y 10 (ambos inclusive)
 * generarAleatorio(0, 10);
 * 
 * @returns {number} - El entero aleatorio.
 */
function generarAleatorio(min, max) {
    return Math.round(Math.random()*(max - min)) + min;
}

/**
 * Calcula el área de un rectángulo.
 * @param {number} alto - Longitud de su altura.
 * @param {number} ancho     - Longitud de su anchura.
 * 
 * @example
 * areaRectangulo(2, 6); // Devuelve 12
 * 
 * @returns {number} - El área.
 */
function areaRectangulo(alto, ancho) {
    return ancho*alto;
}

const ancho = aleatorio?generarAleatorio(MIN, MAX):ANCHO,
      alto  =  aleatorio?generarAleatorio(MIN, MAX):ALTO;

console.log(`El area de un rectángulo de ${ancho}x${alto} es ${areaRectangulo(ancho, alto)}.`);
