angular.module('angular-skynet').directive('dashboardXuongdvktRealtimeClock', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/dashboard/dashboard-xuongdvkt/dashboard-xuongdvkt-realtime-clock.html',
        controller: function($scope, $interval) {

            // ***************************************************
            // INITIALIZE
            // ***************************************************
            $scope.now = {
                isTicking: true,
                time: {
                    hour: '',
                    minute: '',
                    range: ''
                },
                date: ''                
            }

            // ***************************************************
            // SUBSCRIBE
            // ***************************************************

            // ***************************************************
            // REACTIVE HELPERS
            // ***************************************************
            

            // ***************************************************
            // METHODS
            // ***************************************************
            let stopTime = $interval(() => {
                $scope.now.isTicking = !$scope.now.isTicking;
                $scope.now.time.hour = moment().format('hh');
                $scope.now.time.minute = moment().format('mm');
                $scope.now.time.range = moment().format('A');
                $scope.now.date = moment().format('dddd, [ngày] DD [tháng] MM [năm] YYYY');
            }, 2000);

            // ***************************************************
            // UTILS
            // ***************************************************


            // ***************************************************
            // WATCHERS
            // ***************************************************
            $scope.$on('$destroy', function() {
                $interval.cancel(stopTime);
            });

        }
    }
});