(
   "Clientes del negocio:",
   for $cliente in //cliente
   return
      "  - " || $cliente/nombre || ": " || count(//factura[@cliente = $cliente/@id]) || " facturas.",
   ""
)
