var codioApp = angular.module('Codio', []);


codioApp.service('contactsService', ['$http', function($http) {
    return {
        get: function(callback) {
        	if (!_.isFunction(callback)) {
				throw new Error('contactsService.get(): first parameter should be a Function!');
        	}

        	
	        $http(
	            { method: 'GET', url: '/contacts' }
	        ).success(function(data) {
	            callback(data);
	        }).error(function(html, statusCode) {
	            throw new Error('"/contacts" responded with status code ' + statusCode);
	        });
        }
    }
}]);

codioApp.controller('TeamCreateCtrl', ['$scope', 'contactsService', function($scope, contactsService) {
	$scope.team = [];

	contactsService.get(function(data) {
		$scope.contacts = data;
	});

	$scope.activate = function(contactId) {
		// No DOM manipulations in controllers!
		$('#contact' + contactId + ' > div').toggleClass('alert-success');
		if ($scope.team.indexOf(contactId) == -1) {
			$scope.team.push(contactId);
		} else {
			$scope.team = _.without($scope.team, contactId);
		}
	}

	$scope.create = function() {
		alert($scope.team);
	}
}]);