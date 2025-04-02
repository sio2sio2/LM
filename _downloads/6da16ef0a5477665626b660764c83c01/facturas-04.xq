(
   "Coste de las facturas:",
   for $factura in //factura
   return
      "  - " || $factura/@codigo || ": " || sum($factura/item/(@precio * @cantidad)) || "€",
   ""
)
