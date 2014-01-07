/**
 * @requires rit
 * @requires util/view
 */
define(['rit', 'util/view', 'util/i18n'], function(RIT, View, i18n) {

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
		events: {
			'click .page-turn-next': 'handleArrowClicks',
			'click .page-turn-prev': 'handleArrowClicks'
		},

		/**
		 * Default initializing function.
		 * @name PageTurner#initialize
		 * @function
		 */
		initialize: function() {
			var self = this;
			self.render();
		},

		/**
		 * Default render function for PageTurner view.
		 * @name PageTurner#render
		 * @function
		 */
		render: function() {
			var self = this,
				$el = self.$el,
				pHeight = parseInt($el.find('.panel').css('height'), 10),
				//pHeight = parseInt($el.css('height'), 10),
				// data is used to render the template
				data = ( i18n.lang == 'en' ) ? { prev: 'Previous', next: 'Next'	} : { prev: 'anterior', next: 'próximo'};

				arrows = _.template('<div class="page-turner"><a class="btn page-turn-prev is-on" href="#"><span class="page-turn-position">'+
					'<i class="icon-arrow-left-big"></i><span class="btn btn-page-turn-prev"></span><span class="btn page-turn-base-prev"></span>'+
					'<span class="btn page-turn-tip-prev"><%= prev %></span></span></a><a class="btn page-turn-next is-on" href="#"><span class="page-turn-position">'+
					'<i class="icon-arrow-right-big"></i><span class="btn page-turn-tip-next"><%= next %></span><span class="btn page-turn-base-next"></span>'+
					'<span class="btn btn-page-turn-next"></span></span></a></div>', data);

			if (self.$('.page-turner')) {
				self.$('.page-turner').remove();
			}

			$el.append(arrows);

			self.$('.page-turn-prev, .page-turn-next').css('height', pHeight);
			self.$('.page-turn-position').css('top', ((pHeight / 2) - 30));
			self.$('.page-turner').css({
				'width': self.model.get('width'),
				'margin-left': '-' + self.model.get('width') / 2 + 'px'
			});

			self.handleButtons();

			self.hideShowArrows();
		},

		/**
		 * Handle the click events for the page turner arrows
		 * @name PageTurner#handleArrowClicks
		 * @function
		 */
		handleArrowClicks: function(evt) {
			var self = this,
				arrow = self.$('.page-turn-prev, .page-turn-next'),
				direction;

			// To prevent the # links
			evt.preventDefault();

			if (self.model.playInterval) {
				clearInterval(self.model.playInterval);
				self.model.playInterval = setInterval(function() {
					self.model.setDirection('next');
				}, self.model.autoInterval);
			}

			if (self.model.get('clickable')) {
				direction = $(evt.currentTarget).hasClass('page-turn-prev') ? 'prev' : 'next';

				self.model.setDirection(direction);
			}

			self.hideShowArrows();
		},

		hideShowArrows: function() {
			var self = this,
				currentPanel = self.model.get('currentPanel');

			if (!self.model.get('infinite')) {
				if (currentPanel === 0) {
					self.$('.page-turn-prev').hide();
				} else {
					self.$('.page-turn-prev').show();
				}

				if ((currentPanel + 1 === self.model.get('max')) && self.model.get('direction') === 'next') {
					self.$('.page-turn-next').hide();
				} else {
					self.$('.page-turn-next').show();
				}
			}
		},

		/**
		 * Fade the prev arrow button
		 * @name PageTurner#fadePrevButton
		 * @function
		 */
		fadeButton: function(order) {
			var self = this, pt = self.PageTurners;
			self[order+"FadeTo"] = setTimeout(function() {
				pt.arrows[order].removeClass('white');
				pt.buttons[order].fadeOut();
			}, 1000);
		},

		/**
		 * Handle the hover events for the page turner arrows
		 * @name PageTurner#handleButtons
		 * @function
		 */
		handleButtons: function() {
			var self = this;

			function hMouseEnter(event,order) {
				var pt = self.PageTurners, obj = {},
					dir = (order==="prev")? "left" : "right";
				clearTimeout(self[order+"FadeTo"]);
				pt.arrows[order].addClass("white");
				pt.buttons[order].show();
				pt.tips[order].show();
				pt.base[order].show();
				obj["margin-"+dir] = 0;
				pt.tips[order].stop()
					.animate(obj,200);
			}

			function hMouseLeave(event,order) {
				var pt = self.PageTurners, obj = {},
					dir = (order==="prev")? "left" : "right";
				clearTimeout(self[order+"FadeTo"]);
				obj["margin-"+dir] = -1 * pt.tips[order].outerWidth() +"px";
				pt.tips[order].stop().animate(obj, 200, function() {
					self.fadeButton(order);
					pt.tips[order].hide();
					pt.base[order].hide();
				});
			}

			self.PageTurners = {
				tips: { // self.prevTip, self.nextTip
					prev: self.$('.page-turn-tip-prev').hide(),
					next: self.$('.page-turn-tip-next').hide()
				},
				base: { // self.prevBase, self.nextBase
					prev: self.$('.page-turn-base-prev').hide(),
					next: self.$('.page-turn-base-next').hide()
				},
				buttons: { // self.prevBtn, self.nextBtn
					prev: self.$('.btn-page-turn-prev').hide(),
					next: self.$('.btn-page-turn-next').hide()
				},
				arrows: { // self.prevArrow, self.nextArrow
					prev: self.$('.icon-arrow-left-big'),
					next: self.$('.icon-arrow-right-big')
				}
			};

			var cssMargin = -1 * self.PageTurners.buttons.prev.width();
			self.PageTurners.tips.next.css('margin-right', cssMargin);
			self.PageTurners.tips.prev.css('margin-left', cssMargin);

			self.$('.page-turn-prev').hover(
				function(event) {
					hMouseEnter(event,"prev");
				}, function(event) {
					hMouseLeave(event,"prev");
				});
			//.trigger("mouseleave",["prev"]);

			self.$('.page-turn-next').hover(
				function(event) {
					hMouseEnter(event,"next");
				}, function(event) {
					hMouseLeave(event,"next");
				});
			//.trigger("mouseleave",["next"]);
		}

	});

	// Return public interface
	return PageTurner;

});