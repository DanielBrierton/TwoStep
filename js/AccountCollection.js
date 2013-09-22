define(function () {
    return Backbone.Collection.extend({
        localStorage: new Backbone.LocalStorage('AccountCollection')
    });
});