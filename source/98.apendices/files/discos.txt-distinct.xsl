<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:set="http://exslt.org/sets"
                extension-element-prefixes="set">
 
   <xsl:output method="text" encoding="utf-8"/>
 
   <xsl:template match="discoteca">
      <xsl:text>LISTA DE DISCOS&#10;</xsl:text>
      <xsl:for-each select="set:distinct(disco/@tipo)">
         <xsl:sort select="." />

         <xsl:call-template name="tipo" />
         <xsl:apply-templates select="//disco[@tipo = current()]" />
      </xsl:for-each>
   </xsl:template>
 
   <xsl:template name="tipo">
      <xsl:text>&#10;</xsl:text>
      <xsl:number value="position()" format="1. " />
      <xsl:value-of select="." />
      <xsl:text>&#10;</xsl:text>
   </xsl:template>
 
   <xsl:template match="disco">
      <xsl:number value="position()" format="   a) " />
      <xsl:value-of select="nombre" />
      <xsl:text> (</xsl:text>
      <xsl:value-of select="autor" />
      <xsl:text>)&#10;</xsl:text>
   </xsl:template>
 
</xsl:stylesheet>
