/**
 * @requires rit
 */
define(['rit'], function(RIT) {

	var $ = RIT.$,
		FlyoutFormView;

	var FlyoutForm = function() {

		var option, qs = location.search;

		function showForm(formType) {
			if (FlyoutFormView) {
				FlyoutFormView.showForm(formType);
			} else {
				require(['flyoutFormViews/app-view'], function(View) {
					FlyoutFormView = new View();
                    FlyoutFormView.showForm(formType);
				});
			}
		}

		this.onFlyoutClick = function(e) {
            var target = $(e.currentTarget);

			showForm({
				formType: target.data('flyout-form'),
				modelCode: target.data('model-code'),
                modelYear: target.data('model-year'),
				dealerCode: target.data('code'),
				trimId: target.data('trim-id'),
				formSelectorType:target.data('flyout-form-selector'),
				formOption: option,
				eventTarget : e.currentTarget
			});
			return false;
		};

		switch (true) { // Launch flyouts based on querystring.
			case (/raq=(\w+)|go=raq/).test(qs):
				option = RegExp.$1.toUpperCase();
				this.onFlyoutClick({
					currentTarget: ".shopping-tools-links .request-quote"
				});
				break;
		}

	};

	return new FlyoutForm();

});