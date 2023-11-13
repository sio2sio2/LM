<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:func="http://exslt.org/functions"
                xmlns:date="http://exslt.org/dates-and-times"
                xmlns:my="urn:miextension"
                extension-element-prefixes="func date my">
 
   <!-- devuelve un número pseudoaleatorio
     -  a partir del generate-id() del elemento
     -  (sirve para desordenar un conjunto de nodos) -->
   <func:function name="my:random">
 
      <xsl:variable name="m" select="32768" />
      <xsl:variable name="a" select="1103515245" />
      <xsl:variable name="c" select="12345" />
 
      <xsl:variable name="seconds" select="substring(date:seconds(), 5)" />
      <xsl:variable name="seed" select="concat(substring(generate-id(), 4), $seconds)" />
 
      <func:result select="($seed * $a + $c) mod $m" />
   </func:function>
</xsl:stylesheet>
