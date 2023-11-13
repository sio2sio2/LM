<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
 
   <xsl:output method="text" encoding="UTF-8"/>
 
   <xsl:key name="tipo" match="disco" use="@tipo" />

   <xsl:template match="discoteca">
      <xsl:text>LISTA DE DISCOS&#10;</xsl:text>

      <xsl:for-each select="disco[. = key('tipo',@tipo)[1]]">
         <xsl:call-template name="tipo" />
         <xsl:apply-templates select="key('tipo', @tipo)" />
      </xsl:for-each>
   </xsl:template>
 
   <xsl:template match="disco">
      <xsl:text>   </xsl:text>
      <xsl:number format="a) " />
      <xsl:value-of select="nombre" />
      <xsl:text> (</xsl:text>
      <xsl:value-of select="autor" />
      <xsl:text>)&#10;</xsl:text>
   </xsl:template>

   <xsl:template name="tipo">
      <xsl:text>&#10;</xsl:text>
      <xsl:number format="1. "/>
      <xsl:value-of select="@tipo" />
      <xsl:text>&#10;</xsl:text>
   </xsl:template>

</xsl:stylesheet>
