"use strict";

/**
 * @file Excluir los números menores al último.
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
 * Lista predeterminada
 * @type {Number[]}
 */
const LISTA = [87, 22, 45, 78, 33, 64, 1, 66, 21, 56];

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

// Programa principal

const lista = aleatorio?LISTA.map(e => generarAleatorio(MIN, MAX)):LISTA;

// Como eliminar los números menores al último
// no es algo a priori que sea útil en distintas situaciones,
// no me molestaré ni en hacer una función.

console.log(`Lista: [${lista}].`);
console.log(`Menores: [${lista.filter((e, _, arr) => e <= arr.at(-1))}]`);