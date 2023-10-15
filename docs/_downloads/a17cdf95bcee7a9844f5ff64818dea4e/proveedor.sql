CREATE TABLE "Proveedor" (
   "id"                INTEGER  PRIMARY KEY,
   "nombre"            VARCHAR(100) NOT NULL,
   "contacto"          JSON
);

INSERT INTO "Proveedor" VALUES
   (1, 'Helados Babuino',
    '{"tlfo":956010203,"web":"https://www.tuproveedordeconfianza.com/","mail":"clientes@tuproveedordeconfianza.com","domicilio":{"tipo_via":"calle","via":"Callo","número":25,"escalera":2,"piso":1,"cp":11001,"localidad":"Cádiz","provincia": 11}}'),
   (2, 'Central de Chucherías',
   '{"tlfo":952112233,"domicilio":{"tipo_via":"avenida","via":"Mayúscula","numero": 25,"cp":29002,"localidad":"Málaga", "provincia": 29}}');
