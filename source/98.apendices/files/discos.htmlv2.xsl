<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
 
   <xsl:output method="xml" version="1.0" encoding="UTF-8"
               doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN"
               doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"
               indent="yes" />
 
   <xsl:template match="discoteca" name="html">
      <html>
         <xsl:call-template name="head" />
         <xsl:call-template name="body" />
      </html>
   </xsl:template>
 
   <xsl:template name="head">
      <head>
         <title>Discos de mi fonoteca</title>
      </head>
   </xsl:template>
 
   <xsl:template name="body">
      <body>
         <xsl:call-template name="table" />
      </body>
   </xsl:template>
 
   <xsl:template name="table">
      <table>
         <caption>Discos</caption>
         <tr><th>Tipo</th><th>Nombre</th><th>Autor</th></tr>
         <xsl:apply-templates select="disco">
            <xsl:sort select="@tipo" />
         </xsl:apply-templates>
      </table>
   </xsl:template>
 
   <xsl:template match="disco">
      <tr>
         <xsl:if test="/discoteca/disco[@tipo=current()/@tipo][1] = ." >
            <xsl:element name="td">
               <xsl:attribute name="rowspan">
                  <xsl:value-of
select="count(/discoteca/disco[@tipo=current()/@tipo])" />
               </xsl:attribute>
               <xsl:value-of select="@tipo" />
            </xsl:element>
         </xsl:if>
         <td><xsl:value-of select="nombre" /></td>
         <td><xsl:value-of select="autor" /></td>
      </tr>
   </xsl:template>
 
</xsl:stylesheet>
