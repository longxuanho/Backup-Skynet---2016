angular.module('angular-skynet').directive('loaithongsokythuatsSearchBox', function() {
	var controller = function ($scope, Skynet) {
			$scope.page_ui = Skynet.settings.loaithongsokythuats.ui;
	};
  return {
    restrict: 'E',    
    scope: {
    	itemsCount: '=',
    	itemsTotalCount: '='
    },
    controller: controller,
    // template: '<div>@Directive</div>',
    templateUrl: 'client/_partials/dir_loaithongsokythuats_searchBox.html'
  };
});