angular.module('angular-skynet').directive('login', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/users/login/login.html',
        controllerAs: 'Login',
        controller: function($scope, $stateParams, skynetHelpers, $state, $rootScope, utils, iNotifier, $timeout) {        

            // ***************************************************
            // INITIALIZE
            // ***************************************************

            $rootScope.hideMainHeader = true;

            $scope._helpers = skynetHelpers.helpers;
            $scope._data = skynetHelpers.data;
            $scope.loginState = 'idle';

            $scope.masterState = {
            	default: {
            		name: 'users_profile',
            		params: {
	                   	// Cần lấy thông tin về userId tại đây...
	                }
            	},
            	notifyCheckEmail: {
            		name: 'notify_checkEmail'
            	},
            	notifyResetMatKhau: {
            		name: 'notify_resetMatKhau'
            	}
            };

            // Trường hợp người dùng đã login -> redirect tới hồ sơ cá nhân ui-sref="users_profile({userId: currentUser._id})"
            if (Meteor.userId()) {
            	$scope.masterState.default = {
	                name: 'users_profile',
	                params: {
	                    userId: Meteor.userId()
	                }
	            };
                $state.go($scope.masterState.default.name, $scope.masterState.default.params);
            }

            $scope.credentials = {
                email: '',
                password: '',
                rememberMe: true
            };

            $scope.newCredentials = {
                email: '',
                password: '',
                profile: {
                    name: ''
                }
            };

            $scope.repeatPassword = '';

            $scope.resetPasswordCredentials = {
                email: ''
            }

            $scope.error = '';

            var $login_card = $('#login_card'),
                $login_form = $('#login_form'),
                $login_help = $('#login_help'),
                $register_form = $('#register_form'),
                $login_password_reset = $('#login_password_reset');

            // show login form (hide other forms)
            let login_form_show = function() {
                $login_form
                    .show()
                    .siblings()
                    .hide();
            };

            // show register form (hide other forms)
            let register_form_show = function() {
                $register_form
                    .show()
                    .siblings()
                    .hide();
            };

            // show login help (hide other forms)
            let login_help_show = function() {
                $login_help
                    .show()
                    .siblings()
                    .hide();
            };

            // show password reset form (hide other forms)
            let password_reset_show = function() {
                $login_password_reset
                    .show()
                    .siblings()
                    .hide();
            };


            // ***************************************************
            // REACTIVE HELPERS
            // ***************************************************

            $scope.helpers({
                isLoggedIn: () => {
                    return Meteor.userId() !== null;
                }
            });


            // ***************************************************
            // METHODS
            // ***************************************************

            $scope.login = function() {
                $scope.loginState = 'onLogging';
                Meteor.loginWithPassword($scope.credentials.email, $scope.credentials.password, (err) => {
                    if (err) {
                        iNotifier.error("Email người dùng hoặc mật khẩu không chính xác.");
                        console.log('Có lỗi khi đăng nhập: ', err);
                        $scope.$apply(() => {
                            $scope.loginState = 'idle';
                        });
                    } else {

                        $scope.$apply(() => {
                        	$scope.masterState.default = {
				                name: 'users_profile',
				                params: {
				                    userId: Meteor.userId()
				                }
				            };
                        	$state.go($scope.masterState.default.name, $scope.masterState.default.params);
                        });
                        $timeout(() => {
                            iNotifier.success("Đăng nhập thành công!");
                        }, 2000);
                    }
                });
            };

            $scope.register = function() {
                $scope.loginState = 'onRegistering';
                let error = $scope.utils.validateRegisterForm();
                if (_.isEmpty(error)) {

                    // get the captcha data from Google
                    let recaptchaResponse = grecaptcha.getResponse();
                    
                    Meteor.call('verifyReCaptcha', recaptchaResponse, function(error, result) {
                        if (error) {
                            iNotifier.error('Xác nhận CAPTCHA thất bại. Thông điệp phản hồi từ sever: ' + error.reason);
                            $scope.$apply(() => {
                                $scope.loginState = 'idle';
                            });
                        } else {
                            console.log('Mã CAPTCHA được xác nhận thành công!');
                            Accounts.createUser($scope.newCredentials, (err) => {
                                if (err) {
                                    iNotifier.error("Không thể khởi tạo người dùng này. Xin vui lòng thử lại sau. ", err.reason);
                                    console.log('Có lỗi khi khởi tạo người dùng mới: ', err);
                                    $scope.$apply(() => {
                                        $scope.loginState = 'idle';
                                    });
                                } else {
                                    iNotifier.success("Một email kích hoạt tài khoản đã được gửi tới địa chỉ hộp thư của bạn.");
                                    $state.go($scope.masterState.notifyCheckEmail.name);                                    
                                }
                            });
                        }
                    });
                    
                } else {
                    iNotifier.error(error.message);
                    $scope.loginState = 'idle';
                }
            };

            $scope.requestPasswordReset = function() {
                $scope.loginState = 'onResetPassword';
                let error = $scope.utils.validateResetPasswordForm();
                if (_.isEmpty(error)) {
                    
                    if (error) {
                        iNotifier.error('Xác nhận CAPTCHA thất bại. Thông điệp phản hồi từ sever: ' + error.reason);
                        $scope.$apply(() => {
                            $scope.loginState = 'idle';
                        });
                    } else {
                        console.log('Xác thực CAPTCHA thành công!');
                        Accounts.forgotPassword($scope.resetPasswordCredentials, (err) => {
                            if (err) {
                                iNotifier.error('Có lỗi xảy ra trong quá trình reset mật khẩu: ' + err.reason + '.');
                                console.log('Có lỗi khi reset mật khẩu: ', err);
                                $scope.$apply(() => {
                                    $scope.loginState = 'idle';
                                });
                            } else {
                                $state.go($scope.masterState.notifyResetMatKhau.name);
                                $timeout(() => {                                
                                    iNotifier.success('Một email chứa thông tin reset mật khẩu đã được gửi tới địa chỉ hộp thư của bạn.');
                                }, 1000);
                            }
                        });
                    }

                } else {
                    iNotifier.error(error.message);
                }
            };

            $scope.loginHelp = function($event) {
                $event.preventDefault();
                utils.card_show_hide($login_card, undefined, login_help_show, undefined);
            };

            $scope.backToLogin = function($event) {
                $event.preventDefault();
                $scope.registerFormActive = false;
                utils.card_show_hide($login_card, undefined, login_form_show, undefined);
            };

            $scope.registerForm = function($event) {
                $event.preventDefault();
                $scope.registerFormActive = true;
                utils.card_show_hide($login_card, undefined, register_form_show, undefined);
            };

            $scope.passwordReset = function($event) {
                $event.preventDefault();
                utils.card_show_hide($login_card, undefined, password_reset_show, undefined);
            };

            


            // ***************************************************
            // UTILS
            // ***************************************************
            $scope.utils = {
                validateRegisterForm: () => {
                    let error = {};
                    if (!$scope.newCredentials.email) {
                        error.message = "Chưa có thông tin về email đăng ký.";
                        return error;
                    }
                    if (!$scope.newCredentials.password) {
                        error.message = "Chưa có thông tin về mật khẩu đăng nhập.";
                        return error;
                    }
                    if ($scope.newCredentials.password.length < 8) {
                        error.message = "Độ dài mật khẩu không được ít hơn 8 ký tự.";
                        return error;
                    }
                    if ($scope.newCredentials.password !== $scope.repeatPassword) {
                        error.message = "Xác nhận mật khẩu không khớp. Xin vui lòng thử lại.";
                        return error;
                    }
                    if (!$scope.newCredentials.profile.name) {
                        error.message = "Chưa có thông tin về tên người dùng.";
                        return error;
                    }
                    return error;
                },
                validateResetPasswordForm: () => {
                    let error = {};
                    if (!$scope.resetPasswordCredentials.email) {
                        error.message = "Xin vui lòng nhập địa chỉ email của bạn";
                        return error;
                    }
                    return;
                }
            }


            // ***************************************************
            // WATCHERS
            // ***************************************************

        }
    }
});
