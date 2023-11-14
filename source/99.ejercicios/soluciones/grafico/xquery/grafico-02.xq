declare function local:punto($x, $y) {
   "(" || $x || "," || $y || ")"
};

(
  "Figuras del dibujo",
  for $f in //* 
  return
    if ($f[self::punto]) then
       " - P=" || local:punto($f/@x, $f/@y)
    else if ($f[self::circunferencia]) then
       " - C=" || local:punto($f/@x, $f/@y) || "; R=" || $f/@r
    else
      let $union := if ($f[self::recta]) then "-" else "+"
      return " - R=" || local:punto($f/@x1, $f/@y1) || $union || local:punto($f/@x2, $f/@y2),
  ""
)
