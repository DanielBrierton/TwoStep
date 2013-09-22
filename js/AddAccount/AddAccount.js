define([
    'text!./AddAccount.html',
    'css!./AddAccount.css',
    'css!styles/building_blocks/input_areas.css',
    'css!styles/building_blocks/buttons.css'
], function (template) {

    return Backbone.View.extend({

        template: _.template(template),

        initialize: function (options) {
            this.accountCollection = options.accountCollection;
            this.options = options;
            this.render();
        },

        render: function () {
            this.$el.html(this.template());
            this.$el.find('.save-button').on('click', this.saveAccount.bind(this));
            this.$el.find('.cancel-button').on('click', this.cancel.bind(this));
        },

        saveAccount: function (e) {
            e.preventDefault();
            var accountName = this.$el.find('.account-name').val();
            var secret = this.$el.find('.secret').val();
            this.accountCollection.create({
                accountName: accountName,
                secret: secret
            });
            //this.accountCollection.localStorage.save();
            this.options.callback();
        },

        cancel: function (e) {
            e.preventDefault();
            this.options.callback();
        }

    });
});