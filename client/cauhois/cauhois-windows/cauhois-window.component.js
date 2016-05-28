angular.module('angular-skynet').directive('cauhoisWindow', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/cauhois/cauhois-windows/cauhois-window.template.html',
        // Không đặt tên controller là vm được -> gây lỗi
        controllerAs: 'cauhoisWindow',
        scope: {
            kWindowOptions: '='
        },
        bindToController: true,
        controller: function($scope, $rootScope, $reactive, $timeout, skynetHelpers, skynetDictionary, iNotifier) {

            $reactive(this).attach($scope);

            // ***************************************************
            // INITIALIZE
            // ***************************************************

            // Capture 'this contex - Refer to https://github.com/johnpapa/angular-styleguide#controlleras-with-cauhoisWindow
            let cauhoisWindow = this;

            cauhoisWindow._helpers = skynetHelpers.helpers;
            cauhoisWindow.dictionary = angular.copy(skynetDictionary.data.nganhangcauhois.data.ky_thuat.trac_nghiem);

            if (cauhoisWindow.kWindowOptions.mode === 'createNew') {
                cauhoisWindow._helpers.initNewCauHoiParams(cauhoisWindow);
                cauhoisWindow.source = angular.copy(cauhoisWindow.newCauHoi);
            }

            cauhoisWindow.pageOptions = {
                limit: {
                    numOfLuaChonsMax: 6,
                    numOfLuaChonsMin: 2,
                    numOfUrlHinhAnhsMax: 4,
                    numOfUrlHinhAnhsMin: 1
                },
                able: {
                    addNumOfLuaChons: true,
                    decreaseNumOfLuaChons: true,
                    addNumOfUrlHinhAnhs: false,
                    decreaseNumOfUrlHinhAnhs: false,
                    removeCauHoi: false
                },
                template: {
                    flags: {
                        isLockSectionPhanLoai: false,
                        isLockSectionTags: false,
                        isLockSectionGhiChu: false
                    },
                    phan_loai: {
                        nhom_cau_hoi: {},
                        muc_do: {},
                        nhom_tb: {},
                        loai_tb: []
                    },
                    tags: [],
                    ghi_chu: {
                        mo_ta: '',
                        ghi_chu: ''
                    }
                },
                props: {
                    isDiffViewLink: true,
                    isDiffViewResult: false,
                    isHasImages: false,
                    lightBoxImageSrc: '',
                    currentSection: 'phan_loai',

                },
                input: {
                    diffViewSearch: ''
                }
            };

            cauhoisWindow.pageReactiveData = {
                cauhois: [],
                tags: kendo.data.DataSource.create({
                    data: []
                }),
                loai_tbs: kendo.data.DataSource.create({
                    data: []
                }),
                resolve_data: {
                    loai_tbs: {}
                }
            };

            $timeout(() => {
                let mainPanel = UIkit.accordion('#cauhois_window_main_panel', { /*collapse: false*/ });
            }, 1000);

            // // ***************************************************
            // // SUBSCRIBE
            // // ***************************************************

            


            // // ***************************************************
            // // METHODS
            // // ***************************************************

            cauhoisWindow.addNewCauHoi = () => {
                let err = cauhoisWindow._helpers.validateUser('can_upsert_cau_hoi');
                if (_.isEmpty(err)) {
                    err = cauhoisWindow._helpers.validateCauHoiForm(cauhoisWindow.source);
                    if (_.isEmpty(err)) {

                        cauhoisWindow._helpers.buildNewCauHoi(cauhoisWindow.source);
                        CauHois.insert(cauhoisWindow.source, (error, result) => {
                            if (error) {
                                iNotifier.error('Không thể tạo mới dữ liệu câu hỏi này. ' + error.message + '.', 'bottom-center');
                            } else {
                                $scope.$apply( () => {
                                    cauhoisWindow.utils.resetNewCauHoi();
                                });                        
                                iNotifier.success('Dữ liệu câu hỏi được tạo mới thành công.', 'bottom-center');
                            }
                        });

                    } else {
                        iNotifier.error(err.message, 'bottom-center');
                    }
                } else {
                    iNotifier.error(err.message, 'bottom-center');
                }
            };

            cauhoisWindow.save = () => {
                if (cauhoisWindow.kWindowOptions.mode === 'update') {
                    let err = cauhoisWindow._helpers.validateUser('can_upsert_cau_hoi');
                    if (_.isEmpty(err)) {
                        err = cauhoisWindow._helpers.validateCauHoiForm(cauhoisWindow.source);
                        if (_.isEmpty(err)) {

                            cauhoisWindow._helpers.buildCauHoi(cauhoisWindow.source);
                            CauHois.update({
                                _id: cauhoisWindow.source._id
                            }, {
                                $set: {
                                    lop: cauhoisWindow.source.lop,
                                    phan_lop: cauhoisWindow.source.phan_lop,
                                    phan_loai: cauhoisWindow.source.phan_loai,
                                    noi_dung: cauhoisWindow.source.noi_dung,                      
                                    tags: cauhoisWindow.source.tags,                      
                                    fields: cauhoisWindow.source.fields,
                                    mo_ta: cauhoisWindow.source.mo_ta,
                                    ghi_chu: cauhoisWindow.source.ghi_chu,                  
                                    isPublic: cauhoisWindow.source.isPublic,
                                    isArchived: cauhoisWindow.source.isArchived,
                                    isReserveOrder: cauhoisWindow.source.isReserveOrder,
                                    status: cauhoisWindow.source.status,
                                    'metadata.ngay_cap_nhat_cuoi': cauhoisWindow.source.metadata.ngay_cap_nhat_cuoi,
                                    'metadata.nguoi_cap_nhat_cuoi': cauhoisWindow.source.metadata.nguoi_cap_nhat_cuoi,
                                    'metadata.nguoi_cap_nhat_cuoi_name': cauhoisWindow.source.metadata.nguoi_cap_nhat_cuoi_name,
                                    'metadata.nguoi_cap_nhat_cuoi_email': cauhoisWindow.source.metadata.nguoi_cap_nhat_cuoi_email,
                                    'metadata.nguoi_cap_nhat_cuoi_field': cauhoisWindow.source.metadata.nguoi_cap_nhat_cuoi_field
                                }
                            }, (error) => {
                                if (error) {
                                    iNotifier.error('Không thể cập nhật câu hỏi này. ' + error.message + '.', 'bottom-center');
                                } else {
                                    iNotifier.success('Câu hỏi mã số "' + cauhoisWindow.source._id + '" được cập nhật thành công.', 'bottom-center');
                                }
                            });
                        } else {
                            iNotifier.error(err.message, 'bottom-center');
                        }
                    } else {
                        iNotifier.error(err.message, 'bottom-center');
                    }
                }       
            };

            cauhoisWindow.reset = () => {
                angular.copy(cauhoisWindow.master, cauhoisWindow.source);
            };

            cauhoisWindow.remove = (cauhoi) => {
                let err = $scope._helpers.validateUser('can_delete_cau_hoi');
                if (_.isEmpty(err)) {

                    CauHois.remove({
                        _id: cauhoi._id
                    }, (error) => {
                        if (!error) {
                            iNotifier.info('Câu hỏi mã "' + cauhoi._id + '" đã được gỡ bỏ khỏi hệ thống thành công.');
                            $state.go('cauhois.list');
                        } else {
                            iNotifier.error(error.message);
                        }
                    });

                } else {
                    iNotifier.error(err.message);
                }
            };

            // // ***************************************************
            // // UTILS
            // // ***************************************************
            
            cauhoisWindow.utils = {
                // accentColor: _.findWhere(cauhoisWindow._data.general.themes, {
                //     name: $rootScope.main_theme
                // }).color_accent,
                resolve_data: {
                    loai_tbs: function (rawDataSource) {
                        rawDataSource.group({ field: "container.ref" });
                        cauhoisWindow.pageReactiveData.resolve_data.loai_tbs = {};
                        _.each(rawDataSource.view(), (view) => {
                            cauhoisWindow.pageReactiveData.resolve_data.loai_tbs[view.value] = [];
                            _.each(view.items, (item) => {
                                cauhoisWindow.pageReactiveData.resolve_data.loai_tbs[view.value].push(item.container.text)
                            });
                        });
                        rawDataSource.group([]);
                    },
                    tags: function (rawDataSource) {
                        rawDataSource.group([
                            { field: "container.ref" }
                        ]);
                        cauhoisWindow.pageReactiveData.resolve_data.tags = {};
                        _.each(rawDataSource.view(), (view) => {
                            cauhoisWindow.pageReactiveData.resolve_data.tags[view.value] = [];
                            _.each(view.items, (item) => {
                                cauhoisWindow.pageReactiveData.resolve_data.tags[view.value].push(item.container.text)
                            });
                        });
                        rawDataSource.group([]);
                    }
                },
                toggleMode: function() {
                    if (cauhoisWindow.kWindowOptions.mode === 'createNew')
                        cauhoisWindow.kWindowOptions.mode = 'update';
                    else
                        cauhoisWindow.kWindowOptions.mode = 'createNew';
                },
                setCorrectAnswer: function(luachon) {
                    if (!luachon.isCorrect) {
                        // Nếu hành vi người dùng là switch câu trả lời đúng -> clear rồi switch vị trí đáp án đúng
                        _.each(cauhoisWindow.source.noi_dung.lua_chons, (item, i) => {
                            item.isCorrect = false;
                        });
                        luachon.isCorrect = true;
                    } else { 
                        // Nếu hành vi người dùng là toggle on/off câu trả lời đúng -> toggle
                        luachon.isCorrect = false;
                    }                     
                },
                addNumOfLuaChons: function() {
                    if (cauhoisWindow.source.noi_dung.lua_chons.length < cauhoisWindow.pageOptions.limit.numOfLuaChonsMax) {
                        cauhoisWindow.source.noi_dung.lua_chons.push({isCorrect: false, order: cauhoisWindow.source.noi_dung.lua_chons.length});
                        cauhoisWindow.pageOptions.able.decreaseNumOfLuaChons = true;   // Bây giờ có thể giảm số lựa chọn
                    }
                    else 
                        cauhoisWindow.pageOptions.able.addNumOfLuaChons = false;       // Đã vượt quá giới hạn tối đa số lựa chọn cho phép
                },
                decreaseNumOfLuaChons: function() {
                    if (cauhoisWindow.source.noi_dung.lua_chons.length > cauhoisWindow.pageOptions.limit.numOfLuaChonsMin) {
                        cauhoisWindow.source.noi_dung.lua_chons.pop();
                        cauhoisWindow.pageOptions.able.addNumOfLuaChons = true;        // Bây giờ có thể thêm số lựa chọn
                    } else
                        cauhoisWindow.pageOptions.able.decreaseNumOfLuaChons = false;  // Đã quá giới hạn tối thiểu số lựa chọn cho phép
                },
                addNumOfHinhAnhs: function() {
                    if (cauhoisWindow.pageOptions.props.isHasImages)
                        if (cauhoisWindow.pageOptions.able.addNumOfUrlHinhAnhs)
                            cauhoisWindow.source.noi_dung.url_hinh_anhs.push('');
                },
                decreaseNumOfHinhAnhs: function() {
                    if (cauhoisWindow.pageOptions.props.isHasImages)
                        if (cauhoisWindow.pageOptions.able.decreaseNumOfUrlHinhAnhs)
                            cauhoisWindow.source.noi_dung.url_hinh_anhs.pop();
                },
                resetPhanLoaiSection: function() {
                    // Nếu đang ở chế độ khóa, restore lại thời điểm bắt đầu kích hoạt khóa
                    if (cauhoisWindow.pageOptions.template.flags.isLockSectionPhanLoai) {
                        if (!_.isEmpty(cauhoisWindow.pageOptions.template.phan_loai)) 
                            cauhoisWindow.source.phan_loai = angular.copy(cauhoisWindow.pageOptions.template.phan_loai);
                    } else {
                        cauhoisWindow.source.phan_loai = {
                            kieu_cau_hoi: {
                                ma: 'mot_dap_an_dung',
                                ten: 'Một đáp án đúng'
                            },
                            nhom_tb: {
                                ma: "thiet_bi_nang",
                                ten: "Thiết bị nâng"
                            },
                            loai_tb: [],
                            nhom_cau_hoi: {},
                            nhom_noi_dung: {},
                            bac_thi: [],
                            muc_do: {}
                        }
                    }
                },
                resetTagSection: function() {
                    if (cauhoisWindow.pageOptions.template.flags.isLockSectionTags) {
                        if (cauhoisWindow.pageOptions.template.tags.length) 
                            cauhoisWindow.source.tags = angular.copy(cauhoisWindow.pageOptions.template.tags);
                    } else {
                        cauhoisWindow.source.tags = [];
                    }       
                },
                resetHinhAnhsSection: function() {
                    for (let i = 0; i < cauhoisWindow.source.noi_dung.url_hinh_anhs.length; i++) {
                        cauhoisWindow.source.noi_dung.url_hinh_anhs[i] = '';
                    }
                },
                resetGhiChuSection: function() {
                    if (cauhoisWindow.pageOptions.template.flags.isLockSectionGhiChu) {
                        cauhoisWindow.source.ghi_chu = cauhoisWindow.pageOptions.template.ghi_chu.ghi_chu;
                        cauhoisWindow.source.mo_ta = cauhoisWindow.pageOptions.template.ghi_chu.mo_ta;
                    } else {
                        cauhoisWindow.source.ghi_chu = '';
                        cauhoisWindow.source.mo_ta = '';
                    }
                },
                toggleLockSectionPhanLoai: function() {
                    cauhoisWindow.pageOptions.template.flags.isLockSectionPhanLoai = !cauhoisWindow.pageOptions.template.flags.isLockSectionPhanLoai;
                    // Nếu kích hoạt chế độ khóa, chụp lại dữ liệu phần Phân Loại
                    if (cauhoisWindow.pageOptions.template.flags.isLockSectionPhanLoai) {
                        cauhoisWindow.pageOptions.template.phan_loai = angular.copy(cauhoisWindow.source.phan_loai);
                    }
                },
                toggleLockSectionTags: function() {
                    cauhoisWindow.pageOptions.template.flags.isLockSectionTags = !cauhoisWindow.pageOptions.template.flags.isLockSectionTags;
                    // Nếu kích hoạt chế độ khóa, chụp lại dữ liệu phần Tags
                    if (cauhoisWindow.pageOptions.template.flags.isLockSectionTags) {
                        cauhoisWindow.pageOptions.template.tags = angular.copy(cauhoisWindow.source.tags);
                    }
                },
                toggleLockSectionGhiChu: function() {
                    cauhoisWindow.pageOptions.template.flags.isLockSectionGhiChu = !cauhoisWindow.pageOptions.template.flags.isLockSectionGhiChu;
                    // Nếu kích hoạt chế độ khóa, chụp lại dữ liệu phần Ghi Chú
                    if (cauhoisWindow.pageOptions.template.flags.isLockSectionGhiChu) {
                        cauhoisWindow.pageOptions.template.ghi_chu = {
                            mo_ta: cauhoisWindow.source.mo_ta,
                            ghi_chu: cauhoisWindow.source.ghi_chu
                        };
                    }
                },
                showModalLightBox: function(index) {
                    cauhoisWindow.pageOptions.props.lightBoxImageSrc = cauhoisWindow.source.noi_dung.url_hinh_anhs[index];
                    if (cauhoisWindow.pageOptions.props.lightBoxImageSrc) {
                        console.log('show');
                        UIkit.modal("#modal_lightbox").show();
                    }
                },
                resetNewCauHoi: function() {
                    cauhoisWindow._helpers.initNewCauHoiParams(cauhoisWindow);
                    cauhoisWindow.source = angular.copy(cauhoisWindow.newCauHoi);

                    // Nếu một số trường được kích hoạt khóa
                    if (cauhoisWindow.pageOptions.template.flags.isLockSectionPhanLoai) {
                        if (!_.isEmpty(cauhoisWindow.pageOptions.template.phan_loai)) 
                            cauhoisWindow.source.phan_loai = angular.copy(cauhoisWindow.pageOptions.template.phan_loai);
                    }
                    if (cauhoisWindow.pageOptions.template.flags.isLockSectionTags) {
                        if (cauhoisWindow.pageOptions.template.tags.length) 
                            cauhoisWindow.source.tags = angular.copy(cauhoisWindow.pageOptions.template.tags);
                    }
                    if (cauhoisWindow.pageOptions.template.flags.isLockSectionGhiChu) {
                        cauhoisWindow.source.ghi_chu = cauhoisWindow.pageOptions.template.ghi_chu.ghi_chu;
                        cauhoisWindow.source.mo_ta = cauhoisWindow.pageOptions.template.ghi_chu.mo_ta;
                    }
                },
                randomizeLuaChonOrder: function() {
                    // Loại bỏ các giá trị falsy khỏi lựa chọn trước khi xáo trộn
                    cauhoisWindow.source.noi_dung.lua_chons = _.reject(cauhoisWindow.source.noi_dung.lua_chons, (item) => {return !item.tieu_de});
                    let newOrder = _.shuffle( _.range(cauhoisWindow.source.noi_dung.lua_chons.length) );
                    
                    // Xáo trộn order các lựa chọn theo thứ tự mới
                    _.each(cauhoisWindow.source.noi_dung.lua_chons, (item, i) => {
                        item.order = newOrder[i];
                    });
                    // Sắp xếp lại các lựa chọn theo thứ tự của khóa 'order'
                    cauhoisWindow.source.noi_dung.lua_chons = _.sortBy(cauhoisWindow.source.noi_dung.lua_chons, 'order');
                },
            };

            // ***************************************************
            // REACTIVE HELPERS
            // ***************************************************

            cauhoisWindow.helpers({
                datahelpers: () => {

                    cauhoisWindow.pageReactiveData.loai_tbs.data(DataHelpers.find({
                        'subject': 'cauhois',
                        'category': 'loai_tbs',
                    }, {
                        sort: {
                            'container.text': 1
                        }
                    }).fetch());

                    
                    cauhoisWindow.pageReactiveData.tags.data(DataHelpers.find({
                        subject: 'cauhois',
                        category: 'tags'
                    }, {
                        sort: {
                            'container.text': 1
                        }
                    }).fetch());

                    cauhoisWindow.utils.resolve_data.loai_tbs(cauhoisWindow.pageReactiveData.loai_tbs);
                    cauhoisWindow.utils.resolve_data.tags(cauhoisWindow.pageReactiveData.tags);
                    // cauhoisWindow.utils.resolve_data.tags(cauhoisWindow.pageReactiveData.tags);
                    // console.log('test: ', cauhoisWindow.pageReactiveData.tags.view());
                    return;
                },
                master: () => {
                    if (cauhoisWindow.kWindowOptions.selectedItem._id && cauhoisWindow.getReactively('kWindowOptions.mode')==='update') {
                        cauhoisWindow.source = CauHois.findOne({ _id: cauhoisWindow.kWindowOptions.selectedItem._id });
                        if (!_.isEmpty(cauhoisWindow.source)) {
                            // Cập nhật switchery ở Section Hình ảnh
                            cauhoisWindow.pageOptions.props.isHasImages = (cauhoisWindow.source.noi_dung.url_hinh_anhs.length) ? true : false;
                            // Cập nhật các template
                            cauhoisWindow.pageOptions.template.phan_loai = angular.copy(cauhoisWindow.source.phan_loai);
                            cauhoisWindow.pageOptions.template.tags = angular.copy(cauhoisWindow.source.tags);
                            cauhoisWindow.pageOptions.template.url_hinh_anhs = angular.copy(cauhoisWindow.source.noi_dung.url_hinh_anhs);
                            cauhoisWindow.pageOptions.template.ghi_chu.mo_ta = cauhoisWindow.source.mo_ta;
                            cauhoisWindow.pageOptions.template.ghi_chu.ghi_chu = cauhoisWindow.source.ghi_chu;

                            // Người dùng có quyền remove câu hỏi?
                            cauhoisWindow.pageOptions.able.removeCauHoi =   _.isEmpty(cauhoisWindow._helpers.validateUser('can_delete_cau_hoi')) ? true : false;
                        }
                    }
                    return CauHois.findOne({_id: cauhoisWindow.getReactively('kWindowOptions.selectedItem._id')});
                },
            });

            // // ***************************************************
            // // WATCHERS
            // // ***************************************************

            $scope.$watch('cauhoisWindow.kWindowOptions.mode', (newVal) => {
                if (newVal === 'update') {
                    $("#cauhois_window").data("kendoWindow").setOptions({
                        title: 'CẬP NHẬT CÂU HỎI'
                    });
                } else {
                    $("#cauhois_window").data("kendoWindow").setOptions({
                        title: 'CÂU HỎI MỚI'
                    });
                    cauhoisWindow._helpers.initNewCauHoiParams(cauhoisWindow);
                    cauhoisWindow.source = angular.copy(cauhoisWindow.newCauHoi);
                }
            });

            UIkit.on('change.uk.sortable', function(event, sortable_object, dragged_element, action){
                if (action==="moved") {
                    // Đồng bộ: Khi có event sorted, truy nhập các list để trích xuất mảng [data-index] -> [newOrder],
                    // rồi cập nhật lại các order tuân theo thứ tự này                    
                    $scope.$apply(() => {
                        $('#sortable').children('li').each( function(index) {
                            // Để lấy thông tin về data-index: $(this).data('index')
                            _.extend(cauhoisWindow.source.noi_dung.lua_chons[$(this).data('index')], {order: index});
                        });
                        // Sắp xếp lại các lựa chọn theo thứ tự của khóa 'order'
                        cauhoisWindow.source.noi_dung.lua_chons = _.sortBy(cauhoisWindow.source.noi_dung.lua_chons, 'order');
                    });
                }                
            });

            $rootScope.$watch('main_theme', (newVal, oldVal) => {
                // Đổi màu k window khi màu theme thay đổi
                let header = $('div.k-window-titlebar.k-header');
                header.removeClass('color-background-' + oldVal);
                header.addClass('color-background-' + newVal);
            });

            $scope.$watch('cauhoisWindow.pageOptions.props.isHasImages', (newVal, oldVal) => {
                if (oldVal) {
                    // Nếu người dùng tắt chức năng sử dụng url hình ảnh, xóa tất cả các trường ngay lập tức
                    cauhoisWindow.source.noi_dung.url_hinh_anhs = ['', ''];
                }
            });

            $scope.$watch('cauhoisWindow.source.noi_dung.url_hinh_anhs.length', (newVal) => {
                if (newVal > cauhoisWindow.pageOptions.limit.numOfUrlHinhAnhsMin && newVal < cauhoisWindow.pageOptions.limit.numOfUrlHinhAnhsMax) {
                    // Nếu số trường url hình ảnh trong giới hạn cho phép, mở khóa các tính năng
                    cauhoisWindow.pageOptions.able.decreaseNumOfUrlHinhAnhs = true;
                    cauhoisWindow.pageOptions.able.addNumOfUrlHinhAnhs = true; 
                }
                if (newVal <= cauhoisWindow.pageOptions.limit.numOfUrlHinhAnhsMin) {
                    // Nếu số trường url hình ảnh ít hơn giới hạn dưới, khóa khả năng decreaseUrlHinhAnh
                    cauhoisWindow.pageOptions.able.decreaseNumOfUrlHinhAnhs = false; 
                }
                if (newVal >= cauhoisWindow.pageOptions.limit.numOfUrlHinhAnhsMax) {
                    // Nếu số trường url hình ảnh ít hơn giới hạn trên, khóa khả năng addUrlHinhAnh
                    cauhoisWindow.pageOptions.able.addNumOfUrlHinhAnhs = false; 
                }

            });

            $scope.$watch('cauhoisWindow.source.noi_dung.tieu_de', (newVal) => {
                if (cauhoisWindow.pageOptions.props.isDiffViewLink) {
                    cauhoisWindow.pageOptions.input.diffViewSearch = newVal;
                    if (cauhoisWindow.pageOptions.props.currentSection==='accordion_so_sanh')
                        $("#pageOptions_diffViewSearch").data("kendoAutoComplete").search(newVal);
                }
            });

        }
    }
});
