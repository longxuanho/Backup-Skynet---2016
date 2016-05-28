angular.module('angular-skynet').directive('usersProfileUpdateAvatar', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/users/users-profile/about/users-profile-update-avatar.html',
        controllerAs: 'vm',
        scope: {
            user: '=',
            states: '='
        },
        // bindToController: true,
        controller: function($scope, $stateParams, $state, $timeout, skynetHelpers, iNotifier) {


            // ***************************************************
            // INITIALIZE
            // ***************************************************

            let progressbar = $("#file_upload-progressbar"),
                bar = progressbar.find('.uk-progress-bar'),
                settings = {
                    beforeAll: function(files) {
                        console.log('beforeAll')
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

            let select = UIkit.uploadSelect($("#file_upload_select"), settings),
                drop = UIkit.uploadDrop($("#file_upload_drop"), settings);


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

                    // $scope.utils.buildUserAvatar();
                    
                    // Cập nhật avatar vào profile
                    $scope.user.profile.avatar = {
                        keyId: $scope.userAvatar._id,
                    };
                    let url = $scope.userAvatar.url({brokenIsFine: true});
                    console.log('Đường dẫn tới hình ảnh: ', url, $scope.userAvatar);
                    // Delay 05s trước khi cập nhật để có thông tin về url
                    $timeout(() => {
                        if (url)
                            $scope.user.profile.avatar.url = url;

                        Meteor.users.update({
                            _id: $stateParams.userId
                        }, {
                            $set: {
                                'profile.avatar': $scope.user.profile.avatar
                            }
                        }, (error) => {
                            if (error) {
                                iNotifier.error('Không thể cập nhật hình đại diện của bạn của bạn. ' + error.message + '.');
                                console.log('Có lỗi xảy ra trong quá trình cập nhật avatar ', error);
                            } else {
                                iNotifier.success('Hình đại diện của bạn đã được cập nhật thành công.');
                                $scope.userAvatar = {};
                                progressbar.addClass("uk-hidden");
                                $scope.$apply(() => {
                                    $scope.onEditAvatar = false;
                                    $scope.finishUploading = false;
                                });
                            }
                        });

                    }, 2000);       
                } else {
                    iNotifier.error(err.message);
                }
            };

            $scope.saveCroppedImage = () => {
                if ($scope.myCroppedImage !== '') {
                    Images.insert($scope.myCroppedImage, (err, fileObj) => {
                        if (err)
                            iNotifier.error('Có lỗi xảy ra trong quá trình upload ảnh đại diện: ', err.reason);
                        else {
                            iNotifier.success('Upload hình ảnh đại diện thành công.');
                            $scope.userAvatar = fileObj;
                            $scope.cropImgSrc = undefined;
                            $scope.myCroppedImage = '';
                            bar.css("width", "100%").text("100%");
                            $scope.$apply(() => {
                                $scope.onUploading = false;
                                $scope.finishUploading = true;
                                // Cập nhật hình đại diện
                                $timeout($scope.updateUserAvatar, 2000);                                
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
                    $scope.user.profile.avatar = {
                        keyId: $scope.userAvatar._id,
                    };
                    let url = $scope.userAvatar.url();
                    $timeout(() => {
                        if (url)
                            $scope.user.profile.avatar.url = url;
                    }, 1000);
                },
                toggleEditAvatar: function() {
                    if ($scope.onEditMode)
                        $scope.onEditAvatar = !$scope.onEditAvatar;
                },
                addAvatar: function(files) {
                    // console.log('event fired!');
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

        }
    }
});
