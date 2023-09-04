.. _ut2:

Validación
**********
En la primera parte de la :ref:`unidad anterior <ut1>` introdujimos el concepto
de  :ref:`validez <lm-validez>` e hicimos la distinción entre un documento *bien
formado* (ajustado a las reglas gramaticales generales) y un documento *válido*
(ajustado a las reglas gramaticales específicas). La segunda parte de la unidad
citada nos enseñó cuáles eran las reglas generales de algunas lenguajes y nos
permitió escribir documentos y comprobar que estaban bien formados. Para ello
usamos \"validadores\" (:command:`jsonlint`, :command:`xamllint`, etc.), que no
eran tales, pues sólo informaban de si el documento estaba bien formado.

En esta unidad aprenderemos cómo definir gramáticas específicas y usar
auténticos *validadores* que comprueban si el documento las cumple, esto es,
si son (además de bien formados) válidos. Entiéndase:

Si ha realizado los :ref:`ejercicios propuestos de la unidad anterior <ej-li>`,
ya habrá diseñado bastantes documentos para intercambiar información
a partir de unas especificaciones dadas. Sin embargo, aún no tiene medios para
saber qué el documento de ejemplo que ha escrito se ajusta a la gramática
*mental* que ha desarrollado en su cabeza para cumplir tales especificaciones.
Por ejemplo, la solución |XML| del :ref:`primer ejercicio resuelto
<xml-resueltos>` era esta:

.. dropdown:: Primer ejercicio resuelto

   .. literalinclude:: /01.intro/files/ejxml1.recetas.xml
      :language: xml

Esto implica mucho: que la etiqueda del nodo raíz es :code:`<recetas>` y que
no tiene ninguna propiedad, pero sí varios nodos  :code:`<receta>`  dentro, etc.
¿Cómo podemos comprobar que un |XML| de ejemplo cumple todos estos requisitos
(p.e. que :code:`<recetas>` no tiene propiedades), esto es, que cumple con la
gramática específica que hemos diseñado. El propósito que nos planteamos ahora
implica aprender dos tareas:

#. Escribir esa gramática específica.
#. Utilizar un validador al que se proporcionen documento y gramática, y
   compruebe que el primero cumple la segunda.

Comencemos.

.. toctree:: 
   :caption: Contenidos
   :glob:
   :maxdepth: 2

   [0-9]*

