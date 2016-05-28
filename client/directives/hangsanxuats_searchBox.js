angular.module('angular-skynet').directive('hangsanxuatsSearchBox', function() {
	var controller = function ($scope, Skynet) {
			$scope.page_ui = Skynet.settings.hangsanxuats.ui;
	};
  return {
    restrict: 'E',    
    scope: {
    	itemsCount: '=',
    	itemsTotalCount: '='
    },
    controller: controller,
    // template: '<div>@Directive</div>',
    templateUrl: 'client/_partials/dir_hangsanxuats_searchBox.html'
  };
});