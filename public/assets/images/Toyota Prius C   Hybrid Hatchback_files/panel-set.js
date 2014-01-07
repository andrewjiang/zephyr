define(['rit', 'util/view', 'util/i18n', 'common/js/views/panels/page-turner', 'common/js/views/panels/page-indicator', 'jquerypp/lib/jquery.event.key'],
	function(RIT, View, i18n, PageTurner, PageIndicator, Indicator, EventKey) {

	// alias'
	var $ = RIT.$,
		_ = RIT._,
		Backbone = RIT.Backbone,
		Events = RIT.Events,
		has = RIT.has,
		$document = RIT.$document,
		$window = RIT.$window,
		allowed = true,
		events = has.touch? {
			'swipeleft .panel': 'leftSwiper',
			'swiperight .panel': 'rightSwiper',
			'touchstart .yt-container': 'togglePausePlay',
			'touchstart a[data-toggle="tab"]': 'handleTabNavs'
		} : {
			'click a[data-toggle="tab"]': 'handleTabNavs',
			'hover .yt-container': 'togglePausePlay'
		};

	/**
	 * PanelSet view set panels for different section on vehicle landing page.
	 * @name PanelSet
	 * @class PanelSet
	 * @constructor
	 * @return {Object} PanelSet
	 */
	var PanelSet = View.extend({
		events: events,

		/**
		 * Default initializing function.
		 * @name PanelSet#initialize
		 * @function
		 */
		initialize: function(options) {
			var self = this;

			self.options = _.extend({
				el: self.$('.panel-container'),
				// this should be the #id of the panel-container if there are more than one panel sets on the page
				pageTurner: false,
				pageIndicator: false,
				infinite: true,
				autoInterval: 0,
				// if set to any value above 0 it will then use that value as the interval
				resize: false,
				minMax: false,
				maxWidth: 1500,
				minWidth: 1024,
				keyNavigation: true
			}, options);

			// set the model
			self.model = self.options.state;

			self.resizeTimer;

			// set some key event vars
			self.currentScrollPos = 0;
			self.prevScrollPos = 0;

			if (self.options.minMax) {
				self.model.minMax = self.options.minMax;
				self.model.minWidth = self.options.minWidth;
				self.model.maxWidth = self.options.maxWidth;
			}

			// binding arrow keydown events
			_.bindAll(self, 'render'); //newer version of underscore.js >= 1.4.4 requires function name to be passed in; passing in 'render' fixes entune error


			// If keyNavigation is set to true then only bind key events
			if (self.options.keyNavigation) {
				$document.on('keydown', self.handleKeyStrokes).on('keyup', self.setAllowed);
				$document.on('focus', self.setAllowed).on('scroll', self.handleScroll);
			}

			self.model.set('infinite', self.options.infinite);

			// When our change page event is fired then animate towards the correct direction
			self.model.on('animate', function() {
				(self.model.get('direction') === 'next') ? self.next() : self.prev();
			});

			self.model.on('goToPanel', function() {
				self.goToPanel();
			});

			Events.on('mlp:goToPanel', function(index, parent, flag) {
				if (self.el.id === parent.attr('id')) {
					self.model.setPanel(index);
					self.model.set('currentPanel', index);
					self.model.set('direction', 'next');
					self.goToPanel();

					if (flag) return;

					self.pageTurner = new PageTurner({
						el: self.el,
						model: self.options.state
					});
				}
			});

			// Cache reference to the panel set
			self.$panelSet = self.$('.panel-set');

			// Cache allPanels for this set
			self.$allPanels = self.$('.panel');

			self.render();

			if (has.touch) {
				//self.slider = new Swipe(self.el);
			}

			// Create instance of PageIndicator if option is enabled and there's more than 1 panel
			if (self.options.pageIndicator && self.$allPanels.length > 1) {
				self.pageIndicator = new PageIndicator({
					el: this.el,
					model: self.options.state
				});
			}

			// adjust panels on window resize if resize set to true
			if (self.options.resize) {
				$window.on('resize', self.onResize);
			}

			// if autoInterval is set to anything other 0
			if (self.options.autoInterval) {
				self.model.autoInterval = self.options.autoInterval;
				self.model.playInterval = setInterval(function() {
					self.model.setDirection('next');
				}, self.model.autoInterval);
			}

			// if start is set
			var start = self.options.start || self.model.get('start');
			if (start) {
				self.model.set('currentPanel', start - 1);
				self.model.setPanel(start - 1);
			}

		},

		/**
		 * Default render function for PanelSet view.
		 * @name PanelSet#render
		 * @function
		 */
		render: function() {
			var self = this,
				pWidth, setWidth, max;

			// activate first panel by default
			$('.panel-container:first').addClass('active-section');

			// store clickable state
			self.model.set('clickable', true);

			// get each panel and set them up for carousel
			self.$allPanels.each(function(i) {
				var $this = $(this),
					data = $this.data(),
					css = {};

				// set the background image
				//XXX: (Sean) changed the following line to add bg images to all slides on render so they aren't re-added each time in animate()
				//REM: if ($this.data('background') && i === 0) {
				if (data['background']) {
					css['background-image'] = 'url(' + data['background'] + ')';
					css['background-position'] = 'center top';
				}

				// set the text Color for Panel
				if (data['color']) {
					css['color'] = '#' + data['color'];
				}

				// Change the styles once
				$this.css(css);

				// set the title
				if (data['title']) {
					$this.find('.page-header h2').html(data['title']);
				}

				// if it's a custome panel, load the panel
				if ($this.hasClass('panel-custom') && data['customPanel']) {
					if (i18n.lang == "en") {
						require(['common/js/views/panels/custom/' + data['customPanel'] + '/main'], function(CustomPanel) {
							var customPanel = new CustomPanel({
								el: $this
							});
						});
					}
					else{
						require(['common/js/views/panels/custom/espanol/' + data['customPanel'] + '/main'], function(CustomPanel) {
							var customPanel = new CustomPanel({
								el: $this
							});
						});
					}
					// handle custom panel disclaimers
					self.customPanelDisclaimers($this);
					self.$('.nav-tabs, .explore-tabs, .pill-tab').parent().navIndicator();
				}

				// Make this panel absolutely positioned
				self.absolutize($this);
			});

			// mark the first panel within the panel set as active
			self.$allPanels.first().show();

			// define the number of panels
			max = self.$allPanels.length;

			self.model.set('max', max);

			// set the panel set width
			pWidth = self.$allPanels.outerWidth();

			//var setWidth = (self.model.get('max') - 1) * pWidth;
			// if there is onlyone panel defined it will set panel-set width as pWidth
			if ((max - 1) * pWidth === 0) {
				setWidth = pWidth;
			} else {
				setWidth = (max - 1) * pWidth;
			}

			if (max > 1) {
				// create our instance of PageTurner if set to true when PanelSet instantiated
				if (self.options.pageTurner) {
					self.pageTurner = new PageTurner({
						el: self.el,
						model: self.options.state
					});
				}
			}

			// adjust the panel set accordingly
			self.$panelSet.css({
				'width': setWidth + 'px',
				'left': '-' + pWidth + 'px'
			});
		},

		/**
		 * Sets the panel position to absolute.
		 * @name PanelSet#absolutize
		 * @function
		 * @param {Object} element
		 */
		absolutize: function(element) {
			var self = this,
				newWidth = self.$el.outerWidth();

			// honor min and max widths if they are set
			if (self.model.minMax) {
				if (parseInt(newWidth, 10) <= self.model.minWidth) {
					newWidth = self.model.minWidth;
				}
				if (parseInt(newWidth, 10) >= self.model.maxWidth) {
					newWidth = self.model.maxWidth;
				}
			}

			// update the new width on the model's width attribute
			self.model.set('width', newWidth);

			element.css({
				'width': newWidth,
				'position': 'absolute',
				'left': newWidth
			});
		},

		next: function() {
			var self = this,
				currentPanel = self.model.get('currentPanel'),
				max = self.model.get('max'),
				width = self.model.get('width'),
				next = currentPanel + 1;

			// set next to first panel if this is the last panel
			if (max === next) {
				next = 0;
			}

			self.model.set({
				// set prev to currentPanel
				'prev': currentPanel,
				// set next from currentPanel + 1
				'next': next,
				// set position to move next panel to right of previous
				'position': width * 2,
				// set the move value to the panel based on width of the current panels
				'move': '-' + width * 2,
				// set currentPanel
				'currentPanel': next
			});

			// animate
			self.animate();
		},

		prev: function() {
			var self = this,
				currentPanel = self.model.get('currentPanel'),
				max = self.model.get('max'),
				next = currentPanel - 1;

			// set next to last slide if this is the first slide
			if (next === -1) {
				next = max - 1;
			}

			self.model.set({
				// set prev to currentPanel
				'prev': currentPanel,
				// set next
				'next': next,
				// set position to move next panel to left of previous
				'position': 0,
				// set the move value to the panel based on width of the current panels
				'move': 0,
				// set currentPanel
				'currentPanel': next
			});

			// animate
			self.animate();
		},

		/**
		 * Animates the panel to the set direction - Left or Right.
		 * @name PanelSet#animate
		 * @function
		 */
		animate: function() {
			var self = this,
				currentWidth = self.model.get('width'),
				nextPanel = self.model.get('next'),
				prevPanel = self.model.get('prev'),
				pos = self.model.get('position'),
				move = self.model.get('move');
				$panelSet = self.$panelSet;

			//XXX: (Sean) there's no reason to set the bg image on each panel on every animation
/*
			_.each(self.$('.panel'), function(panel) {
				$(panel).css({
					'background-image': 'url(' + $(panel).data('background') + ')',
					'background-position': 'center top'
				});
			});
			*/

			// set clickable to false
			self.model.set('clickable', false);

			// move next panel to right of previous
			$panelSet.children(':eq(' + nextPanel + ')').css({
				left: pos,
				display: 'block'
			});

			//panelSet.css('transform', 'translateX(' + $(this).index() * -currentWidth + 'px)');
			$panelSet.animate({
				left: move
			}, 500, function() {
				// after animation reset panelSet position
				$panelSet.css({
					left: '-' + currentWidth + 'px'
				});

				// reset and show next
				$panelSet.children(':eq(' + nextPanel + ')').css({
					left: currentWidth,
					zIndex: 5
				});

				// reset previous panel
				$panelSet.children(':eq(' + prevPanel + ')').css({
					left: currentWidth,
					display: 'none',
					zIndex: 0
				});

				// set clickable to true
				self.model.set('clickable', true);
			});
		},

		/**
		 * Go directly to a panel instead of animating
		 * @name PanelSet#goToPanel
		 * @function
		 */
		goToPanel: function() {
			var self = this;
			// alert("!goToPanel");
			self.$allPanels.hide().eq(self.model.get('currentPanel')).fadeIn();
		},

		/**
		 * Sets value of parameter to stop keyboard event bubbling
		 * @name PanelSet#setAllowed
		 * @function
		 */
		setAllowed: function() {
			allowed = true;
		},

		pause: function() {
			var self = this;
			if (self.model.playInterval) {
				clearInterval(self.model.playInterval);
				delete self.model.playInterval;
				self.trigger("pause");
			}
		},

		play: function() {
			var self = this;
			if (!self.model.playInterval && self.options.autoInterval) {
				self.model.autoInterval = self.options.autoInterval;
				self.model.playInterval = setInterval(function() {
					self.model.setDirection('next');
				}, self.model.autoInterval);
				self.trigger("play");
			}
		},

		togglePausePlay: function(event){
			this[(event.type === "mouseenter")? "pause" : "play"]();
		},

		/**
		 * Handles keyboard events for panels. Keys 'K' and 'J' are for navigating
		 * panels vertically. Keys 'Left' and 'Right' for navigation panels horizontally.
		 * @name PanelSet#handleKeyStrokes
		 * @event
		 * @param {MyEventObject} e
		 * @function
		 */
		handleKeyStrokes: function(e) {
			var self = this,
				keyname = e.keyName(),
				direction;

			if ((self.$el.is('.active-section') || self.$el.parents('section').hasClass('active-section')) && self.model.get('clickable') && (keyname == 'left' || keyname == 'right')) {
				if (self.model.get('max') === 1) return;

				if (!self.model.get('infinite')) {
					if (self.model.get('currentPanel') === 0) {
						if (keyname === 'left' && self.model.get('direction') === 'prev') return;
					}

					if ((self.model.get('currentPanel') + 1 === self.model.get('max')) && self.model.get('direction') === 'next') {
						if (keyname == 'right' && self.model.get('direction') === 'next') return;
					}
				}

				if (self.model.playInterval) {
					clearInterval(self.model.playInterval);
					self.model.playInterval = setInterval(function() {
						self.model.setDirection('next');
					}, self.model.autoInterval);
				}

				direction = (keyname == 'left') ? 'prev' : 'next';
				self.model.setDirection(direction);

				if (!self.model.get('infinite')) {
					if (self.model.get('currentPanel') === 0) {
						self.$('.page-turn-prev').hide();
					} else {
						self.$('.page-turn-prev').show();
					}

					if ((self.model.get('currentPanel') + 1 === self.model.get('max')) && self.model.get('direction') === 'next') {
						self.$('.page-turn-next').hide();
					} else {
						self.$('.page-turn-next').show();
					}
				}
			}

			// preventing bubbling keyboard events
			if (!allowed) return;
			allowed = false;

			// J and K key functions
			var setCurrentPanel = $('.active-section');
			var headerHeight = $('.wrapper header').height();
			var scrollToPos = setCurrentPanel.position().top - headerHeight;

			if (keyname === 'j' && setCurrentPanel.next().is('.panel-container')) {
				if (scrollToPos > $window.scrollTop()) {
					scrollToPos = setCurrentPanel.position().top;
				} else if (scrollToPos === self.prevScrollPos) {
					scrollToPos = setCurrentPanel.next().position().top - headerHeight;
				}

				$('html, body').animate({
					scrollTop: scrollToPos
				}, 800);

			} else if (keyname === 'k' && setCurrentPanel.prev().is('.panel-container')) {
				if (scrollToPos < $window.scrollTop()) {
					scrollToPos = setCurrentPanel.position().top;
				} else if (scrollToPos == self.prevScrollPos) {
					scrollToPos = setCurrentPanel.prev().position().top - headerHeight;
				}

				$('html, body').animate({
					scrollTop: scrollToPos
				}, 800);
			}

			self.prevScrollPos = scrollToPos;
		},

		/**
		 * Handles scroll events for panels
		 * @name PanelSet#handleScroll
		 * @function
		 */
		handleScroll: function() {
			var self = this,
				activePanel = $('.active-section'),
				wScrollPos = $window.scrollTop(),
				wInnerHeight = $window.height(),
				panelHeight = activePanel.outerHeight(true),
				panelTopPos = activePanel.position().top - wScrollPos,
				panelBtmPos = panelTopPos + panelHeight,
				newPanel;

			// checking if scrolling up or down and activating panels
			if (wScrollPos > self.currentScrollPos && panelBtmPos < parseInt(wInnerHeight / 2, 10)) {
				newPanel = activePanel.next();
				if (newPanel.hasClass('panel-container')) {
					activePanel.removeClass('active-section');
					newPanel.addClass('active-section');
				}
			} else if (wScrollPos < self.currentScrollPos && panelTopPos > parseInt(wInnerHeight / 2, 10)) {
				newPanel = activePanel.prev();
				if (newPanel.hasClass('panel-container')) {
					activePanel.removeClass('active-section');
					newPanel.addClass('active-section');
				}
			}

			self.currentScrollPos = wScrollPos;
		},

		/**
		 * Handles event for browser/window resize
		 * @name PanelSet#onResize
		 * @function
		 */
		onResize: function() {
			var self = this;

			clearTimeout(self.resizeTimer);

			self.resizeTimer = setTimeout(function() {
				self.$allPanels.each(function(i) {
					self.absolutize($(this));
				});
				self.panelSetAdjust();
			}, 100);
		},

		/**
		 * Adjusts the panel set and panels
		 * @name PanelSet#panelSetAdjust
		 * @function
		 */
		panelSetAdjust: function() {
			var self = this,
				width = self.model.get('width');

			self.$panelSet.css({
				'left': '-' + width + 'px',
				'width': width
			});

			self.$('.page-turner').css({
				'width': width,
				'margin-left': '-' + width / 2 + 'px'
			});
		},

		/**
		 * Handle left swipe events
		 * @name PanelSet#leftSwiper
		 * @function
		 */
		leftSwiper: function(e) {
			console.log('swipe left');
			this.swipe('left');
		},

		/**
		 * Handle right swipe events
		 * @name PanelSet#rightSwiper
		 * @function
		 */
		rightSwiper: function(e) {
			console.log('swipe right');
			this.swipe('right');
		},

		swipe: function(direction) {
			var self = this,
				infinite = self.model.get('infinite'),
				currentPanel = self.model.get('currentPanel'),
				max = self.model.get('max'),
				clickable = self.model.get('clickable');

			direction = (direction === 'left') ? 'next' : 'prev';

			if (max != 1 ){
				if (self.model.playInterval) {
					clearInterval(self.model.playInterval);
					self.model.playInterval = setInterval(function() {
						self.model.setDirection('next');
					}, self.model.autoInterval);
				}

				if (direction === 'next') {
					if (!infinite && ((currentPanel + 1) === max)) {
						return;
					}
				}

				if (direction === 'prev') {
					if (!infinite && (currentPanel === 0)) {
						return;
					}
				}

				if (clickable && has.touch) {
					self.model.setDirection(direction);
				}
			}
		},

		handleTabNavs: function(evt) {
			var self = this,
				$el = self.$(evt.currentTarget),
				data = $el.data(),
				background = data['background'],
				transition = $.support.transition,
				currentPanel = $el.parents('section.panel'),
				currentNav = $el.parents('.nav-options'),
				currentHeader = currentPanel.find('.page-header'),
				currentContent = $el.parents('.page-content'),
				panelBackground = currentPanel.children('.panel-background'),
				navColor = data.navBackgroundClass ? _.contains(data.navBackgroundClass.split(' '), 'light') : undefined,
				headerColor = data.headerBackgroundClass ? _.contains(data.headerBackgroundClass.split(' '), 'light') : undefined,
				contentColor = data.textBackgroundClass ? _.contains(data.textBackgroundClass.split(' '), 'light') : undefined;

			function next() {
				console.debug('end of the transition')

				currentPanel.css('background-image', 'url(' + background + ')');
				panelBackground.toggleClass('in');
			}

			// if they clicked on the current tab, do nothing
			if ($el.hasClass('current-tab')) {
				return;
			}

			// if (background && panelBackground.length == 0) {
			// 	//currentPanel.append('<div class="panel-background fade in" style="background-position: center top;"></div>');
			// 	panelBackground = $(currentPanel.children('.panel-background')[0]);
			// 	console.log(panelBackground)
			// }

			if (background) {
				if (transition) {
					console.log($.support.transition.end)
					panelBackground.one($.support.transition.end, next);

					console.log(panelBackground)

					console.log('css transition')

					panelBackground.css({
						'background-image': 'url(' + background + ')'
					});


					panelBackground.toggleClass('in');
				} else {
					console.log('dom animated')
					panelBackground.css({
						'background-image': 'url(' + background + ')',
						'display': 'none'
					}).stop(true, true).fadeIn({
						complete: function(el) {
							end();
						},
						duration: 333,
						queue: true
					});
				}

				self.$('.current-tab').removeClass('current-tab');
				$el.addClass('current-tab');
			}

			if (navColor !== undefined) {
				(navColor) ? currentNav.removeClass('dark').addClass('light') : currentNav.removeClass('light').addClass('dark');
			}
			if (headerColor !== undefined) {
				(headerColor) ? currentHeader.removeClass('dark').addClass('light') : currentHeader.removeClass('light').addClass('dark');
			}
			if (contentColor !== undefined) {
				(contentColor) ? currentContent.removeClass('dark').addClass('light') : currentContent.removeClass('light').addClass('dark');
			}
		},

		customPanelDisclaimers: function(panel) {
			var panelHtml = panel.html(),
				customDisclaimers = panel.attr('data-custom-disclaimer');

			_.each(customDisclaimers.split(','), function(disc) {
				var d = disc.replace(/[\[\]']+/g, ''),
					name = d.split(':')[0],
					numb = d.split(':')[1],
					re = new RegExp("data-disclaimer=&quot;" + name + "&quot;>(.*?)</a>", "g"),
					re2 = new RegExp("data-disclaimer=&quot;" + name + "&quot;&gt;(.*?)&lt;/a&gt;", "g"),
					re3 = new RegExp("data-disclaimer=\"" + name + "\"(.*?)</a>", "g");

				panelHtml = panelHtml.replace(re, "data-disclaimer=&quot;" + numb + "&quot;><sup>" + numb + "</sup></a>");
				panelHtml = panelHtml.replace(re2, "data-disclaimer=&quot;" + numb + "&quot;><sup>" + numb + "</sup></a>");
				panelHtml = panelHtml.replace(re3, "data-disclaimer=" + numb + "><sup>" + numb + "</sup></a>");
			});

			panel.html(panelHtml);
		}

	});

	return PanelSet;

});