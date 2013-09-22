define(function () {
    return function () {
        var eventBus = {};
        _.extend(eventBus, Backbone.Events);
        return eventBus;
    };
});