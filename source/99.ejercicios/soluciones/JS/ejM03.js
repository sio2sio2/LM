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
      MAX = 9999999;

/**
 * Número predeterminado
 * @type {number}
 */
const NUMERO = 123;


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


const numero = aleatorio?generarAleatorio(MIN, MAX):NUMERO;
console.log(`La inversión de ${numero} es ${invertirNumero(numero)}.`);