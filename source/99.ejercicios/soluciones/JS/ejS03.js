"use strict";

/**
 * @file Transforma un tiempo en segundo a horas, minutos y segundos.
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
      MAX = 100000;

/**
 * Tiempo predeterminado en segundos.
 * @type {number}
 */
const TIEMPO =  46541;

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
 * Transfomra un tiempo en segundos a horas, minutos y segundos.
 * @param {number} t - El tiempo en segundos.
 * 
 * @example
 * conversorTiempo(36000);  // Devuelve [1, 0, 0].
 * 
 * @returns {Array} - Un array con [h, m, s]
 */
function conversorTiempo(t) {
    const res = [t, 0, 0],
          factor = 60; // 1min tiene 60s; 1 hora, 60min

    // La fracción inferior es el resto de la división;
    // y la fracción siguiente, la división entera.
    for(let i=0; i < res.length - 1; i++) {
        [res[i], res[i+1]] = [res[i]%factor, Math.floor(res[i]/factor)];
    }

    // Preferimos [h, m, s] que [s, m, h]
    return res.reverse();

}

const tiempo = aleatorio?generarAleatorio(MIN, MAX):TIEMPO;

let hms = conversorTiempo(tiempo);
console.log(`${tiempo} segundos son ${hms[0]} horas, ${hms[1]} minutos y ${hms[2]} segundos.`);
