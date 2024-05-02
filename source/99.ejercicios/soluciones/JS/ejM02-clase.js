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
 * Clase que representa un dado en los juegos de azar.
 * @class
 * @name Dado
 * 
 * @example
 * const dado1 = new Dado(6),  // Dos dados de seis caras.
 *       dado2 = new Dado(6);
 * dado1.tirar();
 * dado2.tirar();
 * 
 * let total = dado1 + dado2;  // Se obtiene la puntuación de ambos dados.
 */
class Dado {

   /**
    * Almacena el número de caras del dado.
    * @type {number}
    */
   #caras;
   /**
    * Valor de la última tirada.
    * @type {number}
    */
   valor;

   /**
    * Crea el dado.
    * @param {number} caras 
    */
   constructor(caras) {
      this.#caras = caras;
   }

   /**
    * Simula el lanzamiento de un dado, generando un número al azar.
    * 
    * @returns {Number} - El resultado aleatorio entre 1 y el número de caras.
    */
   tirar() {
      return this.valor = generarAleatorio(1, this.#caras);
   }

   /**
    * Vuelve el dado a su estado inicial antes de haberse tirado (valor está indefinido).
    */
   reset() {
      delete this.valor;
   }

   /**
    * Al tratarse como número, el dado devuelve su valor.
    * @returns {number} - El valor de la última tirada.
    */
   valueOf() {
      return this.valor;
   }

   /**
    * Número de caras del dado.
    * @type {number}
    */
   get caras() {
      return this.#caras;
   }
}


/**
 * Clase para almacenar las tiradas en una partida de dados.
 */
class Registro {
   /**
    * Almacena las tiradas del registro.
    * @type {Number[][]}
    */
   #log;
   /**
    * Función que define qué tiradas son ganadoras.
    */
   #fin;

   /**
    * Crea un registro de tiradas.
    * @param {Registro~finCallback} fin - Condición que determina el final del registro.
    */
   constructor(fin) {
      this.#log = [];
      this.#fin = fin;
   }

   /**
    * Comprueba si las tiradas son ganadoras.
    * @callback Registro~finCallback
    * @param {Number[][]} tiradas - Las tiradas de la partida.
    * @returns {boolean}
    */

   /**
    * Apunta la tirada en el registro.
    * 
    * @param {Number[]} apunte - Resultados de la tirada de dados. Si la tirada
    * consiste en tirar dos dados, el array tendrá un tamaño de 2; si tres
    * dados, 3; y así sucesivamente.
    * @returns {Number[]} - El propio apunte.
    */
   apuntar(apunte) {
      if(this.cerrado) return false;
      this.#log.push(apunte);
      return apunte;
   }

   /**
    * Vacía el registro por completo.
    */
   vaciar() {
      this.#log.length = 0;
   }

   /**
    * Devuelve el tamaño del registro.
    * @type {number}
    */
   get tamanho() {
      return this.#log.length;
   }

   /**
    * Indica si el registro está cerrado, porque se alcanzó la tirada ganadora.
    * 
    * @type {boolean}
    */
   get cerrado() {
      return this.#fin(this.#log);
   }

   /**
    * Indica si el registro no se ha usado aún.
    * 
    * @type {boolean}
    */
   get nuevo() {
      return this.#log.length === 0;
   }
}


/**
 * Modela una partida de dados.
 */
class Partida {
   /**
    * Dado para gestionar las tiradas de dados. Basta con uno solo, simplemente,
    * se usará todas las veces que sea necesario.
    * @type {Dado}
    */
   #dado;
   /**
    * Número de dados por tirada que necesita el juego.
    * @type {number}
    */
   #dados;
   /**
    * Registro que almacena los resultados de las tiradas.
    * @type {Registro}
    */
   #registro;

   /**
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
   constructor({dado, dados, caras, fin = () => false}) {
      // Con un dado basta para cubrir la partida.
      this.#dado = dado??new Dado(caras);
      this.#dados = dados;
      this.#registro = new Registro(fin);
   }

   /**
    * @typedef {Object} Partida~reglas
    *
    * @property {Dado} dado - Dado que se usa en la partida.
    * @property {number} dados - Número de dados para cada tirada.
    * @property {number} caras - Número de caras del dado (opcional a dado).
    * @property {Registro~finCallback} fin - Función que comprueba si la tirada es ganadora.
    */

   /**
    * Simula una tirada de dados.
    * @returns {Number[]} -  El resultado de la tirada de dados.
    */
   lanzar() {
      return this.#registro.apuntar(Array(this.#dados).fill(null).map(_ => this.#dado.tirar()));
   }

   /**
    * Cantidad de dados que necesita la tirada.
    * 
    * @type {number}
    */
   get dados() {
      return this.#dados;
   }

   /**
    * Si la partida ha acabado, porque se alcanzó la tirada ganadora.
    * 
    * @type {boolean}
    */
   get fin() {
      return this.#registro.cerrado;
   }

   /**
    * Indica si la partida no ha comenzado (aún no se han tirado dados)
    * 
    * @type {boolean}
    */
   get comienzo() {
      return this.#registro.nuevo;
   }

   /**
    * Reinicia la partida.
    */   
   reset() {
      this.#registro.vaciar();
   }

   /**
    * Devuelve el cantidad de rondas jugadas.
    * 
    * @type {number}
    */
   get ronda() {
      return this.#registro.tamanho;
   }
}

// Programa principal

const reglas = {
   dados: 2,
   caras: 6,
   // Se gana cuando en la tirada se saca lo mismo con todos los dados.
   fin: (tiradas) => tiradas?.at(-1)?.every((e, _, arr) => e === arr[0])
}

const partida = new Partida(reglas);
while(!partida.fin) {
   console.log(`${partida.ronda + 1}ª tirada: ${partida.lanzar().join("-")}.`);
}
console.log(`Se han tardado ${partida.ronda} tiradas en acabar el juego.`);
