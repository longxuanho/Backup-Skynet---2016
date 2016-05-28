angular.module('angular-skynet').directive('topHeader', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/altair/app/shared/top-header/top-header.html',
        controllerAs: 'TopHeader',
        controller: function($scope, skynetHelpers, $timeout, $window, $state, iNotifier) {

            // ***************************************************
            // INITIALIZE
            // ***************************************************

            $scope._data = skynetHelpers.data;



            $scope.user_data = {
                name: "Lue Feest",
                avatar: "/assets/img/avatars/avatar_11_tn.png",
                alerts: [{
                    "title": "Hic expedita eaque.",
                    "content": "Nemo nemo voluptatem officia voluptatum minus.",
                    "type": "warning"
                }, {
                    "title": "Voluptatibus sed eveniet.",
                    "content": "Tempora magnam aut ea.",
                    "type": "success"
                }, {
                    "title": "Perferendis voluptatem explicabo.",
                    "content": "Enim et voluptatem maiores ab fugiat commodi aut repellendus.",
                    "type": "danger"
                }, {
                    "title": "Quod minima ipsa.",
                    "content": "Vel dignissimos neque enim ad praesentium optio.",
                    "type": "primary"
                }],
                messages: [{
                    "title": "Reiciendis aut rerum.",
                    "content": "In adipisci amet nostrum natus recusandae animi fugit consequatur.",
                    "sender": "Korbin Doyle",
                    "color": "cyan"
                }, {
                    "title": "Tenetur commodi animi.",
                    "content": "Voluptate aut quis rerum laborum expedita qui eaque doloremque a corporis.",
                    "sender": "Alia Walter",
                    "color": "indigo",
                    "avatar": "/assets/img/avatars/avatar_07_tn.png"
                }, {
                    "title": "At quia quis.",
                    "content": "Fugiat rerum aperiam et deleniti fugiat corporis incidunt aut enim et distinctio.",
                    "sender": "William Block",
                    "color": "light-green"
                }, {
                    "title": "Incidunt sunt.",
                    "content": "Accusamus necessitatibus officia porro nisi consectetur dolorem.",
                    "sender": "Delilah Littel",
                    "color": "blue",
                    "avatar": "/assets/img/avatars/avatar_02_tn.png"
                }, {
                    "title": "Porro ut.",
                    "content": "Est vitae magni eum expedita odit quisquam natus vel maiores.",
                    "sender": "Amira Hagenes",
                    "color": "amber",
                    "avatar": "/assets/img/avatars/avatar_09_tn.png"
                }]
            };

            $scope.alerts_length = $scope.user_data.alerts.length;
            $scope.messages_length = $scope.user_data.messages.length;


            $('#menu_top').children('[data-uk-dropdown]').on('show.uk.dropdown', function() {
                $timeout(function() {
                    $($window).resize();
                }, 280)
            });

            // ***************************************************
            // SUBSCRIBES
            // ***************************************************

            $scope.subscribe('users');

            // ***************************************************
            // REACTIVE HELPERS
            // ***************************************************

            $scope.helpers({
                currentUser: () => {
                    return Meteor.user();
                },
                isLoggedIn: () => {
                    return Meteor.userId() !== null;
                }
            });

            // ***************************************************
            // UTILS
            // ***************************************************
            $scope.utils = {
                logout: () => {
                    Accounts.logout((err) => {
                        if (err) {
                            $scope.error = err;
                            iNotifier.error("Có lỗi xảy ra khi đang thực hiện đăng xuất tài khoản của bạn. Xin vui lòng thử lại sau.");
                            console.log('Có lỗi khi đăng nhập: ', err);
                        } else {
                            iNotifier.success("Bye : )");
                            $state.go($scope._data.states.login);
                        }
                    });
                }
            };
        }
    }
});
