define(function() {
    /*
     * Based on the great work by russ at http://blog.tinisles.com/2011/10/google-authenticator-one-time-password-algorithm-in-javascript/
     */

    return {
        dec2hex: function(s) {
            return (s < 15.5 ? '0' : '') + Math.round(s).toString(16);
        },

        hex2dec: function(s) {
            return parseInt(s, 16);
        },

        base32tohex: function(base32) {
            var base32chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
            var bits = "";
            var hex = "";

            for (var i = 0; i < base32.length; i++) {
                var val = base32chars.indexOf(base32.charAt(i).toUpperCase());
                bits += this.leftpad(val.toString(2), 5, '0');
            }

            for (var j = 0; j + 4 <= bits.length; j += 4) {
                var chunk = bits.substr(j, 4);
                hex = hex + parseInt(chunk, 2).toString(16);
            }

            return hex;
        },

        leftpad: function(str, len, pad) {
            if (len + 1 >= str.length) {
                str = Array(len + 1 - str.length).join(pad) + str;
            }
            return str;
        },

        generate: function(secret) {
            var key = this.base32tohex(secret);
            var epoch = Math.round(new Date().getTime() / 1000.0);
            var time = this.leftpad(this.dec2hex(Math.floor(epoch / 30)), 16, '0');

            // external library for SHA functionality
            var hmacObj = new jsSHA(time, 'HEX');
            var hmac = hmacObj.getHMAC(key, 'HEX', 'SHA-1', 'HEX');

            var offset;
            if (hmac !== 'KEY MUST BE IN BYTE INCREMENTS') {
                offset = this.hex2dec(hmac.substring(hmac.length - 1));
            }

            var otp = (this.hex2dec(hmac.substr(offset * 2, 8)) & this.hex2dec('7fffffff')) + '';
            return otp.substr(otp.length - 6, 6);
        }
    };
});