<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
 
   <xsl:output method="text" encoding="UTF-8"/>

   <xsl:key name="prestamo" match="prestamo" use="@lector"/>

   <xsl:template match="biblioteca"> 
      <xsl:text>LISTA DE LECTORES&#10;</xsl:text>
      <xsl:apply-templates select="socios/lector[count(key('prestamo', @registro)) > 1]">
         <xsl:sort select="count(key('prestamo', @registro))" data-type="number"/>
      </xsl:apply-templates>
   </xsl:template>

   <xsl:template match="lector">
      <xsl:number value="position()" format="1. " />
      <xsl:value-of select="nombre" />
      <xsl:text> (</xsl:text>
      <xsl:value-of select="dni" />
      <xsl:text>)&#10;</xsl:text>
   </xsl:template>

</xsl:stylesheet>
