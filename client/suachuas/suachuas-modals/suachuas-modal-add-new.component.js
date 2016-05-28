angular.module('angular-skynet').directive('suachuasModalAddNew', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/suachuas/suachuas-modals/suachuas-modal-add-new.html',
        controllerAs: 'vm',
        scope: {
        	dictionary: '='
        },
        bindToController: true,
        controller: function($scope, $rootScope, skynetHelpers, $state, $timeout, $reactive, skynetDictionary, iNotifier, $timeout) {
            
            $reactive(this).attach($scope);

            // ***************************************************
            // INITIALIZE
            // ***************************************************

            // Capture 'this contex - Refer to https://github.com/johnpapa/angular-styleguide#controlleras-with-vm
            let vm = this;

            vm._helpers = skynetHelpers.helpers;

            vm._helpers.initNewSuaChuaParams(vm);
            vm.modalOptions = {
                errorMessage: 'This is an error',
            };

            vm.modalData = {
                vi_tris: []
            }

            let myAlert = $('.newsuachua_alert');
            myAlert.hide();

            // ***************************************************
            // UTILS
            // ***************************************************

            vm.utils = {
                resetSuaChua: function() {
                    vm._helpers.initNewSuaChuaParams(vm);
                },
                showModalAlert: function(message) {
                    vm.modalOptions.errorMessage = message;
                    myAlert.slideDown();
                    $timeout(() => {
                        myAlert.slideUp();
                    }, 3000);
                },
                addNewSuaChua: function() {
                    let err = vm._helpers.validateUser('can_upsert_sua_chua');
                    if (_.isEmpty(err)) {
                        err = vm._helpers.validateSuaChuaForm(vm.newSuaChua);
                        if (_.isEmpty(err)) {

                            vm._helpers.buildNewSuaChua(vm.newSuaChua);
                            SuaChuas.insert(vm.newSuaChua, (error, result) => {
                                if (error) {
                                    // iNotifier.error('Không thể tạo mới dữ liệu về lượt sửa chữa này. ' + error.message + '.');
                                    this.showModalAlert('Không thể tạo mới dữ liệu về lượt sửa chữa này. ' + error.message + '.');
                                } else {
                                    $scope.$apply( () => {
                                        vm.utils.resetSuaChua();
                                        this.showModalAlert('Dữ liệu về lượt sửa chữa được tạo mới thành công.');
                                    });
                                    // iNotifier.success('Dữ liệu về lượt sửa chữa được tạo mới thành công.');
                                }
                            });

                        } else {
                            // iNotifier.error(err.message);
                            this.showModalAlert(err.message);
                        }
                    } else {
                        // iNotifier.error(err.message);
                        this.showModalAlert(err.message);
                    }
                },
                resetCascadeDropdown: function(selector) {
                    $(selector).data("kendoDropDownList").value({});
                },
                goToEditPage: function() {
                    this.closeModal();
                    $timeout(()=>{
                        $state.go('cauhois.update', {cauhoiId: $scope.source._id});
                    }, 600);          
                },
                closeModal: function() {
                    let modal = UIkit.modal("#modal_suachuas_add_new");
                    if (modal.isActive()) {
                        modal.hide();
                    }
                }
            }

            // ***************************************************
            // WATCHERS
            // ***************************************************

            // $rootScope.$watch('main_theme', (newVal) => {
            //     $scope.utils.accentColor = _.findWhere($scope._data.general.themes, {
            //         name: newVal
            //     }).color_accent;
            // });

            $scope.$watch('vm.newSuaChua.dia_diem.khu_vuc.ma', (newVal) => {
                if (newVal) {
                    // Tính toán các vị trí còn trống và loại bỏ các vị trí đã được sử dụng trong danh sách
                    // 1. Tìm các vị trí đã được sử dụng
                    let originals = SuaChuas.find({                    
                        'trang_thai.ma': 'dang_sua_chua' ,
                        'dia_diem.khu_vuc.ma': newVal
                    }).fetch();
                    if (originals.length) {
                        let occupieds = [];
                        _.each(originals, (item) => {
                            // Mảng occupieds chứa các vị trí đã được chiếm dụng
                            occupieds.push(item.dia_diem.vi_tri);       
                        });
                        // 2. Loại bỏ các mảng này khỏi danh sách khả dụng
                        vm.modalData.vi_tris = _.difference(vm.dictionary.vi_tris[newVal], occupieds);

                    } else
                        // Trường hợp chưa có vị trí bị chiếm dụng, trả về tất cả.
                        vm.modalData.vi_tris = angular.copy(vm.dictionary.vi_tris[newVal]);
                }
            });
        }
    }
});
