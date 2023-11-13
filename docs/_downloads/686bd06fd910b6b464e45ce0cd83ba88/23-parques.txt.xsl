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
      <xsl:text>)&#10;   FAUNA EN ALTO PELIGRO DE EXTINCIÓN&#10;</xsl:text>
      <xsl:apply-templates select="especimen[@ref = //especie[@tipo='fauna'][@peligro='medio']/@id]"/>
      <xsl:text>   FLORA EN ALTO PELIGRO DE EXTINCIÓN&#10;</xsl:text>
      <xsl:apply-templates select="especimen[@ref = //especie[@tipo='flora'][@peligro='medio']/@id]"/>
   </xsl:template>

   <xsl:template match="especimen">
      <xsl:text>   + </xsl:text>
      <xsl:apply-templates select="//especie[@id = current()/@ref]" />
      <xsl:if test="@ejemplares">
         <xsl:text>: </xsl:text>
         <xsl:value-of select="@ejemplares" />
      </xsl:if>
      <xsl:text>&#10;</xsl:text>
   </xsl:template>

   <xsl:template match="especie">
      <xsl:value-of select="cientifico" />
      <xsl:text> (</xsl:text>
      <xsl:value-of select="comun" />
      <xsl:text>)</xsl:text>
   </xsl:template>

</xsl:stylesheet>
