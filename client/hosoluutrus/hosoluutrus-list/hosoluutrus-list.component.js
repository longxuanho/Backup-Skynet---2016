angular.module('angular-skynet').directive('hosoluutrusList', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/hosoluutrus/hosoluutrus-list/hosoluutrus-list.html',
        controllerAs: 'hosoluutrusList',
        controller: function($scope, $reactive, skynetHelpers) {
            $reactive(this).attach($scope);


            // ***************************************************
            // INITIALIZE
            // ***************************************************

            this._helpers = skynetHelpers.helpers;
            this._data = skynetHelpers.data;

            this._helpers.initNewHoSoLuuTruParams(this);

            this.perPage = 3;
            this.orderProperty = '1';


            // ***************************************************
            // REACTIVE HELPERS
            // ***************************************************

            this.helpers({
                hosoluutrus: () => {
                    return HoSoLuuTrus.find({}, {
                        sort: this.sort
                    });
                },
                users: () => {
                    return Meteor.users.find({});
                },
                hosoluutrusCount: () => {
                    return Counts.get('numberOfHoSoLuuTrus');
                },
                hosoluutrusTotalCount: () => {
                    return Counts.get('numberOfHoSoLuuTrusTotal');
                },
                page: 1,
                sort: {
                    'ten': 1
                },
                searchText: '',
                searchBy: 'ten',
                isLoggedIn: () => {
                    return Meteor.userId() !== null;
                },
                currentUserId: () => {
                    return Meteor.userId();
                },
                isCanBeRemoved: () => {
                    let err = this._helpers.validateUser('can_delete_ho_so_luu_tru');
                    if (_.isEmpty(err))
                        return true;
                    return false;
                }
            });


            // ***************************************************
            // SUBSCRIBE
            // ***************************************************

            this.subscribe('users');
            this.subscribe('hosoluutrus', () => {
                return [{
                        limit: parseInt(this.perPage),
                        skip: parseInt((this.page - 1) * this.perPage),
                        sort: this.sort
                    },
                    this.searchText,
                    this.searchBy
                ]
            });


            // ***************************************************
            // METHODS
            // ***************************************************

            this.removeHoSoLuuTru = (hosoluutru) => {
                let err = this._helpers.validateUser('can_delete_ho_so_luu_tru');
                if (_.isEmpty(err)) {

                    HoSoLuuTrus.remove({
                        _id: hosoluutru._id
                    }, (error) => {
                        if (!error)
                            toastr.info('Hồ sơ "' + hosoluutru.ten + '" đã được gỡ bỏ khỏi hệ thống.')
                        else {
                            toastr.error(error.message);
                            console.error('có lỗi xảy ra: ' + error.message);
                        }
                    });

                } else {
                    toastr.error(err.message);
                }
            }


            // ***************************************************
            // WATCHERS
            // ***************************************************

            this.pageChanged = (newPage) => {
                this.page = newPage;
            };

            this.updateSort = () => {
                this.sort = {
                    'ten': parseInt(this.orderProperty)
                }
            };


        }
    }
});
