define(function () {
    return Backbone.View.extend({

        initialize: function (options) {
            this.view = options.view;
            options.eventBus.on('resize', this.onResize.bind(this));
            this.render();
        },

        render: function () {
            this.$el.html('');
            this.$el.append(this.view.el);
            this.onResize();
        },

        onResize: function () {
            var height = window.innerHeight - this.$el.siblings().height();
            this.$el.height(height);
        },

        changeView: function (view) {
            this.view = view;
            this.render();
            this.view.render();
        }

    });
});