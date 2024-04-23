"use strict";

/**
 * @file Crear indexOf_N() que busque la aparición n-ésima de un determinado valor.
 * @author José Miguel Sánchez Alés <jsanale860@g.educaand.es>
 */


/**
 * Busca en un array la aparición n-ésima de un determinado valor.
 *
 * No es lo más eficiente, pero se ha usado una función recursiva
 * a partir del método index_Of.
 *
 * @param {Array} arr - Array en que se busca.
 * @param {any} valor - Valor buscado.
 * @param {number} n - Número de aparición.
 *
 * @returns {number} - La  posición que ocupa la n-ésima aparición de valor.
 *    NaN si no hay resultados.
 */
function indexOf_N(arr, valor, n) {
    const pos = arr.indexOf(valor);

    if(pos ===  -1) return NaN
    else return pos + ((n>1)?(1 + indexOf_N(arr.slice(pos + 1), valor, n-1)):0);
}


const a = [0, 1, 4, 1, 2, 1, 1, 4, 5, 6];
console.log(indexOf_N(a, "a", 4));
console.log(indexOf_N(a, 2, 4));
console.log(indexOf_N(a, 1, 4));
