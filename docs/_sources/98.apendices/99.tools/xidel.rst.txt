.. _xidel:

Xidel
=====
La principal ventaja de usarlo frente a :ref:`xmlstarlet <xmlstarlet>` es que
podremos probar expresiones *XPath* 3.1.

Hay dos modos distintos de usarlo:

* Si el resultado es texto:

  .. code-block:: console

     $ xidel -s -e '//profesor[1]/@id' casilleros.xml
     p1

  donde "``-s``" evita mensajes de información innecesarios, y "``-e``" introduce
  la expresión *XPath*.

* Si el resultado es un nodo o un conjunto de nodos, es necesario añadir
  ``--printed-node-format=xml``:

  .. code-block:: console

     $ xidel --printed-node-format=xml -s -e '//profesor/apelativo' casilleros.xml

.. note:: El programa no permite validar el documento, por lo que cabría la
   posibilidad de preguntarse si actúa o no en modo de compatibilidad con
   *XPath* 1.0. No existe ninguna opción al respecto, pero  por el modo en el
   que actúa, si no se especifica, parece actuar en modo semejante al de
   compatibilidad y, si se añade la opción ``--strict-type-checking``, cambia.
