/* ===================================================
 * bootstrap-transition.js v2.1.1
 * http://twitter.github.com/bootstrap/javascript.html#transitions
 * ===================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

/* =========================================================
 * bootstrap-modal.js v2.1.1
 * http://twitter.github.com/bootstrap/javascript.html#modals
 * =========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */

/* ===========================================================
 * bootstrap-tooltip.js v2.1.1
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

/* ===========================================================
 * bootstrap-popover.js v2.1.1
 * http://twitter.github.com/bootstrap/javascript.html#popovers
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */

define("text!apps/flyout-form/js/templates/modal-shell.html",[],function(){return'<div class="modal hide fade" id="myModal" role="dialog" tabindex="-1">\n\t<div class="page-header">\n\t\t<h2 class="medium"><\!-- Contact a Dealer --\></h2>\n\t\t<span class="page-header-sub"><\!-- Choosing your new Toyota is the easy part. Let us help you with the rest. --\></span>\n\t</div>\n\n\t<div class="close_btn" data-dismiss="modal"><a href="#" class="btn btn-gray small" data-dismiss="modal"><i class="icon-close-small"></i></a></div>\n\n\t<div class="modal-body">\n\t\t<p>Modal Body.</p>\n\t</div>\n</div>'});
define("plugin/bootstrap.transition",["jquery"],function(f){f(function(){var c=f.support,e;a:{e=document.createElement("bootstrap");var a={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"},b;for(b in a)if(void 0!==e.style[b]){e=a[b];break a}e=void 0}c.transition=e&&{end:e}})});
define("plugin/bootstrap.modal",["rit","plugin/bootstrap.transition"],function(f){var c=f.$,e=c("body"),a=function(b,a){this.options=a;this.$element=c(b).delegate('[data-dismiss="modal"]',"touchstart.dismiss.modal click.dismiss.modal",c.proxy(this.hide,this));this.options.remote&&this.$element.find(".modal-body").load(this.options.remote)};a.prototype={constructor:a,toggle:function(){return this[!this.isShown?"show":"hide"]()},show:function(){var b=this,a=c.Event("show");this.$element.trigger(a);
!this.isShown&&!a.isDefaultPrevented()&&(e.addClass("modal-open"),this.isShown=!0,this.escape(),this.backdrop(function(){var a=c.support.transition&&b.$element.hasClass("fade");b.$element.parent().length||b.$element.appendTo(document.body);b.$element.show();a&&b.$element[0].offsetWidth;b.$element.addClass("in").attr("aria-hidden",!1).focus();b.enforceFocus();a?b.$element.one(c.support.transition.end,function(){b.$element.trigger("shown")}):b.$element.trigger("shown")}))},hide:function(b){b&&b.preventDefault();
var a=0,b=c.Event("hide");this.$element.trigger(b);this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,c(".modal").each(function(){c(this).is(":visible")&&a++}),1>=a&&e.removeClass("modal-open"),f.Events.trigger("modal:close"),this.escape(),c(document).off("focusin.modal"),this.$element.removeClass("in").attr("aria-hidden",!0),c.support.transition&&this.$element.hasClass("fade")?this.hideWithTransition():this.hideModal())},enforceFocus:function(){var b=this;c(document).one("focusin.modal",function(a){b.$element[0]!==
a.target&&!b.$element.has(a.target).length&&b.$element.focus()})},escape:function(){var b=this;if(this.isShown&&this.options.keyboard)this.$element.on("keyup.dismiss.modal",function(a){27==a.which&&b.hide()});else this.isShown||this.$element.off("keyup.dismiss.modal")},hideWithTransition:function(){var a=this,d=setTimeout(function(){a.$element.off(c.support.transition.end);a.hideModal()},500);this.$element.one(c.support.transition.end,function(){clearTimeout(d);a.hideModal()})},hideModal:function(){this.$element.hide().trigger("hidden");
this.backdrop()},removeBackdrop:function(){this.$backdrop.remove();this.$backdrop=null},backdrop:function(a){var d=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var m=c.support.transition&&d;this.$backdrop=c('<div class="modal-backdrop '+d+'" />').appendTo(document.body);"static"!=this.options.backdrop&&this.$backdrop.click(c.proxy(this.hide,this));m&&this.$backdrop[0].offsetWidth;this.$backdrop.addClass("in");a()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),
this.removeBackdrop()):a&&a()}};c.fn.modal=function(b){return this.each(function(){var d=c(this),m=d.data("modal"),e=c.extend({},c.fn.modal.defaults,d.data(),"object"==typeof b&&b);m||d.data("modal",m=new a(this,e));if("string"==typeof b)m[b]();else e.show&&m.show()})};c.fn.modal.defaults={backdrop:!0,keyboard:!0,show:!0};c.fn.modal.Constructor=a;c(function(){e.on("touchstart.modal.data-api click.modal.data-api",'[data-toggle="modal"]',function(a){var d=c(this),e=d.attr("href"),f=c(d.attr("data-target")||
e&&e.replace(/.*(?=#[^\s]+$)/,"")),e=f.data("modal")?"toggle":c.extend({remote:!/#/.test(e)&&e},f.data(),d.data());a.preventDefault();f.modal(e).one("hide",function(){d.focus()})})})});
define("modalize",["rit","text!apps/flyout-form/js/templates/modal-shell.html","plugin/bootstrap.modal"],function(f,c){var e=f.$;e("body");var a=e(window),b=e(document),d=e("#modal-container").length?e("#modal-container"):e("<div/>",{id:"modal-container"}).appendTo("body");b.on("focus blur",":input",function(a){if(Modernizr.touch){var b=d.find(".modal"),a=/focus(?!out)/.test(a.type);b[(a?"add":"remove")+"Class"]("on-screen-keyboard")}});e.fn.modalize=function(b){var n=120,j=b||{};e("body").hasClass("modal-open");
var g;this.modalBody=e(c).find(".modal-body").html(this);this.el=d.html(this.modalBody.parents());var b=e("#myModal").modal().find(".page-header"),k=b.find("h2"),i=b.find(".page-header-sub");_.contains(["REQUEST_QUOTE","CONTACT_DEALER","INVENTORY_SEARCH","REQUEST_QUOTE_CONFIGURED","LOCALSPECIALS"],j.type)&&(b.css({marginTop:"5px",marginBottom:0}),k.remove(),i.remove(),n=25);"BB_IFRAME"===j.type&&(g=this.modalBody.find("iframe"));this.modalTotalTop=65+n;j.title?k.html(j.title):k.hide();j.subTitle?
i.html(j.subTitle):i.hide();var l={resize:function h(){console.log("reisizing.");this.modalBody.height(a.height()-this.modalTotalTop);"BB_IFRAME"===j.type&&g.height(a.height()-this.modalTotalTop-10-30);return _.bind(h,this)}.call(this)};a.on(l);f.Events.once("modal:close",function(){a.off(l)});return this}});
define("plugin/bootstrap.tooltip",["rit","plugin/bootstrap.transition"],function(f){var c=f.$,e=function(a,b){this.init("tooltip",a,b)};e.prototype={constructor:e,init:function(a,b,d){this.type=a;this.$element=c(b);this.options=this.getOptions(d);this.enabled=!0;if("click"==this.options.trigger||"touchstart"==this.options.trigger)this.$element.on(this.options.trigger+"."+this.type,this.options.selector,c.proxy(this.toggle,this));else"manual"!=this.options.trigger&&(a="hover"==this.options.trigger?
"mouseenter":"focus",b="hover"==this.options.trigger?"mouseleave":"blur",this.$element.on(a+"."+this.type,this.options.selector,c.proxy(this.enter,this)),this.$element.on(b+"."+this.type,this.options.selector,c.proxy(this.leave,this)));this.options.selector?this._options=c.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},getOptions:function(a){a=c.extend({},c.fn[this.type].defaults,a,this.$element.data());a.delay&&"number"==typeof a.delay&&(a.delay={show:a.delay,hide:a.delay});
return a},enter:function(a){var b=c(a.currentTarget)[this.type](this._options).data(this.type);if(!b.options.delay||!b.options.delay.show)return b.show();clearTimeout(this.timeout);b.hoverState="in";this.timeout=setTimeout(function(){"in"==b.hoverState&&b.show()},b.options.delay.show)},leave:function(a){var b=c(a.currentTarget)[this.type](this._options).data(this.type);this.timeout&&clearTimeout(this.timeout);if(!b.options.delay||!b.options.delay.hide)return b.hide();b.hoverState="out";this.timeout=
setTimeout(function(){"out"==b.hoverState&&b.hide()},b.options.delay.hide)},show:function(){var a,b,d,c,e,f,g;if(this.hasContent()&&this.enabled){a=this.tip();this.setContent();this.options.animation&&a.addClass("fade");f="function"==typeof this.options.placement?this.options.placement.call(this,a[0],this.$element[0]):this.options.placement;b=/in/.test(f);a.remove().css({top:0,left:0,display:"block"}).appendTo(b?this.$element:document.body);d=this.getPosition(b);c=a[0].offsetWidth;e=a[0].offsetHeight;
switch(b?f.split(" ")[1]:f){case "bottom":g={top:d.top+d.height,left:d.left+d.width/2-c/2};break;case "top":g={top:d.top-e,left:d.left+d.width/2-c/2};break;case "left":g={top:d.top+d.height/2-e/2,left:d.left-c};break;case "right":g={top:d.top+d.height/2-e/2,left:d.left+d.width}}a.css(g).addClass(f).addClass("in")}},setContent:function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b);a.removeClass("fade in top bottom left right")},hide:function(){var a=
this.tip();a.removeClass("in");if(c.support.transition&&this.$tip.hasClass("fade")){var b=setTimeout(function(){a.off(c.support.transition.end).remove()},500);a.one(c.support.transition.end,function(){clearTimeout(b);a.remove()})}else a.remove();return this},fixTitle:function(){var a=this.$element;if(a.attr("title")||"string"!=typeof a.attr("data-original-title"))a.attr("data-original-title",a.attr("title")||"").removeAttr("title")},hasContent:function(){return this.getTitle()},getPosition:function(a){return c.extend({},
a?{top:0,left:0}:this.$element.offset(),{width:this.$element[0].offsetWidth,height:this.$element[0].offsetHeight})},getTitle:function(){var a=this.$element,b=this.options;return a.attr("data-original-title")||("function"==typeof b.title?b.title.call(a[0]):b.title)},tip:function(){return this.$tip=this.$tip||c(this.options.template)},validate:function(){this.$element[0].parentNode||(this.hide(),this.options=this.$element=null)},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},
toggleEnabled:function(){this.enabled=!this.enabled},toggle:function(){this[this.tip().hasClass("in")?"hide":"show"]()},destroy:function(){this.hide().$element.off("."+this.type).removeData(this.type)}};c.fn.tooltip=function(a){return this.each(function(){var b=c(this),d=b.data("tooltip"),f="object"==typeof a&&a;d||b.data("tooltip",d=new e(this,f));if("string"==typeof a)d[a]()})};c.fn.tooltip.Constructor=e;c.fn.tooltip.defaults={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
trigger:"hover",title:"",delay:0,html:!0}});
define("plugin/bootstrap.popover",["rit","plugin/bootstrap.tooltip"],function(f){var c=f.$,f=f.has,e=function(a,b){this.init("popover",a,b)};e.prototype=c.extend({},c.fn.tooltip.Constructor.prototype,{constructor:e,setContent:function(){var a=this.tip(),b=this.getTitle(),d=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b);a.find(".popover-content > *")[this.options.html?"html":"text"](d);a.removeClass("fade top bottom left right in")},hasContent:function(){return this.getTitle()||
this.getContent()},getContent:function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},tip:function(){this.$tip||(this.$tip=c(this.options.template));return this.$tip},destroy:function(){this.hide().$element.off("."+this.type).removeData(this.type)}});c.fn.popover=function(a){return this.each(function(){var b=c(this),d=b.data("popover"),f="object"==typeof a&&a;d||b.data("popover",d=new e(this,f));if("string"==typeof a)d[a]()})};
c.fn.popover.Constructor=e;c.fn.popover.defaults=c.extend({},c.fn.tooltip.defaults,{placement:"right",trigger:f.touch?"touchstart":"click",content:"",template:'<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'})});
define("disclaimers/main",["rit","modalize","plugin/bootstrap.popover","util/analytics","util/i18n"],function(f,c,e,a,b){var d=f.$,m=f._,n=f.has,j=f.$window,g=0,k,i,l,p=d(".disclaimers-container"),h,q,o={isVisible:!1,onDisclaimerClick:function(a){var b=o;p=d(".disclaimers-container");i=a.currentTarget;l=d(i);q=d(window).scrollTop();b.isVisible=p.is(":visible");g=/\u00a7|\*|\*\*/.test(l.data("disclaimer"))?l.data("disclaimer"):parseInt(l.data("disclaimer"),10);n.touch?b.showPopover(a):b.launchModal();
k=i;a.preventDefault()},showPopover:function(a){var c;k!==i&&(this.hidePopover(a),c="es"==b.lang?"Ver avisos":"See Disclosure",l.popover({trigger:"manual",placement:"top",content:'<a data-disclaimer-link="'+g+'"><div class="triangle"></div>'+c+"</a>",template:this.popoverTemplate()}),l.popover("show"),c=d(".popover"),c.one(n.touch?"touchstart":"click",function(a){d(a.target).closest(".close_btn").length?o.hidePopover(a):o.launchModal()}),"touchstart"===a.type&&a.stopPropagation(),this.hookPopover())},
hidePopover:function(a){a.preventDefault();this.unhookPopover();k&&!this.isDialogChild(a.target)&&(d(k).popover("hide"),k=null)},hookPopover:function(){this.unhookPopover();j.on("touchstart click scroll touchmove",d.proxy(this.hidePopover,this))},unhookPopover:function(){j.off("touchstart click scroll touchmove",d.proxy(this.hidePopover,this))},isDialogChild:function(a){return 0<d(a).parents().filter("#"+this.id).length},launchModal:function(a){a&&a.preventDefault();a=void 0===d("body").attr("data-language")?
"es"===f.util.lang?"Avisos":"Disclosures":"es"==d("body").attr("data-language")&&"configurator"!==d("body").attr("data-app-name")?"Avisos":"Disclosures";h=p.modalize({title:a}).el;o.afterModalShow()},afterModalShow:function(){var b,c;a.getTags("global");a.fire("global","90.1",{current_pagename:"T:Disclosure",device_type:a.deviceType});isNaN(g)&&!/\u00a7|\*|\*\*/.test(d(i).data("disclaimer"))?h.find("ol li").removeClass("selected"):(b=/\u00a7|\*|\*\*/.test(d(i).data("disclaimer"))?d('.disclaimers-container a[data-disclaimer="'+
g+'"]').parent():h.find("ol li:nth-child("+g+")"),!/\u00a7|\*|\*\*/.test(d(i).data("disclaimer"))&&"block"===h.find(".disclaimer-list").css("display")&&(b=h.find("#disc_"+g)),h.find("li").removeClass("selected"),b.addClass("selected"),d("div").remove(".triangle"),h.find(".modal-body").scrollTop(0),b.prepend('<div class="triangle" />'),1<b.length?m.each(b,function(a){d(a).is(":visible")&&(c=d(a).position().top)}):c=b.position().top,"undefined"!=typeof b.position()&&h.find(".modal-body").scrollTop(c),
d(window).scrollTop(q))},goToDisclaimer:function(a){var b=d(a.currentTarget).data(),b=h.find("li").removeClass("selected").eq(b.disclaimer-1).addClass("selected");h.find(".modal-body").scrollTop(b.position().top);a.stopPropagation();a.preventDefault()},popoverTemplate:function(){return'<div class="disclaimer popover fade bottom in" style="display: block;" id="disclaimer-popover"><div class="arrow"></div><div class="popover-content"><p></p></div><div class="close_btn"><span class="btn btn-gray small" data-dismiss="popover"><i class="icon-close-small"></i></span></div></div>'},
destroy:function(){},init:function(){p.on(n.touch?"touchstart":"click","a[data-disclaimer]",this.goToDisclaimer);return this}};return o.init()});define("disclaimers",["disclaimers/main"],function(f){return f});