<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
 
   <xsl:output method="text" encoding="utf-8"/>

   <xsl:template match="parques">
      <xsl:text>FAUNA&#10;</xsl:text>
      <xsl:apply-templates select="especie[@tipo = 'fauna']" />
      <xsl:text>FLORA&#10;</xsl:text>
      <xsl:apply-templates select="especie[@tipo = 'flora']" />
   </xsl:template>

   <xsl:template match="especie">
      <xsl:number value="position()" format="1.  "/>
      <xsl:value-of select="cientifico" />
      <xsl:text> (</xsl:text>
      <xsl:value-of select="comun" />
      <xsl:text>):&#10;</xsl:text>
      <xsl:apply-templates select="//parque/especimen[@ref = current()/@id]" />
   </xsl:template>

   <xsl:template match="especimen">
      <xsl:text>   + </xsl:text>
      <xsl:apply-templates select=".." />
      <xsl:if test="@ejemplares">
         <xsl:text> -- </xsl:text>
         <xsl:value-of select="@ejemplares" />
         <xsl:text> ejemplares</xsl:text>
      </xsl:if>
      <xsl:text>&#10;</xsl:text>
   </xsl:template>

   <xsl:template match="parque">
      <xsl:value-of select="@nombre" />
      <xsl:text> (</xsl:text>
      <xsl:value-of select="@provincia" />
      <xsl:text>, </xsl:text>
      <xsl:value-of select="@ca" />
      <xsl:text>)</xsl:text>
   </xsl:template>

</xsl:stylesheet>
