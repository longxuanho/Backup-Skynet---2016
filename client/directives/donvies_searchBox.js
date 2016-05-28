angular.module('angular-skynet').directive('donviesSearchBox', function() {
    var controller = function($scope, Skynet) {
        $scope.page_ui = Skynet.settings.donvies.ui;
    };
    return {
        restrict: 'E',
        scope: {
            itemsCount: '=',
            itemsTotalCount: '='
        },
        controller: controller,
        templateUrl: 'client/_partials/dir_donvies_searchBox.html'
    };
});
