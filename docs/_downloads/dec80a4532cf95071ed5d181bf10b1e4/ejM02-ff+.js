"use strict";

/**
 * @file Realiza tiradas de dos dados hasta que en una misma tirada
 * los dos dados sacan la misma puntuación.
 *
 * La POO se realiza a través del patrón "Factory" utilizando las llamadas
 * <i>factory funcions</i>, que no son más que funciones que devuelven (crean)
 * objetos. Además, el objeto se devuelve congelado para que no se le puedan
 * agregar atributos arbitrarios ({@link
 * https://medium.com/free-code-camp/elegant-patterns-in-modern-javascript-ice-factory-4161859a0eee|"Ice
 * Factory"}) como propugna Bill Sourour.
 *
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
 * Comportamiento de juego de un objeto como el dado.
 * @interface lanzable
 *
 * @returns {lanzable} - Los métodos asociados a este comportamiento.
 */
const lanzable = (state) => ({
   /**
    * Lanza el objeto para obtener una puntuación.
    *
    * @function
    * @name lanzable#tirar
    *
    * @returns number - El resultado de lanzar el dado.
    */
   tirar: () => state.valor = generarAleatorio(1, state.caras),
   /**
    * Devuelve el dado a su estado inicial anterior a cualquier tirada.
    *
    * @function
    * @name  lanzable#reset
    */
   reset: () => state.valor = null
});

/**
 * @namespace Dado
 * @implements lanzable
 */

/**
 * Función de fábrica que construye un dado.
 * 
 * @param {number} caras - Cantidad de caras del dado.
 *
 * @returns {Dado} - El objeto dado.
 */
const Dado = (caras) => {
   // Características definen el estado del dado
   const state = {
      caras,
      //valor: undefined
   }

   // Características que se quieren hacer visibles.
   const visible = {
      _state: state,  // Sólo para depuración.
      /**
       * Cantidad de caras del objeto dado.
       * @name caras
       * @memberof Dado
       * @type {number}
       */
      get caras() { return state.caras; },
      valueOf() { return state.valor; }
   }

   return Object.freeze(Object.assign(
      // Atributos que definen el estado
      visible,
      // Métodos que definen el comportamiento.
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


// Comportamiento de un juego en el que se lanzan dados.
const juegoDados = (state) => ({
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
      get ronda() { return state.registro.tamanho + (state.registro.cerrado?0:1); }
   }

   return Object.freeze(Object.assign(
      visible,
      juegoDados(state)
   ));
};

// AQUÍ acaba la implementación del ejercicio.
// Se añaden Jugador y PartidaDadosMultiple para ilustrar
// cómo tal implementación es fácilmente extensible sin modificaciones.

const Jugador = (nombre) => {

   const state = {
      nombre,
      uid: getUID()
   }

   function getUID() {
      return Number(String(Math.random()).slice(2)).toString(16)
   }

   const visible = {
      _state: state,
      // Estado accesible.
      get nombre() { return state.nombre; },
      get uid() { return state.uid; }
   }

   return Object.freeze(Object.assign(
      visible,
      { toString() {return state.nombre;} }
   ));
}


// Comportamiento para la gestión de usuarios.
const registro = (state) => ({
   registrar: (jugador, force) => {
      if(!state.comienzo && !force) throw new Error('No puede añadir el jugador: la partida ya está comenzada'); 
      return state.jugadores.push({
         jugador,
         partida: Partida(state.reglas)
      })
   },
   // Puede añadirse el borrado.
});

// Comportamiento de un juego de dados con múltiples jugadores.
const juegoDadosMultiple = (state) => ({
   lanzar: () => {
      if(state.jugadores.length === 0) throw new Error("Debe registrar al menos un jugador.");

      if(state.comienzo) {
         // Desordena los jugadores
         state.jugadores.sort((a,b) => Math.random() < .5);
      }

      // Si se ha acabado la ronda y alguien ya ha ganado,
      // no se lanzan más los dados.
      if(state.fin) return false;

      const resultado = state.jugadores[state.actual].partida.lanzar();
      // Siguiente
      state.actual = (state.actual + 1) % state.jugadores.length;
      if(state.comienzoRonda) state.ronda++;

      return resultado;
   },
   reset: () => {
      state.jugadores.map(e => e.partida.reset());
      state.actual = 0;
   }
});

const PartidaMultiple = ({dado, dados, caras, fin = () => false}) => {
   const state = {
      reglas: {
         dado: dado??Dado(caras),
         dados,
         fin
      },
      jugadores: [],
      actual: 0,
      ronda: 1
   }

   // Propiedades calculadas.
   const getters = {
      get comienzo() { return state.jugadores.every(e => e.partida.comienzo); },
      get comienzoRonda() { return state.actual === 0; },
      get fin() { return getters.comienzoRonda && state.jugadores.some(e => e.partida.fin); },
      get lanzador() { return state.jugadores[state.actual].jugador; },
      get ganadores() { return state.jugadores.filter(e => e.partida.fin).map(e => e.jugador); }
   }

   Object.defineProperties(state, Object.getOwnPropertyDescriptors(getters));

   const visible = Object.defineProperties({
      _state: state,
      // Esta propiedad no es calculada, sino un getter para hacer accesible el dato.
      get ronda() { return state.ronda; }
   }, Object.getOwnPropertyDescriptors(getters));

   return Object.freeze(Object.assign(
      visible,
      registro(state),
      juegoDadosMultiple(state),
   ));
}

// Programa principal

const reglas = {
   dados: numDados,
   caras: numCaras,
   fin: (tiradas) => tiradas?.at(-1)?.every((e, _, arr) => e === arr[0])
}

const partida = PartidaMultiple(reglas);
partida?.registrar?.(Jugador("Manolo"));
partida?.registrar?.(Jugador("Juan"));
partida?.registrar?.(Jugador("María"));
while(!partida.fin) {
   console.log(`${partida.ronda}ª tirada: ${partida.lanzador} obtiene ${partida.lanzar().join("-")}.`);
   // Al comienzo de la segunda ronda, se añade un nuevo jugador.
   if(partida.ronda === 2 && partida.comienzoRonda) partida?.registrar?.("Bartolo", true);
}

console.log(`Se han tardado ${partida.ronda} tiradas en acabar el juego. Han ganado:`);
for(const nombre of partida.ganadores || []) {
   console.log(` - ${nombre}.`);
}
