angular.module('angular-skynet').directive('phanloaisSearchBox', function() {
	var controller = function ($scope, Skynet) {
		
		if (!$scope.currentPage || !_.contains(['nhoms', 'chungloais', 'loais'], $scope.currentPage))
			$scope.currentPage = 'nhoms';
		
		if ($scope.currentPage === 'nhoms')
			$scope.page_ui = Skynet.settings.phanloais.nhoms.ui;
		
		if ($scope.currentPage === 'chungloais')
			$scope.page_ui = Skynet.settings.phanloais.chungloais.ui;

		if ($scope.currentPage === 'loais')
			$scope.page_ui = Skynet.settings.phanloais.loais.ui;

	};
  return {
    restrict: 'E',
    scope: {
    	currentPage: '@',
    	itemsCount: '=',
    	itemsTotalCount: '='
    },
    controller: controller,
    templateUrl: 'client/_partials/dir_phanloais_searchBox.html'
  };
});