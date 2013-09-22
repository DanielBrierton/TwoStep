define([
    './Header/Header',
    './ScrollView/ScrollView',
    './List/List',
    './AddAccount/AddAccount',
    './AccountCollection',
    './api/EventBus',
    'text!./TwoStep.html',
    'css!./TwoStep.css'
], function (Header, ScrollView, List, AddAccount, AccountCollection, EventBus, template) {
    return Backbone.View.extend({

        template: _.template(template),
        eventBus: new EventBus(),

        initialize: function () {
            this.accountCollection = new AccountCollection();
            this.accountCollection.fetch();
            this.menuItems = [{
                type: 'add',
                click: this.showAddAccount.bind(this)
            }, {
                type: 'i'
            }];
            this.render();
            window.onresize = function (e) {
                this.eventBus.trigger('resize', e);
            }.bind(this);
        },

        render: function () {
            this.$el.html(this.template());
            this.header = new Header({
                el: this.$el.find('#header'),
                title: 'TwoStep',
                menuItems: this.menuItems
            });
            this.list = new List({
                accountCollection: this.accountCollection
            });
            this.addAccount = new AddAccount({
                accountCollection: this.accountCollection,
                callback: this.showList.bind(this)
            });
            this.scrollView = new ScrollView({
                eventBus: this.eventBus,
                el: this.$el.find('#scroll'),
                view: this.list
            });
        },

        showAddAccount: function () {
            this.scrollView.changeView(this.addAccount);
            this.addAccount.render();
            this.header.render({
                title: 'Add Account',
                menuItems: []
            });
        },

        showList: function () {
            this.scrollView.changeView(this.list);
            this.list.render();
            this.header.render({
                title: 'TwoStep',
                menuItems: this.menuItems
            });
        }

    });
});