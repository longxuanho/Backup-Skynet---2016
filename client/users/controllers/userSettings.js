angular.module('angular-skynet').controller('UserSettingsCtrl', function($scope, $rootScope, $state, $stateParams, $meteor, Skynet) {

    // ***************************************************
    // INITIALIZE
    // ***************************************************
    $scope._helpers = Skynet.helpers;
    $scope._ui = Skynet.settings.thietbis.ui.list;

    $scope._ui.data.initParams();
    $scope.newThietBiTemplate = $scope._ui.data.newThietBiTemplate;



    // ***************************************************
    // SUBSCRIBE
    // ***************************************************    
    $scope.$meteorSubscribe('nhoms');
    $scope.nhoms = $meteor.collection(function() {
        return Nhoms.find({}, {
            sort: {
                ten: 1
            }
        });
    });

    $scope.$meteorSubscribe('chungloais');
    $scope.chungloais = $meteor.collection(function() {
        return ChungLoais.find({
            'nhom.keyId': $scope.getReactively('newThietBiTemplate.phan_loai.nhom.keyId')
        }, {
            sort: {
                ten: 1
            }
        });
    });

    $scope.$meteorSubscribe('loais');
    $scope.loais = $meteor.collection(function() {
        return Loais.find({
            'nhom.keyId': $scope.getReactively('newThietBiTemplate.phan_loai.nhom.keyId'),
            'chung_loai.keyId': $scope.getReactively('newThietBiTemplate.phan_loai.chung_loai.keyId')
        }, {
            sort: {
                ten: 1
            }
        });
    });

    $scope.$meteorSubscribe('quocgias');
    $scope.quocgias = $meteor.collection(function() {
        return QuocGias.find({}, {
            sort: {
                ten: 1
            }
        });
    });

    $scope.$meteorSubscribe('hangsanxuats');
    $scope.hangsanxuats = $meteor.collection(function() {
        return HangSanXuats.find({}, {
            sort: {
                ten: 1
            }
        });
    });

    $scope.$meteorSubscribe('modelthietbis');
    $scope.modelthietbis = $meteor.collection(function() {
        return ModelThietBis.find({
            'hang_san_xuat.keyId': $scope.getReactively('newThietBiTemplate.ho_so_tb.thong_tin_chung.hang_san_xuat.keyId')
        }, {
            sort: {
                ten: 1
            }
        });
    });

    $scope.$meteorSubscribe('loaithongsokythuats');
    $scope.loaithongsokythuats = $meteor.collection(function() {
        return LoaiThongSoKyThuats.find({
            'chung_loai.keyId': $scope.getReactively('newThietBiTemplate.phan_loai.chung_loai.keyId')
        }, {
            sort: {
                ten: 1
            }
        });
    });

    $scope.$meteorSubscribe('diabans');
    $scope.diabans = $meteor.collection(function() {
        return DiaBans.find({}, {
            sort: {
                'dia_ban.ten': 1
            }
        });
    });

    $scope.$meteorSubscribe('donvies');
    $scope.donvis = $meteor.collection(function() {
        return DonVies.find({}, {
            sort: {
                ten: 1
            }
        });
    });


    // ***************************************************
    // METHODS
    // ***************************************************
    

    // ***************************************************
    // HELPERS
    // ***************************************************

    // ***************************************************
    // ULTILS
    // ***************************************************


});
