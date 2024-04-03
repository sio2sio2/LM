"use strict";

/**
 * @file Calcula la hipotenusa de un triángulo rectángulo a partir
 * de dos catetos.
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
 * Longitud predeterminada del primer cateto.
 * @type {number}
 */
const A =  15,
/**
 * Longitud predeterminada del segundo cateto.
 * @type {number}
 */
      B  =  20;


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
 * Calcula la hipotenusa usando el teorema de Pitágoras.
 * @param {number} a - La longitud del primer cateto.
 * @param {number} b - La longitud del segundo.
 * 
 * @example
 * calcularHipotenusa(3, 4);  // Devuelve 5.
 * 
 * @returns {number} - La longitud de la hipotenusa.
 */
function calcularHipotenusa(a, b) {
    return Math.sqrt(a**2 + b**2);
}

const a = aleatorio?generarAleatorio(MIN, MAX):A,
      b =  aleatorio?generarAleatorio(MIN, MAX):B;

console.log(`El area de un rectángulo de ${a}x${b} es ${calcularHipotenusa(a, b).toFixed(3)}.`);
