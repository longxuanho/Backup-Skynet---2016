angular.module('angular-skynet').directive('dashboardSuachuasViewChart', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/dashboard/dashboard-suachuas/dashboard-suachuas-view-chart.template.html',
        controllerAs: 'vm',
        bindToController: true,

        controller: function($scope, $stateParams, $state, skynetHelpers, $rootScope, iNotifier, $reactive, skynetDictionary, variables, $timeout) {

            $reactive(this).attach($scope);

            // ***************************************************
            // INITIALIZE
            // ***************************************************

            // Capture 'this contex - Refer to https://github.com/johnpapa/angular-styleguide#controlleras-with-vm
            let vm = this;

            vm._data = skynetHelpers.data;
            vm._helpers = skynetHelpers.helpers;

            vm.pageOptions = {
                
            };

            vm.pageData = {
                suachuasRaw: [],
                suachuasDataSource: new kendo.data.DataSource({
                    data: [],
                    aggregate: [
                        { field: '_id', aggregate: 'count' }
                    ],
                    group: { 
                        field: 'phan_loai.loai_sua_chua.ten',
                        aggregates: [
                            { field: '_id', aggregate: "count" }
                        ]
                    },
                    sort: { field: 'metadata.ngay_tao', dir: 'desc' }
                }),
                statistics: {}
            }        

            // ***************************************************
            // SUBSCRIBE
            // ***************************************************


            // ***************************************************
            // REACTIVE HELPERS
            // ***************************************************

            vm.helpers({
                suachuas: () => {
                    vm.pageData.suachuasDataSource.data(SuaChuas.find({
                        'trang_thai.ma': 'dang_sua_chua'
                    }).fetch());
                    vm.pageData.suachuasDataSource.fetch(function(){
                        vm.pageData.suachuasRaw = vm.pageData.suachuasDataSource.view();
                        vm.pageData.statistics = vm.pageData.suachuasDataSource.aggregates();
                    });
                    return SuaChuas.find({
                        'trang_thai.ma': 'dang_sua_chua'
                    });
                },
                // logs: () => {
                //     // Tìm bản ghi log cuối cùng trên hệ thống
                //     console.log('new action: ', SuaChuaLogs.findOne({}, {sort:{_id:-1}})); 
                // }
            });
            

            // ***************************************************
            // METHODS
            // ***************************************************
            


            // ***************************************************
            // UTILS
            // ***************************************************

            vm.utils = {
            };

            // ***************************************************
            // WATCHERS
            // ***************************************************

        }
    }
});