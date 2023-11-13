<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
 
   <xsl:output method="text" encoding="utf-8"/>

   <xsl:template match="concesionario">
      <xsl:text>LISTA DE COCHES&#10;</xsl:text>
      <!-- count() > 1 -->
      <xsl:apply-templates select="modelo">
         <xsl:sort select="marca" />
         <xsl:sort select="potencia" />
      </xsl:apply-templates>
   </xsl:template>
   
   <xsl:template match="modelo">
      <xsl:number value="position()" format="1. " />
      <xsl:value-of select="@nombre" />
      <xsl:text>: </xsl:text>
      <xsl:value-of select="cv" />
      <xsl:text> cv&#10;</xsl:text>
   </xsl:template>

</xsl:stylesheet>
