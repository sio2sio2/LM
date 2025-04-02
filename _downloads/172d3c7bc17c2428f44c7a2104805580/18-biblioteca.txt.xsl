<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
 
   <xsl:output method="text" encoding="UTF-8"/>

   <xsl:template match="biblioteca"> 
      <xsl:text>LISTA DE LIBROS&#10;</xsl:text>
      <xsl:apply-templates select="catalogo/libro">
         <xsl:sort select="año" data-type="number"/>
      </xsl:apply-templates>
   </xsl:template>

   <xsl:template match="libro">
      <xsl:number value="position()" format="1. "/>
      <xsl:value-of select="nombre"/>
      <xsl:text>: </xsl:text>
      <xsl:value-of select="count(ejemplares/ejemplar)"/>
      <xsl:text> ejemplares&#10;</xsl:text>
   </xsl:template>

</xsl:stylesheet>
