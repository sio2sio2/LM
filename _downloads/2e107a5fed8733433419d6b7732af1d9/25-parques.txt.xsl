<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
 
   <xsl:output method="text" encoding="utf-8"/>

   <xsl:template match="parques">
      <xsl:text>LISTA DE ANIMALES EN ALTO PELIGRO DE EXTINCIÓN&#10;</xsl:text>
      <xsl:apply-templates select="especie[@tipo = 'fauna'][@peligro = 'medio']" />
   </xsl:template>

   <xsl:template match="especie">
      <xsl:number value="position()" format="1.  "/>
      <xsl:value-of select="cientifico" />
      <xsl:text> (</xsl:text>
      <xsl:value-of select="comun" />
      <xsl:text>): </xsl:text>
      <xsl:value-of select="sum(//especimen[@ref = current()/@id]/@ejemplares)"/>
      <xsl:text>&#10;</xsl:text>
   </xsl:template>

</xsl:stylesheet>
