"use strict";

/**
 * @file Calcular la suma y el producto de diez enteros aleatorios entre 1 y 40.
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
    MAX = 40;

/**
 * Cantidad de números
 * 
 * @type {number}
 */
const CANTIDAD = 10;

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
    return Math.round(Math.random() * (max - min)) + min;
}

/**
 * Suma los elementos de un array
 * 
 * @param {Number[]} sumandos - Sumandos a sumar.
 * 
 * @returns {number}
 */
function sumatorio(sumandos) {
    return sumandos.reduce((acc, e) => acc + e);
}

/**
 * Producto los elementos de un array
 * 
 * @param {Number[]} factores - Factores a multiplicar.
 * 
 * @returns {number}
 */
function multiplicatorio(factores) {
    return factores.reduce((acc, e) => acc * e);
}

// Programa principal

const operandos = Array(CANTIDAD).fill(null).map(e => generarAleatorio(MIN, MAX));

console.log(`Operandos: [${operandos}].`);
console.log(`Sumatorio: ${sumatorio(operandos)}.`);
// Antes de multiplicar paso a BigInt los elementos,
// por si el número es demasiado grande.
console.log(`Multiplicatorio: ${multiplicatorio(operandos.map(e => BigInt(e)))}.`);