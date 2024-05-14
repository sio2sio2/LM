Javascript y |DOM|
==================

#. Tome :download:`este primer documento HTML <files/ejJH01.html>` y mediante
   Javascript añada:

   a. Un elemento ``H1`` cuyo contenido sea exactamente el mismo que el
      del título de la página.
   #. Una lista con los N primeros números primeros.
   #. Un pie al documento anterior que incluya la fecha en la que se carga
      la página.

#. Con el siguiente código Javascript:

   .. code-block:: javascript

      const url = "Esto.es.una.direccion.URL";

      fetch(URL)
         .then(response => {
            if(response.ok) return response.json()  // La respuesta es un objeto JSON.
            else throw new Error(response.status);
         })
         .then(data => {
            // data contiene el objeto con los datos obtenidos de la URL.
         })
         .catch(err => {
            console.error(`ERROR: ${err.message}`);
         });

   Podemos hacer una petición |AJAX| para obtener datos |JSON| facilitados en
   una dirección web. Sabiendo esto, cree una página web que muestre en una
   tabla los distintos tipos de carburante para automoción vendidos en España.

   .. note:: Échele un ojo a los ejemplos que introducen la unidad sobre :ref:`lm-ut5`
      para saber la |URL|.

#. En el :download:`siguiente documento HTML <files/mostrar.html>` manipule el
   comportamiento del botón para que muestre u oculte el resto del texto (el
   incluido dentro de ``span``).

   .. rst-class:: sol-oculta

      :download:`Solución propuesta <soluciones/JS/DOM03-conmutar.js>`.

#. Vuelva a resolver los ejercicios 3 y 6 de la :ref:`relación básica
   <ej-js-basicos>`, pero mediante una interfaz |HTML| para tomar datos y
   mostrar resultados.

#. Tome el formulario creado para el :ref:`ejercicio de HTML sobre formularios
   <ej-html-form>` y añada Javascript para:

   a. Habilitar el cuadro de texto al marcar la opción de "otras aficiones".
   #. Impedir que se envíe el formulario con contraseñas contradictorias. Para
      este apartado han de resolverse tres alternativas diferentes.

      i. Al intentar enviarse el formulario, se formula la queja y no se envía.
      #. La comprobación se hace mientras se teclea la segunda contraseña.
         Puede, por ejemplo, mostrar el fondo del input de la segunda contraseña
         en rojo y sólo pasar a verde cuando ambas contraseñas coincidan.
         Además, el formulario no podrá enviarse si no hay coincidencia.
      #. Ponga sólo un campo para la contraseña y un icono que permita ver y
         ocultar a voluntad el texto.
   
.. |AJAX| replace:: :abbr:`AJAX (Asynchronous JavaScript and XML)`
.. |DOM| replace:: :abbr:`DOM (Document Object Model)`
