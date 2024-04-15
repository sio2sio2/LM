Javascript: Sintaxis
====================

Mínimos
-------
Realice los siguientes ejercicios en Javascript, atendiendo a los siguientes
principios:

   .. rst-class:: simple

   a. Son *scripts* que no están asociados a ningún documento HTML.
   #. Los datos iniciales se almacenan en variables sin pedirlos al usuario,
      ya que es un poco engorroso implementar la entrada de datos por teclado en
      este lenguaje.
   #. Aunque el enunciado no lo explicite, haga que el programa informe de
      la entrada y la salida.
   #. Resueltos los ejercicios, vuelva a resolverlos permitiendo que los datos
      de entrada, en vez de estar fijados en el código, se generen
      automáticamente entre dos valores que resulten lógicos. No haga un código
      aparte: mejore el código ya escrito para que se utilicen números
      prefijados o números aleatorios dependiendo del valor de una variable
      inicial.

      .. note:: Si es capaz de resolver de primeras los ejercicios de esta
         forma, no es necesario que escriba la versión simple.

   #. Los ejercicios pueden resolverse solamente con datos simples y sentencias
      condicionales. Una vez completada la relación, dele una vuelta a los
      ejercicios introduciendo conceptos más avanzados (arrays, objetos,
      funciones), en aquellos en que sea pertinente para mejorar su
      estructuración y simplificar su resolución.

1. A partir de dos números que simbolizan los lados de un rectángulo, calcule
   su área y su perímetro.

#. A partir de dos números que simbolizan los catetos de un triángulo rectángulo,
   calcule la hipotenusa (`teorema de Pitágoras
   <https://es.wikipedia.org/wiki/Teorema_de_Pit%C3%A1go>`_).

#. Pase una cantidad expresada en segundos a horas, minutos y segundos.

#. Dada la edad en años de una persona, haga un programa que determine si es o
   no mayor de edad.

#. A partir de un monedero en el que se tienen monedas de 1 euro y billetes de
   5, 10, 20 y 50 euros, calcule el dinero total a partir de la cantidad de
   monedas de cada tipo que almacena.

#. Dada una cantidad en euros, fracciónela en billetes de 5, 10, 20 y
   50, y monedas de 1, sabiendo que se pretende minimizar su número. En
   conclusión, que este ejercicio es el inverso al anterior.

#. A partir de dos números calcule o la suma o la resta o la
   multiplicación o la división. La operación se debe escoger al azar.

#. Determinar si un año es bisiesto. Son bisiestos los años múltiples de 4,
   excepto los de comienzo de siglo que no son múltiplos de 400: 1994 es
   bisiesto, 1900 no lo es, pero 2000, sí.

#. Dada una nota numérica entre 0 y 10, devuelva la nota descriptiva, sabiendo
   las equivalencias:

   ========== ========== ==================
    Inferior   Superior   Nota descriptiva
   ========== ========== ==================
       0          <3      Muy deficiente
       3          <5      Insuficiente
       5          <6      Suficiente
       6          <7      Bien
       7          <9      Notable
       9          10      Sobresaliente
   ========== ========== ==================

#. Dados dos puntos del plano a modo de centros y sendos radios, que definen dos
   circunferencias, determinar si ambas circunferencias son:

   + Exteriores
   + Tangentes exteriores.
   + Secantes.
   + Tangentes interiores.
   + Una interior a la otra.
   + Concéntricas.

Medios
------
1. `Math.random()
   <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random>`_
   es un método que devuelve un número aleatorio entre 0 y 10. Escriba una
   función que devuelva un número entero aleatorio entre un mínimo y un máximo.

#. Simular tandas de dos tiradas de dados y parar en la tanda en que el resultado
   de ambas tiradas coincida. En ese momento, indicar cuántas tandas han sido
   necesarias y cuál fue el resultado (1-1, 2-2, etc.).

#. A partir de un número, obtenga otro número que sea la inversión de sus
   cifras. Por ejemplo, si el número inicial es 321, deberá resultar 123.

#. Cree una función llamada ``indexOf_N`` que busque en un array la aparición
   n-ésima de un determinado valor. Por ejemplo, para el array :code:`[ "a",
   "b", "a", "c", "d", "a", "e"]`, si se busca la tercera aparición de "a" debe
   devolver 5. El primer argumento de la función  debe ser el array, el segundo
   el valor a buscar y el tercero el número de aparición.

#. Escriba un función que determine si un número es capicúa.

#. Una cooperativa de viticultores paga el precio de la uva dependiendo del tipo de uva
   (tempranillo, palomino, etc) y de su calibre (1, 2 ó 3). Escriba un
   algoritmo para determinar el pago que debe recibir un agricultor dependiendo
   de cuáles sean las uvas que entregue. Discuta:

   * El formato o método para pasar al algoritmo los precios unitarios de la
     uva según tipo y tamaño.
   * El formato o método para pasar al programa las cantidades recolectadas
     por un agricultor.

   En base a lo anterior, escriba el código para hacer el cálculo.

#. Estudie las fechas en Javascript (`Date
   <https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Date>`_)
   y, dada la fecha de nacimiento de una persona, haga un programa que determine
   si es o no mayor de edad.

#. Dada una lista de números, devuelva otra que excluya los números mayores al último.

#. Tome diez números naturales entre 1 y 40 al azar y calcule la suma y el
   producto de todos ellos.

#. Dado un número natural N, construya una pirámide de N niveles. Por ejemplo, para 4:

   .. code-block:: none

         x
        xxx
       xxxxx
      xxxxxxx


   .. rst-class:: sol-oculta

   .. code-block:: javascript

      "use strict";

      const n = 6; // Altura de la pirámide

      console.log(`Pirámide de altura ${n}:`)
      for(let i = 0; i < 6; i++) {
         let linea = " ".repeat(n-i-1) + "x".repeat(2*i + 1);
         console.log(linea);
      }
