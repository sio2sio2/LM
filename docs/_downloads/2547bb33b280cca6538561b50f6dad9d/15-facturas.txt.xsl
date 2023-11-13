<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
 
   <xsl:output method="text" encoding="utf-8"/>

   <xsl:template match="facturacion">
      <xsl:text>LISTA DE FACTURAS&#10;</xsl:text>
      <xsl:apply-templates select="factura">
         <xsl:sort select="@fecha" />
      </xsl:apply-templates>
   </xsl:template>
   
   <xsl:template match="factura">
      <xsl:number value="position()" format="1. " />
      <xsl:value-of select="@codigo" />
      <xsl:text> (</xsl:text>
      <xsl:value-of select="@fecha" />
      <xsl:text>):&#10;</xsl:text>
      <xsl:apply-templates select="item">
         <xsl:sort select="//producto[@codigo = current()/@producto]/@nombre" />
      </xsl:apply-templates>
   </xsl:template>

   <xsl:template match="item">
      <xsl:text>   + </xsl:text>
      <xsl:value-of select="//producto[@codigo = current()/@producto]/@nombre" />
      <xsl:text>: </xsl:text>
      <xsl:value-of select="@cantidad" />
      <xsl:text>&#10;</xsl:text>
   </xsl:template>

</xsl:stylesheet>
