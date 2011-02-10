@version 1.0

1. *********************************************************
Warning popup for outdated versions of IE (<7)

Simple example: 
<script type="text/javascript">ie6no({runonload:true});</script>
Warning div will be prepend to document body after page load.

Example of manual starting:
ie6no().run();

After creating ie6no object you can hide and show warning popup:
var warn = ie6no(); //initialization
warn.run(); //create and show popup
warn.hide(); //hide warning
warn.show(); //show warning again

If you use the first simple example, don't call run method,
it will be called automatically after page load.

2. *********************************************************
Parameters that can be used to customize popup in current version:

target: 
        id of target DOM node or DOM node; warning popup will be prepended to 
        this node;
        by default warning div will be prepend to document body
runonload (true or false):
                           see first example; it can be used, if you want 
                           to show popup after page load;
isOverlay (true or false):
                            use or not overlay background;
overlayBgColor:
                color of overlay background, i.e. #eeeeee;
overlayOpacity: 
                yes, this is overlay opacity from 0(completely 
                transparent background) to 100(completely opaque background);
isCloseBtn (true or false):
                            true if show close button, if such button exists
                            in html template for warning;
closeBtnClass:
               class name of close button;
               if you define your own template and want to use close 
               button - place the button inside tpl;
               close button will be searched by this class name!
zIndex:
        basic value of z-index - this value will be used for overlay layer, 
        for warning div this value + 1 will be used;
        zIndex can be used if warning shows above some elements on your page, 
        but you don't want that, so you need increase this value;
tpl: 
     if you want to set tpl var - set it carefully - this is 
     a html template for warning.

*********************************************************
All questions, comments and proposals, please send on
feedback@ie6no.org. Thanks.
*********************************************************