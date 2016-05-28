angular.module('angular-skynet').directive('dashboardSuachuasViewList', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/dashboard/dashboard-suachuas/dashboard-suachuas-view-list.template.html',
        controllerAs: 'vm',
        bindToController: true,

        controller: function($scope, $stateParams, $state, skynetHelpers, $rootScope, iNotifier, $reactive, skynetDictionary, variables, $timeout) {

            $reactive(this).attach($scope);

            // ***************************************************
            // INITIALIZE
            // ***************************************************

            // Capture 'this contex - Refer to https://github.com/johnpapa/angular-styleguide#controlleras-with-vm
            let vm = this;

            vm._data = skynetHelpers.data;
            vm._helpers = skynetHelpers.helpers;

            vm.pageOptions = {
                groupBy: {
                    selectedId: 'phan_loai.nhom_tb.ten',            
                    source: [
                        {
                            ma: 'phan_loai.loai_sua_chua.ten',
                            ten: 'Loại sửa chữa',
                            ten_ngan: 'Loại SC'   
                        }, {
                            ma: 'dia_diem.khu_vuc.ten',
                            ten: 'Khu vực',
                            ten_ngan: 'K.vực'
                        }, {
                            ma: 'phan_loai.loai_tb.ten',
                            ten: 'Loại phương tiện',
                            ten_ngan: 'Loại PT'
                        }, {
                            ma: 'phan_loai.nhom_tb.ten',
                            ten: 'Nhóm thiết bị',
                            ten_ngan: 'Nhóm TB'
                        },
                    ]
                }
            };

            vm.pageData = {
                suachuasRaw: [],
                suachuasDataSource: new kendo.data.DataSource({
                    data: [],
                    aggregate: [
                        { field: '_id', aggregate: 'count' }
                    ],
                    group: { 
                        field: 'phan_loai.loai_sua_chua.ten',
                        aggregates: [
                            { field: '_id', aggregate: "count" }
                        ]
                    },
                    sort: { field: 'metadata.ngay_tao', dir: 'desc' }
                }),
                statistics: {}
            }

            $rootScope.toBarActive = true;

            let $mailbox = $('#mailbox'),
                $split_view_btn = $("#mailbox_list_split"),
                $combined_view_btn = $("#mailbox_list_combined"),
                anim_duration = 250;

            $mailbox.hasClass("md-card-list-combined") ? $combined_view_btn.click() : $split_view_btn.hide()
            
            // Quan trọng: Gán hàm reverse cho jQuery
            jQuery.fn.reverse = [].reverse;

            // show message details
            $mailbox.on('click', '.md-card-list ul > li', function(e) {

                if ( !$(e.target).closest('.md-card-list-item-menu').length && !$(e.target).closest('.md-card-list-item-select').length ) {

                    var $this = $(this);

                    if (!$this.hasClass('item-shown')) {
                        // get height of clicked message
                        var el_min_height = $this.height() + $this.children('.md-card-list-item-content-wrapper').actual("height");

                        // hide opened message
                        $mailbox.find('.item-shown').velocity("reverse", {
                            begin: function (elements) {
                                $(elements).removeClass('item-shown').children('.md-card-list-item-content-wrapper').hide().velocity("reverse");
                            }
                        });

                        // show message
                        $this.velocity({
                            marginTop: 40,
                            marginBottom: 40,
                            marginLeft: -20,
                            marginRight: -20,
                            minHeight: el_min_height
                        }, {
                            duration: 300,
                            easing: variables.easing_swiftOut,
                            begin: function (elements) {
                                $(elements).addClass('item-shown');
                            },
                            complete: function (elements) {
                                // show: message content, reply form
                                $(elements).children('.md-card-list-item-content-wrapper').show().velocity({
                                    opacity: 1
                                });

                                // scroll to message
                                var container = $('body'),
                                    scrollTo = $(elements);
                                container.animate({
                                    scrollTop: scrollTo.offset().top - $('#page_content').offset().top - 8
                                }, 1000, variables.bez_easing_swiftOut);

                            }
                        });
                    }
                }
            });

            // hide message on: outside click, esc button
            $(document).on('click keydown', function(e) {
                if (
                    ( !$(e.target).closest('li.item-shown').length ) || e.which == 27
                ) {
                    $mailbox.find('.item-shown').velocity("reverse", {
                        begin: function(elements) {
                            $(elements).removeClass('item-shown').children('.md-card-list-item-content-wrapper').hide().velocity("reverse");
                        }
                    });
                }
            });

        

            // ***************************************************
            // SUBSCRIBE
            // ***************************************************

            // ***************************************************
            // REACTIVE HELPERS
            // ***************************************************

            vm.helpers({
                suachuas: () => {
                    vm.pageData.suachuasDataSource.data(SuaChuas.find({
                        'trang_thai.ma': 'dang_sua_chua'
                    }).fetch());
                    vm.pageData.suachuasDataSource.fetch(function(){
                        vm.pageData.suachuasRaw = vm.pageData.suachuasDataSource.view();
                        vm.pageData.statistics = vm.pageData.suachuasDataSource.aggregates();
                    });
                    return SuaChuas.find({
                        'trang_thai.ma': 'dang_sua_chua'
                    });
                },
                // logs: () => {
                //     // Tìm bản ghi log cuối cùng trên hệ thống
                //     console.log('new action: ', SuaChuaLogs.findOne({}, {sort:{_id:-1}})); 
                // }
            });
            

            // ***************************************************
            // METHODS
            // ***************************************************
            


            // ***************************************************
            // UTILS
            // ***************************************************

            vm.utils = {
                setGroupById: function(id) {
                    vm.pageOptions.groupBy.selectedId = id;
                },
                combineListView: function() {
                    let $mailbox = $('#mailbox'),
                        $split_view_btn = $("#mailbox_list_split"),
                        $combined_view_btn = $("#mailbox_list_combined"),
                        $msg_list = $mailbox.find(".md-card-list");
                    
                    $combined_view_btn.velocity("transition.expandOut", {
                        duration: anim_duration,
                        easing: variables.easing_swiftOut,
                        begin: function () {
                            $mailbox.addClass("md-card-list-combined").find(".md-card-list-header").not(".md-card-list-header-combined").velocity("transition.expandOut", {
                                duration: anim_duration,
                                easing: variables.easing_swiftOut,
                                begin: function () {
                                    $msg_list.each(function (i) {
                                        0 != i && $(this).velocity({
                                            marginTop: "0"
                                        }, {
                                            duration: anim_duration + 200,
                                            easing: variables.easing_swiftOut
                                        })
                                    })
                                },
                                complete: function () {
                                    $mailbox.find(".md-card-list-header-combined").velocity("transition.expandIn", {
                                        duration: anim_duration,
                                        easing: variables.easing_swiftOut
                                    })
                                }
                            })
                        },
                        complete: function () {
                            $split_view_btn.velocity("transition.expandIn", {
                                duration: anim_duration,
                                easing: variables.easing_swiftOut
                            });
                        }
                    });
                },
                splitListView: function() {


                    let $mailbox = $('#mailbox'),
                        $split_view_btn = $("#mailbox_list_split"),
                        $combined_view_btn = $("#mailbox_list_combined"),
                        $msg_list = $mailbox.find(".md-card-list");

                    $split_view_btn.velocity("transition.expandOut", {
                        duration: anim_duration,
                        easing: variables.easing_swiftOut,
                        begin: function () {
                            var i = $mailbox.find(".md-card-list"),
                                t = i.length;
                            $mailbox.find(".md-card-list-header-combined").velocity("transition.expandOut", {
                                duration: anim_duration,
                                easing: variables.easing_swiftOut
                            });
                            i.reverse().each(function (i) {
                                i != t - 1 && $(this).velocity("reverse", {
                                    duration: anim_duration + 200,
                                    easing: variables.easing_swiftOut
                                })
                            });
                            setTimeout(function () {
                                $mailbox.removeClass("md-card-list-combined"), $(".md-card-list-header").not(".md-card-list-header-combined").show().velocity("reverse")
                            }, 500);
                        },
                        complete: function () {
                            $combined_view_btn.velocity("transition.expandIn", {
                                duration: anim_duration,
                                easing: variables.easing_swiftOut
                            })
                        }
                    })
                }
            };

            // ***************************************************
            // WATCHERS
            // ***************************************************

            $scope.$watch('vm.pageOptions.groupBy.selectedId', (newVal) => {
                if (newVal) {
                    vm.pageData.suachuasDataSource.group({
                        field: newVal,
                        aggregates: [
                            { field: '_id', aggregate: "count" }
                        ]
                    });
                    vm.pageData.suachuasDataSource.fetch(function(){
                        vm.pageData.suachuasRaw = vm.pageData.suachuasDataSource.view();
                        vm.pageData.statistics = vm.pageData.suachuasDataSource.aggregates();
                    });
                }
            });

        }
    }
});

angular.module('angular-skynet')
.filter("lastCharacter", function() {
    return function(x) {
        if (x) {
            return x.charAt(x.length - 1).toUpperCase();
        } else {
            return null;
        }
    };
});