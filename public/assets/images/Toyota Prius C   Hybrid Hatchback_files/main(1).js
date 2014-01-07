define(['rit', 
		'common/js/views/panel/panel', 
		'apps/vehicle-landing/js/models/panelstate', 
		'common/js/views/panels/panel-set',
		'text!./template.html'], 
	function(RIT, Panel, ModelPanelState, PanelSet, template) {

	var $ = RIT.$,
		_ = RIT._,
		Backbone = RIT.Backbone;


	var CustomPanel  =  Panel.extend({
		initialize: function() {
			var self= this;
			
			if (document.createStyleSheet){
                document.createStyleSheet('/apps/custom-panels/2013/prius-family/css/custom-panel.css');
            } else {
                $('<link rel="stylesheet" href="/apps/custom-panels/2013/prius-family/css/custom-panel.css" />').appendTo('head');
            }
			
			this.pageContent = this.$el.find('.page-content');
			self.constructor.__super__.initialize.apply(self);
		},
		render: function() {
			var self = this;
				this.pageContent.html(template);
			
			$('.page-header', self.$el).hide();
			self.options.background="/content/vehicle-landing/2013/prius/custom/prius-family/prius-family-panelbg-001.jpg";
			self.constructor.__super__.render.apply(self);			
		}
	});

	return CustomPanel;
});