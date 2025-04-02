<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
 
   <xsl:output method="text" encoding="utf-8"/>

   <xsl:template match="/">
      <xsl:text>LISTA DE ENTIDADES&#10;&#10;</xsl:text>
      <xsl:apply-templates select="grafico/*" />
   </xsl:template>

   <xsl:template match="punto|circunferencia|recta|rectangulo">
      <xsl:text>- </xsl:text>
      <xsl:apply-templates select="." mode="notacion" />
      <xsl:text>&#10;</xsl:text>
   </xsl:template>

   <xsl:template name="punto" match="punto" mode="notacion">
      <xsl:text>P=(</xsl:text>
      <xsl:value-of select="@x" />
      <xsl:text>, </xsl:text>
      <xsl:value-of select="@y" />
      <xsl:text>)</xsl:text>
   </xsl:template>

   <xsl:template name="circunferencia" match="circunferencia" mode="notacion">
      <xsl:text>C=(</xsl:text>
      <xsl:value-of select="@x" />
      <xsl:text>, </xsl:text>
      <xsl:value-of select="@y" />
      <xsl:text>); R=</xsl:text>
      <xsl:value-of select="@r" />
   </xsl:template>

   <xsl:template name="rectangulo" match="rectangulo" mode="notacion">
      <xsl:text>R=(</xsl:text>
      <xsl:value-of select="@x1" />
      <xsl:text>, </xsl:text>
      <xsl:value-of select="@y1" />
      <xsl:text>)</xsl:text>
      <xsl:text>+(</xsl:text>
      <xsl:value-of select="@x2" />
      <xsl:text>, </xsl:text>
      <xsl:value-of select="@y2" />
      <xsl:text>)</xsl:text>
   </xsl:template>

   <xsl:template name="recta" match="recta" mode="notacion">
      <xsl:text>R=(</xsl:text>
      <xsl:value-of select="@x1" />
      <xsl:text>, </xsl:text>
      <xsl:value-of select="@y1" />
      <xsl:text>)</xsl:text>
      <xsl:text>-(</xsl:text>
      <xsl:value-of select="@x2" />
      <xsl:text>, </xsl:text>
      <xsl:value-of select="@y2" />
      <xsl:text>)</xsl:text>
   </xsl:template>

</xsl:stylesheet>
