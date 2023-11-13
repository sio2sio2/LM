<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
 
   <xsl:output method="text" encoding="UTF-8"/>
 
   <xsl:template match="discoteca">
      <xsl:text>LISTA DE DISCOS&#10;</xsl:text>
      <xsl:apply-templates select="disco">
         <xsl:sort select="@tipo" />
      </xsl:apply-templates>
   </xsl:template>
 
   <xsl:template match="disco">
 
      <xsl:if test="not(preceding-sibling::disco[@tipo = current()/@tipo])">
         <!-- Alternativo "/discoteca/disco[@tipo=current()/@tipo][1] = ." -->
         <xsl:call-template name="tipo" />
      </xsl:if>
 
      <xsl:call-template name="disco" />
   </xsl:template>
 
   <xsl:template name="tipo">
      <xsl:text>&#10;</xsl:text>
      <xsl:text>+ </xsl:text>
      <xsl:value-of select="@tipo" />
      <xsl:text>&#10;</xsl:text>
   </xsl:template>
 
   <xsl:template name="disco">
      <xsl:text>   - </xsl:text>
      <xsl:value-of select="nombre" />
      <xsl:text> (</xsl:text>
      <xsl:value-of select="autor" />
      <xsl:text>)&#10;</xsl:text>
   </xsl:template>

</xsl:stylesheet>
