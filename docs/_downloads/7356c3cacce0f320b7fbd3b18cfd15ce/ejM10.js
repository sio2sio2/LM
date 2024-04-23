"use strict";

/**
 * @file Construye una pirámide de N niveles.
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
    MAX = 20;

/**
 * Nivel predeterminado
 * @type {number}
 */
const NIVEL = 6,
/**
 * Carácter de dibujo
 * @type {string}
 */
      CHAR = "o";

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

const nivel = aleatorio?generarAleatorio(MIN, MAX):NIVEL;

console.log(`Construimos una pirámide de ${nivel} niveles:\n`);
for(let i = 1; i <= nivel; i++) {
    let linea = " ".repeat(nivel - i) + CHAR.repeat(2*i - 1);
    console.log(linea);
}