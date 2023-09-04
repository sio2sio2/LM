<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
 
   <xsl:output method="text" encoding="utf-8"/>

   <xsl:template match="parques">
      <xsl:text>PARQUES NACIONALES&#10;</xsl:text>
      <xsl:apply-templates select="parque">
         <xsl:sort select="@ca" />
         <xsl:sort select="@provincia" />
         <xsl:sort select="@nombre" />
      </xsl:apply-templates>
   </xsl:template>

   <xsl:template match="parque">
      <xsl:number value="position()" format="1. "/>
      <xsl:value-of select="@nombre" />
      <xsl:text> (</xsl:text>
      <xsl:value-of select="@provincia" />
      <xsl:text>, </xsl:text>
      <xsl:value-of select="@ca" />
      <xsl:text>: </xsl:text>
      <xsl:value-of select="count(especimen[@ref = //especie[@tipo = 'fauna']/@id])" />
      <xsl:text> animales y </xsl:text>
      <xsl:value-of select="count(especimen[@ref = //especie[@tipo = 'flora']/@id])" />
      <xsl:text> plantas.&#10;</xsl:text>
   </xsl:template>

</xsl:stylesheet>
