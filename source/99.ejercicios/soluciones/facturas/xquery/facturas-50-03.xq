xquery version "3.0"; 

(: Este copy se usa para que la solución no altere el documento de origen,
   sino una copia en memoria y se genere un documento XML nuevo. Así no es
   necesario que haya una base de datos. :)
copy $facturacion := /facturacion
modify (
   (: Modificación del inventario :)
   for $tipo in ("superreducido", "reducido", "normal")
   let $productos := $facturacion//producto[@iva = $tipo]
   return (
      (: No es posible asegurar el orden de las operaciones, por lo que
         no podemos asegurar que la eliminación de @iva en $productos se
         haga antes que su adición a grupo. Por eso hacemos la copia $p. :)
      insert node element grupo {
         attribute iva {$tipo},
         (: No podemos copiar varios nodos, así que creamos uno que incluya
            todos los que queremos copiar :)
         copy $p := <p>{$productos}</p>
         modify (delete node $p//@iva)
         return $p/producto (: Estos productos no tiene el atributo iva :)
      } into $facturacion/inventario,
      delete node $productos
   ),
   (: Traslado de las facturas a cada cliente :)
   for $cliente in $facturacion//cliente
   let $facturas := $facturacion/factura[@cliente = $cliente/@id]
   return (
      (: De nuevo, no es posible asegurar el orden de las operaciones,
         así que necesitamos copiar facturas :)
      insert node (
         copy $f := <f>{$facturas}</f>
         modify (delete node $f//@cliente)
         return $f/factura
      ) into $cliente,
      delete node $facturas
   )
)
return
   $facturacion
