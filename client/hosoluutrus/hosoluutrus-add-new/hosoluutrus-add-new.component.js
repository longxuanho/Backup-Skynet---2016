angular.module('angular-skynet').directive('hosoluutrusAddNew', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/hosoluutrus/hosoluutrus-add-new/hosoluutrus-add-new.html',
        controllerAs: 'hosoluutrusAddNew',
        controller: function($scope, $stateParams, $reactive, skynetHelpers) {
            $reactive(this).attach($scope);


            // ***************************************************
            // INITIALIZE
            // ***************************************************

            this._helpers = skynetHelpers.helpers;

            this._helpers.initNewHoSoLuuTruParams(this);


            // ***************************************************
            // REACTIVE HELPERS
            // ***************************************************

            this.helpers({
                isLoggedIn: () => {
                    return Meteor.userId() !== null;
                }
            });


            // ***************************************************
            // METHODS
            // ***************************************************            

            this.addNewHoSoLuuTru = () => {
                let err = this._helpers.validateUser('can_upsert_ho_so_luu_tru');
                if (_.isEmpty(err)) {
                    err = this._helpers.validateHoSoLuuTruForm(this.newHoSoLuuTru);
                    if (_.isEmpty(err)) {

                        this._helpers.buildNewHoSoLuuTru(this.newHoSoLuuTru);
                        HoSoLuuTrus.insert(this.newHoSoLuuTru, (error, result) => {
                            if (error) {
                                toastr.error('Không thể tạo mới hồ sơ này. ' + error.message + '.');
                                console.log('Error:', error);
                            } else {
                                this._helpers.initNewHoSoLuuTruParams(this);
                                toastr.success('Hồ sơ lưu trữ tạo mới thành công.');
                                console.log('Hồ sơ mới:', result);
                            }
                        });

                    } else {
                        toastr.error(err.message);
                    }
                } else {
                    toastr.error(err.message);
                }
            };

            this.clearNewHoSoLuuTruForm = () => {
                this._helpers.initNewHoSoLuuTruParams(this);
            }

        }
    }
});
