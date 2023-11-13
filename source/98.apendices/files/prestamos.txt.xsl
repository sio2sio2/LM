<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:exslt="http://exslt.org/common"
                extension-element-prefixes="exslt">
 
   <xsl:import href="discos.txt.xsl" />

   <xsl:variable name="prestados" select="document('prestamos.xml')/prestados/disco/@id" />

   <xsl:template name="disco">
      <xsl:text>   </xsl:text>
      <xsl:choose>
         <xsl:when test="@id = $prestados">
            <xsl:text># </xsl:text>
         </xsl:when>
         <xsl:otherwise>
            <xsl:text>- </xsl:text>
         </xsl:otherwise>
      </xsl:choose>
      <xsl:value-of select="nombre" />
      <xsl:text> (</xsl:text>
      <xsl:value-of select="autor" />
      <xsl:text>)&#10;</xsl:text>
   </xsl:template>
 
</xsl:stylesheet>
