<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:my="urn:miextension"
                extension-element-prefixes="my">
 
   <xsl:include href="random.xsl" />

   <xsl:output method="text" encoding="UTF-8"/>
 
   <xsl:template match="discoteca">
      <xsl:text>LISTA DE DISCOS&#10;</xsl:text>

      <xsl:apply-templates select="disco">
         <xsl:sort select="my:random()" />
      </xsl:apply-templates>
   </xsl:template>
 
   <xsl:template match="disco">
      <xsl:text>- </xsl:text>
      <xsl:value-of select="nombre" />
      <xsl:text> (</xsl:text>
      <xsl:value-of select="autor" />
      <xsl:text>)&#10;</xsl:text>
   </xsl:template>

</xsl:stylesheet>
