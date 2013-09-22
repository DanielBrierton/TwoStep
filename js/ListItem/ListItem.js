define([
    '../DeleteConfirmation/DeleteConfirmation',
    '../utils/totp',
    'text!./ListItem.html',
    'css!./ListItem.css'
], function (DeleteConfirmation, totp, template) {
    return Backbone.View.extend({

        template: _.template(template),

        className: 'list-item',

        initialize: function (options) {
            this.model = options.model;
            this.options = options;
            this.render();
        },

        render: function () {
            this.longTouch = false;
            var startX;
            var startY;
            this.$el.on('touchstart', function (e) {
                console.log(e);
                this.longTouchTimeout1 = setTimeout(function () {
                    this.$el.css({
                        'transition': 'background-color 0.6s linear',
                        backgroundColor: '#0095DD'
                    });
                }.bind(this), 400);
                this.longTouchTimeout2 = setTimeout(function () {
                    var deleteConfirmation = new DeleteConfirmation({
                        deleteCallback: this.deleteAccount.bind(this)
                    });
                    this.$el.append(deleteConfirmation.el);
                }.bind(this), 1000);
            }.bind(this));
            this.$el.on('touchmove', function () {

            });
            this.$el.on('touchmove touchend', function () {
                this.$el.css({
                    'transition': 'background-color 0.1s linear',
                    backgroundColor: 'transparent'
                });
                if (this.longTouchTimeout1) {
                    clearTimeout(this.longTouchTimeout1);
                }
                if (this.longTouchTimeout2) {
                    clearTimeout(this.longTouchTimeout2);
                }
            }.bind(this));
            this.$el.html(this.template(this.model.toJSON()));
            var canvas = this.$el.find('.thirty')[0];
            var context = canvas.getContext('2d');
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.font = '24px Fira Sans';

            var x = canvas.width / 2;
            var y = canvas.height / 2;
            var radius = 30;
            var startAngle = (-0.5) * Math.PI;
            var endAngle = 1.9 * Math.PI;
            var counterClockwise = false;
            var timeForCode;
            
            setInterval(function () {
                var now = new Date();
                var secs = 30 - (now.getSeconds() % 30);
                var spinnerPosition = (now.getTime() % 30000)/15000;
                var radians = 1.5 - spinnerPosition;
                var newTimeForCode = Math.floor(now.getTime() / 30000);
                if (timeForCode != newTimeForCode) {
                    timeForCode = newTimeForCode;
                    this.updateCode();
                }

                context.clearRect(0, 0, canvas.width, canvas.height);
                context.beginPath();
                context.arc(x, y, radius, startAngle, radians * Math.PI, counterClockwise);
                context.lineWidth = 5;

                // line color
                if (secs > 5) {
                    context.strokeStyle = '#FF9500';
                    context.fillStyle = '#FF9500';
                } else {
                    context.strokeStyle = 'red';
                    context.fillStyle = 'red';
                }
                context.stroke();

                context.fillText(secs, x, y);
            }.bind(this), 33);
        },

        deleteAccount: function () {
            //this.options.accountCollection.remove(this.model);
            this.model.destroy();
        },

        updateCode: function () {
            var code = 123456;
            if (this.model.get('secret')) {
                code = totp.generate(this.model.get('secret'));
            }
            this.$el.find('.auth-code').html(code);
        }

    });
});