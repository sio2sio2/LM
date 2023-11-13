<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
 
   <xsl:import href="discos.txt.xsl" />
 
   <xsl:template name="disco">
      <xsl:variable name="tipo" select="@tipo" />
      <xsl:number count="//disco[@tipo = $tipo]" format="   1. " />
      <xsl:value-of select="nombre" />
      <xsl:text> (</xsl:text>
      <xsl:value-of select="autor" />
      <xsl:text>)&#10;</xsl:text>
   </xsl:template>

</xsl:stylesheet>
