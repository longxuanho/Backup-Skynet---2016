angular.module('angular-skynet').controller('NhanSusAddNewCtrl', function($scope, $stateParams, skynetHelpers, $rootScope, iNotifier, data_nhansus) {


    // ***************************************************
    // INITIALIZE
    // ***************************************************

    $scope._helpers = skynetHelpers.helpers;
    $scope._helpers.initNewNhanSuParams($scope);
    $scope.resource = angular.copy(data_nhansus);
    $scope.kOptions = {
        don_vi: $scope.resource.don_vi,
        departments: [],
        subdepartments: [],
        isVisible_queQuan: false,
        que_quan_quan_huyen: [],
        isVisible_thuongTru: false,
        thuong_tru_quan_huyen: [],
        isVisible_nguoi_bao_lanh: false,
        isVisible_nguoi_bao_tin: false,
        isVisible_ngoai_ngu: false,
        isVisible_bang_lai_xe: false,
        isVisible_giay_phep_lai_xe_quan_su: false,
        isVisible_chung_chi_cau_khung: false
    }

    // ***************************************************
    // REACTIVE HELPERS
    // ***************************************************

    $scope.helpers({
        donvis: () => {
            return DonVis.find({}, {
                sort: {
                    'ten': 1
                }
            }).fetch();
        },
        isLoggedIn: () => {
            return Meteor.userId() !== null;
        }
    });


    // ***************************************************
    // METHODS
    // ***************************************************            

    $scope.addNewNhanSu = () => {
        let err = $scope._helpers.validateUser('can_upsert_nhan_su');
        if (_.isEmpty(err)) {
            err = $scope._helpers.validateNhanSuForm($scope.newNhanSu);
            if (_.isEmpty(err)) {

                $scope._helpers.buildNewNhanSu($scope.newNhanSu);
                console.log('build: ', $scope.newNhanSu);
                // NhanSus.insert($scope.newNhanSu, (error, result) => {
                //     if (error) {
                //         iNotifier.error('Không thể tạo mới nhân sự này. ' + error.message + '.');
                //     } else {
                //         $scope._helpers.initNewNhanSuParams($scope);
                //         iNotifier.success('Nhân sự được tạo mới thành công.');
                //     }
                // });

            } else {
                iNotifier.error(err.message);
            }
        } else {
            iNotifier.error(err.message);
        }
    };

    $scope.clearNewNhanSuForm = () => {
        $scope._helpers.initNewNhanSuParams($scope);
    };


    // ***************************************************
    // UTILS
    // ***************************************************

    $scope.utils = {
        // ***************************************************
        // KENDO
        // ***************************************************
        kendoOnChangeRestrictValues: function(e, field) {
            if (field === 'que_quan_tinh_thanh') {
                $scope.newNhanSu.tieu_su.que_quan.quan_huyen = '';
                $scope.kOptions.que_quan_quan_huyen = $scope.resource.quan_huyen[e.sender._old];
            }
            if (field === 'thuong_tru_tinh_thanh') {
                $scope.newNhanSu.tieu_su.thuong_tru.quan_huyen = '';
                $scope.kOptions.thuong_tru_quan_huyen = $scope.resource.quan_huyen[e.sender._old];
            }
        },
        kendoOnDateChangeRestrict: function(e, field) {
            let startDate = e.sender._value;

            if (field == 'baohanh_batdau') {
                if ($scope.newNhanSu.ho_so_tb.thong_tin_chung.bao_hanh.thoi_gian_bao_hanh > 0) {
                    let endDate = moment(startDate).add(parseInt($scope.newNhanSu.ho_so_tb.thong_tin_chung.bao_hanh.thoi_gian_bao_hanh), 'M').toDate();
                    $('#baohanh_end').kendoDatePicker().data('kendoDatePicker').value(endDate);
                    $scope.newNhanSu.ho_so_tb.thong_tin_chung.bao_hanh.thoi_gian_ket_thuc = endDate;
                }
            }
        },
        addNewThanhPhanGiaDinh: function() {
            $scope.newNhanSu.thanh_phan_gia_dinh.push({});
        },
        removeThanhPhanGiaDinh: function(index) {
            $scope.newNhanSu.thanh_phan_gia_dinh.splice(index, 1);
        },
        accentColor: _.findWhere($scope._data.general.themes, {
            name: $rootScope.main_theme
        }).color_accent
    };


    // ***************************************************
    // WATCHERS
    // ***************************************************

    $rootScope.$watch('main_theme', (newVal) => {
        $scope.utils.accentColor = _.findWhere($scope._data.general.themes, {
            name: newVal
        }).color_accent;
    });

    $scope.$watch('newNhanSu.phan_loai.nhom.keyId', (newVal) => {
        $scope.nhomSelectedId = newVal;

        if ($scope.newNhanSu && $scope.newNhanSu.phan_loai && $scope.newNhanSu.phan_loai.chung_loai)
            $scope.newNhanSu.phan_loai.chung_loai.keyId = '';
    });

    $scope.$watch('newNhanSu.phan_loai.chung_loai.keyId', (newVal) => {
        $scope.chungloaiSelectedId = newVal;

        if ($scope.newNhanSu && $scope.newNhanSu.phan_loai && $scope.newNhanSu.phan_loai.loai)
            $scope.newNhanSu.phan_loai.loai.keyId = '';
    });

    $scope.$watch('newNhanSu.ho_so_tb.thong_tin_chung.hang_san_xuat.keyId', (newVal) => {
        $scope.hangsanxuatSelectedId = newVal;

        if ($scope.newNhanSu && $scope.newNhanSu.ho_so_tb && $scope.newNhanSu.ho_so_tb.thong_tin_chung && $scope.newNhanSu.ho_so_tb.thong_tin_chung.model_tb)
            $scope.newNhanSu.ho_so_tb.thong_tin_chung.model_tb.keyId = '';
    });

    $scope.$watch('newNhanSu.ho_so_tb.thong_tin_chung.bao_hanh.thoi_gian_bao_hanh', (newVal) => {
        if (newVal > 0) {
            if ($scope.newNhanSu.ho_so_tb.thong_tin_chung.bao_hanh.thoi_gian_bat_dau) {
                let endDate = moment($scope.newNhanSu.ho_so_tb.thong_tin_chung.bao_hanh.thoi_gian_bat_dau).add(parseInt(newVal), 'M').toDate();
                $('#baohanh_end').kendoDatePicker().data('kendoDatePicker').value(endDate);
            }
        }
    })

    $scope.$watch('newNhanSu.tieu_su.isNhapNgu', (newVal, oldVal) => {
        if (oldVal && !newVal) {
            $scope.newNhanSu.tieu_su.ngay_nhap_ngu = ''; 
        }
    });

    $scope.$watch('newNhanSu.don_vi', (newVal) => {
        $scope.newNhanSu.cong_viec.to_chuc_bien_che.department = '';
        $scope.kOptions.departments =  $scope.resource.departments[newVal.ma] || [];
    });

    $scope.$watch('newNhanSu.cong_viec.to_chuc_bien_che.department', (newVal) => {
        $scope.newNhanSu.cong_viec.to_chuc_bien_che.subdepartment = '';
        if ($scope.newNhanSu.don_vi.ma)
            $scope.kOptions.subdepartments =  $scope.resource.subdepartments[$scope.newNhanSu.don_vi.ma][newVal.ma] || [];
    });

    $scope.$watch('kOptions.isVisible_queQuan', (newVal, oldVal) => {
        if (oldVal && !newVal) {
            $scope.newNhanSu.tieu_su.que_quan = ''; 
        }
    });

    $scope.$watch('kOptions.isVisible_thuongTru', (newVal, oldVal) => {
        if (oldVal && !newVal) {
            $scope.newNhanSu.tieu_su.thuong_tru = ''; 
        }
    });

    $scope.$watch('kOptions.isVisible_nguoi_bao_lanh', (newVal, oldVal) => {
        if (oldVal && !newVal) {
            $scope.newNhanSu.thong_tin_lien_he.nguoi_bao_lanh = ''; 
        }
    });

    $scope.$watch('kOptions.isVisible_nguoi_bao_tin', (newVal, oldVal) => {
        if (oldVal && !newVal) {
            $scope.newNhanSu.thong_tin_lien_he.nguoi_bao_tin = ''; 
        }
    });

    $scope.$watch('kOptions.isVisible_ngoai_ngu', (newVal, oldVal) => {
        if (oldVal && !newVal) {
            $scope.newNhanSu.hoc_van.ngoai_ngu = ''; 
        }
    });

    $scope.$watch('kOptions.isVisible_bang_lai_xe', (newVal, oldVal) => {
        if (oldVal && !newVal) {
            $scope.newNhanSu.bang_cap.bang_lai_xe = ''; 
        }
    });

    $scope.$watch('kOptions.isVisible_giay_phep_lai_xe_quan_su', (newVal, oldVal) => {
        if (oldVal && !newVal) {
            $scope.newNhanSu.bang_cap.giay_phep_lai_xe_quan_su = ''; 
        }
    });

    $scope.$watch('kOptions.isVisible_chung_chi_cau_khung', (newVal, oldVal) => {
        if (oldVal && !newVal) {
            $scope.newNhanSu.bang_cap.chung_chi_cau_khung = ''; 
        }
    });
});
