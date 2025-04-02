/**
 * @file Realiza tiradas de dos dados hasta que en una misma tirada
 * los dos dados sacan la misma puntuación.
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
 * Lanza los dados hasta llegar a la tirada ganadora.
 * 
 * @param {reglas} reglas - Reglas de la partida.
 * 
 * @yields {number[]} - La puntuación de cada dado.
 */
function* generarPartida({dados, caras, fin = _ => false}) {
    let tirada, log = [];

    if(!Number.isInteger(dados) || dados < 1) {
        throw "Debe tirarse al menos un dado";
    }

    // Las tiradas continúan mientras no se cumpla
    // la condición definida por "fin".
    do {
        // Una tirada son "n" puntuaciones de dados
        tirada = Array(dados).fill(null).map(e => generarAleatorio(1, caras));
        log.push(tirada);
        yield tirada;
    } while(!fin(log));
}

/**
 * @typedef {Object} reglas
 * 
 * @property {number} dados - Cantidad de dados lanzados por tirada.
 * @property {number} caras - Número de caras de cada dado.
 * @property {finCallback} fin - Función que comprueba si la tirada es ganadora.
 */

/**
 * @callback finCallback
 * 
 * @param {number[][]} tiradas - Resultados de todas las tiradas.
 * 
 * @returns {boolean} - true, si la tirada es ganadora.
 */

// Programa principal

const reglas = {
    dados: numDados,
    caras: numCaras,
    // La partida acaba cuando todos los dados de la última tirada son iguales.
    fin: (tiradas) => tiradas?.at(-1)?.every((e, _, arr) => e === arr[0])
}

const partida = generarPartida(reglas);
let tirada, intentos = 0;

for(tirada of partida) {
    intentos++;
    console.log(`Resultado de la ${intentos}ª tirada: ${tirada.join("-")}.`);
}

console.log(`Se han tardado ${intentos} tiradas en sacar ${tirada.join("-")}.`);
