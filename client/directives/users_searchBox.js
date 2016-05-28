angular.module('angular-skynet').directive('usersSearchBox', function() {
    var controller = function($scope, Skynet) {
        $scope.page_ui = Skynet.settings.users.ui.list.search;
    };



    return {
        restrict: 'E',
        scope: {
            itemsCount: '=',
            itemsTotalCount: '='
        },
        controller: controller,
        templateUrl: 'client/_partials/dir_users_searchBox.html'
    };
});
