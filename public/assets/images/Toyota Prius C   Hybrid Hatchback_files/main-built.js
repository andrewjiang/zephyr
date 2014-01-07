/* =============================================================
 * bootstrap-typeahead.js v2.1.1
 * http://twitter.github.com/bootstrap/javascript.html#typeahead
 * =============================================================
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
 * ============================================================ */

/**
 * Copyright (c) 2009 Sergiy Kovalchuk (serg472@gmail.com)
 *
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Following code is based on Element.mask() implementation from ExtJS framework (http://extjs.com/)
 *
 */


/**
 * @requires rit
 */
define('util/view',['rit'], function(RIT) {

    /**
     * Provides the base class for a UI View.
     * @exports util/view
     * @version {version}
     */

    /**
     * View is the base class for all View classes. Views should extend this class.
     * @class View
     * @extends rit.Backbone.View
     * @see <a href="http://documentcloud.github.com/backbone/#View">http://documentcloud.github.com/backbone/#View</a>
     *
     * @constructor
     * When creating a new View, the options you pass are attached to the
     * View as this.options, for future reference. There are several special
     * options that, if passed, will be attached directly to the View:
     * model, collection, el, id, className, tagName and attributes. If the
     * View defines an initialize function, it will be called when the View
     * is first created. If you'd like to create a View that references an
     * element already in the DOM, pass in the element as an option:
     * new View({el: existingElement})
     *
     * @param {Object} [options]
     * @returns View
     */
    var View = RIT.Backbone.View.extend();

    /**
     * @static
     * @method extend
     *
     * Get started with Views by creating a custom View class. You'll want
     * to override the render function, specify your declarative events, and
     * perhaps the tagName, className, or id of the View's root element.
     *
     * View.extend(properties, [classProperties])
     *
     * @param {Object} properties
     * @param {Object} [classProperties]
     */

    // Return public interface
    return View;

});

define('jquerypp/event/livehack',['jquery'], function(jQuery) { 
(function() {

	var event = jQuery.event,

		//helper that finds handlers by type and calls back a function, this is basically handle
		// events - the events object
		// types - an array of event types to look for
		// callback(type, handlerFunc, selector) - a callback
		// selector - an optional selector to filter with, if there, matches by selector
		//     if null, matches anything, otherwise, matches with no selector
		findHelper = function( events, types, callback, selector ) {
			var t, type, typeHandlers, all, h, handle, 
				namespaces, namespace,
				match;
			for ( t = 0; t < types.length; t++ ) {
				type = types[t];
				all = type.indexOf(".") < 0;
				if (!all ) {
					namespaces = type.split(".");
					type = namespaces.shift();
					namespace = new RegExp("(^|\\.)" + namespaces.slice(0).sort().join("\\.(?:.*\\.)?") + "(\\.|$)");
				}
				typeHandlers = (events[type] || []).slice(0);

				for ( h = 0; h < typeHandlers.length; h++ ) {
					handle = typeHandlers[h];
					
					match = (all || namespace.test(handle.namespace));
					
					if(match){
						if(selector){
							if (handle.selector === selector  ) {
								callback(type, handle.origHandler || handle.handler);
							}
						} else if (selector === null){
							callback(type, handle.origHandler || handle.handler, handle.selector);
						}
						else if (!handle.selector ) {
							callback(type, handle.origHandler || handle.handler);
							
						} 
					}
					
					
				}
			}
		};

	/**
	 * Finds event handlers of a given type on an element.
	 * @param {HTMLElement} el
	 * @param {Array} types an array of event names
	 * @param {String} [selector] optional selector
	 * @return {Array} an array of event handlers
	 */
	event.find = function( el, types, selector ) {
		var events = ( $._data(el) || {} ).events,
			handlers = [],
			t, liver, live;

		if (!events ) {
			return handlers;
		}
		findHelper(events, types, function( type, handler ) {
			handlers.push(handler);
		}, selector);
		return handlers;
	};
	/**
	 * Finds all events.  Group by selector.
	 * @param {HTMLElement} el the element
	 * @param {Array} types event types
	 */
	event.findBySelector = function( el, types ) {
		var events = $._data(el).events,
			selectors = {},
			//adds a handler for a given selector and event
			add = function( selector, event, handler ) {
				var select = selectors[selector] || (selectors[selector] = {}),
					events = select[event] || (select[event] = []);
				events.push(handler);
			};

		if (!events ) {
			return selectors;
		}
		//first check live:
		/*$.each(events.live || [], function( i, live ) {
			if ( $.inArray(live.origType, types) !== -1 ) {
				add(live.selector, live.origType, live.origHandler || live.handler);
			}
		});*/
		//then check straight binds
		findHelper(events, types, function( type, handler, selector ) {
			add(selector || "", type, handler);
		}, null);

		return selectors;
	};
	event.supportTouch = "ontouchend" in document;
	
	$.fn.respondsTo = function( events ) {
		if (!this.length ) {
			return false;
		} else {
			//add default ?
			return event.find(this[0], $.isArray(events) ? events : [events]).length > 0;
		}
	};
	$.fn.triggerHandled = function( event, data ) {
		event = (typeof event == "string" ? $.Event(event) : event);
		this.trigger(event, data);
		return event.handled;
	};
	/**
	 * Only attaches one event handler for all types ...
	 * @param {Array} types llist of types that will delegate here
	 * @param {Object} startingEvent the first event to start listening to
	 * @param {Object} onFirst a function to call 
	 */
	event.setupHelper = function( types, startingEvent, onFirst ) {
		if (!onFirst ) {
			onFirst = startingEvent;
			startingEvent = null;
		}
		var add = function( handleObj ) {

			var bySelector, selector = handleObj.selector || "";
			if ( selector ) {
				bySelector = event.find(this, types, selector);
				if (!bySelector.length ) {
					$(this).delegate(selector, startingEvent, onFirst);
				}
			}
			else {
				//var bySelector = event.find(this, types, selector);
				if (!event.find(this, types, selector).length ) {
					event.add(this, startingEvent, onFirst, {
						selector: selector,
						delegate: this
					});
				}

			}

		},
			remove = function( handleObj ) {
				var bySelector, selector = handleObj.selector || "";
				if ( selector ) {
					bySelector = event.find(this, types, selector);
					if (!bySelector.length ) {
						$(this).undelegate(selector, startingEvent, onFirst);
					}
				}
				else {
					if (!event.find(this, types, selector).length ) {
						event.remove(this, startingEvent, onFirst, {
							selector: selector,
							delegate: this
						});
					}
				}
			};
		$.each(types, function() {
			event.special[this] = {
				add: add,
				remove: remove,
				setup: function() {},
				teardown: function() {}
			};
		});
	};
})(jQuery);
})
;
define('jquerypp/event/swipe',['jquerypp/event/livehack', 'jquery'], function(__livehack, jQuery) {
    (function($) {
        var isPhantom = /Phantom/.test(navigator.userAgent),
            supportTouch = !isPhantom && "ontouchend" in document,
            scrollEvent = "touchmove scroll",
            // Use touch events or map it to mouse events
            touchStartEvent = supportTouch ? "touchstart" : "mousedown",
            touchStopEvent = supportTouch ? "touchend" : "mouseup",
            touchMoveEvent = supportTouch ? "touchmove" : "mousemove",
            data = function(event) {
                var d = event.originalEvent.touches ? event.originalEvent.touches[0] : event;
                return {
                    time: (new Date).getTime(),
                    coords: [d.pageX, d.pageY],
                    origin: $(event.target)
                };
            };

        /**
         * @add jQuery.event.swipe
         */
        var swipe = $.event.swipe = {
            /**
             * @attribute delay
             * Delay is the upper limit of time the swipe motion can take in milliseconds.  This defaults to 500.
             *
             * A user must perform the swipe motion in this much time.
             */
            delay: 500,
            /**
             * @attribute max
             * The maximum distance the pointer must travel in pixels.  The default is 75 pixels.
             */
            max: 75,
            /**
             * @attribute min
             * The minimum distance the pointer must travel in pixels.  The default is 30 pixels.
             */
            min: 30
        };

        $.event.setupHelper([

        /**
         * @hide
         * @attribute swipe
         */
        "swipe",
        /**
         * @hide
         * @attribute swipeleft
         */
        'swipeleft',
        /**
         * @hide
         * @attribute swiperight
         */
        'swiperight',
        /**
         * @hide
         * @attribute swipeup
         */
        'swipeup',
        /**
         * @hide
         * @attribute swipedown
         */
        'swipedown'], touchStartEvent, function(ev) {
            var
            // update with data when the event was started
            start = data(ev),
                stop, delegate = ev.delegateTarget || ev.currentTarget,
                selector = ev.handleObj.selector,
                entered = this;

            function moveHandler(event) {
                if (!start) {
                    return;
                }
                // update stop with the data from the current event
                stop = data(event);

                // prevent scrolling
                if (Math.abs(start.coords[0] - stop.coords[0]) > 10) {
                    event.preventDefault();
                }
            }

            // Attach to the touch move events
            $(document.documentElement).bind(touchMoveEvent, moveHandler).one(touchStopEvent, function(event) {
                $(this).unbind(touchMoveEvent, moveHandler);
                // if start and stop contain data figure out if we have a swipe event
                if (start && stop) {
                    // calculate the distance between start and stop data
                    var deltaX = Math.abs(start.coords[0] - stop.coords[0]),
                        deltaY = Math.abs(start.coords[1] - stop.coords[1]),
                        distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

                    // check if the delay and distance are matched
                    if (stop.time - start.time < swipe.delay && distance >= swipe.min) {
                        var events = ['swipe'];
                        // check if we moved horizontally
                        if (deltaX >= swipe.min && deltaY < swipe.min) {
                            // based on the x coordinate check if we moved left or right
                            events.push(start.coords[0] > stop.coords[0] ? "swipeleft" : "swiperight");
                        } else
                        // check if we moved vertically
                        if (deltaY >= swipe.min && deltaX < swipe.min) {
                            // based on the y coordinate check if we moved up or down
                            events.push(start.coords[1] < stop.coords[1] ? "swipedown" : "swipeup");
                        }

                        // trigger swipe events on this guy
                        $.each($.event.find(delegate, events, selector), function() {
                            this.call(entered, ev, {
                                start: start,
                                end: stop
                            });
                        });

                    }
                }
                // reset start and stop
                start = stop = undefined;
            });
        });

    })(jQuery);
});

/*
 * HTML5 Placeholder Pollyfill Plugin.
 */
define('placeholder',['jquery'], function (jQuery) {
	(function ($) {
		$.fn.placeholder = function () {

			if (!Modernizr.input.placeholder) {

				$('[placeholder]').focus(function () {
					var input = $(this);
					if (input.val() == input.attr('placeholder')) {
						input.val('');
						input.removeClass('placeholder');
					}
				}).blur(function () {
					var input = $(this);
					if (input.val() === '' || input.val() == input.attr('placeholder')) {
						input.addClass('placeholder');
						input.val(input.attr('placeholder'));
					}
				}).blur();
				$('[placeholder]').parents('form').submit(function () {
					$(this).find('[placeholder]').each(function () {
						var input = $(this);
						if (input.val() == input.attr('placeholder')) {
							input.val('');
						}
					});
				});
			}
		};
	})(jQuery);
});

/**
 * @requires rit
 * @requires util/view
 */
define('globalNav/language-toggle',['rit', 'util/view'], function(RIT, View) {
	//'jquerypp/event/swipe'

	/**
	 * Global site header
	 *
	 * @exports view/global-header
	 * @version {version}
	 */
	var $ = RIT.$,
		_ = RIT._,
		Backbone = RIT.Backbone,
		Events = RIT.Events,
		has = RIT.has,
		$window = RIT.$window,
		$document = RIT.$document;
		

	/**
	 * @class LanguageToggle
	 * @extends util/view
	 */
	var LanguageToggle = View.extend({

		initialize: function() {
			var self = this,
				path = document.URL;

			if ((_.indexOf(window.location.toString().split('/'), 'espanol') !== -1) && ($('body').data('app-name') === 'configurator')) {
				path = path.replace(".com/espanol", ".com");
			} else if (($('body').data('language-url') !== undefined) && ($('body').data('language-url') !== "")) { // check for redirect data attribute
				path = $('body').data('language-url');
			} else if (path.indexOf(".com/search/") !=-1) { // check for exception for search page
				path = (RIT.util.lang === "es") ? path.replace("&locale=es", "") : path + "&locale=es";
			} else { // change path to espanol or gm equivalent directory
				path = (RIT.util.lang === "es") ? path.replace(".com/espanol", ".com") : path.replace(".com", ".com/espanol");
			}
			window.location.href = path;
		}
	});

	// Return public interface
	return LanguageToggle;

});

/* =============================================================
 * bootstrap-typeahead.js v2.1.1
 * http://twitter.github.com/bootstrap/javascript.html#typeahead
 * =============================================================
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
 * ============================================================ */


!function($){

   // jshint ;_;


 /* TYPEAHEAD PUBLIC CLASS DEFINITION
  * ================================= */

  var Typeahead = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.typeahead.defaults, options)
    this.matcher = this.options.matcher || this.matcher
    this.sorter = this.options.sorter || this.sorter
    this.highlighter = this.options.highlighter || this.highlighter
    this.updater = this.options.updater || this.updater
    this.$wrapper = this.options.wrapper ? $(this.options.wrapper).appendTo('body') : 0;
    this.$menu = $(this.options.menu).appendTo(this.$wrapper || 'body');
    if(!this.$wrapper) this.$wrapper = this.$menu;
    this.source = this.options.source
    this.shown = false
    this.listen()
    this.hide()
  }

  Typeahead.prototype = {

    constructor: Typeahead

  , select: function () {
      var val = this.$menu.find('.active').attr('data-value')
      this.$element
        .val(this.updater(val))
        .change()
      return this.hide()
    }

  , updater: function (item) {
      return item
    }

  , show: function () {
      var pos = $.extend({}, this.$element.offset(), {
        height: this.$element[0].offsetHeight
      })

      this.$wrapper.css({
        top: pos.top + pos.height
      , left: pos.left
      })

      this.$wrapper.show()
      this.shown = true
      return this
    }

  , hide: function () {
      this.$wrapper.hide()
      this.shown = false
      return this
    }

  , lookup: function (event) {
      var items

      this.query = this.$element.val()

      if (!this.query || this.query.length < this.options.minLength) {
        return this.shown ? this.hide() : this
      }

      items = $.isFunction(this.source) ? this.source(this.query, $.proxy(this.process, this)) : this.source

      return items ? this.process(items) : this
    }

  , process: function (items) {
      var that = this

      items = $.grep(items, function (item) {
        return that.matcher(item)
      })

      items = this.sorter(items)

      if (!items.length) {
        return this.shown ? this.hide() : this
      }

      return this.render(items.slice(0, this.options.items)).show()
    }

  , matcher: function (item) {
      return ~item.toLowerCase().indexOf(this.query.toLowerCase())
    }

  , sorter: function (items) {
      var beginswith = []
        , caseSensitive = []
        , caseInsensitive = []
        , item

      while (item = items.shift()) {
        if (!item.toLowerCase().indexOf(this.query.toLowerCase())) beginswith.push(item)
        else if (~item.indexOf(this.query)) caseSensitive.push(item)
        else caseInsensitive.push(item)
      }

      return beginswith.concat(caseSensitive, caseInsensitive)
    }

  , highlighter: function (item) {
      var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
      return item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
        return '<strong>' + match + '</strong>'
      })
    }

  , render: function (items) {
      var that = this

      items = $(items).map(function (i, item) {
        i = $(that.options.item).attr('data-value', item)
        i.find('a').html(that.highlighter(item))
        return i[0]
      })

      items.first().addClass('active')
      this.$menu.html(items)
      return this
    }

  , next: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , next = active.next()

      if (!next.length) {
        next = $(this.$menu.find('li')[0])
      }

      next.addClass('active')
    }

  , prev: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , prev = active.prev()

      if (!prev.length) {
        prev = this.$menu.find('li').last()
      }

      prev.addClass('active')
    }

  , listen: function () {
      this.$element
        .on('blur',     $.proxy(this.blur, this))
        .on('keypress', $.proxy(this.keypress, this))
        .on('keyup',    $.proxy(this.keyup, this))

      if ($.browser.chrome || $.browser.webkit || $.browser.msie) {
        this.$element.on('keydown', $.proxy(this.keydown, this))
      }

      this.$menu
        .on('click', $.proxy(this.click, this))
        .on('mouseenter', 'li', $.proxy(this.mouseenter, this))
    }

  , move: function (e) {
      if (!this.shown) return

      switch(e.keyCode) {
        case 9: // tab
        case 13: // enter
        case 27: // escape
          e.preventDefault()
          break

        case 38: // up arrow
          e.preventDefault()
          this.prev()
          break

        case 40: // down arrow
          e.preventDefault()
          this.next()
          break
      }

      e.stopPropagation()
    }

  , keydown: function (e) {
      this.suppressKeyPressRepeat = !~$.inArray(e.keyCode, [40,38,9,13,27])
      this.move(e)
    }

  , keypress: function (e) {
      if (this.suppressKeyPressRepeat) return
      this.move(e)
    }

  , keyup: function (e) {
      switch(e.keyCode) {
        case 40: // down arrow
        case 38: // up arrow
          break

        case 9: // tab
        case 13: // enter
          if (!this.shown) return
          this.select()
          break

        case 27: // escape
          if (!this.shown) return
          this.hide()
          break

        default:
          this.lookup()
      }

      e.stopPropagation()
      e.preventDefault()
  }

  , blur: function (e) {
      var that = this
      setTimeout(function () { that.hide() }, 150)
    }

  , click: function (e) {
      e.stopPropagation()
      e.preventDefault()
      this.select()
    }

  , mouseenter: function (e) {
      this.$menu.find('.active').removeClass('active')
      $(e.currentTarget).addClass('active')
    }

  }


  /* TYPEAHEAD PLUGIN DEFINITION
   * =========================== */

  $.fn.typeahead = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('typeahead')
        , options = typeof option == 'object' && option
      if (!data) $this.data('typeahead', (data = new Typeahead(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.typeahead.defaults = {
    source: []
  , items: 8
  , menu: '<ul class="typeahead dropdown-menu"></ul>'
  , item: '<li><a href="#"></a></li>'
  , minLength: 1
  }

  $.fn.typeahead.Constructor = Typeahead


 /*   TYPEAHEAD DATA-API
  * ================== */

  $(function () {
    $('body').on('focus.typeahead.data-api', '[data-provide="typeahead"]', function (e) {
      var $this = $(this)
      if ($this.data('typeahead')) return
      e.preventDefault()
      $this.typeahead($this.data())
    })
  })

}(window.jQuery);

define("plugin/bootstrap.typeahead", function(){});

/**
 * @requires rit
 * This plugun highlights the subnav indicator when the page is scrolled or subnav is clicked /hovered.
 *
 * Initialize plugin:
 * $("#subnav").scrollnav();
 *
 * Inside a scroll handler, call "processScroll" method with the scrolled top position
 * $("#subnav").scrollnav({
* 		'method':'processScroll'
* 		'params': $(this).scrollTop()
* });
 *
 * Configuration options:
 * 'method' - to call its methods ()
 * 'params' - to pass method arguments
 *
 * 'target' - the name of data attribute of subnav links that hold the id of the target sections.
 *  	Example for 'data-link'
 *  	'target' : 'link' '
 *
 *  'offset' - top scrolling offset for the target sections (defaults to 60)
 *  	Example- 'offset':'40'
 *
 * 	'promise' - If the app needs to wait till rendering is done before calculating target offsets.
 * 	Example: 'promise' : promiseObject
 */

define('plugin/jquery.scrollnav',['rit'], function(RIT) {

    var $ = RIT.$,
        _ = RIT._,
        Backbone = RIT.Backbone,
        has = RIT.has,
        $body = RIT.$body,
        bodyData=RIT.bodyData,
        Events = RIT.Events;

    $.fn.scrollnav = function(options){
        return this.each(function(i, el) {
            var $this = $(this),
                data = $this.data('scrollnav');
            //store scrollnav in data so it's initialized once
            if(!data){
                $this.data('scrollnav', (scrollnavObj=new ScrollNav(el, options)));
            }
            //access scrollNav's methods using options
            if (typeof options === 'object' && typeof options.method === 'string') {
                //if method has arguments
                if (options.params){
                    scrollnavObj[options.method](options.params);
                }else{
                    scrollnavObj[options.method]();
                }
            }
        });
    };


    //Constructor
    function ScrollNav(el, options){
        var self= this ,
            defaults = {
                offset:60
            };
        defaults['default'] = -1;
        self.$el=$(el);
        self.$subnavUl=$(el).find('ul');
        self.$subnavLi=$(el).find('li');
        self.$subnavIndicator=$(el).find('.indicator');
        self.$indicatorSpan=self.$subnavIndicator.find('span');
        self.options = $.extend( {}, defaults, options );

        self.activeTarget = (self.options['default'] >= 0) ? self.options['default'] : -1;
        self.isAnimating = false;

        self.defaults = defaults;
        self.init();
    }

    ScrollNav.prototype = {
        init: function(){
            var self=this,
                active,
                $self=$(self);

            //This class is used to check if the element is initialized
            self.$el.addClass('scroll-nav');

            //Check if there's promise object set in options
            if(self.options.promise){
                self.promise=self.options.promise;
                //Calculate offsets after promise is done
                self.promise.done(function(){
                    self.offsets=self.calculateOffsets();
                });
            }else{
                self.promise=false;
                self.offsets=self.calculateOffsets();
            }

            //move subnav indicator on hover
            if(!has.touch){

                //Move indicator to the hover location
                self.$el.on('mouseenter', 'li', function(evt){
                    self.animateNav($(evt.currentTarget).index());
                });

                //Move indicator back to the active position
                self.$el.on('mouseleave', function(evt){
                    var active = $(evt.currentTarget).find('.active').length;
                    if (!self.isAnimating) {
                        self.animateNav(self.activeTarget);
                    }
                });
                // set flag to lock subnav indicator in place
                self.$el.on('click', 'li', function(evt) {
                    self.isAnimating = true;
                });
            }
        },

        /**
         * This function calculate the top offset of subnav targets
         * and store them in 'offsets' list
         * @return {[type]} [description]
         */
        calculateOffsets :function(){
            var self=this,
                offsets=[],
                link,
                selector=self.options.target? 'data-'+self.options.target: 'href',
                $targets=self.$subnavLi.find('['+selector+']'),
                $targetContainer;

            if($targets.length>0){
                $targets.each(function(i, item){
                    if(selector === 'href'){
                        $targetContainer=$($(item).attr('href'));
                    }else{
                        $targetContainer=$($(item).data(self.options.target));
                    }

                    if($targetContainer.length>0){
                        offsets.push($targetContainer.offset().top-self.options.offset);
                    }
                });
            }
            return offsets;
        },

        /**
         * This function checks if there are any promise objects set in options
         * if it does, wait till 'promise' is done before calculating the index of the scrolled
         * @param  scrooled position
         * @return
         */
        processScroll : function(scrollTop){
            var self=this;
            if (!$('html,body').is(':animated')) {
                self.isAnimating = false;
                if(!self.promise){
                    self.getScrolledIndex(scrollTop);
                }
            }
        },

        /**
         * This function replaced Scrollspy
         * When page is scrolled, match the scroll top position with
         * sub nav target's offset and call animateNav() with the matchin index
         * @param scrollTop current scrolled position
         * @return null - call animateNav() with the target index
         */

        getScrolledIndex: function(scrollTop){
            var self=this,
                index,
                activeEl;

            index= _.indexOf(self.offsets, _.find(self.offsets, function(offset, i){
                return (scrollTop>= offset && (!self.offsets[i + 1] || scrollTop <= self.offsets[i + 1]));
            }));

            self.activeTarget=index;
            if(index >=0){
                activeEl = $(self.$subnavLi.get(index));
                self.$subnavLi.removeClass('active');
                activeEl.addClass('active');
            } else {
                //Index -1 will be scrolled above gallery
                self.activeTarget=index;
            }
            self.animateNav(index);
        },

        /**
         * Subnav highlight and movement
         * @param  {[type]} index [index to move]
         * @return null- > Moves the indicator to the given index
         * If index -1, hide the indicator
         */
        animateNav: function(index){
            var self=this,
                leftPos,
                $activeEl,
                indicatorWidth;

            if(index >= 0){
                $activeEl=$(self.$subnavLi.get(index));
                leftPos=$activeEl.position().left;
                indicatorWidth=$activeEl.width()-10;
                self.$indicatorSpan.css({
                    'width':indicatorWidth+'px'
                });
                self.$subnavIndicator.show().stop().css({
                    'left': leftPos + 'px',
                    'width':indicatorWidth+'px'
                });

            }else{
                self.$subnavIndicator.hide();
            }
        }
    };
});

/**
 * @requires rit
 * @requires util/view
 * @requires jquerypp/event/swipe
 * @requires util/analytics
 */
define('globalNav/global-header',['rit', 
	'util/view', 
	'util/analytics', 
	'jquerypp/event/swipe', 
	'placeholder',
	'globalNav/language-toggle',
	'plugin/bootstrap.typeahead',
	'plugin/jquery.scrollnav'], 
	function(
		RIT, 
		View, 
		Analytics, 
		Swipe, 
		Placeholder, 
		LanguageToggle) {
	//'jquerypp/event/swipe'

	/**
	 * Global site header
	 *
	 * @exports view/global-header
	 * @version {version}
	 */

	var $ = RIT.$,
		_ = RIT._,
		Backbone = RIT.Backbone,
		Events = RIT.Events,
		has = RIT.has,
		$window = RIT.$window,
		$document = RIT.$document,
		$body = RIT.$body,
		$globalnav = $('#global-nav'),
		$navbar = $globalnav.find('.navbar'),
		$subnav = $('.subnav'),
		$navPlaceholder = $("#global-nav-placeholder"),
		$navDropdowns = $globalnav.find('.nav-drop-down'),
		$drawr = $globalnav.find('.select-vehicle-dropdown'),
		$purse = $globalnav.find('.shopping-tools-dropdown'),
		$searchModal=$('#search-modal'),
		$searchModalBackdrop=$('.modal-searh-backdrop'),
		$searchSubmitBtn=$('.nav-search-form').find('.search-submit-btn'),
		$searchInput=$('.nav-search-input'),
		$nbFlyout=$('#notebook-flyout'),
		$topnavIcons=$('.top-nav-list').find('i'),
		//So each item in the list is a jquery object.
		navDropdowns = _.map($(".nav-drop-down"), function(el, i) {
			return $(el);
		}),
		accordions = [],
		currentIndex = 0,
		//navbarHeight = 48,
		navbarHeight = $navbar.height(),
		////top-nav-bar
		$navTopBar=$('.nav-top-bar'),
		$topnavDropdowns=$('.topnav-dropdown'),
		topnavHeight=$navTopBar.height(),
		subnavHeight = $subnav.height(),
		subnavFixed = false,
		currentDropdownZ = parseInt(navDropdowns[0].css("z-index"), 10),
		lastScrollPosY = 0,

		navFullHeight=topnavHeight+navbarHeight+subnavHeight,

		// Desktop events
		events = {
			"click .select-vehicle a": "toggleDropDown",
			"click .shopping-tools a": "toggleDropDown",
			//"click .nav li:nth-child(4)": "onFindDealerClick",
			//"click .nav li:nth-child(6)": "onOwnersClick",
			//"click .language-switch": "onLanguageClick",
			"click .menu-item .item-info-row": "onMenuItemCarClick",
			"click .menu-item .btn-left a": "onMenuItemExploreClick",
			"click .menu-item .btn-center a": "onMenuItemExploreClick",
			"click .menu-item .btn-right a": "onMenuItemBuildClick",			
			"click .all-vehicle-btn a": "onViewAllVehiclesClick",
			"click .select-vehicle-menu .slider .caption": "handleAccordionClick",
			//"click .logo": "onLogoClick",
			"click .shopping-tools-links a.build-price": "onBuildPriceClick",
			"click .shopping-tools-links a.request-quote": "onRequestQuoteClick",
			"click .shopping-tools-links a.accessories-guide": "onAccessoriesGuideClick",
			"click .shopping-tools-links a.dealer-checklist": "onDealerChecklistClick",
			"click .shopping-tools-links a.compare": "onCompareClick",
			"click .shopping-tools-links a.find-your-match": "onFindYourMatchClick",
			"click .shopping-tools-links a.view-brochures": "onViewBrochuresClick",
			"click .shopping-tools-links a.special-offers": "onSpecialOffersClick",
			"click .shopping-tools-links a.inventory": "onInventoryClick",
			"click .shopping-tools-links a.financial-tools": "onFinancialToolsClick",
			"click .shopping-tools-links a.what-fits-my-budget": "onWhatFitsMyBudgetClick",
			"click .shopping-tools-links a.estimate-payments": "onEstimatePaymentsClick",
			"click .shopping-tools-links a.buy-lease-quiz": "onBuyLeaseQuizClick",
			"click .shopping-tools-links a.credit-guides": "onCreditGuidesClick",
			"click .shopping-tools-links a.contact-dealer": "onContactDealerClick",
			"click .shopping-tools-links a.tcuv": "onTCUVClick",
			"click .shopping-tools-links a.trade-value": "onTradeValueClick",
			"keypress .nav-search-box form input": "onSearchClick",
			"click .search-submit-btn": "onSearchSubmitClick",
			"focusout .nav-search-input": "onSearchFocusOut",
			'click .navbar li':'onNavbarClick',
			'click .nav-top-bar li a': 'onNavTopbarClick',
			'click .notes-list li':'onNoteLiClick'
		},
		// Used for analytics
		appName = 'global', 
		transitionEndEvents = 'webkitTransitionEnd msTransitionEnd oTransitionEnd transitionend';
		

	if (has.touch) {
		events = {
			"touchstart .select-vehicle a": "toggleDropDown",
			"touchstart .shopping-tools a": "toggleDropDown",
			"touchstart .menu-item .item-info-row": "onMenuItemCarClick",
			"touchstart .menu-item .btn-left a": "onMenuItemExploreClick",
			"touchstart .menu-item .btn-center a": "onMenuItemExploreClick",
			"touchstart .menu-item .btn-right a": "onMenuItemBuildClick",
			"touchstart .all-vehicle-btn a": "onViewAllVehiclesClick",
			"touchstart .select-vehicle-menu .slider .caption": "handleAccordionClick",
			"swipeleft .select-vehicle-dropdown-wrapper": "swipeLeftAccordion",
			"swiperight .select-vehicle-dropdown-wrapper": "swipeRightAccordion",
			"swipeup .select-vehicle-dropdown": "toggleDropDown",
			"touchstart .shopping-tools-links a.build-price": "onBuildPriceClick",
			"touchstart .shopping-tools-links a.request-quote": "onRequestQuoteClick",
			"touchstart .shopping-tools-links a.accessories-guide": "onAccessoriesGuideClick",
			"touchstart .shopping-tools-links a.dealer-checklist": "onDealerChecklistClick",
			"touchstart .shopping-tools-links a.compare": "onCompareClick",
			"touchstart .shopping-tools-links a.find-your-match": "onFindYourMatchClick",
			"touchstart .shopping-tools-links a.special-offers": "onSpecialOffersClick",
			"touchstart .shopping-tools-links a.inventory": "onInventoryClick",
			"touchstart .shopping-tools-links a.financial-tools": "onFinancialToolsClick",
			"touchstart .shopping-tools-links a.what-fits-my-budget": "onWhatFitsMyBudgetClick",
			"touchstart .shopping-tools-links a.estimate-payments": "onEstimatePaymentsClick",
			"touchstart .shopping-tools-links a.buy-lease-quiz": "onBuyLeaseQuizClick",
			"touchstart .shopping-tools-links a.credit-guides": "onCreditGuidesClick",
			"touchstart .shopping-tools-links a.contact-dealer": "onContactDealerClick",
			"touchstart .shopping-tools-links a.tcuv": "onTCUVClick",
			"touchstart .shopping-tools-links a.trade-value": "onTradeValueClick",
			"keyup .nav-search-box form input": "onSearchClick",
			"touchstart .search-submit-btn": "onSearchSubmitClick",
			"focusout .nav-search-input": "onSearchFocusOut",
			'touchstart .navbar  li':'onNavbarClick',
			'touchstart .nav-top-bar  li a': 'onNavTopbarClick',
			'touchstart .notes-list li':'onNoteLiClick'
		};
	}
	$.event.swipe = {
		/**
		 * @attribute delay
		 * Delay is the upper limit of time the swipe motion can take in milliseconds.  This defaults to 500.
		 *
		 * A user must perform the swipe motion in this much time.
		 */
		delay: 750
	};

	/**
	 * @class GlobalHeader
	 * @extends util/view
	 */
	var GlobalHeader = View.extend({

		options: {
			animationOptions: {
				duration: '750',
				queue: false,
				complete: self.onAnimationComplete
			}
		},

		events: events,

		initialize: function() {
			var self = this,
				$subnavEl,
				hasSubnav=false;

			//Flag to prevent new transtions (top nav bar) happening before the current one ends
			self.topbarDropdownReady=true;


			self.$navItems = self.$(".nav-item");

			///placeholder initiated
			$('input[placeholder], textarea[placeholder]').placeholder();

			if(has.touch){
				//Set positions to absolute
				$globalnav.addClass('scroll-nav');
				$subnav.addClass('scroll-nav');
			}

			if ($subnav.length) {
				$body.addClass('is-sub-nav');
				hasSubnav=true;
			}

			//Handle scroll events
			self.handleScroll(hasSubnav);

			//Init Accordions
			accordions = self.initAccordion();

			//Init TypeAhead
			//self.initTypeAhead();

			self.render();


			//$('#search-modal').find('.close-btn').on('click', self.closeSearchModal);
			$('#search-modal').find('.close-btn').on('click touchstart', function(e){
				e.preventDefault();
				//TO hide the keyboard
				if(has.touch){
					$(this).closest('#search-modal').find('input').blur();
				}
				self.toggleTopbar(e);

				//Fire Analytics
				Analytics.fire(appName, '56.37', {
					'current_pagename': Analytics.currentPageName(),
					'device_type': Analytics.deviceType
				});
			});

			/*
			* Add hide classes when the transition stops 
			*/
			if(has.cssTransitions){
				//Add styles after top dropdown bar finishes transition
				$('.topnav-dropdown').bind(transitionEndEvents, function(e){
					var $this=$(this),
						propertyName=e.originalEvent.propertyName;

					//For search dropdown, transionEnd fires twice because background and opacity are transitioning.
					//Opacity is the last property transiton
					//Top is for notebook.
					if(propertyName === 'opacity' || propertyName === 'top'){
						//Current transition stopped. Ready for new transitions.
						self.topbarDropdownReady=true;
					}

					//add clse style after transition
					if(!$this.hasClass('open')){
						$this.addClass('close');
					}
					
				});


				$navTopBar.bind(transitionEndEvents, function(e){
					//if($searchModal.hasClass('open')){
						var $this=$(this),
							navbarTop=$this.offset().top;
						if(navbarTop <=0 && !has.touch){
							//$searchModal.css('top', (topnavHeight+navbarHeight));
							$searchModal.removeClass('no-topbar');
						}
					//}
				});
			}
		},
        // checks whether page is single or multi section
        multiSectionCheck: function(){
            var nav = $("#subnav ul li a"),
                data_target = null,
                total = null,
                section_exist = null,
                noselect_check = $(".nav [data-link]").length;

            nav.each(function(){

                if(noselect_check <= 0) {
                    data_target = $(this).attr("data-target");
                    if($("section" + data_target).length == 1){
                        total++;
                    }
                } else {
                    data_target = $(this).attr("href");
                    if($("a" + data_target).length == 1){
                        total++;
                    }
                }

                console.log("noselect_check" , noselect_check);

            });

            section_exist = (total == null) ? false : true;

            this.multiSectionCheck = function(){
                return section_exist;
            }

            return section_exist;
        },
		/**
		 * Scroll event handlers
		 * @param  {Boolean} isSubNav [description]
		 * @return {[type]}           [description]
		 */
		handleScroll: function(isSubNav){
			var self=this,
				scrollTimer=-1,
				$vehicleDropdown=$('.select-vehicle-dropdown'),
				dropdownMargin,
				$subnavEl;

			//If there's subnav 
			if(isSubNav){
				$subnavEl=$subnav.find("#subnav");
				if($body.data('app-name')==='vehicle-landing'){
					//Need a global timer - this is used in prev/next arrow clicks
					window.mlpScrollTimer=-1;
				}
			}
			
			if(!has.touch){
				$window.on('scroll', function(e){
					var evt=e;

					if (scrollTimer !== -1){  
						clearTimeout(scrollTimer);
					}
					//50 ms timer to capture scrolling has stopped
					scrollTimer=setTimeout(function(){
						var scrollTop=$(this).scrollTop();
							

						//If scrolledtop is zero, show top-navbar 
						if(scrollTop===0){
							$navTopBar.css('top', '0px').removeClass('hide-topnav');

							$navbar.css({
								'top':topnavHeight+'px'
							});

							self.updateSubnav(topnavHeight+navbarHeight);
							self.adjustPlaceholder(navFullHeight);

							if(!has.cssTransitions){
								$searchModal.removeClass('no-topbar');
							}
							
							
						}else{
							//$searchModal.css('top', navbarHeight);
							if($searchModal.hasClass('open') ||  $searchModal.hasClass('ie-open')){
								$searchModal.addClass('no-topbar');
							}
							
							$navTopBar.css('top',-topnavHeight+'px').addClass('hide-topnav');
							
							$navbar.css({
								'top':'0px'
							});

							self.updateSubnav(navbarHeight);

							self.adjustPlaceholder(navFullHeight-topnavHeight);
						
							
						/*	if(!$vehicleDropdown.hasClass('open')){
								dropdownMargin=$vehicleDropdown.height()-navbarHeight;
								$vehicleDropdown.css({
									'margin-top':-dropdownMargin+'px'
								})
							}*/
							$navDropdowns.each(function(){
								//We need to adjust vehivcle dropdown height when top nav bar fades away
								if(!$(this).hasClass('open')){
									dropdownMargin=$(this).height()-navbarHeight;
									$(this).css({
										'margin-top':-dropdownMargin+'px'
									});
								}
							});
						}

						//Check if scrollNav is initialized
						if($subnavEl && $subnavEl.hasClass('scroll-nav')){
	                        // if there is only one section , prevent scroll functions from being called
							if(self.multiSectionCheck() === true) {
	                            //call getScrolledIndex method of subnavscroll
	                            $subnavEl.scrollnav({
	                                'method': 'processScroll',
	                                'params': $(this).scrollTop()
	                            });
	                        }
						}

					},50);

					//Timer for mlp tagging
					if(window.mlpScrollTimer){
						if(window.mlpScrollTimer !== -1){
							clearTimeout(window.mlpScrollTimer);
						} 
						window.mlpScrollTimer= setTimeout(function(){
							Events.trigger("scrollDone", $(this).scrollTop());
						}, 2000);
					} 
				});
			}else{
				//No subnav but has touch 
				$window.on('touchmove', function(e){
					if (scrollTimer !== -1){  
						clearTimeout(scrollTimer);
						
						$globalnav.removeClass('fixed-nav').addClass('scroll-nav');	

						//50 ms timer to capture scrolling has stopped
						scrollTimer=setTimeout(function(){
							$globalnav.removeClass('scroll-nav').addClass('fixed-nav');
						},50); 
					}
				});
			}
		},

		initAccordion: function() {
			var $el, $caption, $content;

			return _.map($(".select-vehicle-menu .slider"), function(el, i) {
				$el = $(el);
				$caption = $el.find(".caption");
				$content = $el.find(".slider-content");

				return {
					el: $el,
					mask: $el.find(".slider-mask"),
					captionWidth: $caption.width(),
					contentWidth: $content.width()
				};
			});
		},

		render: function() {
			var self = this;

			// Set accordion active panel to first one
			self.playAccordion(currentIndex, true);	
			//Will be true for browsers that support placeholder
			self.isInputPlaceholder=Modernizr.input.placeholder;
			$searchInput.off('focus');
			
		},

		handleAccordionClick: function(e) {
			e.preventDefault();

			currentIndex = $(e.currentTarget).parent(".slider").index();

			this.playAccordion(currentIndex);
		},

		updateSubnav: function(height) {
			if (has.cssTransitions) {
				$subnav.css({
					'top':height
				});

			} else {
				$subnav.animate({
					top: height
				}, '750');					
			}
		},

		playAccordion: function(currentIndex, warp) {
			var self = this,
				currentTarget = accordions[currentIndex],
				animateOptions = {
					duration: (warp ? 0 : 333),
					queue: false
				};

			_.each(accordions, function(accordion, i) {
				accordion.el.removeClass("open");

				var elLeft = ((i * currentTarget.captionWidth) + (currentIndex < i ? currentTarget.contentWidth : 0));
				var maskWidth = (currentTarget.el.is(accordion.el) ? accordion.contentWidth : 0) + "px";

				if (has.cssTransitions) {
					accordion.el.css({
						left: elLeft
					});

					accordion.mask.css({
						width: maskWidth
					});
				} else {
					accordion.el.animate({
						left: elLeft
					}, animateOptions);

					accordion.mask.animate({
						width: maskWidth
					}, animateOptions);
				}

			});

			currentTarget.el.addClass("open");

			// If it's not an artificial click go ahead and track the click.
			if (!warp) {
				self.onAccordionClick(currentTarget.el);
			}
		},

		toggleDropDown: function(e) {
			var self = this,
				$this = $(e.currentTarget),
				$target = $this.parent(".nav-item"),
				isOpen = $target.toggleClass("open").hasClass("open"),
				currentDropdown = navDropdowns[$target.index() - 1],
				navHeight=$navTopBar.hasClass('hide-topnav')? navbarHeight : (navbarHeight+topnavHeight);

			
			//Triggering analytics only when red up/down button or select vehicle clicked
			if($(e.target).is("i") || $(e.currentTarget).parent().hasClass('select-vehicle')){
				//if (isOpen) self.onSelectVehicleClick();	
				if (isOpen) self.onNavbarClick(e, $this);	
			}
			if($(e.currentTarget).parent().hasClass('shopping-tools')){
				//if (isOpen) self.onShoppingToolsClick();
				if (isOpen) self.onNavbarClick(e, $this);
			}

			// Handle styles for navbar selected item
			$target.prev().toggleClass("openLeft");
			$target.next().toggleClass("openRight");

			//$(".nav-item").each(function(i, e) {
			self.$navItems.each(function(i, e) {
				var $thisI = $(this);

				//Skip if it's the current nav-item
				if ($thisI.is($target)) {
					return true;
				}

				$thisI.removeClass("open");
				$thisI.prev().removeClass("openLeft");
				$thisI.next().removeClass("openRight");
			});

			//Close open dropdowns
			_.each(navDropdowns, function(dropdown) {
				if (dropdown.hasClass('open')) { // only perform on open dropdown
					var height = dropdown.height();
					
					dropdown.css({
						"z-index": currentDropdownZ - 1
					});

					//Change the top position of subnav
					if ($subnav.length){
						//self.updateSubnav(navbarHeight);
						if($navTopBar.hasClass('hide-topnav')){
							self.updateSubnav(navbarHeight);
						}else{
							self.updateSubnav(navbarHeight+topnavHeight);
						}
						
					}

					if (has.cssTransitions) {
						dropdown.css({
							//'margin-top': -(height - navbarHeight)
							'margin-top':-(height-navHeight)
						});
					} else {
						dropdown.animate({
							marginTop: -(height-navHeight)
						}, self.options.animationOptions);
					}

					dropdown.removeClass('open');
				}
			});

			// Open dropdown by index.
			if (isOpen) {
							//If modal is opened, close it
				if($topnavDropdowns.hasClass('open')|| $topnavDropdowns.hasClass('ie-open')){
					//self.closeSearchModal(e);
					self.toggleTopbar(e);
				}
				currentDropdown.css({
					"z-index": currentDropdownZ,
					'visibility': 'visible'
				});

				if (has.cssTransitions) {
					currentDropdown.css({
						//'margin-top': navbarHeight
						'margin-top': navHeight
					});
				} else {
					currentDropdown.animate({
						//marginTop: navbarHeight
						marginTop: navHeight
					}, self.options.animationOptions);
				}

				currentDropdown.addClass('open');

				//Change subnav position
				if ($subnav.length){
					self.updateSubnav(currentDropdown.height() + navHeight);
				}

				//Listening for window scrolls.
				self.hookOpenDrawer(currentDropdown);

				Events.trigger('globalHeader:open', {globalHeaderOpen:true});
			} else {
				self.unhookOpenDrawer();

				Events.trigger('globalHeader:closed', {globalHeaderOpen:false});
			}

			// adjust the height of the placeholder so content slides with dropdown
			if (!has.touch && ($window.scrollTop() === 0 || $navPlaceholder.height() > navHeight)) {
				self.adjustPlaceholder((
					isOpen ? 
						(currentDropdown.height() + navHeight + ($subnav.length ? subnavHeight : 0)) 
						: navHeight + ($subnav.length ? subnavHeight : 0)
				));
			}

			return false; //prevent devault behavior.
		},

		adjustPlaceholder: function(height) {
			var self = this,
				duration = 0.75;

			if (has.cssTransitions) {
				$navPlaceholder.css({
					'-webkit-transition-duration': duration + 's',
					'-moz-transition-duration': duration + 's',
					'-ms-transition-duration': duration + 's',
					'-o-transition-duration': duration + 's',
					'transition-duration': duration + 's',
					height: height
				});
			} else {
				$navPlaceholder.animate({
					height: height
				}, {duration:''});
			}
		},

		hookOpenDrawer: function(currentDropdown) {
			var self = this;

			self.unhookOpenDrawer(currentDropdown);

			$window.on('scroll touchmove', $.proxy(self.toggleDropDown, self));
			$window.on((has.touch) ? 'touchstart' : 'click', $.proxy(self.onWindowClick, self, currentDropdown ));
		},

		unhookOpenDrawer: function(currentDropdown) {
			var self = this;

			$window.off('scroll touchmove', $.proxy(self.toggleDropDown, self));
			$window.off((has.touch) ? 'touchstart' : 'click', $.proxy(self.onWindowClick, self, currentDropdown));
		},

		onWindowClick: function(dropdown, e) {
			var self = this,
				$target=$(e.currentTarget);

			//Dont toggle dropdown if navbar is clicked except the top nav bar
			if (!self.isDialogChild(e.target)) {
				if(dropdown.hasClass('nav-drop-down')){
					self.toggleDropDown(e);
				}else{
					self.toggleTopbar(e);
				}
			}

			$window.off('scroll touchmove', $.proxy(self.hideDropdowns, self));
			$window.on('scroll touchmove', $.proxy(self.hideDropdowns, self, dropdown)); //For when they start scrolling after touch
		},

		hideDropdowns: function(dropdown, e) {
			var self = this;

			if(dropdown.hasClass('nav-drop-down')){
				$window.off('scroll touchmove', $.proxy(self.hideDropdowns, self));
				$(".nav-drop-down").css({
					'visibility': 'hidden'
				});
				self.toggleDropDown(e);
			}else if(dropdown.attr('id')!=='search-modal'){
				self.toggleTopbar(e);
				//disabled this for top nav bar 
			}
		},

		isDialogChild: function(child) {
			var $parents=$(child).parents(),
				$navbar=$parents.filter(this.$el);
			return $navbar.length>0;
		},

		onAnimationComplete: function() {
			var $this = $(this);

			$this.css({
				'visibility': ($this.hasClass('open') ? 'visible' : 'hidden')
			});
		},

		swipeLeftAccordion: function(e) {
			currentIndex = ((++currentIndex) % accordions.length);

			this.playAccordion(currentIndex);
		},

		swipeRightAccordion: function(e) {
			currentIndex = ((--currentIndex + accordions.length) % accordions.length);

			this.playAccordion(currentIndex);
		},

		/*
		 * Analytics Tagging
		 */
		
		onAccordionClick: function(el) {
			var tagId = '';

			if (el.hasClass('cars-minivan')) {
				tagId = '56.4';
			} else if (el.hasClass('trucks')) {
				tagId = '56.7';
			} else if (el.hasClass('crossovers-suvs')) {
				tagId = '56.5';
			} else if (el.hasClass('hybrids-evs')) {
				tagId = '56.6';
			} else if (el.hasClass('upcoming-vehicles')) {
				tagId = '56.8';
			}

			Analytics.fire(appName, tagId, {
				'current_pagename': Analytics.currentPageName(),
				'device_type':Analytics.deviceType
			});

			return false;
		},
		onMenuItemCarClick: function(e) {
			e.preventDefault();
			var self=this,
				$currentTarget=$(e.currentTarget),
				href=$currentTarget.find('.page-header a').attr('href'),
				modelName = $('.page-header span', e.currentTarget).html().replace(/<br\s*[\/]?>/gi,'_'),
				modelNameLnk = $currentTarget.data('vehicle'),
				pathName,
				hrefPath,
				isDisclaimer =  (e.target.tagName.toLowerCase() == 'sup'); //checks if target element is <sup>

			if (typeof $(e.target).data('disclaimer') === "undefined" && !isDisclaimer) {
				pathName=window.location.pathname.replace(/\//g,'');//avalon
				hrefPath=href.split('/')[1]; // avalon

				//redirect the page to the clicked link
				window.location=href;
				
				// href with the same pathname (eg 'avalon/' to 'avalon/#!/avalonwelcome'), will not reload the page
				//so manually close the dropdown
				if(/\#\!/.test(href) && pathName === hrefPath){
					//self.toggleDropDown(e);
					window.location.reload();
				}
			}
			
			Analytics.fire(appName, '56.19', {
				'current_pagename': Analytics.currentPageName(),
				'model_name': modelName,
				'device_type':Analytics.deviceType
			});
		},
		onMenuItemExploreClick: function(e) {
			var modelName = $('.page-header span', $(e.currentTarget).closest('.menu-item')).html().replace(/<br\s*[\/]?>/gi,'_');
			
			Analytics.fire(appName, '56.18', {
				'current_pagename': Analytics.currentPageName(),
				'model_name': modelName,
				'device_type':Analytics.deviceType
			});
		},
		onMenuItemBuildClick: function(e) {
			var modelName = $('.page-header span', $(e.currentTarget).closest('.menu-item')).html().replace(/<br\s*[\/]?>/gi,'_');

			Analytics.fire(appName, '56.1', {
				'current_pagename': Analytics.currentPageName(),
				'model_name': modelName,
				'device_type':Analytics.deviceType
			});
		},
		onViewAllVehiclesClick: function(e) {
			Analytics.fire(appName, '56.9', {
				'current_pagename': Analytics.currentPageName(),
				'device_type':Analytics.deviceType
			});
		},
		onBuildPriceClick: function(e) {
			Analytics.fire(appName, '56.28', {
				'current_pagename': Analytics.currentPageName(),
				'link_name' : 'Build_And_Price',
				'device_type':Analytics.deviceType
			});
		},
		onRequestQuoteClick: function(e) {
			Analytics.fire(appName, '56.25', {
				'current_pagename': Analytics.currentPageName(),
				'device_type':Analytics.deviceType
			});
		},
		onAccessoriesGuideClick: function(e) {
			Analytics.fire(appName, '56.10', {
				'current_pagename': Analytics.currentPageName(),
				'device_type':Analytics.deviceType
			});
		},
		onDealerChecklistClick: function(e) {
			Analytics.fire(appName, '56.13', {
				'current_pagename': Analytics.currentPageName(),
				'device_type':Analytics.deviceType
			});
		},
		onCompareClick: function(e) {
			Analytics.fire(appName, '56.13', {
				'current_pagename': Analytics.currentPageName(),
				'device_type':Analytics.deviceType
			});
		},
		onFindYourMatchClick: function(e) {
/*			if (has.touch) { 
				e.preventDefault(); 
				window.location = '/all-vehicles/'; 
			}*/
			Analytics.fire(appName, '56.28', {
				'current_pagename': Analytics.currentPageName(),
				'link_name' : 'Find_Your_Match',
				'device_type':Analytics.deviceType
			});
		},
		onViewBrochuresClick: function(e) {
			Analytics.fire(appName, '56.3', {
				'current_pagename': Analytics.currentPageName(),
				'device_type':Analytics.deviceType
			});
		},
		onSpecialOffersClick: function(e) {
			Analytics.fire(appName, '56.17', {
				'current_pagename': Analytics.currentPageName(),
				'device_type':Analytics.deviceType
			});
		},
		onInventoryClick: function(e) {
			Analytics.fire(appName, '56.23', {
				'current_pagename': Analytics.currentPageName(),
				'device_type':Analytics.deviceType
			});
		},
		onFinancialToolsClick: function(e) {
			Analytics.fire(appName, '56.15', {
				'current_pagename': Analytics.currentPageName(),
				'device_type':Analytics.deviceType
			});
		},
		onWhatFitsMyBudgetClick: function(e) {
			Analytics.fire(appName, '56.16', {
				'current_pagename': Analytics.currentPageName(),
				'device_type':Analytics.deviceType
			});
			if($(e.currentTarget).attr('href').indexOf(location.hash) <= 0) {
				location.href = $(e.currentTarget).attr('href');
			}
			else {
				Events.trigger('finan-tools:navigation', 'budget');
			}
		},
		onEstimatePaymentsClick: function(e) {
			Analytics.fire(appName, '56.14', {
				'current_pagename': Analytics.currentPageName(),
				'device_type':Analytics.deviceType
			});
			if($(e.currentTarget).attr('href').indexOf(location.hash) <= 0) 
				location.href = $(e.currentTarget).attr('href');
			else
				Events.trigger('finan-tools:navigation', 'payments');
		},
		onBuyLeaseQuizClick: function(e) {
			Analytics.fire(appName, '56.11', {
				'current_pagename': Analytics.currentPageName(),
				'device_type':Analytics.deviceType
			});
			if($(e.currentTarget).attr('href').indexOf(location.hash) <= 0) 
				location.href = $(e.currentTarget).attr('href');
			else
				Events.trigger('finan-tools:navigation', 'quiz');
		},
		onCreditGuidesClick: function(e) {
			Analytics.fire(appName, '56.12', {
				'current_pagename': Analytics.currentPageName(),
				'device_type':Analytics.deviceType
			});
			if($(e.currentTarget).attr('href').indexOf(location.hash) <= 0) 
				location.href = $(e.currentTarget).attr('href');
			else
				Events.trigger('finan-tools:navigation', 'guide');
		},
		onTCUVClick: function(e) {
			Analytics.fire(appName, '56.28', {
				'current_pagename': Analytics.currentPageName(),
				'link_name' : 'Toyota_Certified_Used_Vehicles',
				'device_type':Analytics.deviceType
			});
		},		
		onContactDealerClick: function(e) {
			Analytics.fire(appName, '56.28', {
				'current_pagename': Analytics.currentPageName(),
				'link_name' : 'Contact_A_Dealer',
				'device_type':Analytics.deviceType
			});
		},
		onTradeValueClick: function(e) {
			Analytics.fire(appName, '56.28', {
				'current_pagename': Analytics.currentPageName(),
				'link_name' : 'Get_Trade-In_Value',
				'device_type':Analytics.deviceType
			});
		},

		/**
		 * Track Navbar items click
		 */
		onNavbarClick : function(e, $link){
			var self=this,
				target=e.currentTarget,
				$target=$(target),
				tagId,
				btnText='';
			
			if($link !== undefined){ //Coming from toggleDropDown
				tagId=$link.data('omni');
				btnText=$link.text();
			}else if(target.nodeName ==='LI'){
				$link=$target.find('a');
				tagId=$link.data('omni');
				btnText=$link.text().replace(/ /g, '_');
				//btnText=$link.text();
			}

			if(tagId !== undefined){
				Analytics.fire(appName, tagId, {
					'current_pagename': Analytics.currentPageName(),
					'device_type': Analytics.deviceType,
					'button_name': btnText
				});
			}
		},

		/** Top nav bar click **/
		onNavTopbarClick:function(e){
			var self=this,
				$target=$(e.currentTarget),
				//$link=$target.find('a'),
				tagId='56.33',
				btnText=$target.data('buttonName') || $target.text();
				//btnText=$link.data('buttonName') || $.trim($link.text().replace(/\s/g,'');

			//Clicked on notebook or search 
			if($target.data('targetDropdown')!== undefined){
				e.preventDefault();
				if(self.topbarDropdownReady){
					self.toggleTopbar(e);//open/close flyouts
				}
			}

			if($target.closest('li').hasClass('language-switch')){
				e.preventDefault();
				btnText=$target.find('span').not('.hide').text();
				var languageToggle = new LanguageToggle();
			}

			Analytics.fire(appName, tagId, {
				'current_pagename': Analytics.currentPageName(),
				'device_type': Analytics.deviceType,
				'button_name': $.trim(btnText)
			});
		}, 

		/**
		 * This method hides/closes search overlay when close button is clicked
		 */
		toggleTopbar: function(e){
			var self=this,
				$target=$(e.currentTarget),
				//$link=$target.find('a'),
				$currDropdown=$('#'+$target.data('targetDropdown')),
				$icon=$target.find('i'),
				navHeight=$navTopBar.hasClass('hide-topnav')? navbarHeight : (navbarHeight+topnavHeight);

			
			if($currDropdown === undefined || $currDropdown.length<=0){
				$topnavDropdowns.each(function(item){
					self.closeTopDropdown($(this), -250);
				});
				//Remove click event listener
				self.unhookOpenDrawer($currDropdown);
				$topnavIcons.removeClass('selected');

			}else if($currDropdown.hasClass('open')||$currDropdown.hasClass('ie-open')){ //If open, close dropdown
				self.closeTopDropdown($currDropdown,-250) ;
				$icon.removeClass('selected');
				
			}else{//If closed, open dropdown
				//$topnavDropdowns.removeClass('open');
				
				//$currDropdown.addClass('open');
			
				$topnavDropdowns.each(function(item){
					self.closeTopDropdown($(this), -250);
				});
				$topnavIcons.removeClass('selected');
				self.openTopDropdown($currDropdown,topnavHeight) ;
				
				$icon.addClass('selected');
				
				//If navbar drops downs are open, close them
				if($('.nav-drop-down').filter('.open').length>0){
					self.toggleDropDown(e);
				}
				//Add window clickhandler
				self.hookOpenDrawer($currDropdown);
				
			}
		},

		openTopDropdown:function($dropdown, top){
			var self=this,
				animateObj={opacity: '.95'};
				
			if(has.cssTransitions){
				//Clear all open dropdowns
				$topnavDropdowns.removeClass('open');
				//Add open class to the current dropdown
				$dropdown.removeClass('close').addClass('open');
				if($searchInput.length>0){
					self.topbarDropdownReady=false;
					self.onSearchfocus($searchInput);

					//Add this class to disable scroll on body when search modal is opened
					if(has.touch){
						$('body').addClass('search-modal-open');
					}
				}

			}else{
				$topnavDropdowns.removeClass('ie-open');
				
				if($dropdown.attr('id')==='notebook-flyout'){
					animateObj={
						top : top
					};
				}else{
					self.onSearchfocus($searchInput);
				}
				$dropdown.removeClass('close').addClass('ie-open');
				$dropdown.animate(animateObj,100);
				
			}
		},

		closeTopDropdown:function($dropdown, top){
			var self=this,
				animateObj={opacity: 0};

			if(has.cssTransitions){
				self.topbarDropdownReady=false;
				$dropdown.removeClass('open');

				//If touch, remove 'search-modal-open' class from body to enable scroll
				if(has.touch && $dropdown.find('.nav-search-input').length>0){
					$('body').removeClass('search-modal-open');
				}
			}else{
				if($dropdown.attr('id')==='notebook-flyout'){
					animateObj={
						top: top
					};
				}

				$dropdown.animate(animateObj,100).removeClass('ie-open').addClass('close');
			}
		}, 

		//Submit search form
		onSearchSubmitClick: function(e){
			e.preventDefault();
			Analytics.fire(appName, '56.36', {
				'current_pagename': Analytics.currentPageName(),
				'device_type':Analytics.deviceType
			});
			$('.nav-search-box').find('form').submit();
		},

		/**
		 * Track first key press 
		 * FOr IE, swap placeholder 
		 * Find first keypress by removing placeholder text on first keypress
		 */
		onSearchClick: function(e) {
			var self=this,
				$currentTarget=$(e.currentTarget), 
				placeholder=$currentTarget.attr('placeholder');
			
			if (e.which && e.which === 13) {
				self.onSearchSubmitClick(e);	
			}else{

				//First keypress, placeholder will not  be empty
				if(placeholder !== ''){
					//IE
					if(!self.isInputPlaceholder) {
						$currentTarget.removeClass("placeholder").val('');
					}

					//Store placeholder value 
					$currentTarget.attr('dummyText' ,placeholder);
					
					//Remove placeholder value 
					$currentTarget.attr('placeholder',"");

					//Show submit button
					$searchSubmitBtn.addClass('show');

					//Fire tag 56.35
					Analytics.fire(appName, '56.35', {
						'current_pagename': Analytics.currentPageName(),
						'device_type':Analytics.deviceType
					});
				}
			}
		},

		/**
		 * Reset form input on focus
		 * -add placeholders  
		 * -clear old values
		 * -Hide 'submit button'
		 */
		onSearchfocus: function($input) {
			var self=this,
				placeholderText=$input.attr('dummyText');
				
			$input.attr('placeholder', placeholderText);
			
			//For IE
			if(!self.isInputPlaceholder){
				$input.val(placeholderText).addClass('placeholder');
				self.moveCursorToFront($input[0]);

			}else {
				$searchSubmitBtn.removeClass('show');
				$input.focus().val('');
				if(has.touch){
					//To stop scrolling when search is open		
					window.scrollTo(0,0);
				}
			}
		},

		/**
		 * Move the cursor to the begining
		 */
		moveCursorToFront: function (el) {
			if(el.setSelectionRange){
				el.setSelectionRange(0, 0);
			}else if(el.createTextRange){
				var part = el.createTextRange();
				part.move("character", 0);
				part.select();
			}
		},

		/**
		 * On Focus out, reset input field
		 * Add placeholders back
		 */
		onSearchFocusOut: function(e) {
			var self=this,
				$target=$(e.currentTarget);

			if( $target.val() === "") {
				if(!self.isInputPlaceholder) {
					$target.addClass("placeholder").val($target.attr('dummyText'));
					self.moveCursorToFront($target[0]);
				}
			}
		},

		/**
		 * On note items in notes dropdown clicked
		 */
		onNoteLiClick:function(e){
			var self=this;
			self.toggleTopbar(e);
		}

	});

	// Return public interface
	return GlobalHeader;

});

/**
 * @requires rit
 * @requires util/view
 * @requires util/analytics
 */
define('globalNav/global-footer',['rit', 'util/view', 'util/analytics','globalNav/language-toggle'], function(RIT, View, Analytics, LanguageToggle) {

	/**
	 * Global site footer
	 *
	 * @exports view/GlobalFooter
	 * @version {version}
	 */
	var $ = RIT.$,
		_ = RIT._,
		has = RIT.has,
		appName = 'global',
		events = has.touch? {
			//'touchstart ul:lt(3) a': 'onFooterLinkClick',
			'touchstart .language-switch-link': 'onFooterLinkClick1',
			'touchstart a': 'onFooterLinkClick',
			"click .footer-searchButton": "onFooterSearchClickBtn",
			'keypress .footer-search-input': 'keypressed'
		} : {
			//'click ul:lt(3) a': 'onFooterLinkClick',
			'click a': 'onFooterLinkClick',
			'click .language-switch-link': 'onFooterLinkClick1',
			"click .footer-searchButton": "onFooterSearchClickBtn",
			'keypress .footer-search-input': 'keypressed'
		};

	var reloadIframe = function(linkLocation){
		var $iframe = $("#vendor-iframe iframe");
		if ($iframe.length && linkLocation===location.href) {
			location.reload(true);
		}
	};

	/**
	 * @class GlobalFooter
	 * @extends util/view
	 */
	var GlobalFooter = View.extend({

		events: events,

		initialize: function() {
			// Already being loaded for global header
			//Analytics.getTags('global');
		},

		onFooterLinkClick1: function(e) {
			e.preventDefault();

			Analytics.fire(appName, '52.16', {
				'current_pagename': Analytics.currentPageName()
			});

			var languageToggle = new LanguageToggle();
		},

		onFooterLinkClick: function(e) {
			var id = e.target.id || $(e.target).parent()[0].id;

			var tagNumber = {
				'all-vehicles':'52.4',
				'new-inventory': '52.19',
				'certified-used': '52.6',
				'toyota-rent-a-car': '52.24',
				'monthly-mobility-program': '52.18',
				'find-your-match': '52.14',
				'upcoming-vehicles': '52.32',
				'concept-cars': '52.8',
				'financial-tools': '52.13',
				'phone-compatability-pairing': '52.21',
				'entune': '52.10',
				'accessories': '52.1',
				'contact-us': '52.9',
				'glossary': '52.15',
				'faq': '52.11',
				'our-company': '52.7',
				'our-news': '52.20',
				'careers': '52.5',
				'toyota-worldwide': '52.33',
				'toyota-financial-services': '52.12',
				'toyota-racing': '52.23',
				'facebook': '52.30',
				'twitter': '52.31',
				'youtube': '52.29',
				'rss': '52.25',
				'sign-up-for-updates': '52.27',
				'privacy-policy': '52.22',
				'legal-terms': '52.17',
				'site-map': '52.28',
				'ad-choices': '52.2',
				'view-all-disclosures': '52.3',
				'search-inventory': '52.19',
				'car-tips': '52.34',
				'awards': '52.36',
				'cars': '52.35',
				'trucks': '52.35',
				'suvs': '52.35',
				'crossovers': '52.35',
				'hybrids': '52.35',
				'hybrid-cars': '52.35',
				'hybrid-suvs': '52.35',
				'toyota-usa-newsroom': '52.20',
				'_bapw-link': '52.2',
				'googleplus': '52.37',
				'dealer-directory':'52.38'
			}[id] || '52.NA';

			if (tagNumber == 52.35) {
				Analytics.fire(appName, tagNumber, {
					'current_pagename': Analytics.currentPageName(),
					'device_type': Analytics.deviceType,
					'vehicle_class': $(e.target).html()
				});
				return;
			}

			if (tagNumber == 52.34) {
				Analytics.fire(appName, tagNumber, {
					'current_pagename': Analytics.currentPageName(),
					'device_type': Analytics.deviceType,
					'link_title': $(e.target).html()
				});
				return;
			}
			

			if (tagNumber != '52.NA') {
				var actionType = '';

				if(tagNumber === '52.30') actionType = 'facebook_link';
				if(tagNumber === '52.31') actionType = 'twitter_link';
				if(tagNumber === '52.29') actionType = 'youtube_link';
				if(tagNumber === '52.37') actionType = 'google_plus_link';

				Analytics.fire(appName, tagNumber, {
					'current_pagename': Analytics.currentPageName(),
					'device_type': Analytics.deviceType,
					'action_type': actionType,
				});
			}

			if ("faq" === id) reloadIframe(e.target.href);
		},

		onFooterSearchClickBtn: function(e) {
			this.trackFooterSearch();
			this.$('form').submit();
		},

		keypressed: function(evt) {
			var key = evt.which;
			if (key == 13) {
				this.trackFooterSearch();
			}
		},

		trackFooterSearch: function() {
			Analytics.fire(appName, '52.26', {
				'current_pagename': Analytics.currentPageName(),
				'device_type': Analytics.deviceType
			});
		}

	});

	// Return public interface
	return GlobalFooter;
});

define('text!globalNav/template/welcome-note.html',[],function () { return '<div class=\'flyout-inner\'>\n\t<div class=\'content-wrapper\'>\n\t\t<div class=\'content-top\'>\n\t\t\t<h3>Welcome to Your Notebook</h3>\n\t\t\t<p>Notebook simplifies your shopping experience by giving you a place to keep track of the important and useful information you find here.</p>\t\t\n\t\t</div>\n\t\t<div class=\'content-bottom\'>\n\t\t\t<a href=\'/notebook\'>Try It Out<i class=\'arrow-right\'></i></a>\n\t\t</div>\n\t</div>\n</div>';});

define('text!globalNav/template/notes.html',[],function () { return '<div class=\'flyout-inner\'>\n\t<div class=\'content-wrapper\'>\n\t\t<div class=\'content-top\'>\n\t\t\t<h3> Your Notes</h3>\n\t\t\t<ul class=\'notes-list\'>\n\t\t\t\t<% _.each(notes, function(note, i){\n\t\t\t\t\tif(i<=2){%>\n\t\t\t\t\t\t<li><a class=\'<%= note.noteType %>\' href=\'/notebook/#!note/<%= note.noteId %>\'><i class=\'note-type\' id=\'<%= note.noteType %>-note-icon\'></i><span><%= note.title %></span><i class=\'arrow-right\'></i></a></li>\n\t\t\t\t\t<%}else{\n\t\t\t\t\t\treturn false;\n\t\t\t\t\t}\n\t\t\t\t}); %>\n\t\t\t\t\n\t\t\t</ul>\n\t\t</div>\n\t\t<div class=\'content-bottom\'>\n\t\t\t<a href=\'/notebook\'>View More Notes<i class=\'arrow-right\'></i></a>\n\t\t</div>\n\t</div>\n</div>';});


/**
 * Copyright (c) 2009 Sergiy Kovalchuk (serg472@gmail.com)
 *
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Following code is based on Element.mask() implementation from ExtJS framework (http://extjs.com/)
 *
 */

/**
 * Custom plugin for the RIT project, merging Load Mask plugin with red Loading spinner
 * @requires jquery
 * Accepts both single and multiple selectors.
 *
 * @method loading  Draws a loading icon with no background, usually used on a small element, thumbnail, or button.
 * @method mask     Draws a loading icon over a 50% gray background, usually masking a large app section or panel.
 * @method unmask   Hides the loading mask
 *
 * @param data optional Can be an object, boolean, or string.
 * Data objects can specify multiple custom parameters:  {label, size, top, left, delay}.  Size can either be "small", or a pixel value.
 * If you specify data = false || 'stop' || 'hide', it will hide the loader.
 * If you specify any other string, it will treat the string as a label with default options.
 *
 *  Usage Examples:
 *  $('.submit-button').loading();  		// default spinner, no mask
 *  $('.submit-button').loading(false); 	// hide spinner
 *  $('.submit-button').loading('stop'); 	// hide spinner
 *  $('.submit-button').loading('hide'); 	// hide spinner
 *  $('.my-panel').mask();					// default masked spinner
 *  $('.submit-button').mask('My label');	// show label over spinner
 *  $('.submit-button').mask({  			// custom options
 *      'label': 'My Label',
 *      'size': 'small',
 	    'fixed': true,
 *      'top': '40%',
 *      'left': '50%',
 *		'delay': 1000
 *  });
 *  $('.submit-button').unmask();  			// hide masked spinner
 *
 */


define('ritLoading',['rit'], function(RIT) {

	var $ = RIT.$,
		_ = RIT._,
		Events = RIT.Events;


	var defaults = {
		delay: 0,
		masked: true,
		fixed: false
	};

	$.fn.loading = function(data) {
		var opts = _.clone(defaults);
		var elem = this;
		if (data === 'stop' || data === 'hide' || data === false) {
			$(elem).each(function() {
				$.unmaskElement($(this));
			});
		}
		else {
			if (data === 'small'){
				data = { size: 'small'};
			}
			else if (typeof data == 'string') {
				data = { label: data };
			}
			_.extend(opts,data);
			opts.masked = false;
			$(this).each(function() {
				if(typeof opts.delay == 'number' && opts.delay > 0) {
					var element = $(this);
					element.data("_load_timeout", setTimeout(function() {
						$.maskElement($(this), opts);
					}, delay));
				}
				else {
					$.maskElement($(this), opts);
				}
			});
		}
		return elem;
	};

	$.fn.mask = function(data){
		var opts = _.clone(defaults);
		if (data === 'small'){
			data = { size: 'small'};
		}
		else if (typeof data == 'string') {
			data = { label: data };
		}
		_.extend(opts,data);

		$(this).each(function() {
			if(typeof opts.delay == 'number' && opts.delay > 0) {
				var element = $(this);
				element.data("_load_timeout", setTimeout(function() {
					$.maskElement($(this), opts);
				}, delay));
			}
			else {
				$.maskElement($(this), opts);
			}
		});
	};

	/**
	 * Removes mask from the element(s). Accepts both single and multiple selectors.
	 */
	$.fn.unmask = function(){
		$(this).each(function() {
			$.unmaskElement($(this));
		});
	};

	/**
	 * Checks if a single element is masked. Returns false if mask is delayed or not displayed.
	 */
	$.fn.isMasked = function(){
		return this.hasClass("masked");
	};

	$.maskElement = function(element, options){

		//if this element has delayed mask scheduled then remove it and display the new one
		if (element.data("_load_timeout") !== undefined) {
			clearTimeout(element.data("_load_timeout"));
			element.removeData("_load_timeout");
		}

		if(element.isMasked()) {
			//$.unmaskElement(element);
			return false;
		}

		// Make the element relative positioned so icon can be centered
		if(element.css("position") == "static") {
			element.addClass("load-relative");
		}

		// Prevent scroll for large masked sections
		if (options.masked && element.height() > 100) {
			element.addClass("masked");
		}

		// Based on options, set style of loader
		var loadClass = (options.masked)?'loadmask':'load';
		loadClass = (options.fixed)?'loadfixed':loadClass;

		var loadWrapper = $('<div class="'+loadClass+'"></div>');
		var loadIcon = $('<i class="load-icon"></i>');

		// Custom size options, either 'small' or pixel/percent value
		if (options.size == 'small'){
			loadWrapper.addClass('small');
		}
		else if (typeof options.size == 'number'){
			if (!Modernizr.cssanimations && options.size <= 20){
				loadWrapper.addClass('small');
			}
			else {
				var m = Math.floor(options.size/2) * -1;
				loadIcon.css({
					'background-size':options.size + 'px',
					'height':options.size + 'px',
					'width':options.size + 'px',
					'margin': m+'px 0 0 '+m+'px'
				});
			}
		}
		else if (typeof options.size == 'string'){
			if (Modernizr.cssanimations){
				loadIcon.css({
					'background-size':options.size,
					'height':options.size,
					'width':options.size
				});
			}

		}
		// Custom Icon positioning
		if (typeof options.top == 'number'){
			loadIcon.css('top',options.top + 'px');
		}
		else if (typeof options.top == 'string'){
			loadIcon.css('top',options.top);
		}
		if (typeof options.left == 'number'){
			loadIcon.css('left',options.left + 'px');
		}
		else if (typeof options.left == 'string'){
			loadIcon.css('left',options.left);
		}
		loadWrapper.append(loadIcon).appendTo(element);


		// Add text label if available
		if(typeof options.label == 'string') {
			element.append('<div class="load-msg">' + options.label + '</div>');
		}
	};

	$.unmaskElement = function(element){
		//if this element has delayed mask scheduled then remove it
		if (element.data("_load_timeout") !== undefined) {
			clearTimeout(element.data("_load_timeout"));
			element.removeData("_load_timeout");
		}
		element.removeClass("masked load-relative");
		element.find(".load-msg,.load,.loadmask,.loadfixed").remove();
		//element.find("select").removeClass("load-hidden");
	};

});


/**
 * @requires rit
 * @requires util/view
 * @requires util/analytics
 */
define('globalNav/notebookFlyout',[
	'rit', 
	'util/view',
	'text!globalNav/template/welcome-note.html',
	'text!globalNav/template/notes.html',
	'util/analytics',	
	'ritLoading'
	], function(
		RIT, 
		View, 
		WelcomeNoteTemplate,
		NotesTemplate, 
		Analytics) {

	/**
	 * Global site footer
	 *
	 * @exports view/GlobalFooter
	 * @version {version}
	 */
	var $ = RIT.$,
		_ = RIT._,
		Events = RIT.Events,
		has = RIT.has,
		appName = 'global',
		$nbFlyout=$('#notebook-flyout'),
		$window = RIT.$window,
		events = {
			'click .flyout-inner .content-bottom a': 'handleEvent',
			'click .flyout-inner .notes-list a': 'goToNote'
		};

	if (has.touch) {
		events = {
			'touchstart .flyout-inner .content-bottom a': 'handleEvent',
			'touchstart .flyout-inner .notes-list a': 'goToNote'
		};
	}



	/**
	 * @class GlobalFooter
	 * @extends util/view
	 */
	var NotebookFlyout = View.extend({
		
		events: events,

		initialize: function(options) {
			var self=this,
				noteTemplate,
				notebookId;

			//check for notebook cookie, if does not exist then call API to create one
			if(/notebookQA=true/g.test(document.cookie)) {
				$('#notebook').removeClass('hide');
				
				if (!(/sausertoken/g.test(document.cookie)) || !(/notebookId/g.test(document.cookie))) {
					console.log('need to setup notebook');
					//$nbFlyout.mask();
					$.get('/ToyotaSite/rest/shopAssist/getNotebook/')
						.done(function(data) {
							console.log('notebook setup done', data);
							
							$.cookie("notebookId", data.notebookId, {
								expires : 365,           //expires in days
								path    : '/'          //The value of the path attribute of the cookie 
								//(default: path of page that created the cookie).
							});
							self.updateNotebookFlyout(data);
						})
						.fail(function(data){
							self.renderDefaultNote();
						});
				//If the user has 'notebookId' cookie
				}else{
					notebookId=$.cookie('notebookId');
					$.get('/ToyotaSite/rest/shopAssist/getNotebook/'+notebookId)
						.done(function(data){
							self.updateNotebookFlyout(data);
						})
						.fail(function(data){
							self.renderDefaultNote();
						});
				}

				//update notebook flyout template when notebook is updated
				Events.on('notebook:update',function(data){
					self.updateNotebookFlyout(data);
				});
			}
			
		}, 

		renderDefaultNote: function(){
			$nbFlyout.empty().append(_.template(WelcomeNoteTemplate));
		}, 

		updateNotebookFlyout: function(data){
			var self=this,
				noteTemplate;

			if(data !== undefined && data.notes && data.notes.length>0 ){
				$nbFlyout.addClass('notes-on');
				noteTemplate=_.template(NotesTemplate, {notes:data.notes});
				$nbFlyout.empty().append(noteTemplate);
			}else{
				self.renderDefaultNote();
			}
		},

		handleEvent: function(e){
			var tagId;
			if($('#notebook-flyout').hasClass('notes-on')){
				tagId = '56.9';
			}
			else{
				tagId = '56.31';
			}
			Analytics.fire('global', tagId, {
				'current_pagename':Analytics.currentPageName(),
				'link_name': e.target.innerHTML,
				'device_type':Analytics.deviceType } );
		},

		goToNote: function(e){
			Analytics.fire('global', '56.32', {
				'current_pagename':Analytics.currentPageName(),
				'note_type': e.currentTarget.className,
				'device_type':Analytics.deviceType } );
		}

	});

	// Return public interface
	return NotebookFlyout;
});

define('globalNav/main',['rit', 'util/view', 'globalNav/global-header', 'globalNav/global-footer', 'util/analytics', 'globalNav/notebookFlyout'],
	function(RIT, View, GlobalHeader, GlobalFooter, Analytics, NotebookFlyout) {
	// 'apps/login-registration/js/loginPlugin' added for R2
	var $ = RIT.$,
		_ = RIT._;

	var GlobalNav = View.extend({
		initialize: function() {
			var self=this;
			// set the pagename
			Analytics.setPageName('');
			Analytics.getTags('global');

			if (RIT.util.lang !== 'es'){
				var notebookFlyout= new NotebookFlyout({
					el: RIT.$('#global-nav')
				});				
			}

			var globalHeader = new GlobalHeader({
				el: RIT.$('#global-nav')
			});

			var globalFooter = new GlobalFooter({
				el: RIT.$('#global-footer')
			});
		}
	});

	return GlobalNav;

});

// DO NOT REMOVE: (Sean S) This is for a test I'm working on. I will remove when finished. 
// (Sasha S) Ok dude, no worries I'll just leave this in.
// (Jorge M) Sure, why not?
/*
define(['rit', 'util/view', 'globalNav/views/global-header', 'globalNav/views/global-footer', 'globalNav/views/sub-nav', 'util/analytics'],
	function(RIT, View, GlobalHeader, GlobalFooter, SubNav, Analytics) {

	var $ = RIT.$,
		_ = RIT._;

	var GlobalNav = View.extend({

		initialize: function() {
			Analytics.setPageName('');
			Analytics.getTags('global');

			var globalHeader = new GlobalHeader();

			var globalFooter = new GlobalFooter();

			// Check if the subnav exists and if so then create an instance of the SubNav
			if ($('.subnav').length > 0) {
				var subNav = new SubNav();
			}
		}
	});

	return GlobalNav;

});
*/
;
define('globalNav', ['globalNav/main'], function (main) { return main; });
