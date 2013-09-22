define([
    '../ListItem/ListItem',
    'css!styles/building_blocks/lists.css',
], function (ListItem) {
    return Backbone.View.extend({

        initialize: function (options) {
            this.accountCollection = options.accountCollection;
            this.accountCollection.on('all', this.render.bind(this));
            this.render();
        },

        render: function () {
            this.$el.html('');
            this.accountCollection.forEach(function (account) {
                var listItem = new ListItem({
                    model: account,
                    accountCollection: this.accountCollection
                });
                this.$el.append(listItem.el);
            }.bind(this));
        }

    });
});