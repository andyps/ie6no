# How to use #
```
<script type="text/javascript" src="http://ie6no.org/js/ie6no/ie6no.js" charset="utf-8"></script>
<script type="text/javascript">ie6no({runonload:true});</script>
```
Warning div will be prepend to document body after page load (because _runonload_ is true).

After creating ie6no object you can hide and show warning popup:
```
var warn = ie6no(); //initialization
warn.run(); //create and show popup
warn.hide(); //hide warning
warn.show(); //show warning again
```
If you use _runonload_, you don't have to call run method,
it will be called automatically after page load.

[See available parameters for advanced usage](http://code.google.com/p/ie6no/wiki/Parameters)

Also check [IE6NO site](http://ie6no.org/ie6warnjs.ie6no)