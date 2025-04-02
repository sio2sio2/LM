<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
 
   <xsl:output method="text" encoding="utf-8"/>

   <xsl:template match="facturacion">
      <xsl:text>LISTA DE CLIENTES&#10;</xsl:text>
      <xsl:apply-templates select="clientes/cliente">
         <xsl:sort select="nombre" />
      </xsl:apply-templates>
   </xsl:template>
   
   <xsl:template match="cliente">
      <xsl:number value="position()" format="1. " />
      <xsl:value-of select="nombre" />
      <xsl:text> (</xsl:text>
      <xsl:value-of select="dni" />
      <xsl:text>)&#10;</xsl:text>
   </xsl:template>

</xsl:stylesheet>
