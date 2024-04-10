"use strict";

/**
 * @file Realiza un operación al azar con dos operadores.
 * @author José Miguel Sánchez Alés <jsanale860@g.educaand.es>
 */

/**
 * Controla si se genera una entrada alteatoria o no.
 * @type {boolean}
 */
const aleatorio = false;

/**
 * Operaciones disponibles
 * @type {Array}
 */
const OPERACIONES = ['+', '-', '*', '/', '%']

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

const a = aleatorio?generarAleatorio(MIN, MAX):A,
      b =  aleatorio?generarAleatorio(MIN, MAX):B;

const operacion = OPERACIONES[generarAleatorio(0, OPERACIONES.length - 1)];

let resultado;

switch(operacion) {
    case '+':
        resultado = a + b;
        break;
    case '-':
        resultado = a - b;
        break;
    case '*':
        resultado = a * b;
        break;
    case '/':
        resultado = a / b;
        break;
    case '%':
        resultado  = a % b;
        break;
}

console.log(`El resultado de ${a} ${operacion} ${b} es ${resultado}`);