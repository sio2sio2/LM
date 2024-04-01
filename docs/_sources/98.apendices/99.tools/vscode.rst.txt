.. _vscode:

Visual Studio Code
******************
Es un editor de texto, con innumerables extensiones, especialmente diseñado para
la escritura de código, y con versiones para los principales sistemas
operativos. Esta disponible para su descarga gratuita en `su página web
<https://code.visualstudio.com/>`_  y su código fuente  está disponible en `su
página de github <https://github.com/microsoft/vscode>`_.

Generalidades
=============
**Idioma**
   Si la instalación trae el programa en inglés, puede instalarse el paquete de
   nuestra lengua pulsando :kbd:`Ctrl`\ +\ :kbd:`Shift`\ +\ :kbd:`P` (o
   seleccionando ``File>Preferences>Settings``) y escribiendo la palabra
   *display* para reducir los términos de búsqueda:

   .. image:: files/00-vscode-lang.png

**Áreas de trabajo**
   La mejor forma de trabajar con el programa es abriendo una *carpeta* en vez de
   archivos individuales, ya que podemos asimilar esta carpetas con proyectos
   (áreas de trabajo) y definir la configuración para cada área de trabajo
   independientemente:

   .. image:: files/01-vscode-abrir.png

**Configuración**
   La configuración puede definirse de forma global o por área de trabajo y
   puede accederse a ella pulsando :kbd:`Ctrl`\ +\ :kbd:`,`:

   .. image:: files/02-vscode-conf.png

   Se almacena en formato |JSON| y, cuando se define para el área de trabajo, se
   almacena dentro de la propia carpeta en :file:`.vscode/settings.json` con que
   es equivalente realizar la configuración a través de la interfaz que
   proporciona :kbd:`Ctrl`\ +\ :kbd:`,`, que editando directamente el archivo.

**Extensiones**
   Las extensiones permiten aumentar las funcionalidades del editor y pueden
   activarse tanto de forma global como por espacio de trabajo. Dependiendo de
   su naturaleza, nos convendrá para algunas lo primero y para otras lo
   segundo.

   Una indispensable para quien se haya criado editando archivos en `vim
   <https://www.vim.org/>`_ es `VSCodeVim
   <https://marketplace.visualstudio.com/items?itemName=vscodevim.vim>`_, que
   permite editar archivos como se hace en el veterano editor.

   Para gestionar las extensiones, basta con pinchar sobre el icono lateral
   izquierdo  señalado:

   .. image:: files/03-vscode-ext.png

**Áreas especiales**
   Podemos abrir algunas áreas especiales que nos permiten consultar o realizar
   ciertas actividades interesantes:

   * :kbd:`Ctrl`\ +\ :kbd:`Shift`\ +\ :kbd:`P`, abre un pequeño cuadro que nos
     permite introducir instrucciones.
   * :kbd:`Ctrl`\ +\ :kbd:`Shift`\ +\ :kbd:`M`, abre en la parte inferior una
     consola que muestra los errores derivados de una determinada acción. Por
     ejemplo, los errores de validación.

.. _vscode-atajos:

**Atajos de teclado**
   El programa da la posibilidad de asociar combinaciones de teclas a
   determinadas acciones, lo cual puede ahorrarnos mucho tiempo. El
   acceso a estas asociaciones se logra pulsando 
   :kbd:`Ctrl`\ +\ :kbd:`k`\ -\ :kbd:`Ctrl`\ +\ :kbd:`s`. Si deseamos añadir
   alguna asociacion extra a las ya existentes podemos editar un archivo
   :file:`keybindings.json` pulsando aquí:

   .. image:: files/addkeybinding.png

   El archivo contiene de un array en que cada *ítem* es una de esas
   asociaciones. Más adelante se sugerirán algunos.

   .. seealso:: La ayuda oficial del programa tiene `una buena explicación
      sobre estos atajos <https://code.visualstudio.com/docs/getstarted/keybindings>`_.

.. _vscode-xml:

|XML|
=====
La comprobación de que el documento es bien formado, además de otras
funcionalidades como cerrar automáticamente la etiqueta que se acaba de abrir,
se puede lograr instalando la extensión `XML de RedHat
<https://marketplace.visualstudio.com/items?itemName=redhat.vscode-xml>`_.

Esa misma extensión también permite la validación con |DTD| si se define
correctamente la :ref:`declaración de tipo de documento <dtd-doctype>`. Ahora
bien, por defecto, la extensión no atiende las definiciones hechas en un |DTD|
referido desde otro |DTD| mediante una :ref:`entidad parámetro <dtd-ent-par>`,
lo que malogra una gramática que querramos hacer modular. Puede corregirse
esto haciendo verdadera la opción ``xml.validation.resolveExternalEntities``:

.. code-block:: json

  {
    "xml.validation.resolveExternalEntities": true
  }

Si nuestra intención es evaluar expresiones *XPath* o *XQuery*, tenemos varias
opciones:

* Instalar la extensión `XPath Tester
  <https://marketplace.visualstudio.com/items?itemName=creinbacher.xpathtester>`_,
  que permite evaluar expresiones *XPath* 1.0. Para evaluarlas, basta con pulsar
  :kbd:`Ctrl`\ +\ :kbd:`Shift`\ +\ :kbd:`P` y buscar *XPath* para que accedamos
  al cuadro de diálogo que nos permite hacer evaluaciones.

* Utilizar, en realidad, :ref:`BaseX` a través de :program:`Visual Studio Code`
  para lo cual necesitamos:

  .. rst-class:: simple

  #. Instalar previamente :ref:`BaseX`.

  #. Configurar la extensión `XML Tools
     <https://marketplace.visualstudio.com/items?itemName=DotJoshJohnson.xml>`_
     para que use *BaseX* como procesador. Para ello, necesitamos editar la
     configuración y añadir:

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
     archivo abierto y seleccionado en el editor.
  #. Pulsamos :kbd:`Ctrl`\ +\ :kbd:`Shift`\ +\ :kbd:`P` y ejecutamos `XML Tools:
     Execute Query`.
  #. Si hay varios |XML| en el directorio se nos preguntará sobre cuál
     queremos hacer la consulta, y, si hemos incluido, la opción :kbd:`-o` en
     la configuración (tal como se ha sugerido antes), se nos pedirá confirmar
     el archivo de salida. Si no la incluimos, la salida se volcará
     directamente en una subventana.
  #. Abrimos el archivo de salida para consultar el resultado.

  .. todo:: Añadir un atajo para acceder a `XML Tools: Execute Query`.

.. _vscode-json:

|JSON|
======
El editor tiene soporte nativo, por lo que nos señalará sin configuración
adicional si el documento |JSON| que editamos no es bien formado. También es
capaz de validarlo si le proporcionamos el esquema, pero en este caso sí debemos
configurar para relacionar el documento con su gramática. Para ello debemos
abrir la configuración (:kbd:`Ctrl`\ +\ :kbd:`,`) y acceder a
la extensión para |JSON|, una de cuyas configuraciones es ``JSON: Schemas``:

.. image:: files/20-vscode-json-schemas.png

Al pinchar en la edición se nos abrirá el archivo de configuración
:file:`settings.json` que nos permite relacionar archivos |JSON| con los
esquemas que usan. Por ejemplo:

.. image:: files/21-vscode-json-settings.png

Este es un proyecto abierto como una carpeta en que el esquema está en la
propia carpeta raíz y se ha definido la relación entre archivos |JSON| y
esquemas así:

.. code:: json

   {
       "json.schemas": [
           { "fileMatch": ["casilleros*.json"], "url": "/casilleros.schema.json" }
       ]
   }

La propiedad ``json.schemas`` es una secuencia, cada uno de cuyos elementos
es un objeto que sirve para referir un esquema distinto. En él, ``fileMatch``
es la lista de archivos que siguen el esquema, mientras que ``url`` indica la
|URL| (que no propiamente la ruta) del esquema. Podríamos haber escrito una
|URL| absoluta (con file:`file:///etc.`), pero dado que la |URL| base es la
propia carpeta del proyecto, hemos preferido una |URL| relativa. 

.. _vscode-yaml:

|YAML|
======
A diferencia de lo que ocurre con |JSON|, el soporte para |YAML| no es nativo,
así que es preciso instalar la `extensión para YAML
<https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml>`_ para
que el programa comprueba si el documento es bien formado. Si, además, queremos
confrontarlo con un esquema |JSON| para validarlo, entonces requeriremos
configuración adicional que relacione los archivos con su esquema
correspondiente:

.. code:: json

   {
      "yaml.schemas": {
         "./casilleros.schema.json": "casilleros*.yaml"
      }
   } 

En este caso, ``yaml.schemas`` es un objeto y cada objeto tiene como claves
la ruta al esquema (no una |URL| como antes) y como valor el archivo o los
archivos que se rigen por el esquema. Cuando son varios, es necesario usar
una secuencia:

.. code:: json

   {
      "yaml.schemas": {
         "./casilleros.schema.json": ["casilleros*.yaml", "*casilleros.yaml"]
      }
   } 

.. _vscode-html:

|HTML|/|CSS|
============
Como en el caso del formato |JSON|, :program:`Visual Studio Core` tiene soporte
nativo para |HTML|, de manera que es capaz de proporcionarnos sugerencias o
autocompletado sin configuración adicional. Sin embargo, podemos afinar un poco
para ampliar las facilidades.

En principio, haremos como con el resto de formatos: crearemos una carpeta
dedicada a nuestros archivos de |HTML| y |CSS| y aplicaremos un configuración
específica para ella.

.. _vscode-html-close:

**Cierre de etiquetas**
   Ya existe soporte para ello, pero si somos de aquellos a los que gusta no cerrar
   las etiquetas que no necesitan cierre, puede resultarnos molesta que esta
   funcionalidad se aplique siempre. La extensión nativa, desgraciadamente, no
   tiene posibilidad de definir excepciones, pero otras externas, sí. Así que
   nuestra propuesta es instalar y habilitar la extensión `Auto Close Tag
   <https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag>`_
   y hacer una pequeña configuración para deshabilitar el cierre nativo y
   habilitar, con las excepciones de deseemos el cierre con esta extensión.
   :download:`Esta configuración <files/autoclose.json>` puede servirnos:

   .. literalinclude:: files/autoclose.json

   En esta configuración, la primera línea deshabilita el cierre automático
   nativo; la segunda lo habilita para la extensión; la tercera activa  el
   cierre para |HTML| (ya que por defecto está deshabilitado)\ [#]_ y
   *Javascript*, y la cuarta define aquellas etiquetas que no queremos que se
   cierren automáticamente. Además, con la quinta hemos deshabilitado la
   escritura automática de las comillas dobles para los valores de los
   atributos, ya que no son obligatorias.

.. _vscode-html-val:

**Validación**
   Otra funcionalidad interesante es la validación del documento |HTML| o |CSS|.
   Para ello una buena extensión es `W3C Web Validator
   <https://marketplace.visualstudio.com/items?itemName=CelianRiboulet.webvalidator>`_
   que comprueba la validez con los validadores que ofrece el |W3C|:

   .. image:: files/validacionHTML.png

   En la parte inferior (la remarcada en rojo) aparecerá una leyenda cada vez
   que tengamos activo un archivo |HTML| o |CSS| que nos permite validar el
   documento. En caso de errores, podremos consultarlos en la venta de errores
   (:kbd:`Ctrl`\ +\ :kbd:`Shift`\ +\ :kbd:`M`).

.. _vscode-html-visu:

**Visualización**
   Otra funcionalidad interesante es la de poder previsualizar la página. Para
   ello tenemos varias alternativas:

   `Live Preview <https://marketplace.visualstudio.com/items?itemName=ms-vscode.live-server>`_
     Extensión que mostrará el icono señalado en la captura:

     .. image:: files/livepreview.png

     La consecuencia de pinchar sobre el icono es ésta:

     .. image:: files/livepreview2.png

     es decir, se crea un pequeño servidor web y mediante él se sirve la página
     en un navegador empotrado. Además, podremos seguir escribiendo y las
     modificaciones se realizarán en vivo.

     Una alternativa (aunque no equivalente, porque no habrá servidor web) es
     abrir el documento |HTML| con un navegador que tengamos instalado en el
     sistema, lo cual requiere dos cosas:

   `Live Server <https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer>`_
     Extensión parecida a la anterior, pero que muestra la página en el navegador
     predeterminado del sistema.

     Tras la instalación, si estamos en el directorio donde almacenamos nuestro
     sitio web, tenemos dos alternativas para consultar el aspecto de la página
     web:

     a. Pinchar sobre ``Go Live`` (abajo a la derecha) que intentará abrir
        directamente sobre el archivo :file:`index.html` del directorio:

        .. image:: files/vscode-GoLive.png

     b. Pinchar con el botón derecho sobre el archivo que queremos abrir y
        seleccionar la entrada adecuada del menú contextual:

        .. image:: files/vscode-LiveServer.png


     En ambos casos, se levantará un pequeño servidor web y se mostrará el
     documento |HTML| en el navegador predeterminado del sistema. Además, según
     lo vayamos modificando, se reflejarán los cambios en la visualización sin
     que tengamos que repetir la operación.

     Si queremos parar el servidor, basta con pinchar donde antes se mostraba la
     leyenda ``Go Live`` y ahora se muestra el puerto en el que escucha el
     servicio:

     .. image:: files/vscode-LiveServerClose.png

   **Configuración manual**
     Consiste en no utilizar ninguna extensión adicional y, simplemente, mapear
     alguna combinación de teclas para que abra el |HTML| en el navegador de
     nuestra elección. No es una solución equivalente a las dos anteriores,
     puesto que en este caso no se crea ningún servidor web local, sino que el
     documento |HTML| se abre como archivo local. Para los propósitos de este
     curso en que nos limitamos a aprender a escribir páginas estáticas, es
     probable que no nos percatemos de la diferencia. Para poner en práctica
     esta alternativa, basta hacer dos cosas.

     + Crear una tarea:

       Para ello puede crearse un archivo :file:`.vscode/tasks.json` y añadir las
       tareas que abran los navegadores que deseemos:

       .. code-block:: json

          {
              "version":"2.0.0",
              "tasks": [
                  {
                      "label": "Abrir en Chromium",
                      "command": "explorer",
                      "windows":  { "command": "C:/Program Files/Brave Software/etc..." },
                      "linux": { "command": "brave-browser" },
                      "args": [ "${file}" ],
                      "presentation": {"reveal": "never"},
                      "problemMatcher": []
                  }
              ]
          }

       .. seealso:: Para más información, consulte `cómo crear tareas
          <https://code.visualstudio.com/docs/editor/tasks>`_.

     + Asociar a la tarea :ref:`un atajo <vscode-atajos>`, para lo cual tenemos
       que editar :file:`keybindings.json` tal como se explica allí:
     
       .. code-block:: json

          [
              {
                  "key": "ctrl+l b",
                  "command": "workbench.action.tasks.runTask",
                  "args": "Abrir en Chromium"
              }
          ]

       En este caso, se abrirá Brave_ al pulsar :kbd:`Ctrl`\ +\ :kbd:`l`\ -\
       :kbd:`b`.

.. _vscode-javascript:

Javascript
==========
Al igual que :ref:`ocurre con JSON <vscode-javascript>`, el programa tiene
soporte nativo para la escritura de :ref:`Javascript <javascript>`
(autocompletado, `snippets <https://es.wikipedia.org/wiki/Snippet>`_), pese a lo cual podemos hacer algunos añadidos
para mejorarla:

* `Javascript (ES6) code snippets
  <https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets>`_,
  que añade *snippets* adicionales.
* `JS CodeFormer
  <https://marketplace.visualstudio.com/items?itemName=cmstead.js-codeformer>`_,
  que mejora la capacidad nativa para la refactorización.
* `ESLint <https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint>`_,
  que permite integrar el `analizador estático de código ESLint
  <https://eslint.org/>`_. Lo trataremos más adelante.

**Ejecución**
   *Javascript* es un lenguaje de programación que requiere de un intérprete.
   Cuando el código forma parte de un documento |HTML| (que és el propósito de
   este módulo) el intérprete encargado es el incluido en el navegador y, por
   tanto, nos bastará con abrir en un navegador la página para comprobar su
   ejecución.

   Sin embargo, en otros casos en los que *Javascript* no se ejecuta en un
   navegador (por tanto, ajenos a nuestro módulo) o si, simplemente, estamos
   dando los primeros pasos en su aprendizaje y nos resulta más fácil prescindir
   del documento |HTML|, necesitamos un intérprete independiente. El más
   conocido es `NodeJS <https://nodejs.org/>`_, cuya instalación tanto en
   *Linux* como en *Windows* es trivial,

   Como para dar los primeros pasos es conveniente aislarse de las dificultades
   añadidas de ejecutar código *Javascript* sobre un documento |HTML|, nos
   conviene conocer cómo probar código directamente en el editor. Para ello:

   #. Instalamos NodeJS_ en nuestro sistema, bien a través del paquete
      facilitado por su página web (*Windows*), bien a través de un paquete de
      distribución (como en el caso de las principales distribuciones de
      *Linux*).

   #. Instalar la extensión `Code Runner
      <https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner>`_,
      que posibilita ejecutar el archivo activo pulsando :kbd:`Ctrl`\ +\
      :kbd:`Alt`\ +\ :kbd:`n` y ver la salida a través la propia ventana de
      salida de *Visual Studio Code*. La ejecución no permite la depuración
      (puntos de ruptura, ejecución paso a paso, etc.), pero para ello ya existe
      :kbd:`F5`.

**Análisis estático**

.. https://code.visualstudio.com/docs/languages/html
   https://marketplace.visualstudio.com/items?itemName=smelukov.vscode-csstree : Probar para CSS
   Mirar tareas y asociación de teclas (¿se puede hacer por espacios de trabajo?)
   https://www.mclibre.org/consultar/htmlcss/otros/vsc-htmlcss-configuracion.html

.. rubric:: Notas al pie

.. [#] La extensión, para no entrar en conflicto, deshabilitó el autocierre
   predeterminado para |HTML| cuando el soporte nativo lo introdujo. Por otra
   parte, la extensión sirve para autocompletar otros lenguajes, así que tal vez
   nos podría interesar añadir más lenguajes a la secuencia.


.. |YAML| replace:: :abbr:`YAML (YAML Ain't Markup Language)`
.. |DTD| replace:: :abbr:`DTD (Document Type Definition)`
.. |CSS| replace:: :abbr:`CSS (Cascading Style Sheets)`
.. |W3C| replace:: :abbr:`W3C (W3 Consortium)`

.. _Brave: https://brave.com
