/**
 * @file Obtener los beneficios de una venta de uvas.
 * @author José Miguel Sánchez Alés <jsanale860@g.educaand.es>
 */

/**
 * Calibres existentes.
 * @type {Array}
 */
const CALIBRES = ["1", "2", "3"],
/**
 * Tipos de uva.
 * @type {Array}
 */
      VARIEDADES = ["tempranillo", "palomino", "moscatel"];

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
 * @return {Object} - Los precios y cantidades de cada uva.
 */
function obtenerEntrada() {
    const precioRef = .75,
          rangoCorrUva = [.5, 2],        // Factor corrector del precio según la variedad.
          rangoCorrCalibre = [1.2, 1.8], // Multiplicador del precio del calibre.
          noHayUva = .3,                 // Probabilidad de que no haya uva de un calibre determinado.
          rangoCantidad = [0, 30];       // Entre 0 y 30 Kg de cada calibre de uva.

    return VARIEDADES.map(variedad => {
        const uva = {nombre: variedad, calibres: []};
        let precio = (precioRef*generarAleatorio(...rangoCorrUva)).toFixed(2);
        
        for(const calibre of CALIBRES) {
            if(Math.random() < noHayUva) continue;

            uva.calibres.push({
                nombre: calibre,
                precio,
                cantidad: generarAleatorio(...rangoCantidad).toFixed(3)
            })

            precio = (precio*generarAleatorio(...rangoCorrCalibre)).toFixed(2);
        }

        return uva;
    });
}

// Falta terminarlo.

console.log(obtenerEntrada().map(e => e.calibres));