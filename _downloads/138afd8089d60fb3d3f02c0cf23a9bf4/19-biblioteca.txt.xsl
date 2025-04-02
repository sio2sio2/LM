<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
 
   <xsl:output method="text" encoding="UTF-8"/>

   <xsl:key name="prestamo" match="prestamo" use="@ejemplar"/>

   <xsl:template match="biblioteca"> 
      <xsl:text>LISTA DE LIBROS&#10;</xsl:text>
      <xsl:apply-templates select="catalogo/libro">
         <xsl:sort select="-count(key('prestamo', ejemplares/ejemplar/@codigo))" data-type="number"/>
      </xsl:apply-templates>
   </xsl:template>

   <xsl:template match="libro">
      <xsl:number value="position()" format="1. "/>
      <xsl:value-of select="nombre"/>
      <xsl:text>: </xsl:text>
      <xsl:variable name="prestamos" select="key('prestamo', ejemplares/ejemplar/@codigo)" />
      <xsl:value-of select="count($prestamos)"/>
      <xsl:text> préstamos&#10;</xsl:text>
      <xsl:apply-templates select="$prestamos">
         <xsl:sort select="@fecha" />
      </xsl:apply-templates>
   </xsl:template>

   <xsl:template match="prestamo">
      <xsl:text>   </xsl:text>
      <xsl:number value="position()" format="1. "/>
      <xsl:value-of select="//lector[@registro = current()/@lector]/nombre" />
      <xsl:text>&#10;</xsl:text>
   </xsl:template>

</xsl:stylesheet>
