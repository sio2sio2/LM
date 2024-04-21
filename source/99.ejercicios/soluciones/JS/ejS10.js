"use strict";

/**
 * @file Determina cuál es la posición relativa de dos circunferencias.
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
 * Primera circunferencia predeterminada.
 * @type {object}
 */
const C1 = {x: 10, y: 10, r: 15},
/**
 * Segunda circunferencia predeterminada.
 * @type {object}
 */
      C2 = {x: 10, y: 15, r: 5};


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
 * @returns {number} - El entero aleatorio.
 */
function generarAleatorio(min, max) {
    return Math.round(Math.random()*(max - min)) + min;
}

/**
 * Calcula la distancia entre dos puntos del plano.
 * @param {object} p1 - Primer punto.
 * @param {object} p2 - Segundo punto.
 * 
 * @returns {number} - La distancia euclídea entre ambos puntos.
 */
function distanciaPuntos(p1, p2) {
    return Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2);
}


/**
 * Determina cual es la posición de dos circunferencias en el plano.
 * 
 * @param {object} c1 - Primera circunferencia.
 * @param {object} c2 - Segunda circunferencia.
 * 
 * @return {string} - La descripción de la posición relativa.
 */
function posRelativa(c1, c2) {
    const POSICION = {
        CONCENTRICA: "Concéntrica",
        EXTERIOR: "Exterior",
        TANGEXT: "Tangente exterior",
        TANGINT: "Tangente interior",
        SECANTEEXT: "Secante exterior",
        SECANTEINT: "Secante interior",
        INTERIOR: "Interior"
    }

    let distCentros, resultado;

    if(c1.r === c2.r) {
        resultado = POSICION.CONCENTRICA;
    }
    else {
        distCentros = Math.abs(distanciaPuntos(c1, c2));

        if(distCentros > c1.r + c2.r) {
            resultado = POSICION.EXTERIOR;
        }
        else if(distCentros === c1.r + c2.r) {
            resultado = POSICION.TANGEXT;
        }
        else {
            const radioMayor = Math.max(c1.r, c2.r),
                radioMenor =  Math.min(c1.r, c2.r);

            if(distCentros > radioMayor) {
                resultado = POSICION.SECANTEEXT;
            }
            else if(radioMayor === distCentros + radioMenor) {
                resultado = POSICION.TANGINT;
            }
            else if(radioMayor > distCentros + radioMenor) {
                resultado = POSICION.INTERIOR;
            }
            else {
                resultado = POSICION.SECANTEINT;
            }
        }
    }

    return resultado;
}

const c1 = {
                x: aleatorio?generarAleatorio(MIN, MAX):C1.x,
                y: aleatorio?generarAleatorio(MIN, MAX):C1.y,
                r: aleatorio?generarAleatorio(MIN, MAX):C1.r
           },
      c2 = {
                x: aleatorio?generarAleatorio(MIN, MAX):C2.x,
                y: aleatorio?generarAleatorio(MIN, MAX):C2.y,
                r: aleatorio?generarAleatorio(MIN, MAX):C2.r
           };
      
console.log(c1, c2, posRelativa(c1, c2));