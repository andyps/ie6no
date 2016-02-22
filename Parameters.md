# Parameters list #

  * target
id of target DOM node or DOM node; warning popup will be prepended to this node; by default warning div will be prepend to document body
  * runonload (true or false)
it can be used, if you want to show popup after page load
  * isOverlay (true or false)
use or not overlay background
  * overlayBgColor
color of overlay background, e.g. #eeeeee
  * overlayOpacity
yes, this is overlay opacity from 0 (completely transparent background) to 100 (completely opaque background)
  * isCloseBtn (true or false)
true if show close button, if such button exists in html template for warning
  * closeBtnClass
class name of close button; if you define your own template and want to use close button - place the button inside tpl; close button will be searched by this class name!
  * zIndex
> basic value of z-index - this value will be used for overlay layer, for warning div this value + 1 will be used; zIndex can be used if warning shows above some elements on your page, but you don't want that, so you need increase this value
  * tpl
> if you want to set tpl var - set it carefully - this is a html template for warning