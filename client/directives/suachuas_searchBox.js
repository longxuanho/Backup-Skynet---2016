angular.module('angular-skynet').directive('suachuasSearchBox', function() {
	var controller = function ($scope, Skynet) {
			$scope.page_ui = Skynet.settings.suachuas.ui.search;
	};
  return {
    restrict: 'E',    
    scope: {
    	itemsCount: '=',
    	itemsTotalCount: '='
    },
    controller: controller,
    templateUrl: 'client/_partials/dir_suachuas_searchBox.html'
  };
});