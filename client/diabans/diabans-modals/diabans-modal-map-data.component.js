angular.module('angular-skynet').directive('diabansModalMapData', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/diabans/diabans-modals/diabans-modal-map-data.html',
        controllerAs: 'DiaBansModalMapData',
        scope: {
        	source: '='
        },
        controller: function($scope, $rootScope) {


        }
    }
});
