angular.module('angular-skynet').directive('suachuasCreateNewSuaChua', function() {
    var controller = function($scope) {

        $scope.createNew = function() {
            $scope.createNewSuaChua()($scope.newSuaChua);
        }

    };
    return {
        restrict: 'E',
        scope: {
            thietbis: '=thietbisSelectsource',
            newSuaChua: '=datasource',
            createNewSuaChua: '&actionCreateNew'
        },
        controller: controller,
        templateUrl: 'client/_partials/dir_suachuas_createNewSuaChua.html'
    };
});
