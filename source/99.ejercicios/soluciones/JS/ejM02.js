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
 * Lanza n dados hasta que todas las puntuaciones de un misma tirada sean iguales.
 * 
 * @param {number} n - Número de dados en la tirada
 * 
 * @yields {Array} - La puntuación de cada dado.
 */
function* generarTirada(n) {
    let tirada;

    if(!Number.isInteger(n) || n < 1) {
        throw "Debe tirarse al menos un dado";
    }

    // Las tiradas continúan mientras todas
    // las puntuaciones de una misma tirada no sean iguales.
    do {
        // Una tirada son "n" puntuaciones de dados
        tirada = Array(n).fill(null).map(e => generarAleatorio(1, numCaras));
        yield tirada;
    } while(tirada.some((e, _, arr) => e !== arr[0]));
}

// Programa principal

const partida = generarTirada(numDados);
let dados, intentos = 0;

for(dados of partida) {
    intentos++;
    console.log(`Resultado de la ${intentos}ª tirada: ${dados}.`);
}

console.log(`Se han tardado ${intentos} tandas en sacar todo ${dados[0]} simultáneamente.`);
