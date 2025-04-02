for  $f in /grafico/*
let $figura := local-name($f)
group by $figura
order by $figura
count $n
return
   (
    $n || ". " || $figura,
    for $F in $f
    return
      "  - " || $F/@id,
    ""
   )
