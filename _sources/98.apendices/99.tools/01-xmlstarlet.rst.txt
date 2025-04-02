.. _xmlstarlet:

XMLStarlet
**********
Es un programa para la |CLI| de *Linux* que nos permite hacer validaciones,
extracción de datos con :ref:`XPath` 1.0 y transformaciones con :ref:`XSLT`.

.. _xmlstarlet-val:

Bien formado
============
Para comprobar si un |XML| está bien formado basta con hacer:

.. code-block:: console

   $ xmlstarlet val -e claustro.xml

La opción ``-e`` provoca que se muestren los errores, en caso de que los
hubiera. De lo contrario sólo informa de si es *válido*. Obsérvese que el
mensaje no es preciso: debería indicar, simplemente, que es *bien formado*, ya
sólo comprueba si el |XML| se ajusta a las reglas generales del |XML|.

Validación
==========
Para realmente *validar* un documento, y no simplemente comprobar que está bien
formado, el programa nos da la posibilidad de usar |DTD|, |XSD| o |RNG|.

.. _xmlstartlet-dtd:

|DTD|
-----
Es necesario añadir la opción ``-d``:

.. code-block:: console

   $ xmlstarlet val -e -d claustro.dtd claustro.xml

Pero si el |DTD| está declarado en el |XML| (en la declaración de tipo de
documento), puede simplificarse a:

.. code-block:: console

   $ xmlstarlet val -e -E claustro.xml

.. _xmlstarlet-xsd:

|XSD|
-----
Para validar un |XML| haciendo uso de un |XSD|, puede usarse la opción ``-sp``:

.. code-block:: console

   $ xmlstarlet val -s archivo.xsd archivo.xml

Como en casos anteriores, si se quiere ver cuáles son los errores, hay que
incluir la opción ``-e``:

.. code-block:: console

   $ xmlstarlet val -s archivo.xsd -e archivo.xml

.. _xmlstarlet-rng:
.. _xmlstarlet-rnc:

|RNG|/|RNC|
-----------
:program:`xmlstarlet` no es capaz de validar directamente usando |RNC|, pero
tenemos la opción de usar un conversor como `trang
<http://www.thaiopensource.com/relaxng/trang.html>`_, del que hay en *Debian* un
paquete con ese mismo nombre, para transformar el |RNC| en un |RNG|:

.. code-block:: console

   $ trang casilleros.rnc casilleros.rng
   $ xmlstarlet val -e -r casilleros.rng casilleros.xml  # -e muestra errores si los hay

.. note:: :command:`trang` traduce a |DTD| (o |XSD|), por lo que también podemos
   obtener el |DTD| (o |XSD|) equivalente a nuestro |RNC|:

   .. code-block:: console

      $ trang casilleros.rnc casilleros.dtd

   Puede ser útil esta traduccion para ver cómo se ve la gramática definida en
   |DTD|, pero es absolutamente desconsejable hacer esta traducción con el
   propósito de validar después, ya que |DTD| es menos expresivo y, en
   consecuencia, es muy probable que se pierda expresividad.

.. note:: :command:`trang` permite también otra cosa: obtener la gramática a
   partir del documento |XML|:

   .. code-block:: console

      $ trang casilleros.xml casilleros.rnc  # O casilleros.dtd para obtener el DTD

   Esto, sin embargo, crea siempre gramáticas deficientes, ya que rara vez la
   herramienta es capaz de adivinar nuestra intención de hacer que un atributo
   fuera un identificador o que un contenido responda a una enumeración. Su
   utlidad se reduce, por lo general, a brindarnos un esqueleto sobre el que
   perfilar la gramática.

.. _xmlstarlet-xpath:

XPath
=====
Con este programa podemos usar *XPath* tanto para seleccionar datos como para
introducir modificaciones al |XML| original. Para lo segundo es mejor
:ref:`XQuery` o :ref:`XSLT`, pero por completar la información sobre la orden
incluiremos las posibilidades que brinda.

Selección
---------
Para lograrlo es necesario usar el comando ``sel``, seguido de la opción ``-t``, y
la acción que se quiere realizar a continuación, que puede ser:

:code:`-v <expresión-xpath>`
   Muestra el valor de lo seleccionado mediante la expresión. Se debe usar esta
   opción cuando el resultado de la expresión es un valor escalar: un único
   atributo, un nodo que contiene texto o la evaluación de una función o una
   operación. Por ejemplo::

      $ xmlstarlet sel -t -v '//profesor[1]/@id' -n casilleros.xml
      p1

   .. note:: Se ha añadido la opción ``-n`` para añadir un cambio de línea al
      final del resultado.

:code:`-c <expresion-path>`
   Copia el nodo seleccionado, por tanto deberá usarse cuando el resultado de
   nuestra selección es un nodo elemento o un conjunto de nodos elemento. Por
   ejemplo, lo siguiente devuelve todos los nodos *apelativo*::

      $ xmlstarlet sel -t -c '//profesor/apelativo' -n casilleros.xml
      <apelativo>Pepe</apelativo><apelativo>Paco</apelativo><apelativo>Mari</apelativo>

:code:`-m <expresión-path>`
   Selecciona un nodo o un conjunto de nodos para seguir trabajando sobre
   ellos. Por tanto, requerirá que luego se use ``-v`` o ``-c``. Por ejemplo::

      $ xmlstarlet sel -t -m '//profesor/apelativo' -v '.' casilleros.xml
      PepePacoMari

   En este caso, habría sido fundamental usar ``-n``::

      $ xmlstarlet sel -t -m '//profesor/apelativo' -v '.' -n casilleros.xml
      Pepe
      Paco
      Mari

.. note:: :command:`xmlstarlet` es capaz de devolvernos el código |XSLT|
   equivalente a nuestra selección añadiendo tras ``sel`` la opción ``-C``.

Edición
-------
En este caso, debe usarse ``ed``, una acción y el uso de expresiones *XPath*:

:code:`-d <expresion-xpath>`
   Borra los nodos que selecciona la expresión::

      $ xmlstarlet ed -d '//profesor[last()]' casilleros.xml

   Esta expresión elimina el último de los profesores.
   
:code:`-u <expresion-xpath> -v valor`
   Actualiza el valor del nodo o nodos seleccionados::

      $ xmlstarlet ed -u '//profesor[1]/apelativo' -v "Manolo" casilleros.xml

:code:`-i <expresión-xpath> -t (elem|text|attr) -n <nombre> -v <valor>`
   Permite insertar antes del nodo seleccionado (o los nodos) un nodo de tipo
   elemento, texto o atributo del nombre y valor referidos. Se deben hacer
   varias puntualizaciones:

   * Los nodos de texto no tienen nombre, así que da igual el nombre que se les
     dé.

   * El valor sólo puede ser texto, así que, directamente, sólo se pueden crear
     nodos elemento que contienen texto.

   * Si se quiere crear nodos elemento que tienen atributos o contienen otros
     nodos elemento, entonces hay que componer varias acciones.

   Por ejemplo, esto añadiría un nuevo apelativo al primer profesor::

    $ xmlstarlet ed -i '//profesor[1]/nombre' -t elem -n "apelativo" -v "Pancho" casilleros.xml

:code:`-a <expresión-xpath> -t (elem|text|attr) -n nombre -v valor`
   Como  ``-i`` pero añade el nodo después, no antes. Por ejemplo::

    $ xmlstarlet ed -a '//profesor[1]/apelativo[last()]' -t elem -n "apelativo" -v "Pancho" casilleros.xml

:code:`-s <expresión-xpath> -t (elemen|text|attr) -n nombre -v valor`
   Añade el nuevo elemento como último elemento del elemento seleccionado::

    $ xmlstarlet ed -s '//profesor[2]/nombre' -t text -n foo -v " María" casilleros.xml

.. _xmlstarlet-xslt:

|XSLT|
======
:program:`XMLStarlet` usa las librerías libxml2_ y libxslt_, de modo que sólo
tiene soporte para |XSLT| 1.0 y bastantes extensiones. La manera más sencilla de
usarlo es utilizar el argumento ``tr`` seguido de la hoja |XSLT| y el |XML|
original:

.. code-block:: console

   $ xmlstarlet tr disco.txt.xsl disco.xml

Ahora bien, si el |XML| declara algún hoja |XSLT| para su transformación con la
instrucción de procesamiento :code:`<?xml-steelsheet ... ?>` (véanse los ejemplos
ya expuestos), entonces puede omitirse el fichero xsl incluyendo el parámetro -E:

.. code-block:: console

   $ xmlstarlet tr -E disco.xml

En el ejemplo, la hoja de transformación debería llamarse
:file:`discos.txt.xsl`, de modo que esta última orden es equivalente a la
anterior. En algunas hojas de transformación se requiere pasar parámetros. Para
ello existen las opciones ``-p`` y ``-s``. Ambas sirven para lo mismo con la
diferencia de que -s está pensada para pasar parámetros que sean cadenas. Por
ejemplo:

.. code-block:: console

   $ xmlstarlet tr libros.xsl -p "año=1994" -s "bibliotecario=Juan Palomo" \
                              -p "nombre='Biblioteca Municipal'" libros.xml

Obsérvese la diferencia: se han escrito todas las parejas *nombre-valor* entre
comillas dobles para que bash no haga travesuras. La primera pareja es un número
y las dos restantes son cadenas. Como con la segunda se usó ``-s``, bastó con
escribir tal cual la cadena. En la tercera, sin embargo, se escribió ``-p``, así
que hubo explícitamente que informar al procesador de que era una cadena
escribiendo el valor entre comillas.


.. |CLI| replace:: :abbr:`CLI (Command Line Interface)`
.. |DTD| replace:: :abbr:`DTD (Document Type Definition)`
.. |XSLT| replace:: :abbr:`XSLT (eXtensible Stylesheet Language Transformations)`
.. |RNG| replace:: :abbr:`RNG (Relax-NG)`
.. |RNC| replace:: :abbr:`RNC (Relax-NG Compact)`
.. |XSD| replace:: :abbr:`XSD (XML Schema Definition)`

.. _libxslt: http://xmlsoft.org/libxslt/
.. _libxml2: http://xmlsoft.org/libxml2/
