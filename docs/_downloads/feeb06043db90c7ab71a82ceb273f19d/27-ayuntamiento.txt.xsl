<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
 
   <xsl:output method="text" encoding="utf-8"/>

   <xsl:template match="habitantes">
      <xsl:text>PERSONAS CON PADRES CONOCIDOS&#10;</xsl:text>
      <xsl:apply-templates select="persona[@padre or padre][@madre or madre]">
         <xsl:sort select="apellidos" />
         <xsl:sort select="nombre" />
      </xsl:apply-templates>
   </xsl:template>

   <xsl:template match="persona">
      <xsl:number value="position()" format="1. "/>
      <xsl:value-of select="apellidos" />
      <xsl:text>, </xsl:text>
      <xsl:value-of select="nombre" />
      <xsl:text>(hijo de </xsl:text>
      <xsl:choose>
         <xsl:when test="padre">
            <xsl:value-of select="padre" />
         </xsl:when>
         <xsl:otherwise>
            <xsl:value-of select="//persona[@id = current()/@padre]/nombre" />
         </xsl:otherwise>
      </xsl:choose>
      <xsl:text> y </xsl:text>
      <xsl:choose>
         <xsl:when test="madre">
            <xsl:value-of select="madre" />
         </xsl:when>
         <xsl:otherwise>
            <xsl:value-of select="//persona[@id = current()/@madre]/nombre" />
         </xsl:otherwise>
      </xsl:choose>
      <xsl:text>)&#10;</xsl:text>
   </xsl:template>

</xsl:stylesheet>
