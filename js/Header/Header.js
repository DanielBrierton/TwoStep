define([
    'text!./Header.html',
    'css!styles/building_blocks/headers.css'
], function (template) {
    return Backbone.View.extend({

        template: _.template(template),

        initialize: function (options) {
            this.options = options;
            this.render();
        },

        render: function (options) {
            this.options = options || this.options;
            this.$el.html(this.template(this.options));
            for (var i = 0; i < this.options.menuItems.length; i++) {
                this.$el.find('.icon-' + this.options.menuItems[i].type).on('click', this.options.menuItems[i].click);
            }
        }

    });
});