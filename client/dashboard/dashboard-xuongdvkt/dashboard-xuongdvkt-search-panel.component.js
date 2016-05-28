angular.module('angular-skynet').directive('dashboardXuongdvktSearchPanel', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/dashboard/dashboard-xuongdvkt/dashboard-xuongdvkt-search-panel.template.html',
        scope: {
            pageOptions: '=',
            pageData: '='
        },
        controller: function($scope, $timeout) {

            // ***************************************************
            // INITIALIZE
            // ***************************************************

            $timeout(() => {
                $("#nav_quan_ly_search_panel .scrollable-area").scrollbar({
                    disableBodyScroll: true,
                    scrollx: false,
                    duration: 100
                });
            }, 1000);            

            // ***************************************************
            // SUBSCRIBE
            // ***************************************************

            // ***************************************************
            // REACTIVE HELPERS
            // ***************************************************

            $scope.helpers({
            });
            

            // ***************************************************
            // METHODS
            // ***************************************************
            $scope.methods = {
                selectSuaChua: function(id) {
                	if ($scope.pageData.source.selectedSuaChuaId !== id)
						$scope.pageData.source.selectedSuaChuaId = id;
					else
						$scope.pageData.source.selectedSuaChuaId = '';
                }
            }

            // ***************************************************
            // UTILS
            // ***************************************************


            // ***************************************************
            // WATCHERS
            // ***************************************************


        }
    }
});