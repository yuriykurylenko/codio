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

// TODO: No code duplication!
codioApp.service('orgsService', ['$http', function($http) {
    return {
        get: function(callback) {
            if (!_.isFunction(callback)) {
                throw new Error('orgsService.get(): first parameter should be a Function!');
            }

            
            $http(
                { method: 'GET', url: '/orgs' }
            ).success(function(data) {
                callback(data);
            }).error(function(html, statusCode) {
                throw new Error('"/orgs" responded with status code ' + statusCode);
            });
        }
    }
}]);

codioApp.service('wspService', ['$http', function($http) {
    return {
        post: function(data, callback) {
            if (!_.isFunction(callback)) {
                throw new Error('wspService.post(): second parameter should be a Function!');
            }

            $http(
                { method: 'POST', url: '/workspace', data: data }
            ).success(function(data) {
                callback(data);
            }).error(function(html, statusCode) {
                throw new Error('"/orgs" responded with status code ' + statusCode);
            });
        }
    }   
}]);

codioApp.controller('TeamCreateCtrl', 
['$scope', 'contactsService', 'orgsService', 'wspService', 
 function($scope, contactsService, orgsService, wspService) {
    $scope.team = [];

    contactsService.get(function(data) {
        $scope.contacts = data;
    });

    orgsService.get(function(data) {
        $scope.orgs = data;
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
        wspService.post({
            name: $scope.name, 
            org_id: Number($scope.organization)
            //, $scope.team
        }, function(data) {
            console.log(data);
        });
    }
}]);