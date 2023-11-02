.. _lm-ut4:

***********************
Transformación de datos
***********************
Habitualmente de los datos almacenados en documentos sólo requerimos obtener una
parte de ellos u obtenerlos todos, pero en un formato distinto. En esta unidad
trataremos los lenguajes que permiten la conversión entre distintos documentos de
datos, en particular entre distintos documentos |XML|, para lo cual requeriremos
las técnicas de :ref:`lm-ut3` aprendidas en la unidad anterior.

.. note:: Complementaria a esta tarea, se encuentra la de la extracción de datos
   almacenados en bases de datos, que requiere consultar (:ref:`lm-ut3`) y
   generar una salida (:ref:`lm-ut4`). Esto, sin embargo, se reserva para
   :ref:`la unidad siguiente dedicada al almacenamiento <lm-ut5>`.

Centraremos el estudio en el |XML|, para lo cual existen dos grandes lenguajes:

* *XQuery*, que permite conversiones sencillas y al que dedicaremos el resto
  de la unidad.
* |XSLT|, que permite conversiones mucho más complejas y que, por ello, requiere
  un estudio más detallado y extenso.

.. _xquery:

XQuery
******
:dfn:`XQuery` es un lenguaje de consulta que permite obtener una salida |XML|
(aunque no necesariamente) a partir de una fuente que también es |XML|. Para
ello, usa :ref:`xpath` como herramienta para seleccionar la información y una
estructura prototípica llamada |FLWOR| por las cinco sentencias con las que se
construye originariamente\ [#]_. Cumple en el mundo |XML| exactamente la misma
función que las sentencias ``SELECT`` en el mundo |SQL|.

Tres son las versiones que ha tenido este lenguaje:

`Versión 1 <https://www.w3.org/TR/2007/REC-xquery-20070123/>`_
   Desarrollada desde los comienzos de *XPath* en 1999, se publicó
   definitivamente en 2007, con lo que hace uso de *XPath* 2.0.

`Versión 3 <https://www.w3.org/TR/xquery-30/>`_
   Publicada en 2014, con lo que incorpora *XPath* 3.0, añade como novedad
   fundamental convertir a las funciones en ciudadanas de primera clase.

`Versión 3.1 <https://www.w3.org/TR/xquery-31/>`_
   Es el última estándar aparecido en 2017, con lo que incorpora *XPath* 3.1.

.. note:: No existe versión **2**. La relación entre *XQuery* y *XPath* es tan
   íntima que se prefirió alinear las versiones de *XQuery* con las de *XPath*.

Una característica importante de *XQuery* es que, a diferencia de |XSLT|, no
tiene sintaxis |XML|, aunque existe una versión normativa (`XQueryX
<https://www.w3.org/TR/xqueryx-31/>`_) que la implementa.

.. XQuery:
   https://www.ticarte.com/contenido/ejercicios-practicos-de-xquery
   https://www.altova.com/training/xquery3
   https://en.wikibooks.org/wiki/XQuery
   http://www.datypic.com/services/xquery/whatsnew3.html

.. caution:: Téngase presente que *XQuery* comparte el modelo de datos de
   *XPath* y, por tanto, todo lo indicado respecto a los tipos en las
   expresiones es también aplicable. Por ejemplo, si no se ha validado el
   documento, los datos serán ``xs:untypedAtomic``, que se comportan más o menos
   como cadenas, nunca como números.

Procesadores
============
Tenemos varias alternativas para ejecutar consultas *XQuery*:

* El programa xidel_, que ya usamos para probar *XPath*. Como es capaz de
  dilucidar si la expresión proporcionada es *XQuery* o *XPath*, podemos seguir
  usándolo igual.

* `Visual Studio Code`_ con la extensión `XML Tools
  <https://marketplace.visualstudio.com/items?itemName=DotJoshJohnson.xml>`_,
  que requiere alguna configuración:

  .. rst-class:: simple

  #. Instalar :ref:`BaseX <basex>`, que a su vez necesita la máquina virtual
     de Java_.  En las distribuciones basadas en *Debian* hay paquete
     disponible con lo que echarlo a andar es trivial.

  #. Configurar la extensión para que use *BaseX* como procesador. Para ello,
     necesitamos editar la configuración y añadir:

     .. code-block:: json

        {
           "xmlTools.xqueryExecutionEngine": "/usr/bin/basex",
           "xmlTools.xqueryExecutionArguments": [
              "-i", "$(input)",
              "-o", "$(input).output.xml",
              "$(script)"
            ]
        }

     .. caution:: En *Windows* la ruta será algo parecido a
        :file:`c:\\\\\\Program Files
        (x86)\\\\\\BaseX\\\\\\bin\\\\\\\\basex.bat`.  Obsérvese que habrá que
        escapar las contrabarras.

  Una vez bien configurada, el modo de ejecutar la consulta es el siguiente:

  a. Escribimos el archivo :file:`.xq` con el código de *XQuery* y con el
     archivo abierto y seleccionado en el editor...
  #. Ejecutamos `XML Tools: Execute Query`.
  #. Si hay varios |XML| en el directorio se nos preguntará sobre cual
     queremos hacer la consulta, y, si hemos incluido, la opción :kbd:`-o` en
     la configuración (tal como se ha sugerido antes), se nos pedirá confirmar
     el archivo de salida. Si no la incluimos, la salida se volcará
     directamente en una subventana.
  #. Abrimos el archivo de salida para consultar el resultado.

|FLWOR| básico
==============
La estructura |FLWOR| es una estructura iterativa (esto es, un bucle), que en
*XQuery* (ya veremos que la versión 3 añade otras) está constituida por la
sucesión de cinco sentencias:

.. code-block:: none

   (FOR | LET)+ - WHERE? - ORDER BY? - RETURN

donde `FOR` es una sentencia iterativa que asigna a una variable los ítems de
una secuencia, `LET` permite definir variables asignándoles valor, `WHERE`
define una condición para que la iteración del bucle se lleve a cabo, `ORDER BY`
permite ordenadar los resultados, y `RETURN` incluye la expresión que resultará
de cada iteración. Hemos expresado también la cardinalidad, de la que se deduce
que debe haber siempre al menos una sentencia `FOR` o `LET` y una `RETURN`.

Como las expresiones se construyen para transformar documentos |XML| se hará
referencia a los nodos de un documento, pero nuestros primeros ejemplos los
haremos utilizando expresiones *XPath* ajenas a cualquier nodo:

.. code-block:: xquery

   for $animal in ("perro", "gato")
   return
      "Mi mascota es un " || $animal || "."

Este código devolverá como resultado

.. code-block:: none

   Mi mascota es un perro.
   Mi mascota es un gato.

Obsérvese que para construir la secuencia hemos usado una expresión *XPath* y
para expresar cuál debe ser el resultado otra. Añadamos algunos elementos más a
la construcción:

.. code-block:: xquery

   for $animal in ("perro", "gato")
   let $como := "bonito"
   return
      "Mi mascota es un " || $animal || " " || $como || "."

Este código devuelve:

.. code-block:: none

   Mi mascota es un perro bonito.
   Mi mascota es un gato bonito.

También podemos probar a ordenar los resultados:

.. code-block:: xquery

   for $animal in ("perro", "gato")
   let $como := "bonito"
   order by $animal
   return
      "Mi mascota es un " || $animal || " " || $como || "."

lo cual ordenará los resultados según la expresión *XPath* :code:`$animal`, o
sea, el valor de esa variable para cada iteración. Como los valores son cadenas
y las cadenas tienen ordenación, es posible hacerlo. Podríamos haber utilizado
cualquier otra expresión que devolviera valores ordenados según los criterios e
*XPath* como, por ejemplo, :code:`fn:string-length($animal)`.

Por último, podemos añadir también una condición que será una expresión *XPath*
que devuelva un resultado lógico:

.. code-block:: xquery

   for $animal in ("perro", "gato")
   let $como := "bonito"
   where $animal != "perro"
   order by $animal
   return
      "Mi mascota es un " || $animal || " " || $como || "."

En esta ocasión evitaremos tener como mascota un "*perro bonito*".

.. caution:: Es importante tener claro que esta sentencia iterativa, aunque
   formalmente parecida a la de la programación estructurada, no actúa del mismo
   modo. Las iteraciones, aunque respeten el orden al mostrar los resultados, no
   tienen por qué evaluarse sucesivamente y en orden, sino que lo harán de un
   modo imprecedible e incluso en paralelo. Por ello, no pueden redefinirse
   variables cuyo valor cambie en el cuerpo de cada iteración (p.e. definir
   nosotros un contador al que sumenos **1** cada vez que se ejecuta el bucle).

Analicemos más pormenorizadamente cada parte:

**FOR**
   La sentencia permite añadir un contador usando la palabra ``at``. Por
   ejemplo, el código

   .. code-block:: xquery

      for $animal at $i in ("perro", "gato")
      return
         $i || ". Mi mascota es un " || $animal || "."
      
   mostrará:

   .. code-block:: none

      1. Mi mascota es un perro.
      2. Mi mascota es un gato.

   .. note:: El contador hace referencia al orden del animal en la secuencia, no
      al orden de las iteraciones. Por ello, el resultado que muestra el *gato*
      siempre estará asociado al **2**, incluso aunque usando ``order by`` se
      llegue a mostrar antes.

   Como deja vislumbrar la cardinalidad antes mostrada, puede haber varios
   ``for`` en la misma estructura:

   .. code-block:: xquery

      for $animal in ("perro", "gato")
      for $dueño in ("Marta", "Francisco")
      return
         $dueño || " tiene un " || $animal || "."

   El código devuelve:

   .. code-block:: none

      Marta tiene un perro.
      Francisco tiene un perro.
      Marta tiene un gato.
      Francisco tiene un gato.

   Lo anterior también puede ser escrito con un único ``for``:

   .. code-block:: xquery

      for $animal in ("perro", "gato"),
          $dueño in ("Marta", "Francisco")
      return
         $dueño || " tiene un " || $animal || "."

**LET**
   La sintaxis es la misma que para ``for``: podemos usar varias sentencias con
   una definición o poner varias definiciones en una sentencia separándolas con
   coma.

**WHERE**
   No tiene especiales dificultades, salvo tener claro que se evalúa usando el
   :ref:`valor efectivo booleano <xpath2-valor-efect-bool>` de la expresión.

**ORDER BY**
   La expresión *XPath* que se evalúa debe devolver un valor para el que haya
   definida un orden (un número o una cadena, por ejemplo). Los resultados  se
   ordenarán de menor a mayor. Sin embargo, podemos añadir las palabras reservadas
   ``ascending`` (que no tendrá efecto) o ``descending``  que invertirá la
   ordenación para que se haga de mayor a menor.

**RETURN**

Construcción de salida |XML|
============================

Sentencias adicionales
======================

|XSLT|
******
Un estudio consistente de este lenguaje de transformación es demasiado amplio
para la escasa carga lectiva del módulo, pero pertinente a la vista del
currículo. Por ello, trasladamos su desarrollo al :ref:`apendice correspondiente <xslt>`.

.. rubric:: Nota al pie

.. [#] Porque estas son las sentencias de las que podía constar la estructura. La
   versión **3** añadió otras sentencias adicionales.

.. |XSLT| replace:: :abbr:`XSLT (eXtensible Stylesheet Language Transformations)`
.. |FLWOR| replace:: :abbr:`FLWOR (For, Let, Where, Order by, Return)`
.. |SQL| replace:: :abbr:`SQL (Strctured Query Language)`

.. _Visual Studio Code: https://code.visualstudio.com/
.. _xidel: https://www.videlibri.de/xidel.html
.. _Java: https://es.wikipedia.org/wiki/Java_(lenguaje_de_programaci%C3%B3n)
