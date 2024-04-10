"use strict";

/**
 * @file Determina si un año es bisiesto o no.
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
      MAX = 3212;

/**
 * Año predeterminado para hacer el cálculo
 * @type {number}
 */
const ANHO =  1999;

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
 * Calcula si un año es o no bisiesto.
 * @param {number} anho - Año a determinar.
 * 
 * @example
 * esBisiesto(2000);  // Devuelve true.
 * 
 * @returns {boolean}
 */
function esBisiesto(anho) {
   return anho % 4 === 0 && (anho % 100 != 0 || anho % 400 === 0);
}

const anho = aleatorio?generarAleatorio(MIN, MAX):ANHO;

console.log(`El año ${anho} ${esBisiesto(anho)?"":"no "}es bisiesto`);
