element {fn:local-name(/*)} {(
    /*/@*,
    //producto,
    element clientes {
      for $cliente in //cliente
      return
         copy $c := $cliente
         modify insert node (
            for $factura in //factura
            where $factura/@cliente = $c/@id
            return
               copy $f := $factura
               modify delete node $f/@cliente
               return $f
         ) into $c
         return $c
    }
)}
