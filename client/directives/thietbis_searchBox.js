angular.module('angular-skynet').directive('thietbisSearchBox', function() {
  var controller = function ($scope, Skynet) {
      $scope.page_ui = Skynet.settings.thietbis.ui.list.general;
  };
  return {
    restrict: 'E',
    scope: {
      itemsCount: '=',
      itemsTotalCount: '='
    },
    controller: controller,
    templateUrl: 'client/_partials/dir_thietbis_searchBox.html'
  };
});