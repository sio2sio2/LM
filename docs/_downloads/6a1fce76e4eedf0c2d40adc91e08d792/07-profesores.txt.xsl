<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
 
   <xsl:output method="text" encoding="utf-8"/>

   <xsl:template match="claustro">
      <xsl:text>CLAUSTRO DE PROFESORES&#10;</xsl:text>
      <xsl:apply-templates select="profesor">
         <xsl:sort select="apellidos" />
         <xsl:sort select="nombre" />
      </xsl:apply-templates>
   </xsl:template>

   <xsl:template match="profesor">
      <xsl:number value="position()" format="1. " />
      <xsl:value-of select="apellidos" />
      <xsl:text>, </xsl:text>
      <xsl:value-of select="nombre" />

      <xsl:if test="departamento">
         <xsl:text> (</xsl:text>
         <xsl:value-of select="departamento" />
         <xsl:text>)</xsl:text>
      </xsl:if>

      <xsl:text>&#10;</xsl:text>
   </xsl:template>

</xsl:stylesheet>
