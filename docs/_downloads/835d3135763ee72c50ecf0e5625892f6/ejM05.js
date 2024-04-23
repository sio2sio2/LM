/**
 * @file Obtener a partir de un número el resultante de invertir
 * todas sus cifras.
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
const MIN = 10,
/**
 * Límite superior predefinido para generar aleatorios.
 * @type {number}
 */
      MAX = 99999;

/**
 * Números predeterminados
 * @type {number}
 */
const NUMEROS = [1452, 1221, 535, 78687, 321];


/**
 * Genera un entero aleatorio entre un límite inferior
 * y un límite superior
 *
 * @param {number} min - El límite inferior.
 * @param {number} max - El límite superior.
 * 
 * @example
 * generarAleatorio(0, 10); // Entero entre 0 y 10 (ambos inclusive)
 * 
 * @returns {number} - El entero aleatorio.
 */
function generarAleatorio(min, max) {
    return Math.round(Math.random()*(max - min)) + min;
}

/**
 * Calcula el número resultante de invertir de orden
 * las cifras del número original.
 * @param {number} n - El número original.
 * 
 * @returns {number} - El número invertido.
 */
function invertirNumero(n) {
    return Number(Array.from(String(n)).reverse().join(''));
}

/**
 * Comprueba si un número es capicúa
 * 
 * @param {number} n - El número a comprobar.
 * 
 * @returns {boolean} - Si lo es o no.
 */
function esCapicua(n) {
    return n === invertirNumero(n);
}

const numeros = aleatorio?NUMEROS.map(e => generarAleatorio(MIN, MAX)):NUMEROS;
for(const num of numeros) {
    console.log(`El número ${num}${esCapicua(num)?"":" no"} es capicúa.`);
}