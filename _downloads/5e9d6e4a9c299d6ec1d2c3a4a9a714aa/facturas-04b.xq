(
   "Coste de las facturas:",
   for $factura in //factura
   return
      concat("  - ", $factura/@codigo, ": ", sum(
         for $item in $factura/item
         return
            $item/@precio * $item/@cantidad
      ), "€"),
   ""
)
