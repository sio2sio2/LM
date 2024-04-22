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
      MAX = 10000;

/**
 * Fracciones existentes de dinero.
 * @type {Number[]}
 */
const FRACCIONES =  [50, 20, 10, 5, 1];

/**
 * Total predeterminado de dinero.
 * @type {number}
 */
const TOTAL = 1254;

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
 * Devuelve un monedero con la moneda fraccionaria.
 * @param {number} monto - Cantidad de dinero a fraccionar.
 * 
 * @example
 * fraccionar(87); // Devuelve {1: 2, 5: 1, 10: 1, 20: 1, 50: 1}
 * 
 * @returns {object} - Monedero con la cantidad de cada moneda.
 */
function fraccionar(monto) {
    return FRACCIONES.reduce((mon, frac) => {
        mon[frac] = Math.floor(monto / frac);
        monto %= frac;
        return mon;
    }, {});
   /* Esta es una alternativa con un for.
   const monedero = {};
   for(const fraccion of FRACCIONES) {
        monedero[fraccion] = Math.floor(monto / fraccion);
        monto %= fraccion;
   }
   return monedero;
   */
}

const total = aleatorio?generarAleatorio(MIN, MAX):TOTAL;
let monedero = fraccionar(total);

console.log(`${total} euros se fraccionan en:`)
for(const fraccion of FRACCIONES) {
    console.log(` - ${monedero[fraccion]} monedas/billetes de ${fraccion} euros.`);
}
