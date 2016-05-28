angular.module('angular-skynet').directive('cauhoisSidebarManageTags', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/directives/skynet/cauhoiSidebar/cauhois-sidebar-manage-tags.template.html',
        controllerAs: 'vm',
        bindToController: true,
        scope: {
            nhomtbs: '=',
        	dictionary: '=',
            options: '='
        },
        controller: function($scope, $rootScope, skynetHelpers, $state, $timeout, $reactive, skynetDictionary, iNotifier) {

            $reactive(this).attach($scope);

            // ***************************************************
            // INITIALIZE
            // ***************************************************

            // Capture 'this contex - Refer to https://github.com/johnpapa/angular-styleguide#controlleras-with-vm
            let vm = this;

            vm._helpers = skynetHelpers.helpers;
            vm._helpers.initNewDataHelperParams(vm, 'cauhois', 'tags', 'thiet_bi_nang');
            console.log('init: ', vm.newDataHelper);

            vm.modalOptions = {
                kOptions: {
                    dataSource: [
                        { productName: "Tea", category: "Beverages" },
                        { productName: "Coffee", category: "Beverages" },
                        { productName: "Ham", category: "Food" },
                        { productName: "Bread", category: "Food" }
                    ],
                    columns: [
                        { field: "productName" },
                        { field: "category" }
                    ]
                    // dataSource: new kendo.data.DataSource({
                    //     data: [],
                    //     pageSize: 10
                    // }),
                    // columns: [
                    //     {
                    //         field: "data.value.group",
                    //         title: "Phân loại"
                    //     }, {
                    //         field: "data.value.ten",
                    //         title: "Tên"
                    //     }]                    
                }
            }

            let myAlert = $('.suachua_alert');
            myAlert.hide();

            // ***************************************************
            // REACTIVE HELPERS
            // ***************************************************

            vm.helpers({
                // datahelpers: () => {
                //     let data = DataHelpers.find({
                //         'section': 'cauhois',
                //         'field': 'tags',
                //         'data.subject': vm.nhomtbs.ten
                //     }).fetch();
                //     try {
                //         vm.modalOptions.kOptions.dataSource.data(data);
                //     } catch (error) {
                //         console.log("Error: ", error);
                //     }
                //     return DataHelpers.find({
                //         'section': 'cauhois',
                //         'field': 'tags',
                //         'data.subject': vm.nhomtbs.ten 
                //     });
                // }
            });

            // ***************************************************
            // SUBSCRIBE
            // ***************************************************

            // $scope.subscribe('suachuas');

            // ***************************************************
            // UTILS
            // ***************************************************

            vm.utils = {
                addDataHelper: () => {
                    let err = vm._helpers.validateUser('can_upsert_datahelpers');
                    if (_.isEmpty(err)) {
                        err = vm._helpers.validateDataHelperForm(vm.newDataHelper);
                        if (_.isEmpty(err)) {

                            vm._helpers.buildNewDataHelper(vm.newDataHelper);
                            DataHelpers.insert(vm.newDataHelper, (error, result) => {
                                if (error) {
                                    iNotifier.error('Không thể tạo mới dữ liệu này. ' + error.message + '.');
                                } else {
                                    $scope.$apply( () => {
                                        vm._helpers.initNewDataHelperParams(vm, 'cauhois', 'tags', 'thiet_bi_nang');
                                    });                        
                                    iNotifier.success('Dữ liệu được tạo mới thành công.');
                                }
                            });

                        } else {
                            iNotifier.error(err.message);
                        }
                    } else {
                        iNotifier.error(err.message);
                    }
                },
                resetDataHelper: function() {
                    angular.copy(vm.master, vm.source);
                },
                saveDataHelper: function() {
                    let err = vm._helpers.validateUser('can_upsert_datahelpers');
                    if (_.isEmpty(err)) {
                        err = vm._helpers.validateDataHelperForm(vm.source);
                        if (_.isEmpty(err)) {

                            vm._helpers.buildDataHelper(vm.source);
                            DataHelpers.update({
                                _id: vm.id
                            }, {
                                $set: {
                                    'data': vm.source.data
                                }
                            }, (error) => {
                                if (error) {
                                    iNotifier.error('Không thể cập nhật dữ liệu này. ' + error.message + '.');
                                } else {
                                    iNotifier.success('Dữ liệu được cập nhật thành công.');
                                }
                            });
                        } else {
                            iNotifier.error(err.message);
                        }
                    } else {
                        iNotifier.error(err.message);
                    }
                },
                
            }


            // ***************************************************
            // WATCHERS
            // ***************************************************

        }
    }
});
