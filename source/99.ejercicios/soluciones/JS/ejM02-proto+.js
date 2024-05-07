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


const Dado = (() => {
   const attr = new WeakMap();

   /**
    * Construye un dado.
    * @constructor
    * @name Dado
    * 
    * @param {number} caras - Número de caras.
    */
   function Dado(caras) {
      attr.set(this, { caras });
   }

   Object.defineProperties(Dado.prototype, Object.getOwnPropertyDescriptors({
      /**
       * Simula el lanzamiento de un dado.
       * @memberof Dado.prototype
       * 
       * @returns {number} - El resultado del lanzamiento.
       */
      tirar() {
         /**
          * Resultado de la última tirada.
          * @memberof  Dado.prototype
          * @name valor
          * 
          * @type {number}
          */
         return attr.get(this).valor = generarAleatorio(1, attr.get(this).caras);
      },
      /**
       * Vuelve el dado a su estado inicial (sin valor)
       * @memberof Dado.prototype
       */
      reset() {
         delete attr.get(this).valor;
      },
      /**
       * Representación numérica del dado (su valor)
       * @memberof Dado.prototype
       *
       */
      valueOf() {
         return attr.get(this).valor;
      },
      /**
       * Cantidad de caras del dado.
       * @memberof Dado.prototype
       *
       * @type {number}
       */
      get caras() { return attr.get(this).caras; }
   }));

   return Dado;
})();


const Registro = (() => {
   const attr = new WeakMap();
   const log = Symbol('log'),
         sfin = Symbol('fin');

   /**
    * Modela el almacenaje de las tiradas en una partida de dados.
    * @constructor
    * @name Registro
    *
    * @param {Registro~finCallback} fin - Condición que determina el final del registro.
    */
   function Registro(fin) {
      attr.set(this, {
         log: [],
         fin
      });
   }

   /**
    * Comprueba si las tiradas son ganadoras.
    * @callback Registro~finCallback
    *
    * @param {Number[][]} tiradas - Las tiradas de la partida.
    * @returns {boolean}
    */
   Object.defineProperties(Registro.prototype, Object.getOwnPropertyDescriptors({

      /**
       * Apunta la tirada en el registro.
       * @memberof Registro.prototype
       * 
       * @param {Number[]} apunte - Resultados de la tirada de dados. Si la tirada
       * consiste en tirar dos dados, el array tendrá un tamaño de 2; si tres
       * dados, 3; y así sucesivamente.
       * @returns {Number[]} - El propio apunte.
       */
      apuntar(apunte) {
         if(this.cerrado) return false;
         attr.get(this).log.push(apunte);
         return apunte;
      },
      /**
       * Vacía el registro por completo.
       * @memberof Registro.prototype
       */
      vaciar() {
         attr.get(this).log.length = 0;
      },
      /**
       * Devuelve el tamaño del registro.
       * @memberof Registro.prototype
       * @type {number}
       */
      get tamanho() { return this[log].length; },
      /**
       * Indica si el registro está cerrado, porque se alcanzó la tirada ganadora.
       * @memberof Registro.prototype
       * 
       * @type {boolean}
       */
      get cerrado() { return attr.get(this).fin(attr.get(this).log); },
      /**
       * Indica si el registro no se ha usado aún.
       * @memberof Registro.prototype
       * 
       * @type {boolean}
       */
      get nuevo() { return attr.get(this).log.length === 0; }
   }));

   return Registro;
})();

const Partida = (() => {
   const attr = new WeakMap();

   /**
    * Modela una partida de dados.
    * @constructor
    * @name Partida
    *
    * @param {Partida~reglas} reglas - Reglas
    *  para la creación de la partida. Se puede proporcionar un dado o un número de caras y, si
    *  se proporcionan ambas, prevalece el dado.
    *
    *  @example
    *
    *  // Se gana la partida cuando se saca un 6.
    *  const reglas = {
    *     dados: 1,
    *     caras: 6,
    *     fin: (tiradas) => tiradas?.some(e => e[0] === 6)
    *  }
    *
    *  const partida = Partida(reglas);
    *  while(!partida.fin) {}
    *  console.log(`Ha tirado ${partida.ronda} veces hasta sacar un 6.`);
    */
   function Partida({dado, dados, caras, fin = () => false}) {
      attr.set(this, {
         // Con un dado basta para cubrir toda la partida.
         dado: dado??new Dado(caras),
         dados: dados,
         registro: new Registro(fin)
      });
   }

   /**
    * @typedef {Object} Partida~reglas
    *
    * @property {Dado} dado - Dado que se usa en la partida.
    * @property {number} dados - Número de dados para cada tirada.
    * @property {number} caras - Número de caras del dado (opcional a dado).
    * @property {Registro~finCallback} fin - Función que comprueba si la tirada es ganadora.
    */

   Object.defineProperties(Partida.prototype, Object.getOwnPropertyDescriptors({
      /**
       * Simula una tirada de dados.
       * @memberof Partida.prototype
       *
       * @returns {Number[]} -  El resultado de la tirada de dados.
       */
      lanzar() {
         return attr.get(this).registro.apuntar(Array(attr.get(this).dados).fill(null).map(_ => attr.get(this).dado.tirar()));
      },
      /**
       * Cantidad de dados que se necesitan por tirada.
       * @memberof Partida.prototype
       * 
       * @type {number}
       */
      get dados() {
         return attr.get(this).dados;
      },
      /**
       * Si la partida ha acabado, porque se alcanzó la tirada ganadora.
       * @memberof Partida.prototype
       * 
       * @type {boolean}
       */
      get fin() {
         return attr.get(this).registro.cerrado;
      },
      /**
       * Indica si la partida no ha comenzado (aún no se han tirado nunca los dados)
       * @memberof Partida.prototype
       * 
       * @type {boolean}
       */
      get comienzo() {
         return attr.get(this).registro.nuevo;
      },
      /**
       * Reinicia la partida.
       * @memberof Partida.prototype
       */   
      reset() {
         attr.get(this).registro.vaciar();
      },
      /**
       * Devuelve el cantidad de rondas jugadas.
       * @memberof Partida.prototype
       * 
       * @type {number}
       */
      get ronda() {
         return attr.get(this).registro.tamanho + (this.fin?0:1);
      }
   }));

   return Partida;
})();

// Ampliación para hacer la partida multijugador.

const Jugador = (() => {
   const attr = new WeakMap();


   function Jugador(nombre) {
      attr.set(this, {
         nombre,
         uid: getUID()
      });
   }

   /**
    *  Genera un identificador único en formato hexadecimal.
    *
    *  @returns {string} - El número hexadecimal.
    */
   function getUID() {
      return Number(String(Math.random()).slice(2)).toString(16)
   }

   Object.defineProperties(Jugador.prototype, Object.getOwnPropertyDescriptors({
      get nombre() {
         return attr.get(this).nombre;
      },
      get uid() {
         return attr.get(this).uid;
      },
      toString() {
         return this.nombre;
      }
   }));

   return Jugador;
})();


const PartidaMultiple = (() => {
   const attr = new WeakMap();

   /**
    * Modela una partida de dados con varios jugadores.
    * @constructor
    * @name PartidaMultiple
    *
    * @param {Partida~reglas} reglas - Reglas
    *  para la creación de la partida. Se puede proporcionar un dado o un número de caras y, si
    *  se proporcionan ambas, prevalece el dado.
    *
    */
   function PartidaMultiple(reglas) {
      attr.set(this, {
         reglas,
         jug: [],
         actual: 0,
         ronda: 1
      });
   }

   Object.defineProperties(PartidaMultiple.prototype, Object.getOwnPropertyDescriptors({
      /**
       * Añade un jugador a la partida.
       * @memberof PartidaMultiple.prototype
       *
       * @param {Jugador} jugador - Jugador.
       * @param {boolean} force - Añade el jugador incluso con la partida comenzada. En ese caso,
       * se le añadirá como último jugador en lanzar.
       *
       * @returns {number} - La cantidad de jugadores añadidos a la partida.
       */
      registrar(jugador, force = false) {
         if(!this.comienzo && !force) throw new Error('No puede añadir el jugador: la partida ya está comenzada'); 
         return attr.get(this).jug.push({
            jugador,
            partida: new Partida(reglas)
         })
      },

      /**
       * Comprueba si la partida ha comenzado.
       * @memberof PartidaMultiple.prototype
       *
       * @type {boolean}
       */
      get comienzo() {
         return attr.get(this).jug.every(e => e.partida.comienzo);
      },

      /**
       * Comprueba si se está al comienzo de una ronda (debe tirar el primer jugador).
       * @memberof PartidaMultiple.prototype
       *
       * @type {boolean}
       */
      get comienzoRonda() {
         return attr.get(this).actual === 0;
      },

      /**
       * Final de la partida:  algún jugadir ha ganado y se ha completado la ronda.
       * @memberof PartidaMultiple.prototype
       *
       * @type {boolean}
       */
      get fin() {
         return this.comienzoRonda && attr.get(this).jug.some(e => e.partida.fin);
      },

      /**
       * Informa de cuál es la ronda de la partida.
       * @memberof PartidaMultiple.prototype
       *
       * @type {number}
       */
      get ronda() {
         return attr.get(this).ronda;
      },

      /**
       * Simula el lanzamiento de dados por parte de un jugador.
       * @memberof PartidaMultiple.prototype
       */
      lanzar() {
         if(attr.get(this).jug.length === 0) throw new Error("Debe registrar al menos un jugador.");

         if(this.comienzo) {
            // Desordena los jugadores
            attr.get(this).jug.sort((a,b) => Math.random() < .5);
         }

         // Si se ha acabado la ronda y alguien ya ha ganado,
         // no se lanzan más los dados.
         if(this.fin) return false;

         const resultado = attr.get(this).jug[attr.get(this).actual].partida.lanzar();
         // Siguiente
         attr.get(this).actual = (attr.get(this).actual + 1) % attr.get(this).jug.length;
         if(this.comienzoRonda) attr.get(this).ronda++;

         return resultado;
      },

      /**
       * Devuelve la partida a su estado inicial.
       * @memberof PartidaMultiple.prototype
       */
      reset() {
         attr.get(this).jug.map(e => e.partida.reset());
         attr.get(this).actual = 0;
      },

      /**
       * Devuelve el jugador que debe lanzar a continuación
       * @memberof PartidaMultiple.prototype
       *
       * @type {string}
       */
      get lanzador() {
         return attr.get(this).jug[attr.get(this).actual].jugador;
      },

      /**
       * Devuelve la lista de ganadores de la partida.
       * @memberof PartidaMultiple.prototype
       *
       * @type {string[]}
       */
      get ganadores() {
         return attr.get(this).jug.filter(e => e.partida.fin).map(e => e.jugador);
      }
   }));

   return PartidaMultiple;
})()

const reglas = {
   dados: numDados,
   caras: numCaras,
   fin: (tiradas) => tiradas?.at(-1)?.every((e, _, arr) => e === arr[0])
}

// Programa principal.

const partida = new PartidaMultiple(reglas);
partida?.registrar?.(new Jugador("Manolo"));
partida?.registrar?.(new Jugador("Juan"));
partida?.registrar?.(new Jugador("María"));
while(!partida.fin) {
   console.log(`${partida.ronda}ª tirada: ${partida.lanzador} obtiene ${partida.lanzar().join("-")}.`);
   // Al comienzo de la segunda ronda, se añade un nuevo jugador.
   if(partida.ronda === 2 && partida.comienzoRonda) partida?.registrar?.("Bartolo", true);
}
console.log(`Se han tardado ${partida.ronda} tiradas en acabar el juego. Han ganado:`);

for(const nombre of partida.ganadores || []) {
   console.log(` - ${nombre}.`);
}
