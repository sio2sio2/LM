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
(aunque no necesariamente) a partir de una fuente |XML| (aunque, de nuevo, no
necesariamente). Para ello, usa :ref:`xpath` como herramienta de selección la
información y una estructura prototípica llamada |FLWOR| por las cinco
cláusulas con las que se construye originariamente\ [#]_. Cumple en el mundo
|XML| exactamente la misma función que las cláusulas ``SELECT`` en el mundo
|SQL|.

En cualquier caso, aunque lo que caracteriza a *XQuery* es la estructura
|FLWOR|, esta no es obligatoria, y una consulta *XQuery* puede crearse
únicamente con el contenido del :ref:`RETURN del FLWOR <xquery-return>` (sin
expresar el propio ``return``). Como este contenido puede ser cualquier
expresión *XPath* válida, resulta que *XQuery* es un superconjunto de *XPath*, o
lo que es lo mismo, toda expresión *XPath* es una consulta *XQuery* válida.

Tres son las versiones que ha tenido este lenguaje:

`Versión 1 <https://www.w3.org/TR/2007/REC-xquery-20070123/>`_
   Desarrollada desde los comienzos de *XPath* en 1999, se publicó
   definitivamente en 2007, con lo que hace uso de *XPath* 2.0.

`Versión 3 <https://www.w3.org/TR/xquery-30/>`_
   Publicada en 2014, con lo que incorpora *XPath* 3.0, añade como novedad
   fundamental convertir a las funciones en ciudadanas de primera clase.

`Versión 3.1 <https://www.w3.org/TR/xquery-31/>`_
   Es el último estándar aparecido en 2017, con lo que incorpora *XPath* 3.1.

.. note:: No existe versión **2**. La relación entre *XQuery* y *XPath* es tan
   íntima que se prefirió alinear las versiones de *XQuery* con las de *XPath*.

Una característica importante de *XQuery* es que, a diferencia de |XSLT|, no
tiene sintaxis |XML|, aunque existe una versión normativa (`XQueryX
<https://www.w3.org/TR/xqueryx-31/>`_) que la implementa.

.. caution:: Téngase presente que *XQuery* comparte el modelo de datos de
   *XPath* y, por tanto, todo lo indicado respecto a los tipos en las
   expresiones es también aplicable. Por ejemplo, si no se ha validado el
   documento, los datos serán ``xs:untypedAtomic``, que se comportan más o menos
   como cadenas, nunca como números.

Como complemento a estos apuntes, puede consultar, además de las propias
especificaciones, estas dos extensísimas fuentes:

* `XQuery 3.1 Training <https://www.altova.com/training/xquery3>`_.
* `Wiki sobre XQuery <https://en.wikibooks.org/wiki/XQuery>`_, con abundantes
  ejemplos sobre cómo resolver muchos problemas concretos.
* `Novedades de XQuery 3
  <http://www.datypic.com/services/xquery/whatsnew3.html>`_, que es el índice de
  un curso sobre los añadidos de la versión 3. El curso no está, pero el solo
  índice nos permite tener una enumeración de cuáles son las novedades.

Procesadores
============
Tenemos varias alternativas para ejecutar consultas *XQuery*:

* El programa :ref:`xidel`, que ya usamos para probar *XPath*.

* :ref:`BaseX`, que introduciremos mejor más adelante y tiene tanto interfaz
  gráfica como de línea de comandos. Es un programa hecho en Java_, así que
  necesitaremos tener instalada antes la máquina virtual. En las distribuciones
  basadas en *Debian* hay paquete disponible con lo que echarlo a andar es
  trivial.

* :ref:`Visual Studio Code <vscode>` con la extensión `XML Tools
  <https://marketplace.visualstudio.com/items?itemName=DotJoshJohnson.xml>`_,
  que requiere alguna configuración adicional, que se trata en el apéndice
  enlazado.

.. _xquery-version-declaration:

Otro aspecto a tener presente al usar los procesadores es que *XQuery*, al
comienzo del código, permite especificar cuál es la versión mínima que permite
ejecutar dicho código. Por ejemplo, si usamos algo de lo indicado en :ref:`xquery3`,
el código no será compatible con *XQuery* 1.0. Los procesadores están obligados
a leer la declaración y, si no soportan esa versión de *XQuery*, a abortar la
ejecución confesando su incapacidad:

.. code-block:: xquery

   xquery version "1.0";

En ausencia de la declaración, se entenderá que se soporta la versión más baja,
esto es, 1.0.

|FLWOR| básico
==============
La estructura |FLWOR| es una estructura iterativa (esto es, un bucle), que en
*XQuery* (ya veremos que la versión 3 añade otras) está constituida por la
sucesión de cinco cláusulas:

.. code-block:: none

   (FOR | LET)+ - WHERE? - ORDER BY? - RETURN

donde `FOR` es una cláusula iterativa que asigna a una variable los ítems de
una secuencia, `LET` permite definir variables asignándoles valor, `WHERE`
define una condición para que la iteración del bucle se lleve a cabo, `ORDER BY`
permite ordenar los resultados, y `RETURN` incluye la expresión que resultará
de cada iteración. Hemos expresado también la cardinalidad, de la que se deduce
que debe haber siempre al menos una cláusula `FOR` o `LET` y una `RETURN`.

Como las expresiones se construyen para transformar documentos |XML| se hará
referencia a los nodos de un documento, pero nuestros primeros ejemplos los
haremos utilizando expresiones *XPath* ajenas a cualquier nodo:

.. code-block:: xquery

   (: Mi primer código XQuery :)
   for $animal in ("perro", "gato")
   return
      "Mi mascota es un " || $animal || "."

Este código devolverá como resultado

.. code-block:: none

   Mi mascota es un perro.
   Mi mascota es un gato.

Obsérvese que para construir la secuencia hemos usado una expresión *XPath*\
[#]_ y para expresar cuál debe ser el resultado otra. Además, hemos aprovechado
para presentar **cómo escribir comentarios** dentro del código. Añadamos algunos
elementos más a la construcción:

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
cualquier otra expresión que devolviera valores ordenados según los criterios de
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

Otro aspecto, especialmente útil cuando generamos una salida de puro texto, es
el hecho de que la evaluación de la expresión puede devolver una secuencia\
[#]_, en cuyo caso el procesador suele escribir cada ítem de la secuencia
en línea aparte. Por ejemplo:

.. code-block:: xquery

   for $animal in ("perro", "gato")
   return
      ("animal:", $animal)

devuelve:

.. code-block::

   animal:
   perro
   animal:
   gato

Pero también podríamos haber hecho que la propia estructura ``FOR`` fuera el
ítem de una secuencia:

.. code-block:: xquery

   (
      "Las mascotas de mi casa:",
      for $animal in ("perro", "gato")
      return
         "  - Un " || $animal || ".",
      "Y no tengo nada más que decir."
   )

Esto devolverá el siguiente resultado:

.. code-block:: none

   Las mascotas de mi casa:
     - Un perro.
     - Un gato.
   Y no tengo nada más que decir.

Como puede apreciarse la primera y la última frase no forman parte de ninguna
estructura iterativa por lo que sólo se escriben una vez.

.. caution:: Es importante tener claro que esta estructura iterativa, aunque
   formalmente parecida a la de la programación estructurada, no actúa del mismo
   modo. Las iteraciones, aunque respeten el orden al mostrar los resultados, no
   tienen por qué evaluarse sucesivamente y en orden, sino que lo harán de un
   modo impredecible e incluso en paralelo. Por ello, no pueden redefinirse
   variables cuyo valor cambie en el cuerpo de cada iteración (p.e. definir
   nosotros un contador al que sumemos **1** cada vez que se ejecuta el bucle).

Analicemos más pormenorizadamente cada parte:

.. _xquery-for:

**FOR**
   La cláusula permite añadir un contador usando la palabra ``at``. Por
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

.. _xquery-let:

**LET**
   La sintaxis es la misma que para ``for``: podemos usar varias cláusulas con
   una definición o poner varias definiciones en una cláusula separándolas con
   coma.

.. _xquery-where:

**WHERE**
   No tiene especiales dificultades, salvo tener claro que se evalúa usando el
   :ref:`valor efectivo booleano <xpath2-valor-efect-bool>` de la expresión.

.. _xquery-order_by:

**ORDER BY**
   La expresión *XPath* que se evalúa debe devolver un valor para el que haya
   definida un orden (un número o una cadena, por ejemplo). Los resultados  se
   ordenarán de menor a mayor. Sin embargo, podemos añadir las palabras reservadas
   ``ascending`` (que no tendrá efecto) o ``descending``  que invertirá la
   ordenación para que se haga de mayor a menor.

.. _xquery-return:

**RETURN**
   Indica mediante una expresión *XPath* qué debe devolver cada iteración del
   bucle. Tenga presente que, si no generamos :ref:`una salida XML
   <xquery-output-xml>`, esta cláusula sólo podrá contener una única
   *XQuery*, lo que permite anidar otro estructura |FLWOR|:

   .. code-block:: xquery

      for $animal in ("perro", "gato")
      return
         (
            "Nombres habituales de " || $animal || " son:",
            for $nombre in ("misho", "babo")
            return 
               "  - " || $nombre
         )
      
   El código anterior devuelve la salida:

   .. code-block:: none

      Nombres habituales de perro son:
        - misho
        - babo
      Nombres habituales de gato son:
        - misho
        - babo
   
.. _xquery-output-xml:

Construcción de salida |XML|
============================
Hasta ahora, para ilustrar los principios de la estructura |FLWOR|, estamos
generando resultados que son mero texto. Sin embargo, podemos también generar
una salida |XML| y en este caso, el uso y comportamiento de *XQuery* será
ligeramente distinto, ya que:

* Cuando la salida es de texto, se evalúa una única expresión *XQuery*, por lo
  que la estrategia para lograr evaluar varias es devolver una secuencia, cada
  uno de cuyos ítems es una expresión *XQuery*.
* Un documento |XML| está constituido por múltiples nodos (elementos, atributos,
  etc), el contenido de cada uno de los cuales podrá ser una expresión *XQuery*.
  Para generar cada nodo hay dos alternativas: los constructores directos y los
  constructores computados, que podemos usar a voluntad.

.. _xquery-const-directo:

**Constructores directos**
   Los :dfn:`constructores directos` son aquellos que consisten en escribir
   literalmente la salida |XML| y hacerle notar al procesador que algo es una
   expresión *XPath* a evaluar mediante el uso de corchetes ``{}``.

   Por ejemplo:

   .. code-block:: xquery

      <mascotas>
      <!-- Ejemplo de salida XML -->
      {
         for $animal at $i in ("perro", "gato")
         return
            <animal id="{$i}">{$animal}</animal>
      }
      </mascotas>

   Sin embargo, cuando la entrada es un documento |XML| tenemos que tener
   cuidado, porque las expresiones no siempre devolverán valores atómicos
   y eso influye en el comportamiento. Por ejemplo, si generamos un |XML| a
   partir del :ref:`ejemplo sobre casilleros <xml-ejemplo>` usando este código

   .. code-block:: xquery

      <lista>
      <!-- Una lista muy simple -->
      {
         for $p in //profesor
         return
            <p>{$p/@id}</p>
      }
      </lista>

   resultará el siguiente |XML|

   .. code-block:: xml

      <lista>
      <!-- Una lista muy simple -->
        <p id="p1"/>
        <p id="p13"/>
        <p id="p15"/>
        <p id="p17"/>
        <p id="p28"/>
        <p id="p81"/>
        <p id="p86"/>
      </lista>
      
   porque ``$p/@id`` es un nodo atributo, no una cadena. Para que el
   identificador hubiera pasado a ser el contenido de los elementos *p*,
   deberíamos haberlo atomizado expresamente:

   .. code-block:: xquery

      <lista>
      <!-- Una lista muy simple -->
      {
         for $p in //profesor
         return
            <p>{data($p/@id)}</p>
      }
      </lista>

   Si evaluamos un nodo elemento, nos pasará lo mismo: se escribirá el elemento,
   no su valor atómico.

.. _xquery-const-eval:

**Constructores evaluados**
   Los :dfn:`constructores evaluados` utilizan una sintaxis no |XML| para
   expresar la estructura del |XML| de salida. Son especialmente útiles cuando
   el nombre del elemento o del atributo son dinámicos y dependen del contenido
   de la entrada:

   .. code-block:: xquery

      element lista {
         for $p in //profesor
         return
            element p {$p/@id}
      }

   Como puede verse, se usa la palabra ``element`` con dos argumentos: el nombre
   del elemento (*lista*), que es literal y la expresión de su contenido, que,
   como se obtiene a través de una expresión *XPath*, hay que encerrar entre
   llaves. Por supuesto, el primer argumento también podría ser una expresión
   evaluada:

   .. code-block:: xquery

      element {name(/*)} {
         for $p in //profesor
         return
            element p {$p/@id}
      }

   De esta forma, el nodo raíz de la salida tendrá el mismo nombre (*claustro*)
   que el del documento original. Obsérvese, además, que la evaluación de
   :code:`$p/@id` resulta un nodo atributo, por lo que el elemento *p* estará
   vacío y tendrá un atributo que se llama igual que el de profesor y con su
   mismo valor.

   Si quisiéramos dotar de más contenido a *p*, podríamos expresar tal contenido
   como una secuencia:

   .. code-block:: xquery
      :emphasize-lines: 4

      element {name(/*)} {
         for $p in //profesor
         return
            element p {($p/@id, $p/nombre)}
      }

   Ahora *p*, dispondrá de un atributo y de un elemento *nombre* como contenido.
   Por supuesto, podemos cambiar los nombres de los atributos o los elementos
   complicando un poco la expresión. Por ejemplo:

   .. code-block:: xquery
      :emphasize-lines: 6

      element {name(/*)} {
         for $p in //profesor
         return
            element p {(
               $p/@id,
               element nombre_completo {$p/nombre || " " || $p/apellidos}
            )}
      }

   o lo mismo si queremos mezclar constructores directos y evaluados:

   .. code-block:: xquery
      :emphasize-lines: 6

      element {name(/*)} {
         for $p in //profesor
         return
            element p {(
               $p/@id,
               <nombre_completo>{$p/nombre || " " ||  $p/apellidos}</nombre_completo>
            )}
      }

   Sólo hemos ilustrado los constructores evaluados para elementos, pero los hay
   también para los demás componentes de un |XML| como atributos
   (:code:`attribute nombre contenido`), comentarios (:code:`comment
   contenido`), texto (:code:`text contenido`) o instrucciones de procesamiento
   (:code:`processing-instruction nombre contenido`):

   .. code-block:: xquery
      :emphasize-lines: 4,9,11


      let $href    := "claustro.xsl"
      return
         (
            processing-instruction xml-stylesheet {'type="text/xsl" href="' || $href || '"'},
            element {name(/*)} {
               for $p at $i in //profesor
               return
                  (
                     comment {"Profesor #" || $i},
                     element p {(
                        attribute codigo {$p/@id},
                        $p/nombre
                     )}
                  )
            }
         )

.. *aaa*

.. _xquery-user-functions:

Funciones de usuario
====================
*XQuery* permite, antes de la estructura |FLWOR|, definir funciones de usuario
que piensen usarse luego en la estructura. Por ejemplo:

.. code-block:: xquery
   :emphasize-lines: 2-4,8

   (: función propia :)
   declare function local:declara-estilo($href) {
      processing-instruction xml-stylesheet {'type="text/xsl" href="' || $href || '"'}
   };

   (: Como no necesitamos for ni let usamos directamente el contenido de 'return' :)
   (
      local:declara-estilo("claustro.xsl"),
      element {name(/*)} {
         for $p at $i in //profesor
         return
            (
               comment {"Profesor #" || $i},
               element p {(
                  attribute codigo {$p/@id},
                  $p/nombre
               )}
            )
      }
   )

.. _xquery3:

Cláusulas adicionales
=====================
*XQuery* 3 hizo algunos añadidos a la estructura original |FLWOR|:

.. code-block:: none

   (FOR | LET | WINDOW)+ - WHERE? - ORDER BY? - GROUP BY? - COUNT? - RETURN

.. caution:: En realidad, la expresión de arriba es una simplificación que busca
   la simetría con la que facilitamos antes y que es la propia de *XQuery* 1.0.
   En la versión 3, las únicas limitaciones a la estructura |FLWOR| es que debe
   empezar por un ``FOR``, un ``LET`` o un ``WINDOW``, y que debe rematarse con
   el único ``RETURN`` posible; entre medias puede haber todas las cláusulas que
   queramos (excepto ``RETURN``) en el orden y número que queramos, o sea:

   .. code-block::

      (FOR | LET | WINDOW) - (FOR | LET | WINDOW | WHERE | ORDER BY | GROUP BY | COUNT)* - RETURN

**COUNT**
   permite definir un contador para las iteraciones:

   .. code-block:: xquery
      :emphasize-lines: 5
         
      xquery version "3.0";

      for $animal in ("perro", "gato", "jilguero")
      where $animal != "perro"
      count $n
      return
         $n || ". Mi mascota es un " || $animal || "." 

   .. caution:: ``count`` puede usarse antes de la sentencia ``where``, pero en
      ese caso también contará las iteraciones filtradas:

      .. code-block:: xquery
         :emphasize-lines: 5
            
         xquery version "3.0";

         (: gato es 2, y jilguero es 3 :)
         for $animal in ("perro", "gato", "jilguero")
         count $n
         where $animal != "perro"
         return
            $n || ". Mi mascota es un " || $animal || "." 


**GROUP BY**
   como su homónimo en |SQL|, permite agrupar los resultados según un determinado
   criterio. Por ejemplo, esto sacaría un nuevo :file:`casillero.xml` en que los
   profesores están agrupados por casilleros:

   .. code-block:: xquery
      :emphasize-lines: 7

      xquery version "3.0";

      element {name(/*)} {
         for $p in //profesor
         let $depart := $p/departamento
         where $depart
         group by $depart
         return
            <departamento nombre="{$depart}">
               {$p}
            </departamento>
      }

   Y si queremos incluir los sustitutos, podríamos echar mano de *XPath* 2:

   .. code-block:: xquery
      :emphasize-lines: 7

      xquery version "3.0";

      element {name(/*)} {
         for $p in //profesor
         let $depart := if ($p/departamento) then $p/departamento else //profesor[@id = $p/@sustituye]/departamento
         where $depart
         group by $depart
         return
            <departamento nombre="{$depart}">
               {$p}
            </departamento>
      }

   .. note:: Obsérvese que al usar el ``FOR`` sin la cláusula ``GROUP BY`` en
      cada iteración, la variable ``$p`` contiene un elemento *profesor*.  En
      cambio, cuando se usa ``GROUP BY``, ``$p`` pasa a contener una secuencia con
      todos los elementos *profesor* de un mismo departamento.

**WINDOW**
   La cláusula (posiblemente la más compleja de las incorporadas) permite
   agrupar datos al igual que ``group by``, pero en vez de agrupar por valor,
   agrupa por secuencias de ítems consecutivos. Por ejemplo, nos permitiría
   agrupar los tres primeros ítems, luego los tres siguientes, y así sucesivamente
   en grupos de tres.

   Cada uno de estos grupos o rangos recibe el nombre de :dfn:`windows` y puede
   haber de dos tipos:

   #. :dfn:`tumbling window`, que son rangos que nunca se solapan, esto es, que
      no comparten ítems, por lo que el ítem que abre una ventana siempre tiene
      que ser posterior al último que cierra la ventana anterior.

      .. image:: files/tumbling.png

   #. :dfn:`sliding window`, que son rangos solapables y, por tanto, dos
      ventanas consecutivas podrán tener uno o más ítems comunes.

      .. image:: files/sliding.png


   Para definir los límites de la ventana la sintaxis permite definir una
   condición de comienzo y otra de fin. Por ejemplo:

   .. code-block:: xquery

      xquery version "3.0";

      for tumbling window $w in (1 to 10)
      start when true()
      end at $e when $e mod 3 = 0
      return
         "- " || string-join($w, ",")

   establece una condición de comienzo que siempre cumple y una de final en
   los múltiplos de 3. Como las ventanas no pueden solaparse, lo que significa
   que la ventana siguiente sólo puede comenzar después de que haya acabado la
   anterior, el resultado es éste:

   .. code-block:: none

      - 1,2,3
      - 4,5,6
      - 7,8,9
      - 10

   .. note:: Percátese de que puede asignar una variable al elemento (inicial o
      final) de la ventana usando ``at``, aunque puede hacerse elisión
      (:code:`end $e` en vez de :code:`end at $e`).

   A las condiciones podemos añadirle ``only`` para forzar a que se cumpla y, si
   no es así, que no se llegue a constituir la ventana. Por tanto, el código:

   .. code-block:: xquery

      xquery version "3.0";

      for tumbling window $w in (1 to 10)
      start when true()
      only end at $e when $e mod 3 = 0
      return
         "- " || string-join($w, ",")

   no llegará a constituir la última ventana anterior, ya que ésta no acababa en
   un múltiplo de tres:

   .. code-block:: none

      - 1,2,3
      - 4,5,6
      - 7,8,9

   En cambio, si cambiamos el tipo de ventana...

   .. code-block:: xquery

      xquery version "3.0";

      for sliding window $w in (1 to 10)
      start when true()
      only end at $e when $e mod 3 = 0
      return
         "- " || string-join($w, ",")

   ...ahora las ventanas se pueden solapar y, como cualquier ítem, es susceptible
   de ser el comienzo de una el resultado es el siguiente:

   .. code-block:: none

      - 1,2,3
      - 2,3
      - 3
      - 4,5,6
      - 5,6
      - 6
      - 7,8,9
      - 8,9
      - 9
      - 10

   Por último, existe también la posibilidad de asignar una variable al
   siguiente elemento al que comienza o termina una ventana con la palabra
   ``next``:

   .. code-block:: xquery

      xquery version "3.0";

      for tumbling window $w in (1 to 10)
      start at $i next $i_next when $i_next mod 2 = 0
      only end at $e when $e mod 3 = 0
      return
         "- " || string-join($w, ",")

   Este código provoca que sólo se tome como comienzo de ventana aquel ítem
   cuyo siguiente en la secuencia sea múltiplo de dos. Como consecuencia, el
   resultado es:

   .. code-block:: none

      - 1,2,3
      - 5,6
      - 7,8,9

   .. note:: La variable ``$i`` no la usamos para nada, por lo que podríamos
      ahorrárnosla: :code:`start next $i_next when $i_next mod 2 = 0`.

   .. https://media.datadirect.com/download/docs/ddxquery/allddxq/reference/wwhelp/wwhimpl/common/html/wwhelp.htm?context=reference&file=tutorial_xquery5.html

.. _xquery-update:

Actualización de datos
======================
Estrictamente *XQuery* permite la consulta de datos y la generación de una
salida en forma de nuevo |XML|. Buscando la analogía con |SQL|, esto lo hace
equivalente a ``SELECT`` que obtiene datos de una base de datos relacional y
genera una salida en forma de tabla. Sin embargo, el |DML| de |SQL| lo
componen, además de ``SELECT``, ``INSERT``, ``UPDATE`` y ``DELETE``, los cuales
permiten alterar el contenido. Para dotar a *XQuery* de la capacidad de
modificación que confieran estas tres sentencias, el |W3C| definió como
extensión al lenguaje (`XQuery Update Facility 3.0
<https://www.w3.org/TR/xquery-update-30>`_) cuatro nuevas expresiones que puede
incluirse en la cláusula :ref:`RETURN <xquery-return>` para modificar la fuente
original, en vez de generar una salida:

* :ref:`insert <xquery-insert>`, que permite añadir nodos.
* :ref:`delete <xquery-delete>`, que permite borrar nodos.
* :ref:`replace <xquery-replace>`, que permite reemplazar nodos.
* :ref:`rename <xquery-rename>`, que permite renombrar nodos.

Modificación
------------
.. caution:: Estas sentencias de actualización de la fuente tienen sentido
   cuando el origen |XML| se utiliza como una base de datos, no como un archivo
   independiente, por lo que es más pertinente practicarlas en la próxima
   :ref:`unidad dedicada al almacenamiento <lm-ut5>` y, en particular, en la
   parte dedicada a :ref:`bases nativas <nativas>`. Se incluye aquí su
   explicación para no desgajarla del resto del lenguaje *XQuery*.

.. _xquery-insert:

``insert``
   Podemos insertar tanto elementos como atributos y especificando exactamente
   dónde. Por ejemplo, la expresión:

   .. code-block:: xquery

      insert node <foo/> into //profesor[1]

   Añade un elemento *foo* al final del primer profesor. Variantes a esto
   podrían haber sido:

   .. code-block:: xquery

      insert node <foo/> as last into //profesor[1]

   o, si lo queremos añadir al comienzo del elemento:

   .. code-block:: xquery

      insert node <foo/> as first into //profesor[1]

   Para agregarlo en algún punto intermedio, tendríamos que echar mano de
   ``before`` o ``after``:

   .. code-block:: xquery

      insert node <foo/> after //profesor[1]/nombre

   Obsérvese que estamos agregando un nodo y, en consecuencia, el destino debe
   ser único y no varios, ya que un nodo sólo puede añadirse en un lugar. Si
   quisiéramos agregar un nodo *foo* a cada profesor, entonces tendríamos que
   echar mano de la estructura |FLWOR| explícita:

   .. code-block:: xquery

      for $p at $n in //profesor
      return
         insert node <foo>{$n}</foo> after //profesor[1]/nombre

   Hemos complicado un poco la inserción para que se vea que estamos usando un
   :ref:`constructor directo <xquery-const-directo>` para el elemento *foo*. De
   hecho, también podríamos haber usado un :ref:`constructor evaluado
   <xquery-const-eval>`:

   .. code-block:: xquery

      for $p at $n in //profesor
      return
         insert node element foo {$n} after $p/nombre

   En realidad, es posible insertar una secuencia de nodos:

   .. code-block:: xquery

      insert node (<foo/>, <bar/>) into //profesor[1]

   Y también atributos, aunque usando un *constructor evaluado*:

   .. code-block:: xquery

      insert node attribute foo {"bar"} into //profesor[1]

.. _xquery-delete:

``delete``
   Borra la secuencia de nodos que se exprese como argumento. Por ejemplo,
   la siguiente expresión elimina el atributo casillero de todos los profesores
   que lo tengan.

   .. code-block:: xquery

      delete node //profesor/@casillero

.. _xquery-replace:

``replace``
   Reemplaza el nodo indicado por otro que se le facilite:

   .. code-block:: xquery

      replace node //profesor[1]/apelativo with <apelativo>Joselito</apelativo>

   Aunque en este caso, como nuestra intención era cambiar el contenido y no el
   nombre del nodo, quizás habría sido mejor:

   .. code-block:: xquery

      replace node //profesor[1]/apelativo/text() with "Josélito"

   Por supuesto, también podemos cambiar atributos:

   .. code-block:: xquery

      replace node //profesor[1]/@id with attribute id {"p22"}

   Cuando lo que se quiere es reemplazar no el nodo completo, sino su valor (que
   es lo que hemos pretendido en los dos ejemplos anteriores, puede usarse la
   expresión ``replace value of node`` en vez de ``replace node``:

   .. code-block:: xquery

      replace value of node //profesor[1]/apelativo with "Joselito"

   y también:

   .. code-block:: xquery

      replace value of node //profesor[1]/@id with "p22"

   .. caution::

      Si la expresión no es un literal, como es el caso, sino una expresión que
      debe evaluarse, entonces tiene que escribirse ``text {expr}``:

      .. code-block:: xquery

         replace value of node //profesor[1]/@id with text {fn:generate-id()}

.. _xquery-rename:

``rename``
   ``replace`` sustituye por completo el nodo, lo cual incluye todos sus
   descendientes. ``rename``, en cambio, nos permite cambiar el nombre del nodo
   sin alterar en absoluto su contenido:

   .. code-block:: xquery

      rename node //profesor[1]/apelativo as "apodo"

   Y, de nuevo, también permite cambiar el nombre de un atributo:

   .. code-block:: xquery

      rename node //profesor[1]/@id as "codigo"

Modificación en memoria
-----------------------
Los ejemplos anteriores sirven todos para modificar el documento original. Ahora
bien, supongamos que queremos generar una salida que es muy parecida al archivo
original. Con las técnicas vistas antes de este :ref:`epígrafe de actualización
<xquery-update>`, esa generación a pesar de ser una pequeña variante del
original, nos supondría bastante esfuerzo. Por ese motivo, *XQuery* permite la
posibilidad de copiar parte del documento original en memoria, hacer los cambios
usando las técnicas arriba vistas y, finalmente, volcar en la salida la copia.

Por ejemplo, imaginemos que quisiéramos generar una salida del documento de
casilleros exactamente igual al original con la única diferencia de que el
elemento *casillero* pasa a ser un atributo. El ejercicio podríamos realizarlo
así:

.. code-block:: xquery
   :emphasize-lines: 3,4,11

   xquery version "3.0";

   copy $claustro := //claustro
   modify (
      for $p in $claustro/profesor
      return (
         insert node attribute departamento {$p/departamento} into $p,
         delete node $p/departamento
      )
   )
   return
      $claustro

Esto es:

* Hacemos una copia del elemento raíz (*claustro*) con ``copy``.
* Realizamos las modificaciones precisa dentro de ``modify``
* Devolvemos con ``return`` la copia modificada.

Para no enmarañar el ejemplo, hemos evitado tener en cuenta que hay
profesores sin departamento a los que, por tanto, no hay que hacerle ninguna
modificación. Esto, no obstante, no es algo que no podamos resolver con
:ref:`if <xpath2-const-if>`:

.. code-block:: xquery
   :emphasize-lines: 3,4,14

   xquery version "3.0";

   copy $claustro := //claustro
   modify (
      for $p in $claustro/profesor
      return (
         if ($p/departamento) then (
            insert node attribute departamento {$p/departamento} into $p,
            delete node $p/departamento
         )
         else ( (: No hay modificación alguna :) )
      )
   )
   return
      $claustro

Ejercicios resueltos
====================
Para ilustrar el uso de *XQuery* tomemos el :ref:`primer ejercicio XML resuelto
sobre recetas <xml-resueltos>`:

.. dropdown:: XML propuesto

   .. literalinclude:: /01.intro/files/ejxml1.recetas.xml
      :language: xml


a. Obtener un listado de texto ordenado alfabéticamente con las recetas de más
   de tres ingredientes:

   .. code-block:: none

      Recetas de cocina:
        1. ensalada (5 minutos)
           * tomate (2 pieza)
           * cebolla (.25 pieza)
           * lechuga (150 gramo)
           * sal (2 gramo)
           * vinagre (3 cc)
           * aceite (6 cc)
        2. etc...

   Este listado se puede obtener con el siguiente código:

   .. dropdown:: XQuery propuesto

      .. literalinclude:: files/recetas-txt.xq
         :language: xquery

#. Generar otro |XML| idéntico en que los atributos *nombre* y *cantidad* de
   cada ingrediente se conviertan en nodos elemento:

   .. dropdown:: XQuery propuesto

      .. literalinclude:: files/recetas-xml.xq
         :language: xquery

|XSLT|
******
Un estudio consistente de este lenguaje de transformación es demasiado amplio
para la escasa carga lectiva del módulo, pero pertinente a la vista del
currículo. Por ello, trasladamos su desarrollo al :ref:`apéndice correspondiente <xslt>`.

Ejercicios propuestos
*********************
.. note:: Para no despojar de interés práctico la :ref:`unidad dedicada al
   almacenamiento <lm-ut5>`, puede ahora centrarse en resolver los ejercicios
   cuya salida en texto y no |XML|, ya que estos últimos, por centrarse en
   obtener variaciones del documento original,  están pensados para  resolverse
   utilizando las :ref:`técnicas de actualización <xquery-update>`.

.. include:: /99.ejercicios/40.xquery.rst
   :start-line: 5

.. rubric:: Nota al pie

.. [#] Porque estas son las cláusulas de las que podía constar la estructura. La
   versión **3** añadió otras cláusulas adicionales.

.. [#] En realidad, se puede escribir conjunto mayor de expresiones de las
       válidas para *XPath*, ya que *XQuery* soporta cláusulas inexistentes en
       *XPath* como la propia estructura |FLWOR| o los :ref:`constructores para
       generar una salida XML <xquery-output-xml>`.

.. [#] En realidad, podríamos considerar que la evaluación de una estructura
   |FLWOR| devuelve en sí misma una secuencia con tantos ítems como iteraciones
   haya.

.. |XSLT| replace:: :abbr:`XSLT (eXtensible Stylesheet Language Transformations)`
.. |FLWOR| replace:: :abbr:`FLWOR (For, Let, Where, Order by, Return)`
.. |SQL| replace:: :abbr:`SQL (Strctured Query Language)`
.. |DML| replace:: :abbr:`DML (Data Manipulation Language)`
.. |W3C| replace:: :abbr:`W3C (World Wide Web Consortium)`

.. _Visual Studio Code: https://code.visualstudio.com/
.. _xidel: https://www.videlibri.de/xidel.html
.. _Java: https://es.wikipedia.org/wiki/Java_(lenguaje_de_programaci%C3%B3n)
