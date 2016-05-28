angular.module('angular-skynet').directive('diabansSearchBox', function() {
	var controller = function ($scope, Skynet) {
			$scope.page_ui = Skynet.settings.diabans.ui;
	};
  return {
    restrict: 'E',
    scope: {
    	itemsCount: '=',
    	itemsTotalCount: '='
    },
    controller: controller,
    templateUrl: 'client/_partials/dir_diabans_searchBox.html'
  };
});