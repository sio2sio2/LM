<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
 
   <xsl:output method="text" encoding="utf-8"/>

   <xsl:key name="entidad" match="recta|rectangulo|punto|circunferencia" use="local-name()" />

   <xsl:template match="/">
      <xsl:text>LISTA DE ENTIDADES&#10;</xsl:text>
      <xsl:for-each select="grafico/*[key('entidad', local-name())[1]/@id = @id]">
         <xsl:sort select="local-name()" />

         <xsl:text>&#10;</xsl:text>
         <xsl:call-template name="entidad" />
         <xsl:apply-templates select="key('entidad', local-name())" />
      </xsl:for-each>
   </xsl:template>

   <xsl:template name="entidad">
      <xsl:number value="position()" format="1. " />
      <xsl:value-of select="local-name()" />
      <xsl:text>:&#10;</xsl:text>
   </xsl:template>   

   <xsl:template match="recta|rectangulo|punto|circunferencia">
      <xsl:text>   - </xsl:text>
      <xsl:value-of select="@id" />
      <xsl:text>&#10;</xsl:text>
   </xsl:template>

</xsl:stylesheet>
