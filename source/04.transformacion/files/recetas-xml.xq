element {fn:local-name(/*)} {(
   /*/@*,
   for $receta in //receta
   return
      element receta {
         $receta/@*,
         for $ingrediente in $receta/ingrediente
         return
            (: En vez de reconstruir de 0 un elemento ingrediente
               tomamos una copia e insertamos y eliminamos :)
            copy $i := $ingrediente
            modify (
               insert node element nombre {data($i/@nombre)} into $i,
               insert node element cantidad {data($i/@cantidad)} into $i,
               delete node $i/@nombre,
               delete node $i/@cantidad
            )
            return $i
      }
)}
