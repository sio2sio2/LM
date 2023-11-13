<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
 
   <xsl:output method="text" encoding="utf-8"/>

   <xsl:template match="discoteca">
      <xsl:text>LISTA DE DISCOS&#10;&#10;</xsl:text>

      <xsl:apply-templates select="disco[not(@tipo = preceding-sibling::disco/@tipo)]" mode="primero" />
   </xsl:template>

   <!-- + tipo_musica: -->
   <xsl:template name="tipo">
      <xsl:text>+ </xsl:text>
      <xsl:value-of select="@tipo" /> 
      <xsl:text>&#10;</xsl:text>
   </xsl:template>

   <xsl:template match="disco" mode="primero">
      <xsl:call-template name="tipo" />
      <xsl:apply-templates select="//disco[@tipo = current()/@tipo]" mode="item" />
   </xsl:template>

   <!--   - nombre (autor)  -->
   <xsl:template match="disco" mode="item">
      <xsl:text>   - </xsl:text>
      <xsl:value-of select="nombre" />
      <xsl:text> (</xsl:text>
      <xsl:value-of select="autor" />
      <xsl:text>)&#10;</xsl:text>
   </xsl:template>
   

</xsl:stylesheet>
