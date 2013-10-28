var codioApp = angular.module('Codio', []);

Momentum.rest('contacts', '/contacts', codioApp);
Momentum.rest('orgs', '/orgs', codioApp);
Momentum.rest('wsp', '/workspace', codioApp);


codioApp.controller('TeamCreateCtrl', ['$scope', 'contacts', 'orgs', 'wsp', 
 function($scope, contacts, orgs, wsp) {
    $scope.team = [];

    contacts.get(function(data) {
        $scope.contacts = data;
    });

    orgs.get(function(data) {
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
        wsp.post({
            name: $scope.name, 
            org_id: Number($scope.organization)
            //, $scope.team
        }, function(data) {
            console.log(data);
        });
    }
}]);