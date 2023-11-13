<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
 
   <xsl:output method="text" encoding="UTF-8"/>
 
   <xsl:template match="discoteca">
      <xsl:text>LISTA DE DISCOS&#10;</xsl:text>
      <xsl:apply-templates select="disco" />
   </xsl:template>
 
   <xsl:template match="disco">
      <xsl:value-of select="position()" />
      <xsl:text>. </xsl:text>
      <xsl:value-of select="nombre" />
      <xsl:text>&#10;</xsl:text>
   </xsl:template>
 
</xsl:stylesheet>
