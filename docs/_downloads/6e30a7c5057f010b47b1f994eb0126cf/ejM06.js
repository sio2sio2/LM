/**
 * @file Obtener los beneficios de una venta de uvas.
 * @author José Miguel Sánchez Alés <jsanale860@g.educaand.es>
 */

/**
 * Calibres existentes.
 * @type {String[]}
 */
const CALIBRES = ["1", "2", "3"],
/**
 * Tipos de uva.
 * @type {String[]}
 */
      VARIEDADES = ["tempranillo", "palomino", "moscatel"];

/**
 * Precisión de la moneda.
 * @type {number}
 */
const precision = 2;

/**
 * Genera un número aleatorio entre un límite inferior
 * y un límite superior
 *
 * @param {number} min - El límite inferior.
 * @param {number} max - El límite superior.
 * 
 * @returns {number} - El número aleatorio.
 */
function generarAleatorio(min, max) {
    return Math.random()*(max - min) + min;
}

/**
 * Genera los precios y las cantidades de uva de forma aleatoria.
 * En un programa serio posiblemente debería leerse la entrada desde
 * un documento JSON.
 * 
 * La entrada tendrá el siguiente formato:
 * 
 * [
 *    {
 *       variedad: "tempranillo",
 *       calibres: [
 *          {
 *             nombre: "1",
 *             precio: 1.24,
 *             cantidad: 100
 *          },
 *          {
 *              nombre: "3",
 *              precio: 1.89,
 *              cantidad: 67
 *          }
 *       ]
 *    },
 *    {
 *       variedad: "palomino",
 *       calibres: [
 *         ... como arriba ...
 *       ]
 *    }
 * ]
 * 
 * @return {Object[]} - Los precios y cantidades de cada uva.
 */
function obtenerEntrada() {
    const precioRef = .75,
          rangoCorrUva = [.5, 2],         // Factor corrector del precio según la variedad.
          rangoCorrCalibre = [1.2, 1.8],  // Multiplicador del precio del calibre.
          noHayUva = .3,                  // Probabilidad de que no haya uva de un calibre determinado.
          rangoCantidad = [50, 500],      // Entre 50 y 500 Kg de cada calibre de uva.
          precisionCantidad = 3;

    return VARIEDADES.map(variedad => {
        const uva = {nombre: variedad, calibres: []};
        let precio = (precioRef*generarAleatorio(...rangoCorrUva)).toFixed(precision);
        
        for(const calibre of CALIBRES) {
            if(Math.random() < noHayUva) continue;

            uva.calibres.push({
                nombre: calibre,
                precio,
                cantidad: generarAleatorio(...rangoCantidad).toFixed(precisionCantidad)
            })

            precio = (precio*generarAleatorio(...rangoCorrCalibre)).toFixed(2);
        }

        return uva;
    });
}


/**
 * Calcula el precio que hay que pagar a una determinada cosecha de uvas.
 * 
 * @param {Object[]} cosecha - Cantidas y precios de cada variedad y calibre.
 * 
 * @returns {number} - El dinero que debe pagarse a la cosecha.
 */
function calcularPago(cosecha) {
    return cosecha.reduce((ac, variedad) => ac + variedad.calibres.reduce((acc, e) => acc + e.precio*e.cantidad, 0), 0)
        .toFixed(precision);
}

const uvaCosechada = obtenerEntrada();

console.log(uvaCosechada.map(e => e.calibres));
console.log(calcularPago(uvaCosechada));