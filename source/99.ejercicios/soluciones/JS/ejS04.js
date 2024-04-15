"use strict";

/**
 * @file Determina si una persona es o no mayor de edad.
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
      MAX = 105;

/**
 * Edad predeterminada.
 * @type {number}
 */
const EDAD =  20;

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
 * Comprueba si alguien es mayor de edad.
 * @param {number} edad - La edad de la persona.
 * 
 * @example
 * esMayorDeEdad(22);  // true
 * 
 * @returns {boolean} - El resultado de la comprobación
 */
function esMayorDeEdad(edad) {
    const MAYORIA = 18;

    return edad >= MAYORIA;

}

const edad = aleatorio?generarAleatorio(MIN, MAX):EDAD;
console.log(`Una persona de ${edad} años ${esMayorDeEdad(edad)?"":"no "}es mayor de edad.`);
