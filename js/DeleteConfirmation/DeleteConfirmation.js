define([
    'text!./DeleteConfirmation.html',
    'css!styles/building_blocks/confirm.css',
], function (template) {
    return Backbone.View.extend({

        template: _.template(template),

        initialize: function (options) {
            this.options = options;
            this.render();
        },

        render: function (options) {
            this.$el.html(this.template(this.options));
            this.$el.find('.cancel-button').on('click', function (e) {
                e.preventDefault();
                this.remove();
            }.bind(this));
            this.$el.find('.delete-button').on('click', function (e) {
                e.preventDefault();
                this.options.deleteCallback();
            }.bind(this));
        }

    });
});