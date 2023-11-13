<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
 
   <xsl:import href="discos.txt.xsl" />
 
   <xsl:template name="tipo">
      <xsl:text>&#10;</xsl:text>
      <xsl:text>+ </xsl:text>
      <xsl:value-of select="@tipo" />
      <xsl:text> </xsl:text>
      <xsl:choose>
         <xsl:when test="@tipo = 'clasica'">
            <xsl:text>(para muy tradicionales)</xsl:text>
         </xsl:when>
         <xsl:when test="@tipo = 'jazz'">
            <xsl:text>(para tradicionales)</xsl:text>
         </xsl:when>
         <xsl:when test="@tipo = 'rock'">
            <xsl:text>(para modernillos)</xsl:text>
         </xsl:when>
         <xsl:otherwise>
            <xsl:text>(para vaya usted a saber quién)</xsl:text>
         </xsl:otherwise>
      </xsl:choose>
      <xsl:text>&#10;</xsl:text>
   </xsl:template>
 
</xsl:stylesheet>
