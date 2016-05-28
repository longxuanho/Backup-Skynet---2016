angular.module('angular-skynet').directive('thongkesList', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/thongkes/thongkes-list/thongkes-list.html',
        controllerAs: 'thongkesList',
        controller: function($scope, $reactive, skynetHelpers, i18nService) {
            // $reactive(this).attach($scope);


            // ***************************************************
            // INITIALIZE
            // ***************************************************

            $scope._helpers = skynetHelpers.helpers;
            $scope._data = skynetHelpers.data;

            $scope._helpers.initUIGrid($scope);
            $scope._helpers.initNewUiGridStateParams($scope);

            $scope.perPage = 0;
            $scope.orderProperty = '1';

            i18nService.setCurrentLang('vi');


            // ***************************************************
            // REACTIVE HELPERS
            // ***************************************************

            $scope.helpers({
                thietbis: () => {
                    return ThietBis.find({}, {
                        sort: $scope.sort
                    });
                },
                users: () => {
                    return Meteor.users.find({});
                },
                userSettings: () => {
                    return UserSettings.find({});
                },
                thietbisCount: () => {
                    return Counts.get('numberOfThietBis');
                },
                thietbisTotalCount: () => {
                    return Counts.get('numberOfThietBisTotal');
                },
                usersettingsCount: () => {
                    return Counts.get('numberOfUserSettings');
                },
                page: 1,
                sort: {
                    'ma_tb.ma_tb': 1
                },
                searchText: '',
                searchBy: 'ma_tb.ma_tb',
                isLoggedIn: () => {
                    return Meteor.userId() !== null;
                },
                currentUserId: () => {
                    return Meteor.userId();
                },
                isShowPublicUiGridStateOption: () => {
                    return Roles.userIsInRole(Meteor.userId(), ['admin', 'super-manager'], 'sky-project');
                }
            });


            // ***************************************************
            // SUBSCRIBE
            // ***************************************************

            $scope.subscribe('users');
            $scope.subscribe('thietbis', () => {
                return [{
                        limit: parseInt($scope.perPage),
                        skip: parseInt(($scope.page - 1) * $scope.perPage),
                        sort: $scope.sort
                    },
                    $scope.searchText,
                    $scope.searchBy
                ]
            });
            $scope.subscribe('usersettings', () => {
                return [{
                    'phan_loai': 'uigrid_state'
                }]
            });


            // ***************************************************
            // UTILS
            // ***************************************************

            $scope.addNewUiGridState = () => {
                let err = $scope._helpers.validateUser('can_upsert_uigrid_state');
                if (_.isEmpty(err)) {
                    err = $scope._helpers.validateUiGridStateForm($scope.newState);
                    if (_.isEmpty(err)) {
                        $scope._helpers.buildNewUiGridState($scope.newState, $scope.uiGrid.gridApi);
                        UserSettings.insert($scope.newState, (error, result) => {
                            if (error) {
                                toastr.error('Không thể tạo mới trạng thái này. ' + error.message + '.');
                                console.log('Error:', error);
                            } else {
                                $scope._helpers.initNewUiGridStateParams($scope);
                                toastr.success('Trạng thái được tạo mới thành công.');
                                console.log('Trạng thái mới:', result);
                            }
                        });

                    } else {
                        toastr.error(err.message);
                    }
                } else {
                    toastr.error(err.message);
                }
            };

            $scope.removeUiGridState = (state) => {
                let err = $scope._helpers.validateUser('can_delete_uigrid_state');
                if (_.isEmpty(err)) {

                    UserSettings.remove({
                        _id: state._id
                    }, (error) => {
                        if (!error)
                            toastr.info('Trạng thái "' + state.ten + '" đã được gỡ bỏ khỏi hệ thống.')
                        else {
                            toastr.error(error.message);
                            console.error('có lỗi xảy ra: ' + error.message);
                        }
                    });

                } else {
                    toastr.error(err.message);
                }
            }

            $scope.restoreUiGridDefaultState = () => {

            };

            $scope.loadUiGridState = (item) => {
                $scope.uiGrid.gridApi.saveState.restore($scope, item);
            };




            // ***************************************************
            // WATCHERS
            // ***************************************************
            $scope.$watch('thietbisCount', (newVal) => {
                console.log('changed!', newVal);
                $scope.uiGrid.setData($scope.thietbis);
            });
        }
    }
});
