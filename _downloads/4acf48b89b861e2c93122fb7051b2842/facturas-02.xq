(
   "Listado de facturas:",
   for $factura in //factura
   return
      "   - " || $factura/@codigo || ": " || //cliente[@id = $factura/@cliente]/nombre || ".",
   ""
)
