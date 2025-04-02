.. _lm-ut6:
.. _html:

|HTML|
******
Cuando Internet ya contaba con unos veinte años de vida, esto es, alrededor de
1990, `Tim Berners-Lee`_ tuvo la brillante idea (aunque ya había habido
anteriormente propuestas como la del `proyecto Xanadú`_) de concebir un sistema
distribuido de documentos interconectados entre sí. Los documentos en papel,
aunque relacionados, no están conectados entre sí; lo más que pueden hacer es
incluir referencias bibliográficas, pero el lector que desee tomarse la molestia
de consultar las referencias, deberá acudir a una biblioteca o una librería. En
cambio, la idea de Tim Berners-Lee es vincular unos documentos con otros
mediante el uso del **hipervínculo**, que es lo que comúnmente llamamos
:dfn:`enlace` o :dfn:`link`. Gracias a él, el lector no tiene más que seguir el
enlace (esto es, pinchar sobre él) para ser redirigido al documento
referenciado, que puede encontrarse en otro ordenador conectado en la parte
opuesta del globo. A toda esta red entrelazada de documentos distribuidos la
denominó :dfn:`World Wide Web`, esto es, *telaraña mundial*, cuyo acrónimo es el
archiconocido |WWW|; y al texto que contiene hipervínculos, :dfn:`hipertexto`\
[#]_.

.. note:: El uso del prefijo griego "*hiper*\ -" se debe a que los matemáticos lo
   usan en Geometría_ para referirse a objetos definidos en espacios de más de tres
   dimensiones. Por ejemplo, una hiperesfera_ es una esfera definida en un espacio
   n-dimensional. Por analogía, el *hipertexto* es un texto que transciende las
   dimensiones habituales del texto tradicional.

Para llevar a término esta empresa Tim Berners-Lee hizo cuatro cosas:

#. Idear un protocolo de comunicación, |HTTP|, para que un cliente sea capaz de
   pedirle un documento de *hipertexto* al servidor en que se encuentra alojado.

#. Crear el primer cliente, o sea el primer navegador web, al que llamó
   WorldWideWeb_, renombrado después como :program:`Nexus` para evitar
   confusiones con el concepto homónimo.

#. Crear el primer servidor web, denominado httpd_.

#. Crear el lenguaje en que se escriben los documentos de hipertexto, el |HTML|-

De todas estas tecnologías, la que interesa desarrollar para el objeto del tema
es la del |HTML|. Este lenguaje, en principio, se creó como dialecto |SGML|,
aunque el consorcio que en 1994 fundo Tim Berners-Lee para el desarrollo de las
tecnologías web, el |W3C|, pretendió hacerlo converger hacia el |XML|. De hecho
fue este mismo consorcio el que publicó en 1999 las especificaciones del |XML|.
para restringir las libertades que permitía el |SGML| y facilitar la creación de
procesadores de documentos. Lo que es en la actualidad |HTML| lo trataremos
:ref:`más adelante <html-vers>`.

El tema básicamente tratará:

* De introducir qué es el |HTML| y con qué tecnologías se encuentra comúnmente
  asociado.

* De dar un pequeño conocimiento de cómo se escriben los documentos |HTML| (en
  su versión 5) y cuáles son sus principales elementos. En cambio, las reglas de
  cómo deben visualizarse estos, esto es, |CSS|, se dejarán para un :ref:`tema
  posterior <css>`.

.. toctree:: 
   :caption: Contenidos
   :maxdepth: 2
   :glob:

   [0-9]*

.. seealso:: Para conocer los aspectos más destacados del protocolo |HTTP| y
   cómo se configura un servidor web, puede consultar :ref:`estos otros apuntes
   <linux:web>`.

.. rubric:: Enlaces de interés

* `Guía bastante completa en castellano de los elementos HTML`_.
* `Referencia a algunos elementos de HTML5`_
* `Norma viva de HTML5`_
* `HTMHell`_, página que recoge recetas de malas y de buenas prácticas.

.. _Guía bastante completa en castellano de los elementos HTML: http://lenguajehtml.com/p/html/
.. _Referencia a algunos elementos de HTML5: https://html5andcss3.org/html5history.php
.. _Norma viva de HTML5: https://html.spec.whatwg.org/multipage/
.. _HTMHell: https://www.htmhell.dev/

.. rubric:: Notas al pie

.. [#] El término de **hipertexto** proviene del ya citado `Proyecto Xanadú`_.

.. |WWW| replace:: :abbr:`WWW (World Wide Web)`
.. |W3C| replace:: :abbr:`W3C (W3 Consortium)`
.. |HTTP| replace:: :Abbr:`HTTP (HiperText Transfer Protocol)`
.. |SGML| replace:: :abbr:`SGML (Standard Generalized Markup Language)`
.. |CSS| replace:: :abbr:`CSS (Cascading Style Sheets)`

.. _Tim Berners-Lee: http://es.wikipedia.org/wiki/Tim_Berners-Lee
.. _proyecto Xanadú: http://es.wikipedia.org/wiki/Proyecto_Xanad%C3%BA
.. _Geometría: https://es.wikipedia.org/wiki/Geometr%C3%ADa
.. _hiperesfera: https://es.wikipedia.org/wiki/N-esfera
.. _WorldWideWeb: https://es.wikipedia.org/wiki/WorldWideWeb
.. _httpd: https://en.wikipedia.org/wiki/CERN_httpd
