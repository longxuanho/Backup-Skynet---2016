angular.module('angular-skynet').directive('suachuasMain', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/suachuas/suachuas-main/suachuas-main.html',
        // controllerAs: 'vm',
        controller: function($scope, skynetHelpers, $rootScope, $state, $stateParams, iNotifier) {


            // ***************************************************
            // INITIALIZE
            // ***************************************************

            $rootScope.searchText = '';
            $rootScope.searchBy = 'noi_dung.noi_dung';
            $rootScope.orderProperty = '1';

            $scope._helpers = skynetHelpers.helpers;
            $scope._data = skynetHelpers.data;

            $scope.perPage = 0;
            $scope.page = 1;
            $scope.orderProperty = '1';
            $scope.sort = {
                'order': 1
            };


            // ***************************************************
            // REACTIVE HELPERS
            // ***************************************************

            $scope.helpers({
            });


            // ***************************************************
            // SUBSCRIBE
            // ***************************************************

            $scope.subscribe('users');
            $scope.subscribe('usersettings');

            
            // ***************************************************
            // METHODS
            // ***************************************************

            $scope.removeCauHois = (cauhoi) => {
                let err = $scope._helpers.validateUser('can_delete_cau_hoi');
                if (_.isEmpty(err)) {

                    ThietBis.remove({
                        _id: cauhoi._id
                    }, (error) => {
                        if (!error) {
                            iNotifier.info('Dữ liệu câu hỏi "' + cauhoi._id + '" đã được gỡ bỏ khỏi hệ thống.');
                            // $state.go('cauhois.list');
                        } else {
                            iNotifier.error(error.message);
                        }
                    });
                } else {
                    iNotifier.error(err.message);
                }
            }


            // ***************************************************
            // WATCHERS
            // ***************************************************

            $scope.pageChanged = (newPage) => {
                $scope.page = newPage;
            };

            $scope.updateSort = () => {
                $scope.sort = {
                    'ten': parseInt($scope.orderProperty)
                }
            };

            $rootScope.$watch('orderProperty', (newVal) => {
                $scope.sort = {
                    'ten': parseInt(newVal)
                }
            });



        }
    }
});
