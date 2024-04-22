/**
 * @file Obtener a partir de un número el resultante de invertir
 * todas sus cifras.
 * @author José Miguel Sánchez Alés <jsanale860@g.educaand.es>
 */

/**
 * Controla si se genera una entrada alteatoria o no.
 * @type {boolean}
 */
const aleatorio = true;

/**
 * Mayoría de edad
 * @type  {number}
 */
const MAYORIA = 18;

/**
 * Fecha más antigua para generar fechas aleatorias.
 * @type {number}
 */
const MIN = new Date(1925, 1, 1),
/**
 * Fecha más reciente para generar fechas aleatorias.
 * @type {number}
 */
      MAX = new Date();  // hoy.

/**
 * Fechas predeterminadas.
 * @type {number}
 */
const FECHAS = [
    new Date(1967, 12, 1),
    new Date(2000, 3, 8),
    new Date(2010, 10, 11)
];


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
 * Función generadora de fechas al azar entre dos fechas.
 * 
 * @param {Date} min - Fecha más antigua. Tiempo 0 de la época UNIX, si no se especifica.
 * @param {Date} max - Fecha más reciente. Hoy, si no se especifica.
 * 
 * @yields {Date} - La fecha al azar entre los dos límites suministrados.
 */
function* generarFecha(min = new Date(0), max = new Date()) {
    while(true) {
        yield new Date(generarAleatorio(min.getTime(), max.getTime()));
    }
}


/**
 * Calcula cuál es la edad en años.
 * 
 * @param {Date} nacimiento - Fecha de nacimiento.
 * @param {Date} ref - Fecha de referencia para calcular la edad. Si no se especifica, hoy.
 * 
 * @returns {number} - La edad en años; -1 si la fecha de referencia es posterior al nacimiento.
 */
function calcularEdad(nacimiento, ref = new Date()) {
    if(ref < nacimiento) return -1;

    let edad = ref.getFullYear() - nacimiento.getFullYear();

    // Pero si aún no ha sido su cumpleaños, tiene uno menos.
    edad -= (nacimiento.getMonth() > ref.getMonth() || nacimiento.getMonth() === ref.getMonth() &&  nacimiento.getDate() > ref.getDate());

    return edad;
}

/**
 * Determina si una persona es mayor de edad.
 * 
 * @param {number|Date} nacimiento - Fecha de nacimiento o edad en años de la persona.
 * 
 * @returns {boolean} - Si es o no mayor de edad.
 */
function esMayorDeEdad(nacimiento) {
    const edad = (nacimiento instanceof Date)?calcularEdad(nacimiento):nacimiento;

    return edad >= MAYORIA;
}


// Programa principal.

const generador = generarFecha(MIN, MAX),
      fechas = aleatorio?FECHAS.map(e => generador.next().value):FECHAS;

for(const nacimiento of fechas) {
    let edad = calcularEdad(nacimiento),
        yymmdd = nacimiento.toJSON().slice(0, 10);

    console.log(`La persona nacida en ${yymmdd} tiene ${edad} años y es ${esMayorDeEdad(edad)?"mayor":"menor"} de edad.`);
}