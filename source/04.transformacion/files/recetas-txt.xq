(
   "Recetas de cocina:",
   for $receta in //receta
   (: Sólo mostramos las recetas complicadas: +3 ingredietes :)
   where count($receta/ingrediente) > 3
   order by $receta/@nombre
   count $num
   return
      (
       "  " || $num || ". " || $receta/@nombre || " (" || $receta/@preparacion || " minutos)",
       for $ingrediente in $receta/ingrediente
       return
         "     * " || $ingrediente/@nombre || " (" || $ingrediente/@cantidad || " " || $ingrediente/@unidad || ")"
      )
)
