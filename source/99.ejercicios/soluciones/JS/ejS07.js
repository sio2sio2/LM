"use strict";

/**
 * @file Realiza un operación al azar con dos operadores.
 * @author José Miguel Sánchez Alés <jsanale860@g.educaand.es>
 */

/**
 * Controla si se genera una entrada aleatoria o no.
 * @type {boolean}
 */
const aleatorio = true;

/**
 * Operaciones disponibles
 * @type {object}
 */
const OPERACIONES = {
    "suma":  (a, b) => a + b,
    "resta": (a, b) => a - b,
    "producto": (a, b) => a * b,
    "división": (a, b) => a / b,
    // Esta no la recoge el enunciado, pero es una prueba de que es muy
    // extender la solución a otras operaciones no exigidas por el enunciado.
    "módulo": (a, b) => a % b
}

/**
 * Límite inferior predefinido para generar aleatorios.
 * @type {number}
 */
const MIN = 1,
/**
 * Límite superior predefinido para generar aleatorios.
 * @type {number}
 */
      MAX = 100;

/**
 * Primer operando predeterminado.
 * @type {number}
 */
const A =  15,
/**
 * Segundo operando predeterminado.
 * @type {number}
 */
      B  =  5


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

// Operandos
const a = aleatorio?generarAleatorio(MIN, MAX):A,
      b =  aleatorio?generarAleatorio(MIN, MAX):B;

// Escogemos una operación al azar entre las posibles.
const opArray = Object.entries(OPERACIONES);
let [nombre, operacion] = opArray[generarAleatorio(0, opArray.length - 1)];

let resultado = operacion(a, b);

console.log(`La operación ${nombre} de ${a} y ${b} es ${resultado}.`);
