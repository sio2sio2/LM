element {fn:local-name(/*)} {(
    /*/@*,
    //producto,
    <clientes>
    {
      for $cliente in //cliente
      return
         <cliente>
            {(
               $cliente/@*,
               $cliente/*,
               for $factura in //factura
               where $factura/@cliente = $cliente/@id
               return
                  <factura>
                  {(
                     $factura/@*[local-name() != "cliente"],
                     $factura/*
                  )}
                  </factura>
            )}
         </cliente>
    }
    </clientes>
)}
