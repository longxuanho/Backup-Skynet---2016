
angular.module('angular-skynet').directive('cauhoisUpdate', function() {
    
    return {
        restrict: 'E',
        templateUrl: 'client/cauhois/cauhois-update/cauhois-update.template.html',
        controllerAs: 'vm',
        bindToController: true,
        controller: function($scope, skynetHelpers, $rootScope, iNotifier, $timeout, $reactive, skynetDictionary, $stateParams, $state) {

            $reactive(this).attach($scope);

            // ***************************************************
            // INITIALIZE
            // ***************************************************

            // Capture 'this contex - Refer to https://github.com/johnpapa/angular-styleguide#controlleras-with-vm
            let vm = this;

            vm._data = skynetHelpers.data;
            vm._helpers = skynetHelpers.helpers;
            
            vm._helpers.initNewCauHoiParams(vm);
            vm.dictionary = angular.copy(skynetDictionary.data.nganhangcauhois.data.ky_thuat.trac_nghiem);

            vm.pageOptions = {
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
                    phan_loai: {},
                    tags: [],
                    url_hinh_anhs: [],
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

            vm.pageReactiveData = {
                cauhois: [],
                tags: {
                    data: vm.dictionary.tags,
                    sort: { field: 'ten', dir: 'asc' },
                    group: { field: 'group' }
                }
            }

            // ***************************************************
            // SUBSCRIBE
            // ***************************************************

            $scope.subscribe('cauhois');

            // ***************************************************
            // REACTIVE HELPERS
            // ***************************************************

            vm.helpers({
                source: () => {
                    vm.master = CauHois.findOne({
                        _id: $stateParams.cauhoiId
                    });
                    
                    if (!_.isEmpty(vm.master)) {
                        // Cập nhật switchery ở Section Hình ảnh
                        vm.pageOptions.props.isHasImages = (vm.master.noi_dung.url_hinh_anhs.length) ? true : false;
                        // Cập nhật các template
                        vm.pageOptions.template.phan_loai = angular.copy(vm.master.phan_loai);
                        vm.pageOptions.template.tags = angular.copy(vm.master.tags);
                        vm.pageOptions.template.url_hinh_anhs = angular.copy(vm.master.noi_dung.url_hinh_anhs);
                        vm.pageOptions.template.ghi_chu.mo_ta = vm.master.mo_ta;
                        vm.pageOptions.template.ghi_chu.ghi_chu = vm.master.ghi_chu;

                        // Người dùng có quyền remove câu hỏi?
                        vm.pageOptions.able.removeCauHoi =   _.isEmpty($scope._helpers.validateUser('can_delete_cau_hoi')) ? true : false;                      
                    }                    

                    return angular.copy(vm.master);
                },
                cauhois: () => {
                    vm.pageReactiveData.cauhois = CauHois.find().fetch();
                    return CauHois.find();
                }
            });


            // ***************************************************
            // METHODS
            // ***************************************************

            vm.save = () => {

                let err = vm._helpers.validateUser('can_upsert_cau_hoi');
                if (_.isEmpty(err)) {
                    err = vm._helpers.validateCauHoiForm(vm.source);
                    if (_.isEmpty(err)) {

                        vm._helpers.buildCauHoi(vm.source);
                        CauHois.update({
                            _id: $stateParams.cauhoiId
                        }, {
                            $set: {
                                lop: vm.source.lop,
                                phan_lop: vm.source.phan_lop,
                                phan_loai: vm.source.phan_loai,
                                noi_dung: vm.source.noi_dung,                      
                                tags: vm.source.tags,                      
                                fields: vm.source.fields,
                                mo_ta: vm.source.mo_ta,
                                ghi_chu: vm.source.ghi_chu,                  
                                isPublic: vm.source.isPublic,
                                isArchived: vm.source.isArchived,
                                status: vm.source.status,
                                'metadata.ngay_cap_nhat_cuoi': vm.source.metadata.ngay_cap_nhat_cuoi,
                                'metadata.nguoi_cap_nhat_cuoi': vm.source.metadata.nguoi_cap_nhat_cuoi,
                                'metadata.nguoi_cap_nhat_cuoi_name': vm.source.metadata.nguoi_cap_nhat_cuoi_name,
                                'metadata.nguoi_cap_nhat_cuoi_email': vm.source.metadata.nguoi_cap_nhat_cuoi_email,
                                'metadata.nguoi_cap_nhat_cuoi_field': vm.source.metadata.nguoi_cap_nhat_cuoi_field
                            }
                        }, (error) => {
                            if (error) {
                                iNotifier.error('Không thể cập nhật câu hỏi này. ' + error.message + '.');
                            } else {
                                iNotifier.success('Câu hỏi mã số "' + vm.source._id + '" được cập nhật thành công.');
                                vm.master = CauHois.findOne({
                                    _id: $stateParams.cauhoiId
                                });
                            }
                        });
                    } else {
                        iNotifier.error(err.message);
                    }
                } else {
                    iNotifier.error(err.message);
                }
            };

            vm.reset = () => {
                angular.copy(vm.master, vm.source);
            };

            vm.remove = (cauhoi) => {
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
            }

            // ***************************************************
            // UTILS
            // ***************************************************

            vm.utils = {
                accentColor: _.findWhere(vm._data.general.themes, {
                    name: $rootScope.main_theme
                }).color_accent,
                setCorrectAnswer: function(luachon) {
                    if (!luachon.isCorrect) {
                        // Nếu hành vi người dùng là switch câu trả lời đúng -> clear rồi switch vị trí đáp án đúng
                        _.each(vm.source.noi_dung.lua_chons, (item, i) => {
                            item.isCorrect = false;
                        });
                        luachon.isCorrect = true;
                    } else { 
                        // Nếu hành vi người dùng là toggle on/off câu trả lời đúng -> toggle
                        luachon.isCorrect = false;
                    }                     
                },
                addNumOfLuaChons: function() {
                    if (vm.source.noi_dung.lua_chons.length < vm.pageOptions.limit.numOfLuaChonsMax) {
                        vm.source.noi_dung.lua_chons.push({isCorrect: false, order: vm.source.noi_dung.lua_chons.length});
                        vm.pageOptions.able.decreaseNumOfLuaChons = true;   // Bây giờ có thể giảm số lựa chọn
                    }
                    else 
                        vm.pageOptions.able.addNumOfLuaChons = false;       // Đã vượt quá giới hạn tối đa số lựa chọn cho phép
                },
                decreaseNumOfLuaChons: function() {
                    if (vm.source.noi_dung.lua_chons.length > vm.pageOptions.limit.numOfLuaChonsMin) {
                        vm.source.noi_dung.lua_chons.pop();
                        vm.pageOptions.able.addNumOfLuaChons = true;        // Bây giờ có thể thêm số lựa chọn
                    } else
                        vm.pageOptions.able.decreaseNumOfLuaChons = false;  // Đã quá giới hạn tối thiểu số lựa chọn cho phép
                },
                addNumOfHinhAnhs: function() {
                    if (vm.pageOptions.props.isHasImages)
                        if (vm.pageOptions.able.addNumOfUrlHinhAnhs)
                            vm.source.noi_dung.url_hinh_anhs.push('');
                },
                decreaseNumOfHinhAnhs: function() {
                    if (vm.pageOptions.props.isHasImages)
                        if (vm.pageOptions.able.decreaseNumOfUrlHinhAnhs)
                            vm.source.noi_dung.url_hinh_anhs.pop();
                },
                resetPhanLoaiSection: function() {
                    vm.source.phan_loai = angular.copy(vm.pageOptions.template.phan_loai);
                },
                resetTagSection: function() {
                    vm.source.tags = angular.copy(vm.pageOptions.template.tags);      
                },
                resetHinhAnhsSection: function() {
                    vm.source.noi_dung.url_hinh_anhs =  angular.copy(vm.pageOptions.template.url_hinh_anhs);
                },
                resetGhiChuSection: function() {
                    vm.source.ghi_chu = vm.pageOptions.template.ghi_chu.ghi_chu;
                    vm.source.mo_ta = vm.pageOptions.template.ghi_chu.mo_ta;
                },
                showModalLightBox: function(index) {
                    vm.pageOptions.props.lightBoxImageSrc = vm.source.noi_dung.url_hinh_anhs[index];
                    if (vm.pageOptions.props.lightBoxImageSrc)
                        UIkit.modal("#modal_lightbox").show();
                },
                randomizeLuaChonOrder: function() {
                    // Loại bỏ các giá trị falsy khỏi lựa chọn trước khi xáo trộn
                    vm.source.noi_dung.lua_chons = _.reject(vm.source.noi_dung.lua_chons, (item) => {return !item.tieu_de});
                    let newOrder = _.shuffle( _.range(vm.source.noi_dung.lua_chons.length) );
                    
                    // Xáo trộn order các lựa chọn theo thứ tự mới
                    _.each(vm.source.noi_dung.lua_chons, (item, i) => {
                        item.order = newOrder[i];
                    });
                    // Sắp xếp lại các lựa chọn theo thứ tự của khóa 'order'
                    vm.source.noi_dung.lua_chons = _.sortBy(vm.source.noi_dung.lua_chons, 'order');
                },
                makeDiff: function() {
                    // Toggle trạng thái isDiffViewResult
                    vm.pageOptions.props.isDiffViewResult = !vm.pageOptions.props.isDiffViewResult;
                    $('#diff_result').html('');
                    let diffType = 'diffChars',
                        panelA = vm.pageOptions.input.diffViewSearch || '';
                        panelB = vm.source.noi_dung.tieu_de || '';
                        diff = JsDiff[diffType](panelA, panelB);
                    diff.forEach(function(part){
                        let color = part.added ? 'md-color-light-green-600': part.removed ? 'md-color-red-500 uk-text-del' : 'md-color-grey-400';
                        let span = $('<span/>');
                        span
                            .addClass(color)
                            .text(part.value);
                        $('#diff_result').append(span);
                    });                    
                }
            };

            // ***************************************************
            // WATCHERS
            // ***************************************************

            UIkit.on('toggle.uk.accordion', function(event, active, toggle){
                vm.pageOptions.props.currentSection = toggle[0].id || 'accordion_phan_loai';
            });

            UIkit.on('change.uk.sortable', function(event, sortable_object, dragged_element, action){
                if (action==="moved") {              
                    // Đồng bộ: Khi có event sorted, truy nhập các list để trích xuất mảng [data-index] -> [newOrder],
                    // rồi cập nhật lại các order tuân theo thứ tự này.   
                    $scope.$apply(() => {
                        $('#sortable').children('li').each( function(index) {
                            // Để lấy thông tin về data-index: $(this).data('index')
                            _.extend(vm.source.noi_dung.lua_chons[$(this).data('index')], {order: index});                            
                        });                     
                        // Sắp xếp lại các lựa chọn theo thứ tự của khóa 'order'
                        vm.source.noi_dung.lua_chons = _.sortBy(vm.source.noi_dung.lua_chons, 'order');
                    });
                }                
            });

            $rootScope.$watch('main_theme', (newVal) => {
                vm.utils.accentColor = _.findWhere(vm._data.general.themes, {
                    name: newVal
                }).color_accent;
            });

           $scope.$watch('vm.pageOptions.props.isHasImages', (newVal, oldVal) => {
                if (oldVal) {
                    // Nếu người dùng tắt chức năng sử dụng url hình ảnh, xóa tất cả các trường ngay lập tức
                    vm.source.noi_dung.url_hinh_anhs = ['', ''];
                }
            });

            $scope.$watch('vm.source.noi_dung.url_hinh_anhs.length', (newVal) => {
                if (newVal > vm.pageOptions.limit.numOfUrlHinhAnhsMin && newVal < vm.pageOptions.limit.numOfUrlHinhAnhsMax) {
                    // Nếu số trường url hình ảnh trong giới hạn cho phép, mở khóa các tính năng
                    vm.pageOptions.able.decreaseNumOfUrlHinhAnhs = true;
                    vm.pageOptions.able.addNumOfUrlHinhAnhs = true; 
                }
                if (newVal <= vm.pageOptions.limit.numOfUrlHinhAnhsMin) {
                    // Nếu số trường url hình ảnh ít hơn giới hạn dưới, khóa khả năng decreaseUrlHinhAnh
                    vm.pageOptions.able.decreaseNumOfUrlHinhAnhs = false; 
                }
                if (newVal >= vm.pageOptions.limit.numOfUrlHinhAnhsMax) {
                    // Nếu số trường url hình ảnh ít hơn giới hạn trên, khóa khả năng addUrlHinhAnh
                    vm.pageOptions.able.addNumOfUrlHinhAnhs = false; 
                }

            });

            $scope.$watch('vm.source.noi_dung.tieu_de', (newVal) => {
                if (vm.pageOptions.props.isDiffViewLink) {
                    vm.pageOptions.input.diffViewSearch = newVal;
                    if (vm.pageOptions.props.currentSection==='accordion_so_sanh')
                        $("#pageOptions_diffViewSearch").data("kendoAutoComplete").search(newVal);
                }
            });
            
        }
    }
});
