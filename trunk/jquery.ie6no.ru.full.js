/*
    * ie6no (jQuery IE6 Warning Plugin)
    * Version 1.0
    * URL: http://ie6no.org/
    * Description: warning popup for IE6
    * Author: Andrey Pashentsev
    * Copyright: Copyright (c) 2010 Andrey Pashentsev
    * Released under MIT
*/
;(function($) {
    
$.ie6no = function(params) {
    if (typeof(this.fn)!='undefined') {
        return new $.ie6no(params);
    }
    return this._ie6noInit(params);
};
//all private methods and vars are marked with '_', avoid to use them, you should use only public
$.ie6no.prototype = {
    //if you want to set tpl var - set it carefully - this is a html template for warning
    tpl: '<div style="width:728px;height:90px;border:1px solid #ff0000;clear:both;position:relative;overflow:hidden;background-color:#FEAFAF;font-family:Arial,Helvetica,Tahoma,sans-serif;font-size:12px;color:#000;"><div style="position:absolute;right:3px;top:1px;float:right;"><a class="ie6no_close" style="display:none;color:#000;font-size:16px;line-height:16px;font-weight:bold;text-decoration:none;" href="javascript:void(0);">&times;</a></div><div style="margin-top:7px;margin-bottom:7px;"><div style="float:left;margin-top:8px;width:163px;"><img alt="ie6no" src="http://ie6no.org/images/ie6no-small.gif" style="border:none;"/></div><div style="float:left;width:281px;overflow:hidden;"><div style="font-weight:bold;text-align:center;">ВНИМАНИЕ!</div><div style="margin-top:10px;">Используемый вами браузер устарел! Рекомендуется установить один из современных браузеров для удобной работы с сайтом.</div></div><div style="float:left;margin-left:7px;"><a target="_blank" href="http://www.mozilla-europe.org/firefox"><img alt="Get Firefox" style="border:none;" src="http://ie6no.org/images/ie6no-firefox.jpg"/></a></div><div style="float:left;margin-left:5px;"><a target="_blank" href="http://www.microsoft.com/downloads"><img alt="Get IE" style="border:none;" src="http://ie6no.org/images/ie6no-ie.jpg"/></a></div><div style="float:left;margin-left:5px;"><a target="_blank" href="http://www.apple.com/safari/download"><img alt="Get Safari" style="border:none;" src="http://ie6no.org/images/ie6no-safari.jpg"/></a></div><div style="float:left;margin-left:5px;"><a target="_blank" href="http://www.google.com/chrome"><img alt="Get Chrome" style="border:none;" src="http://ie6no.org/images/ie6no-chrome.jpg"/></a></div><div style="float:left;margin-left:5px;"><a target="_blank" href="http://www.opera.com/download"><img alt="Get Opera" style="border:none;" src="http://ie6no.org/images/ie6no-opera.jpg"/></a></div></div></div>',
    //id of target DOM node or DOM node. Warning popup will be prepended to this node
    //by default warning message will be prepended to document body
    target: null,
    //use or no close button, that will close warning
    isCloseBtn: true,
    //className of close button
    //if you define your own template and want to use close button - place the button inside tpl 
    //close button will be searched by this class name!
    closeBtnClass: 'ie6no_close',
    //if true ie6no will execute after page load. Don't use run method in this case
    runonload: false,
    //use or no overlay layer
    isOverlay: false,
    //overlay background color
    overlayBgColor: '#000',
    //overlay opacity from 0 to 100 (the same as in IE)
    overlayOpacity: 30,
    //you can customize z-index value for warning message 
    //if it doesn't show above some elements on your page, but you want it does.
    //this value will be used for overlay layer, for warning div this value + 1 will be used,
    //so if zIndex = 2999, z-index = 3000 will be used for warning div and 2999 will be used for overlay div
    zIndex: 2999,
    info: {
        version: '1.0',
        author: 'Andrey Pashentsev',
        url: 'http://ie6no.org/'
    },
    placeType: 'prepend', //@reserved: will be prepend, append or replace - now only prepend
    _running: false, //@private
    //html template(tpl var) will be inserted into _container node
    _container: null, //@private
    _overlayNode: null,
    _noExe: false,
    //@constructor
    _ie6noInit: function(params) {
        if (this.versionIE()!=6) {
            //will not run if user agent is not IE6 (or we cannot recognize the version)
            this._noExe = true;
            return this;
        }
        if (params!=null) {
            this.target = params.target;
            this.isCloseBtn = (params.isCloseBtn==false)?false:this.isCloseBtn;
            this.isOverlay = params.isOverlay?true:false;
            this.overlayBgColor = typeof(params.overlayBgColor)=='string'?params.overlayBgColor:this.overlayBgColor;
            var opc = parseInt(params.overlayOpacity);
            if (!isNaN(opc)) this.overlayOpacity = opc;
            var z = parseInt(params.zIndex);
            this.zIndex = !isNaN(z)?z:this.zIndex;
            this.runonload = params.runonload?true:false;
            if (typeof(params.closeBtnClass)=='string' && params.closeBtnClass.length)
                this.closeBtnClass = params.closeBtnClass;
            if (typeof(params.tpl)=='string' && params.tpl.length) this.tpl = params.tpl; 
        }
        if (this.runonload) {
            this._setrunonload();
        }
        return this;
    },
    //to make start after page load
    _setrunonload: function() {
        var ths = this;
        $(document).bind('ready', function(){ths.run();});
    },
    _setTarget: function() { 
        this.target = this._byIdOrNode(this.target);
        if (this.target==null) {
            this.target = document.body;
        }
    },
    _setCloseBtn: function() {
        if (!this.isCloseBtn) return false; 
        var clsBtn = $(this._container).find('.'+this.closeBtnClass)[0];
        if (clsBtn) {
            $(clsBtn).show();
            var ths = this;
            clsBtn.onclick = function(){ths.hide();return false;};
        }
    },
    _createContainer: function() {
        this._container = document.createElement('div');
        var jC = $(this._container);
        jC.hide();
        jC.css('zIndex', this.zIndex+1);
        $(this.target).prepend(this._container);
        jC.html(this.tpl);
        jC.find('*').css('zIndex', jC.css('zIndex'));
    },
    _createOverlay: function() {
        if (this.isOverlay) {
            var ovl = document.createElement('div');
            var ovlStl = ovl.style;
            ovlStl.top = ovlStl.left = '0px';
            ovlStl.width = ovlStl.height = '100%';
            ovlStl.backgroundColor = this.overlayBgColor;
            ovlStl.opacity = (this.overlayOpacity/100)+'';
            ovlStl.filter = 'Alpha(opacity='+this.overlayOpacity+')'; //ie
            ovlStl.position = 'absolute';
            ovlStl.zIndex = this.zIndex;
            ovlStl.display = 'none';
            //trick for ie version<7
            if ((this.versionIE()>0) && (this.versionIE()<7)) {
                var ifr = document.createElement('iframe');
                var ifrStl = ifr.style;
                ifrStl.width = ifrStl.height = '100%';
                ifrStl.border = ifrStl.margin = '0px';
                ifr.scrolling = 'no';
                ifrStl.zIndex = ovlStl.zIndex;
                ifrStl.left = ifrStl.top = '0px';
                ifrStl.position = 'absolute';
                ifrStl.opacity = '0'; ifrStl.filter = 'Alpha(opacity=0)';
                ovl.appendChild(ifr);
            }
            document.body.insertBefore(ovl, document.body.firstChild);
            this._overlayNode = ovl;
        } 
    },
    _byIdOrNode: function(idOrNode) {
        if (!idOrNode) return null;
        if (typeof(idOrNode)=='string' && idOrNode.length>0) {
            idOrNode = $('#'+idOrNode)[0];
        } 
        if (typeof(idOrNode)!='undefined') {
            return idOrNode;
        }
        return null;
    },
    //execute and show
    //you can execute ie6no only once
    run: function() {
        if (this._noExe) return this;
        //can be executed only once
        if (this._running) return this;
        this._setTarget();
        this._createContainer();
        this._createOverlay(); 
        this._setCloseBtn();
        this._running = true;
        this.show();
        return this;
    },
    //show message if it is hidden
    show: function() {
        if (!this._running) return;
        $(this._container).show();
        if (this.isOverlay) {//hide overlay
            var ovlStl = this._overlayNode.style;
            ovlStl.display = '';
            ovlStl.width = this.docSize().cw+'px';
            ovlStl.height = this.docSize().ch+'px';
            if (ovlStl.setExpression) {
                try {
                    ovlStl.setExpression("width","$.ie6no.prototype.docSize().cw+'px'");
                    ovlStl.setExpression("height","$.ie6no.prototype.docSize().ch+'px'");
                    ovlStl.setExpression("left","$.ie6no.prototype.docSize().sw+'px'");
                    ovlStl.setExpression("top","$.ie6no.prototype.docSize().sh+'px'");
                } catch(e){
                    //don't supported
                }
            }
        }
    },
    //hide message
    hide: function() {
        if (!this._running) return;
        if (this.isOverlay) $(this._overlayNode).hide();
        $(this._container).hide();
    },
    
    /*** below are usefull functions (cross-browser of course) ***/
    //recognize IE6
    isIE6: function() {
        return (this.versionIE()==6)?true:false;
    },
    //recognize IE version
    //this function will return 0 on failure and if user agent is not IE
    versionIE: function() {
        if ($.browser.msie) {
            var vInfo = window.navigator.appVersion.toUpperCase();
            var m = vInfo.match(/MSIE\s*(\d+)/i);
            if (m && m[1] && !isNaN(parseInt(m[1]))) {
                return parseInt(m[1]);
            }
        }
        return 0;
    },
    //return information about document size, document client size and scroll position
    docSize: function() {
        var s = {w:0,h:0,cw:0,ch:0,sw:0,sh:0};
        if (document.documentElement.scrollWidth<document.body.scrollWidth) {
            s.w = document.body.scrollWidth;
        } else {
            s.w = document.documentElement.scrollWidth;
        }
        if (document.documentElement.scrollHeight<document.body.scrollHeight) {
            s.h = document.body.scrollHeight;
        } else {
            s.h = document.documentElement.scrollHeight;
        }
        if ((this.versionIE()>0) && (this.versionIE()<6)) {
            if (document.documentElement.clientWidth) {
                s.cw = document.documentElement.clientWidth;
                s.ch = document.documentElement.clientHeight;
            } else {
                s.cw = document.body.clientWidth;
                s.ch = document.body.clientHeight;
            }
        } else { 
            if (!this.quirksMode()) {
                s.cw = document.documentElement.clientWidth;
                s.ch = document.documentElement.clientHeight;
            } else {
                s.cw = document.body.clientWidth;
                s.ch = document.body.clientHeight;
            }
        }
        s.sw = document.body.scrollLeft?document.body.scrollLeft:document.documentElement.scrollLeft;
        s.sh = document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop;
        return s;
    },
    //if quirks mode is on (false if standard mode)
    quirksMode: function() { 
        return !(document.compatMode == "CSS1Compat");
    }
};

})(jQuery);