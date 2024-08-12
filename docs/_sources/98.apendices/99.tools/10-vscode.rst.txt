.. _vscode:

Visual Studio Code
******************
Es un editor de texto, con innumerables extensiones, especialmente diseñado para
la escritura de código, y con versiones para los principales sistemas
operativos. Esta disponible para su descarga gratuita en `su página web
<https://code.visualstudio.com/>`_ y su código fuente en `su página de github
<https://github.com/microsoft/vscode>`_.

Generalidades
=============
.. _vscode-language:

**Idioma**
   Si la instalación trae el programa en inglés, puede instalarse el paquete de
   nuestra lengua pulsando :kbd:`Ctrl`\ +\ :kbd:`Shift`\ +\ :kbd:`P` (o
   seleccionando ``File>Preferences>Settings``) y escribiendo la palabra
   *display* para reducir los términos de búsqueda:

   .. image:: files/00-vscode-lang.png

   .. note:: El idioma es, en realidad, una :ref:`extensión <vscode-extensions>` que
      se habilita al realizar esta operación.

**Áreas especiales**
   Podemos abrir algunas áreas especiales que nos permiten consultar o realizar
   ciertas actividades interesantes:

   * :kbd:`Ctrl`\ +\ :kbd:`Shift`\ +\ :kbd:`P`, abre un pequeño cuadro que nos
     permite introducir instrucciones.
   * :kbd:`Ctrl`\ +\ :kbd:`Shift`\ +\ :kbd:`M`, abre en la parte inferior una
     consola que muestra los errores derivados de una determinada acción. Por
     ejemplo, los errores de validación.

Personalización
===============
El entorno es muy, muy configurable y permite alterar su comportamiento
mediante la manipulación de varios aspectos cuya descripción se almacena en
archivos de configuración |JSON|:

+ Los :ref:`parámetros de configuración <vscode-config>` propiamente dichos
  (:file:`settings.json`).
+ Las :ref:`extensiones <vscode-extensions>` (:file:`extensions.json`).
+ Las :ref:`tareas <vscode-tasks>` (:file:`tasks.json`).
+ La :ref:`depuración <vscode-launch>` (:file:`launch.json`).
+ Las asociaciones a teclas o atajos de teclado (:file:`keybindings.json`).

**Niveles de personalización**
   Además, estas personalizaciones podemos hacerlas a dos niveles:

   .. _vscode-profile:

   **Perfiles**
      El nivel superior de configuración es el "perfil", cada uno de los cuales
      se corresponde con un distinto *perfil de desarrollador*. Esto es debido a
      que, cuando programamos por ejemplo en *Python*, no necesitamos
      exactamente el mismo entorno de desarrollo que cuando programamos en
      *Javascript*. En consecuencia necesitaremos unas extensiones distintas,
      unas preferencias distintas, etc. :program:`Visual Studio Code` nos
      permite lidiar con estas diferencias, permitiendo crear distintos
      perfiles, que escogeremos a voluntad dependiendo qué pretendamos
      desarrollar.

      En principio, existe unicamente un perfil "Predeterminado" ("Default", si
      usamos el original inglés), que se identifica porque aparece en la esquina
      inferir izquierda una ruedecita dentada como icono asociado a este
      perfil:

      .. image:: files/predeterminado.png

      Pulsando sobre el icono podemos cambiar de perfil o crear uno nuevo:

      .. image:: files/predeterminado2.png

      Para crear tenemos dos estrategias:

      + Crear uno o bien de cero o bien copiando otro ya existente.
        En este segundo caso, se nos permitirá elegir de forma grosera qué
        aspectos queremos excluir de la copia.

        .. image:: files/crear_perfiles.png

      + En caso de que queramos ser más específicos al escoger los aspectos que
        queremos transladar de un perfil ya existente, podemos escoger
        "Mostrar los contenidos del perfil"  y señalar aquello que queremos
        transferir al nuevo perfil. El resultado será un archivo
        :file:`.profile`, que puede importarse luego a fin de crear el nuevo
        perfil.

      Al crear un nuevo perfil puede asociarse un icono identificativo, lo que
      nos ayuda a saber siempre de un vistazo qué perfil estamos utilizando.
 
      Los archivos |JSON| que caracterizan el perfil se almacenan bajo la ruta
      :file:`$CONFIG/Code/User/profiles`, donde ``$CONFIG`` es la localización
      donde el sistema operativo almacena las configuraciones de programas:

      + En Linux, :file:`$XDG_CONFIG` (habitualmente, :file:`~/.config`).
      + En Windows, :file:`%APPDATA%`.

   .. _vscode-workspace:

   **Áreas de trabajo**
      El segundo nivel de personalización son las áreas de trabajo que podemos
      asimilarlas a los *proyectos*: para desarrollar un proyecto de *Python*
      crearé un área de trabajo sobre un directorio.

      .. image:: files/01-vscode-abrir.png

      Las áreas de trabajo también se pueden personalizar, de modo que la
      personalización que disfrutemos al trabajar será la suma de la que hayamos
      hecho para el perfil que estamos usando más la que apliquemos al área de
      trabajo. De hecho, :program:`Visual Studio Code` recuerda el perfil que se
      usó la última vez que se estuvo trabajando sobre un área de trabajo a fin
      de que cuando abramos un área, se cambie automáticamente de perfil. Por
      ejemplo, si trabajando sobre un proyecto de Java (área de trabajo), para
      el que lógicamente tendremos activo el perfil de Java, decidimos cambiar
      de proyecto y acceder

      Los archivos |JSON| de personalización del área de trabajo se almacenan
      dentro del subdirectorio :file:`.vscode/` incluido en la carpeta raíz del
      área de trabajo.

      .. todo:: Tratar las área de trabajo de múltiples directorios.

   La estrategia, pues, para la personalización es tener distintos perfiles, uno
   para cada uno de los distintos tipos de desarrollo que pretendamos hacer.
   Para cada proyecto concreto, definiremos un área de trabajo distinta la cual
   podremos o no personalizar en un segundo nivel de concreción:

      .. image:: files/perfiles_areas.png

   .. seealso:: Véanse más adelante los :ref:`vscode-start`.

.. _vscode-config:

**Configuración**
   Para modificar parámetros de configuración podemos pulsar :kbd:`Ctrl`\ +\
   :kbd:`,`:

   .. image:: files/02-vscode-conf.png

   Este tipo de personalización puede hacerse tanto a nivel de perfil como de
   área de trabajo. Como alternativa, podemos directamente editar los
   :file:`settings.json` correspondientes.

.. _vscode-extensions:

**Extensiones**
   Las extensiones permiten aumentar las funcionalidades del programa  y se
   instalan sólo a nivel de *perfil*. Ahora bien, su activación (o
   desactivación) sí puede hacerse a nivel de *área de trabajo*.

   Una indispensable para quien se haya criado editando archivos en `vim
   <https://www.vim.org/>`_ es `VSCodeVim
   <https://marketplace.visualstudio.com/items?itemName=vscodevim.vim>`_, que
   permite editar archivos como se hace en el veterano editor.

   Para gestionar las extensiones, basta con pinchar sobre el icono lateral
   izquierdo  señalado:

   .. image:: files/03-vscode-ext.png

   Dentro de las extensiones existe un tipo especial de ellas denominado
   :dfn:`paquete de extensiones` (*Extension Pack*), que no es más que una
   extensión cuya instalación (o desinstalación) supone la instalación de varias
   extensiones conjuntas. Por ejemplo, `Extension Pack for Java
   <https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack>`_
   instala hasta seis extensiones que facilitan el trabajo con *Java*\ [#]_.

.. _vscode-atajos:

**Atajos de teclado**
   A nivel de perfil (y no de área de trabajo), el programa ofrece la
   posibilidad de asociar combinaciones de teclas a las distintas tareas
   definidas. Las asociaciones se puede hacer de distintos modos:

   .. rst-class:: simple

   + Pulsando :kbd:`Ctrl`\ +\ :kbd:`Shift`\ +\ :kbd:`P` para abrir el diálogo
     que permite ejecutar tareas y, en vez de ejecutarla, pulsar sobre la
     ruedecilla dentada asociada:

     .. image:: files/task-addkeybinding.png

   + Pulsando :kbd:`Ctrl`\ +\ :kbd:`k`\ -\ :kbd:`Ctrl`\ +\ :kbd:`s` para ver la
     lista de asociaciones a tareas y buscar en ella la tarea que nos interese.

   + Editar directamente el archivo :file:`keybindings.json` del perfil. Lo más
     cómodo, en vez de buscarlo en el sistema de archivos, es acceder a la lista
     de asociaciones que se acaba de citar, y pulsar aquí:

     .. image:: files/addkeybinding.png

     El archivo contiene un array en que cada *ítem* es una de esas
     asociaciones. Más adelante se sugerirán algunos.

   .. seealso:: La ayuda oficial del programa tiene `una buena explicación
      sobre estos atajos <https://code.visualstudio.com/docs/getstarted/keybindings>`_.

.. _vscode-tasks:

**Tareas**
   El programa permite definir *tareas de usuario* tanto a nivel de perfil como
   a nivel de área de trabajo editando los respectivos :file:`tasks.json`. El
   segundo es fácil de editar (se debe crear bajo el subdirectorio
   :file:`.vscode`), mientras que para lo primero lo más conveniente es pulsar
   :kbd:`Ctrl`\ +\ :kbd:`Shift`\ +\ :kbd:`P` y buscar la orden `Abrir tareas de
   usuario`:

   .. image:: files/usertasks.png

   Una vez abierto el archivo, deben definirse la tareas en formato |JSON|. Por
   ejemplo, para abrir el archivo activo en el navegador :program:`Brave`
   deberíamos definir una tarea así:

   .. code-block:: json

      {
          "version":"2.0.0",
          "tasks": [
              {
                  "label": "Abrir en Brave",
                  "type": "shell",
                  "command": "brave-browser",
                  "windows":  { "command": "C:\\Program Files\\Brave Software\\etc..." },
                  "args": [ "${file}" ],
                  "presentation": {"reveal": "never"},
                  "problemMatcher": []
              }
          ]
      }

   La etiqueta (``label``) nos sirve para identificar la tarea y ``command`` y
   ``args`` para definir cuál es la aplicación externa  que abriremos y con qué
   parámetros se ejecutará. Pueden también definirse campos específicos para
   sistemas específicos concretos como en el ejemplo se hace para dar soporte
   también a *Windows*.

   .. seealso:: Para ver cuáles son las variables que pueden usarse (como ``${file}`` en el
      ejemplo), consúltese `Variables Reference
      <https://code.visualstudio.com/docs/editor/variables-reference>`_ de la
      documentación oficial.

   Para ejecutar la tarea habrá que volver a abrir el cajetín para ejecutar
   ordenes y buscar `Ejecutar tarea`:

   .. image:: files/runtask.png

   Aparecerá a continuación la lista de tareas definidas y podemos ejecutar
   la que deseemos. Una alternativa más cómoda es asociarle un :ref:`atajo de
   teclado <vscode-atajos>`:

   .. code-block:: json

      [
          {
              "key": "ctrl+l b",
              "command": "workbench.action.tasks.runTask",
              "args": "Abrir en Brave"
          }
      ]

   En este caso, se abrirá Brave_ al pulsar :kbd:`Ctrl`\ +\ :kbd:`l`\ -\
   :kbd:`b`.


   .. seealso:: Para más información, consulte `cómo crear tareas
      <https://code.visualstudio.com/docs/editor/tasks>`_.

.. _vscode-launch:

**Depuración**
   :program:`Visual Studio Code` también está preparado para permitir la
   ejecución y depuración de código con las técnicas habituales de ejecución
   paso a paso, puntos de ruptura, puntos de ruptura condicionales, etc. Para
   ello es necesario dotarlo de soporte para la depuración del lenguaje de
   programación concreto en el que queramos hacer nuestros desarrollos. Esto se
   logra instalando las extensiones de depuración propias de cada lenguaje
   (`Debugger for Java`_, `Javascript Debugger
   <https://marketplace.visualstudio.com/items?itemName=ms-vscode.js-debug-nightly>`_,
   `Python Debugger
   <https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy>`_,
   etc).

   De inicio, sin configuración adicional, podremos establecer puntos de
   ruptura, etc. usando el editor y podremos ejecutar sin más pulsando
   :kbd:`Ctrl`\ +\ :kbd:`F5` y ejecutar depurando pulsando :kbd:`F5`.

   También es posible la depuración abriendo la barra lateral para ello:

   .. image:: files/debug.png

   En esa barra podrá escogerse, en caso de existir varios, el mecanismo de
   ejecución; y podrán vigilarse y manipularse los valores de las variables
   durante la depuración.

   .. seealso:: A la configuración básica citada, se le puede añadir otra
      adicional dentro de :file:`.vscode/launch.json`, cuyos principios pueden
      leerse en el artículo `Working with VSCode launch configurations
      <https://gigi.nullneuron.net/gigilabs/working-with-vs-code-launch-configurations/>`_.

   .. seealso:: Para aprender a depurar lea el artículo `Debugging
      <https://code.visualstudio.com/docs/editor/debugging>`_ de la
      página oficial.

.. _vscode-start:

Preliminares
============
Antes de empezar cualquier configuración específica a un lenguaje determinado es
conveniente preparar en el :ref:`perfil Predeterminado <vscode-profile>` todo
aquellas configuraciones que deseemos que sean universales independientemente de
la herramienta que utilicemos. En particular, nos puede interesar:

+ La :ref:`configuración del idioma <vscode-language>`.
+ Los aspectos relacionados con el editor (tamaño de la fuente, `emulación
  de vim <https://marketplace.visualstudio.com/items?itemName=vscodevim.vim>`_).
+ Los atajos generales de teclado.
+ La instalación de extensiones que consideremos útiles para todos o gran parte
  de los perfiles (p.e. alguna relativa a `Github`_). En caso de que alguna no
  sea útil para todos, podemos tenerla deshabilitada para perfiles específicos.

Definido a nuestro gusto este perfil, podemos exportarlo a un archivo; e
importarlo como base de cada nuevo perfil que creemos para hacer desarrollos
con una herramienta determinada. En particular, para este curso nos interesará
crear perfiles independientes para:

#. :ref:`XML <vscode-xml>`.
#. :ref:`JSON <vscode-json>`.
#. :ref:`YAML <vscode-yaml>`.
#. :ref:`HTML/CSS <vscode-html>`.
#. Desarrollo *web*, que consistirá en añadir al perfil anterior, configuración
   apropiada para desarrollar en :ref:`Javascript <vscode-javascript>`.

Integración con Git
===================
Un aspecto fundamental del desarrollo de aplicaciones es tener un adecuado
control de versiones. Si decidimos usar Git_, :program:`Visual Studio Code` nos
proporcionará una excelente integración.

Requisitos
----------
Previamente, sin embargo, necesitaremos:

* Tener instalado :deb:`git` en el sistema.
* Tener creada una cuenta en Github_.

Inicialización
--------------
Cumplido eso podemos partir de dos comienzos distintos para convertir el espacio de trabajo en un repositorio de Git también:

#. Definir el control de versiones en un espacio de trabajo que antes careciera
   de él.
#. Clonar un repositorio ya existente para constituir con su contenido un espacio de
   trabajo.

Para **lo primero** basta abrir un área de trabajo y, ya con el área abierta,
pinchar sobre el icono de "bifurcación de ruta" que se puede ver a la izquierda:

.. image:: files/git-init.png

Hecho esto, si el espacio de trabajo carecía de control de versiones, nos dará
la posibilidad de iniciarlo\ [#]_ y crear un *commit* inicial (el campo nos
permite indicar con qué mensaje queremos identificarlo):

.. image:: files/git-vi.png

.. caution:: El *commit* necesita realizarse bajo una identidad. Si no hay
   definida ninguna en el archivo de configuración de *Git*
   (:file:`~/gitconfig` en *Linux* o :file:`%USERPROFILE%\.gitconfig` en
   *Windows*) la acción no se llevará a cabo, así que tendremos que realizarla
   antes:

   .. code-block:: ini

      [user]
         name = "Perico de los Palotes"
         email = "perico@example.com"

Si, además, queremos sincronizar con un repositorio de *Github*, deberemos volver
a pinchar sobre el icono de "bifurcación de ruta" y escoger *Publicar la rama*:

.. image:: files/git-push.png

En este caso, deberemos validarnos con nuestra cuenta (en caso de que no lo
hubiéramos hecho antes) y escoger el nombre para el nuevo repositorio:

.. image:: files/git-name.png

.. caution:: El programa atiende a lo que se haya indicado en la configuración
   de git (*Linux* la almacena en :file:`~/.gitconfig`), si es que el usuario ya
   ha usado y configurado anteriormente :program:`git` fuera de :program:`Visual
   Studio Code`. Si este es el caso y, además, queremos utilizar un **usuario
   distinto** podemos hacer lo siguiente:

   #. Llevar a cabo todos los desarrollos con este programa bajo un mismo
      directorio (pongamos que :file:`~/Programacion/VSCode`).

   #. Utilizar la `configuración condicional
      <https://github.blog/2017-05-10-git-2-13-has-been-released/#conditional-configuration>`_
      para modificar qué usuario realiza cambios y de qué forma se gestionan las
      credenciales. Así en :file:`~/.gitconfig` podemos escribir:

      .. code-block:: ini

         [user]
            name = Yo cuando uso Git
            email = cuenta1@example.com
         [credential]
            # Supongamos que usamos OAuth
            helper = "cache --timeout=7200"
            helper = oauth
         [includeIf "gitdir:~/Documentos/VSCode/"]
            path = ~/Documentos/VSCode/.gitconfig

      Y en :file:`~/Documentos/VSCode/.gitconfig`:

      .. code-block:: ini

         [credential]
            # helper es acomulativo y dejarlo en blanco,
            # borra las configuraciones anteriores.
            # Por tanto, Visual Studio Code se encarga de la autenticación.
            helper =
         [user]
            name = Yo cuando uso vscode
            email = cuenta2@example.com

La otra opción para comenzar es **clonar un repositorio** para lo cual no
tenemos más que declarar nuestro propósito y especificar cuál es la dirección
del repositorio:

.. image:: files/git-clone.png

En este caso, podemos escribir directamente la dirección del repositorio (como
se observa en la captura) o pinchar sobre "Clonar desde GitHub" para identificarnos
con un usuario. En este segundo caso (o si ya hubiéramos estado identificados
previamente), se sustituirá esa leyenda por la lista de repositorios del usuario
y podremos elegirlos directamente.

Sincronización
--------------
Una vez que tengamos asociado el directorio local con un repositorio remoto, el
programa será capaz de marcarnos qué archivos hemos cambiado respecto a la
versión del último *commit*, nos lo mostrará en el propio editor e incluso
podremos consultar en qué consiste ese cambio y revocarlo:

.. image:: files/git-mod.png

Con el soporte nativo para *Git* de :program:`Visual Studio Code` sólo podremos
hacer comparaciones entre la última versión moficiada y la última confirmada
(*commit*). Sin embargo, si instalamos la extensión `Gitlens
<https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens>`_ podremos
hacer estas comparaciones con todas las versiones anteriores:

.. image:: files/git-gitlens.png

Otra circunstancia con la que nos podemos encontrar es que un área de trabajo
que ya tenemos asociada a un repositorio remoto, quede desfasada y queramos,
antes de comenzar a programar, sincronizarla para que quede en el estado más
avanzado del repositorio. Para ello, simplemente, podemos hacer un "*pull*" tal
como haríamos manualmente con :program:`git`:

.. image:: files/git-pull.png

Existe, no obstante, la posibilidad de ejecutar periódicamente un :code:`git
fetch` si configuramos:

.. code-block:: json

   {
        "git.autofetch": true,
        "git.autofetchPeriod": 1800000
   }

en que la segunda opción indica la frecuencia con la que se hace la comprobación
(500 horas, o sea, nunca). Esto provoca que al abrir el programa se compruebe si
ha habido algún cambio en el respositorio desde la última vez que accedimos al
área de trabajo y ya no se vuelva a realizarcomprobación más mientras estamos
trabajando\ [#]_:

.. image:: files/git-fetch.png

.. note:: La captura muestra directamente lo que se ve en la barra lateral
   izquierda cuando pulsamos el icono de *Git* (*bifurcación de ruta*). Sin
   embargo, antes de pulsar, podemos conocer que existen cambios en el
   repositorio remoto, porque en la barra de estado de la parte inferior se verá
   que hay cambios pendientes (en este caso, 1 de bajada y ninguno de subida).

Ramas
-----
El soporte nativo también nos permite tratar con ramas, cambiar entre ellas y
mezclarlas de forma bastante intuitiva. En la parte izquierda de la barra
inferior de estado podemos ver en qué rama estamos trabajando y, si pulsamos
sobre ella, se nos abrirá un cuadro para escoger otra rama entre las existentes
o crear una nueva:

.. image:: files/git-branch.png

Para otras operaciones, como mezclar ramas, habría que acudir al menú de la
sección de control de versiones:

.. image:: files/git-branch-menu.png

Perfiles de desarrollo
======================

.. _vscode-xml:

|XML|
-----
Para manipular documentos |XML| es recomendable instalar algunas extensiones:

.. list-table:: Extensiones recomendadas
   :class: vscode-extensions
   :header-rows: 0

   * - `XML de RedHat`_
     - Facilita la edición de documentos |XML| (cierre de etiquetas, etc.) y
       la validación con |DTD| y |XSD|.
   * - `XML Tools`_
     - Proporciona soporte para *XPath* y *XQuery*.

La comprobación de que el documento es bien formado, además de otras
funcionalidades como cerrar automáticamente la etiqueta que se acaba de abrir,
se puede lograr instalando la extensión `XML de RedHat
<https://marketplace.visualstudio.com/items?itemName=redhat.vscode-xml>`_.

Esa misma extensión también permite la validación con |DTD| si se define
correctamente la :ref:`declaración de tipo de documento <dtd-doctype>`. Ahora
bien, por defecto, la extensión no atiende las definiciones hechas en un |DTD|
referido desde otro |DTD| mediante una :ref:`entidad parámetro <dtd-ent-par>`,
lo que malogra una gramática que queramos hacer modular. Puede corregirse
esto ajustando a verdadera la opción ``xml.validation.resolveExternalEntities``:

.. code-block:: json

  {
    "xml.validation.resolveExternalEntities": true
  }

Para evaluar expresiones *XPath* o *XQuery* podemos valernos de la extensión
`XML Tools`_ que a su vez para lo segundo requiere que se haya instalado
:ref:`BaseX`:

.. rst-class:: simple

#. Instalar previamente :ref:`BaseX`.
#. Configurar la extensión `XML Tools`_ para que use *BaseX* como procesador.
   Para ello, necesitamos editar la configuración y añadir:

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

Una vez bien configurada, el modo de ejecutar consultas es el siguiente:

*XPath*
   a. Estando activo el |XML| para el que queremos hacer consulta o pulsamos
      :kbd:`Ctrl`\ +\ :kbd:`Shift`\ +\ :kbd:`P` y ejecutamos `XML Tools:
      Evaluate XPath`, o bien, pulsamos directamente :kbd:`Ctrl`\ +\ :kbd:`Alt`\
      +\ :kbd:`Shift`\ +\ :kbd:`X` (atajo de teclado que predefine la propia
      extensión). 
   #. Escribimos en el cuadro de diálogo la expresión y se verá el resultado de
      la consulta en el área adicional de salida (`output`).

   .. caution:: El evaluador devuelve siempre cadenas, no nodos; por lo que si
      la expresión debe devolver nodos, eliminará todas las etiquetas.

*XQuery*
   a. Creamos un archivo :file:`.xq` con el código de *XQuery*.
   #. Estando activo este archivo, pulsamos :kbd:`Ctrl`\ +\ :kbd:`Shift`\ +\
      :kbd:`P` y ejecutamos `XML Tools: Execute Query`.
   #. Si hay varios |XML| en el directorio se nos preguntará sobre cuál
      queremos hacer la consulta, y, si hemos incluido, la opción :kbd:`-o` en
      la configuración (tal como se ha sugerido antes), se nos pedirá confirmar
      el archivo de salida. Si no la incluimos, la salida se volcará
      directamente en una subventana.
   #. Abrimos el archivo de salida para consultar el resultado.

   Para simplificar su ejecución, podemos :ref:`asignar una atajo de teclado
   <vscode-atajos>` a esta tarea:

   .. code-block:: json

      [
         {
            "key": "ctrl+shift+alt+z",
            "command": "xmlTools.executeXQuery"
         }
      ]

.. _vscode-json:

|JSON|
------
El editor tiene soporte nativo, por lo que, en principio, no necesita extensiones
para que podamos trabajar cómodamente con este formato. De hecho, nos señalará
sin configuración adicional si el documento |JSON| que editamos no es bien
formado.  También es capaz de validarlo, pero habremos de proporcionarle el
esquema mediante configuración. Incluso podemos **formatear** correctamente el
archivo (sangrados, etc.) pulsando :kbd:`Ctrl`\  +\ :kbd:`Shift`\ +\ :kbd:`I`.

.. caution:: Por la naturaleza de esta configuración, es probable que nos
   interese hacerla para un área de trabajo, no un perfil complento.

Para ello debemos abrir la configuración
(:kbd:`Ctrl`\ +\ :kbd:`,`) y acceder a la extensión para |JSON|, una de cuyas
configuraciones es ``JSON: Schemas``:

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
|URL| absoluta (con :file:`file:///etc.`), pero dado que la |URL| base es la
propia carpeta del proyecto, hemos preferido una |URL| relativa. 

.. _vscode-yaml:

|YAML|
------
A diferencia de lo que ocurre con |JSON|, el soporte para |YAML| no es nativo,
así que es preciso instalar extensiones.

.. list-table:: Extensiones recomendadas
   :class: vscode-extensions
   :header-rows: 0

   * - `YAML de RedHat <https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml>`_
     - Da soporte para |YAML| (*buenformidad*, validación, etc.).

Si, además, queremos confrontarlo con un esquema |JSON| para validarlo, entonces
requeriremos configuración adicional que relacione los archivos con su esquema
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

.. caution:: Como en el caso anterior, estas asociaciones son configuración
   propia del área de trabajo.

.. _vscode-html:

|HTML|/|CSS|
------------
Como en el caso del formato |JSON|, :program:`Visual Studio Core` tiene soporte
nativo para |HTML|, de manera que es capaz de proporcionarnos sugerencias o
autocompletado sin configuración adicional. Sin embargo, podemos afinar un poco
para ampliar las facilidades con algunas extensiones:

.. list-table:: Extensiones recomendadas
   :class: vscode-extensions
   :header-rows: 0

   * - `Auto Close Tag`_ 
     - Afina el cierre de etiquetas.
   * - `W3C Web Validator`_
     - Comprueba cómodamente la validez de los documentos |HTML| y |CSS|.
   * - `Live Preview`_
     - Previsualiza el documento.

.. _vscode-html-close:

**Cierre de etiquetas**
   Ya existe soporte para ello, pero si somos de aquellos a los que gusta no cerrar
   las etiquetas que no necesitan cierre, puede resultarnos molesta que esta
   funcionalidad se aplique siempre. La extensión nativa, desgraciadamente, no
   tiene posibilidad de definir excepciones, pero otras externas, sí. Así que
   nuestra propuesta es instalar y habilitar la extensión `Auto Close Tag`_ y
   hacer una pequeña configuración para deshabilitar el cierre nativo y
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
   Para ello una buena extensión es `W3C Web Validator`_
   que comprueba la validez con los validadores que ofrece el |W3C|:

   .. image:: files/validacionHTML.png

   En la parte inferior (la remarcada en rojo) aparecerá una leyenda cada vez
   que tengamos activo un archivo |HTML| o |CSS| que nos permite validar el
   documento. En caso de errores, podremos consultarlos en la venta de errores
   (:kbd:`Ctrl`\ +\ :kbd:`Shift`\ +\ :kbd:`M`).

.. _vscode-html-visu:

**Visualización**
   Otra funcionalidad interesante es la de poder previsualizar la página. Para
   ello tenemos varias **alternativas**:

   `Live Preview`_ (recomendada)
     Extensión que mostrará el icono señalado en la captura:

     .. image:: files/livepreview.png

     La consecuencia de pinchar sobre el icono es ésta:

     .. image:: files/livepreview2.png

     es decir, se crea un pequeño servidor web y mediante él se sirve la página
     en un navegador empotrado. Además, podremos seguir escribiendo y las
     modificaciones se realizarán en vivo.

     .. note:: Si deseamos ver la página en un navegador externo, podemos
        copiar en él la |URL| que vemos en el empotrado. Los cambios también se
        reflejarán en vivo.

   `Live Server <https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer>`_
     Extensión parecida a la anterior, pero que muestra la página directamente
     en el navegador predeterminado del sistema.

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

     .. note:: En nuestra humilde opinión, es más cómoda la extensión anterior
        y, si hay necesidad de utilizar un navegador externo, tampoco supone
        excesivo trabajo copiar la |URL|.

   **Configuración manual**
     Consiste en no utilizar ninguna extensión adicional y, simplemente, mapear
     alguna combinación de teclas para que abra el |HTML| en el navegador de
     nuestra elección. No es una solución equivalente a las dos anteriores,
     puesto que en este caso no se crea ningún servidor web local, sino que el
     documento |HTML| se abre como archivo local. Para los propósitos de este
     curso en que nos limitamos a aprender a escribir páginas estáticas, es
     probable que no nos percatemos de la diferencia. Para poner en práctica
     esta alternativa debemos repetir exactamente el :ref:`ejemplo con el que
     ilustramos cómo crear tareas <vscode-tasks>`.

.. _vscode-javascript:

Javascript
----------
Al igual que :ref:`ocurre con JSON <vscode-javascript>`, el programa tiene
soporte nativo para la escritura de :ref:`Javascript <js>`
(autocompletado, `snippets <https://es.wikipedia.org/wiki/Snippet>`_), pese a lo cual podemos hacer algunos añadidos
para mejorarla:

.. list-table:: Extensiones recomendadas
   :class: vscode-extensions
   :header-rows: 0

   * - `Javascript (ES6) code snippets <https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets>`_
     -  Añade *snippets* adicionales.
   * - `JS CodeFormer <https://marketplace.visualstudio.com/items?itemName=cmstead.js-codeformer>`_
     - Mejora la capacidad nativa para la refactorización.
   * - `ESLint <https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint>`_
     - Permite integrar el `analizador estático de código ESLint
       <https://eslint.org/>`_.

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
   *Linux* como en *Windows* es trivial.

   Como para dar los primeros pasos es conveniente aislarse de las dificultades
   añadidas de ejecutar código *Javascript* sobre un documento |HTML|, nos
   conviene conocer cómo probar código directamente en el editor. Para ello:

   #. Instalamos NodeJS_ en nuestro sistema, bien a través del paquete
      facilitado por su página web (*Windows*), bien a través de un paquete de
      distribución (como en el caso de las principales distribuciones de
      *Linux*).

      .. _code-runner:

   #. Usar la `extensión Code Runner
      <https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner>`_,
      que posibilita ejecutar el archivo activo pulsando :kbd:`Ctrl`\ +\
      :kbd:`Alt`\ +\ :kbd:`n` y ver la salida a través la propia ventana de
      salida de :program:`Visual Studio Code`. La ejecución no permite la
      depuración (puntos de ruptura, ejecución paso a paso, etc.), pero para
      ello ya existe :kbd:`F5`.

**Análisis estático**

.. https://code.visualstudio.com/docs/languages/html
   https://marketplace.visualstudio.com/items?itemName=smelukov.vscode-csstree : Probar para CSS
   Mirar tareas y asociación de teclas (¿se puede hacer por espacios de trabajo?)
   https://www.mclibre.org/consultar/htmlcss/otros/vsc-htmlcss-configuracion.html

.. _vscode-java:

Java
----
.. caution:: El desarrollo con *Java* nada tiene que ver con los propósitos del
   módulo de *Lenguaje de marcas*, pero incluiremos aquí algunas sugerencias
   aprovechando este pequeño mini manual.

Obviamente, para programar en *Java*, sea con :program:`Visual Studio Code` o
con cualquier otro |IDE|, debemos tener instalado |JDK| (o sea, el *paquete de
desarrollo para Java*). Lo más juicioso en este caso es usar la versión
desarrollada por OpenJDK_, que publica para distintas plataformas y sistemas
operativos. En los sistemas *Linux* sus versiones son las versiones de
referencia\ [#]_, así que podremos instalarla mediante el sistema de paquetería;
mientras que en *Windows* podemos utilizar los instalables que nos ofrece
`Adoptium <https://adoptium.net/>`_.

.. table:: Extensiones recomendadas
   :class: vscode-extensions

   +-----------------------------------------+---------------------------------------------------------------------------------------+
   | `Language Support for Java by Red Hat`_ |                                                                                       |
   +-----------------------------------------+---------------------------------------------------------------------------------------+
   | `Project Manager for Java`_             | Facilita la gestión de proyectos de Java, permitiendo directamente la creación de un  |
   |                                         | proyecto, que es un área de  trabajo con una estructura básica ya definida y una      |
   |                                         | configuración básica.                                                                 |
   +-----------------------------------------+---------------------------------------------------------------------------------------+
   | `Debugger for Java`_                    | Permite depurar los programas de Java (puntos de ruptura, ejecución condicional,      |
   |                                         | ejecución paso a paso, etc.                                                           |
   +-----------------------------------------+---------------------------------------------------------------------------------------+
   | `Test Runner for Java`_                 | Permite ejecutar casos de prueba.                                                     |
   +-----------------------------------------+---------------------------------------------------------------------------------------+
   | `IntelliCode`_                          | Proporciona sugerencias basadas en |IA|                                               |
   +-----------------------------------------+---------------------------------------------------------------------------------------+

.. caution:: :ref:`Code Runner <code-runner>` es absolutamente prescindible, ya que al tener
   instalada `Debugger for Java`_ podemos ejecutar los desarrollos pulsando
   :kbd:`Ctrl`\ +\ :kbd:`F5`.
   Además, :ref:`Code Runner <code-runner>` no atenderá a la jerarquía de  directorios creados por
   `Project Manager for Java`_.

Además de estas extensiones puede interesarnos añadir configuración adicional:

.. code-block:: json

   {
      "files.exclude": {
         "bin/": true,           // No vemos el directorio de compilaciones (Project Manager)
         // "**/*.class": true   // Interesante si usáramos Code Runner
      },
      // Evita los inlay hints para los parámetros de las funciones.
      "editor.inlayHints.enabled": "off"
   }

Además, durante la codificación puede interesarnos hacer alguna prueba
individual de cómo funciona método a través de la consola interactiva `JShell
<https://docs.oracle.com/en/java/javase/22/jshell/introduction-jshell.html>`_.
Podemos, por supuesto, abrir una terminal (:kbd:`Ctrl`\ +\ :kbd:`\``) y escribir
directamente la orden en ella, pero sin duda es más cómodo :ref:`crear una tarea
<vscode-tasks>` y asociarla a una :ref:`combinación de teclas <vscode-atajos>`.
La tarea podemos definirla con este código |JSON|:

.. code:: json

   {
      "label": "Shell para Java",
      "type": "shell",
      "command": "jshell",
      "windows": {
         "command": "${env:JAVA_HOME}\\bin\\jshell.exe"
      },
      "presentation": {
         "reveal": "always",
         "panel": "new"
      },
      "problemMatcher": []
   }

y la asociación a la combinación :kbd:`Ctrl`\ +\ :kbd:`Shift`\ +\ :kbd:`J` de
este modo:

.. code-block:: json

   {
      "key": "ctrl+shift+j",
      "command": "workbench.action.tasks.runTask",
      "args": "Shell para Java"
   }


**Creación del proyecto**
   Para comenzar un proyecto, en vez de abrir directamente un área de trabajo,
   lo mejor es *crear un nuevo proyecto* a través de la extensión `Project Manager
   for Java`_, lo que definirá directamente en la nueva área de trabajo esta estructura:

   .. code-block:: none

      +- .vscode
      |     +-- settings.json
      |
      +- bin
      +- lib
      +- src
      |    +-- App.java
      |
      + README.md

   En :file:`settings.json` se creará la configuración necesaria para que la
   ejecución y depuración a través del :ref:`depurador <vscode-launch>` espere
   que nuestro código se encuentre bajo :file:`src/` y el *bytecode* se genere
   bajo :file:`bin/`. Este último directorio, sin embargo, ni siquiera lo
   veremos si añadimos al perfil la configuración sugerida anteriormente. Por
   supuesto podemos cambiar el nombre `App` si no nos convence.

   Si, además, queremos utilizar :kbd:`F5` y :kbd:`Ctrl`\ +\ :kbd:`F5` sin
   necesidad de que el archivo activo sea :file:`App.java` podemos crear un
   :file:`launch.json`\ [#]_:

   .. code-block:: json

      {
          "version": "0.2.0",
          "configurations": [
              {
                  "type": "java",
                  "name": "App",
                  "request": "launch",
                  "mainClass": "App"
              },
              {
                  "type": "java",
                  "name": "App (assert)",
                  "request": "launch",
                  "mainClass": "App",
                  "vmArgs": "-ea"
              }
          ]
      }

   En este caso, hemos definido dos mecanismos de ejecución. La diferencia entre
   ambos es que el segundo comprobará las `aserciones
   <https://es.wikipedia.org/wiki/Aserci%C3%B3n_(inform%C3%A1tica)>`_.

.. rubric:: Notas al pie

.. [#] Cuatro de las cuales sí instalaremos de forma individual nosotros.
.. [#] O sea, de que internamente se haga el equivalente a un :code:`git init`
   que deberíamos ejecutar nosotros si realizáramos a mano esta acción.
.. [#] Lo cual es útil si es un proyecto personal que sólo desarrollamos
   nosotros. Si hay otros desarrolladores trabajando, quizás sea más conveniente
   que no deshabilitemos la comprobación periódica (por defecto, el valor es 180
   segundos). Por tanto, quizás la primera línea de configuración es útil a
   nivel de perfil, pero la segunda debería ser más propia del nivel de área de
   trabajo.
.. [#] La extensión, para no entrar en conflicto, deshabilitó el autocierre
   predeterminado para |HTML| cuando el soporte nativo lo introdujo. Por otra
   parte, la extensión sirve para autocompletar otros lenguajes, así que tal vez
   nos podría interesar añadir más lenguajes a la secuencia.
.. [#] En *Debian*, por ejemplo, los paquetes :deb:`default-jre` y
   :deb:`default-jdk` apuntan a los paquetes creados con el *software* de
   OpenJDK_.
.. [#] El :file:`launch.json` predeterminado de `Debugger for Java`_ es como el
   que hemos propuesto pero con:

   .. code-block:: json

      "mainClass": "${file}"

   de ahí que se espere encontrar activo el archivo que contiene la clase
   principal.

.. |YAML| replace:: :abbr:`YAML (YAML Ain't Markup Language)`
.. |DTD| replace:: :abbr:`DTD (Document Type Definition)`
.. |XSD| replace:: :abbr:`XSD (XML Schema Definition)`
.. |CSS| replace:: :abbr:`CSS (Cascading Style Sheets)`
.. |W3C| replace:: :abbr:`W3C (W3 Consortium)`
.. |IDE| replace:: :abbr:`IDE (Integrated Development Environment)`
.. |JDK| replace:: :abbr:`JDK (Java Development Kit)`
.. |IA| replace:: :abbr:`IA (Inteligencia Artificial)`

.. _Brave: https://brave.com
.. _XML Tools: https://marketplace.visualstudio.com/items?itemName=DotJoshJohnson.xml
.. _Auto Close Tag: https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag
.. _W3C Web Validator: https://marketplace.visualstudio.com/items?itemName=CelianRiboulet.webvalidator
.. _Live Preview: https://marketplace.visualstudio.com/items?itemName=ms-vscode.live-server
.. _Project Manager for Java: https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-dependency
.. _Debugger for Java: https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-debug
.. _Test Runner for Java: https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-test
.. _Language Support for Java by Red Hat: https://marketplace.visualstudio.com/items?itemName=redhat.java
.. _OpenJDK: https://openjdk.org/
.. _IntelliCode: https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode
.. _Github: https://github.com
.. _Git: https://git-scm.com
