// Chú ý event 'routeChangeError và ẩn mainSidebar ở một số phần

angular.module('angular-skynet').config(function($urlRouterProvider, $stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
        // DATAHELPERS
        .state('datahelpers', {
            url: '/datahelpers',
            template: '<datahelpers-main></datahelpers-main>'
        })
        .state('datahelpers.list', {
            url: '/thong-ke',
            template: '<datahelpers-list></datahelpers-list>'
        })
        // DASHBOARD
        .state('dashboard', {
            url: '/bang-tin',
            template: '<dashboard-main></dashboard-main>'
        })
        .state('dashboard.suachuas', {
            url: '/sua-chua-thiet-bi',
            template: '<dashboard-suachuas-main></dashboard-suachuas-main>',
            resolve: {
                meteorUser: ($q) => {
                    if (Meteor.userId() == null) {
                        return $q.reject('AUTH_REQUIRED');
                    } else if (!Meteor.user().emails[0].verified) {
                        return $q.reject('AUTH_NOT_VERIFIED');
                    } if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'super-manager', 'quanly-suachuas', 'xem-suachuas', 'support-suachuas'], 'sky-project')) {
                        // Không đủ quyền xem nội dung câu hỏi
                        return $q.reject('AUTH_NOT_AUTHORIZED');
                    } else {
                        return $q.resolve();
                    }
                }
            }
        })
        .state('dashboard.cauhois', {
            url: '/ngan-hang-cau-hoi',
            template: '<dashboard-cauhois-main></dashboard-cauhois-main>',
            resolve: {
                meteorUser: ($q) => {
                    if (Meteor.userId() == null) {
                        return $q.reject('AUTH_REQUIRED');
                    } else if (!Meteor.user().emails[0].verified) {
                        return $q.reject('AUTH_NOT_VERIFIED');
                    } if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'super-manager', 'quanly-cauhois', 'xem-cauhois', 'support-cauhois'], 'sky-project')) {
                        // Không đủ quyền xem nội dung câu hỏi
                        return $q.reject('AUTH_NOT_AUTHORIZED');
                    } else {
                        return $q.resolve();
                    }
                }
            }
        })
        .state('dashboard.xuongdvkt', {
            url: '/xuong-dvkt',
            template: '<dashboard-xuongdvkt-main></dashboard-xuongdvkt-main>',
            resolve: {
                meteorUser: ($q, $rootScope) => {
                    if (Meteor.userId() == null) {
                        return $q.reject('AUTH_REQUIRED');
                    } else if (!Meteor.user().emails[0].verified) {
                        return $q.reject('AUTH_NOT_VERIFIED');
                    } if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'super-manager', 'quanly-suachuas', 'support-suachuas', 'xem-suachuas'], 'sky-project')) {
                        // Không đủ quyền xem nội dung câu hỏi
                        return $q.reject('AUTH_NOT_AUTHORIZED');
                    } else {
                        // Ẩn sidebar trước khi vào route
                        $rootScope.primarySidebarOpen = false;
                        $rootScope.primarySidebarActive = false;
                        $rootScope.primarySidebarHiding = false;
                        $rootScope.hide_content_sidebar = false;
                        // Ẩn top header trước khi vào route
                        $rootScope.hideMainHeader = true;
                        // Ẩn style switcher trước khi vào route
                        $rootScope.hideStyleSwitcher = true;
                        
                        return $q.resolve();
                    }
                }
            }
        })
        // NHOMS
        .state('nhoms', {
            url: '/quan-ly/nhom',
            template: '<nhoms-main></nhoms-main>'
        })
        .state('nhoms.blank', {
            url: '/',
            template: '<nhoms-blank></nhoms-blank>'
        })
        .state('nhoms.addNew', {
            url: '/tao-moi',
            templateUrl: 'client/nhoms/nhoms-add-new/nhoms-add-new.template.html',
            controller: 'NhomsAddNewCtrl'
        })
        .state('nhoms.content', {
            url: '/:nhomId',
            templateUrl: 'client/nhoms/nhoms-content/nhoms-content.template.html',
            controller: 'NhomsContentCtrl'
        })
        .state('nhoms.details', {
            url: '/cap-nhat/:nhomId',
            templateUrl: 'client/nhoms/nhoms-details/nhoms-details.template.html',
            controller: 'NhomsDetailsCtrl'
        })
        // CHUNGLOAIS
        .state('chungloais', {
            url: '/quan-ly/chung-loai',
            template: '<chungloais-main></chungloais-main>'
        })
        .state('chungloais.blank', {
            url: '/',
            template: '<chungloais-blank></chungloais-blank>'
        })
        .state('chungloais.addNew', {
            url: '/tao-moi',
            templateUrl: 'client/chungloais/chungloais-add-new/chungloais-add-new.template.html',
            controller: 'ChungLoaisAddNewCtrl'
        })
        .state('chungloais.content', {
            url: '/:chungloaiId',
            templateUrl: 'client/chungloais/chungloais-content/chungloais-content.template.html',
            controller: 'ChungLoaisContentCtrl'
        })
        .state('chungloais.details', {
            url: '/cap-nhat/:chungloaiId',
            templateUrl: 'client/chungloais/chungloais-details/chungloais-details.template.html',
            controller: 'ChungLoaisDetailsCtrl'
        })
        // LOAIS
        .state('loais', {
            url: '/quan-ly/loai',
            template: '<loais-main></loais-main>'
        })
        .state('loais.blank', {
            url: '/',
            template: '<loais-blank></loais-blank>'
        })
        .state('loais.addNew', {
            url: '/tao-moi',
            templateUrl: 'client/loais/loais-add-new/loais-add-new.template.html',
            controller: 'LoaisAddNewCtrl'
        })
        .state('loais.content', {
            url: '/:loaiId',
            templateUrl: 'client/loais/loais-content/loais-content.template.html',
            controller: 'LoaisContentCtrl'
        })
        .state('loais.details', {
            url: '/cap-nhat/:loaiId',
            templateUrl: 'client/loais/loais-details/loais-details.template.html',
            controller: 'LoaisDetailsCtrl'
        })
        // QUOGIAS
        .state('quocgias', {
            url: '/quan-ly/quoc-gia',
            template: '<quocgias-main></quocgias-main>'
        })
        .state('quocgias.blank', {
            url: '/',
            template: '<quocgias-blank></quocgias-blank>'
        })
        .state('quocgias.addNew', {
            url: '/tao-moi',
            templateUrl: 'client/quocgias/quocgias-add-new/quocgias-add-new.template.html',
            controller: 'QuocGiasAddNewCtrl'
        })
        .state('quocgias.content', {
            url: '/:quocgiaId',
            templateUrl: 'client/quocgias/quocgias-content/quocgias-content.template.html',
            controller: 'QuocGiasContentCtrl'
        })
        .state('quocgias.details', {
            url: '/cap-nhat/:quocgiaId',
            templateUrl: 'client/quocgias/quocgias-details/quocgias-details.template.html',
            controller: 'QuocGiasDetailsCtrl'
        })
        // HANGSANXUATS
        .state('hangsanxuats', {
            url: '/quan-ly/hang-san-xuat',
            template: '<hangsanxuats-main></hangsanxuats-main>'
        })
        .state('hangsanxuats.blank', {
            url: '/',
            template: '<hangsanxuats-blank></hangsanxuats-blank>'
        })
        .state('hangsanxuats.addNew', {
            url: '/tao-moi',
            templateUrl: 'client/hangsanxuats/hangsanxuats-add-new/hangsanxuats-add-new.template.html',
            controller: 'HangSanXuatsAddNewCtrl'
        })
        .state('hangsanxuats.content', {
            url: '/:hangsanxuatId',
            templateUrl: 'client/hangsanxuats/hangsanxuats-content/hangsanxuats-content.template.html',
            controller: 'HangSanXuatsContentCtrl'
        })
        .state('hangsanxuats.details', {
            url: '/cap-nhat/:hangsanxuatId',
            templateUrl: 'client/hangsanxuats/hangsanxuats-details/hangsanxuats-details.template.html',
            controller: 'HangSanXuatsDetailsCtrl'
        })
        // MODELTHIETBIS
        .state('modelthietbis', {
            url: '/quan-ly/model-thiet-bi',
            template: '<modelthietbis-main></modelthietbis-main>'
        })
        .state('modelthietbis.blank', {
            url: '/',
            template: '<modelthietbis-blank></modelthietbis-blank>'
        })
        .state('modelthietbis.addNew', {
            url: '/tao-moi',
            templateUrl: 'client/modelthietbis/modelthietbis-add-new/modelthietbis-add-new.template.html',
            controller: 'ModelThietBisAddNewCtrl'
        })
        .state('modelthietbis.content', {
            url: '/:modelthietbiId',
            templateUrl: 'client/modelthietbis/modelthietbis-content/modelthietbis-content.template.html',
            controller: 'ModelThietBisContentCtrl'
        })
        .state('modelthietbis.details', {
            url: '/cap-nhat/:modelthietbiId',
            templateUrl: 'client/modelthietbis/modelthietbis-details/modelthietbis-details.template.html',
            controller: 'ModelThietBisDetailsCtrl'
        })
        // DONVIS
        .state('donvis', {
            url: '/quan-ly/don-vi',
            template: '<donvis-main></donvis-main>'
        })
        .state('donvis.blank', {
            url: '/',
            template: '<donvis-blank></donvis-blank>'
        })
        .state('donvis.addNew', {
            url: '/tao-moi',
            templateUrl: 'client/donvis/donvis-add-new/donvis-add-new.template.html',
            controller: 'DonVisAddNewCtrl'
        })
        .state('donvis.content', {
            url: '/:donviId',
            templateUrl: 'client/donvis/donvis-content/donvis-content.template.html',
            controller: 'DonVisContentCtrl'
        })
        .state('donvis.details', {
            url: '/cap-nhat/:donviId',
            templateUrl: 'client/donvis/donvis-details/donvis-details.template.html',
            controller: 'DonVisDetailsCtrl'
        })
        // LOAITHONGSOKYTHUATS
        .state('loaithongsokythuats', {
            url: '/quan-ly/loai-thong-so-ky-thuat',
            template: '<loaithongsokythuats-main></loaithongsokythuats-main>'
        })
        .state('loaithongsokythuats.blank', {
            url: '/',
            template: '<loaithongsokythuats-blank></loaithongsokythuats-blank>'
        })
        .state('loaithongsokythuats.addNew', {
            url: '/tao-moi',
            templateUrl: 'client/loaithongsokythuats/loaithongsokythuats-add-new/loaithongsokythuats-add-new.template.html',
            controller: 'LoaiThongSoKyThuatsAddNewCtrl'
        })
        .state('loaithongsokythuats.content', {
            url: '/:loaithongsokythuatId',
            templateUrl: 'client/loaithongsokythuats/loaithongsokythuats-content/loaithongsokythuats-content.template.html',
            controller: 'LoaiThongSoKyThuatsContentCtrl'
        })
        .state('loaithongsokythuats.details', {
            url: '/cap-nhat/:loaithongsokythuatId',
            templateUrl: 'client/loaithongsokythuats/loaithongsokythuats-details/loaithongsokythuats-details.template.html',
            controller: 'LoaiThongSoKyThuatsDetailsCtrl'
        })
        // DIABANS
        .state('diabans', {
            url: '/quan-ly/dia-ban',
            template: '<diabans-main></diabans-main>'
        })
        .state('diabans.blank', {
            url: '/',
            template: '<diabans-blank></diabans-blank>'
        })
        .state('diabans.addNew', {
            url: '/tao-moi',
            templateUrl: 'client/diabans/diabans-add-new/diabans-add-new.template.html',
            controller: 'DiaBansAddNewCtrl'
        })
        .state('diabans.content', {
            url: '/:diabanId',
            templateUrl: 'client/diabans/diabans-content/diabans-content.template.html',
            controller: 'DiaBansContentCtrl'
        })
        .state('diabans.details', {
            url: '/cap-nhat/:diabanId',
            templateUrl: 'client/diabans/diabans-details/diabans-details.template.html',
            controller: 'DiaBansDetailsCtrl'
        })
        // LICHSUACHUAS
        .state('lichsuachuas', {
            url: '/quan-ly/lich-sua-chua',
            template: '<lichsuachuas-main></lichsuachuas-main>'
        })
        .state('lichsuachuas.blank', {
            url: '/',
            template: '<lichsuachuas-blank></lichsuachuas-blank>'
        })
        .state('lichsuachuas.addNew', {
            url: '/tao-moi',
            templateUrl: 'client/lichsuachuas/lichsuachuas-add-new/lichsuachuas-add-new.template.html',
            controller: 'LichSuaChuasAddNewCtrl'
        })
        .state('lichsuachuas.content', {
            url: '/:lichsuachuaId',
            templateUrl: 'client/lichsuachuas/lichsuachuas-content/lichsuachuas-content.template.html',
            controller: 'LichSuaChuasContentCtrl'
        })
        .state('lichsuachuas.details', {
            url: '/cap-nhat/:lichsuachuaId',
            templateUrl: 'client/lichsuachuas/lichsuachuas-details/lichsuachuas-details.template.html',
            controller: 'LichSuaChuasDetailsCtrl'
        })
        // THIETBIS
        .state('thietbis', {
            url: '/quan-ly/thiet-bi',
            template: '<thietbis-main></thietbis-main>'
        })
        .state('thietbis.list', {
            url: '/thong-ke',
            template: '<thietbis-list></thietbis-list>'
        })
        .state('thietbis.addNew', {
            url: '/tao-moi',
            template: '<thietbis-add-new></thietbis-add-new>'
        })
        .state('thietbis.content', {
            url: '/:thietbiId',
            templateUrl: 'client/thietbis/thietbis-content/thietbis-content.template.html',
            controller: 'ThietBisContentCtrl'
        })
        .state('thietbis.update', {
            url: '/cap-nhat/:thietbiId',
            template: '<thietbis-update></thietbis-update>'
        })
        // THONGSOKYTHUATS
        .state('thongsokythuats', {
            url: '/quan-ly/thong-so-ky-thuat',
            template: '<thongsokythuats-main></thongsokythuats-main>'
        })
        .state('thongsokythuats.list', {
            url: '/thong-ke',
            template: '<thongsokythuats-list></thongsokythuats-list>'
        })
        // CAUHOIS
        .state('cauhois', {
            url: '/quan-ly/ngan-hang-cau-hoi',
            template: '<cauhois-main></cauhois-main>',
            resolve: {
                meteorUser: ($q) => {
                    if (Meteor.userId() == null) {
                        return $q.reject('AUTH_REQUIRED');
                    } else if (!Meteor.user().emails[0].verified) {
                        return $q.reject('AUTH_NOT_VERIFIED');
                    } if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'super-manager', 'quanly-cauhois', 'xem-cauhois'], 'sky-project')) {
                        // Không đủ quyền xem nội dung câu hỏi
                        return $q.reject('AUTH_NOT_AUTHORIZED');
                    } else {
                        return $q.resolve();
                    }
                }
            }
        })
        .state('cauhois.addNew', {
            url: '/tao-moi',
            template: '<cauhois-add-new></cauhois-add-new>'
        })
        .state('cauhois.list', {
            url: '/thong-ke',
            template: '<cauhois-list></cauhois-list>'
        })
        .state('cauhois.update', {
            url: '/cap-nhat/:cauhoiId',
            template: '<cauhois-update></cauhois-update>'
        })
        // ADMIN
        .state('admin', {
            url: '/admin/quan-ly',
            template: '<admin-main></admin-main>',
            resolve: {
                meteorUser: ($q) => {
                    if (Meteor.userId() == null) {
                        return $q.reject('AUTH_REQUIRED');
                    } else if (!Meteor.user().emails[0].verified) {
                        return $q.reject('AUTH_NOT_VERIFIED');
                    } if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'super-manager'], 'sky-project')) {
                        // Không đủ quyền xem nội dung câu hỏi
                        return $q.reject('AUTH_NOT_AUTHORIZED');
                    } else {
                        return $q.resolve();
                    }
                }
            }
        })
        .state('admin.users_list', {
            url: '/users',
            template: '<admin-users-list></admin-users-list>',
        })
        // SUACHUAS
        .state('suachuas', {
            url: '/quan-ly/sua-chua-thiet-bi',
            template: '<suachuas-main></suachuas-main>',
            resolve: {
                meteorUser: ($q) => {
                    if (Meteor.userId() == null) {
                        return $q.reject('AUTH_REQUIRED');
                    } else if (!Meteor.user().emails[0].verified) {
                        return $q.reject('AUTH_NOT_VERIFIED');
                    } if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'super-manager', 'quanly-suachuas', 'xem-suachuas', 'support-suachuas'], 'sky-project')) {
                        // Không đủ quyền xem nội dung câu hỏi
                        return $q.reject('AUTH_NOT_AUTHORIZED');
                    } else {
                        return $q.resolve();
                    }
                }
            }
        })
        .state('suachuas.addNew', {
            url: '/tao-moi',
            template: '<suachuas-add-new></suachuas-add-new>'
        })
        .state('suachuas.list', {
            url: '/thong-ke',
            template: '<suachuas-list></suachuas-list>'
        })
        .state('suachuas.update', {
            url: '/cap-nhat/:suachuaId',
            template: '<suachuas-update></suachuas-update>'
        })
        // NHANSUS
        .state('nhansus', {
            url: '/quan-ly/nhan-su',
            template: '<nhansus-main></nhansus-main>',
            resolve: {
                data_nhansus: function($http){
                    return $http({ method: 'GET', url: '/data/data_nhansus.json' })
                        .then(function (data) {
                            return data.data;
                        });
                }
            }
        })
        .state('nhansus.blank', {
            url: '/',
            templateUrl: 'client/nhansus/nhansus-blank/nhansus-blank.template.html',
            controller: 'NhanSusBlankCtrl'
        })
        .state('nhansus.addNew', {
            url: '/tao-moi',
            templateUrl: 'client/nhansus/nhansus-add-new/nhansus-add-new.template.html',
            controller: 'NhanSusAddNewCtrl'
        })
        .state('nhansus.content', {
            url: '/:nhansuId',
            templateUrl: 'client/nhansus/nhansus-content/nhansus-content.template.html',
            controller: 'NhanSusContentCtrl'
        })
        .state('nhansus.details', {
            url: '/cap-nhat/:nhansuId',
            templateUrl: 'client/nhansus/nhansus-details/nhansus-details.template.html',
            controller: 'NhanSusDetailsCtrl'
        })
        
        .state('thongkes', {
            url: '/quan-ly/thong-ke-thiet-bi',
            template: '<thongkes-list></thongkes-list>'
        })
        .state('settings', {
            url: '/nguoi-dung/thiet-lap',
            template: '<settings-list></settings-list>'
        })
        .state('hosoluutrus', {
            url: '/quan-ly/ho-so-luu-tru',
            template: '<hosoluutrus-list></hosoluutrus-list>'
        })
        .state('hosoluutruDetails', {
            url: '/quan-ly/ho-so-luu-tru/:hosoluutruId',
            template: '<hosoluutru-details></hosoluutru-details>',
            resolve: {
                meteorUser: ($q) => {
                    if (Meteor.userId() == null) {
                        return $q.reject('AUTH_REQUIRED');
                    } else {
                        return $q.resolve();
                    }
                }
            }
        })
        .state('parties', {
            url: '/parties',
            template: '<parties-list></parties-list>'
        })
        .state('partyDetails', {
            url: '/parties/:partyId',
            template: '<party-details></party-details>',
            resolve: {
                meteorUser: ($q) => {
                    if (Meteor.userId() == null) {
                        return $q.reject('AUTH_REQUIRED');
                    } else if (!Meteor.user().emails[0].verified) {
                        return $q.reject('AUTH_NOT_VERIFIED');
                    } else {
                        return $q.resolve();
                    }
                }
            }
        })

        .state('manage_users', {
            url: '/quan-ly/users',
            templateUrl: 'client/users/views/users-list.html',
            controller: 'UsersListCtrl',
            resolve: {
                "meteorUser": ["$meteor", function($meteor) {
                    return $meteor.waitForUser();
                }]
            }
        })
        .state('manage_usersDetails', {
            url: '/quan-ly/users/:userId',
            templateUrl: 'client/users/views/user-details.html',
            controller: 'UserDetailsCtrl',
            resolve: {
                "meteorUser": ["$meteor", function($meteor) {
                    return $meteor.waitForUser();
                }]
            }
        })
        // .state('user_profile', {
        //     url: '/user/profile',
        //     templateUrl: 'client/accounts/views/user-profile.html',
        //     controller: 'UserProfileCtrl',
        //     resolve: {
        //         "meteorUser": ["$meteor", function($meteor) {
        //             return $meteor.waitForUser(); // Must fully resolve user
        //         }]
        //     }
        // })
        .state('user_settings', {
            url: '/user/settings',
            templateUrl: 'client/users/views/user-settings.html',
            controller: 'UserSettingsCtrl',
            resolve: {}
        })
        .state('notify_verifyEmail', {
            url: '/xac-nhan-email/:token',
            template: '<notify-verify-email></notify-verify-email>'
        })
        .state('notify_checkEmail', {
            url: '/notify/kiem-tra-email',
            template: '<notify-check-email></notify-check-email>'
        })
        .state('notify_resetMatKhau', {
            url: '/notify/reset-mat-khau',
            template: '<notify-reset-mat-khau></notify-reset-mat-khau>'
        })
        .state('notify_notAuthorized', {
            url: '/notify/noi-dung-bi-han-che',
            template: '<notify-not-authorized></notify-not-authorized>'
        })
        .state('users_resetPassword', {
            url: '/reset-mat-khau/:token',
            template: '<users-reset-password></users-reset-password>'
        })
        .state('users_profile', {
            url: '/users/profile/:userId',
            template: '<users-profile></users-profile>'
        })
        .state('login', {
            url: '/login',
            template: '<login></login>'
        });

    $urlRouterProvider.otherwise("/login");
});


angular.module('angular-skynet')
    .run(function($rootScope, $state, $stateParams, $http, $window, $timeout, variables) {

        // Load custom style (User profile)
        if (!localStorage.getItem("notification_style"))
            localStorage.setItem("notification_style", 'uikit');
        $rootScope.notificationStyle = localStorage.getItem("notification_style");

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            if (error === 'AUTH_REQUIRED') {
                $state.go('login');
            }
            if (error === 'AUTH_NOT_VERIFIED') {
                $state.go('notify_checkEmail');
            }
            if (error === 'AUTH_NOT_AUTHORIZED') {
                $state.go('notify_notAuthorized');
            }
            
        });

        $rootScope.$on('$stateChangeSuccess', function() {
           // scroll view to top
            $("html, body").animate({
                scrollTop: 0
            }, 200);

            $timeout(function() {
                $rootScope.pageLoading = false;
                $($window).resize();
            }, 300);

            $timeout(function() {
                $rootScope.pageLoaded = true;
                $rootScope.appInitialized = true;
                // wave effects
                $window.Waves.attach('.md-btn-wave,.md-fab-wave', ['waves-button']);
                $window.Waves.attach('.md-btn-wave-light,.md-fab-wave-light', ['waves-button', 'waves-light']);
            }, 600);
        });

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            // Chỉ sử dụng darktheme cho quản lý xưởng DVKT
            $("body").removeClass("skynet-dark-theme-background");

            // Chú ý: chế độ mặc định luôn hiển thị mainSidebar và mainHeader
            $rootScope.hideMainSidebar = false;
            $rootScope.hideMainHeader = false;
            $rootScope.hideStyleSwitcher = false;

            // main search
            $rootScope.mainSearchActive = false;
            // single card
            $rootScope.headerDoubleHeightActive = false;
            // top bar
            $rootScope.toBarActive = false;
            // page heading
            $rootScope.pageHeadingActive = false;
            // top menu
            $rootScope.topMenuActive = false;
            // full header
            $rootScope.fullHeaderActive = false;
            // full height
            $rootScope.page_full_height = false;
            // secondary sidebar
            $rootScope.sidebar_secondary = false;
            $rootScope.secondarySidebarHiddenLarge = false;

            if ($($window).width() < 1220) {
                // hide primary sidebar
                $rootScope.primarySidebarActive = false;
                $rootScope.hide_content_sidebar = false;
            }
            if (!toParams.hasOwnProperty('hidePreloader')) {
                $rootScope.pageLoading = true;
                $rootScope.pageLoaded = false;
            }

        });

        // fastclick (eliminate the 300ms delay between a physical tap and the firing of a click event on mobile browsers)
            FastClick.attach(document.body);

            // get version from package.json
            $http.get('./package.json').success(function(response) {
                $rootScope.appVer = response.version;
            });

            // modernizr
            $rootScope.Modernizr = Modernizr;

            // get window width
            var w = angular.element($window);
            $rootScope.largeScreen = w.width() >= 1220;

            w.on('resize', function() {
                return $rootScope.largeScreen = w.width() >= 1220;
            });

            // show/hide main menu on page load
            $rootScope.primarySidebarOpen = ($rootScope.largeScreen) ? true : false;

            $rootScope.pageLoading = true;

            // wave effects
            $window.Waves.init();
    })
    .run([
        'PrintToConsole',
        function(PrintToConsole) {
            // app debug
            PrintToConsole.active = false;
        }
    ])
    // Cấu hình angular-moment tiếng việt
    .run(function(amMoment) {
        amMoment.changeLocale('vi');
    });
