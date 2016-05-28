angular.module('angular-skynet').directive('quocgiasSearchBox', function() {
	var controller = function ($scope, Skynet) {
			$scope.page_ui = Skynet.settings.quocgias.ui;
	};
  return {
    restrict: 'E',
    scope: {
    	itemsCount: '=',
    	itemsTotalCount: '='
    },
    controller: controller,
    templateUrl: 'client/_partials/dir_quocgias_searchBox.html'
  };
});