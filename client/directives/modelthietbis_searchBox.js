angular.module('angular-skynet').directive('modelthietbisSearchBox', function() {
	var controller = function ($scope, Skynet) {
			$scope.page_ui = Skynet.settings.modelthietbis.ui;
	};
  return {
    restrict: 'E',
    scope: {
    	itemsCount: '=',
    	itemsTotalCount: '='
    },
    controller: controller,
    templateUrl: 'client/_partials/dir_modelthietbis_searchBox.html'
  };
});