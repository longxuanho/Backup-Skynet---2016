angular.module('angular-skynet').directive('thietbisMain', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/thietbis/thietbis-main/thietbis-main.html',
        controllerAs: 'ThietBisMain',
        controller: function($scope, skynetHelpers, $rootScope, $state, $stateParams, iNotifier) {


            // ***************************************************
            // INITIALIZE
            // ***************************************************

            // $rootScope.page_full_height = true;
            // $rootScope.headerDoubleHeightActive = true;

            $rootScope.searchText = '';
            $rootScope.searchBy = 'ma_tb.ma_tb';
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
                isLoggedIn: () => {
                    return Meteor.userId() !== null;
                },
                currentUserId: () => {
                    return Meteor.userId();
                },
            });


            // ***************************************************
            // SUBSCRIBE
            // ***************************************************

            $scope.subscribe('users');
            $scope.subscribe('nhoms');
            $scope.subscribe('chungloais');
            $scope.subscribe('loais');
            $scope.subscribe('donvis');
            $scope.subscribe('diabans');
            $scope.subscribe('quocgias');
            $scope.subscribe('hangsanxuats');
            $scope.subscribe('modelthietbis');
            $scope.subscribe('usersettings');
            $scope.subscribe('thietbis', () => {
                return [{
                        limit: parseInt($scope.getReactively('perPage')),
                        skip: parseInt(($scope.getReactively('page') - 1) * $scope.getReactively('perPage'))
                    },
                    $rootScope.getReactively('searchText'),
                    $rootScope.getReactively('searchBy')
                ]
            });


            // ***************************************************
            // METHODS
            // ***************************************************

            $scope.removeLoai = (loai) => {
                let err = $scope._helpers.validateUser('can_delete_thiet_bi');
                if (_.isEmpty(err)) {

                    ThietBis.remove({
                        _id: loai._id
                    }, (error) => {
                        if (!error) {
                            iNotifier.info('Thiết bị "' + loai.ten + '" đã được gỡ bỏ khỏi hệ thống.');
                            $state.go('thietbis.list');
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
