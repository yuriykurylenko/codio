var codioApp = angular.module('Codio', []);


codioApp.service('contactsService', ['$http', function($http) {
    return {
        get: function(callback) {
        	if (_.isFunction(callback)) {
	            $http(
	                { method: 'GET', url: '/contacts' }
	            ).success(function(data) {
	                callback(data);
	            }).error(function(html, statusCode) {
	                throw new Error('"/contacts" responded with status code ' + statusCode);
	            });
	        } else {
	        	throw new Error('contactsService.get(): first parameter should be a function!');
	        }
        }
    }
}]);

codioApp.controller('TeamCreateCtrl', ['$scope', 'contactsService', function($scope, contactsService) {
	$scope.text = 'It works!';

	contactsService.get(function(data) {
		$scope.contacts = data;
	});
}]);