"use strict";

/**
 * @file Realiza tiradas de dos dados hasta que en una misma tirada
 * los dos dados sacan la misma puntuación.
 * @license {@link https://www.mit.edu/~amini/LICENSE.md|MIT}
 * @author José Miguel Sánchez Alés <jsanale860@g.educaand.es>
 */

/**
 * Número de datos lanzados en una tirada.
 * @type {number}
 */
const numDados = 2,
/**
 * Número de caras de cada dado.
 * @type {number}
 */
      numCaras = 6;

/**
 * Genera un entero aleatorio entre un límite inferior
 * y un límite superior
 *
 * @param {number} min - El límite inferior.
 * @param {number} max - El límite superior.
 * 
 * @example
 * generarAleatorio(0, 10); // Entero entre 0 y 10 (ambos inclusive)
 * 
 * @returns {number} - El entero aleatorio.
 */
function generarAleatorio(min, max) {
    return Math.round(Math.random()*(max - min)) + min;
}


/**
 * Comportamiento lanzable de un objeto como el dado.
 */
const lanzable = (state) => ({
   tirar: () => state.valor = generarAleatorio(1, state.caras),
   reset: () => state.valor = null
});

const Dado = (caras) => {
   const state = {
      caras
   }

   const visible = {
      _state: state,  // Sólo para depuración.
      get caras() { return state.caras; },
      valueOf() { return state.valor; }
   }

   return Object.freeze(Object.assign(
      visible,
      lanzable(state)
   ));
}


const Registro = (fin) => {
   const state = {
      log: []
   }

   const visible = {
      _state: state,
      get tamanho() { return state.log.length; },
      get cerrado() { return Object.isFrozen(state.log)},
      get nuevo() { return state.log.length === 0; },
   }

   function apuntar(apunte) {
      try {
         state.log.push(apunte);
      }
      catch(err) {  // El registro está congelado.
         return false;
      }

      if(fin(state.log)) Object.freeze(state.log);
      return apunte;
   }

   function vaciar() {
      state.log = [];
   }

   return Object.freeze(Object.assign(
      visible,
      { apuntar, vaciar }
   ));
}


const juego = (state) => ({
   lanzar: () => {
      return state.registro.cerrado
         ? false
         : state.registro.apuntar(Array(state.dados).fill(null).map(_ => state.dado.tirar()));
   },
   reset: () => state.registro.vaciar()
});

const Partida = ({dado, dados, caras, fin = () => false}) => {
   dado ??= Dado(caras);

   const state = {
      dado,
      dados,
      registro: Registro(fin),
   }

   const visible = {
      _state: state,
      get fin() { return state.registro.cerrado; },
      get comienzo() { return state.registro.nuevo; },
      get ronda() { return state.registro.tamanho; }
   }

   return Object.freeze(Object.assign(
      visible,
      juego(state)
   ));
};

const reglas = {
   dados: 2,
   caras: 6,
   fin: (tiradas) => tiradas?.at(-1)?.every((e, _, arr) => e === arr[0])
}


const partida = Partida(reglas);
while(!partida.fin) {
   console.log(`${partida.ronda + 1}ª tirada: ${partida.lanzar().join("-")}.`);
}
console.log(`Se han tardado ${partida.ronda} tiradas en acabar el juego.`);
