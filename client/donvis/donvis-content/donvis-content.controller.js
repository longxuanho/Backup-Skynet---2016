angular.module('angular-skynet').controller('DonVisContentCtrl', function($scope, $rootScope) {

    // ***************************************************
    // INITIALIZE
    // ***************************************************

    $rootScope.page_full_height = false;
    $rootScope.headerDoubleHeightActive = true;


    // ***************************************************
    // REACTIVE HELPERS
    // ***************************************************

    $scope.helpers({
        source: () => {
            return DonVis.findOne({
                _id: $rootScope.$stateParams.donviId // only update when state change success!
            });
        },
        sourceCount: () => {
            return Counts.get('numberOfDonVis');
        },
        sourceTotalCount: () => {
            return Counts.get('numberOfDonVisTotal');
        },
        thietbisSoHuuCount: () => {
            return ThietBis.find({
                'don_vi_so_huu.keyId': $rootScope.$stateParams.donviId
            }).count();
        },
        thietbisQuanLyCount: () => {
            return ThietBis.find({
                'don_vi_quan_ly.keyId': $rootScope.$stateParams.donviId
            }).count();
        }
    });


})
.filter('donvis_phan_loai', function () {
    return function (input) {
        let options = [{
                text: 'Tổng Công ty',
                value: 'tct'
            }, {
                text: 'Cty thành viên',
                value: 'cty_thanh_vien'
            }, {
                text: 'Cty vệ tinh',
                value: 'cty_ve_tinh'
            }, {
                text: 'Khác',
                value: 'khac'
            }];

        return _.findWhere(options, {value: input}).text;
    }
});
