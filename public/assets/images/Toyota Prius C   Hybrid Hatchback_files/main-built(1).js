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

/* ========================================================
 * bootstrap-tab.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#tabs
 * ========================================================
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
 * ======================================================== */

/*!
 * jQuery imagesLoaded plugin v2.1.1
 * http://github.com/desandro/imagesloaded
 *
 * MIT License. by Paul Irish et al.
 */

/**
 * Copyright (c) 2009 Sergiy Kovalchuk (serg472@gmail.com)
 *
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Following code is based on Element.mask() implementation from ExtJS framework (http://extjs.com/)
 *
 */

/*!
 * Socialite v2.0
 * http://socialitejs.com
 * Copyright (c) 2011 David Bushell
 * Dual-licensed under the BSD or MIT licenses: http://socialitejs.com/license.txt
 */

// Chosen, a Select Box Enhancer for jQuery and Protoype
// by Patrick Filler for Harvest, http://getharvest.com
// 
// Version 0.9.8
// Full source at https://github.com/harvesthq/chosen
// Copyright (c) 2011 Harvest http://getharvest.com

/*
Chosen source: generate output using 'cake build'
Copyright (c) 2011 by Harvest
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

/**
 * @requires jquery

 * @param defaultSelection:

 * @param moveToIndex: An integer. If given, animates the indicator to the element with this index.
 */
define('navIndicator',['rit'], function(RIT) {

	var $ = RIT.$,
		Events = RIT.Events,
		has = RIT.has,
		$body = RIT.$body;

	$.fn.navIndicator = function(defaultSelection, moveToIndex) {

		var navs = [];

		function build(i,el){
			var self = this,
				$self = $(self),
				tabs = $self.find('li'),
				container = $self.find('ul').parent(),
				grayContainer = container.parent().hasClass('nav-options-gray'),
				exploreNav =  container.is('.items-12') || container.is('.items-11') || container.is('.items-10') || container.is('.items-9') || container.is('.items-8'),
				indicator = $self.find('.indicator'),
				activeEl = $self.find('li.is-on').eq(0),
				evtType = 'click touchstart';

			self.moveable = true;
			self.refreshIt = true;
			self.halt = false;

			Events.on("HALT_NAV_INDICATOR", function(data) {
				(data.configurator) ? self.halt = true : self.halt = false;
			});

			function selectItem(selector){ // Use $nav.setItem()
				animateIndicator.call(self,$(selector).index());
				return self;
			}

			function scrollHover() {
				indicator.show();
					setTimeout(function(){
						var index = $self.find('.active').index();
						if (self.moveable && (index !== -1)) animateIndicator(index);
					}, 300);
			}

			function hoverAnimate(el) {
				if (self.moveable && el.position() && typeof el.position().left === 'number') {
					var indicatorWidth = el.width() - 42;
					indicator.stop().animate({
						'left': el.position().left + 'px'
					}, 200, function() {
						indicator.find('span').width(indicatorWidth + 'px');
					});
				}
			}

			// If no li has .is-on, use argument (or empty selection).
			if (!activeEl.length) activeEl = $(defaultSelection);

			var animateIndicator = function(index) {
				var el = $('li', self).eq(index),
					elPos = el.position(),
					indicatorWidth = (grayContainer) ? 187 : exploreNav ? el.width() : el.width() - 42,
					indicatorHeight = el.height(),
					indicatorCss = {
						width:indicatorWidth+'px',
						height:indicatorHeight+'px'
					};

				el.siblings().removeClass('is-on');

				self.moveable = false;

				indicator.stop().css({
					'top': elPos.top + 'px',
					'left': elPos.left + 'px'
				});

				setTimeout(function() {
					el.siblings().removeClass('is-on');
					el.addClass('is-on');
					self.moveable = true;

					if (grayContainer) {
						indicator.find('img').css(indicatorCss);
					} else if (exploreNav) {
						indicator.find('span').css(indicatorCss);
						indicator.css({
							width:el.width() - 2 + 'px',
							height:(indicatorHeight + 25) + 'px'
						});
					} else {
						indicator.find('span').css(indicatorCss);
					}
					/* IE has an 'activate' event which was causing issues in configurator
					 * believe this is no longer in use
					setTimeout(function() {
						if (self.moveable) {
							$body.on('activate', scrollHover);
						}
					}, 1000);
					*/
				}, 300);

			}; // end animateIndicator

			// if moveToIndex was passed
			if (moveToIndex || moveToIndex === 0) {
				// animate the indicator to the given element
				animateIndicator(moveToIndex);

				// don't do anything else
				return;
			}

			// if there is an active element on load and the self's parent isn't hidden
			if (activeEl.length && ($self.parents('.panel').css('display') !== 'none')) {
				if (activeEl.index() !== -1) animateIndicator(activeEl.index());
			}

			// if there is only one element
			if (tabs.length == 1) {
				animateIndicator(0);
			}

			var isActiveHover = $self.hasClass('active-hover');

			// on click of a nav list item then do stuff
			tabs.on(evtType, function(evt, args) {
				var $this = $(this),
					index = $this.index();

				if (!isActiveHover) {
					evt.preventDefault();
				}

				Events.trigger('NAV_INDICATOR_CLICK', evt);
				$this.trigger('navIndicator:click', index);
				
				self.moveable = false;

				if ($this.attr('disabled') || $this.hasClass('disabled')) return;

				$body.off('activate');

				if (self.halt === false && index !== -1) animateIndicator(index);
			});


			// hover on subnav
			if ($self.hasClass('active-hover')) {
				if (self.moveable) {
					$body.on('activate', scrollHover);
				}

				if (!has.touch) {
					// hover handler for items
					$self.on('mouseover', 'li', function() {
						var el = $(this);
						indicator.show();
						if (self.moveable) hoverAnimate(el);
					});

					// mouseout handler for item container
					$self.on('mouseout', function() {
						var el = $self.find('.active');
						if (el.length) {
							if (self.moveable) hoverAnimate(el);
						} else {
							if (self.moveable) hoverAnimate($self.find('li.is-on'));
							if ($self.find('li.is-on').length === 0) indicator.hide();
						}
					});
				}
			}

			// You may call navIdicator with an optional default selection.
			if (activeEl.length) { // At least one li has class "is-on" ...
				activeEl.find('a').addClass('current-tab');
				indicator.show();
			}

			// if self refresh and scrollspy is included
			if (self.refreshIt && $.fn.scrollspy) {
				$('[data-spy="scroll"]').each(function () {
					$(this).scrollspy('refresh');
				});
				self.refreshIt = false;
			}

			$self.setItem = selectItem;

			return $self;
		}

		this.each(function(i,el){
			navs.push(build.call(this,i,el));
		});

		return navs[1]? navs : navs[0]? navs[0] : this;
	};
});

/**
 * @requires rit
 */
define('util/model',['rit'], function(RIT) {
    
	/**
	 * Provides the base class for a model.
	 * @exports util/model
	 * @version {version}
	 */
	
    /**
     * Model is the base class for all model classes. Models should extend this 
     * class.
     * @class Model
     * @extends rit.Backbone.Model
     * @see <a href="http://documentcloud.github.com/backbone/#Model">http://documentcloud.github.com/backbone/#Model</a>
     * 
     * @constructor
     * When creating an instance of a model, you can pass in the initial values 
     * of the attributes, which will be set on the model.
     * @param {Object} [attributes]
     * @returns Model
     */
    var Model = RIT.Backbone.Model.extend();
    
    /**
     * @static
     * @method extend
     * 
     * To create a Model class of your own, you extend rit.Model and provide 
     * instance properties, as well as optional classProperties to be attached 
     * directly to the constructor function.
     * 
     * extend correctly sets up the prototype chain, so subclasses created 
     * with extend can be further extended and subclassed as far as you like.
     * 
     * Model.extend(properties, [classProperties])
     * 
     * @param {Object} properties
     * @param {Object} [classProperties]
     */
	
    // Return public interface
    return Model;
    
});

define('app/models/awards-ratings',['rit', 'util/model'], function(RIT, Model) {

	/**
	 * @version {version}
	 */
	var $ = RIT.$,
		_ = RIT._,
		Events = RIT.Events,
		$body = RIT.$body,
		data = RIT.bodyData;

	/**
	 * @Class AwardsRatings
	 */
	var AwardsRatings = Model.extend({
		defaults: {
			kellyBlueReview: '',
			edmundsReview: '',
			kellyBlueData: '',
			edmundsData: '',
			apiKey: '457qvrjy3ppqe2h2em6g92ta',
			makeName: '',
			tmsModelName: '',
			tmsModelCode: '',
			modelYear: ''
		},

		/**
		 * @Default initialize function
		 * @function
		 */
		initialize: function() {
			var self = this;

			if (data) {
				//set default model and year
				self.set({
					makeName: 'toyota',
					tmsModelName: data['seriesName'],
					tmsModelCode: data['seriesCode'],
					modelYear: data['awardsYear']||data['year']
				});
			}

			self.on('change:kellyBlueData', self.fetchKellyBlueReviews);
			self.on('change:edmundsData', self.fetchEdnumbdsReviews);
		},

		/**
		 * @Gets the JSON data from the set URL
		 * @function
		 */
		url: function() {
			return this.url;
		},

		/**
		 * @Parse the response
		 * @function
		 */
		parse: function(response) {
			this.data = response;
		},
		
		/**
		 * @Sets required parameters for fetching data from Kelly Blue Brook API
		 * @function
		 */
		fetchKellyBlueReviews: function() {
			var self = this;

			//preparing url
			self.url = '/ToyotaSite/rest/ratings/kbb/' + self.get('makeName') + '/' + self.get('tmsModelCode') + '/' + self.get('modelYear');
			//self.url = 'http://devcpd5/ToyotaSite/rest/ratings/kbb/' + self.get('makeName') + '/' + self.get('tmsModelCode') + '/' + self.get('modelYear');
			//fetch the data
			self.fetch({
				error: function() {
					self.set({
						kellyBlueReview: 'Error!'
					});
				}
			});

			//sets the data to attributes
			$.when(self.fetch()).done(function() {
				if(self.data === null || self.data.channel.item.length === 0){
					self.set({
						kellyBlueReview: 'Error!'
					});
				}else{
					self.set({
						kellyBlueReview: self.data
					});    
				}
				
			});
		},
		
		/**
		 * @Sets required parameters for fetching data from Edmunds.com API
		 * @function
		 */
		fetchEdnumbdsReviews: function() {
			var self = this;

			//preparing url
			//self.url = '/v1/api/crrrepository/getcrrformakemodelyear?make=' + self.get('makeName') + '&model=' + self.get('tmsModelCode') + '&year=' + self.get('modelYear') + '&api_key='+ self.get('apiKey') +'&fmt=json';
			//self.url = 'http://api.edmunds.com/v1/api/crrrepository/getcrrformakemodelyear?make=' + self.get('makeName') + '&model=' + self.get('tmsModelCode') + '&year=' + self.get('modelYear') + '&api_key='+ self.get('apiKey') +'&fmt=json';
			//self.url = '/apps/awards/data/edmunds.json';
			self.url = '/ToyotaSite/rest/ratings/edmunds/' + self.get('makeName') + '/' + self.get('tmsModelCode').toLowerCase() + '/' + self.get('modelYear');

			//fetch the data
			self.fetch({
				error: function() {
					self.set({
						edmundsReview: 'Error!'
					});
				}
			});

			//sets the data to attributes
			$.when(self.fetch()).done(function() {
				if(self.data === null || typeof self.data.numberOfRatings === 'undefined'){
					self.set({
						edmundsReview: 'Error!'
					});
				}else{
					self.set({
						edmundsReview: self.data
					});
				}
			   
			});
		}
	});

	return AwardsRatings;
});

/**
 * @requires rit
 * @requires util/model
 */
define('app/models/compare-list',['rit', 'util/model'], function(RIT, Model) {

	var _ = RIT._,
		$ = RIT.$,
		Events = RIT.Events,
		$body = RIT.$body;

	/**
	 * PrimaryGrades Model represents all the details for a "Compare Tile".
	 * @name PrimaryGrades
	 * @constructor
	 * @return {Object} PrimaryGrades
	 */
	var CompareList = Model.extend({
		defaults: {
			data: {},
			keyTrims: {},
			// Contains primary data response data will be
			competitorTrims: {},
			// Contains competitor data response data will be
			compareReport: {},
			// Compare report data
			competitorTrimsId: '',
			// Fetch the competitor model data
			showCompetitorTrimId: '',
			// Passed for detialed view comparator app router
			competitorTrimImg: '',
			// Competitor trim image path
			keyModelId: '',
			// Fetch the primary model data
			keyTrimId: '',
			// Passed for detialed view comparator app router
			keyTrimImg: '' // Competitor trim image path
		},

		/**
		 * Initializtion function
		 * @name PrimaryGrades#initialize
		 * @function
		 */
		initialize: function() {
			var self = this;

			//self.fetchModelId();

			self.on('change:keyModelId', self.fetchKeyTrims, self);

			self.set('keyModelId', $body.data('modelId'));

			self.on('change:competitorTrimsId', self.fetchCompetitorsTrims, self);
			self.on('change:showCompetitorTrimId', self.fetchCompareReport, self);
		},

		url: function() {
			var self = this;
			return self.url;
		},

		parse: function(response) {
			this.set('data', response);
		},

		fetchKeyTrims: function() {
			var self = this,
				modelInfoObjVal = [],
				imgUrl;

			//preparing url
			//self.url = '/ComparatorREST/rest/1/json/trims/'+self.get('keyModelId');
			self.url = RIT.util.lscs_base + 'TComVehiclesData/VehicleTrim/data/' + $body.data('year') + '/' + $body.data('seriesCode') + '.xml';
			
			//fetch the data
			self.fetch({
				error: function() {
					Events.trigger('compareDataFill:fail');
				}
			});

			//sets the data to attributes
			$.when(self.fetch()).done(function(d) {
				_.each(_.pick(self.get('data')['Root'], 'ModelGrades'), function(obj, index) {
					_.each(obj, function(obj, index) {
						var modelGradeCode = obj.modelGradeCode,
							modelGradeName = obj.modelGradeName;

						_.each(_.pick(obj, 'VehicleTrims'), function(obj, index) {
							_.each(obj, function(obj, index) {
								var modelGradeNameVal = modelGradeName + " " + obj.trimName,
									modelChromeIdVal = obj.chromeId,
									modelGradeCodeVal = modelGradeCode;

								modelInfoObj = {
									'modelGradeName': modelGradeNameVal,
									'modelChromeId': modelChromeIdVal,
									'modelGradeCode': modelGradeCodeVal,
									'modelGradeDisplayName': modelGradeName
								};
								modelInfoObjVal.push(modelInfoObj);
							});
						});
					});
				});
				
				primaryGradDetail = modelInfoObjVal;
				seriesName = $body.data('seriesName');
				modelGradeDisplayNameObjArr = [];
				competitorTrimsIdVal = (typeof $body.data('chrome-id') != 'undefined') ? $body.data('chrome-id') : primaryGradDetail[0].modelChromeId.toString();
				modelGradeDisplayNameObj = (typeof $body.data('chrome-id') != 'undefined') ? _.where(primaryGradDetail, {modelChromeId: $body.data('chrome-id')}) : primaryGradDetail[0];

				if(_.isArray(modelGradeDisplayNameObj)){
					modelGradeDisplayNameObjArr = modelGradeDisplayNameObj;
				} else {
					modelGradeDisplayNameObjArr.push(modelGradeDisplayNameObj);
				}
				
				if(typeof modelGradeDisplayNameObjArr[0] != 'undefined') {
					imgUrl = "/content/common/img/jellies/large/" + $body.data('year') + "/" + $body.data('seriesCode') + "/" + modelGradeDisplayNameObjArr[0].modelGradeCode.toLowerCase().replace(/^\s+|\s+$/g,'') + ".png";
				}

				self.set({
					competitorTrimsId: competitorTrimsIdVal,
					keyTrimId: competitorTrimsIdVal,
					keyTrimImg: imgUrl,
					keyTrims: modelInfoObjVal
				});
				
				//Events.trigger('compareFetch:done');
			});
		},

		fetchCompetitorsTrims: function() {
			var self = this;

			//preparing url
			self.url = '/ComparatorREST/rest/1/json/keyCompetitorTrims/' + self.get('competitorTrimsId');

			//fetch the data
			self.fetch({ error: function(){} });

			//sets the data to attributes
			$.when(self.fetch()).done(function(){
				var selfData = self.get('data');
				if (selfData[0]) {
					self.set({
						competitorTrims: selfData,
						competitorTrimImg: selfData[0].imageUrl.toString(),
						showCompetitorTrimId: selfData[0].trimId.toString()
					});
				}
			});
		},

		fetchCompareReport: function() {
			var self = this;
			// langCode 1 = EN & 2 = ES
			if(RIT.util.lang == 'en')  self.set('langCode',1);
			else  self.set('langCode',2);

			//preparing url
			self.url = '/ComparatorREST/rest/1/json/comparisonReport?clientId=Toyota&langCode=' + self.get('langCode') + '&vehicles=' + self.get('keyTrimId') + '%2c' + self.get('showCompetitorTrimId');

			//fetch the data
			self.fetch({
				error: function() {}
			});

			//sets the data to attributes
			$.when(self.fetch()).done(function(response) {
                self.set({
                    compareReport: self.get('data')
                });
                self.trigger('compareReportFetch:done', response.success);
			});
		}
	});

	return CompareList;
});

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

define('plugin/bootstrap.transition',['jquery'], function($) {

    $(function() {

         // jshint ;_;
        /* CSS TRANSITION SUPPORT (http://www.modernizr.com/)
         * ======================================================= */

        $.support.transition = (function() {
            var transitionEnd = (function() {

                var el = document.createElement('bootstrap'),
                    transEndEventNames = {
                        'WebkitTransition': 'webkitTransitionEnd',
                        'MozTransition': 'transitionend',
                        'OTransition': 'oTransitionEnd otransitionend',
                        'transition': 'transitionend'
                    },
                    name;

                for (name in transEndEventNames) {
                    if (el.style[name] !== undefined) {
                        return transEndEventNames[name];
                    }
                }
            }());

            return transitionEnd && {
                end: transitionEnd
            };
        })();

    });
});

/* ========================================================
 * bootstrap-tab.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#tabs
 * ========================================================
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
 * ======================================================== */

define('plugin/bootstrap.tab',['rit', 'plugin/bootstrap.transition'], function(RIT) {

     // jshint ;_;

    var $ = RIT.$,
        has = RIT.has;

    /* TAB CLASS DEFINITION
     * ==================== */

    var Tab = function(element) {
            this.element = $(element);
        };

    Tab.prototype = {

        constructor: Tab,

        show: function() {
            console.log('show');
            var $this = this.element,
                $ul = $this.closest('ul:not(.dropdown-menu)'),
                selector = $this.attr('data-target'),
                previous, $target, e;

            if (!selector) {
                selector = $this.attr('href');
                selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); //strip for ie7
            }

            if ($this.parent('li').hasClass('active')) return;

            previous = $ul.find('.active:last a')[0];

            e = $.Event('show', {
                relatedTarget: previous
            });

            $this.trigger(e);

            if (e.isDefaultPrevented()) return;

            var $dataAttrSelector = $('div[data-tab-name="' + selector + '"]');
            $target = ($dataAttrSelector.length > 0) ? $dataAttrSelector : $(selector);

            //XXX: (Sean) replaced this with the above because the data-tab-name= was returning an object even when no el's found
            //$target = $('div[data-tab-name="' + selector + '"]') || $(selector); //$(selector)

            if ($ul.find('li').length === 1) return; //Don't activate anything if there's only a one tab.  When there's one menu item, 

            this.activate($this.parent('li'), $ul);
            this.activate($target, $target.parent(), function() {
                $this.trigger({
                    type: 'shown',
                    relatedTarget: previous
                });
            });
        },

        activate: function(element, container, callback) {

            var $active = container.find('> .active'),
                transition = callback && $.support.transition && $active.hasClass('fade');

            function next() {
                $active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active');

                element.addClass('active');

                if (transition) {
                    element[0].offsetWidth; // reflow for transition
                    element.addClass('in');
                } else {
                    element.removeClass('fade');
                }

                if (element.parent('.dropdown-menu')) {
                    element.closest('li.dropdown').addClass('active');
                }

                callback && callback();
            }

            if (element.hasClass('tab-pane')) { //added this condition to resolve a bug where tab-panes where doubling up when nav indicators where being clicked quickly from one to another
                next();
            } else {
                transition ? $active.one($.support.transition.end, next) : next();
            }

            $active.removeClass('in');
        }
    };


    /* TAB PLUGIN DEFINITION
     * ===================== */
    var old = $.fn.tab;

    $.fn.tab = function(option) {
        return this.each(function() {
            var $this = $(this),
                data = $this.data('tab');

            if (!data) $this.data('tab', (data = new Tab(this)));
            if (typeof option == 'string') data[option]();
        });
    };

    $.fn.tab.Constructor = Tab;


    /* TAB NO CONFLICT
     * =============== */
    $.fn.tab.noConflict = function() {
        $.fn.tab = old;
        return this;
    };


    /* TAB DATA-API
     * ============ */
    $(document).on('touchstart.tab.data-api click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function(e) {
        e.preventDefault();
        
        $(this).tab('show');
    });

});

/**
 * @requires rit
 * @requires util/view
 */
define('common/js/views/panel/panel',['rit', 'util/view', 'navIndicator', 'plugin/bootstrap.tab'], function(RIT, View, undefined) {

	// alias'
	var $ = RIT.$,
		_ = RIT._,
		Events = RIT.Events,
		has = RIT.has,
		$window = RIT.$window,
		events = {
			'click a[data-toggle="tab"]': '_handleTabClick'
		};

	if (has.touch) {
		events = {
			'touchstart a[data-toggle="tab"]': '_handleTabClick'
		};
	}

	/**
	 * Single panel within a panel set.
	 * @class Panel
	 * @return {Panel} A Panel object instance.
	 */
	var Panel = View.extend({

		tagName: 'section',

		className: 'panel',

		options: {
			//displayType: 'table-cell',
			minWidth: 1024,
			maxWidth: 1500,
			enableResize: true,
			enableMinMax: true,
			backgroundClass: 'panel-background',
			contentContainerSelector: '> .container',
			headerSelector: '.page-header',
			titleSelector: '.title',
			taglineSelector: '.tagline',
			panelContentSelector: '.page-content',
			navTabsSelector: '.nav-tabs > li',
			navIndicatorSelector: '.indicator',
			autoRender: true
		},

		events: events,

		initialize: function(opts) {
			var self = this,
				options;

			// Add data attributes to the options
			options = self.options = _.extend({}, self.options, self.$el.data());

			self.backgroundImage = undefined;

			self.$background = self.$('.' + options.backgroundClass);
			self.$contentContainer = self.$(options.contentContainerSelector);
			self.$header = self.$(options.headerSelector);
			self.$title = self.$header.find(options.titleSelector);
			self.$tagline = self.$header.find(options.taglineSelector);
			self.$panelContent = self.$(options.panelContentSelector);

			// Adjust panel on window resize if resize is enabled
			if (options.enableResize) {
				$window.on('resize', $.proxy(self._handleResize, self));
			}

			if (options.autoRender) {
				self.render();
			}
		},

		render: function() {
			var self = this,
				options = self.options,
				elCss = {},
				width,
				height;

			// Make sure .container is wrapped with div.content
			if (!self.$contentContainer.parent().hasClass('content')) {
				self.$contentContainer.wrapAll('<div class="content" />');
			}

			if (options.displayType) {
				elCss['display'] = options.displayType;
				if(options.displayType=='table-cell'){
					elCss['float']='left';
				}
			}

			if (!_.isEmpty(elCss)) {
				self.$el.css(elCss);
			}

			width = (options.width) ? options.width : self.$el.outerWidth();
			
			/* Commented to make panel work, Right now clicking on next button shows blank page */
			/* Updated common/sass/_panels.scss, .panel-set .panel {display: block} */
			/* Commented below function, right now it's assigning total height of all panels */

			/*height = (options.height) ? options.height : self.$el.height();*/	

			self.size(width, height);

			// Set the background image
			if (options.background) {
				// Make sure the background element exists, then set the height
				self._ensureBackgroundEl();
				//self.setBackgroundSize(null, self._height);

				self.setBackgroundImage(options.background, false);
			}

			// Set the background color
			if (options.color) {
				//No method called textColor
				self.setBackgroundColor(options.color);
			}

			// Set the panel title
			if (options.title) {
				self.title(options.title);
			}

			self.$navTabs = self.$(options.navTabsSelector);

			// If nav tabs exist then preload background images
			if (self.$navTabs.length > 0) {
				self._renderNavTabs(self.$navTabs);
			}

			// If nav indicator exists then wire it up
			setTimeout(function() {
				self.$navIndicator = self.$(options.navIndicatorSelector);
				if (self.$navIndicator.length) {
					self.$navIndicator.parent().navIndicator();
				}
			}, 500);

			self.trigger('render', self);

			return self;
		},

		_renderNavTabs: function($tabs) {
			var self = this,
				bgImages = [],
				bg;

			$tabs.each(function(i, tab) {
				bg = $(tab).find('a').data('background');

				if (bg) {
					bgImages[i] = bg;
				}
			});

			self._preloadImages(bgImages);
		},

		_handleTabClick: function(ev) {
			ev.preventDefault();

			this.changeTab(ev.currentTarget);
		},

		_handleResize: function(ev) {
			this._resize();
		},

		_ensureBackgroundEl: function() {
			var self = this,
				$image;

			// If it exists then do nothing
			if (self.$background.length > 0) {
				return self;
			}

			// otherwise create the element
			self.$background = $('<div class="' + self.options.backgroundClass + '" />').prependTo(self.$el);

			return self;
		},

		_preloadImages: function(images) {
			var self = this,
				img;

			// If no images the exit
			if (!images || images.length === 0) {
				return;
			}

			_.each(images, function(image, i) {
				img = new Image();
				img.src = image;
			});

			images = null; // clean up the reference
		},

		_resize: function() {
			this.size($window.width());
		},

		setBackgroundSize: function(width, height) {
			var self = this,
				css = {};

			if (width) {
				css['width'] = width + 'px';
			}

			if (height) {
				css['height'] = height + 'px';
			}

			if (!_.isEmpty(css)) {
				self.$background.css(css);
			}

			return self;
		},

		setBackgroundImage: function(imagePath, animate) {
			var self = this;

			if (imagePath && (imagePath !== self.backgroundImage)) {
				self.backgroundImage = imagePath;

				if (animate === undefined) {
					animate = true;
				}

				if (animate) {
					if (has.cssTransitions) {
						self.$background.removeClass('in');
						setTimeout(function() {
							self.$background.css({
								'background-image': 'url(' + imagePath + ')',
								'-webkit-perspective': 1000 // This takes away the flicker
							}).addClass('in');
						}, 250);
					} else {
						self.$background.stop().animate({
							'opacity': 0
						}, 25, function() {
							self.$background.css({
								'background-image': 'url('+ imagePath +')',
								'opacity': 1
							});
						});
					}
				} else {
					self.$background.css({
						'background-image': 'url(' + imagePath + ')'
					}).addClass('in');
				}
			}

			return self;
		},

		setBackgroundColor : function(bgColor){
			var self = this;
			if (bgColor) {
				self.$el.css({
					'background-color': bgColor
				});
			}

		},

		title: function(value) {
			var self = this;

			if (value && value !== self._title) {
				self._title = value;

				self.$title.html(value);
			}

			return self._title;
		},

		tagline: function(value) {
			var self = this;

			if (value && value !== self._tagline) {
				self._tagline = value;

				self.$tagline.html(value);
			}

			return self._tagline;
		},

		/**
		 * Gets the size of the panel, or sets the width and/or height of the
		 * panel.
		 * @param {Number | null} [width] Optional width to set.
		 * @param {Number | null} [height] Optional height to set.
		 * @return {Object} An object hash with width and height properties.
		 */
		size: function(width, height) {
			var self = this,
				options = self.options,
				css = {};

			// If neither width nor height was passed in then bypass everything
			if (width || height) {
				// Don't update the width if one wasn't passed in or it's the same
				if (width && width !== self._width) {
					// Enforce min/max if it's enabled
					if (options.enableMinMax) {
						if (width < options.minWidth) {
							width = options.minWidth;
						} else if (width > options.maxWidth) {
							width = options.maxWidth;
						}
					}

					self._width = width;

					css['width'] = width + 'px';
				}

				// Don't update the height if one wasn't passed in or it's the same
				if (height && height !== self._height) {
					self._height = height;

					css['height'] = height + 'px';
				}

				// Update the css properties once
				if (!_.isEmpty(css)) {
					self.$el.css(css);
				}
			}

			return {
				width: self._width,
				height: self._height
			};
		},

		changeTab: function(tab) {
			var self = this,
				$tab = $(tab),
				tabData,
				$currentNav,
				background,
				headerBackgroundColor,
				textColor,
				navBackgroundColor;

			// If the tab clicked is the same as the one currently active then do nothing
			if ($tab.parent().hasClass('active')) {
				return;
			}

			tabData = $tab.data();
			$currentNav = $tab.parents('.nav-options');
			background = tabData['background'];
			navBackgroundColor = (tabData['navBackgroundClass']) ? _.contains(tabData['navBackgroundClass'].split(' '), 'light') : undefined,
			headerBackgroundColor = (tabData['headerBackgroundClass']) ? _.contains(tabData['headerBackgroundClass'].split(' '), 'light') : undefined,
			textColor = (tabData['textBackgroundClass']) ? _.contains(tabData['textBackgroundClass'].split(' '), 'light') : undefined;

			if (background) {
				self.setBackgroundImage(background);
			}

			if (navBackgroundColor !== undefined) {
				(navBackgroundColor) ? $currentNav.removeClass('dark').addClass('light') : $currentNav.removeClass('light').addClass('dark');
			}
			if (headerBackgroundColor !== undefined) {
				(headerBackgroundColor) ? self.$header.removeClass('dark').addClass('light') : self.$header.removeClass('light').addClass('dark');
			}
			if (textColor !== undefined) {
				(textColor) ? self.$panelContent.removeClass('dark').addClass('light') : self.$panelContent.removeClass('light').addClass('dark');
			}

			//Event to capture tab change
			self.trigger('panelTabChange', tab);
		}
	});

	return Panel;

});

/**
 * @requires rit
 * @requires util/view
 */
define('common/js/views/panel/page-turner',['rit', 'util/view'], function(RIT, View) {

	/**
	 * PageTurner is a view for displaying the next and previous buttons within
	 * a panel set.
	 *
	 * @exports views/PageTurner
	 * @version {version}
	 */
	var $ = RIT.$,
		_ = RIT._;

	/**
	 * @class PageTurner
	 * @extends util/view
	 */
	var PageTurner = View.extend({

		className: 'page-turner2',

		options: {
			//height: X
			infinite: false,
			startIndex: 0,
			buttonSize: 'large'
		},

		events: {
			'mouseover .hover-zone': 'handleHover',
			'mouseout .hover-zone': 'handleHover',
			// 'click a.btn': 'handleButtonClick',
			'click a.prev': 'handleButtonClick',
			'click a.next': 'handleButtonClick'

		},

		template: _.template('<div class="hover-zone left"><div class="nav-wrapper"><a class="btn prev is-on" href="#"><span class="btn-wrapper"><i class="prev-arrow icon-arrow-left-big"></i><span class="btn btn-page-turn-prev"></span><span class="btn page-turn-base-prev"></span><span class="btn page-turn-tip-prev"><%= prev %></span></span></a></div></div><div class="hover-zone right"><div class="nav-wrapper"><a class="btn next is-on" href="#"><span class="btn-wrapper"><i class="next-arrow icon-arrow-right-big"></i><span class="btn page-turn-tip-next"><%= next %></span><span class="btn page-turn-base-next"></span><span class="btn btn-page-turn-next"></span></span></a></div></div>'),

		smallTemplate: '<div class="hover-zone left"><div class="nav-wrapper"><a href="#" class="btn prev is-on btn-circle small"><i class="prev-arrow icon-arrow-left-small-circle"></i></a></div></div><div class="hover-zone right"><div class="nav-wrapper"><a href="#" class="btn next is-on btn-circle small"><i class="next-arrow icon-arrow-right-small-circle"></i></a></div></div>',

		offerTemplate: '<div class="hover-zone left"><div class="nav-wrapper"><a href="#" class="left-arrow prev offers-turn-prev"><i class="icon-arrow-left-big"></i></a></div></div><div class="hover-zone right"><div class="nav-wrapper"><a href="#" class="right-arrow next offers-turn-next"><i class="icon-arrow-right-big"></i></a></div></div>',
		/**
		 * Default initializing function.
		 * @name PageTurner#initialize
		 * @function
		 */
		initialize: function() {
			var self = this,
				options = self.options;

			if (!options.numItems) {
				throw TypeError("PageTurner requires option 'numItems'");
			}

			self._itemCount = options.numItems;

			self._currentItemIndex = options.startIndex || 0;

			self.render();
		},

		/**
		 * Renders the view.
		 * @return {PageTurner} `this` object instance.
		 */
		render: function() {
			var self = this,
				options = self.options,
				// data is used to render the template
				data = ( RIT.util.lang == 'en' ) ? { prev: 'Previous', next: 'Next'	} : { prev: 'anterior', next: 'próximo'},
				markup = (options.buttonSize == 'offers-nav') ? self.offerTemplate : (options.buttonSize == 'small') ? self.smallTemplate : self.template(data);

			self.$el.append(markup).addClass(options.buttonSize).hide();

			self.$hoverZoneLeft = self.$('.hover-zone.left');
			self.$hoverZoneRight = self.$('.hover-zone.right');

			if (options.height) {
				/* Commented to make panel work, Right now clicking on next button shows blank page */
				/* Updated common/sass/_panels.scss, .panel-set .panel {display: block} */
				/* Commented below function, right now it's assigning total height of all panels */

				//self.height(options.height);
			}

			self._initButtons();

			self.$el.fadeIn();

			return self;
		},

		/**
		 * Initializes the button and hides them
		 * @private
		 * @return {void}
		 */
		_initButtons: function() {
			var self = this;

			self._updateButtons();

			self.prevArrow = self.$('.prev-arrow');
			self.nextArrow = self.$('.next-arrow');
			self.prevTip = self.$('.page-turn-tip-prev').hide();
			self.nextTip = self.$('.page-turn-tip-next').hide();
			self.prevBase = self.$('.page-turn-base-prev').hide();
			self.nextBase = self.$('.page-turn-base-next').hide();
			self.prevBtn = self.$('.btn-page-turn-prev');
			self.nextBtn = self.$('.btn-page-turn-next');

			// fade out the prev background
			self._fadePrevButton();

			// fade out the next background
			self._fadeNextButton();

			// move tips
			var cssMargin = -1 * self.prevBtn.width();
			self.prevTip.css('margin-left', cssMargin);
			self.nextTip.css('margin-right', cssMargin);
		},

		/**
		 * Handle hover events for the hover zones.
		 * @private
		 * @param  {Event} ev An event
		 * @return {void}
		 */
		handleHover: function(ev) {
			var self = this,
				$currentTarget = $(ev.currentTarget),
				btn = ($currentTarget.hasClass('left')) ? 'prev': 'next';

			switch (ev.type) {
				case 'mouseover':
					self._animateButtonIn(btn);
					break;
				case 'mouseout':
					self._animateButtonOut(btn);
					break;
			}
		},

		/**
		 * Handle the button click event.
		 * @private
		 * @event 'click'
		 * @return {void}
		 */
		handleButtonClick: function(ev) {
			var self = this,
				direction = $(ev.currentTarget).hasClass('prev') ? 'prev' : 'next';

			ev.preventDefault();

			// Trigger click event so other views can respond accordingly
			self.trigger('click', direction);
		},

		/**
		 * Shows a button using animation.
		 * @private
		 * @param  {String} which Whether it's the 'prev' or 'next' button.
		 * @return {void}
		 */
		_animateButtonIn: function(which) {
			var self = this;

			if (which === 'prev') {
				if (self._fadePrev) {
					clearTimeout(self._fadePrev);
					self._fadePrev = null;
				}
				self.prevArrow.addClass('white');
				self.prevBtn.show();
				self.prevTip.show();
				self.prevBase.show();
				self.prevTip.stop().animate({
					'margin-left': 0
				}, 250);
			} else if (which === 'next') {
				if (self._fadeNext) {
					clearTimeout(self._fadeNext);
					self._fadeNext = null;
				}
				self.nextArrow.addClass('white');
				self.nextBtn.show();
				self.nextTip.show();
				self.nextBase.show();
				self.nextTip.stop().animate({
					'margin-right': 0
				}, 250);
			}
		},

		/**
		 * Hides a button using animation.
		 * @private
		 * @param  {String} which Whether it's the 'prev' or 'next' button.
		 * @return {void}
		 */
		_animateButtonOut: function(which) {
			var self = this;

			if (which === 'prev') {
				self.prevTip.stop().animate({
					'margin-left': '-' + self.prevTip.outerWidth() + 'px'
				}, 250, function() {
					self.prevTip.hide();
					self.prevBase.hide();
					if (self._fadePrev) {
						clearTimeout(self._fadePrev);
						self._fadePrev = null;
					}
					self._fadePrevButton();
				});
			} else if (which === 'next') {
				self.nextTip.stop().animate({
					'margin-right': '-' + self.nextBtn.width() + 'px'
				}, 250, function() {
					self.nextTip.hide();
					self.nextBase.hide();
					if (self._fadeNext) {
						clearTimeout(self._fadeNext);
						self._fadeNext = null;
					}
					self._fadeNextButton();
				});
			}
		},

		/**
		 * Fade the prev button.
		 * @private
		 * @return {void}
		 */
		_fadePrevButton: function() {
			var self = this;

			self._fadePrev = setTimeout(function() {
				self.prevBtn.fadeOut();
				self.prevArrow.removeClass('white');
			}, 2000);
		},

		/**
		 * Fade the next button.
		 * @private
		 * @return {void}
		 */
		_fadeNextButton: function() {
			var self = this;

			self._fadeNext = setTimeout(function() {
				self.nextBtn.fadeOut();
				self.nextArrow.removeClass('white');
			}, 2000);
		},

		/**
		 * Removes or adds Previous and Next buttons based on item index.
		 * @private
		 * @return {void}
		 */
		_updateButtons: function() {
			var self = this,
				options = self.options;

			if (!options.infinite) {
				if (self._currentItemIndex === 0) {
					//self.$('.page-turn-prev').hide();
					self.$hoverZoneLeft.hide();
				} else {
					//self.$('.page-turn-prev').show();
					self.$hoverZoneLeft.show();
				}

				if (self._currentItemIndex === self._itemCount - 1) {
					//self.$('.page-turn-next').hide();
					self.$hoverZoneRight.hide();
				} else {
					//self.$('.page-turn-next').show();
					self.$hoverZoneRight.show();
				}
			}
		},

		/**
		 * Gets or sets the height.
		 * @param  {Number} [height] Optional height to set. If no height
		 * provided then acts as a getter.
		 * @return {Number} The height.
		 */
		height: function(height) {
			var self = this;

			// Don't update the height if one wasn't passed in or it's the same
			if (height && height !== self._height) {
				self._height = height;

				//self.$el.css('height', height + 'px');
				self.$hoverZoneLeft.css('height', height + 'px');
				self.$hoverZoneRight.css('height', height + 'px');
			}

			return self._height;
		},

		/**
		 * Set the index of the current item so buttons can be removed or added
		 * as necessary.
		 * @param {Number} index The index of the current item.
		 */
		setIndex: function(index) {
			var self = this;

			if (index === undefined || typeof index !== 'number') {
				throw TypeError('setIndex() required a valid index');
			}

			// Update the current index
			self._currentItemIndex = index;

			// Update the buttons to show/hide
			self._updateButtons();

			return self;
		}
	});

	// Return public interface
	return PageTurner;

});

/**
 * @requires rit
 * @requires util/view
 */
define('common/js/views/panel/page-indicator',['rit', 'util/view'], function(RIT, View) {
	/**
	 * PageIndicator is a view for displaying the next and previous buttons within a panel set.
	 *
	 * @exports views/PageIndicator
	 * @version {version}
	 */
	var $ = RIT.$,
		_ = RIT._,
		has = RIT.has,
		// Desktop events
		events = {
			'click li': 'handleClick'
		};

	if (has.touch) {
		events = {
			'touchstart li': 'handleClick'
		};
	}

	/**
	 * @class PageIndicator
	 * @extends util/view
	 * @return {PageIndicator} An object instance.
	 */
	var PageIndicator = View.extend({

		className: 'page-indicator2',

		options: {
			activeClass: 'is-on',
			activeIndex: 0
			//numItems: X
		},

		events: events,

		initialize: function() {
			var self = this,
				options = self.options;

			if (!options.numItems) {
				throw TypeError("PageIndicator requires option 'numItems'");
			}

			/**
			 * The number of items.
			 * @type {Number}
			 * @private
			 */
			self._itemCount = self.options.numItems;

			/**
			 * Cache for the active items index and $item
			 * @type {Object}
			 * @private
			 */
			self._active = {};

			self.render();
		},

		/**
		 * Renders the view.
		 * @return {PageIndicator} `this` object instance.
		 */
		render: function() {
			var self = this,
				$ul,
				i;

			// Create the list of indicators
			$ul = $('<ul/>');

			for (i = 0; i < self._itemCount; i += 1) {
				$ul.append('<li id="'+ i +'" />');
			}

			$ul.appendTo(self.$el);

			// Cache a references to all indicators
			self.$indicators = self.$('li');

			// Select the active item
			self.select(self.options.activeIndex);

			return self;
		},
		
		/**
		 * Handles item click event.
		 * @param  {Event} ev
		 * @return {void}
		 */
		handleClick: function(ev) {
			var self = this,
				$currentTarget = $(ev.currentTarget),
				index = $currentTarget.index();

			console.log('page indicator ev', ev);

			self._change(index, $currentTarget);
		},

		/**
		 * Changes the active item.
		 * @private
		 * @param  {Number} index The index of the item to make active.
		 * @param  {jQuery} $item The jQuery wrapped item element.
		 * @return {Object} The active item details. Contains index and $item
		 */
		_change: function(index, $item) {
			var self = this,
				active;

			active = self._setActive(index, $item);

			self.trigger('change', index, $item);

			return active;
		},

		/**
		 * Handles removing and setting active item classes and caches active
		 * items properties.
		 * @private
		 * @param {Number} index The index of the item to make active.
		 * @return {Object} The active item details. Contains index and $item
		 */
		_setActive: function(index, $item) {
			var self = this,
				active = self.getActive(),
				activeClass = self.options.activeClass;

			// Remove active class from current active indicator
			if (active['$item']) {
				active.$item.removeClass(activeClass);
			}

			// Make the new item active
			$item.addClass(activeClass);

			// Update the active item cache
			active.index = index;
			active.$item = $item;

			return active;
		},

		/**
		 * Gets an object with properties of the active item.
		 * @return {Object} An object hash with the properties `index` and `$item`
		 */
		getActive: function() {
			return this._active;
		},

		/**
		 * Select an item to be made active.
		 * @param  {Number} index The index of the item to make active.
		 * @return {Object} An object hash with the properties `index` and `$item`
		 */
		select: function(index) {
			var self = this,
				active = self.getActive();

			// Make sure an index was passed in
			if (index === undefined || typeof index !== 'number') {
				throw TypeError('select() requires a valid index argument');
			}

			// Make sure not trying to set active to the one already active
			if (!active['index'] || active['index'] && active['index'] !== index) {
				return self._setActive(index, self.$indicators.eq(index));
			}
		}
	});

	// Return public interface
	return PageIndicator;

});

/**
 * @requires rit
 * @requires util/view
 * @requires common/js/views/panel/panel
 * @requires common/js/views/panel/page-turner
 * @requires common/js/views/panel/page-indicator
 */
define('common/js/views/panel/panel-set',['rit', 'util/view', 'common/js/views/panel/panel', 'common/js/views/panel/page-turner', 'common/js/views/panel/page-indicator'],
	function(RIT, View, Panel, PageTurner, PageIndicator, undefined) {

	/**
	 * PanelSet is collection of panels that can be navigated forward and
	 * backward, and also has touch support for smooth sliding between panels.
	 *
	 * @exports views/PanelSet
	 * @version {version}
	 */

	var $ = RIT.$,
		_ = RIT._,
		Events = RIT.Events,
		has = RIT.has,
		$window = RIT.$window,
		$document = RIT.$document,
		$body = RIT.$body,
		transitionEvents = 'webkitTransitionEnd msTransitionEnd oTransitionEnd transitionend',
		mouseEvents = 'mouseenter mouseleave dragstart dragmove dragend',
		touchEvents = 'touchstart touchmove touchend touchcancel';

	/**
	 * Creates a panel set.
	 * @class PanelSet
	 * @return {PanelSet} An object instance.
	 */
	var PanelSet = View.extend({

		className: 'panel-set',

		options: {
			pageTurner: !has.touch,
			pageIndicator: has.touch,
			keyNavigation: !has.touch,
			infinite: false,
			startIndex: 0,
			minWidth: 1024,
			maxWidth: 1500,
			enableResize: true,
			enableMinMax: true,
			buttonSize: 'large',
			transitionSpeed: 300,
			autoInterval: 0,
			panelDisplayType: 'table-cell',
			activeClass: 'active',
			customPanelBasePath: 'apps/custom-panels/',
			autoRender: true,
			noMinMax:false
		},

		initialize: function(opts) {
			var self = this,
				options,
				panels,
				currentHeight,
				currentWidth;

			// Add data attributes to the options
			options = self.options = _.extend({}, self.options, self.$el.data());

			/**
			 * Whether the panel set is in the process of changing.
			 * @type {Boolean}
			 */
			self._changing = false;

			/**
			 * The direction of the panel change. "next" or "prev"
			 * @type {null | String}
			 */
			self._direction = null;

			/**
			 * Caches info for the active panel.
			 * @type {Object}
			 */
			self._active = {};

			/**
			 * Index offset used when infinite is true.
			 * @type {Number}
			 */
			self._offset = 0;

			/**
			 * Each Panel object
			 * @type {Array<Panel>}
			 */
			panels = self.panels = [];

			/**
			 * jQuery reference to all panels in the set
			 * @type {jQuery}
			 */
			self.$panels = self.$('.panel');

			// Make sure the slide element exists, if not wrap the panels with one
			if (!self.$panels.parent().hasClass('slide')) {
				self.$panels.wrapAll('<div class="slide" />');
			}

			// Cache a reference to the slide element.
			self.$slide = self.$panels.parent();

			/**
			 * The number of panels in the set.
			 * @type {Number}
			 */
			self._panelCount = self.$panels.length;

			/**
			 * The width of the panel set
			 * @type {Number}
			 */
			self._width = (self.$el.outerWidth() > 0) ? self.$el.outerWidth() : self.options.minWidth;

			/**
			 * The height of the panel set
			 * @type {Number}
			 */
			self._height = self.$el.height();

			//TODO Deep linking
			Events.on('mlp:goToPanel', function(index, parent, silent) {
				if(self.$el.parent().attr('id') === parent.attr('id')){
					//'speed' is passed as 'undefined' because
					// panel-set's _slide method checks for 'duration === undefined'
					// 'silent' can be set to true to stop firring "beforechange" event
					if(index < 0){
						index = parseInt((self._panelCount - 1), 10) + parseInt(index, 10);
					}
					self.goToPanel(index);
				}
			});

			// Create all panel object instances
			self.$panels.each(function(idx, panel) {
				var $panel = $(panel),
					customPanel = $panel.data('custom-panel'),
					customPanelFullpath,
					year=$body.data('year');
					
				// If it's a custome panel then load and create custom panel object
				if ($panel.hasClass('panel-custom') && customPanel) {
					customPanelFullpath=options.customPanelBasePath + year+ '/'+ RIT.util.langPath + customPanel + '/main';
					
					//set the panel's width before offsets are calculated 
					// because "customPanelFullpath" doesnt load right away
					$panel.width(self._width);

					require([customPanelFullpath], function(CustomPanel) {
						panels[idx] = new CustomPanel({
							el: $panel,
							width: self._width,
							height: self._height,
							displayType: options.panelDisplayType,
							enableResize: false, // turn off resize since it's handled by the panel set
							autoRender: options.autoRender
						});

						// handle custom panel disclaimers
						self.customPanelDisclaimers($panel);

						//self.$('.nav-tabs, .explore-tabs, .pill-tab').parent().navIndicator();
					});
				} else {
					panels[idx] = new Panel({
						el: panel,
						width: self._width,
						//height: self._height,
						displayType: options.panelDisplayType,
						enableMinMax: false, // turn on minmax since it's handled by panel set
						enableResize: false, // turn off resize since it's handled by the panel set
						autoRender: options.autoRender
					});
				}
			});

			// Create the PageTurner if option is enabled and there's more than 1 panel
			if (options.pageTurner && self._panelCount > 1) {
				self.pageTurner = new PageTurner({
					width: self._width,
					height: self._height,
					numItems: self._panelCount,
					infinite: options.infinite,
					buttonSize: options.buttonSize
				}).on('click', function(dir) {
					//Wait till the active panel stops sliding
					if(!self._changing){
						self[dir]();
						// Pass the event from PageTurner up through PanelSet
						self.trigger('pageturner:click', dir);
					}
				});
			}

			// Create instance of PageIndicator if option is enabled and there's more than 1 panel
			if (options.pageIndicator && self._panelCount > 1) {
				self.pageIndicator = new PageIndicator({
					numItems: self._panelCount,
					width: self._width
				}).on('change', function(index) {
					self.goToPanel(index);
					// Pass the event from PageIndicator up through PanelSet
					self.trigger('pageindicator:change', index);
				});
			}

			// Bind transition events
			self.$slide.on(transitionEvents, $.proxy(self._handleEvent, self));

			// Bind mouse/touch events for dragging/swiping and pause on mouseover, play on mouseout
			self.$el.on((has.touch) ? touchEvents : mouseEvents, $.proxy(self._handleEvent, self));

			// Adjust panels on window resize if resize set to true
			if (options.enableResize) {
				//$window.on('resize', $.proxy(self._handleEvent, self));
				$window.on('resize', $.proxy(function(e) {
					//Window size check for IE8
					if($('html').hasClass('lt-ie9')){
						var windowHeight = $(window).height(),
							windowWidth = $(window).width();

						if(currentHeight === undefined || currentHeight !== windowHeight || currentWidth === undefined || currentWidth !== windowWidth) {
							currentHeight = windowHeight;
							currentWidth = windowWidth;
							this._handleEvent(e);
						}
					}
					else {
						this._handleEvent(e);
					}
				}, self));
			}

			// If keyNavigation is set to true then only bind key events
			if (options.keyNavigation) {
				//$document.on('keydown keyup', $.proxy(self.handleEvent, self));
				//$document.on('focus', self.setAllowed).on('scroll', self.handleScroll);
			}

			// if autoInterval is set to anything other 0
			if (!has.touch && options.autoInterval && options.autoInterval > 0) {
				self.$el.on('mouseover mouseout', $.proxy(self.handleEvent, self));
			}

			if (options.autoRender) {
				self.render();
			}
		},

		render: function() {
			var self = this,
				options = self.options,
				startIndex = options.startIndex || 0;

			// If the panel set is inifinite prepare it
			if (options.infinite && self._panelCount > 1) {
				// Clone the last panel and add it to the beginning of the panel set
				self.$slide.prepend(self.$panels.eq(self._panelCount - 1).clone());
				// Clone the first initial panel and append it to the end of the panel set
				self.$slide.append(self.$panels.eq(0).clone());

				// Negatively position the slide to hide the cloned first panel
				self.$slide.css({
					'margin-left': -self._width,
					'-webkit-transition-duration': '0ms',
					'-moz-transition-duration': '0ms',
					'-ms-transition-duration': '0ms',
					'-o-transition-duration': '0ms',
					'transition-duration': '0ms'
					//'-webkit-perspective': 1000 // This takes away the flicker
				});

				// Reset reference to all panels
				self.$panels = self.$('.panel');

				// Offset is used in calculations to determine position
				self._offset = 1;
			}

			// Update the slide width based on the number of panels
			self._updateSlideWidth();

			if (startIndex === 0) {
				self._setActivePanel(startIndex, self.$panels.get(startIndex + self._offset));
			} else {
				self.goToPanel(startIndex + self._offset);
				self._changing = false;
			}

			// Add in the page turner if it exists
			if (self.pageTurner) {
				self.$el.append(self.pageTurner.el);
			}

			// add in the page indicator if it exists
			if (self.pageIndicator) {
				self.$el.append(self.pageIndicator.el);
			}

			// Start playing (will only activate is autoInterval = true)
			self.play();

			// Return `this` object for chaining
			return self;
		},

		/**
		 * Handles events on the Panel Set
		 * @private
		 * @param  {Event} ev An event
		 * @return {void}
		 */
		_handleEvent: function(ev) {
			var self = this;

			switch (ev.type) {
			case 'dragstart':
			case 'touchstart':
				self.onTouchStart(ev);
				break;
			case 'dragmove':
			case 'touchmove':
				self.onTouchMove(ev);
				break;
			case 'dragend':
			case 'touchcancel':
			case 'touchend':
				self.onTouchEnd(ev);
				break;
			case 'webkitTransitionEnd':
			case 'msTransitionEnd':
			case 'oTransitionEnd':
			case 'transitionend':
				self._transitionEnd(ev);
				break;
			case 'resize':
				self._resize(ev);
				break;
			case 'keydown':
				break;
			case 'keyup':
				break;
			case 'mouseenter':
			case 'mouseover':
				self.pause();
				break;
			case 'mouseleave':
			case 'mouseout':
				self.play();
				break;
			}
		},

		/**
		 * Handles when a touch is started.
		 * @param  {TouchEvent} ev A touchstart event.
		 * @return {void}
		 */
		onTouchStart: function(ev) {
			var self = this,
				e = ev.originalEvent;

			// pause slideshow
			self.pause();

			self._start = {
				// get touch coordinates for delta calculations in onTouchMove
				pageX: e.touches[0].pageX,
				pageY: e.touches[0].pageY,

				// set initial timestamp of touch sequence
				time: Number(new Date())
			};

			// used for testing first onTouchMove event
			self._scrolling = undefined;

			// reset deltaX
			self._deltaX = 0;

			self.$slide.css({
				'-webkit-transition-duration': '0ms',
				'-moz-transition-duration': '0ms',
				'-ms-transition-duration': '0ms',
				'-o-transition-duration': '0ms',
				'transition-duration': '0ms'
				//'-webkit-perspective': 1000 // This takes away the flicker
			});
		},

		/**
		 * Handles when a touch is moving..
		 * @param  {TouchEvent} ev A touchmove event.
		 * @return {void}
		 */
		onTouchMove: function(ev) {
			var self = this,
				e = ev.originalEvent,
				active = self.getActivePanel(),
				move;

			// ensure swiping with one touch and not pinching
			if (e.touches.length > 1 || e.scale && e.scale !== 1) return;

			// Update the amount moved
			self._deltaX = e.touches[0].pageX - self._start.pageX;

			// determine if scrolling test has run - one time test
			if (typeof self._scrolling === 'undefined') {
				self._scrolling = !!(self._scrolling || Math.abs(self._deltaX) < Math.abs(e.touches[0].pageY - self._start.pageY));
			}

			// if user is not trying to scroll vertically
			if (!self._scrolling) {
				// prevent native scrolling
				ev.preventDefault();

				if (!self.options.infinite) {
					// increase resistance if first or last slide
					self._deltaX = self._deltaX / ((!active.index && self._deltaX > 0 // if first slide and sliding left
					|| active.index === self._panelCount - 1 // or if last slide and sliding right
					&& self._deltaX < 0 // and if sliding at all
					) ? (Math.abs(self._deltaX) / self._width + 1) // determine resistance level
					: 1); // no resistance if false
				}

				move = (self._deltaX - active.index * self._width);

				self.$slide.css({
					'-webkit-transform': 'translate3d(' + move + 'px,0,0)',
					'-moz-transform': 'translate3d(' + move + 'px,0,0)'
				});

				//ev.stopPropagation();
			}
		},

		/**
		 * Handles when a touch has ended.
		 * @param  {TouchEvent} ev A touchend event.
		 * @return {void}
		 */
		onTouchEnd: function(ev) {
			var self = this,
				active = self.getActivePanel(),
				direction = 'next',
				isPastBounds = false,
				isValidSlide,
				move;
			
			// determine if slide attempt triggers next/prev slide
			isValidSlide = Number(new Date()) - self._start.time < 250 // if slide duration is less than 250ms
				&& Math.abs(self._deltaX) > 20 // and if slide amt is greater than 20px
				|| Math.abs(self._deltaX) > self._width / 2;

			if (!self.options.infinite) {
				// or if slide amt is greater than half the width
				// determine if slide attempt is past start and end
				isPastBounds = !active.index && self._deltaX > 0 // if first slide and slide amt is greater than 0
					|| active.index === self._panelCount - 1 && self._deltaX < 0; // or if last slide and slide amt is less than 0
			}

			// if not scrolling vertically
			if (!self._scrolling && self._deltaX !== 0) {
				// call slide function with slide end value based on isValidSlide and isPastBounds tests
				//slideToIndex = active.index + (isValidSlide && !isPastBounds ? (self._deltaX < 0 ? 1 : -1) : 0);
				move = (isValidSlide && !isPastBounds ? (self._deltaX < 0 ? '+1' : '-1') : '0');

				//if (slideToIndex < active.index) {
				if (move === '-1') {
					direction = 'prev';
				}

				self._changePanel(move, direction);

				if (move !== '0') {
					self._direction = direction;
				}
			}
			
			//ev.stopPropagation();
		},

		/**
		 * Go directly to a panel.
		 * @param  {Number} index The index of the panel.
		 * @return {PanelSet} `this` object instance for chaining.
		 */
		goToPanel: function(num, silent) {
			return this._changePanel(num, silent); //, undefined, 0
		},

		/**
		 * Moves to the previous panel if there is a previous panel. If infinite
		 * and the first panel is currently displayed, then it will move to the
		 * last panel.
		 * @param  {[type]} delay [description]
		 * @return {PanelSet} `this` object instance for chaining.
		 */
		prev: function(delay) {
			var self = this;

			self.delay = delay || 0;

			self._direction = 'prev';

			return self._changePanel('-1', 'prev');
		},

		/**
		 * Advances to the next panel if there is a next panel. If infinite and
		 * the last panel is currently displayed, then it will move to the first
		 * panel.
		 * @param  {[type]}   delay [description]
		 * @return {PanelSet} `this` object instance for chaining.
		 */
		next: function(delay) {
			var self = this;

			self.delay = delay || 0;

			self._direction = 'next';

			return self._changePanel('+1', 'next');
		},

		begin: function() {
			var self = this;

			self.interval = (self.delay) ? setTimeout(function() {
				self.next(self.delay);
			}, self.delay) : 0;
		},

		/**
		 * Start the autoplay feature.
		 * @event 'play'
		 * @return {PanelSet} `this` object instance for chaining.
		 */
		play: function() {
			var self = this,
				autoInterval = self.options.autoInterval;

			// Make sure autoInterval is set
			if (autoInterval && autoInterval > 0) {
				// Make sure there's no interval set
				self._clearInterval();

				// Create the interval and cache the id so it can be canceled
				self.playIntervalId = setInterval(function() {
					// At interval move to the next panel
					self.next();
				}, autoInterval);
			}

			// Trigger a 'play' event that other classes can subscribe to
			self.trigger('play');

			return self;
		},

		/**
		 * Pauses the autoplay feature.
		 * @event 'pause'
		 * @return {PanelSet} `this` object instance for chaining.
		 */
		pause: function() {
			var self = this;

			self._clearInterval();

			// Trigger a 'pause' event that other classes can subscribe to
			self.trigger('pause');

			return self;
		},

		/**
		 * Returns an object containing info about the active panel.
		 * @return {Object}
		 */
		getActivePanel: function() {
			return this._active;
		},

		/**
		 * Gets or sets the width of the Panel Set
		 * @param  {Number} [value] An optional width to set. If no value passes
		 * then this method acts as a getter.
		 * @return {Number} The width of the panel set.
		 */
		width: function(value) {
			var self = this;

			if (value && value !== self._width) {
				self._width = value;

				self.$el.css('width', value + 'px');
			}
console.log("!!!!!!!!!!!", self._width);
			return self._width;
		},

		_clearInterval: function() {
			var self = this;

			// Check if an interval has been set
			if (self.playIntervalId) {
				// Cancel the existing interval
				clearInterval(self.playIntervalId);
				self.playIntervalId = null; // clean it up
			}
		},

		/**
		 * Coordinates changing a panel.
		 * @private
		 * @param {Number | String} num An index to change to, or '+1' to move
		 *                  to next, or '-1' to move to previous.
		 * @param {String} dir The direction of the panel change. 'prev' or 'next'
		 * @param {Number} [speed] Optional speed for the panel transition in
		 *                         milliseconds.
		 * @param {Boolean} [silent] Optional param to turn off firing before
		 *                           change event. Default is `false`
		 * @return {PanelSet} `this` object instance.
		 */
		_changePanel: function(num, dir, speed, silent) {
			var self = this,
				active = self.getActivePanel(),
				next,
				move,
				to,
				from;

			if (typeof num === 'number') {
				next = num;
				move = num;
			} else {
				move = parseFloat(num, 10);
				next = active.index + parseFloat(num, 10);
			}
			if (!self.options.infinite) {
				// If we're at the last or first then do nothing
				if (next === self._panelCount || next === -1) {
					return;
				}
			} else {
				if (next === self._panelCount) {
					next = 0;
					// Tell _afterPanelChange that the position of the slide needs to be updates
					self._reposition = 1;
				} else if (next === -1) {
					next = self._panelCount - 1;
					// Tell _afterPanelChange that the position of the slide needs to be updates
					self._reposition = -1;
				}
			}

			if (silent === undefined) {
				silent = false;
			}

			// Get the element of the destination panel
			to = self.$panels.get(next + self._offset);

			// Handles functionality before a panel changes
			// This needs to be called before setActivePanel is set with 'next' panel
			self._beforePanelChange(silent);

			//Get the index of the current panel
			from=this._active.index;

			// Update the active panel to the panel it's moving to
			self._setActivePanel(next, to);

			// Perform the slide
			//self._slide(move, dir, speed, from );
			self._slide(num, dir, speed, from );

			// This is called to perform functionality that shouldn't wait for the panel transition to complete
			self._panelChange();
		},

		/**
		 * Performs the actual panel change transition.
		 * @private
		 * @param {Number} to The panel it's moving to.
		 * @param {String | null} dir The direction the panel is moving.
		 * @param {Number} [duration] The speed of the transition in
		 *                            milliseconds. Default is options.transitionSpeed
		 * @return {PanelSet} `this` object instance.
		 */
		_slide: function(to, dir, duration, from, silent) {
			var self = this,
				distance=to * self._width,
				lastPos = 0,
				animateDistance; //This is used for aimate margin( fallback of cssTransitions)

			//If "to" is not a number, called from next/prev arrow click
			if (typeof to!== 'number') {
				to = parseFloat(to, 10);
				animateDistance = -(to * self._width);
			}
			//If "to" is a number, called from the tumbnail clicks
			else {
				animateDistance= (from-to)*self._width;
			}

			if (dir === 'prev') {
				distance = distance * to;
			} else {
				distance = -(distance);
			}

			// fallback to default speed
			if (duration === undefined) {
				duration = self.options.transitionSpeed;
			}

			// If browser supports css transitions
			if (has.cssTransitions) {

				if (dir !== undefined) {
					lastPos = self._lastPos || 0;
				}

				// Append distance to last position
				distance = lastPos += distance;

				// Update last position cache
				self._lastPos = distance;

				self.$slide.css({
					// set duration speed (0 represents 1-to-1 scrolling)
					'-webkit-transition-duration': duration + 'ms',
					'-moz-transition-duration': duration + 'ms',
					'-ms-transition-duration': duration + 'ms',
					'-o-transition-duration': duration + 'ms',
					'transition-duration': duration + 'ms',
					// translate to given index position
					'-webkit-transform': 'translate3d(' + distance + 'px,0,0)',
					'-moz-transform': 'translate3d(' + distance + 'px,0,0)',
					'-ms-transform': 'translateX(' + distance + 'px)',
					'-o-transform': 'translateX(' + distance + 'px)'
					//'-webkit-perspective': 1000 // This takes away the flicker
				});

				// transitionEnd callback won't fire if duration is 0 so we have to manually call afterPanelChange
				if (duration === 0) {
					self._afterPanelChange(silent);
				}

			// Fallback for browsers that don't support css transition
			} else {
				self.$slide.animate({
					'margin-left': '+=' + animateDistance
				}, duration, function() {
					self._afterPanelChange(silent);
				});
			}

			return self;
		},

		/**
		 * Called internally before a panel is changed.
		 * @private
		 * @event 'panelchange:before'
		 * @return {void}
		 */
		_beforePanelChange: function(silent) {

			var self = this,
				active = self.getActivePanel();

			self._changing = true;
			
			// Pause the autoInterval
			self.pause();

			// Trigger custom event that other classes can subscribe to
			if(!silent){
				self.trigger('panelchange:before', active.index, self._direction, active.panel);
			}

		},

		/**
		 * Called internally when a panel is changing, but before the transition
		 * is complete.
		 * @private
		 * @event 'panelchange'
		 * @return {void}
		 */
		_panelChange: function() {
			var self = this,
				active = self.getActivePanel();

			if (self.pageIndicator) {
				self.pageIndicator.select(active.index);
			}

			if (self.pageTurner) {
				self.pageTurner.setIndex(active.index);
			}

			// Trigger custom event that other classes can subscribe to
			self.trigger('panelchange', active.index, self._direction, active.panel);
		},

		/**
		 * Called internally when a panel change/animation is complete.
		 * @private
		 * @event 'panelchange:after'
		 * If 'silent' is set to true, don't trigger panel change event
		 * @return {void}
		 */
		_afterPanelChange: function(silent ) {
			var self = this,
				active = self.getActivePanel(),
				duration = 0,
				reposition,
				distance;
			// Do we need to reposition the slide for infinite
			if (self._reposition && self._reposition !== null) {
				reposition = self._reposition;

				distance = (($(active.panel).index() - 1) * self._width) * reposition;

				// If the browser supports css transitions
				if (has.cssTransitions) {
					// TODO: Try to remove this and merge with functionality in _slide()...move to own common method
					self.$slide.css({
						// set duration speed (0 represents 1-to-1 scrolling)
						'-webkit-transition-duration': duration + 'ms',
						'-moz-transition-duration': duration + 'ms',
						'-ms-transition-duration': duration + 'ms',
						'-o-transition-duration': duration + 'ms',
						'transition-duration': duration + 'ms',
						// translate to given index position
						'-webkit-transform': 'translate3d(' + distance + 'px,0,0)',
						'-moz-transform': 'translate3d(' + distance + 'px,0,0)',
						'-ms-transform': 'translateX(' + distance + 'px)',
						'-o-transform': 'translateX(' + distance + 'px)'
						//'-webkit-perspective': 1000 // This takes away the flicker
					});

					// Update the last position cache
					self._lastPos = distance;

				} else {
					if (distance === 0) {
						distance = (self._width * self._panelCount);
					} else {
						distance = distance + -(self._width);
					}

					self.$slide.animate({
						'margin-left': '+=' + distance
					}, duration);
				}

				// Reset the reposition var
				self._reposition = null;
			}

			self._changing = false;

			// Replay the autoInterval
			self.play();

			// Trigger custom event that other classes can subscribe to
			if(!silent){
				self.trigger('panelchange:after', active.index, self._direction, active.panel);
			}

			self._direction = null;
		},

		/**
		 * Sets the active panel and swap active class on elements.
		 * @private
		 * @param {Number} index The index of the active panel.
		 * @param {Element} el The active panel element.
		 * @return {void}
		 */
		_setActivePanel: function(index, el) {
			var self = this,
				active = self.getActivePanel();

			// Remove the active class on the currently active panel
			if (!_.isEmpty(active)) {
				$(active.panel).removeClass(self.options.activeClass);
			}

			// Add the active class to the new panel
			$(el).addClass(self.options.activeClass);

			self._active = {
				index: index,
				panel: el
			};
		},

		/**
		 * Handles event for browser/window  .
		 * @private
		 * @return {void}
		 */
		_resize: function() {
			// to fix a bug with lt-ie9 and in concept-vehicles, where this is firing immediately on a maximally expanded browser window, and on click of a concept vehicle item, and firing incorrectly, I am just bypassing this function in such a case.

			if (($('.lt-ie9').length > 0) && ($('.concept-vehicles').length > 0) || $('.localspecials .single').length > 0){
				return;
			}

			var self = this,
				windowSize=$window.width();

			if (self.resizeTimerId) {
				clearTimeout(self.resizeTimerId);
			}
						
			self.resizeTimerId = setTimeout(function() {
				if(self.options.noMinMax || windowSize >= self.options.minWidth){
					//Recalculate panel-set width
					self._width=self.$el.outerWidth();

					//window size is < panelset's maxwidth, set the width to window size
					if(!self.options.noMinMax && windowSize <= self.options.maxWidth){
						self._width = windowSize;
					}
				}else {
					//window size is < panelset's minwidth, set the width to min-width
					self._width=self.options.minWidth;
				}
				
				// Resize each panel
				self.$panels.each(function(i, panel) {
					$(panel).css('width', self._width);
				});

				// Then update the width of the slide based on the new with of the panels
				self._updateSlideWidth();

				// Update the slide position to the current active panel which will adjust the distance of the transition
				// 5th argument is 'silent'. Silent is set to true for not triggering panel change events
				self._slide(self.getActivePanel().index, undefined, 0, undefined, true);
								//Firing this event, so the slide margin can be adjusted when wanted
				self.trigger('panel:resize', self._width);

			}, 100);
		},

		/**
		 * Called after a transition end event.
		 * @private
		 * @param  {Event} ev An event.
		 * @return {void}
		 */
		_transitionEnd: function(ev) {
			var $target = $(ev.currentTarget); //Capture the target that's listening to the event
			// If the transition is fired on the slide
			if ($target.hasClass('slide')) {
				this._afterPanelChange();
			}
		},

		/**
		 * Sets the total width of the slide based on the number of panels and
		 * the width of each panel.
		 * @private
		 * @return {void}
		 */
		_updateSlideWidth: function() {
			var self = this,
				slideWidth;

			slideWidth = self.$panels.length * self._width;

			self.$slide.css({
				//'margin-left': -self._width,
				'width': slideWidth,
				'-webkit-transition-duration': '0ms',
				'-moz-transition-duration': '0ms',
				'-ms-transition-duration': '0ms',
				'-o-transition-duration': '0ms',
				'transition-duration': '0ms'
			});
		},

		customPanelDisclaimers: function(panel) {
			var panelHtml = panel.html(),
				customDisclaimers = panel.attr('data-custom-disclaimer');

			if (customDisclaimers !== "") {
				_.each(customDisclaimers.split(','), function(disc) {
					var d = disc.replace(/[\[\]']+/g, ''),
						name = d.split(':')[0].replace('*','\\*'),
						numb = d.split(':')[1],
						re = new RegExp('data-disclaimer="' + name + '">(.*?)</a>', 'gim');
						re2 = new RegExp('data-disclaimer=&quot;' + name + '&quot;&gt;(.*?)&lt;/a&gt;', 'gim');
      					re3 = new RegExp('data-disclaimer=&quot;' + name + '&quot;>(.*?)</a>', 'gim');
					
					panelHtml = panelHtml.replace(re, 'data-disclaimer="' + numb + '"><sup>' + numb + '</sup></a>');
					panelHtml = panelHtml.replace(re2, 'data-disclaimer=&quot;' + numb + '&quot;&gt;&lt;sup&gt;' + numb + '&lt;/sup&gt;&lt;/a&gt;');
     				panelHtml = panelHtml.replace(re3, 'data-disclaimer=&quot;' + numb + '&quot;><sup>' + numb + '</sup></a>');
				});
				panel.html(panelHtml);
			}
		}
	});

	return PanelSet;

});


define('spin',['jquery'], function(jQuery) {
// fgnass.github.com/spin.js#v1.2.5
(function(a,b,c){function g(a,c){var d=b.createElement(a||"div"),e;for(e in c)d[e]=c[e];return d}function h(a){for(var b=1,c=arguments.length;b<c;b++)a.appendChild(arguments[b]);return a}function j(a,b,c,d){var g=["opacity",b,~~(a*100),c,d].join("-"),h=.01+c/d*100,j=Math.max(1-(1-a)/b*(100-h),a),k=f.substring(0,f.indexOf("Animation")).toLowerCase(),l=k&&"-"+k+"-"||"";return e[g]||(i.insertRule("@"+l+"keyframes "+g+"{"+"0%{opacity:"+j+"}"+h+"%{opacity:"+a+"}"+(h+.01)+"%{opacity:1}"+(h+b)%100+"%{opacity:"+a+"}"+"100%{opacity:"+j+"}"+"}",0),e[g]=1),g}function k(a,b){var e=a.style,f,g;if(e[b]!==c)return b;b=b.charAt(0).toUpperCase()+b.slice(1);for(g=0;g<d.length;g++){f=d[g]+b;if(e[f]!==c)return f}}function l(a,b){for(var c in b)a.style[k(a,c)||c]=b[c];return a}function m(a){for(var b=1;b<arguments.length;b++){var d=arguments[b];for(var e in d)a[e]===c&&(a[e]=d[e])}return a}function n(a){var b={x:a.offsetLeft,y:a.offsetTop};while(a=a.offsetParent)b.x+=a.offsetLeft,b.y+=a.offsetTop;return b}var d=["webkit","Moz","ms","O"],e={},f,i=function(){var a=g("style");return h(b.getElementsByTagName("head")[0],a),a.sheet||a.styleSheet}(),o={lines:12,length:7,width:5,radius:10,rotate:0,color:"#000",speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"auto",left:"auto"},p=function q(a){if(!this.spin)return new q(a);this.opts=m(a||{},q.defaults,o)};p.defaults={},m(p.prototype,{spin:function(a){this.stop();var b=this,c=b.opts,d=b.el=l(g(0,{className:c.className}),{position:"relative",zIndex:c.zIndex}),e=c.radius+c.length+c.width,h,i;a&&(a.insertBefore(d,a.firstChild||null),i=n(a),h=n(d),l(d,{left:(c.left=="auto"?i.x-h.x+(a.offsetWidth>>1):c.left+e)+"px",top:(c.top=="auto"?i.y-h.y+(a.offsetHeight>>1):c.top+e)+"px"})),d.setAttribute("aria-role","progressbar"),b.lines(d,b.opts);if(!f){var j=0,k=c.fps,m=k/c.speed,o=(1-c.opacity)/(m*c.trail/100),p=m/c.lines;!function q(){j++;for(var a=c.lines;a;a--){var e=Math.max(1-(j+a*p)%m*o,c.opacity);b.opacity(d,c.lines-a,e,c)}b.timeout=b.el&&setTimeout(q,~~(1e3/k))}()}return b},stop:function(){var a=this.el;return a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=c),this},lines:function(a,b){function e(a,d){return l(g(),{position:"absolute",width:b.length+b.width+"px",height:b.width+"px",background:a,boxShadow:d,transformOrigin:"left",transform:"rotate("+~~(360/b.lines*c+b.rotate)+"deg) translate("+b.radius+"px"+",0)",borderRadius:(b.width>>1)+"px"})}var c=0,d;for(;c<b.lines;c++)d=l(g(),{position:"absolute",top:1+~(b.width/2)+"px",transform:b.hwaccel?"translate3d(0,0,0)":"",opacity:b.opacity,animation:f&&j(b.opacity,b.trail,c,b.lines)+" "+1/b.speed+"s linear infinite"}),b.shadow&&h(d,l(e("#000","0 0 4px #000"),{top:"2px"})),h(a,h(d,e(b.color,"0 0 1px rgba(0,0,0,.1)")));return a},opacity:function(a,b,c){b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)}}),!function(){function a(a,b){return g("<"+a+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',b)}var b=l(g("group"),{behavior:"url(#default#VML)"});!k(b,"transform")&&b.adj?(i.addRule(".spin-vml","behavior:url(#default#VML)"),p.prototype.lines=function(b,c){function f(){return l(a("group",{coordsize:e+" "+e,coordorigin:-d+" "+ -d}),{width:e,height:e})}function k(b,e,g){h(i,h(l(f(),{rotation:360/c.lines*b+"deg",left:~~e}),h(l(a("roundrect",{arcsize:1}),{width:d,height:c.width,left:c.radius,top:-c.width>>1,filter:g}),a("fill",{color:c.color,opacity:c.opacity}),a("stroke",{opacity:0}))))}var d=c.length+c.width,e=2*d,g=-(c.width+c.length)*2+"px",i=l(f(),{position:"absolute",top:g,left:g}),j;if(c.shadow)for(j=1;j<=c.lines;j++)k(j,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(j=1;j<=c.lines;j++)k(j);return h(b,i)},p.prototype.opacity=function(a,b,c,d){var e=a.firstChild;d=d.shadow&&d.lines||0,e&&b+d<e.childNodes.length&&(e=e.childNodes[b+d],e=e&&e.firstChild,e=e&&e.firstChild,e&&(e.opacity=c))}):f=k(b,"animation")}(),a.Spinner=p})(window,document);


/*

See https://gist.github.com/1290439

You can now create a spinner using any of the variants below:

$("#el").spin(); // Produces default Spinner using the text color of #el.
$("#el").spin("small"); // Produces a 'small' Spinner using the text color of #el.
$("#el").spin("large", "white"); // Produces a 'large' Spinner in white (or any valid CSS color).
$("#el").spin({ ... }); // Produces a Spinner using your custom settings.

$("#el").spin(false); // Kills the spinner.

*/
(function($) {
	$.fn.spin = function(opts, color) {
		var presets = {
			"tiny": { lines: 8, length: 2, width: 2, radius: 3 },
			"small": { lines: 8, length: 4, width: 3, radius: 5 },
			"large": { lines: 10, length: 8, width: 4, radius: 8 }
		};
		if (Spinner) {
			return this.each(function() {
				var $this = $(this),
					data = $this.data();

				if (data.spinner) {
					data.spinner.stop();
					delete data.spinner;
				}
				if (opts !== false) {
					if (typeof opts === "string") {
						if (opts in presets) {
							opts = presets[opts];
						} else {
							opts = {};
						}
						if (color) {
							opts.color = color;
						}
					}
					data.spinner = new Spinner($.extend({color: $this.css('color')}, opts)).spin(this);
				}
			});
		} else {
			throw "Spinner class not available.";
		}
	};
})(jQuery);

})
;
define('apps/localspecials/js/models/incentive-model',[
'rit',
'util/model',
'util/i18n',
'util/geolocation',
'spin',
'util/analytics'
], function(
RIT,
Model,
i18n,
Geolocation,
spin,
Analytics
){

	var _ = RIT._,
		$ = RIT.$,
		Events = RIT.Events,
		Backbone = RIT.Backbone;

/*
MY14 Prius v	 9/25/2013	
MY14 RAV4 EV	10/2/2013	
MY14 4Runner	10/9/2013	
MY14 Prius Plug-in	10/30/2013	
MY14 Avalon	 11/6/2013	
MY14 Prius 11/13/2013	
MY14 RAV4	 12/4/2013	
MY14 Highlander	1/2/2013
MY14 Prius c	 TBD
*/

	var seriesFilter = ['priusv|2014','matrix|2014','matrix|2013','matrix|2012','highlander|2014','highlanderhybrid|2014','priusc|2014','rav4|2014'];

	/**
	* Incentive Model represents all the details about incentives.
	* @name Incentive
	* @class Incentive model
	* @constructor
	* @return {Object} Incentive
	*/
	var Incentive = Model.extend({
		defaults: {
			zipcode:'',
			zipChange:["0"],
			filteredData:{},
			serviceData:{},
			serviceDataRendered:0,
			selectedVehicles:{},
			clearFilters:0,
			filteredOffers:{"offertypes":[]},
			renderedVehicles:[],
			serviceFailed:0,
			tdaCode:'',
			routerData:{},
			pageload:0
		},

		$wrapper: $('.local-specials-wrapper'),

		/**
		* This function returns Local Specials service data
		* @name Incentive#url
		* @function
		* @return {Object} service-data
		*/
		url: function(){
			var self = this,
				path = (self.gstZip) ? '/ToyotaSite/rest/zipIncentives/getGstIncentives' : '/ToyotaSite/rest/zipIncentives/getIncentivesByOfferType?zipCode='+self.get('zipcode')+'&series=';

			return path;
		},
		
		/**
		* This function parses Local Specials service data
		* @name Incentive#parse
		* @function
		*/
		parse: function (response){
			var self = this;

			self.data = response;
		},
		/**
		* Default initializtion function
		* @name Incentive#initialize
		* @function
		*/
		initialize: function() {
			var self =this,
				zipPromise = Geolocation.getZip();

			self.gstZip = false;

			self.on('change:serviceData',self.filterIncentives,this);

			zipPromise.done(function(zipcode){
				self.set("zipcode",zipcode);
				self.getLocalSpecialsData(false);
			});

			Events.on('zipcode:changed', function(zipcode) {
				self.set("zipcode",zipcode);
				self.zipCodeChanged();
			});

			zipPromise.fail(function() {
				Events.trigger('zipcode:failed');


				Analytics.fire('misc', '102.23', {
						'current_pagename': Analytics.currentPageName(),
						'zip_code': $.cookie('zipcode'),
						'device_type':Analytics.deviceType
				});

				$('.filters').hide();

				self.$wrapper.unmask();

				require(['text!apps/localspecials/js/template/zip-promise-fail.html','text!apps/localspecials/js/template/espanol/zip-promise-fail.html', 'common/js/views/zipcode-changer'], function(ZipPromiseFail,ZipPromiseFailEs, ZipcodeChanger) {
					self.zipCoder = new ZipcodeChanger();

					if (i18n.lang == "en") {
						$("#vehicleoffers").html(_.template(ZipPromiseFail));
					}else{
						$("#vehicleoffers").html(_.template(ZipPromiseFailEs));
					}

					$('.zip-promise-fail .zipcode-container').html(self.zipCoder.el);
					
					// Jorge: This stops the loader from ever showing.
					/*$(".zip-promise-fail .enterLink").on('click',function(){
						self.zipCoder.calculate(true);
					})*/
				});

			});

		},
		/**
		* Reset all the filters when user enters a new zip-code.
		* @name Incentive#zipCodeChanged
		* @function
		*/
		zipCodeChanged:function(){
			var self = this;

			self.$wrapper.mask({top:'200px'});

			self.resetModel();

			self.getLocalSpecialsData(true);
		},
		/*
		*/
		resetModel:function(){
			var self = this;

			self.attributes.selectedVehicles = {};

			if (self.attributes.filteredOffers) self.attributes.filteredOffers.offertypes = [];

			self.attributes.renderedVehicles = [];
		},
		/**
		* This function makes a service call to fetch Local Specials Service Data.
		* @name Incentive#getLocalSpecialsData
		* @function
		*/
		getLocalSpecialsData:function(zipChange){
			var self = this,
				tda;

			self.fetch({
				success: function (){

					if(self.data.success === false){

						Events.trigger('offersview:servicefailed');

					} else {
						if (zipChange && self.get("zipChange")){
							self.get("zipChange").pop();
							self.get("zipChange").push("1");
						}

						if (self.data.getIncentivesByOfferTypeResult.tda[0] === undefined) {
							Events.trigger('offers:noIncentives');
						}

						tda = self.data.getIncentivesByOfferTypeResult.tda[0];

						if (tda !== undefined && tda.tdaCode && tda.tdaCode === 'GST10' && self.gstZip === false){
							self.gstZip = true;
							self.getLocalSpecialsData();
							return false;
						} else if (tda !== undefined && !tda.noIncentives) {
							self.gstZip = false;
							if ($('.zip-promise-fail').length == 1) {
								Analytics.fire('misc', '102.24', {
									tda_code:self.data.getIncentivesByOfferTypeResult.tda[0].tdaCode,
									'current_pagename': 'T:Local_Specials:Zip_Code_Entry',
									'zip_code': $.cookie('zipcode'),
									'device_type':Analytics.deviceType
								});
							}

							$('.filters').show();

							if (!_.isEqual(self.data, self.get("serviceData"))) {
								self.set("serviceData", self.data);
							} else {
								Events.trigger('offersview:render');
							}
						} else if(tda.tdaCode !== 'GST10'){
							$('.filters').show();
							Events.trigger('offers:noIncentives');
						}
					}

				},
				error: function(){
					Events.trigger('offersview:servicefailed');
				}
			});
		},
		/**
		* This function prepares data to be rendered in 'offers-view' at page load. The same data (cached after page load) is also used during offers-filtering.
		* @name Incentive#filterIncentives
		* @function
		*/
		filterIncentives:function(){
			var self = this,
				tda = self.get("serviceData").getIncentivesByOfferTypeResult.tda,
				incentives,
				cars,
				queryname,
				modelyear,
				incentivetype,
				incentiveid,
				filteredCars;

			var date = new Date(),
				today = new Date(date.getFullYear() , date.getMonth() , date.getDate());

			if (window.location.href.indexOf("#!") >= 0 && self.get("pageload") === 0){
				Events.trigger('offers:storeRouterInfo');
				self.set("pageload", 1);
			}
			if (!_.isEmpty(tda)  && tda[0] !== undefined){

				self.set("tdaCode",self.get('serviceData').getIncentivesByOfferTypeResult.tda[0].tdaCode);

				if (!self.get('serviceData').getIncentivesByOfferTypeResult.tda[0].noIncentives){
					incentives = self.get('serviceData').getIncentivesByOfferTypeResult.tda[0].incentive;

					cars = [];

					_(incentives.length).times(function(index){
						//Strip whitespace of series name
						cars.push(incentives[index].queryname.replace(/ /g, ''));
					});

					cars = _.union(cars);

					filteredCars = {};

					_(cars.length).times(function(index){
						if (filteredCars[cars[index]] === undefined){
							filteredCars[cars[index]] = {};
						}
					});

					_.each(incentives, function(incentive, i){

						queryname = incentive.queryname.replace(/ /g,'');

						modelyear = incentive.applicableModelYear[0];

						if (_.indexOf(seriesFilter, queryname+'|'+modelyear) !== -1 || new Date(incentive.endDate) < today) return;

						incentivetype = incentive.incentiveType;

						incentiveid = incentive.incentiveId;

						if (filteredCars[queryname][modelyear] === undefined) {
							filteredCars[queryname][modelyear] = {};
						}

						if (filteredCars[queryname][modelyear] !== undefined) {

							if (filteredCars[queryname][modelyear].incentiveid === undefined) {

								filteredCars[queryname][modelyear][incentiveid] = {};

								if (filteredCars[queryname][modelyear][incentiveid].incentivetype === undefined) {

									filteredCars[queryname][modelyear][incentiveid][incentivetype] = _.extend(incentive, {order:i});
								}
							}
						}
					});
					// console.log("filteredCars: ", filteredCars);
					self.set("filteredData",filteredCars);

					Events.trigger('offers:filtered');
				} else {
					Events.trigger('offers:noIncentives');
				}
			}
		}
	});

	return Incentive;
});

define('text!app/template/lease.html',[],function () { return '<p>Regional Lease offer</p>\n<div>\n\t<p>\n\t\t<span class="currency">&#36;<%= leaseMonthlyPayment %></span>\n\t\t<span>per month</span>\n\t</p>\n\t<p>\t<span class="currency"><%= leaseTerm %></span>\n\t\t<span>months</span>\n\t</p>\n\t<p>\n\t\t<span class="currency">&#36;<%= leaseDueAtSigning %></span>\n\t\t<span>due at signing</span>\n\t</p>\n</div>\n';});

define('text!app/template/apr.html',[],function () { return '<p>Regional Apr offer</p>\n<div><% var aprOffers=aprData.apr,\n\t\ttermRanked=_.filter(aprOffers, \n\t\t\tfunction(apr){\n\t\t\t\treturn (apr.termrank ===1) ;\n\t\t\t}),\n\t\taprVals;\n\n\t\tif (termRanked.length > 0){\n\t\t\tif(termRanked.length > 1){\n\t\t\t\taprVals=_.sortBy(termRanked, function(apr){\n\t\t\t\t\treturn apr.term;\n\t\t\t\t\t})[0];\n\t\t\t}else {\n\t\t\t\taprVals=termRanked[0];\n\t\t\t}\n\t\t} else {\n\t\t\taprVals=aprOffers[0];\n\t\t}\n\t%>\n\t<p>\n\t\t<span class="currency"> <%= aprVals.rate %>&#37;</span>\n\t\t<span>APR</span>\n\t</p>\n\t<p>\n\t\t<span class="currency"><%= aprVals.term %></span>\n\t\t<span>months</span>\n\t</p>\n</div>\n\n';});

define('text!app/template/cashback.html',[],function () { return '<p>Regional Cash back offer</p>\n<div>\n\t<p>\n\t\t<span class="currency">&#36;<%= cashBack %></span>\n\t\t<span>cash back</span>\n\t</p>\n</div>\n';});

define('text!app/template/offers.html',[],function () { return '<div class="offerBody">\n\t<%  var offerType= offersObj.incentiveType;\n\t\t\n\t\tswitch(offerType) {\n\t\t\tcase "LEASE":\n\t\t\t\t%><%= _.template(Lease, offersObj) %><%\n\t\t\t\tbreak;\n\t\t\tcase "CASH_BACK":\n\t\t\t\t\t%><%= _.template(CashBack, offersObj)%><%\n\t\t\t\tbreak;\n\t\t\tcase "APR":\n\t\t\t\t%><%= _.template(APR,offersObj) %><%\n\t\t\t\tbreak;\n\t\t}\n\t\t\n\t%>\n</div>';});

/**
 * @requires rit
 */
define('app/views/welcome',[
	'rit', 
	'util/view', 
	'util/analytics',
	'apps/localspecials/js/models/incentive-model',
	'text!app/template/lease.html',
	'text!app/template/apr.html',
	'text!app/template/cashback.html',
	'text!app/template/offers.html'
	], 
	function(
	RIT, 
	View, 
	Analytics,
	Incentive,
	Lease,
	Apr,
	Cashback,
	Offers
	){

	/**
	 * @version {version}
	 */
	var $ = RIT.$,
		_ = RIT._,
		Backbone = RIT.Backbone,
		Events = RIT.Events,
		has = RIT.has,
		$body = RIT.$body,
		data = RIT.bodyData,
		// used for analytics
		appName = 'mlp',
		seriesName = RIT.bodyData['seriesName'];

	/**
	 * @Class WelcomeMatt
	 */
	var WelcomeMatt = View.extend({

		tagName: 'section',
		className: 'panelwelcome',

		events: (!has.touch) ? {
			'click .fa_container a': 'goToPanel',
			'click #subnav li': 'goToPanel',
			'click .subnav h1 a': 'goToTop',
			'click .vehicle-overview *[data-welcome-mat] a.btn': 'trackMarqueeCtas',
			'click .marquee-cta a.btn': 'trackMarqueeCtas',
			'click .invisible-cta a': 'trackMarqueeCtas',
			'click .welcome-mat-localspecials .sales-event-callout': 'trackLocalSpecials',
			'click .incentive-link':'trackCtaClick'

		} : {
			// use click here in case there are any disclaimers contained within
			// if touchstart is used then the touchstart event won't fire for the disclaimer
			'click .fa_container a': 'goToPanel',
			'touchstart #subnav li': 'goToPanel',
			'touchstart .subnav h1 a': 'goToTop',
			'touchstart .vehicle-overview *[data-welcome-mat] a.btn': 'trackMarqueeCtas',
			'touchstart .marquee-cta a.btn': 'trackMarqueeCtas',
			'touchstart .invisible-cta a': 'trackMarqueeCtas',
			'touchstart .welcome-mat-localspecials .sales-event-callout': 'trackLocalSpecials',
			'touchstart .incentive-link':'trackCtaClick'
		},

		/**
		 * Initialize function
		 * @function
		 */
		initialize: function(options) {
			var self = this,
				$this = self.$('#marquee'),
				bg = $this.data('background');

			_.bindAll(self, 'trackSocial');

			self.model.on('change:panel', self.render, self);
			self.model.on('change:page', self.renderPage, self);

			// set the background image.
			if (bg) {
				$this.css('background-image', 'url(' + bg + ')');
			}

			self.trackIframe(function() {
				// empty function for async
			});

			//local specials incentives 
			self.incentives = new Incentive();
			//Wait till local specials data is available to add localspecials badge on welcome-matt
			Events.on('offers:filtered',function(){
				var currPanel=self.model.get('panel').toLowerCase(),
					welcomematPanel=$('div[data-welcome-mat="'+currPanel+'"]'),
					localspecialsMatt=self.$(".welcome-mat-localspecials");

				//Hide offers badge when it's special welcome mat				
				//if(currPanel!=='welcome' && welcomematPanel && welcomematPanel.length>0){
				if(welcomematPanel && welcomematPanel.length>0){
					//Insert offers inside welcomemat
					localspecialsMatt.hide();
					self.loadLocalSpecials(welcomematPanel);
				}else if(localspecialsMatt && localspecialsMatt.length>0){
					self.loadLocalSpecials(localspecialsMatt);
				}
			});
		},

		/*
		 * Handles local specials data
		 * Get the first data from the results
		 */
		loadLocalSpecials : function(panel){
			var self=this,
				fdata=self.incentives.get('filteredData'),
				badge=panel.find('.badge'),
				$offerBody=badge.find('.offerBody'),
				panelModel=	panel.data('model'),		
				series=((panelModel && panelModel!== '')? panelModel : $body.data('series-code')).replace(/[- ]/g, ''),
				year=$body.data('year'),
                offerArr,
				link,
				template,
				textColor;

				//DO NOT REMOVE. This sets the styles for sales events. Comment this out when the sales events are over
				panel.addClass('sales-event');

				if(badge.length>0){
					if(!_.isEmpty(fdata[series])){
                        //offerArr=_.toArray(fdata[series][year]);
                        offerArr=_.filter(fdata[series][year], function(offer){
							//Filter out NEW_OTHER  
							return offer['NEW_OTHER'] === undefined;
						});

                        if(offerArr.length>0){
                            offerArr = _.sortBy(offerArr, function(incentive, index) {
                                var type = _.keys(incentive)[0];
                                return incentive[type].order;
                            });
                            offerArr=_.toArray(offerArr[0]);
                            
                            template=_.template(Offers, {
                                offersObj: offerArr[0],
                                APR : Apr,
                                CashBack : Cashback,
                                Lease: Lease
                            });
                           
							link="/local-specials/#!/series/"+series+"/year/"+year+"/incentiveid/"+offerArr[0].incentiveId;
    
                            //Add the template to localsspecials 
                           // textColor=badge.css('color'); //Text color is changed in dcr
                            if($offerBody && $offerBody.length>0){
								$offerBody.empty();
                            }
                            badge.prepend(template);
                          //  badge.find('.offerBody').find('p+p').css('border-color',textColor); //change the border color to match the font color
                            badge.find('.sales-event-callout a').attr('href', link);
                            badge.show();
                        }
					}
                    else {
						badge.hide();
					}
				}		
		},

		/**
		 * @Default render function
		 * @function
		 */
		render: function() {
			var self = this;
			$("html, body").stop().animate({
				scrollTop: self.getScrollToPos()
			},800);
		},

		getScrollToPos: function() {
			var self = this,
				newPanel = self.model.get('panel').replace('#', ''),
				setPanel = (newPanel === 'Welcome') ? $('#marquee') : $('#' + self.getPanel(newPanel)),
				scrollToPos,
				mattPanel=$('div[data-welcome-mat="'+newPanel.toLowerCase()+'"]'),
				marqueeCta=$('.marquee-cta, .invisible-cta');


			// Get the analytics tags
			Analytics.getTags(appName);
			
			//For Tundra/corolla show welcome mat on load
		/*	if(seriesName ==='Corolla'){
				self.loadWelcomeMat($('div[data-welcome-mat="welcome"]'));
			}*/

			
			if (setPanel.length > 0) {
				scrollToPos = (setPanel.attr('id') === 'marquee') ? "0px" : (setPanel.position().top-30) + "px";
				//marqueeCta.show();
			} else {
				if ($('section[data-title="' + newPanel + '"]').length > 0) {
					scrollToPos = ($('section[data-title="' + newPanel + '"]').first().parents('.panel-container').position().top)-30 + "px";
					//marqueeCta.show();
				} else {
					if (mattPanel.length > 0) {
						scrollToPos= "0px";
						marqueeCta.hide();
						self.loadWelcomeMat(mattPanel);
					}
				}
			}
			
			return scrollToPos;
		},

		loadWelcomeMat: function(mattPanel) {
			var self = this,
				panelName=mattPanel.data('welcome-mat');

			//swap marquee bg image
			self.$('#marquee').css('background-image', 'url(' + mattPanel.data("background-image") + ')');
			//Hide the other matts if they are visible
			self.$('[data-welcome-mat]:visible').hide();

			//Load offers incase the page is not refreshed
			//self.incentives.getLocalSpecialsData();

			//SHOW THE invisible button inside the welcome mat
			mattPanel.find('.invisible-cta').show();
			//show the matt
			mattPanel.css({
				'display':'block'
			});

			//Load scripts in tags directory for camry
			//filename of the js file should match the 'panelName', which is the welcomemat url after the #!
			if(/koreanwelcome|chinesewelcome|vietnamesewelcome/.test(panelName)){
				require(["app/tags/"+panelName]);
			}		
		},

		renderPage: function() {
			var self = this,
				page= self.model.get('page'),
				panel = $('section[data-sub-title="' + self.model.get('page') + '"]');

			//Deep link to Model panel's Hybrid section
			if(self.model.get('panel').toLowerCase() ==='models' && page.toLowerCase() ==='hybrid' ){
				self.gotoHybrid();
			}
			else {
				//'silent' is set to true to stop firing "panelchange:before" 
				// because click(next/prev) tagging is wired to this event 
				Events.trigger('mlp:goToPanel', panel.index(), panel.parents('.panel-container'), true);
			}
		},

		/**
		 * This funcion looks scrolls to models panel's grades, 
		 * if the grades' text contains 'Hybrid'
		 * @return {[type]} [description]
		 */
		gotoHybrid: function(){
			var self=this,
				$panel=$('#vehicleModels'),
				//Grades on the 2nd row
				$row2=$panel.find('.page-content .row:nth-child(2) .grades'),				
				//match if H1 contains 'hybrid'
				$hybrid=_.find($row2.find('h1'), function(txt){
					return ($(txt).text().match(/\bhybrid\b/i) !== null);
				}),
				top;

			if($hybrid !== undefined){
				Events.on('compareFetch:done', function(){
					top=($row2.offset().top-100);
					$("html,body").stop().animate({
						scrollTop : top
					}, 1500);
				});
			}
		},

		/**
		 * @Navigated to panel
		 * @param {MyEventObject} (evt)
		 * @function
		 */
		goToPanel: function(evt) {
			evt.preventDefault();
			var self = this,
				$currentTarget = $(evt.currentTarget),
				$el = $currentTarget.is('a')?$currentTarget:$currentTarget.find('a'),
				dataTarget = $el.data('target'),
				panelName = $el.attr('href').replace('#', ''),
				tags,
				tagId;

			//Analytics added for SubNav items.
			if (typeof(dataTarget) !== 'undefined') {
				dataTarget=dataTarget.replace("#","");
				//If "Build" is clicked from subnav, redirect to configurator		
				tags = {
					'panelGallery': '54.48',
					'panels1': '54.47',
					'features': '54.47',
					'vehicleModels': '54.51',
					'models': '54.51',
					'awardsRatings': '54.52',
					'compareCar': '54.46',
					'buildYourCar': '54.2',
					'inventory': '54.49'
				}[dataTarget] || 'NA';

				tagId = tags;	
				if (tagId !== 'NA') {
					Analytics.fire(appName, tagId, {
						'current_pagename': Analytics.currentPageName(),
						'vehicle': seriesName
					});
				}
				if (dataTarget === "buildYourCar"){
					window.location.href=$el.attr('href');
				}							
			} else {
				Analytics.fire(appName, '54.43', {
					'current_pagename': Analytics.currentPageName(),
					'vehicle': seriesName,
					'tile_name': $('h3', $currentTarget.children('div')).html(),
					'tile_position': $currentTarget.index() + 1,
					'device_type': Analytics.deviceType
				});
			}


			if (evt.target.tagName === 'SUP' && $(evt.target).parents('.fa_container').length > 0) {
				return; //Halting if disclaimer span is clicked.
			}

			self.model.unset('page');
			// self.model.set({panel: ''}, {silent:true}); //To jump to section if same section is selected and again clicked
			// self.model.set({
			//	panel: panelName.substring(panelName.lastIndexOf('/') + 1)
			// });
			Events.trigger('section:change', {panel: panelName.substring(panelName.lastIndexOf('/') + 1)});
			// self.render();
		},

		goToTop: function(evt) {
			var self = this;

			evt.preventDefault();

			self.model.unset('page');
			// self.model.set({panel: ''}, {silent:true});
			self.model.set({
				panel: 'Welcome'
			});

			self.render();

			//Analytics
			Analytics.fire(appName, '54.50', {
				'current_pagename': Analytics.currentPageName(),
				'vehicle': seriesName
			});
		},

		getPanel: (function() {
			// Cache the panel lookup so it's not created each time the method is called
			var panelMap = {
				'gallery': 'panelGallery',
				'features': 'panels1',
				'models': 'vehicleModels',
				'reviews': 'awardsRatings',
				'compare': 'compareCar',
				'build': 'buildYourCar'
			};

			// Return new function which will use the cached panelMap
			return function(data) {
				// return the value in the panelMap if it exists, else return original value passed in
				return panelMap[data] || data;
			};
		})(),

		/**
		 * Initiate tracking on facebook iframe.
		 * @return {void}
		 */
		trackIframe: function(callback) {
			var self = this,
				isOverIFrame = false,
				iframeContainer = "",
				element = self.$('#marquee .facebook').find('iframe'),
				top = window.top;

			for (var i = 0, len = element.length; i < len; i += 1) {
				element[i].onmouseover = processMouseOver;
				element[i].onmouseout = processMouseOut;
			}

			// bind blur handler to the parent page which assumes focus has been passed to the iframe
			$(top).on('blur', processIFrameClick);

			function processMouseOut() {
				isOverIFrame = false;
				top.focus();
			}

			function processMouseOver(ev) {
				isOverIFrame = true;

				// IE doesn't pass event into the parameter
				if (!ev) {
					ev = window.event;
				}

				//iframeContainer = ev.srcElement.parentNode.id;
				iframeContainer = ev.currentTarget.parentElement.id;
			}

			function processIFrameClick(ev) {
				if (isOverIFrame) {
					self.trackSocial(iframeContainer);
				}
			}

			//callback && callback();
		},

		trackSocial: function(data) {
			Analytics.fire(appName, 54.59, {
				'current_pagename': Analytics.currentPageName()
			});
		},

		//Tagging for welcome-matt CTA
		trackMarqueeCtas : function(evt){
			var $welcomematPanel=$(evt.currentTarget).parent();

			//If welcomemat panel has data-type=offer , this is an offer tag. 
			//Eveything else goes to default tagging, trackCtaClick
			if($welcomematPanel.data('type')==='Offer'){
				this.trackLocalSpecials(evt);
			}else{
				this.trackCtaClick(evt);
			}
		},

		//Tagging for Localspecials badge and Camry welcome mat's "View Local Specials" click
		trackLocalSpecials : function(evt){
			var $currentTarget = $(evt.currentTarget).is('a')?$(evt.currentTarget):$(evt.currentTarget).find('a'),
				title=$currentTarget.parent().data('title')||$("#marquee").data('title');
			
			//WElcome mat's data-title
			if(title==='' || title===undefined){
				title=$.trim($currentTarget.find('span').text());
			}
							
			Analytics.fire(appName, '54.45', {
				'current_pagename': Analytics.currentPageName(),
				'promotion_title': 'Check_Out_Local_Specials',
				'button_title':title, 
				'device_type': Analytics.deviceType,
				'destination_url': $currentTarget.attr('href'),
				'vehicle': seriesName
			});
		},

		/**
		/**
		 * Default tag for CTA click
		 * For invisible button , button_title is 'data-title'
		 * For all other buttons, button title is the actual button text
		 */
		trackCtaClick : function(evt){
			var self=this,
				$currentTarget = $(evt.currentTarget),
				btnTitle=$.trim($currentTarget.text()),
				dataTitle;

				if(btnTitle ===''){
					dataTitle=$currentTarget.parent().data('title');
					btnTitle=(dataTitle !== undefined)?dataTitle:'';
				}
				/*title=$currentTarget.parent().data('title'),
				btnTitle=(title==='' || title===undefined)?$.trim($currentTarget.text()):title;*/
				
			Analytics.fire(appName, 54.106, {
				'current_pagename': Analytics.currentPageName(),
				'device_type'  : Analytics.deviceType,
				'button_title' :  btnTitle,
				'destination_url': $currentTarget.attr('href')
			});
		}
	});

	return WelcomeMatt;

});

/**
 * @requires rit
 */
define('app/views/camry-effect',['rit', 'util/view'], function(RIT, View) {

    /**
     * @version {version}
     */
    var $ = RIT.$,
        _ = RIT._,
        Backbone = RIT.Backbone,
        Events = RIT.Events;

    /**
     * @Class CamryEffect
     */
    var CamryEffect = View.extend({
        
        /**
         * Initialize function
         * @function
         */
        initialize: function() {
            this.render();
        },

        /**
         * Render the view
         * @function
         */
        render: function() {
        	var self = this,
				$el = self.$el,
				bg = $el.data('background');

			// set the background image
			if (bg) {
				$el.css('background-image', 'url(' + bg + ')');
			}

			return self;
        }

    });

    // Return public interface
    return CamryEffect;

});

/**
 * @requires rit
 */
define('app/views/colorizer',['rit', 'util/view', 'util/analytics', 'navIndicator'], function(RIT, View, Analytics, undefined) {

	/**
	 * @version {version}
	 */
	var $ = RIT.$,
		_ = RIT._,
		Backbone = RIT.Backbone,
		Events = RIT.Events,
		has = RIT.has,
		$body = RIT.$body,
		data = RIT.bodyData,
		// Desktop events
		events = {
			'click #color-picker-nav li a': 'handleChangeColor'
		},
		// Used for analytics
		appName = 'mlp',
		seriesName = data['seriesName'];

	if (has.touch) {
		events = {
			'touchstart #color-picker-nav li a': 'handleChangeColor'
		};
	}

	/**
	 * @Class WelcomeMatt
	 */
	var Colorizer = View.extend({
		tagName: 'div',
		className: 'Colorizer',

		events: events,

		/**
		 * @Default initialize function
		 * @function
		 */
		initialize: function() {
			var self = this,
				dataFirst = self.$('#color-picker-nav li:first').data();

			self.folder = self.$el.data('folder');
			self.colorCode = dataFirst['colorCode'];
			self.colorName = dataFirst['colorName'];

			self.$vehiclePreview = self.$('.vehicle-preview');
			self.$vehicleColorName = self.$('.vehicle-color-name');
			self.$colorPickerNav = self.$('#color-picker-nav');

			self.preloadImages(function() {
				//console.log('images preloaded');
			});

			self.model.on('change:color', self.render, self);

			// set first color as active
			self.changeColor({silent:true});

			// Init the indicator
			self.$colorPickerNav.navIndicator();
		},

		/**
		 * @Default render function
		 * @function
		 */
		render: function() {
			var self = this;

			self.$vehiclePreview.html('<img alt="' + self.colorName + '" src="' + self.folder + self.model.get('color') + '.png">');

			$("li[data-color-code='040'] a, li[data-color-code='070'] a").addClass('grey-border');
		},

		/**
		 * Click event handler for changing color.
		 * @param {Event} evt The event.
		 * @return {void}
		 */
		handleChangeColor: function(evt) {
			var self = this,
				data = self.$(evt.currentTarget).parent().data();

			evt.preventDefault(); // to prevent # links

			self.colorCode = data['colorCode'];
			self.colorName = data['colorName'];

			self.changeColor();
		},

		/**
		 * Change the color.
		 * @param {Boolean} [silent] Whether to trigger onColorChange.
		 * @return {void}
		 */
		changeColor: function(silent) {
			var self = this;

			self.$vehicleColorName.html(self.colorName);

			self.model.set({
				color: self.colorCode
			});

			if (silent === undefined) {
				self.onColorChange();
			}
		},
		
		/**
		 * Preloads the colored jelly images.
		 * @return {void}
		 */
		preloadImages: function(callback) {
			var self = this,
				images = [];

			_.each(self.$colorPickerNav.find('li'), function(li, i) {
				images[i] = new Image();
				images[i].src = self.folder + $(li).data('color-code') + '.png';
			});

			callback && callback();
		},

		/**
		 * Called when a color is changed.
		 * @return {void}
		 */
		onColorChange: function() {
			Analytics.fire(appName, '54.44', {
				'current_pagename': Analytics.currentPageName(),
				'vehicle': seriesName,
				'color': this.colorName
			});
		}
	});

	// Return public interface
	return Colorizer;

});

/*!
 * jQuery imagesLoaded plugin v2.1.1
 * http://github.com/desandro/imagesloaded
 *
 * MIT License. by Paul Irish et al.
 */

/*jshint curly: true, eqeqeq: true, noempty: true, strict: true, undef: true, browser: true */
/*global jQuery: false */

;(function($, undefined) {


// blank image data-uri bypasses webkit log warning (thx doug jones)
var BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

$.fn.imagesLoaded = function( callback ) {
	var $this = this,
		deferred = $.isFunction($.Deferred) ? $.Deferred() : 0,
		hasNotify = $.isFunction(deferred.notify),
		$images = $this.find('img').add( $this.filter('img') ),
		loaded = [],
		proper = [],
		broken = [];

	// Register deferred callbacks
	if ($.isPlainObject(callback)) {
		$.each(callback, function (key, value) {
			if (key === 'callback') {
				callback = value;
			} else if (deferred) {
				deferred[key](value);
			}
		});
	}

	function doneLoading() {
		var $proper = $(proper),
			$broken = $(broken);

		if ( deferred ) {
			if ( broken.length ) {
				deferred.reject( $images, $proper, $broken );
			} else {
				deferred.resolve( $images );
			}
		}

		if ( $.isFunction( callback ) ) {
			callback.call( $this, $images, $proper, $broken );
		}
	}

	function imgLoadedHandler( event ) {
		imgLoaded( event.target, event.type === 'error' );
	}

	function imgLoaded( img, isBroken ) {
		// don't proceed if BLANK image, or image is already loaded
		if ( img.src === BLANK || $.inArray( img, loaded ) !== -1 ) {
			return;
		}

		// store element in loaded images array
		loaded.push( img );

		// keep track of broken and properly loaded images
		if ( isBroken ) {
			broken.push( img );
		} else {
			proper.push( img );
		}

		// cache image and its state for future calls
		$.data( img, 'imagesLoaded', { isBroken: isBroken, src: img.src } );

		// trigger deferred progress method if present
		if ( hasNotify ) {
			deferred.notifyWith( $(img), [ isBroken, $images, $(proper), $(broken) ] );
		}

		// call doneLoading and clean listeners if all images are loaded
		if ( $images.length === loaded.length ) {
			setTimeout( doneLoading );
			$images.unbind( '.imagesLoaded', imgLoadedHandler );
		}
	}

	// if no images, trigger immediately
	if ( !$images.length ) {
		doneLoading();
	} else {
		$images.bind( 'load.imagesLoaded error.imagesLoaded', imgLoadedHandler )
		.each( function( i, el ) {
			var src = el.src;

			// find out if this image has been already checked for status
			// if it was, and src has not changed, call imgLoaded on it
			var cached = $.data( el, 'imagesLoaded' );
			if ( cached && cached.src === src ) {
				imgLoaded( el, cached.isBroken );
				return;
			}

			// if complete is true and browser supports natural sizes, try
			// to check for image status manually
			if ( el.complete && el.naturalWidth !== undefined ) {
				imgLoaded( el, el.naturalWidth === 0 || el.naturalHeight === 0 );
				return;
			}

			// cached images don't fire load sometimes, so we reset src, but only when
			// dealing with IE, or image is complete (loaded) and failed manual check
			// webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
			if ( el.readyState || el.complete ) {
				el.src = BLANK;
				el.src = src;
			}
		});
	}

	return deferred ? deferred.promise( $this ) : $this;
};

})(jQuery);

define("imagesLoaded", function(){});


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


/*!
 * Socialite v2.0
 * http://socialitejs.com
 * Copyright (c) 2011 David Bushell
 * Dual-licensed under the BSD or MIT licenses: http://socialitejs.com/license.txt
 */
window.Socialite=function(e,t,n){"use strict"
var a=0,i=[],o={},r={},l=/^($|loaded|complete)/,s=e.encodeURIComponent,c={settings:{},trim:function(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")},hasClass:function(e,t){return-1!==(" "+e.className+" ").indexOf(" "+t+" ")},addClass:function(e,t){c.hasClass(e,t)||(e.className=""===e.className?t:e.className+" "+t)},removeClass:function(e,t){e.className=c.trim(" "+e.className+" ".replace(" "+t+" "," "))},extendObject:function(e,t,a){for(var i in t){var o=e[i]!==n
o&&"object"==typeof t[i]?c.extendObject(e[i],t[i],a):(a||!o)&&(e[i]=t[i])}},getElements:function(e,t){for(var n=0,a=[],i=!!e.getElementsByClassName,o=i?e.getElementsByClassName(t):e.getElementsByTagName("*");o.length>n;n++)(i||c.hasClass(o[n],t))&&a.push(o[n])
return a},getDataAttributes:function(e,t,n){for(var a=0,i="",o={},r=e.attributes;r.length>a;a++){var l=r[a].name,c=r[a].value
c.length&&0===l.indexOf("data-")&&(t&&(l=l.substring(5)),n?o[l]=c:i+=s(l)+"="+s(c)+"&")}return n?o:i},copyDataAttributes:function(e,t,n,a){var i=c.getDataAttributes(e,n,!0)
for(var o in i)t.setAttribute(a?o.replace(/-/g,"_"):o,i[o])},createIframe:function(e,n){var a=t.createElement("iframe")
return a.style.cssText="overflow: hidden; border: none;",c.extendObject(a,{src:e,allowtransparency:"true",frameborder:"0",scrolling:"no"},!0),n&&(a.onload=a.onreadystatechange=function(){l.test(a.readyState||"")&&(a.onload=a.onreadystatechange=null,c.activateInstance(n))}),a},networkReady:function(e){return o[e]?o[e].loaded:n},appendNetwork:function(e){if(e&&!e.appended){if("function"==typeof e.append&&e.append(e)===!1)return e.appended=e.loaded=!0,c.activateAll(e),n
e.script&&(e.el=t.createElement("script"),c.extendObject(e.el,e.script,!0),e.el.async=!0,e.el.onload=e.el.onreadystatechange=function(){if(l.test(e.el.readyState||"")){if(e.el.onload=e.el.onreadystatechange=null,e.loaded=!0,"function"==typeof e.onload&&e.onload(e)===!1)return
c.activateAll(e)}},t.body.appendChild(e.el)),e.appended=!0}},removeNetwork:function(e){return c.networkReady(e.name)?(e.el.parentNode&&e.el.parentNode.removeChild(e.el),!(e.appended=e.loaded=!1)):!1},reloadNetwork:function(e){var t=o[e]
t&&c.removeNetwork(t)&&c.appendNetwork(t)},createInstance:function(e,t){var o=!0,r={el:e,uid:a++,widget:t}
return i.push(r),t.process!==n&&(o="function"==typeof t.process?t.process(r):!1),o&&c.processInstance(r),r.el.setAttribute("data-socialite",r.uid),r.el.className="socialite "+t.name+" socialite-instance",r},processInstance:function(e){var n=e.el
e.el=t.createElement("div"),e.el.className=n.className,c.copyDataAttributes(n,e.el),"a"!==n.nodeName.toLowerCase()||n.getAttribute("data-default-href")||e.el.setAttribute("data-default-href",n.getAttribute("href"))
var a=n.parentNode
a.insertBefore(e.el,n),a.removeChild(n)},activateInstance:function(e){return e&&!e.loaded?(e.loaded=!0,"function"==typeof e.widget.activate&&e.widget.activate(e),c.addClass(e.el,"socialite-loaded"),e.onload?e.onload(e.el):null):n},activateAll:function(e){"string"==typeof e&&(e=o[e])
for(var t=0;i.length>t;t++){var n=i[t]
n.init&&n.widget.network===e&&c.activateInstance(n)}},load:function(e,a,o,l,s){if(e=e&&"object"==typeof e&&1===e.nodeType?e:t,!a||"object"!=typeof a)return c.load(e,c.getElements(e,"socialite"),o,l,s),n
var d
if(/Array/.test(Object.prototype.toString.call(a)))for(d=0;a.length>d;d++)c.load(e,a[d],o,l,s)
else if(1===a.nodeType){if(!o||!r[o]){o=null
var p=a.className.split(" ")
for(d=0;p.length>d;d++)if(r[p[d]]){o=p[d]
break}if(!o)return}var u,f=r[o],g=parseInt(a.getAttribute("data-socialite"),10)
if(isNaN(g))u=c.createInstance(a,f)
else for(d=0;i.length>d;d++)if(i[d].uid===g){u=i[d]
break}!s&&u&&(u.init||(u.init=!0,u.onload="function"==typeof l?l:null,f.init(u)),f.network.appended?c.networkReady(f.network.name)&&c.activateInstance(u):c.appendNetwork(f.network))}},activate:function(t,n,a){e.Socialite.load(null,t,n,a)},process:function(t,n,a){e.Socialite.load(t,n,a,null,!0)},network:function(e,t){o[e]={name:e,el:null,appended:!1,loaded:!1,widgets:{}},t&&c.extendObject(o[e],t)},widget:function(e,t,n){n.name=e+"-"+t,o[e]&&!r[n.name]&&(n.network=o[e],o[e].widgets[t]=r[n.name]=n)},setup:function(e){c.extendObject(c.settings,e,!0)}}
return c}(window,window.document),function(e,n,a){a.setup({facebook:{lang:"en_GB",appId:null},twitter:{lang:"en"},googleplus:{lang:"en-GB"}}),a.network("facebook",{script:{src:"//connect.facebook.net/{{language}}/all.js",id:"facebook-jssdk"},append:function(t){var i=n.createElement("div"),o=a.settings.facebook,r={onlike:"edge.create",onunlike:"edge.remove",onsend:"message.send"}
i.id="fb-root",n.body.appendChild(i),t.script.src=t.script.src.replace("{{language}}",o.lang),e.fbAsyncInit=function(){e.FB.init({appId:o.appId,xfbml:!0})
for(var t in r)"function"==typeof o[t]&&e.FB.Event.subscribe(r[t],o[t])}}}),a.widget("facebook","like",{init:function(t){var i=n.createElement("div")
i.className="fb-like",a.copyDataAttributes(t.el,i),t.el.appendChild(i),e.FB&&e.FB.XFBML&&e.FB.XFBML.parse(t.el)}}),a.network("twitter",{script:{src:"//platform.twitter.com/widgets.js",id:"twitter-wjs",charset:"utf-8"},append:function(){var n="object"!=typeof e.twttr,i=a.settings.twitter,o=["click","tweet","retweet","favorite","follow"]
return n&&(e.twttr=t={_e:[],ready:function(e){t._e.push(e)}}),e.twttr.ready(function(e){for(var t=0;o.length>t;t++){var n=o[t]
"function"==typeof i["on"+n]&&e.events.bind(n,i["on"+n])}a.activateAll("twitter")}),n}})
var i=function(e){var t=n.createElement("a")
t.className=e.widget.name+"-button",a.copyDataAttributes(e.el,t),t.setAttribute("href",e.el.getAttribute("data-default-href")),t.setAttribute("data-lang",e.el.getAttribute("data-lang")||a.settings.twitter.lang),e.el.appendChild(t)},o=function(){e.twttr&&"object"==typeof e.twttr.widgets&&"function"==typeof e.twttr.widgets.load&&e.twttr.widgets.load()}
a.widget("twitter","share",{init:i,activate:o}),a.widget("twitter","follow",{init:i,activate:o}),a.widget("twitter","hashtag",{init:i,activate:o}),a.widget("twitter","mention",{init:i,activate:o}),a.widget("twitter","embed",{process:function(e){e.innerEl=e.el,e.innerEl.getAttribute("data-lang")||e.innerEl.setAttribute("data-lang",a.settings.twitter.lang),e.el=n.createElement("div"),e.el.className=e.innerEl.className,e.innerEl.className="",e.innerEl.parentNode.insertBefore(e.el,e.innerEl),e.el.appendChild(e.innerEl)},init:function(e){e.innerEl.className="twitter-tweet"},activate:o}),a.network("googleplus",{script:{src:"//apis.google.com/js/plusone.js"},append:function(){return e.gapi?!1:(e.___gcfg={lang:a.settings.googleplus.lang,parsetags:"explicit"},undefined)}})
var r=function(e){var t=n.createElement("div")
t.className="g-"+e.widget.gtype,a.copyDataAttributes(e.el,t),e.el.appendChild(t),e.gplusEl=t},l=function(e,t){return"function"!=typeof t?null:function(n){t(e.el,n)}},s=function(t){var n=t.widget.gtype
if(e.gapi&&e.gapi[n]){for(var i=a.settings.googleplus,o=a.getDataAttributes(t.el,!0,!0),r=["onstartinteraction","onendinteraction","callback"],s=0;r.length>s;s++)o[r[s]]=l(t,i[r[s]])
e.gapi[n].render(t.gplusEl,o)}}
a.widget("googleplus","one",{init:r,activate:s,gtype:"plusone"}),a.widget("googleplus","share",{init:r,activate:s,gtype:"plus"}),a.widget("googleplus","badge",{init:r,activate:s,gtype:"plus"}),a.network("linkedin",{script:{src:"//platform.linkedin.com/in.js"}})
var c=function(t){var i=n.createElement("script")
i.type="IN/"+t.widget.intype,a.copyDataAttributes(t.el,i),t.el.appendChild(i),"object"==typeof e.IN&&"function"==typeof e.IN.parse&&(e.IN.parse(t.el),a.activateInstance(t))}
a.widget("linkedin","share",{init:c,intype:"Share"}),a.widget("linkedin","recommend",{init:c,intype:"RecommendProduct"})}(window,window.document,window.Socialite),function(){var e=window._socialite
if(/Array/.test(Object.prototype.toString.call(e)))for(var t=0,n=e.length;n>t;t++)"function"==typeof e[t]&&e[t]()}();

define("socialite", (function (global) {
    return function () {
        return global.Socialite;
    };
}(this)));

/**
 * @requires rit
 * @requires util/view
 * @requires navIndicator
 * @requires imagesLoaded
 * @requires spin
 * @requires socialite
 * @requires util/analytics
 */
define('app/views/gallery',['rit', 'util/view', 'navIndicator', 'imagesLoaded', 'ritLoading', 'socialite', 'util/analytics'],
	function(RIT, View, NavIndicato, imagesLoaded, Loading, Socialite, Analytics) {

	/**
	 * Vehicle Gallery is a view for gallery section of vehicle landing page.
	 *
	 * @exports views/VehicleGallery
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
		appName = 'mlp',
		fromThumbNav = false,
		seriesName = RIT.bodyData['seriesName'],
		iframeContainer = "",
		events = has.touch? {
			'touchstart #thumbnail-nav ul li .overlay': 'shadowClick',
			'touchstart #thumbnail-nav ul li a': 'handleClicks',
			'touchstart .caption-icons a.btn': 'handleCaptions',
			'touchstart .thumbs-nav a#btnLeftThumbSlider': 'shiftLeft',
			'touchstart .thumbs-nav a#btnRightThumbSlider': 'shiftRight',
			'touchstart .gallery-caption .caption-icons a.largePhoto': 'largePhoto',
			'touchstart .largePhotoClose': 'closePhoto',
			'touchstart .full-gallery': 'fullGalleryLinkClicked'
		} : {
			'click #thumbnail-nav ul li .overlay': 'shadowClick',
			'click #thumbnail-nav ul li a': 'handleClicks',
			'click .caption-icons a.btn': 'handleCaptions',
			'click .thumbs-nav a#btnLeftThumbSlider': 'shiftLeft',
			'click .thumbs-nav a#btnRightThumbSlider': 'shiftRight',
			'click .gallery-caption .caption-icons a.largePhoto': 'largePhoto',
			'click .largePhotoClose': 'closePhoto',
			'click .full-gallery': 'fullGalleryLinkClicked'
		};

	/**
	 * @class VehicleGallery
	 * @extends util/view
	 */
	var VehicleGallery = View.extend({

		tagName: 'section',
		className: 'vehicleGallery',

		events: events,

		/**
		 * @Default initialize function for vehicleGallery
		 * @function
		 */
		initialize: function() {
			var self = this,
				$subnav=$('#subnav');

			self.interaction = false;
			Analytics.setPageName('T:' + seriesName + ':Overview');
			self.analyticsPagename= Analytics.currentPageName();

			self.$allPanels = self.$('.panel');
			self.$galleryPanels = self.$('.gallery-panels');
			self.$thumbnailNav = self.$('#thumbnail-nav');

			// Create a cache for panel info
			self.currentPanel = {
				index: 0,
				el: self.$allPanels[0]
			};

			self.render();

			// Get the reference to the gallery panel set
			self.panelSet = self.options.panelSet;
			
			self.panelSet.on('panelchange:after', function(index, dir, currentPanel) {
				self.updateIndicator(index);
				var $currentPanel = $(currentPanel),
					title = $currentPanel.find('.gallery-caption .caption-holder .row .span10 .h3').text(),
					tagId = " ";

				self.currentPanel = {
					index: index,
					el: currentPanel
				};

				if (_.isEmpty(title)) {
					title = 'photo' + (index+1);
				}

				//Analytics
				if (!fromThumbNav && dir) {
					if (dir === 'prev') {
						tagId = '54.35';
					} else if (dir === 'next') {
						tagId = '54.34';
					}
					Analytics.fire(appName, tagId, {
						'current_pagename': Analytics.currentPageName(),
						'photo_title': title,
						'vehicle': seriesName,
						'device_type':Analytics.deviceType
					});
				}
				//Changes applied for TOYRIT-7552.
				if ($.browser.msie) {
					backgroundImage = $('.gallery-panels .panel-set .active').data('background');
					$('.gallery-panels .panel-set .active .panel-background').css('background-image','url('+backgroundImage+')');
				}

				fromThumbNav = false;

			}, self);

			// when a user presses 'Esc' resize the fullscreen photo to regular
			$document.keyup(function(e) {
				if (e.keyCode === 27) {
					// if a largePhoto is open and in fullscreen
					if ($('.panel-background-block .panel-background:visible').length) {
						// resize the photo to regular
						$('.panel-background-block .panel-background', self.$el).remove();
						$window.scrollTop($('#panelGallery').offset().top);
						$('.icon-overlay').css({'display':'block'});
					}
				}
			});

			$window.resize(function() {
				self.resize();
			});
		},

		/**
		 * @Default render function for vehicleGallery
		 * @function
		 */
		render: function() {
			var self = this;

			self.setupThumbNav();

			// initializing thumb-navigation
			self.$thumbnailNav.navIndicator();
			// Below code is written to resolve - TOYRIT-7052 on ipad
			if (has.touch) {
				self.$('#btnLeftThumbSlider').css('margin-left', '-37px');
				self.$('#btnRightThumbSlider').css('margin-right', '-39px');
			}
		},
		shadowClick: function(evt) {
			var self = this,
				index = self.$('li', $(evt.currentTarget).closest('ul')).index($(evt.currentTarget).parent()),
				event = jQuery.Event('click'),
				thumb = $('a', $(evt.currentTarget).parent());

				thumb.trigger(event);
		},

		/**
		 * Click event handler for updating the current panel to the indicator clicked
		 * @name vehicleGallery#handleClicks
		 * @function
		 * @param {MyEventObject} (evt)
		 */
		handleClicks: function(evt) {
			var self = this,
				index = _.indexOf(self.$($(evt.currentTarget).parents('ul').find(evt.target.tagName)), evt.target),
				image;
			
			if (!self.interaction) {
				self.interaction = true;
			}

			if (index === -1) return; // if the user clicks somewhere outside of an li
			//Analytics
			Analytics.fire(appName,'54.39', {
				'current_pagename': Analytics.currentPageName(),
				'thumbnail_position': index+1,
				'vehicle': seriesName,
				'device_type':Analytics.deviceType,
				'photo_title' : 'photo'+ (index+1)
			});
			fromThumbNav = true;

			self.panelSet.goToPanel(index);
			self.trigger('thumb:click', index);

			// Updating full screen image if click on thumbnail when fullscreen image is open //
			if ($('.panel-background-block').length > 0) {
				// removing 'self.currentPanel.index' as it pointing previous index
				self.background = self.$('.panel').eq(index).data('fullscreen');

				image = $('<img />').attr('src', self.background);

				if (self.background) {
					// when the new image has loaded
					$('#thumbnail-nav li.is-on').loading("small");

					image.imagesLoaded(function($images, $proper, $broken) {
						setTimeout(function() {
							$("#thumbnail-nav li.is-on").loading(false);
						}, 500);

						$('.larg-photo').attr('src', self.background);
					});
				}
			}
		},

		/**
		 * Update the indicator to correspond to the current panel
		 * @name vehicleGallery#updateIndicator
		 * @function
		 * @param {Object} index
		 */
		updateIndicator: function(index) {
			var self = this;

			// remove is-on class from the one that has it and add it to the new curent page
			self.$('.gallery-thumbs li').removeClass('is-on').eq(index).addClass('is-on');

			// thumbnail-nav updates to the current panel
			//self.$thumbnailNav.find('li').eq(index).trigger((has.touch) ? 'touchstart' : 'click');
			// to resolve https://qa.icrossing.com/browse/TOYRIT-6020 we have change the code and call only click event
			self.$thumbnailNav.find('li').eq(index).trigger('click');

			// updating thumbs navigation
			self.updateSlider(index);
		},

		/**
		 * Click event handler for caption for gallery images
		 * @name vehicleGallery#handleCaptions
		 * @function
		 * @param {MyEventObject} (evt)
		 */
		handleCaptions: function(evt) {
			var self = this,
				currentPanel = $(self.currentPanel.el);
			if (!$(evt.currentTarget).hasClass('largePhoto')) {
				evt.preventDefault();
				
				//We have mixed approach to track Socialite plugin click events.
				//For twitter & g+, Socialite's inbuilt event listening is used.
				//For FB only, we have rather a conventional approach to detect click events.
				//This is due to Socialite plugin do not respond correctly to successfull
				//user login window(auth.login event) and Tags won't fire on user login.
				if (!Socialite.loaded){
					self.socialiteInit();
				}

				if (self.$(evt.currentTarget).children().hasClass('icon-info')) {
					currentPanel.find('.caption-holder').slideToggle(300);
				}

				currentPanel.find('.fb-like span,.fb-like iframe').css({'height': 20, 'width':75});
			}
		},

		socialiteInit: function() {
			var self=this,
				tweetLoad = false,
				fbLoad = false,
				plusLoad = false;
			Socialite.setup({
				twitter: {
					//onclick: _.bind(this.socialiteClick, this, "twitter")
				},
				googleplus: {
					//callback: _.bind(this.socialiteClick, this, "googleplus")
				}
			});

			if (RIT.util.es) {
				Socialite.setup({
					facebook: { lang: 'es_LA' },
					twitter: { lang: 'es' },
					googleplus: { lang: 'es-419' }
				});
			}

			Socialite.load($('#panelGallery'));
			Socialite.loaded = true;
			//Register iframe click event when its available.
			var checkExist = setInterval(function() {
				//check if twitter iframe gets loaded
				if($('.twitter-share iframe').length >0){
					if(!tweetLoad){
						self.trackIframe();
						tweetLoad = true;
					}
				}
				if($('.facebook-like iframe').length >0){
					if(!fbLoad){
						self.trackIframe();
						fbLoad = true;
					}
				}
				if($('.googleplus-one iframe').length >0){
					if(!plusLoad){
						self.trackIframe();
						plusLoad = true;
					}
				}

				if( $('.twitter-share iframe').length >0 &&
					$('.facebook-like iframe').length >0 &&
					$('.googleplus-one iframe').length >0){
					clearInterval(checkExist);
			  	}
			},100);
		},

		/**
		 * initiate tracking on iframe.
		 * @return {[type]} [description]
		 */
		trackIframe: function() {
			var self = this,
				isOverIFrame = false,
				top = window.top;
			
			$('.socialite iframe').each(function(){
				$(this).off('mouseover').on('mouseover', function(ev){
					isOverIFrame = true;
					// IE doesn't pass event into the parameter
					if (!ev){
						ev = window.event;
					}
					if(ev.currentTarget.parentElement.id.indexOf('plusone') != -1)
						iframeContainer = "plusone";		
					else if($(ev.currentTarget.parentElement).is('span'))
						iframeContainer = "facebook";
					else
						iframeContainer = "twitter";

				});
				$(this).off('mouseout').on('mouseout', function(ev){
					isOverIFrame = false;
					top.focus();
					var className = $(ev.currentTarget.parentElement).attr('class');
					$(top).off('blur', function(){
						if (isOverIFrame){
							self.trackSocial(iframeContainer);	
						}
					});
				})
			})

			// bind blur handler to the parent page which assumes focus has been passed to the iframe
			$(top).on('blur', function(){
				if (isOverIFrame)
					self.trackSocial(iframeContainer);
			});
		},

		trackSocial: function(data){
			var self = this,
				photoTitle = self.$('.caption-holder h3').text(),
				actionType = '',
				$panel=$(this.el).find('section.panel.active .caption-holder p'),
				tagID = {
					facebook: "54.58",
					twitter: "54.61",
					plusone: "54.60"
					}[data];

			if(data === 'facebook')actionType = "facebook_link";
			if(data === 'twitter')actionType = "twitter_link";
			if(data === 'plusone')actionType = "google_plus_link";

			Analytics.fire(appName,tagID , {
				'current_pagename': Analytics.currentPageName(),
				'photo_title': '',
				'action_type' : actionType
			});
		},

		/**
		 * Setups the thumb navigation for gallery
		 * @name vehicleGallery#setupThumbNav
		 * @function
		 */
		setupThumbNav: function() {
			var self = this,
				$thumbSlider = self.$('.thumbnail-slider'),
				$thumbsLi = self.$('.gallery-thumbs ul li');

			self.sliderWidth = $thumbSlider.width();
			self.thumbsWidth = $thumbsLi.width();
			self.totalThumbs = $thumbsLi.length;
			self.totalSlides = Math.ceil(self.totalThumbs / 6);
			self.totalMoves = 1;

			self.$('.gallery-thumbs').css('width', self.totalThumbs * self.thumbsWidth + 'px');

			self.checkNavs();

		},

		/**
		 * Shifts the thumbnail slider to left direction
		 * @name vehicleGallery#shiftLeft
		 * @function
		 * @param {MyEventObject} (evt)
		 */
		shiftLeft: function(evt) {
			var self = this;

			if (evt) evt.preventDefault();

			if (self.totalMoves > 1) {
				//shift slider
				//self.shiftSlider(self.sliderWidth);
				self.shiftSlider(parseInt(self.sliderWidth,10) + parseInt($('#thumbnail-nav').css('left').split('px')[0],10));

				//update position
				self.totalMoves--;
			}

			self.checkNavs();

		
			Analytics.fire(appName, '54.38', {
				'current_pagename': Analytics.currentPageName(),
				'vehicle': seriesName
			});
		},

		/**
		 * Shifts the thumbnail slider to right direction
		 * @name vehicleGallery#shiftRight
		 * @function
		 * @param {MyEventObject} (evt)
		 */
		shiftRight: function(evt) {
			var self = this;
			if (evt) evt.preventDefault();

			if (self.totalSlides > 1 && self.totalMoves != self.totalSlides) {
				//shift slider
				self.shiftSlider($('#thumbnail-nav').css('left').split('px')[0] - self.sliderWidth);

				//update position
				self.totalMoves++;
			}

			self.checkNavs();

			Analytics.fire(appName, '54.40', {
				'current_pagename': Analytics.currentPageName(),
				'vehicle': seriesName
			});
		},

		/**
		 * Animates the thumbnail slider based on shiftData and speed parameters
		 * @name vehicleGallery#shiftSlider
		 * @function
		 * @param {Number} shiftData
		 * @param {Number} speed
		 */
		shiftSlider: function(shiftData, speed) {
			var self = this;
			if (!speed) speed = 500;
			self.$thumbnailNav.animate({
				left: shiftData
			}, speed);
		},

		/**
		 * Updates the thumbnail slider based on current visible panel in preview
		 * @name vehicleGallery#updateSlider
		 * @function
		 * @param {Number} index
		 */
		updateSlider: function(index) {
			var self = this;

			index++;

			if (index === 1) {
				self.$thumbnailNav.animate({
					left: '0px'
				}, 800);

				self.totalMoves = 1;

			} else if (index === self.totalThumbs) {
				self.$thumbnailNav.animate({
					left: -(self.sliderWidth * (self.totalSlides - 1))
				}, 800);

				self.totalMoves = self.totalSlides;
				//} else if(index%6 == 1 && index > (self.totalMoves * 6)) {
			} else if (self.totalMoves < Math.ceil(index / 6)) {
				self.shiftRight();
			} else if (self.totalMoves > Math.ceil(index / 6)) {
				self.shiftLeft();
			}

			self.checkNavs();
		},

		/**
		 * Show/hide the navgation for thumbnail slider
		 * @name vehicleGallery#checkNavs
		 * @function
		 */
		checkNavs: function() {
			var self = this, duration = 100;
			if (self.totalSlides <= 1) {
				self.$('#btnLeftThumbSlider').fadeOut(duration);
				self.$('#btnRightThumbSlider').fadeOut(duration);
			}
			if (self.totalSlides > 1 && self.totalMoves == self.totalSlides) {
				self.$('#btnRightThumbSlider').fadeOut(duration);
			}
			if (self.totalMoves == 1) {
				self.$('#btnLeftThumbSlider').fadeOut(duration);
			}
			if (self.totalSlides > 1 && self.totalMoves != self.totalSlides) {
				self.$('#btnRightThumbSlider').fadeIn(duration);
			}
			if (self.totalMoves > 1) {
				self.$('#btnLeftThumbSlider').fadeIn(duration);
			}
		},

		/**
		 * @method largePhoto
		 * @name vehicleGallery#largePhoto
		 * @description Opnes the full-screen versions of a photo
		 * @function {Event} (evt)
		 */
		largePhoto: function(target) {
			var self = this,
				//$currentTarget = self.$(evt.currentTarget),
				// $currentTarget = self.$(target),
				$currentTarget = $(target.currentTarget),
				//$currentPanel = $currentTarget.parents('section.panel'),
				$currentPanel = $(self.currentPanel.el),
				title = $currentPanel.find('.gallery-caption .caption-holder .row .span10 .h3').text(),
				index=$currentPanel.index(),
				windowWidth,
				closeButtonLeft,
				openPhoto,
				image,
				tagId;
			if (_.isEmpty(title)) {
				title = 'photo' + (index+1);
			}

			if ($currentTarget.hasClass('largePhoto')) {
				target.preventDefault();
				tagId = '54.32';
				windowWidth = $window.width();
				closeButtonLeft = windowWidth;
				openPhoto = $('.gallery-panels .largePhoto');

				if ($('.panel-background-block').length > 0) {
					$('.panel-background-block').remove();
				}

				self.background = $currentPanel.data('fullscreen');

				if (self.background) {
					image = $('<img />').attr('src', self.background);

					// when the new image has loaded
					openPhoto.loading("small");
					openPhoto.find('.icon-overlay').css({
						'display': 'none'
					});

					image.imagesLoaded(function($images, $proper, $broken) {
						setTimeout(function() {
							openPhoto.loading(false);
						}, 1500);

						//var $appendDiv = $currentPanel.parent().parent('.gallery-panels');
						var $fullscreenDiv = $('<div class="container panel-background-block"><div class="panel-background"><div class="close-button-div"><a href="#" class="largePhotoClose btn btn-gray large"><i class="icon-close-large"></i></a></div><img class="larg-photo" src="" ></div></div>');

						self.$galleryPanels.after($fullscreenDiv);

						$fullscreenDiv.find('.panel-background').css({
							'display': 'none',
							'width': windowWidth
						}).fadeIn("slow");

						$('.close-button-div').css({
							'width': windowWidth
						});

						$('.close-button-div .largePhotoClose').css({
							'right': windowWidth / 2 - 465
						});

						$('.larg-photo').attr('src', self.background);
					});
				}

				Analytics.fire(appName, tagId, {
					'current_pagename': Analytics.currentPageName(),
					'photo_title': title,
					'vehicle': seriesName,
					'device_type':Analytics.deviceType
				});
			} else {
				tagId = '54.33';
				_.delay(function(){
					if (self.$allPanels.eq(self.currentPanel.index).find('.caption-holder').is(':visible')) {
						Analytics.fire(appName, tagId, {
							'current_pagename': Analytics.currentPageName(),
							'photo_title': title,
							'vehicle': seriesName,
							'device_type':Analytics.deviceType
						});
					}
				},500,'');
			}
		},

		/**
		 * @method closePhoto
		 * @name vehicleGallery#closePhoto
		 * @description Close the full-screen versions of a photo
		 * @function {Event} (evt)
		 */
		closePhoto: function(evt) {
			var self = this,
				openPhoto = $('.gallery-panels .largePhoto');

			evt.preventDefault();

			$('.panel-background-block').css({
				'display': 'none'
			}).fadeOut("slow").remove();

			openPhoto.find('.icon-overlay').css({
				'display': 'block'
			});
		},

		/**
		 * @method resize
		 * @name vehicleGallery#resize
		 * @description On resize of full-screen versions of a photo update the width
		 */
		resize: function() {
			var self = this,
				windowWidth = $window.width();

			$('.close-button-div').css({
				'width': windowWidth
			});

			$('.close-button-div .largePhotoClose').css({
				'right': windowWidth / 2 - 465
			});
		},

		fullGalleryLinkClicked: function(evt) {
			var self = this,
				$currentPanel = self.$('.gallery-panels section.panel.active'),
				title=$currentPanel.find('.gallery-caption .caption-holder .row .span15 p').text();

			Analytics.setPageName('T:' + seriesName + ':Overview');
			Analytics.fire(appName, '54.31', {
				'current_pagename': Analytics.currentPageName(),
				'photo_title': title,
				'vehicle': seriesName,
				'device_type':Analytics.deviceType
			});
		}

	});

	// Return public interface
	return VehicleGallery;

});

/**
 * @requires jquery
 */
define('toyFlyout',['rit'], function(RIT) {

	var $ = RIT.$,
		has = RIT.has,
		$window = RIT.$window,
		$body = RIT.$body;

	$.fn.flyOut = function(flyout_settings) {
		var self = this;
		//default settings
		flyout_settings = jQuery.extend({
			hook: 'rel',
			animation_speed: 'fast',
			width: 300,
			height: 'auto'
		}, flyout_settings);

		//hide flyout content divs
		var hideFlyoutContent = function() {
			$('.flyOutContent').hide();
		};

		//build flyout
		var buildFlyout = function(flyoutContent) {
			var template = '<div class="flyout_holder"><div class="flyout_tip"></div><div class="flyout_top"><div class="flyout_left"><div class="flyout_right"><div class="flyout_middle"></div></div></div></div><div class="flyout_content_container"><div class="flyout_left"><div class="flyot_right"><div class="flyout_content">' + flyoutContent + '</div></div></div></div><div class="flyout_bottom"><div class="flyout_left"><div class="flyout_right"><div class="flyout_middle"></div></div></div></div></div>';
			return template;
		};

		//hide flyout
		var hideFlyout = function() {
			var $flyoutHolder = $('.flyout_holder');

			if ($flyoutHolder.length > 0) {
				$flyoutHolder.fadeOut(flyout_settings.animation_speed).remove();
			}
		};

		//hide flyout
		$body.on('click', function(evt) {
			hideFlyout();

			var $activeFlyBtn = $body.find('.active-fly-btn');

			if ($activeFlyBtn) {
				$activeFlyBtn.removeClass('active-fly-btn');
			}
		});

/*
		$body.on('click', '.flyout_holder', function(evt) {
			//evt.stopPropagation();	// commented, to open disclaimer from flyout
		});
		*/

		//hide all flyout menu content
		hideFlyoutContent();

		//click action for flyout links
		self.on('click', function(evt) {
			var self = this,
			$activeFlyBtn = $body.find('.active-fly-btn');
			if($(this).hasClass('active-fly-btn')){
				$activeFlyBtn.removeClass('active-fly-btn');
				hideFlyout();
			}
			else{
				//evt.preventDefault(); // commented, to open disclaimer from flyout
				if ($activeFlyBtn) {
					$activeFlyBtn.removeClass('active-fly-btn');
				}

				$(evt.currentTarget).addClass('active-fly-btn');

				//hide any open menu
				hideFlyout();

				//set element and position
				var el = $(this),
					$element = el.parents('.page-content'),
					$menuWidth = flyout_settings.width,
					$containerWidth = $element.width(),
					$containerPosition = $element.offset();

				if ($(el.attr('href')).html()) {
					flyoutContent = $(el.attr('href')).html();
				} else {
					flyoutContent = $(el).data('content');
				}

				//set flyout position
				var offset = el.offset(),
					$availableWidth = ($containerWidth - offset.left) + $containerPosition.left,
					tipOffset;

				clickElPosition = $(this).position();
				offset.top = clickElPosition.top + $(this).outerHeight(true) + 10;
				offset.left = clickElPosition.left;

				if ($availableWidth < $menuWidth) {
					offset.left -= ($menuWidth - $availableWidth);
				}
				if (flyout_settings.offsetFlyout) {
					offset.left = offset.left - flyout_settings.offsetFlyout;
				}

				//build flyout menu
				var flyOutMenu = buildFlyout(flyoutContent),
					menuClass = $(flyOutMenu).attr('class');

				//set content
				$(flyOutMenu).html(flyoutContent);

				//set position of flyout when window is resize
				$window.resize(function() {
					containerEl = $('.flyout_holder').parent();
				});

				//append menu
				$element.append(flyOutMenu);

				//show flyout menu
				tipOffset = (clickElPosition.left - offset.left) + $(this).width() / 2;

				// fly-out pointer setting for espanol TOYRIT-4775
				if( $('span',this).text() == 'Ver submodelos' ) tipOffset = tipOffset - 15;

				if (flyout_settings.offsetTip) {
					tipOffset = tipOffset - flyout_settings.offsetFlyout;
				}

				$('.' + menuClass).find('.flyout_tip').css('left', tipOffset);

				$('.' + menuClass).css({
					'width': flyout_settings.width + 'px',
					'height': flyout_settings.height + 'px'
				}).offset(offset).fadeIn(flyout_settings.animation_speed);

				//change flyout placement. By default it is bottom we have to add tag in anchor data-placement="top"
				var flyoutPosition = $(el).data('placement');

				if ($(el).data('placement') == "top") {
					$('.flyout_holder').addClass('top');
					bottpos = offset.top - $(".flyout_holder").height();
					$('.' + menuClass).css('top', bottpos + 'px');
					$('.' + menuClass).find('.flyout_tip').addClass('flyout_tip_bottom');
					$('.' + menuClass).find('.flyout_tip').css('top', $(".flyout_holder").height());
				}
			}
			
			return false;
		});
	};
});

/**
 * @requires rit
 */
define('app/views/vehicle-models',['rit', 'util/view', 'toyFlyout', 'util/analytics'], function(RIT, View, ToyFlyout, Analytics) {

	/**
	 * @version {version}
	 */
	var $ = RIT.$,
		_ = RIT._,
		has = RIT.has,
		$body = RIT.$body,
		// Desktop events
		events = {
			'click .trim_close_btn a': 'closeTrim',
			'click a.download-brochure': 'downloadBro',
			'click .grades div a.btn.btn-pill': 'buildBtn',
			'click .models-actions a:first-child': 'compareClicked',
			'click .models-actions a:last-child': 'accessoriesClicked',
			'click .model-trims a': 'flyOutLnkClicked'
		},
		appName = 'mlp',
		vehicleName = RIT.bodyData['seriesName'];

	if (has.touch) {
		events = {
			'touchstart .trim_close_btn a': 'closeTrim',
			'touchstart a.download-brochure': 'downloadBro',
			'touchstart .grades div a.btn.btn-pill': 'buildBtn',
			'touchstart .models-actions a:first-child': 'compareClicked',
			'touchstart .models-actions a:last-child': 'accessoriesClicked',
			'touchstart .model-trims a': 'flyOutLnkClicked'
		};
	}

	/**
	 * @Class VehicleModels
	 */
	var VehicleModels = View.extend({
		
		events: events,

		/**
		 * @Default initialize function
		 * @function
		 */
		initialize: function() {
			var self = this;
			
			self.$("a[rel^='flyOut']").flyOut({
				animation_speed: 'fast',
				width: 730,
				offsetTip: 19,
				offsetFlyout: 40
			});

			$('.grades div p a.btn.trims').on((has.touch) ? 'touchstart' : 'click', function(evt) {
				var model_trim = $(evt.currentTarget).parent().parent().find('h1').text();
				$('.wrapper').off('touchstart', self.closeTrim);
				$('.wrapper').on('touchstart', self.closeTrimSet);
				//Analytics
				Analytics.fire(appName, '54.57', {
					'current_pagename': Analytics.currentPageName(),
					'vehicle': vehicleName,
					'model_trim': RIT.bodyData['seriesName']+'_'+model_trim,
					'device_type':Analytics.deviceType
				});
			});
			_.bindAll(self, 'closeTrimSet', 'closeTrim');
		},

		/**
		 * @Default render function
		 * @function
		 */
		render: function() {

		},

		closeTrimSet: function(evt) {
			var self = this;
			var str = ($(evt.target).attr('class'))
			if(str.indexOf('arrow-down') != -1)
			{
				return;
			}
			else
			{
				self.closeTrim(evt);
			}

		},

		/**
		 * closeTrim function will close flyout window.
		 * @name VehicleModels#closeTrim
		 * @function
		 * @param {Event} (evt) click event will close flyout window.
		 */
		closeTrim: function(evt) {
			var self = this;
			var $activeFlyBtn;

			evt.preventDefault();

			$('.flyout_holder').hide();

			$activeFlyBtn = $body.find('.active-fly-btn');

			if ($activeFlyBtn) {
				$activeFlyBtn.removeClass('active-fly-btn');
			}
			$('.wrapper').off('touchstart', self.closeTrim);
		},

		downloadBro: function(evt) {
			Analytics.fire(appName, '54.54', {
				'current_pagename': Analytics.currentPageName(),
				'vehicle': vehicleName,
				'device_type':Analytics.deviceType
			});
		},

		buildBtn: function(evt) {
			var model_trim = $(evt.currentTarget).parent().find('h1').text();

			Analytics.fire(appName, '54.3', {
				'current_pagename': Analytics.currentPageName(),
				'vehicle': vehicleName,
				'model_trim': vehicleName+"_"+model_trim,
				'device_type':Analytics.deviceType
			});
		},

		compareClicked: function(evt) {
			Analytics.fire(appName, '54.53', {
				'current_pagename': Analytics.currentPageName(),
				'vehicle': vehicleName,
				'device_type':Analytics.deviceType
			});
		},

		accessoriesClicked: function(evt) {
			Analytics.fire(appName, '54.56', {
				'current_pagename': Analytics.currentPageName(),
				'vehicle': vehicleName,
				'device_type':Analytics.deviceType
			});
		},

		flyOutLnkClicked: function(evt) {
			var self = this,
				lnkName = $(evt.target).text().toLowerCase().replace(" ", ""),
				$currentTarget = $(evt.currentTarget),
				trimEngine,
				tagId;

			if (lnkName === 'fullspecs' || lnkName === 'verespecs') {
				trimEngine = $currentTarget.parent().prev().prev().text();
				tagId = '54.55';
			} else if (lnkName == 'build' || lnkName == 'personaliza') {
				trimEngine = $currentTarget.parent().prev().prev().prev().text();
				tagId = '54.4';
			}

			Analytics.fire(appName, tagId, {
				'current_pagename': Analytics.currentPageName(),
				'vehicle': vehicleName,
				'trim_engine': (vehicleName+'_'+trimEngine),
				'device_type':Analytics.deviceType
			});
		}
	});

	// Return public interface
	return VehicleModels;

});

/**
 * @requires rit
 */
define('app/views/hotspots',['rit', 'util/view'], function(RIT, View) {

	/**
	 * HotSpots is a view for hotspots on images of vehicle landing page.
	 *
	 * @exports views/HotSpots
	 * @version {version}
	 */
	var $ = RIT.$,
		_ = RIT._,
		has = RIT.has,
		deviceType = Modernizr.touch? "touch" : "desktop",
		hotSpotVisible=false,
		previousContent='';
		events = {
			'mouseover .hotspot': 'previewHotSpot',
			'mouseout .hotspot': 'hideHotspot',
		};

	/**
	 * @class HotSpots
	 * @extends util/view
	 */
	var HotSpots = View.extend({
		
		events: events,

		/**
		 * Initialize function
		 * @function
		 */
		initialize: function() {
			if($(this.el).context.className == 'page-content dark'){
				this.render();

				if(has.touch) {
					this.events = {
						'touchstart .hotspot': 'previewHotSpot'
					};
				}else{
					this.events = {
		                'click .hotspot': 'handleClick'
		            }
				}
			}
		},

		/**
		 * @Default render function for HotSpots
		 * @function
		 */
		render: function() {
			var self = this;

			// Builds the hotspots and sets position based on data-attributes provided in anchor tags.
			_.each(self.$('.hotspots-group').children(), function(hotspots) {
				var $hotspots = self.$(hotspots),
					hotSpotData = $hotspots.data();

				$hotspots.css({
					'left': hotSpotData.left,
					'top': hotSpotData.top
				});
			});
		},

		/**
		 * Sets the position of hotspot preview and show the preview.
		 * @name HotSpots#showHotspot
		 * @function
		 * @param {Object} (data)
		 */
		showHotspot: function(data) {
			var self = this,
				$preview = self.$('.hotspot-preview'),
				leftPos,
				topPos;
			//setting hotspot preview position
			if (data.direction === "top") {
				leftPos = data.left - ($preview.width() / 2 - 12);
				topPos = data.top - ($preview.width() + 5);

			} else if (data.direction === "bottom") {
				leftPos = data.left - ($preview.width() / 2 - 12);
				topPos = data.top + 12;

			} else if (data.direction === "left") {
				leftPos = data.left - ($preview.width() - 5);
				topPos = data.top - ($preview.height() / 2 - 10);

			} else if (data.direction === "right") {
				leftPos = data.left + 14;
				topPos = data.top - ($preview.height() / 2 - 8);
			}

			//shot hotspot preview
			$preview.css({
				'left': Math.floor(leftPos),
				'top': Math.floor(topPos)
			}).fadeIn(200);
			hotSpotVisible=true;
		},

		/**
		 * Hides the hotspot preview.
		 * @name HotSpots#hideHotspot
		 * @function
		 */
		hideHotspot: function() {
			this.$('.hotspot-preview').fadeOut(200).remove();
			hotSpotVisible=false;
		},

		/**
		 * Click event handler for hotspots.
		 * @name HotSpots#handleClick
		 * @function
		 */
		handleClick: function(evt) {
			evt.preventDefault();
		},

		/**
		 * Builds the preview for hovered hotspot.
		 * @name HotSpots#previewHotSpot
		 * @function
		 * @param {MyEventObject} (evt)
		 */
		previewHotSpot: function(evt) {
			(has.touch)?evt.preventDefault():0;
			var self = this,
				element = evt.currentTarget,
				data = self.$(element).data(),
				hotSpot = '<div class="hotspot-preview pos_' + data.direction + '"><img src="' + data.image + '"/></div>';

			self.$(element).closest('.page-content').append(hotSpot);
			if(deviceType=='touch'){
				if(previousContent != '' && previousContent!=data.top){
					self.hideHotspot(data);
					_.delay(function(){
						self.$(element).closest('.page-content').append(hotSpot);
						self.showHotspot(data);	
					},300);
				}else{
					if(hotSpotVisible){
						self.hideHotspot(data);
					}else{
						self.showHotspot(data);
					}
				}
				previousContent = data.top;
			}
			else{
				self.showHotspot(data);
			}
			evt.preventDefault();
		}
	});

	// Return public interface
	return HotSpots;

});

/**
 * @requires rit
 */
define('app/views/awards-ratings',['rit', 'util/view', 'util/analytics'], function(RIT, View, Analytics) {

	/**
	 * @version {version}
	 */
	var $ = RIT.$,
		_ = RIT._,
		has = RIT.has,
		$document = RIT.$document,
		$body = RIT.$body,
		// desktop events
		events = {
			'click a.flyout-indicator': 'handleAwardsFlyout',
			'click .awards-flyout': 'handleFlyoutClick',
			'click .awards-flyout a.btn': 'closeFlyOut',
			'click .view-all-awards': 'viewAllAwards',
			'click #kbbReviewsExternal': 'kbbReviewExternalClick',
			'click #edmundsReviewsExternal': 'edmundsReviewExternalClick',
			'click .page-content .actions': 'viewAllAwards'
		},
		// used for analytics
		appName = 'mlp',
		seriesName = RIT.bodyData['seriesName'];

	if (has.touch) {
		events = {
			'touchstart a.flyout-indicator': 'handleAwardsFlyout',
			'touchstart .awards-flyout': 'handleFlyoutClick',
			'touchstart .awards-flyout a.btn': 'closeFlyOut',
			'touchstart .view-all-awards': 'viewAllAwards',
			'touchstart #kbbReviewsExternal': 'kbbReviewExternalClick',
			'touchstart #edmundsReviewsExternal': 'edmundsReviewExternalClick',
			'touchstart .page-content .actions': 'viewAllAwards'
		};
	}

	/**
	 * @Class AwardsRatings
	 */
	var AwardsRatings = View.extend({
		events: events,

		/**
		 * @Default initialize function
		 * @function
		 */
		initialize: function() {
			var self = this,
				$el = self.$el;

			_.bindAll(self, 'render', 'closeFlyOut'); //newer version of underscore.js >= 1.4.4 requires function name to be passed in

			$document.on((has.touch) ? 'touchstart' : 'click', self.closeFlyOut);

			self.model.on('change:kellyBlueReview', self.renderKellyBlueReview, self);
			self.model.on('change:edmundsReview', self.renderEdmundsReview, self);

			//fetch reviews
			self.model.set({
				kellyBlueData: 'kellyBlue',
				edmundsData: 'edmunds'
			});

			self.render();
		},

		/**
		 * @Default render function
		 * @function
		 */
		render: function() {
			var self = this,
				$el = self.$el;
				bg = $el.data('background');

			// set the background image
			if (bg) {
				$el.css('background-image', 'url(' + bg + ')');
			}
			
			return self;
		},

		/**
		 * @handles click for awards description flyout
		 * @param {MyEventObject} (evt)
		 * @function
		 */
		handleAwardsFlyout: function(evt) {
			var self = this,
				$currentTarget = self.$(evt.currentTarget),
				flyout = $currentTarget.attr('href');

			evt.preventDefault();

			$currentTarget.toggleClass('active');
			self.$(flyout).fadeToggle(300);

			//Analytics.
			Analytics.fire(appName, '54.5', {
				'current_pagename': Analytics.currentPageName(),
				'vehicle': seriesName,
				'device_type':Analytics.deviceType
			});

			return false;
		},

		/**
		 * @prevent click for awards flyout
		 * @function
		 */
		handleFlyoutClick: function(evt) {
			if(!$(evt.target).is("a")){
				return false;
			}
		},

		/**
		 * @close the awards flyout and update flyout indicator button state
		 * @function
		 */
		closeFlyOut: function() {
			var self = this;

			self.$('.awards-flyout').fadeOut(300);
			self.$('.flyout-indicator').removeClass('active');
		},

		/**
		 * @renders the Kelly Blue Brook Reviews Data
		 * @function
		 */
		renderKellyBlueReview: function() {
			var self = this,
				$data = self.model.get('kellyBlueReview'),
				$reviewUrl = 'http://www.kbb.com/' + self.model.get('makeName').toLowerCase() + '/' + self.model.get('tmsModelName').toLowerCase() + '/' + self.model.get('modelYear') + '-' + self.model.get('makeName') + '-' + self.model.get('tmsModelName') + '/l-consumer_reviews/';

			if ($data !== 'Error!') {

				//overwritting c and v for italicize.
                ($data.channel.title.indexOf("Prius c") >= 0)?$data.channel.title = $data.channel.title.replace(" c"," <i>c</i>"):0;
                ($data.channel.title.indexOf("Prius v") >= 0)?$data.channel.title = $data.channel.title.replace(" v"," <i>v</i>"):0;


				self.$('#kellyBlueReview h4').html($data.channel.title + ' Models');
				self.$('#kbbTotalRatings').html($data.channel.numberofratings);
				self.$('#kbbOvarallRating').html($data.channel.item[0].description);
				self.$('#baseKbbReviewYear').html($data.channel.title.split(' ')[0]);

				//set progress meter
				self.$('.kbb-progress-bar').css('width', $data.channel.item[0].description * 10 + '%');
			} else {
				//show error message
				self.$('#kellyBlueReview div.success').hide();
				self.$('#kellyBlueReview div.error').show();
			}
			//set review url
			//self.$('#kbbReviewsExternal').attr('href', $reviewUrl);
		},

		/**
		 * @renders the Edmunds.com Reviews Data
		 * @function
		 */
		renderEdmundsReview: function() {
			var self = this,
				$data = self.model.get('edmundsReview'),
				$reviewUrl = 'http://www.edmunds.com/' + self.model.get('makeName').toLowerCase() + '/' + self.model.get('tmsModelCode').toLowerCase() + '/' + self.model.get('modelYear') + '/consumer-reviews.html?sorting=OVERALL_RATINGS';

			if ($data !== 'Error!') {
				self.$('#edmundsOvarallRating').html($data.averageRating);
				self.$('#edmundsTotalRatings').html($data.numberOfRatings);
				
				var modelName = self.model.get('tmsModelName');
				//overwritting c and v for italicize.
				(modelName.indexOf("Prius c") >= 0)?modelName = modelName.replace(" c"," <i>c</i>"):0;

				str = $data.make.toLowerCase().replace(/\b[a-z]/g, function(letter) {
    					return letter.toUpperCase();	
    				});

				self.$('#carModelInfo').html($data.year + ' ' + str + ' ' + self.model.get('tmsModelName') + ' Models');
				self.$('#baseEdmundReviewYear').html($data.year);

				//set ratings
				self.$('.edmunds-ratings-bar').css('width', ($data.averageRating * 20) + 3 + '%');
				self.$('.edmunds-rating-value span').html($data.averageRating);
			} else {
				//show error message
				self.$('#edmundsReview div.success').hide();								
				self.$('#edmundsReview div.error').show();
			}

			//set full review url
			//self.$('#edmundsReviewsExternal').attr('href', $reviewUrl);
		},
		
		/**
		 * Click event handler for view all awards link.
		 * @name AwardsRatings#viewAllAwards
		 * @function
		 * @param {MyEventObject} (evt)
		 */
		viewAllAwards: function(evt) {
			var tagId;

			switch ($(evt.target).prop("tagName").toLowerCase()) {
			case 'a':
				tagId = '54.9';
				break;
			case 'span':
				tagId = '54.8';
				break;
			}

			Analytics.fire(appName, tagId, {
				'current_pagename': Analytics.currentPageName(),
				'vehicle': seriesName,
				'device_type':Analytics.deviceType
			});
		},

		/**
		 * Click event handler for view KBB logo click.
		 * @name AwardsRatings#kbbReviewExternalClick
		 * @function
		 * @param {MyEventObject} (evt)
		 */
		kbbReviewExternalClick: function() {
			Analytics.fire(appName, '54.7', {
				'current_pagename': Analytics.currentPageName(),
				'vehicle': seriesName,
				'device_type':Analytics.deviceType
			});
		},

		/**
		 * Click event handler for view Edmunds logo click.
		 * @name AwardsRatings#edmundsReviewExternalClick
		 * @function
		 * @param {MyEventObject} (evt)
		 */
		edmundsReviewExternalClick: function() {
			Analytics.fire(appName, '54.6', {
				'current_pagename': Analytics.currentPageName(),
				'vehicle': seriesName,
				'device_type':Analytics.deviceType
			});
		}
	});

	// Return public interface
	return AwardsRatings;

});

/**
 * @requires rit
 */
define('app/views/build-your-car',['rit', 'util/view', 'util/analytics'], function(RIT, View, Analytics) {

	/**
	 * @version {version}
	 */
	var $ = RIT.$,
		$body = $('body');

	/**
	 * @Class vehicleModels
	 */
	var BuildYourCar = View.extend({

		events: {
			'click .cta-lnk a':'ctaLink'
		},
		/**
		 * @Default initialize function
		 * @function
		 */
		initialize: function() {
			this.render();
		},

		/**
		 * @Default render function
		 * @function
		 */
		render: function() {
			var self = this,
				$el = self.$el,
				bg = $el.data('background');

			//set model title
			//self.$('.page-header h2').html('Build Your ' + $body.data('seriesName'));

			// set the background image
			if (bg) {
				$el.css('background-image', 'url(' + bg + ')');
			}
		},	
		ctaLink: function(evt) {
			if($(evt.currentTarget).hasClass('g-plus')) {
				tagId = '54.139';
			} else {
				tagId = '54.75';
			}
			
			Analytics.fire('mlp', tagId, {
				'current_pagename': Analytics.currentPageName(),
				'vehicle': $body.data('seriesName'),
				'build_tile_type':'First Time User',
				'device_type':Analytics.deviceType
			});
		}
	});

	// Return public interface
	return BuildYourCar;

});

// Chosen, a Select Box Enhancer for jQuery and Protoype
// by Patrick Filler for Harvest, http://getharvest.com
// 
// Version 0.9.8
// Full source at https://github.com/harvesthq/chosen
// Copyright (c) 2011 Harvest http://getharvest.com

// MIT License, https://github.com/harvesthq/chosen/blob/master/LICENSE.md
// This file is generated by `cake build`, do not edit it by hand.
(function() {
  var SelectParser;

  SelectParser = (function() {

    function SelectParser() {
      this.options_index = 0;
      this.parsed = [];
    }

    SelectParser.prototype.add_node = function(child) {
      if (child.nodeName.toUpperCase() === "OPTGROUP") {
        return this.add_group(child);
      } else {
        return this.add_option(child);
      }
    };

    SelectParser.prototype.add_group = function(group) {
      var group_position, option, _i, _len, _ref, _results;
      group_position = this.parsed.length;
      this.parsed.push({
        array_index: group_position,
        group: true,
        label: group.label,
        children: 0,
        disabled: group.disabled
      });
      _ref = group.childNodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        option = _ref[_i];
        _results.push(this.add_option(option, group_position, group.disabled));
      }
      return _results;
    };

    SelectParser.prototype.add_option = function(option, group_position, group_disabled) {
      if (option.nodeName.toUpperCase() === "OPTION") {
        if (option.text !== "") {
          if (group_position != null) this.parsed[group_position].children += 1;
          this.parsed.push({
            array_index: this.parsed.length,
            options_index: this.options_index,
            value: option.value,
            text: option.text,
            html: option.innerHTML,
            selected: option.selected,
            disabled: group_disabled === true ? group_disabled : option.disabled,
            group_array_index: group_position,
            classes: option.className,
            style: option.style.cssText
          });
        } else {
          this.parsed.push({
            array_index: this.parsed.length,
            options_index: this.options_index,
            empty: true
          });
        }
        return this.options_index += 1;
      }
    };

    return SelectParser;

  })();

  SelectParser.select_to_array = function(select) {
    var child, parser, _i, _len, _ref;
    parser = new SelectParser();
    _ref = select.childNodes;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      parser.add_node(child);
    }
    return parser.parsed;
  };

  this.SelectParser = SelectParser;

}).call(this);

/*
Chosen source: generate output using 'cake build'
Copyright (c) 2011 by Harvest
*/

(function() {
  var AbstractChosen, root;

  root = this;

  AbstractChosen = (function() {

    function AbstractChosen(form_field, options) {
      this.form_field = form_field;
      this.options = options != null ? options : {};
      this.set_default_values();
      this.is_multiple = this.form_field.multiple;
      this.set_default_text();
      this.setup();
      this.set_up_html();
      this.register_observers();
      this.finish_setup();
    }

    AbstractChosen.prototype.set_default_values = function() {
      var _this = this;
      this.click_test_action = function(evt) {
        return _this.test_active_click(evt);
      };
      this.activate_action = function(evt) {
        return _this.activate_field(evt);
      };
      this.active_field = false;
      this.mouse_on_container = false;
      this.results_showing = false;
      this.result_highlighted = null;
      this.result_single_selected = null;
      this.allow_single_deselect = (this.options.allow_single_deselect != null) && (this.form_field.options[0] != null) && this.form_field.options[0].text === "" ? this.options.allow_single_deselect : false;
      this.disable_search_threshold = this.options.disable_search_threshold || 0;
      this.disable_search = this.options.disable_search || true;
      this.search_contains = this.options.search_contains || false;
      this.choices = 0;
      this.single_backstroke_delete = this.options.single_backstroke_delete || false;
      return this.max_selected_options = this.options.max_selected_options || Infinity;
    };

    AbstractChosen.prototype.set_default_text = function() {
      if (this.form_field.getAttribute("data-placeholder")) {
        this.default_text = this.form_field.getAttribute("data-placeholder");
      } else if (this.is_multiple) {
        this.default_text = this.options.placeholder_text_multiple || this.options.placeholder_text || "Select Some Options";
      } else {
        this.default_text = this.options.placeholder_text_single || this.options.placeholder_text || "Select an Option";
      }
      return this.results_none_found = this.form_field.getAttribute("data-no_results_text") || this.options.no_results_text || "No results match";
    };

    AbstractChosen.prototype.mouse_enter = function() {
      return this.mouse_on_container = true;
    };

    AbstractChosen.prototype.mouse_leave = function() {
      return this.mouse_on_container = false;
    };

    AbstractChosen.prototype.input_focus = function(evt) {
      var _this = this;
      if (!this.active_field) {
        return setTimeout((function() {
          return _this.container_mousedown();
        }), 50);
      }
    };

    AbstractChosen.prototype.input_blur = function(evt) {
      var _this = this;
      if (!this.mouse_on_container) {
        this.active_field = false;
        return setTimeout((function() {
          return _this.blur_test();
        }), 100);
      }
    };

    AbstractChosen.prototype.result_add_option = function(option) {
      var classes, style;
      if (!option.disabled) {
        option.dom_id = this.container_id + "_o_" + option.array_index;
        classes = option.selected && this.is_multiple ? [] : ["active-result"];
        if (option.selected) classes.push("result-selected");
        if (option.group_array_index != null) classes.push("group-option");
        if (option.classes !== "") classes.push(option.classes);
        style = option.style.cssText !== "" ? " style=\"" + option.style + "\"" : "";
        return '<li id="' + option.dom_id + '" class="' + classes.join(' ') + '"' + style + '>' + option.html + '</li>';
      } else {
        return "";
      }
    };

    AbstractChosen.prototype.results_update_field = function() {
      if (!this.is_multiple) this.results_reset_cleanup();
      this.result_clear_highlight();
      this.result_single_selected = null;
      return this.results_build();
    };

    AbstractChosen.prototype.results_toggle = function() {
      if (this.results_showing) {
        return this.results_hide();
      } else {
        return this.results_show();
      }
    };

    AbstractChosen.prototype.results_search = function(evt) {
      if (this.results_showing) {
        return this.winnow_results();
      } else {
        return this.results_show();
      }
    };

    AbstractChosen.prototype.keyup_checker = function(evt) {
      var stroke, _ref;
      stroke = (_ref = evt.which) != null ? _ref : evt.keyCode;
      this.search_field_scale();
      switch (stroke) {
        case 8:
          if (this.is_multiple && this.backstroke_length < 1 && this.choices > 0) {
            return this.keydown_backstroke();
          } else if (!this.pending_backstroke) {
            this.result_clear_highlight();
            return this.results_search();
          }
          break;
        case 13:
          evt.preventDefault();
          if (this.results_showing) return this.result_select(evt);
          break;
        case 27:
          if (this.results_showing) this.results_hide();
          return true;
        case 9:
        case 38:
        case 40:
        case 16:
        case 91:
        case 17:
          break;
        default:
          return this.results_search();
      }
    };

    AbstractChosen.prototype.generate_field_id = function() {
      var new_id;
      new_id = this.generate_random_id();
      this.form_field.id = new_id;
      return new_id;
    };

    AbstractChosen.prototype.generate_random_char = function() {
      var chars, newchar, rand;
      chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      rand = Math.floor(Math.random() * chars.length);
      return newchar = chars.substring(rand, rand + 1);
    };

    return AbstractChosen;

  })();

  root.AbstractChosen = AbstractChosen;

}).call(this);

/*
Chosen source: generate output using 'cake build'
Copyright (c) 2011 by Harvest
*/

(function() {
  var $, Chosen, get_side_border_padding, root,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  root = this;

  $ = jQuery;

  $.fn.extend({
    chosen: function(options) {
      // if ($.browser.msie && ($.browser.version === "6.0" || ($.browser.version === "7.0" && document.documentMode === 7))) {
      //   return this;
      // }
      return this.each(function(input_field) {
        var $this;
        $this = $(this);
        if (!$this.hasClass("chzn-done")) {
          return $this.data('chosen', new Chosen(this, options));
        }
      });
    }
  });

  Chosen = (function(_super) {

    __extends(Chosen, _super);

    function Chosen() {
      Chosen.__super__.constructor.apply(this, arguments);
    }

    Chosen.prototype.setup = function() {
      this.form_field_jq = $(this.form_field);
      this.current_value = this.form_field_jq.val();
      return this.is_rtl = this.form_field_jq.hasClass("chzn-rtl");
    };

    Chosen.prototype.finish_setup = function() {
      //Update Z-Indexes
      var highestZIndex = 1000,
          chosenContainers = $('.chzn-container'),
          chosenContainersCount = chosenContainers.length;
     
      chosenContainers.each(function(index, el){
        //console.log('index, el', index, el);
        $(el).css({'z-Index': highestZIndex+(chosenContainersCount-index)});
      });
      return this.form_field_jq.addClass("chzn-done");
    };

    Chosen.prototype.set_up_html = function() {
      var container_div, dd_top, dd_width, sf_width;
      this.container_id = this.form_field.id.length ? this.form_field.id.replace(/[^\w]/g, '_') : this.generate_field_id();
      this.container_id += "_chzn";
      this.f_width = this.form_field_jq.outerWidth();
      container_div = $("<div />", {
        id: this.container_id,
        "class": "chzn-container" + (this.is_rtl ? ' chzn-rtl' : ''),
        style: 'width: ' + this.f_width + 'px;'
      });
      if (this.is_multiple) {
        container_div.html('<ul class="chzn-choices"><li class="search-field"><input type="text" value="' + this.default_text + '" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chzn-drop" style="left:-9000px;"><ul class="chzn-results"></ul></div>');
      } else {
        container_div.html('<a href="javascript:void(0)" class="chzn-single chzn-default"><span>' + this.default_text + '</span><div><b></b></div></a><div class="chzn-drop" style="left:-9000px;"><div class="chzn-search"><input type="text" autocomplete="off" /></div><ul class="chzn-results"></ul></div>');
      }
      this.form_field_jq.hide().after(container_div);
      this.container = $('#' + this.container_id);
      this.container.addClass("chzn-container-" + (this.is_multiple ? "multi" : "single"));
      this.dropdown = this.container.find('div.chzn-drop').first();
      dd_top = this.container.height();
      dd_width = this.f_width - get_side_border_padding(this.dropdown);
      this.dropdown.css({
        "width": dd_width + "px",
        "top": dd_top + "px"
      });
      this.search_field = this.container.find('input').first();
      this.search_results = this.container.find('ul.chzn-results').first();
      this.search_field_scale();
      this.search_no_results = this.container.find('li.no-results').first();
      if (this.is_multiple) {
        this.search_choices = this.container.find('ul.chzn-choices').first();
        this.search_container = this.container.find('li.search-field').first();
      } else {
        this.search_container = this.container.find('div.chzn-search').first();
        this.selected_item = this.container.find('.chzn-single').first();
        sf_width = dd_width - get_side_border_padding(this.search_container) - get_side_border_padding(this.search_field);
        this.search_field.css({
          "width": sf_width + "px"
        });
      }
      this.results_build();
      this.set_tab_index();
      return this.form_field_jq.trigger("liszt:ready", {
        chosen: this
      });
    };

    Chosen.prototype.register_observers = function() {
      var _this = this;
      this.container.mousedown(function(evt) {
        return _this.container_mousedown(evt);
      });
      this.container.mouseup(function(evt) {
        return _this.container_mouseup(evt);
      });
      this.container.mouseenter(function(evt) {
        return _this.mouse_enter(evt);
      });
      this.container.mouseleave(function(evt) {
        return _this.mouse_leave(evt);
      });
      this.search_results.mouseup(function(evt) {
        return _this.search_results_mouseup(evt);
      });
      this.search_results.mouseover(function(evt) {
        return _this.search_results_mouseover(evt);
      });
      this.search_results.mouseout(function(evt) {
        return _this.search_results_mouseout(evt);
      });
      this.form_field_jq.bind("liszt:updated", function(evt) {
        return _this.results_update_field(evt);
      });
      this.form_field_jq.bind("liszt:activate", function(evt) {
        return _this.activate_field(evt);
      });
      this.form_field_jq.bind("liszt:open", function(evt) {
        return _this.container_mousedown(evt);
      });
      this.search_field.blur(function(evt) {
        return _this.input_blur(evt);
      });
      this.search_field.keyup(function(evt) {
        return _this.keyup_checker(evt);
      });
      this.search_field.keydown(function(evt) {
        return _this.keydown_checker(evt);
      });
      if (this.is_multiple) {
        this.search_choices.click(function(evt) {
          return _this.choices_click(evt);
        });
        return this.search_field.focus(function(evt) {
          return _this.input_focus(evt);
        });
      } else {
        return this.container.click(function(evt) {
          return evt.preventDefault();
        });
      }
    };

    Chosen.prototype.search_field_disabled = function() {
      this.is_disabled = this.form_field_jq[0].disabled;
      if (this.is_disabled) {
        this.container.addClass('chzn-disabled');
        this.search_field[0].disabled = true;
        if (!this.is_multiple) {
          this.selected_item.unbind("focus", this.activate_action);
        }
        return this.close_field();
      } else {
        this.container.removeClass('chzn-disabled');
        this.search_field[0].disabled = false;
        if (!this.is_multiple) {
          return this.selected_item.bind("focus", this.activate_action);
        }
      }
    };

    Chosen.prototype.container_mousedown = function(evt) {
      var target_closelink;
      if (!this.is_disabled) {
        target_closelink = evt != null ? ($(evt.target)).hasClass("search-choice-close") : false;
        if (evt && evt.type === "mousedown" && !this.results_showing) {
          evt.stopPropagation();
        }
        if (!this.pending_destroy_click && !target_closelink) {
          if (!this.active_field) {
            if (this.is_multiple) this.search_field.val("");
            $(document).click(this.click_test_action);
            this.results_show();
          } else if (!this.is_multiple && evt && (($(evt.target)[0] === this.selected_item[0]) || $(evt.target).parents("a.chzn-single").length)) {
            evt.preventDefault();
            this.results_toggle();
          }
          return this.activate_field();
        } else {
          return this.pending_destroy_click = false;
        }
      }
    };

    Chosen.prototype.container_mouseup = function(evt) {
      if (evt.target.nodeName === "ABBR" && !this.is_disabled) {
        return this.results_reset(evt);
      }
    };

    Chosen.prototype.blur_test = function(evt) {
      if (!this.active_field && this.container.hasClass("chzn-container-active")) {
        return this.close_field();
      }
    };

    Chosen.prototype.close_field = function() {
      $(document).unbind("click", this.click_test_action);
      if (!this.is_multiple) {
        this.selected_item.attr("tabindex", this.search_field.attr("tabindex"));
        this.search_field.attr("tabindex", -1);
      }
      this.active_field = false;
      this.results_hide();
      this.container.removeClass("chzn-container-active");
      this.winnow_results_clear();
      this.clear_backstroke();
      this.show_search_field_default();
      return this.search_field_scale();
    };

    Chosen.prototype.activate_field = function() {
      if (!this.is_multiple && !this.active_field) {
        this.search_field.attr("tabindex", this.selected_item.attr("tabindex"));
        this.selected_item.attr("tabindex", -1);
      }
      this.container.addClass("chzn-container-active");
      this.active_field = true;
      this.search_field.val(this.search_field.val());
      if (!this.options.disable_search) this.search_field.focus();
      return this.search_field;
    };

    Chosen.prototype.test_active_click = function(evt) {
      if ($(evt.target).parents('#' + this.container_id).length) {
        return this.active_field = true;
      } else {
        return this.close_field();
      }
    };

    Chosen.prototype.results_build = function() {
      var content, data, _i, _len, _ref;
      this.parsing = true;
      this.results_data = root.SelectParser.select_to_array(this.form_field);
      if (this.is_multiple && this.choices > 0) {
        this.search_choices.find("li.search-choice").remove();
        this.choices = 0;
      } else if (!this.is_multiple) {
        this.selected_item.addClass("chzn-default").find("span").text(this.default_text);
        if (this.disable_search || this.form_field.options.length <= this.disable_search_threshold) {
          this.container.addClass("chzn-container-single-nosearch");
        } else {
          this.container.removeClass("chzn-container-single-nosearch");
        }
      }
      content = '';
      _ref = this.results_data;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        data = _ref[_i];
        if (data.group) {
          content += this.result_add_group(data);
        } else if (!data.empty) {
          content += this.result_add_option(data);
          if (data.selected && this.is_multiple) {
            this.choice_build(data);
          } else if (data.selected && !this.is_multiple) {
            this.selected_item.removeClass("chzn-default").find("span").text(data.text);
            if (this.allow_single_deselect) this.single_deselect_control_build();
          }
        }
      }
      this.search_field_disabled();
      this.show_search_field_default();
      this.search_field_scale();
      this.search_results.html(content);
      return this.parsing = false;
    };

    Chosen.prototype.result_add_group = function(group) {
      if (!group.disabled) {
        group.dom_id = this.container_id + "_g_" + group.array_index;
        return '<li id="' + group.dom_id + '" class="group-result">' + $("<div />").text(group.label).html() + '</li>';
      } else {
        return "";
      }
    };

    Chosen.prototype.result_do_highlight = function(el) {
      var high_bottom, high_top, maxHeight, visible_bottom, visible_top;
      if (el.length) {
        this.result_clear_highlight();
        this.result_highlight = el;
        this.result_highlight.addClass("highlighted");
        maxHeight = parseInt(this.search_results.css("maxHeight"), 10);
        visible_top = this.search_results.scrollTop();
        visible_bottom = maxHeight + visible_top;
        high_top = this.result_highlight.position().top + this.search_results.scrollTop();
        high_bottom = high_top + this.result_highlight.outerHeight();
        if (high_bottom >= visible_bottom) {
          return this.search_results.scrollTop((high_bottom - maxHeight) > 0 ? high_bottom - maxHeight : 0);
        } else if (high_top < visible_top) {
          return this.search_results.scrollTop(high_top);
        }
      }
    };

    Chosen.prototype.result_clear_highlight = function() {
      if (this.result_highlight) this.result_highlight.removeClass("highlighted");
      return this.result_highlight = null;
    };

    Chosen.prototype.results_show = function() {
      var dd_top;
      if (!this.is_multiple) {
        this.selected_item.addClass("chzn-single-with-drop");
        if (this.result_single_selected) {
          this.result_do_highlight(this.result_single_selected);
        }
      } else if (this.max_selected_options <= this.choices) {
        this.form_field_jq.trigger("liszt:maxselected", {
          chosen: this
        });
        return false;
      }
      dd_top = this.is_multiple ? this.container.height() : this.container.height() - 1;
      this.form_field_jq.trigger("liszt:showing_dropdown", {
        chosen: this
      });
      this.dropdown.css({
        "top": dd_top + "px",
        "left": 0
      });
      this.results_showing = true;
      this.search_field.focus();
      this.search_field.val(this.search_field.val());

      //this.form_field_jq.focus();
      this.form_field_jq.trigger("focusin");

      return this.winnow_results();
    };

    Chosen.prototype.results_hide = function() {
      if (!this.is_multiple) {
        this.selected_item.removeClass("chzn-single-with-drop");
      }
      this.result_clear_highlight();
      this.form_field_jq.trigger("liszt:hiding_dropdown", {
        chosen: this
      });
      this.dropdown.css({
        "left": "-9000px"
      });
      //this.form_field_jq.blur();
      this.form_field_jq.trigger("focusout");
      return this.results_showing = false;
    };

    Chosen.prototype.set_tab_index = function(el) {
      var ti;
      if (this.form_field_jq.attr("tabindex")) {
        ti = this.form_field_jq.attr("tabindex");
        this.form_field_jq.attr("tabindex", -1);
        if (this.is_multiple) {
          return this.search_field.attr("tabindex", ti);
        } else {
          this.selected_item.attr("tabindex", ti);
          return this.search_field.attr("tabindex", -1);
        }
      }
    };

    Chosen.prototype.show_search_field_default = function() {
      if (this.is_multiple && this.choices < 1 && !this.active_field) {
        this.search_field.val(this.default_text);
        return this.search_field.addClass("default");
      } else {
        this.search_field.val("");
        return this.search_field.removeClass("default");
      }
    };

    Chosen.prototype.search_results_mouseup = function(evt) {
      var target;
      target = $(evt.target).hasClass("active-result") ? $(evt.target) : $(evt.target).parents(".active-result").first();
      if (target.length) {
        this.result_highlight = target;
        return this.result_select(evt);
      }
    };

    Chosen.prototype.search_results_mouseover = function(evt) {
      var target;
      target = $(evt.target).hasClass("active-result") ? $(evt.target) : $(evt.target).parents(".active-result").first();
      if (target) return this.result_do_highlight(target);
    };

    Chosen.prototype.search_results_mouseout = function(evt) {
      if ($(evt.target).hasClass("active-result" || $(evt.target).parents('.active-result').first())) {
        return this.result_clear_highlight();
      }
    };

    Chosen.prototype.choices_click = function(evt) {
      evt.preventDefault();
      if (this.active_field && !($(evt.target).hasClass("search-choice" || $(evt.target).parents('.search-choice').first)) && !this.results_showing) {
        return this.results_show();
      }
    };

    Chosen.prototype.choice_build = function(item) {
      var choice_id, html, link,
        _this = this;
      if (this.is_multiple && this.max_selected_options <= this.choices) {
        this.form_field_jq.trigger("liszt:maxselected", {
          chosen: this
        });
        return false;
      }
      choice_id = this.container_id + "_c_" + item.array_index;
      this.choices += 1;
      if (item.disabled) {
        html = '<li class="search-choice search-choice-disabled" id="' + choice_id + '"><span>' + item.html + '</span></li>';
      } else {
        html = '<li class="search-choice" id="' + choice_id + '"><span>' + item.html + '</span><a href="javascript:void(0)" class="search-choice-close" rel="' + item.array_index + '"></a></li>';
      }
      this.search_container.before(html);
      link = $('#' + choice_id).find("a").first();
      return link.click(function(evt) {
        return _this.choice_destroy_link_click(evt);
      });
    };

    Chosen.prototype.choice_destroy_link_click = function(evt) {
      evt.preventDefault();
      if (!this.is_disabled) {
        this.pending_destroy_click = true;
        return this.choice_destroy($(evt.target));
      } else {
        return evt.stopPropagation;
      }
    };

    Chosen.prototype.choice_destroy = function(link) {
      if (this.result_deselect(link.attr("rel"))) {
        this.choices -= 1;
        this.show_search_field_default();
        if (this.is_multiple && this.choices > 0 && this.search_field.val().length < 1) {
          this.results_hide();
        }
        return link.parents('li').first().remove();
      }
    };

    Chosen.prototype.results_reset = function() {
      this.form_field.options[0].selected = true;
      this.selected_item.find("span").text(this.default_text);
      if (!this.is_multiple) this.selected_item.addClass("chzn-default");
      this.show_search_field_default();
      this.results_reset_cleanup();
      this.form_field_jq.trigger("change");
      if (this.active_field) return this.results_hide();
    };

    Chosen.prototype.results_reset_cleanup = function() {
      this.current_value = this.form_field_jq.val();
      return this.selected_item.find("abbr").remove();
    };

    Chosen.prototype.result_select = function(evt) {
      var high, high_id, item, position;
      if (this.result_highlight) {
        high = this.result_highlight;
        high_id = high.attr("id");
        this.result_clear_highlight();
        if (this.is_multiple) {
          this.result_deactivate(high);
        } else {
          this.search_results.find(".result-selected").removeClass("result-selected");
          this.result_single_selected = high;
          this.selected_item.removeClass("chzn-default");
        }
        high.addClass("result-selected");
        position = high_id.substr(high_id.lastIndexOf("_") + 1);
        item = this.results_data[position];
        item.selected = true;
        this.form_field.options[item.options_index].selected = true;
        if (this.is_multiple) {
          this.choice_build(item);
        } else {
          this.selected_item.find("span").first().text(item.text);
          if (this.allow_single_deselect) this.single_deselect_control_build();
        }
        if (!(evt.metaKey && this.is_multiple)) this.results_hide();
        this.search_field.val("");
        if (this.is_multiple || this.form_field_jq.val() !== this.current_value) {
          this.form_field_jq.trigger("change", {
            'selected': this.form_field.options[item.options_index].value
          });
        }
        this.current_value = this.form_field_jq.val();
        return this.search_field_scale();
      }
    };

    Chosen.prototype.result_activate = function(el) {
      return el.addClass("active-result");
    };

    Chosen.prototype.result_deactivate = function(el) {
      return el.removeClass("active-result");
    };

    Chosen.prototype.result_deselect = function(pos) {
      var result, result_data;
      result_data = this.results_data[pos];
      if (!this.form_field.options[result_data.options_index].disabled) {
        result_data.selected = false;
        this.form_field.options[result_data.options_index].selected = false;
        result = $("#" + this.container_id + "_o_" + pos);
        result.removeClass("result-selected").addClass("active-result").show();
        this.result_clear_highlight();
        this.winnow_results();
        this.form_field_jq.trigger("change", {
          deselected: this.form_field.options[result_data.options_index].value
        });
        this.search_field_scale();
        return true;
      } else {
        return false;
      }
    };

    Chosen.prototype.single_deselect_control_build = function() {
      if (this.allow_single_deselect && this.selected_item.find("abbr").length < 1) {
        return this.selected_item.find("span").first().after("<abbr class=\"search-choice-close\"></abbr>");
      }
    };

    Chosen.prototype.winnow_results = function() {
      var found, option, part, parts, regex, regexAnchor, result, result_id, results, searchText, startpos, text, zregex, _i, _j, _len, _len2, _ref;
      this.no_results_clear();
      results = 0;
      searchText = this.search_field.val() === this.default_text ? "" : $('<div/>').text($.trim(this.search_field.val())).html();
      regexAnchor = this.search_contains ? "" : "^";
      regex = new RegExp(regexAnchor + searchText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'i');
      zregex = new RegExp(searchText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'i');
      _ref = this.results_data;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        option = _ref[_i];
        if (!option.disabled && !option.empty) {
          if (option.group) {
            $('#' + option.dom_id).css('display', 'none');
          } else if (!(this.is_multiple && option.selected)) {
            found = false;
            result_id = option.dom_id;
            result = $("#" + result_id);
            if (regex.test(option.html)) {
              found = true;
              results += 1;
            } else if (option.html.indexOf(" ") >= 0 || option.html.indexOf("[") === 0) {
              parts = option.html.replace(/\[|\]/g, "").split(" ");
              if (parts.length) {
                for (_j = 0, _len2 = parts.length; _j < _len2; _j++) {
                  part = parts[_j];
                  if (regex.test(part)) {
                    found = true;
                    results += 1;
                  }
                }
              }
            }
            if (found) {
              if (searchText.length) {
                startpos = option.html.search(zregex);
                text = option.html.substr(0, startpos + searchText.length) + '</em>' + option.html.substr(startpos + searchText.length);
                text = text.substr(0, startpos) + '<em>' + text.substr(startpos);
              } else {
                text = option.html;
              }
              result.html(text);
              this.result_activate(result);
              if (option.group_array_index != null) {
                $("#" + this.results_data[option.group_array_index].dom_id).css('display', 'list-item');
              }
            } else {
              if (this.result_highlight && result_id === this.result_highlight.attr('id')) {
                this.result_clear_highlight();
              }
              this.result_deactivate(result);
            }
          }
        }
      }
      if (results < 1 && searchText.length) {
        return this.no_results(searchText);
      } else {
        return this.winnow_results_set_highlight();
      }
    };

    Chosen.prototype.winnow_results_clear = function() {
      var li, lis, _i, _len, _results;
      this.search_field.val("");
      lis = this.search_results.find("li");
      _results = [];
      for (_i = 0, _len = lis.length; _i < _len; _i++) {
        li = lis[_i];
        li = $(li);
        if (li.hasClass("group-result")) {
          _results.push(li.css('display', 'auto'));
        } else if (!this.is_multiple || !li.hasClass("result-selected")) {
          _results.push(this.result_activate(li));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Chosen.prototype.winnow_results_set_highlight = function() {
      var do_high, selected_results;
      if (!this.result_highlight) {
        selected_results = !this.is_multiple ? this.search_results.find(".result-selected.active-result") : [];
        do_high = selected_results.length ? selected_results.first() : this.search_results.find(".active-result").first();
        if (do_high != null) return this.result_do_highlight(do_high);
      }
    };

    Chosen.prototype.no_results = function(terms) {
      var no_results_html;
      no_results_html = $('<li class="no-results">' + this.results_none_found + ' "<span></span>"</li>');
      no_results_html.find("span").first().html(terms);
      return this.search_results.append(no_results_html);
    };

    Chosen.prototype.no_results_clear = function() {
      return this.search_results.find(".no-results").remove();
    };

    Chosen.prototype.keydown_arrow = function() {
      var first_active, next_sib;
      if (!this.result_highlight) {
        first_active = this.search_results.find("li.active-result").first();
        if (first_active) this.result_do_highlight($(first_active));
      } else if (this.results_showing) {
        next_sib = this.result_highlight.nextAll("li.active-result").first();
        if (next_sib) this.result_do_highlight(next_sib);
      }
      if (!this.results_showing) return this.results_show();
    };

    Chosen.prototype.keyup_arrow = function() {
      var prev_sibs;
      if (!this.results_showing && !this.is_multiple) {
        return this.results_show();
      } else if (this.result_highlight) {
        prev_sibs = this.result_highlight.prevAll("li.active-result");
        if (prev_sibs.length) {
          return this.result_do_highlight(prev_sibs.first());
        } else {
          if (this.choices > 0) this.results_hide();
          return this.result_clear_highlight();
        }
      }
    };

    Chosen.prototype.keydown_backstroke = function() {
      var next_available_destroy;
      if (this.pending_backstroke) {
        this.choice_destroy(this.pending_backstroke.find("a").first());
        return this.clear_backstroke();
      } else {
        next_available_destroy = this.search_container.siblings("li.search-choice").last();
        if (next_available_destroy.length && !next_available_destroy.hasClass("search-choice-disabled")) {
          this.pending_backstroke = next_available_destroy;
          if (this.single_backstroke_delete) {
            return this.keydown_backstroke();
          } else {
            return this.pending_backstroke.addClass("search-choice-focus");
          }
        }
      }
    };

    Chosen.prototype.clear_backstroke = function() {
      if (this.pending_backstroke) {
        this.pending_backstroke.removeClass("search-choice-focus");
      }
      return this.pending_backstroke = null;
    };

    Chosen.prototype.keydown_checker = function(evt) {
      var stroke, _ref;
      stroke = (_ref = evt.which) != null ? _ref : evt.keyCode;
      this.search_field_scale();
      if (stroke !== 8 && this.pending_backstroke) this.clear_backstroke();
      switch (stroke) {
        case 8:
          this.backstroke_length = this.search_field.val().length;
          break;
        case 9:
          if (this.results_showing && !this.is_multiple) this.result_select(evt);
          this.mouse_on_container = false;
          break;
        case 13:
          evt.preventDefault();
          break;
        case 38:
          evt.preventDefault();
          this.keyup_arrow();
          break;
        case 40:
          this.keydown_arrow();
          break;
      }
    };

    Chosen.prototype.search_field_scale = function() {
      var dd_top, div, h, style, style_block, styles, w, _i, _len;
      if (this.is_multiple) {
        h = 0;
        w = 0;
        style_block = "position:absolute; left: -1000px; top: -1000px; display:none;";
        styles = ['font-size', 'font-style', 'font-weight', 'font-family', 'line-height', 'text-transform', 'letter-spacing'];
        for (_i = 0, _len = styles.length; _i < _len; _i++) {
          style = styles[_i];
          style_block += style + ":" + this.search_field.css(style) + ";";
        }
        div = $('<div />', {
          'style': style_block
        });
        div.text(this.search_field.val());
        $('body').append(div);
        w = div.width() + 25;
        div.remove();
        if (w > this.f_width - 10) w = this.f_width - 10;
        this.search_field.css({
          'width': w + 'px'
        });
        dd_top = this.container.height();
        return this.dropdown.css({
          "top": dd_top + "px"
        });
      }
    };

    Chosen.prototype.generate_random_id = function() {
      var string;
      string = "sel" + this.generate_random_char() + this.generate_random_char() + this.generate_random_char();
      while ($("#" + string).length > 0) {
        string += this.generate_random_char();
      }
      return string;
    };

    return Chosen;

  })(AbstractChosen);

  get_side_border_padding = function(elmt) {
    var side_border_padding;
    return side_border_padding = elmt.outerWidth() - elmt.width();
  };

  root.get_side_border_padding = get_side_border_padding;

}).call(this);

define("chosen", (function (global) {
    return function () {
        return global.chosen;
    };
}(this)));

/**
 * @requires rit
 */
define('app/views/compare-list',['rit', 'util/view', 'chosen', 'util/analytics', 'util/i18n'], function(RIT, View, Chosen, Analytics, i18n) {

	/**
	 * @version {version}
	 */
	var $ = RIT.$,
		_ = RIT._,
		Backbone = RIT.Backbone,
		Events = RIT.Events,
		$body = RIT.$body,
		bodyData = RIT.bodyData,
		appName = 'mlp',
		seriesName = bodyData['seriesName'],
		iOS = false,
		iDevice = ['iPad', 'iPhone', 'iPod'];

	for (var i = 0, len = iDevice.length; i < len; i += 1) {
		if (navigator.platform === iDevice[i]) {
			iOS = true;
			break;
		}
	}

	/**
	 * @Class CompareList
	 */
	var CompareList = View.extend({
		events: {
			'change #keyCompetitors': 'competitorsTrimsHandleSelect',
			'click #detailedComparisons': 'detailedComparisionCTAClicked'
		},

		/**
		 * Initialize function
		 * @function
		 */
		initialize: function() {
			var self = this;

			self.model.on('change:competitorTrims', self.competitorTrimsList, self);
			// self.model.on('change:compareReport', self.compareDataFill, self);
			self.model.on('compareReportFetch:done', self.compareDataFill, self);
			self.render();
		},

		/**
		 * Renders the view
		 * @function
		 */
		render: function() {
			var self = this;

			if (!iOS) {
				$(".chzn-select").chosen();
				$(".chzn-select-deselect").chosen({
					allow_single_deselect: true
				});
			}

			return self;
		},

		competitorTrimsList: function() {
			var self = this;

			self.$('#keyCompetitors').html('');

			_.each(self.model.get('competitorTrims'), function(obj, index) {
				// Using bracket notation in case any of the properties doesn't exist so it won't cause an error
				self.$('#keyCompetitors').append('<option data-trim-img="' + obj['imageUrl'] + '" value=' + obj['trimId'] + ' data-make-name="' + obj['makeName'] + '">' + obj['year'] + ' ' + obj['makeName'] + ' ' + obj['modelName'] + ' ' + obj['trimName'] + '</option>');
			});

			$("#keyCompetitors").trigger("liszt:updated");

			self.setDetailComparisons();
		},

		competitorsTrimsHandleSelect: function(e) {
			var self = this,
				$target = $(e.target);

			self.model.set({
				showCompetitorTrimId: $target.val(),
				competitorTrimImg: $target.find(":selected").data('trimImg')
			});

			//competitor_name
			Analytics.fire(appName, '54.11', {
				'current_pagename': Analytics.currentPageName(),
				'vehicle': seriesName,
				'competitor_name': $target.find(":selected").data('makeName'),
				'device_type':Analytics.deviceType
			});

			self.setDetailComparisons();
			self.compareDataFill();
		},

		setDetailComparisons: function() {
			var self = this;

			self.$('.primary-car-img img').attr('src', self.model.get('keyTrimImg'));
			self.$('.competitor-car-img img').attr('src', self.model.get('competitorTrimImg'));
			// added for TOYRIT-5891
			if( i18n.lang == 'en' ) {
				//Show all compititor vehicle in compare detail page (TOYRIT-8669)
				self.$('#detailedComparisons').attr('href', '/' + RIT.util.langPath + bodyData['seriesCode'] + '/compare.html#compare/summary/' + self.model.get('keyTrimId'));
				
				//Show selected compititor vehicle in compare detail page
				//self.$('#detailedComparisons').attr('href', '/' + RIT.util.langPath + bodyData['seriesCode'] + '/compare.html#compare/summary/' + self.model.get('keyTrimId') + '/' + self.model.get('showCompetitorTrimId'));
			}
			else {
				//Show all compititor vehicle in compare detail page (TOYRIT-8669)
				self.$('#detailedComparisons').attr('href', '/' + RIT.util.langPath + bodyData['seriesCode'] + '/compare.html#compare/resumen/' + self.model.get('keyTrimId'));

				//Show selected compititor vehicle in compare detail page
				//self.$('#detailedComparisons').attr('href', '/' + RIT.util.langPath + bodyData['seriesCode'] + '/compare.html#compare/resumen/' + self.model.get('keyTrimId') + '/' + self.model.get('showCompetitorTrimId'));

			}
		},

		compareDataFill: function(response) {
			var self = this,
				primaryGradSection = self.$('#primaryGradAttrDetail'),
				primaryGradDetail = self.model.get('keyTrims'),
				competitorGradSection = self.$('#competitorAttrDetail'),
				compareReport = self.model.get('compareReport'),
				primaryGradData = compareReport.primaryVehicle,
				competitorGradData = compareReport.competitorVehicle[0],
				comparisionData = compareReport.comparisonData,
				compareCarDetailRow = self.$('.compare-car-detail-row'),
				compareCarAttrLen = $('ul', compareCarDetailRow).siblings().length,
				seriesName = $body.data('seriesName'),
                modelGradeDisplayName='',
				//modelGradeDisplayName = primaryGradDetail[0].modelGradeDisplayName === seriesName ? '' : primaryGradDetail[0].modelGradeDisplayName;

				modelGradeDisplayNameObjArr = [];
				modelGradeDisplayNameObj = (typeof $body.data('chrome-id') != 'undefined') ? _.where(primaryGradDetail, {modelChromeId: $body.data('chrome-id')}) : primaryGradDetail[0],

				//set labels based on language
				labelCost = (RIT.util.lang === "es") ? 'costo' : 'cost',
				labelFuel = (RIT.util.lang === "es") ? 'economia de combustible' : 'fuel economy',
				labelMsrp = (RIT.util.lang === "es") ? 'precio incluyendo costos de entrega' : 'msrp',
				labelCity = (RIT.util.lang === "es") ? 'epa ciudad (mpg)' : 'epa city',
				labelHwy = (RIT.util.lang === "es") ? 'epa carretera (mpg)' : 'epa highway';
				
				if(_.isArray(modelGradeDisplayNameObj)){
					modelGradeDisplayNameObjArr = modelGradeDisplayNameObj;
				} else {
					modelGradeDisplayNameObjArr.push(modelGradeDisplayNameObj);
				}
	            
                //Added a array length check because modelGradeDisplayNameObjArr[0] throws an error when the array is empty
                if(modelGradeDisplayNameObjArr.length>0){
				    modelGradeDisplayName = modelGradeDisplayNameObjArr[0].modelGradeDisplayName === seriesName ? '' : modelGradeDisplayNameObjArr[0].modelGradeDisplayName;
                }
	
			$('h3', primaryGradSection).html(seriesName + " " + modelGradeDisplayName);
			$('h3', competitorGradSection).html(competitorGradData.modelName + " " + competitorGradData.trimName.split('(')[0]);

			_.each(comparisionData.heading, function(obj) {
				if (obj.headingName.toLowerCase() === labelCost) {
					_.each(obj.rowAndSubHeading, function(obj) {
						var rowLabelName = obj.rowLabel;
						if (rowLabelName.toLowerCase().indexOf(labelMsrp) !== -1) {
							$('.attrMsrp span', primaryGradSection).html(obj.vehicleData[0].colData);
							$('.attrMsrp span', competitorGradSection).html(obj.vehicleData[1].colData);
						}
					});
				}

				if (obj.headingName.toLowerCase() === labelFuel) {
					_.each(obj.rowAndSubHeading, function(obj) {
						var rowLabelName = obj.rowLabel;
						if (rowLabelName.toLowerCase().indexOf(labelCity) !== -1) {
							$('.attrMpg span.cityMpg', primaryGradSection).html(obj.vehicleData[0].colData);
							$('.attrMpg span.cityMpg', competitorGradSection).html(obj.vehicleData[1].colData);
						}

						if (rowLabelName.toLowerCase().indexOf(labelHwy) !== -1) {
							$('.attrMpg span.highwayMpg', primaryGradSection).html(obj.vehicleData[0].colData);
							$('.attrMpg span.highwayMpg', competitorGradSection).html(obj.vehicleData[1].colData);
						}
					});
				}
			});

			// Attribute data fill
			_(compareCarAttrLen).times(function(index) {
				var attrName = $('#ccAttribute' + (index + 1), compareCarDetailRow).data('attrName').toLowerCase();

				_.each(comparisionData.heading, function(obj) {
					_.each(obj.rowAndSubHeading, function(obj) {
						var ccAttrRow = $('#ccAttribute' + (index + 1), compareCarDetailRow);

						if (obj.rowLabel.toLowerCase().indexOf(attrName) != -1) {
							if (obj.vehicleData[0].advantageFlag.toLowerCase() == 'true') {
								$('.primary-grad-attr-val img', ccAttrRow).css('visibility', 'visible');
							} else {
								$('.primary-grad-attr-val img', ccAttrRow).css('visibility', 'hidden');
							}
							$('.primary-grad-attr-val span', ccAttrRow).html(obj.vehicleData[0].colData);
							$('.competitor-grad-attr-val span', ccAttrRow).html(obj.vehicleData[1].colData);
						}
					});
				});
			});
			Events.trigger('compareDataFill:done');
		},

		detailedComparisionCTAClicked: function() {
			Analytics.fire(appName, '54.10', {
				'current_pagename': Analytics.currentPageName(),
				'vehicle': seriesName,
				'device_type':Analytics.deviceType
			});
		}
	});

	// Return public interface
	return CompareList;

});

/**
 * @requires rit
 */
define('app/views/inventory',['rit', 'util/view'], function(RIT, View) {

	/**
	 * @version {version}
	 */
	var $ = RIT.$,
		$body = $('body');

	/**
	 * @Class vehicleModels
	 */
	var BuildYourCar = View.extend({

		events: {

		},
		/**
		 * @Default initialize function
		 * @function
		 */
		initialize: function() {
			this.render();
		},

		/**
		 * @Default render function
		 * @function
		 */
		render: function() {
			var self = this,
				$el = self.$el,
				bg = $el.data('background');

			// set the background image
			if (bg) {
				$el.css('background-image', 'url(' + bg + ')');
			}
		}
	});

	// Return public interface
	return BuildYourCar;

});

/**
 * @requires rit
 * @requires util/view
 */
define('app/views/app-view',['rit', 'util/view', 'navIndicator', 'app/models/awards-ratings', 'app/models/compare-list', 'common/js/views/panel/panel-set', 'app/views/welcome', 'app/views/camry-effect', 'app/views/colorizer', 'app/views/gallery', 'plugin/bootstrap.tab', 'app/views/vehicle-models', 'app/views/hotspots', 'app/views/awards-ratings', 'app/views/build-your-car', 'app/views/compare-list','app/views/inventory', 'util/analytics'],
	function(RIT, View, NavIndicator, AwardsRatingsModel, CompareListModel, PanelSet, PanelWelcome, PanelCamryEffect, VehicleColorizer, PanelGallery, Tabs, VehicleModels, HotSpots, AwardsRatings, BuildYourCar, CompareList, Inventory, Analytics) {

	var $ = RIT.$,
		_ = RIT._,
		Events = RIT.Events,
		$body = RIT.$body,
		$window = RIT.$window,
		data = RIT.bodyData,
		has = RIT.has,
		// Used for analytics
		appName = 'mlp',
		seriesName = data['seriesName'],
		trackedPanels = [],
		panelViewTimer,
		lastSubnavEl= $('#subnav .nav li:last a'),
		firstLoadRfyWhat = firstLoadRfyQuiz = firstLoadRfyDealers = firstLoadRfyLeviton = firstLoadRfyFAQs = true;

	var AppView = View.extend({
		events: {
			'click #panelsCampaign a': 'onClickCampaignPanelLink'
		},

		initialize: function(models) {
			var self = this,
				$subnav=$('#subnav'),
				comparePromise = $.Deferred();

			//Add all the section panels's ids to the list
			self.panelsList=['marquee'];
			$(".panel-container").each(function(i, item){
				if(typeof($(this).attr('id')) !== 'undefined'){
					self.panelsList.push($(this).attr('id'));
				}
			});

			//Keep track of the current scrolling position
			self.prevScrollPos=0;

			//Track pagebottom reached
			self.pageBottomReached=false;

			self.$subnavLi=$subnav.find("li");
			self.subnavLength=self.$subnavLi.size();

			// Get the analytics tags.
			Analytics.getTags(appName);
			Analytics.setPageName('T:' + seriesName + ':Overview');

			// initialize welcome-mat panel
			self.welcomeMat = new PanelWelcome({
				el: $body,
				model: models.vehicle
			});

			// initialize vehicle colorizer
			self.colorizer = new VehicleColorizer({
				el: $('#vehicle-colorizer'),
				model: models.vehicle
			});

			// Create the gallery panel set for large images
			self.galleryPanelSet = new PanelSet({
				el: $('#panelGallery .gallery-panels'),
				pageIndicator: false
			});

			// Initialize vehicle gallery and thumbs nav
			self.gallery = new PanelGallery({
				el: $('#panelGallery'),
				panelSet: self.galleryPanelSet
			}).on('thumb:click', function(index) {
				self.galleryPanelSet.goToPanel(index);
			});

			// initialize panel-sets
			//self.initPanels();
			// Create the rest of the panel sets
			$('.panel-set').each(function(i, item ) {
				if (typeof $(this).parent().attr('id') !== 'undefined') {
					var panel = new PanelSet({ el: this }).on('panelchange:before',
							function(index, dir, $panel) {
								self.trackPanelChange(index, dir, $panel);
							}).on('panelchange:after', 
								function(index, dir, $panel) {
									self.trackPanelLoadOnArrowClick(index, dir, $panel);
							}),
						panelSection = $(panel.el);

					//Nav indicator tab click event.
					panelSection.find('.nav-tabs').find('li a').on((has.touch) ? 'touchstart' : 'click', function(evt) {
						self.trackNavClick(evt, panel);
					});

					//Supporting button click event Analytics tagging.
					panelSection.find('.supporting-content a').on((has.touch) ? 'touchstart' : 'click', function(evt) {
						self.trackSupportingClick(evt, panel);
					});
				}
			});			

			// initialize vehicle-models view
			self.vehiclemodels = new VehicleModels({
				el: $('#vehicleModels'),
				model: models.vehicle
			});

			// initialize awards and ratings
			self.ratingsModel = new AwardsRatingsModel();

			self.awardsRatings = new AwardsRatings({
				el: $('#awardsRatings'),
				model: self.ratingsModel
			});

			// initialize build your car
			self.buildYourCar = new BuildYourCar({
				el: $('#buildYourCar'),
				model: models.vehicle
			});

			// initialize Inventory
			self.inventory = new Inventory({
				el: $('#inventory'),
				model: models.vehicle
			});

			// initialize compare list
			self.compareListModel = new CompareListModel();

			self.compareListView = new CompareList({
				el: $('#compareCar'),
				model: self.compareListModel
			});

			// initialize hotspots
			self.hotspots = new HotSpots({
				el: $body
			});

			// Initialize the nav tab indicators indicator
			$('.nav-tabs').parent().navIndicator();

			Events.on('compareDataFill:done compareDataFill:fail', function(){
				comparePromise.resolve();
			});

			//Initialize subnav scroll with offset
			$subnav.scrollnav({
				'target':'target',
				'offset': 60
			});

			models.vehicle.on('change:panel', function(params){
				var self = this,
					newPanel;

				if (params) {
					newPanel=self.welcomeMat.getPanel(params.get('panel'));
					//Fire special welcome matt tagging
					self.trackPanelLoad(newPanel, params.get('page'));
				}
			}, self);

			//Track page bottom reached
			self.$subnavLi.on('navActivate', function(e, index){
				//Track last panel only do it once
				if(!self.pageBottomReached && index===(self.subnavLength-1)){
					self.trackPanelView();
					self.pageBottomReached=true;
				}
			});

			//Wait for scroll done to fire pageload tags
			Events.on("scrollDone", function(scrollTop){
				self.scrollDone(scrollTop);
			});
		},

		render: function() {
			this.extAnalytics();
			return this;
		},

		extAnalytics: function() {
			switch (true) {
				case (/avalon/i).test(seriesName):
					Analytics.vendor("burrell",{ ActivityID: 297716 }); break;
				case (/rav4(?! ev)/i).test(seriesName):
					Analytics.vendor("burrell",{ ActivityID: 172321 }); break;
				case (/corolla/i).test(seriesName):
					Analytics.vendor("burrell",{ ActivityID: 358588 }); break;
			}
		},

		onClickCampaignPanelLink: function(evt) {
			var $el = $(evt.currentTarget),
				elData = $el.data();

			if($('#panelsCampaign .panel').data('custom-panel') == 'corolla-videos'){
				return;
			}	
				
			Analytics.setPageName('T:' + seriesName + ':Overview');
			Analytics.fire('mlp', '54.92', {
				'vehicle': seriesName,
				'campaign_title': elData.campaignTitle,
				'promotion_title': elData.promotionTitle,
				'button_name': elData.buttonName,
				'destination_url': $el.attr('href'),
				'current_pagename': Analytics.currentPageName(),
				'device_type':Analytics.deviceType
			});
		},

		//Next, Prev click
		trackPanelChange : function(index, dir, panel) {
			var self=this,
				panelSection=$(panel),
				panelTitle=panelSection.attr('data-title'),
				panelTemplateType=panelSection.attr('class').split(" ")[1],
				tagId,
				tilePosition=index+1;

				if (dir === "next"){
					tagId=54.14;
					tilePosition= tilePosition+"-"+(tilePosition+1);
				}else {
					tagId=54.15;
					tilePosition= tilePosition +"-"+(tilePosition-1);
				}

				Analytics.setPageName('T:' + seriesName + ':Overview');
				//Arrow Click tag
				Analytics.fire(appName, tagId, {
					'vehicle': seriesName,
					'template_type': panelTemplateType,
					'tile_title': panelTitle,
					'current_pagename': Analytics.currentPageName(),
					'device_type':Analytics.deviceType,
					'feature_tile_position': tilePosition
				});

				if(panelSection.data('custom-panel')){
					if (dir === "next"){
						if(firstLoadRfyQuiz && panelSection.data('custom-panel').indexOf('rav4ev-rfy-what') != -1){
							Analytics.setPageName('T:RAV4_EV:Right_For_You:Quiz');
							Analytics.fire('mlp', 156.2,{
								'tda_code': $.cookie('zipcode'),
								'zip_code': $.cookie('zipcode'),
								'device_type': Analytics.deviceType
							});
							firstLoadRfyQuiz = false;
						}else if(firstLoadRfyDealers && panelSection.data('custom-panel').indexOf('rav4ev-rfy-quiz') != -1){
							Analytics.setPageName('T:RAV4_EV:Find_A_Dealer:Results');
							Analytics.fire('mlp', 156.5,{
								'tda_code': $.cookie('zipcode'),
								'zip_code': $.cookie('zipcode'),
								'device_type': Analytics.deviceType
							});
							firstLoadRfyDealers = false;						
						}else if(firstLoadRfyLeviton && panelSection.data('custom-panel').indexOf('rav4ev-rfy-dealers') != -1){
							Analytics.setPageName('T:RAV4_EV:Right_For_You:Leviton_Charging_Units');
							Analytics.fire('mlp', 156.8,{
								'tda_code': $.cookie('zipcode'),
								'zip_code': $.cookie('zipcode'),
								'device_type': Analytics.deviceType
							});
							firstLoadRfyLeviton = false;
						}else if(firstLoadRfyFAQs && panelSection.data('custom-panel').indexOf('rav4ev-rfy-leviton') != -1){
							Analytics.setPageName('T:RAV4_EV:Right_For_You:FAQs');
							Analytics.fire('mlp', 156.11,{
								'tda_code': $.cookie('zipcode'),
								'zip_code': $.cookie('zipcode'),
								'device_type': Analytics.deviceType
							});
							firstLoadRfyFAQs = false;						
						}
					}	
				}				
		},

		trackPanelLoadOnArrowClick : function(index, dir, panel) {
			var self=this,
			$panel=$(panel),
			panelParent=$(panel).closest('.panel-container').attr('id'),
			loadTagData=self.getPanelLoadTags(panelParent);

			if($body.hasClass("modal-open")) {
				return;
			}

			Analytics.setPageName('T:' + seriesName + ':Overview');
			
			//Panel Load tagging
			if (window.mlpScrollTimer != -1){
				clearTimeout(window.mlpScrollTimer);
			}
			window.mlpScrollTimer=setTimeout(function(){

				//TOYRIT-8912 To prevent 54.91 tag being fired.
				if($('#panelsCampaign .panel').data('custom-panel') == 'corolla-videos'){
					return;
				}
				Analytics.fire(appName,loadTagData.tagId, loadTagData.tagObject);
			}, 2000);
		},

		//Nav indicator tab click
		trackNavClick : function(evt, panel){
			var panelSection=$(panel.el),
				panelIndex = panel._active.index,
				$currPanel=$(panel._active.panel),
				panelTitle = $currPanel.data('title'),
				panelTemplateType = $currPanel.attr('class').split(" ")[1],
				$currentTarget=$(evt.currentTarget),
				contentTitle = $currentTarget.text(),
				targetIndex;

			if (contentTitle === '') {
				targetIndex=$currentTarget.closest("li").index();
				contentTitle = $currPanel.find(".tab-content .tab-pane:eq("+targetIndex+") .supporting-content h3")[0].innerHTML;
			}

			Analytics.fire(appName, 54.16, {
				'vehicle': seriesName,
				'template_type': panelTemplateType,
				'tile_title': panelTitle,
				'current_pagename': Analytics.currentPageName(),
				'content_selector_title': contentTitle,
				'device_type':Analytics.deviceType
			});
		},

		//More info button click
		trackSupportingClick : function(evt, panel) {
			var panelSection=$(panel.el),
				panelIndex = panel._active.index,
				$currPanel=$(panel._active.panel),
				panelTitle = $currPanel.data('title'),
				panelTemplateType = $currPanel.attr('class').split(" ")[1],
				$currentTarget=$(evt.currentTarget),
				buttonName = $currentTarget.text(),
				contentSelecterTitle = $currentTarget.closest(".supporting-content").children(":first").text();

			Analytics.setPageName('T:' + seriesName + ':Overview');
			Analytics.fire(appName, 54.13, {
				'vehicle': seriesName,
				'template_type': panelTemplateType,
				'tile_title': panelTitle,
				'current_pagename': Analytics.currentPageName(),
				'content_selector_title': contentSelecterTitle,
				'button_name': buttonName
			});
		},

		trackPanelView: function(panelId, target) {
			trackedPanels.push(panelId);

			// Track the build panel view
			Analytics.fire(appName, '54.73', {
				'vehicle': seriesName,
				'device_type':Analytics.deviceType,
				'current_pagename': Analytics.currentPageName()
			});
		},

		//Tagging for welcomematt on pageload
		trackWelcomeLoad : function(model){
			var self=this;

			Analytics.fire(appName, '54.69',{
				'vehicle': seriesName,
				'device_type':Analytics.deviceType,
				'default_color':model.get('color'),
				'mdl_tile_position':1
			});
		},

		/**
		 * This function only fires default page load tags
		 * @param  {[type]} panel [description]
		 * @return {[type]}       [description]
		 */
		trackPanelLoad : function (panel, page){
			var self=this,
				tilePosition=1,
				title,
				subTitle,
				$deepPanel,
				tagData={},
				deep=false,
				$panels=$('.panel');

				//check if the page is a deep link or nor
				$panels.each(function(i){
					var $this=$(this);
					if(page !== undefined && $this.data('title')===panel && $this.data('sub-title')=== page.replace(' ', '').toLowerCase()){
						deep=true;
						return false;
					}
					else if($this.data('title')===panel){
						deep=true;
						return false;
					}
				});

				//Fire this on first page load with no deep link
				//Dont fire  on deep link
				if (!deep){
					tagData=self.getPanelLoadTags(panel);

					if(tagData.tagId === '54.69'){
						Analytics.fire(appName, tagData.tagId, tagData.tagObject);
					}
				}		
		},

		/**
		 * This function is called a user is landed to a panel after scrolling
		 */
		scrollDone : function(scrollPos) {
			var self=this, 
				offsetTop=0, 
				panelId,
				offsetRange, 
				tagObjects;


			for(var i = 0; i < self.panelsList.length; i++) {
				$panel=$('#'+self.panelsList[i]);
				$activePanel= $panel.find(".panel-set .panel*.active");
				offsetTop=$panel.offset().top-120;
				panelId=self.panelsList[i];
				offsetRange=offsetTop + $panel.height();
				
				if(scrollPos>=offsetTop && scrollPos<offsetRange){
					//check if scrolling is still inside the same tile
					if(self.prevScrollPos<offsetTop || self.prevScrollPos>=offsetRange){
						tagObjects=self.getPanelLoadTags(panelId);
						/* For campaign tile where images & title will be based on 50/50 rotation */
						if(tagObjects.tagId == '54.91' || tagObjects.tagId == '54.92') {
							if($activePanel.data('custom-panel') == 'avalon-campaign'){
								tagObjects.tagObject.campaign_title = $('.campaign-title', $activePanel).text();
								tagObjects.tagObject.current_pagename = $('.campaign-title', $activePanel).text();
							}
							if($activePanel.data('custom-panel') == 'tacoma-video'){
								tagObjects.tagObject.campaign_title = "tacoma-video";
							}
							//TOYRIT-8912
							//specifically added for Corolla Video custom panel load. 
							if($activePanel.data('custom-panel') == 'corolla-videos'){
								tagObjects.tagObject.tile_title = $('.page-header h2', $activePanel).text();
								tagObjects.tagObject.tile_subtitle = 'NA';
								appName = appName +":Overview:Features:"+$('.page-header h2', $activePanel).text();
								tagObjects.tagId = '54.67';
								tagObjects.tagObject.tda_code = $.cookie('zipcode');
								tagObjects.tagObject.zip_code = $.cookie('zipcode');
								tagObjects.tagObject.device_type = Analytics.deviceType
							}
						}
						//TOYRIT-8643
						//specifically added for Rav4ev "What to Expect" custom panel load. 
						if(tagObjects.tagId == '54.67'){
							$activePanel= $panel.find(".panel-set .panel*.active");
							if($activePanel.data('custom-panel') == 'rav4ev-rfy-what'){
								tagObjects.tagObject.campaign_title = "rav4ev-rfy-what";
								appName = "T:RAV4_EV:Right_For_You";
								tagObjects.tagId = '156.1';
								tagObjects.tagObject.tda_code = $.cookie('zipcode');
								tagObjects.tagObject.zip_code = $.cookie('zipcode');
								tagObjects.tagObject.device_type = Analytics.deviceType
							}
						}
						
						Analytics.fire(appName, tagObjects.tagId, tagObjects.tagObject);						
					}
					self.prevScrollPos=scrollPos;
					
				}
			}
		}, 

		/**
		 * [getPanelLoadTags This function returns tagId and tagobjects for panel loads
		 * @param  {[type]} panel [panel type]
		 * @return {[type]}       [description]
		 */
		getPanelLoadTags : function(panel){
			var self=this,
				$panel=$("#"+panel+""),
				$activePanel= $panel.find(".panel-set .panel*.active"),
				//$welcomePanel=$('[data-welcome-mat]:visible'),
				$welcomePanel=$('[data-welcome-mat="' + panel.toLowerCase() + '"]:visible'),
				activeIndex=($activePanel.index()>0)? '.'+($activePanel.index()+1):'',
				//panelIndex=(self.panelsList.indexOf(panel) + 1),
				panelIndex=($.inArray(panel, self.panelsList) + 1),
				tilePosition=(panelIndex >0)?(panelIndex+activeIndex):('1'+activeIndex),
				tagObject={
					'vehicle'           : seriesName,
					'device_type'       : Analytics.deviceType,
					'mdl_tile_position' : tilePosition
				},
				kbErr=$panel.find("#kellyBlueReview .row.error p"),
				edErr=$panel.find("#edmundsReview .row.error p"),
				awardErrMsg='No Errors',
				tagId,
				panelTitle;


				//For Awards, if there are error, fire 54.101
				if(panel === 'awardsRatings') {
					if(kbErr.is(':visible') || edErr.is(':visible')){
						panel='awardsErr';
						awardErrMsg=(kbErr.is(':visible')?('KBB_'+kbErr.text().replace('.', '')): '');
						awardErrMsg+=(edErr.is(':visible')?(((awardErrMsg === '')?'Edmunds_' :'_Edmunds_')+ edErr.text().replace('.', '')): '');
					}
				}
							
			
				//Special WElcome matt
				if($welcomePanel && $welcomePanel.length>0){
					panel='intro';
					tagId='54.69';
					panelTitle=$welcomePanel.data('title');
					//panelTitle=$welcomePanel.data('welcome-mat');
				}

				//match panels1, panels2, panels3, etc
				//These should all be 'Features' panel
				if(/^\panels[0-9]/.test(panel)) {
					panel="panels1";
				}

				tagId= {
					awardsRatings   : '54.65',
					awardsErr       : '54.101',
					compareCar      : '54.66',
					panels1         : '54.67',
					panelGallery    : '54.68',
					intro			: '54.69',
					vehicleModels   : '54.70',
					buildYourCar    : '54.71',
					inventory       : '54.72',
					panelsCampaign  : '54.91'
				}[panel];

				//Default load -Welcome
				if(tagId === undefined){
					panel='intro';
					tagId='54.69';
					panelTitle=$("#marquee").data('title');
				}

				$.extend(tagObject,{
					panels1 :{
						tile_title    : $activePanel.data('title'),
						tile_subtitle : $activePanel.data('sub-title')
					},
					awardsRatings : {
						ratings_unavailable_msg : awardErrMsg
					},
					awardsErr : {
						ratings_unavailable_msg : awardErrMsg
					},
					buildYourCar : {
						build_tile_type : "First Time User"
					},
					panelsCampaign : {
						campaign_title : $activePanel.data('title')
					},
					intro : {
						'default_color':self.colorizer.colorName,
						'test_name':panelTitle
					},
					panelGallery :{
						'mdl_tile_position' : panelIndex
					}
				}[panel]);

				return {'tagId':tagId, 'tagObject':tagObject};
		}
	});

	return AppView;
});

define('app/models/landing',['rit', 'util/model'], function(RIT, Model) {

	var $ = RIT.$,
		_ = RIT._,
		Events = RIT.Events,
		$body = RIT.$body,
		data = RIT.bodyData;

	var VehicleLanding = Model.extend({
		defaults: {
			makeName: '',
			series: '',
			year: '',
			color: '',
			panel: ''
		},

		initialize: function() {
			var self = this;

			if (data) {
				//set default model and year
				self.set({
					makeName: 'toyota',
					series: data['seriesCode'],
					year: data['year']
				});
			}

			self.on('all', function(evtType, model) {
				Events.trigger('section:change', model.toJSON());
			});

			Events.on('panel:navigate', function(params) {
				if (params.panel) {
					self.set({
						panel: params.panel
					});
				}
			});

			Events.on('page:navigate', function(params) {
				if (params.panel && params.page) {
					self.set({
						panel: params.panel,
						page: params.page
					});
				}
			});
		}
	});

	return VehicleLanding;
});

require(['rit', 'app/views/app-view', 'app/models/landing'], function(RIT, AppView, VehicleLanding) {

	var $ = RIT.$,
		_ = RIT._,
		Backbone = RIT.Backbone,
		Events = RIT.Events,
		$body = RIT.$body;

	var app = new(Backbone.Router.extend({
		routes: {
			/*
			 * @example
			 * /vehicle_landing/#!/:section
			 * /venza/#!/gallery - core sections
			 * /venza/#!/Ameneties - Feature Sections
			 */
			'!/:section': 'goToSectionPanel',

			/*
			 * @example
			 * /vehicle_landing/#!/:section/:panel
			 * /venza/#!/Safety/Active and Passive
			 * :section = Panel set's first section's data-title attribute
			 * :panel = Desired section's data-sub-title attribute
			 */
			'!/:section/:panel': 'goToSectionPanelPage',
		

			// default
			'*actions': 'defaultAction'
		},

		initialize: function() {
			var self = this;

			// create the vehicle landing model
			self.vehicleLanding = new VehicleLanding();

			// create your instance of AppView, passing in any models we create
			var appView = new AppView({
				vehicle: self.vehicleLanding,
				el: 'body'
			});

			appView.render();

			Events.on('section:change', function(data) {
				self.serialize(data);
			});

			// init backbone routes
			Backbone.history.start();
		},

		goToSectionPanel: function(section) {
			Events.trigger('panel:navigate', {
				panel: decodeURIComponent(section)
			});
		},

		goToSectionPanelPage: function(section, panel) {
			var self = this,
				isQS = /^\?/.test(panel);
			
			//If panel's first character is not a '?' 
			if (!isQS) {
				Events.trigger('page:navigate', {
					panel: decodeURIComponent(self.toTitleCase(section)),
					page: decodeURIComponent(panel)
				});
			}
			else {				
				Events.trigger('panel:navigate', {
					panel: decodeURIComponent(section.toLowerCase())
				});
			}
		},

		toTitleCase: function(str) {
			return str.replace(/\w\S*/g, function(txt) {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			});
		},

		defaultAction: function(actions) {
			this.navigate('!/Welcome');
			// Trigger model change;
			Events.trigger('panel:navigate',{
				panel: 'Welcome'
			});
		},

		serialize: function(data) {
			var self = this,
				panel = this.getPanel(data.panel),
				to = '#!/' + panel;

			if (data.panel && data.page) {
				to = '!/' + data.panel + '/' + data.page;
			}

			self.navigate(to, {
				trigger: true
			});
		},

		getPanel: function(data) {
			switch (data) {
			case 'panelGallery':
				data = 'gallery';
				break;
			case 'panels1':
				data = 'features';
				break;
			case 'vehicleModels':
				data = 'models';
				break;
			case 'awardsRatings':
				data = 'reviews';
				break;
			case 'compareCar':
				data = 'compare';
				break;
			case 'buildYourCar':
				data = 'build';
				break;
			}
			return data;
		}
	}))();
});

define("apps/vehicle-landing/js/main", function(){});
