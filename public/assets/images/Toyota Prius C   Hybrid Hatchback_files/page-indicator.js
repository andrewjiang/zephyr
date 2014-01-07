/**
 * @requires rit
 * @requires util/view
 */
define(['rit', 'util/view'], function(RIT, View) {
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
			'click .page-indicator': 'handleClicks',
			'click .indicator ul li': 'handleNavClicks'
		};

	if (has.touch) {
		events = {
			'touchstart .page-indicator': 'handleClicks',
			'touchstart .indicator ul li': 'handleNavClicks'
		};
	}

	/**
	 * @class PageIndicator
	 * @extends util/view
	 */
	var PageIndicator = View.extend({

		events: events,

		/**
		 * Default initializing function.
		 * @name PageIndicator#initialize
		 * @function
		 */
		initialize: function() {
			var self = this;

			// listen for changes on the model to the currentPanel attribute and update the indicator
			self.model.on('change:currentPanel', function() {
				self.updateIndicator(self.model.get('currentPanel'));
			}, self);

			self.render();
		},

		/**
		 * Default render function for PageIndicator view.
		 * @name PageIndicator#render
		 * @function
		 */
		render: function() {
			var self = this,
				indicator = '<ul class="page-indicator"></ul>';

			self.$el.append(indicator);

			for (var i = self.model.get('max'); i >= 1; i--) {
				$('<li/>').appendTo(self.$el.find('.page-indicator'));
			}

			self.$('.page-indicator li').first().addClass('page-indicator-is-on');
		},

		/**
		 * Click event handler for updating the current panel to the indicator clicked
		 * @name PageIndicator#handleClicks
		 * @function
		 * @param {MyEventObject} (evt)
		 */
		handleClicks: function(evt, args) {
			var self = this,
				$currentTarget = $(evt.currentTarget),
				index = _.indexOf(self.$($currentTarget.find(evt.target.tagName)), evt.target),
				isCurrent = self.$('li', $currentTarget).eq(index).hasClass('page-indicator-is-on');

			if (self.model.playInterval) {
				clearInterval(self.model.playInterval);
				self.model.playInterval = setInterval(function() {
					self.model.setDirection('next');
				}, self.model.autoInterval);
			}

			if (index === -1 || isCurrent || args && args.silent) return; // if the user clicks somewhere outside of an li
			console.log("!!!!: ", index);
			self.model.setPanel(index);

			self.model.set('currentPanel', index);

			if (self.model.get('currentPanel') === 0) {
				self.$('.page-turn-prev').hide();
			} else {
				self.$('.page-turn-prev').show();
			}

			if ((self.model.get('currentPanel') + 1 === self.model.get('max')) ) {
				self.$('.page-turn-next').hide();
			} else {
				self.$('.page-turn-next').show();
			}
		},

		handleNavClicks: function(evt, args) {
			var self = this,
				$currentTarget = $(evt.currentTarget),
				index = _.indexOf($('li', $currentTarget.parent()), evt.currentTarget),
				isCurrent = self.$('li', $currentTarget).eq(index).hasClass('page-indicator-is-on');

			evt.preventDefault();

			if (self.model.playInterval) {
				clearInterval(self.model.playInterval);
				self.model.playInterval = setInterval(function() {
					self.model.setDirection('next');
				}, self.model.autoInterval);
			}

			if (index === -1 || isCurrent || args && args.silent) return; // if the user clicks somewhere outside of an li
			console.log("!!!!: ", index);
			self.model.setPanel(index);

			self.model.set('currentPanel', index);
		},
		/**
		 * Update the indicator to correspond to the current panel
		 * @name PageIndicator#updateIndicator
		 * @function
		 * @param {Object} index
		 */
		updateIndicator: function(index) {
			var self = this;

			// remove is-on class from the one that has it and add it to the new curent page
			self.$('.page-indicator li').removeClass('page-indicator-is-on').eq(index).addClass('page-indicator-is-on');

			// if there is an explore-nav then update to the current panel
			self.$('#explore-nav li').eq(index).trigger('click', [{
				silent: true
			}]);
		}
	});

	// Return public interface
	return PageIndicator;

});