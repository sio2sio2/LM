"use strict";

/**
 * @file Determina una nota descriptiva a partir de la nota numérica.
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
const MIN = 0,
/**
 * Límite superior predefinido para generar aleatorios.
 * @type {number}
 */
      MAX = 10;

/**
 * Año predeterminado para hacer el cálculo
 * @type {number}
 */
const NOTA = 4;

/**
 * Genera un entero aleatorio entre un límite inferior
 * y un límite superior
 *
 * @param {number} min - El límite inferior.
 * @param {number} max - El límite superior.
 * 
 * @example
 * // Devuelve un número con dos decimales entre 0 y 10 (ambos inclusive)
 * generarAleatorio(0, 10);
 * 
 * @returns {number} - El número aleatorio.
 */
function generarAleatorio(min, max) {
    return (Math.random()*(max - min) + min).toFixed(2);
}

/**
 * Mapeo que define las notas descriptivas. La clave es la denominación de la nota
 * y el valor el límite inferior (incluido de esa definición).
 * @type {object}
 */
const DESCRIPTIVAS = {
    "muy deficiente": 0,
    "insuficiente": 3,
    "suficiente":  5,
    "bien": 6,
    "notable": 7,
    "sobresaliente": 9
}

const nota = aleatorio?generarAleatorio(MIN, MAX):NOTA,
      // Convertimos a [descr, lím. inf] y nos quedamos sólo con las tuplas
      // cuyo límite es más pequeño que la nota. Si las ordenamos, la tupla
      // que contiene la nota descriptiva es la última, ya que es la que
      // contiene el mayor de los límites.
      notaDescriptiva = Object.entries(DESCRIPTIVAS)
                              .filter(e => e[1] < nota)
                              .sort(e => e[1]).at(-1)[0];

console.log(`Un ${nota} equivale a ${notaDescriptiva}.`);