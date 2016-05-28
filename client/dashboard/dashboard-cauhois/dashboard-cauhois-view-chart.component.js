angular.module('angular-skynet').directive('dashboardCauhoisViewChart', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/dashboard/dashboard-cauhois/dashboard-cauhois-view-chart.template.html',
        controllerAs: 'vm',
        bindToController: true,

        controller: function($scope, $stateParams, $state, skynetHelpers, $rootScope, iNotifier, $reactive, skynetDictionary, skynetLiveOptions, $timeout, variables) {

            $reactive(this).attach($scope);

            // ***************************************************
            // INITIALIZE
            // ***************************************************

            // Capture 'this contex - Refer to https://github.com/johnpapa/angular-styleguide#controlleras-with-vm
            let vm = this;

            vm._data = skynetHelpers.data;
            vm._helpers = skynetHelpers.helpers;
            vm._kOptions = skynetLiveOptions.cauhois.kendo.options.charts.dashboard;
            vm._skylogs = skynetLiveOptions.skylogs.cauhois;
            vm.dictionary = angular.copy(skynetDictionary.data.nganhangcauhois.data.ky_thuat.trac_nghiem);

            vm.pageData = {
                default: {
                    colorPalette: ['#FF4081', '#03a9f4', '#607D8B']
                },
                loai_tbs: {},
                nhom_cau_hois: [],
                statistics: {
                    cauhois: {
                        total: 0,
                        big_total: 0,
                        count_loaitbs: 0,
                        percent_kythuats_vs_all: 0,
                        percent_effective: 0,
                        percent_users_online: 0
                    }
                }
            }      

            vm.pageOptions = {
                ui: {
                    modals: {
                        isViewActivities: false,
                    }
                },
                epc: {
                    cauhois_total: {
                        barColor:'#03a9f4',
                        scaleColor: false,
                        trackColor: '#f5f5f5',
                        lineWidth: 5,
                        size: 110,
                        easing: variables.bez_easing_swiftOut
                    },
                    user_status: {
                        barColor:'#ACDB39',
                        scaleColor: false,
                        trackColor: '#f5f5f5',
                        lineWidth: 5,
                        size: 110,
                        easing: variables.bez_easing_swiftOut
                    }
                },
                charts: {
                    small_bar_ratio: {
                        theme: "material",
                        seriesDefaults: {
                            type: "column",
                            gap: 4,
                            spacing: 0.8
                        },
                        valueAxis: {
                            labels: {
                                visible: false
                            },
                            line: {
                                visible: false
                            }
                        },
                        categoryAxis: {
                            line: {
                                visible: false
                            }
                        },
                        series: [{
                                name: "Thực tế",
                                data: [],
                                color: vm.pageData.default.colorPalette[1],
                                tooltip: {
                                    visible: true,
                                    format: "Tổng số: {0}"
                                }
                            }, {
                                name: "Phân bố",
                                data: [],
                                color: vm.pageData.default.colorPalette[2],
                                tooltip: {
                                    visible: true,
                                    format: "Phân bố: {0}"
                                }
                            }]
                    },
                    small_line_activities: {
                        chartArea: {
                            background: ""
                        },
                        seriesDefaults: {
                            type: "line",
                            style: "smooth"
                        },
                        dataSource: kendo.data.DataSource.create({
                            data: []
                        }),
                        series: [{
                            field: "value",
                            markers: {
                              visible: false
                            },
                            color: "#004358"
                        }],
                        legend: {
                            visible: false
                        },
                        valueAxis: {
                            line: {
                                visible: false
                            },
                            labels: {
                                visible: false
                            }
                        },
                        categoryAxis: {
                            field: "category",
                            line: {
                                visible: false
                            },
                            labels: {
                                visible: false
                            }
                        },
                        tooltip: {
                            visible: true,
                            format: "{0}%",
                            template: "#= category #: #= value #"
                        }
                    },
                    donut_nhomtbs_countId: {
                        theme: "material",
                        title: {
                            position: "bottom",
                            text: "Biểu đồ phân bố câu hỏi NGB",
                            font: "16px Roboto,Arial,Helvetica,sans-serif"
                        },
                        legend: {
                            visible: true,
                            position: 'top'
                        },
                        seriesDefaults: {
                            type: "donut",
                            startAngle: 0
                        },
                        series: [{
                            name: 'inside',                            
                            holeSize: 60,
                            data: []
                        }, {
                            name: 'outside',
                            data: [],
                            labels: {
                                visible: true,
                                background: "transparent",
                                position: "outsideEnd",
                                template: "#= category #\n#= value # câu hỏi"
                            }
                        }],
                        tooltip: {
                            visible: true,
                            template: "#= category #: #= value # câu hỏi (#= kendo.format('{0:P0}', percentage) #)"
                        }
                    },
                    donut_large_nhomtbs_countId: {
                        theme: "material",
                        title: {
                            text: "Theo các nhóm thiết bị",
                            font: "16px Roboto,Arial,Helvetica,sans-serif"
                        },
                        legend: {
                            position: "bottom"
                        },
                        dataSource: kendo.data.DataSource.create({
                            data: []
                        }),
                        seriesDefaults: {
                            type: "donut",
                            startAngle: 0
                        },
                        series: [{
                            field: 'value',
                            categoryField: 'category',
                            colorField: 'color',
                            holeSize: 70,
                            labels: {
                                visible: true,
                                background: "transparent",
                                position: "outsideEnd",
                                template: "#= category #\n#= value # câu hỏi"
                            }
                        }],
                        tooltip: {
                            visible: true,
                            template: "#= category #: #= value # câu hỏi (#= kendo.format('{0:P0}', percentage) #)"
                        },
                    },
                    donut_large_nhomcauhois_countId: {
                        theme: "material",
                        title: {
                            text: "Theo các nhóm nội dung",
                            font: "16px Roboto,Arial,Helvetica,sans-serif"
                        },
                        legend: {
                            position: "bottom"
                        },
                        dataSource: kendo.data.DataSource.create({
                            data: []
                        }),
                        seriesDefaults: {
                            type: "donut",
                            startAngle: 0
                        },
                        series: [{
                            field: 'value',
                            categoryField: 'category',
                            colorField: 'color',
                            holeSize: 70,
                            labels: {
                                visible: true,
                                background: "transparent",
                                position: "outsideEnd",
                                template: "#= category #\n#= value # câu hỏi"
                            }
                        }],
                        tooltip: {
                            visible: true,
                            template: "#= category #: #= value # câu hỏi (#= kendo.format('{0:P0}', percentage) #)"
                        },
                    },
                    bar_loaitbs_countId: {
                        theme: "material",
                        legend: {
                            visible: false
                        },
                        seriesDefaults: {
                            type: "bar"
                        },
                        dataSource: kendo.data.DataSource.create({
                            data: []
                        }),
                        series: [{
                            categoryField: "category",
                            field: "value",
                            colorField: "color",
                            labels: {
                                visible: true,
                                background: "transparent",
                                position: "outsideEnd",
                                template: "#= value #"
                            }
                        }],
                        tooltip: {
                            visible: true,
                            template: "#= category #: #= value # câu hỏi"
                        }
                    },
                    bar_large_loaitbs_countId: {
                        theme: "material",
                        title: {
                            text: "Phân bố câu hỏi theo các bộ đề",
                            font: "16px Roboto,Arial,Helvetica,sans-serif"
                        },
                        legend: {
                            visible: false
                        },
                        seriesDefaults: {
                            type: "bar"
                        },
                        dataSource: kendo.data.DataSource.create({
                            data: []
                        }),
                        series: [{
                            categoryField: "category",
                            field: "value",
                            colorField: "color",
                            labels: {
                                visible: true,
                                background: "transparent",
                                position: "outsideEnd",
                                template: "#= value #"
                            }
                        }],
                        tooltip: {
                            visible: true,
                            template: "#= category #: #= value # câu hỏi"
                        }
                    },
                    bar_large_nhomcauhois_countId: {
                        theme: "material",
                        title: {
                            text: "Phân bố câu hỏi theo nhóm nội dung",
                            font: "16px Roboto,Arial,Helvetica,sans-serif"
                        },
                        legend: {
                            visible: true,
                            position: 'top'
                        },
                        seriesDefaults: {
                            type: "column",
                            stack: {
                                type: "100%"
                            }
                        },
                        series: [],
                        valueAxis: {
                            line: {
                                visible: false
                            },
                            minorGridLines: {
                                visible: true
                            }
                        },
                        categoryAxis: {
                            categories: [],
                            labels: {
                                rotation: 'auto'
                            },
                            majorGridLines: {
                                visible: false
                            }
                        },
                        tooltip: {
                            visible: true,
                            template: "#= series.name #: #= value # câu hỏi (#= kendo.format('{0:P0}', percentage) #)"
                        }
                    },
                    area_modal_activities_countId: {
                        theme: "material",
                        title: {
                            text: "Các tương tác người dùng trên hệ thống \n /Thống kê trong 7 ngày gần nhất/",
                            font: "16px Roboto,Arial,Helvetica,sans-serif"
                        },
                        legend: {
                            position: "bottom"
                        },
                        seriesDefaults: {
                            type: "area",
                            area: {
                                line: {
                                    style: "smooth"
                                }
                            }
                        },
                        series: [{
                            name: "Tạo mới",
                            data: [4, 8, 8, 9, 9, 10, 4],
                            color: '#83BC2D',
                            opacity: 0.5
                        }, {
                            name: "Gỡ bỏ",
                            data: [2, 3, 4, 3, 4, 3, 1],
                            color: '#F26C69',
                            opacity: 0.5
                        }, {
                            name: "Cập nhật",
                            data: [0, 0, 3, 2, 2, 3, 1],
                            color: '#5988B4',
                            opacity: 0.5
                        }],
                        valueAxis: {
                            labels: {
                                format: "{0}"
                            },
                            line: {
                                visible: false
                            },
                            axisCrossingValue: -10
                        },
                        categoryAxis: {
                            categories: ['2016-03-29', '2016-03-30', '2016-03-31', '2016-04-01', '2016-04-02', '2016-04-03', '2016-04-04'],
                            majorGridLines: {
                                visible: false
                            },
                            labels: {
                                visible: false
                            }
                        },
                        tooltip: {
                            visible: true,
                            format: "{0}%",
                            template: "#= category #: #= value # lượt #= series.name.toLowerCase() #" 
                        }
                    }
                },
                grids: {
                    refs: {
                        activities_modal_grid: {}
                    },
                    activities_modal_grid: {
                        dataSource: kendo.data.DataSource.create({
                            data: [],
                            page: 1,
                            group: [
                                { field: 'when.time_day_str', dir: 'desc' },
                                { field: 'user.userName' },
                                { field: 'action', dir: 'desc' }
                            ],
                            pageSize: 10
                        }),
                        columns: [
                            {
                                field: "_id",
                                title: "ID",
                                width: "100px",
                                hidden: true
                            }, {
                                field: "when.time_day_str",
                                title: "Ngày",
                                width: "100px",
                                hidden: true
                            }, {
                                field: "user.userName",
                                title: "Người dùng",
                                width: "150px",
                                hidden: true,
                                groupHeaderTemplate: "#= value #",
                            }, {
                                field: "action",
                                title: "Thao tác",
                                width: "150px",
                                groupHeaderTemplate: "#= value #",
                                hidden: true
                            }, {
                                field: "section",
                                title: "Nhóm",
                                width: "70px"
                            }, {
                                field: "target.desc",
                                title: "Trường dữ liệu",
                                width: "140px",
                                hidden: true
                            }, {
                                field: "target.ref",
                                title: "Câu hỏi",
                                width: "140px",
                                attributes: {
                                    style: "text-overflow: ellipsis;white-space: nowrap;"
                                }
                            }
                        ],
                        filterable: {
                            mode: 'menu',
                            extra: false
                        },
                        groupable: {
                            enabled: false,
                            showFooter: false
                        },
                        pageable: {
                            pageSize: 2,
                            refresh: false,
                            pageSizes: false,
                            info: true,
                            buttonCount: 3,
                            numeric: false,
                            input: true,
                            previousNext: true
                        },
                        reorderable: true,
                        resizable: true,
                        sortable: {
                            mode: "single",
                            allowUnsort: true
                        },
                        filterMenuInit: function(e) {
                            if (_.contains([
                                    "section",
                                    "target.desc",
                                    "target.ref"
                                ], e.field)) {
                                let firstValueDropDown = e.container.find("select:eq(0)").data("kendoDropDownList");
                                firstValueDropDown.value("contains");
                                firstValueDropDown.trigger("change");
                            }
                        }
                    }
                }
            };            

            // ***************************************************
            // SUBSCRIBE
            // ***************************************************
            $scope.subscribe('skylogs_cauhois_kythuat');

            // ***************************************************
            // UTILS
            // ***************************************************

            vm.utils = {
                ui: {
                    modals: {
                        show_modal_activities: function() {
                            // Bật cờ isViewActivities để kích hoạt quá trình khởi tạo chart và grid - Cờ chỉ bật một lần
                            vm.pageOptions.ui.modals.isViewActivities = true;
                            // chờ 1s sau đó show modal..
                            $timeout(() => {
                                let modal = UIkit.modal("#modal_cauhois_view_activities");
                                if (!modal.isActive())
                                    modal.show();
                            }, 1000);                            
                        },
                        close_modal_activities: function() {
                            // close modal..
                            let modal = UIkit.modal("#modal_cauhois_view_activities");
                            if (modal.isActive())
                                modal.hide();
                        }
                    }    
                },
                processDataSource: {
                    resolve_loaitbs: function() {
                        let rawData = _.groupBy(DataHelpers.find({
                            'subject': 'cauhois',
                            'category': 'loai_tbs'
                        }, {
                            sort: {
                                'container.ref': 1,
                                'container.text': 1
                            }
                        }).fetch(), (item) => {
                            // Nhóm dữ liệu theo nhóm thiết bị
                            return item.container.ref;
                        });
                        let keys = _.keys(rawData);
                        // Với mỗi nhóm thiết bị, thêm giá trị màu sắc tham chiếu cho biểu đồ và đưa vào vm.pageData.loai_tbs
                        _.each(keys, (key, index) => {
                            vm.pageData.loai_tbs[key] = {};
                            vm.pageData.loai_tbs[key]['color'] = vm._kOptions.color.palettes['Vitamin C'][index];
                            vm.pageData.loai_tbs[key]['data'] = rawData[key];
                        });
                        // console.log('vm.pageData: ', vm.pageData);
                    },
                    resolve_nhomcauhois: function() {
                        _.each(skynetDictionary.data.nganhangcauhois.data.ky_thuat.trac_nghiem.nhom_cau_hois, (item, index) => {
                            vm.pageData.nhom_cau_hois[item.ten] = {
                                color: vm._kOptions.color.palettes['Blue Mono'][index]
                            };
                        });
                    },
                    resolve_time_range_week: function() {
                        // Reset khoảng thời gian tuần và tính lại thời gian từ ngày này về trước (1 tuần)
                        vm._skylogs.time_ranges.week = [];
                        
                        let offset_days = _.range(6, -1, -1);    // Output: 6, 5, 4, 3, 2, 1, 0
                        _.each(offset_days, (num) => {
                            vm._skylogs.time_ranges.week.push(moment().subtract(num, 'day').format("YYYY-MM-DD"));
                        });
                    }
                },
                massageDataSource: {
                    massage: function (dataSource) {
                        // Bước 0: Xử lý dữ liệu cho các thống kê statistics
                        vm.utils.massageDataSource.resolve_statistics(dataSource);
                        // Bước 1: Xử lý dữ liệu cho đồ thị bar_loaitbs_countId
                        vm.utils.massageDataSource.resolve_bar_loaitbs_countId(dataSource);
                        // Bước 2: Xử lý dữ liệu cho đồ thị donut_nhomtbs_countId
                        vm.utils.massageDataSource.resolve_donut_nhomtbs_countId(dataSource);
                    },
                    resolve_statistics: function(dataSource) {
                        // Tổng số câu hỏi thi NGB được trả về từ DB
                        vm.pageData.statistics.cauhois.total = dataSource.aggregates()['_id'].count;
                        // Tính lại các chỉ số phần trăm
                        if (vm.numberOfCauHoisTotal)
                            vm.pageData.statistics.cauhois.percent_kythuats_vs_all = vm.pageData.statistics.cauhois.total / vm.numberOfCauHoisTotal * 100;
                        if (vm.pageData.statistics.cauhois.big_total)
                            vm.pageData.statistics.cauhois.percent_effective = vm.pageData.statistics.cauhois.total / vm.pageData.statistics.cauhois.big_total * 100;
                        // Cập nhật cho biểu đồ hiệu quả quản lý
                        vm.pageOptions.charts.small_bar_ratio.series[0].data = [vm.pageData.statistics.cauhois.total];
                        vm.pageOptions.charts.small_bar_ratio.series[1].data = [vm.pageData.statistics.cauhois.big_total];
                    },
                    resolved_bar_series_nhomcauhois_countId: function(detail_resolved_data, new_categories) {
                        // console.log('received data: ', detail_resolved_data, new_categories)
                        // Xử lý dữ liệu data cho  bar_large_nhomcauhois_countId: Với mỗi phần được lọc, ta chia nhóm nhỏ hơn để lấy các giá trị thống kê:
                        let new_series = [];

                        _.each(_.keys(vm.pageData.nhom_cau_hois), (key) => {
                            let obj = {
                                name: key,
                                color: vm.pageData.nhom_cau_hois[key] ? vm.pageData.nhom_cau_hois[key]['color'] : vm.pageData.default.colorPalette[0],
                                data: []
                            };
                            _.each(new_categories, (loaitb) => {
                                obj.data.push(
                                    detail_resolved_data[loaitb][key] ? detail_resolved_data[loaitb][key] : 0
                                );
                            });
                            new_series.push(obj);
                        });

                        vm.pageOptions.charts.bar_large_nhomcauhois_countId.categoryAxis.categories = new_categories;
                        vm.pageOptions.charts.bar_large_nhomcauhois_countId.series = new_series;

                        // console.log('new_series: ', new_series)
                    },   
                    resolve_bar_loaitbs_countId: function(dataSource) {
                        // Tính toán các số liệu về câu hỏi tương ứng với các bộ đề (chia theo loại thiết bị) - Sử dụng các filters
                        if (!_.isEmpty(vm.pageData.loai_tbs)) {
                            let resolved = [],
                                // Dùng cho dữ liệu biểu đồ cột chi tiết khi phóng lớn, quan hệ tỷ lệ giữa nhóm nội dung theo các bộ đề, column stack 100%
                                new_detail_resolved = {}, 
                                new_categories = []; 
                            
                            // Với mỗi nhóm thiết bị, áp dụng các filter theo nhóm rồi theo loại thiết bị, từ đó tính ra số lượng câu hỏi
                            _.each(_.keys(vm.pageData.loai_tbs), (key) => {
                                _.each(vm.pageData.loai_tbs[key].data, (loaitb, index) => {
                                    dataSource.filter({
                                        logic: "and",
                                        filters: [
                                            { field: "phan_loai.nhom_tb.ten", operator: "eq", value: key },
                                            { field: "fields.loai_tb", operator: "contains", value: loaitb.container.text }
                                        ]
                                    });
                                    let count = dataSource.view().length;
                                    if (count) {
                                        // Nếu có câu hỏi trong loại thiết bị này, xuất ra thống kê để hiển trị trên đồ thị
                                        resolved.push({
                                            category: loaitb.container.text,
                                            value: count,
                                            color: vm.pageData.loai_tbs[key] ? vm.pageData.loai_tbs[key]['color'] : vm.pageData.default.colorPalette[0]
                                        });
                                    }
                                    // Tiếp theo xử lý dữ liệu cho bar_large_nhomcauhois_countId: Với mỗi phần được lọc, ta chia nhóm nhỏ hơn để lấy các giá trị thống kê:
                                    dataSource.group({ 
                                        field: 'phan_loai.nhom_cau_hoi.ten',
                                        aggregates: [{ field: "_id", aggregate: "count" }],
                                    });
                                    new_detail_resolved[loaitb.container.text] = {};
                                    _.each(dataSource.view(), (view) => {
                                        new_detail_resolved[loaitb.container.text][view.value] = view.items.length;
                                    });
                                    new_categories.push(loaitb.container.text);
                                    // Reset group
                                    dataSource.group([]);
                                });                               
                            });                            

                            // Sau khi thống kê xong, reset filter.
                            dataSource.filter({});

                            // Cập nhật phần thống kê dữ liệu
                            vm.pageData.statistics.cauhois.big_total = 0;
                            vm.pageData.statistics.cauhois.count_loaitbs = resolved.length;

                            _.each(resolved, (item) => {
                                vm.pageData.statistics.cauhois.big_total += item.value;
                            });                            

                            // Feed dữ liệu cho bar_large_nhomcauhois_countId: Với mỗi phần được lọc, ta chia nhóm nhỏ hơn để lấy các giá trị thống kê:
                            this.resolved_bar_series_nhomcauhois_countId(new_detail_resolved, new_categories);
                            // Feed dữ liệu cho bar_loaitbs_countId và bar_large_loaitbs_countId
                            vm.pageOptions.charts.bar_loaitbs_countId.dataSource.data(resolved);
                            vm.pageOptions.charts.bar_large_loaitbs_countId.dataSource.data(resolved);
                        }
                    },              
                    resolve_donut_nhomtbs_countId: function(dataSource) {
                        // Nhóm dữ liệu theo các nhóm thiết bị và lấy các số liệu thống kê (Tính toán số liệu cho donut vòng ngoài)                 
                        dataSource.group({ 
                            field: 'phan_loai.nhom_tb.ten',
                            aggregates: [{ field: "_id", aggregate: "count" }],
                        });

                        let resolved = [],
                            views = dataSource.view();
                        
                        _.each(views, (view, index) => {
                            resolved.push({
                                category: view.value,
                                value: view.aggregates._id.count,
                                color: vm.pageData.loai_tbs[view.value] ? vm.pageData.loai_tbs[view.value]['color'] : vm.pageData.default.colorPalette[0]
                            });
                        });

                        // Feed dữ liệu cho donut_nhomtbs_countId, donut_large_nhomtbs_countId 
                        vm.pageOptions.charts.donut_nhomtbs_countId.series[1].data = resolved;
                        vm.pageOptions.charts.donut_large_nhomtbs_countId.dataSource.data(resolved);

                        // Tính toán các số liệu cho donut vòng trong - theo nhóm nội dung
                        dataSource.group({ 
                            field: 'phan_loai.nhom_cau_hoi.ten',
                            aggregates: [{ field: "_id", aggregate: "count" }],
                        });

                        resolved = [];
                        views = dataSource.view();
                        
                        _.each(views, (view, index) => {
                            resolved.push({
                                category: view.value,
                                value: view.aggregates._id.count,
                                color: vm.pageData.nhom_cau_hois[view.value]['color']
                            });
                        });

                        // Feed dữ liệu cho donut_nhomtbs_countId, donut_large_nhomcauhois_countId 
                        vm.pageOptions.charts.donut_nhomtbs_countId.series[0].data = resolved;
                        vm.pageOptions.charts.donut_large_nhomcauhois_countId.dataSource.data(resolved);

                        // Sau khi thống kê xong, reset group.
                        dataSource.group([]);                        
                    },
                    resolve_activities: function(dataSource) {
                        let rawData = {},
                            resolved = [];

                        // Nhóm dữ liệu theo từng ngày (date range: 1 tuần)
                        dataSource.group({ 
                            field: 'when.time_day_str',
                            aggregates: [{ field: "_id", aggregate: "count" }],
                        });
                        _.each(dataSource.view(), (view, index) => {
                            rawData[view.value] = view.items.length;
                        });
                        _.each(vm._skylogs.time_ranges.week, (date) => {
                            if (!rawData[date]) {
                                resolved.push({
                                    category: date,
                                    value: 0
                                });   
                            } else {
                                resolved.push({
                                    category: date,
                                    value: rawData[date]
                                });
                            }
                        });
                        vm.pageOptions.charts.small_line_activities.dataSource.data(resolved);
                        
                        // Tiếp tục chia nhỏ dữ liệu theo nhóm (action: Cập nhật, Tạo mới, Gỡ bỏ).. để lấy dữ liệu cho modal chart
                        dataSource.group([
                            { field: 'when.time_day_str'},
                            { field: 'action'}
                        ]);

                        // Reset group
                    }
                }
            };

            // ***************************************************
            // EXECUTE FUNCTION
            // ***************************************************

            vm.utils.processDataSource.resolve_nhomcauhois();
            vm.utils.processDataSource.resolve_time_range_week();

            // ***************************************************
            // REACTIVE HELPERS
            // ***************************************************

            vm.helpers({
                numberOfCauHoisTotal: () => {
                    return Counts.get('numberOfCauHoisTotal');
                },
                numberOfUsersTotal: () => {
                    return Counts.get('numberOfUsersTotal');
                },
                numberOfUserOnline: () => {
                    let number = Counts.get('numberOfUserOnline');
                    if (vm.numberOfUsersTotal)
                        vm.pageData.statistics.cauhois.percent_users_online = number / vm.numberOfUsersTotal * 100;
                    return number;
                },
                statistics: function () {
                    // Tách các loại thiết bị theo nhóm và ấn định các mã màu cho từng nhóm thiết bị, thể hiện trên các biểu đồ
                    vm.utils.processDataSource.resolve_loaitbs();
                    // Sau khi có datahelpers cho loại thiết bị, thực hiện các thống kê cho câu hỏi
                    try {
                        vm._kOptions.dataSource.data(CauHois.find().fetch());
                    } catch (error) {
                        console.log("Error: ", error);
                    }
                    vm.utils.massageDataSource.massage(vm._kOptions.dataSource);
                    return;
                },
                newest_log: function() {
                    return SkyLogs.findOne({}, {sort: {'when.time': -1}});
                },
                skylogs: function() {
                    // Xử lý dữ liệu cho các hoạt động của người dùng, lưu ý data này bị limit giá trị trả về tại server!
                    try {
                        let rawData = SkyLogs.find({
                            'when.time_day_str': {
                                $gte: vm._skylogs.time_ranges.week[0]
                            }
                        }).fetch();
                        // Feed dữ liệu cho grid activities nằm trong modal
                        vm.pageOptions.grids.activities_modal_grid.dataSource.data(rawData);
                        // Feed dữ liệu cho các biểu đồ liên quan tới activities
                        vm._skylogs.dataSource.data(rawData);
                        vm.utils.massageDataSource.resolve_activities(vm._skylogs.dataSource);
                    } catch (error) {
                        console.log("Error: ", error);
                    }                   
                    return;
                }
            });
            

            // ***************************************************
            // METHODS
            // ***************************************************
            


            

            // ***************************************************
            // WATCHERS
            // ***************************************************

        }
    }
});