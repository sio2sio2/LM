<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
 
   <xsl:output method="text" encoding="utf-8"/>

   <xsl:template match="/">
      <xsl:text>LISTA DE ENTIDADES&#10;&#10;</xsl:text>
      <xsl:apply-templates select="grafico/*" />
   </xsl:template>

   <xsl:template match="recta|rectangulo|punto|circunferencia">
      <xsl:text>- </xsl:text>
      <xsl:value-of select="local-name()" />
      <xsl:text> (</xsl:text>
      <xsl:value-of select="@id" />
      <xsl:text>)&#10;</xsl:text>
   </xsl:template>

</xsl:stylesheet>
