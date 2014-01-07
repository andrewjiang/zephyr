define(['rit', 'util/model'], function(RIT, Model) {

    var $ = RIT.$,
        _ = RIT._;

    var PanelState = Model.extend({
        defaults: {
            'clickable': true,
            'next': 0,
            'prev': 0,
            'number': 0,
            'currentPanel': 0
        },
        
        setDirection: function(direction) {
            var self = this;

            self.set('direction', direction);

            self.trigger('animate');
        },
        
        setPanel: function(index) {
            var self = this;

            self.set('currentPanel', index);

            self.trigger('goToPanel');
        }
    });

    return PanelState;
});