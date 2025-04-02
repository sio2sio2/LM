<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
 
   <xsl:import href="07-profesores.txt.xsl" />

   <xsl:template match="claustro">
      <xsl:text>PROFESORES ACTIVOS&#10;</xsl:text>
      <xsl:apply-templates select="profesor[not(@sustituto)]">
         <xsl:sort select="apellidos"/>
         <xsl:sort select="nombre"/>
      </xsl:apply-templates>
      <xsl:text>&#10;</xsl:text>
      <xsl:text>PROFESORES SUSTITUIDOS&#10;</xsl:text>
      <xsl:apply-templates select="profesor[@sustituto][@sustituto != @id]">
         <xsl:sort select="apellidos"/>
         <xsl:sort select="nombre"/>
      </xsl:apply-templates>
      <xsl:text>&#10;</xsl:text>
      <xsl:text>PROFESORES SIN SUSTITUTO&#10;</xsl:text>
      <xsl:apply-templates select="profesor[@sustituto = @id]">
         <xsl:sort select="apellidos"/>
         <xsl:sort select="nombre"/>
      </xsl:apply-templates>
   </xsl:template>

</xsl:stylesheet>
