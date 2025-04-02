<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
 
   <xsl:import href="03-grafico.txt.xsl" />

   <xsl:key name="entidad" match="punto|circunferencia|recta|rectangulo" use="local-name()" />

   <xsl:template match="/">
      <xsl:text>LISTA DE ENTIDADES&#10;&#10;</xsl:text>
      <xsl:for-each select="grafico/*[key('entidad', local-name())[1]/@id = @id]">
         <xsl:sort select="local-name()" />

         <xsl:call-template name="entidad" />
      </xsl:for-each>
   </xsl:template>

   <xsl:template name="entidad">
      <xsl:number value="position()" format="a) " />
      <xsl:value-of select="local-name()" />
      <xsl:text>: </xsl:text>
      <xsl:value-of select="count(key('entidad', local-name()))" />
      <xsl:text>&#10;</xsl:text>
      <xsl:apply-templates select="key('entidad', local-name())" mode="item" />
      <xsl:text>&#10;</xsl:text>
   </xsl:template>

   <xsl:template match="punto|circunferencia|recta|rectangulo" mode="item">
      <xsl:text>   </xsl:text>
      <xsl:number value="position()" format="1. " />
      <xsl:apply-templates select="." mode="notacion" />
      <xsl:text>&#10;</xsl:text>
   </xsl:template>

</xsl:stylesheet>
