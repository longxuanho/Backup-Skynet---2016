angular.module('angular-skynet').directive('suachuasModalDetails', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/suachuas/suachuas-modals/suachuas-modal-details.html',
        controllerAs: 'vm',
        scope: {
        	id: '=',
            dictionary: '='
        },
        bindToController: true,
        controller: function($scope, $rootScope, skynetHelpers, $state, $timeout, $reactive, skynetDictionary, iNotifier) {
            
            $reactive(this).attach($scope);

            // ***************************************************
            // INITIALIZE
            // ***************************************************

            // Capture 'this contex - Refer to https://github.com/johnpapa/angular-styleguide#controlleras-with-vm
            let vm = this;

            vm._helpers = skynetHelpers.helpers;

            vm.modalOptions = {
                errorMessage: 'This is an error'
            }

            let myAlert = $('.suachua_alert');
            myAlert.hide();

            // ***************************************************
            // REACTIVE HELPERS
            // ***************************************************

            vm.helpers({
                source: () => {
                    vm.master = SuaChuas.findOne({
                        _id: vm.getReactively('id')
                    });
                    // Cập nhật thời gian kết thúc
                    if (!_.isEmpty(vm.master)) {
                        let result = angular.copy(vm.master);
                        result.thoi_gian.ket_thuc = new Date();
                        return result;
                    }                    
                    // return (!_.isEmpty(vm.master)) ? result : {};                 
                }
            });

            // ***************************************************
            // SUBSCRIBE
            // ***************************************************

            // $scope.subscribe('suachuas');

            // ***************************************************
            // UTILS
            // ***************************************************

            vm.utils = {
                // accentColor: _.findWhere($scope._data.general.themes, {
                //     name: $rootScope.main_theme
                // }).color_accent,
                resetSuaChua: function() {
                    angular.copy(vm.master, vm.source);
                    // Cập nhật thời gian kết thúc
                    vm.source.thoi_gian.ket_thuc = new Date();
                },
                saveSuaChua: function() {

                    let err = vm._helpers.validateUser('can_upsert_sua_chua');
                    if (_.isEmpty(err)) {
                        err = vm._helpers.validateSuaChuaForm(vm.source);
                        if (_.isEmpty(err)) {

                            vm._helpers.buildSuaChua(vm.source);
                            SuaChuas.update({
                                _id: vm.id
                            }, {
                                $set: {
                                    'trang_thai': vm.source.trang_thai,
                                    'tags': vm.source.tags,
                                    'thoi_gian.ket_thuc': vm.source.thoi_gian.ket_thuc,
                                    'thong_ke': vm.source.thong_ke, 
                                    'metadata.ngay_cap_nhat_cuoi': vm.source.metadata.ngay_cap_nhat_cuoi,
                                    'metadata.nguoi_cap_nhat_cuoi': vm.source.metadata.nguoi_cap_nhat_cuoi,
                                    'metadata.nguoi_cap_nhat_cuoi_name': vm.source.metadata.nguoi_cap_nhat_cuoi_name,
                                    'metadata.nguoi_cap_nhat_cuoi_email': vm.source.metadata.nguoi_cap_nhat_cuoi_email,
                                    'metadata.nguoi_cap_nhat_cuoi_field': vm.source.metadata.nguoi_cap_nhat_cuoi_field
                                }
                            }, (error) => {
                                if (error) {
                                    this.showModalAlert('Không thể cập nhật sửa chữa này. ' + error.message + '.');
                                } else {
                                    iNotifier.success('Sửa chữa được cập nhật thành công.');
                                    this.closeModal();
                                }
                            });
                        } else {
                            this.showModalAlert(err.message);
                        }
                    } else {
                        this.showModalAlert(err.message);
                    }
                },
                showModalAlert: function(message) {
                    vm.modalOptions.errorMessage = message;
                    myAlert.slideDown();
                    $timeout(() => {
                        myAlert.slideUp();
                    }, 3000);
                },
                isEditable: function() {
                    return _.isEmpty($scope._helpers.validateUser('can_upsert_cau_hoi'));
                },
                goToEditPage: function() {
                    this.closeModal();
                    $timeout(()=>{
                        $state.go('cauhois.update', {cauhoiId: $scope.source._id});
                    }, 600);          
                },
                closeModal: function() {
                    let modal = UIkit.modal("#modal_suachuas_details");
                    if (modal.isActive()) {
                        modal.hide();
                    }
                }
            }


            // ***************************************************
            // WATCHERS
            // ***************************************************
        }
    }
});
