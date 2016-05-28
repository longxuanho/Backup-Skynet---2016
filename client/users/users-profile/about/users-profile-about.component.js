angular.module('angular-skynet').directive('usersProfileAbout', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/users/users-profile/about/users-profile-about.html',
        controllerAs: 'UsersProfileAbout',
        scope: {
            user: '=',
            pageOptions: '='
        },
        controller: function($scope, $stateParams, $state, $timeout, skynetHelpers) {


            // ***************************************************
            // INITIALIZE
            // ***************************************************

            $scope.credentials = {
                oldPassword: '',
                newPassword: '',
                repeatNewPassword: ''
            };

            let progressbar = $("#file_upload-progressbar"),
                bar = progressbar.find('.uk-progress-bar'),
                settings = {

                    beforeAll: function(files) {
                        $scope.utils.addAvatar(files);
                        $scope.onUploading = true;
                        $scope.finishUploading = false;
                    },

                    action: '', // upload url

                    allow: '*.(jpg|jpeg|gif|png)', // allow only images

                    loadstart: function() {
                        bar.css("width", "0%").text("0%");
                        progressbar.removeClass("uk-hidden");
                    },

                    progress: function(percent) {
                        percent = Math.ceil(percent);
                        bar.css("width", percent + "%").text(percent + "%");
                    },

                    allcomplete: function(response) {
                        console.log('all complete');
                    }
                };

            let select = UIkit.uploadSelect($("#file_upload-select"), settings),
                drop = UIkit.uploadDrop($("#file_upload-drop"), settings);


            // ***************************************************
            // PULISH / SUBSCRIBE
            // ***************************************************

            $scope.subscribe('cfs_images');


            // ***************************************************
            // METHODS
            // ***************************************************

            $scope.updateUserAvatar = () => {

                let err = $scope.utils.validateUser();
                if (_.isEmpty(err)) {

                    $scope.utils.buildUserAvatar();
                    Meteor.users.update({
                        _id: $stateParams.userId
                    }, {
                        $set: {
                            'profile.avatar': $scope.user.profile.avatar
                        }
                    }, (error) => {
                        if (error) {
                            toastr.error('Không thể cập nhật hình đại diện của bạn của bạn. ' + error.message + '.');
                            console.log('Có lỗi xảy ra trong quá trình cập nhật avatar ', error);
                        } else {
                            toastr.success('Hình đại diện của bạn đã được cập nhật thành công.');
                            $scope.userAvatar = {};
                            progressbar.addClass("uk-hidden");
                            $scope.$apply(() => {
                                $scope.onEditAvatar = false;
                                $scope.finishUploading = false;
                            });
                        }
                    });

                } else {
                    toastr.error(err.message);
                }
            };

            $scope.saveCroppedImage = () => {
                if ($scope.myCroppedImage !== '') {
                    Images.insert($scope.myCroppedImage, (err, fileObj) => {
                        if (err)
                            toastr.error('Có lỗi xảy ra trong quá trình upload ảnh đại diện: ', err.reason);
                        else {
                            toastr.success('Upload hình ảnh đại diện thành công.');
                            $scope.userAvatar = fileObj;
                            $scope.cropImgSrc = undefined;
                            $scope.myCroppedImage = '';
                            bar.css("width", "100%").text("100%");
                            $scope.$apply(() => {
                                $scope.onUploading = false;
                                $scope.finishUploading = true;
                            });
                        }
                    });
                }
            };


            // ***************************************************
            // ULTILS
            // ***************************************************

            $scope.utils = {
                validateUserProfileForm: function() {

                },
                validateUser: function() {
                    let error = {};
                    if ($scope.user._id !== Meteor.userId())
                        error.message = "Bạn không đủ quyền hạn thực hiện cập nhật này.";
                    return error;
                },
                buildUserProfile: function() {

                },
                buildUserAvatar: function() {
                    if (!_.isEmpty($scope.userAvatar)) {
                        $scope.user.profile.avatar = {};
                        $scope.user.profile.avatar.keyId = $scope.userAvatar._id;
                        $scope.user.profile.avatar.url = $scope.userAvatar.url();
                    }
                },
                toggleEditAvatar: function() {
                    if ($scope.onEditMode)
                        $scope.onEditAvatar = !$scope.onEditAvatar;
                },
                addAvatar: function(files) {
                    if (files.length > 0) {
                        if (files.length > 0) {
                            let reader = new FileReader();

                            reader.onload = (e) => {
                                $scope.$apply(() => {
                                    $scope.cropImgSrc = e.target.result;
                                    $scope.myCroppedImage = '';
                                });
                            };

                            reader.readAsDataURL(files[0]);
                        } else {
                            $scope.cropImgSrc = undefined;
                        }
                    };
                }
            }

            // ***************************************************
            // WATCHERS
            // ***************************************************

            $scope.$watch('pageOptions.isEditable', (newVal, oldVal) => {
                // Nếu người dùng chuyển sang chế độ readonly, sử dụng jQuery để gỡ bỏ tất cả các thuộc tính read-only
                if (newVal) {
                    $('.jquery-remove-readonly').removeAttr('readonly');
                }
            })

        }
    }
});
