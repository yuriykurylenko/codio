Momentum = {};

Momentum.rest = function(name, baseUrl, app) {
    app.service( name , ['$http', function($http) {
        return {
            _http: function() {
                var last = arguments.length - 1,
                    method = arguments[0],
                    callback = arguments[last];

                if (_.isObject(arguments[1])) {
                    var data = arguments[1];
                }

                if (!_.isFunction(callback)) {
                    throw new Error(name + 'Rest.' + method + '(): first parameter should be a Function!');
                }

                var requestObject = { 
                    method: method.toUpperCase(), 
                    url: baseUrl 
                }
                if (data) { 
                    requestObject.data = data;
                }

                $http(requestObject).success(function(data) {
                    callback(data);
                }).error(function(html, statusCode) {
                    throw new Error('"' + baseUrl + '" responded with status code ' + statusCode);
                });                 
            },

            get: function(callback) {
                var args = Array.prototype.slice.call(arguments, 0);
                this._http.apply( this, _.union(['get'], args) );
            },

            post: function(data, callback) {
                var args = Array.prototype.slice.call(arguments, 0);
                this._http.apply( this, _.union(['post'], args) );
            }

            // put, delete
        }
    }]);
}