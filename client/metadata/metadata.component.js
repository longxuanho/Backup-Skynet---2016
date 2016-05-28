angular.module('angular-skynet').directive('metadata', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/metadata/metadata.html',
        scope: {
            data: '='
        },
        controller: function($scope, $stateParams, $reactive, skynetHelpers) {
            // $reactive(this).attach($scope);


            // ***************************************************
            // INITIALIZE
            // ***************************************************

            $scope._helpers = skynetHelpers.helpers;

        }
    }
});
