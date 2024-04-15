"use strict";

/**
 * @file Calcula el dinero total que tiene un monedero con moneda fraccionaria.
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
      MAX = 100;

/**
 * Monedero predeterminado
 * @type {object}
 */
const MONEDERO =  {
    1: 1,
    5: 1,
    10: 1,
    20: 1,
    50: 1
}

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


// Si estuviéramos haciendo POO esto podría ser un método de monedero
/**
 * Calcula el dinero total equivalente al dinero
 * en monedas y billetes que tenemos.
 * @param {object} mon - El monedero constituido por monedas.
 * 
 * @example
 * conversorTiempo({1: 1, 5: 1, 10: 1, 20: 1, 50: 1});  // Devuelve 86.
 * 
 * @returns {number} - La cantidad total de euros.
 */
function calcularTotal(mon) {
    return Object.entries(mon).reduce((a,e) => a + e[0]*e[1], 0);;
}

const monedero = aleatorio?Object.fromEntries(Object.keys(MONEDERO).map(e => [e, generarAleatorio(MIN, MAX)])):MONEDERO;

console.log(`El monedero contiene ${calcularTotal(monedero)} euros`);