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
   const scaras = Symbol('caras');

   /**
    * Construye un dado.
    * @constructor
    * @name Dado
    * 
    * @param {number} caras - Número de caras.
    */
   function Dado(caras) {
      this[scaras] = caras;
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
         this.valor = generarAleatorio(1, this[scaras]);
         return this.valor;
      },
      /**
       * Vuelve el dado a su estado inicial (sin valor)
       * @memberof Dado.prototype
       */
      reset() {
         delete this.valor;
      },
      /**
       * Representación numérica del dado (su valor)
       * @memberof Dado.prototype
       *
       */
      valueOf() {
         return this.valor;
      },
      /**
       * Cantidad de caras del dado.
       * @memberof Dado.prototype
       *
       * @type {number}
       */
      get caras() { return this[scaras]; }
   }));

   return Dado;
})();


const Registro = (() => {
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
      this[log] = [];
      this[sfin] = fin;
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
         this[log].push(apunte);
         return apunte;
      },
      /**
       * Vacía el registro por completo.
       * @memberof Registro.prototype
       */
      vaciar() {
         this[log].length = 0;
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
      get cerrado() { return this[sfin](this[log]); },
      /**
       * Indica si el registro no se ha usado aún.
       * @memberof Registro.prototype
       * 
       * @type {boolean}
       */
      get nuevo() { return this[log].length === 0; }
   }));

   return Registro;
})();

const Partida = (() => {
   const sdado = Symbol('dado'),
         sdados = Symbol('dados'),
         registro = Symbol('registro');

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
      // Con un dado basta para cubrir toda la partida.
      this[sdado] = dado??new Dado(caras);
      this[sdados] = dados;
      this[registro] = new Registro(fin);
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
         return this[registro].apuntar(Array(this[sdados]).fill(null).map(_ => this[sdado].tirar()));
      },
      /**
       * Cantidad de dados que se necesitan por tirada.
       * @memberof Partida.prototype
       * 
       * @type {number}
       */
      get dados() {
         return this[sdados];
      },
      /**
       * Si la partida ha acabado, porque se alcanzó la tirada ganadora.
       * @memberof Partida.prototype
       * 
       * @type {boolean}
       */
      get fin() {
         return this[registro].cerrado;
      },
      /**
       * Indica si la partida no ha comenzado (aún no se han tirado nunca los dados)
       * @memberof Partida.prototype
       * 
       * @type {boolean}
       */
      get comienzo() {
         return this[registro].nuevo;
      },
      /**
       * Reinicia la partida.
       * @memberof Partida.prototype
       */   
      reset() {
         this[registro].vaciar();
      },
      /**
       * Devuelve el cantidad de rondas jugadas.
       * @memberof Partida.prototype
       * 
       * @type {number}
       */
      get ronda() {
         return this[registro].tamanho + (this.fin?0:1);
      }
   }));

   return Partida;
})();

const reglas = {
   dados: 2,
   caras: 6,
   fin: (tiradas) => tiradas?.at(-1)?.every((e, _, arr) => e === arr[0])
}

const partida = new Partida(reglas);
while(!partida.fin) {
   console.log(`${partida.ronda}ª tirada: ${partida.lanzar().join("-")}.`);
}
console.log(`Se han tardado ${partida.ronda} tiradas en acabar el juego.`);
