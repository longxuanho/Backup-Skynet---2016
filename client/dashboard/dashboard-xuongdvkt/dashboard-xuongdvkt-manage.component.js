angular.module('angular-skynet').directive('dashboardXuongdvktManage', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/dashboard/dashboard-xuongdvkt/dashboard-xuongdvkt-manage.template.html',
        scope: {
            pageOptions: '=',
            pageData: '='
        },
        controller: function($scope, skynetHelpers, skynetDictionary, $timeout, iNotifier) {

            // ***************************************************
            // INITIALIZE
            // ***************************************************
            $scope._helpers = skynetHelpers.helpers;
            $scope._dictionary = angular.copy(skynetDictionary.data.xuongdvkt);

            $scope.config = {
                update: {
                    inputForm: {
                        isTGSCLabel: true,
                        tgscDuKienBanGiao: 0
                    }
                }
            }

            // ***************************************************
            // UTILS
            // ***************************************************
            $scope.utils = {
                mics: {
                    formatHoursAsHM: function(hours) {
                        // Format giờ thành giá trị gồm giờ và ph. VD 3 -> '3 giờ'; 3,25 -> '3 giờ 15 phút'; 0,25 -> 15 phút.
                        let text = '',
                            duration = moment.duration(hours, "hours");
                        if (duration.hours() && duration.minutes())
                            text = duration.hours() + ' giờ ' + duration.minutes() + ' phút';
                        else if (!duration.hours()) 
                            text = duration.minutes() + ' phút';
                        else
                            text = duration.hours() + ' giờ';
                        return text;
                    }
                },
            	reset: {
                    selectOptions: function() {
                        if (!$scope.pageData.source.newSuaChua.phan_loai.loai_tb)
                            $scope.pageData.source.newSuaChua.phan_loai.loai_tb = "Xe - máy";
                        
                        // Phải khởi tạo các giá trị ban đầu cho kendo select!
                        _.each($scope._dictionary.loai_tbs[$scope.pageData.source.newSuaChua.phan_loai.loai_tb], (loai_tb) => {
                            $scope.pageOptions.ui.selectOptions.ma_tbs[loai_tb] = [];
                        });
                    },
                    newMatb: function(newMatb) {
                        newMatb.subject = 'xuongdvkt';
                        newMatb.category = 'ma_tbs';
                        newMatb.container = {
                            group: '',
                            ref: '',
                            text: ''
                        };
                    },
            		newSuaChua: function(newSuaChua) {
            			newSuaChua.phan_loai = {
                            nhom_tb: "Xe - máy",
                            loai_tb: '',
                            loai_sua_chua: ''
                        };
                        newSuaChua.ma_tb = {
                        	ma_tb: '',
	                        dvql: ''
                        };
                        newSuaChua.dia_diem = {
                            dia_diem: 'Xưởng DVKT',
                            khu_vuc: '',
                            vi_tri: ''
                        };
						newSuaChua.noi_dung = '';
                        newSuaChua.thoi_gian = {
                        	bat_dau: new Date()
                        };
                        newSuaChua.thong_ke = {
                        	thoi_gian: {
                        		bat_dau: {},
                        		sua_chua: {},
                        		ket_thuc: {}
                        	}
                        };
                        newSuaChua.trang_thai = 'Đang sửa chữa';
                        newSuaChua.isArchived = false;
            		}
            	},
            	build: {
                    newMatb: function(newMatb) {
                        newMatb.metadata = {};
                        $scope._helpers.buildMetadata('buildNew', newMatb.metadata); 
                    },
            		newSuaChua: function (newSuaChua) {
                        // Cập nhật lại thời gian bắt đầu
                        newSuaChua.thoi_gian.bat_dau = new Date();
            			// Tính toán thời gian kết thúc dự kiến
						newSuaChua.thoi_gian.ket_thuc_du_kien = moment(newSuaChua.thoi_gian.bat_dau).add(newSuaChua.thoi_gian.sua_chua_du_kien, 'hours').toDate();

			            // Tính toán các thông số thống kê	
			            newSuaChua.thong_ke.thoi_gian.bat_dau.gio = kendo.toString(newSuaChua.thoi_gian.bat_dau, "yyyy-MM-dd HH:mm", "vi-VN")	            
			            newSuaChua.thong_ke.thoi_gian.bat_dau.ngay = kendo.toString(newSuaChua.thoi_gian.bat_dau, "yyyy-MM-dd", "vi-VN");
			            newSuaChua.thong_ke.thoi_gian.bat_dau.thang = kendo.toString(newSuaChua.thoi_gian.bat_dau, "MM", "vi-VN");
			            newSuaChua.thong_ke.thoi_gian.bat_dau.nam = kendo.toString(newSuaChua.thoi_gian.bat_dau, "yyyy", "vi-VN");

			            // Bắt buộc có trường thông tin này để liên kết các trường trong grid
			            newSuaChua.thong_ke.thoi_gian.sua_chua.du_kien = newSuaChua.thoi_gian.sua_chua_du_kien;

			            // Bắt buộc có trường thông tin này để liên kết các trường trong grid
			            newSuaChua.thong_ke.thoi_gian.ket_thuc.nam = kendo.toString(newSuaChua.thoi_gian.bat_dau, "yyyy", "vi-VN");

			            // Khởi tạo metadata câu hỏi 
			            newSuaChua.metadata = {};
			            $scope._helpers.buildMetadata('buildNew', newSuaChua.metadata); 
            		},
                    sourceSuaChua: function(suachua) {
                        // Chú ý nếu cờ isTGSCLabel được tắt, nghĩa là tính thời gian dự kiến qua trường tgscDuKienBanGiao (ph),
                        // ta cộng với thời gian hiện tại để có thời gian dự kiến bàn giao, rồi lấy thời gian dự kiến bàn giao 
                        // trừ đi thời gian vào để có thời gian dự kiến mới.
                        
                        if (!$scope.config.update.inputForm.isTGSCLabel) {
                            if ($scope.config.update.inputForm.tgscDuKienBanGiao) {
                                suachua.thoi_gian.ket_thuc_du_kien = moment().add($scope.config.update.inputForm.tgscDuKienBanGiao, 'minutes').toDate();
                                suachua.thoi_gian.sua_chua_du_kien = moment.duration(moment(suachua.thoi_gian.ket_thuc_du_kien).diff(moment(suachua.thoi_gian.bat_dau))).asHours();
                                
                                // Sau khi tính toán xong, reset lại isTGSCLabel và tgscDuKienBanGiao 
                                $scope.config.update.inputForm.isTGSCLabel = true;
                                $scope.config.update.inputForm.tgscDuKienBanGiao = 0;
                            }
                        }

                    	// Tính toán thời gian kết thúc dự kiến và thực tế nếu có
						suachua.thoi_gian.ket_thuc_du_kien = moment(suachua.thoi_gian.bat_dau).add(suachua.thoi_gian.sua_chua_du_kien, 'hours').toDate();
						// Tính toán các thông số thống kê
						suachua.thong_ke.thoi_gian.sua_chua.du_kien = suachua.thoi_gian.sua_chua_du_kien;

						if (suachua.trang_thai === 'Sửa chữa xong') {
							suachua.thoi_gian.ket_thuc = new Date();

							// Tính toán các thông số thống kê
							suachua.thong_ke.thoi_gian.sua_chua.thuc_te =  moment.duration(moment(suachua.thoi_gian.ket_thuc).diff(moment(suachua.thoi_gian.bat_dau))).asHours();
							suachua.thong_ke.thoi_gian.sua_chua.phut = moment(suachua.thoi_gian.ket_thuc).diff(suachua.thoi_gian.bat_dau, 'minutes');
							suachua.thong_ke.thoi_gian.sua_chua.gio = moment(suachua.thoi_gian.ket_thuc).diff(suachua.thoi_gian.bat_dau, 'hours');
							suachua.thong_ke.thoi_gian.sua_chua.ngay = moment(suachua.thoi_gian.ket_thuc).diff(suachua.thoi_gian.bat_dau, 'days');

							suachua.thong_ke.thoi_gian.ket_thuc.gio = kendo.toString(suachua.thoi_gian.ket_thuc, "yyyy-MM-dd HH:mm", "vi-VN")	            
				            suachua.thong_ke.thoi_gian.ket_thuc.ngay = kendo.toString(suachua.thoi_gian.ket_thuc, "yyyy-MM-dd", "vi-VN");
				            suachua.thong_ke.thoi_gian.ket_thuc.thang = kendo.toString(suachua.thoi_gian.ket_thuc, "MM", "vi-VN");
				            suachua.thong_ke.thoi_gian.ket_thuc.nam = kendo.toString(suachua.thoi_gian.ket_thuc, "yyyy", "vi-VN");
						}
						// Khởi tạo metadata
						if (!suachua.metadata)
							suachua.metadata = {};
						$scope._helpers.buildMetadata('build', suachua.metadata);
                    }
            	},
                validateNewMatb: function(newMatb) {
                    let error = {};
                    if (!newMatb.subject) {
                        error.message = "Chưa có thông tin về subject.";
                        return error;
                    }
                    if (!newMatb.category) {
                        error.message = "Chưa có thông tin về category.";
                        return error;
                    }
                    if (!newMatb.container.group) {
                        error.message = "Chưa có thông tin về phân loại phương tiện.";
                        return error;
                    }
                    if (!newMatb.container.text) {
                        error.message = "Chưa có thông tin về mã phương tiện.";
                        return error;
                    }
                    // Kiểm tra liệu mã thiết bị này đã tồn tại trong hệ thống
                    let validator = _.find( $scope.pageOptions.ui.selectOptions.ma_tbs[newMatb.container.group], (item) => {
                        return item.ma_tb == newMatb.container.text;
                    });
                    if (!_.isEmpty(validator)) {
                        error.message = "Mã phương tiện này đã tồn tại trong hệ thống.";
                        return error;
                    }
                    if (!newMatb.container.ref) {
                        error.message = "Chưa có thông tin về mã đơn vị quản lý.";
                        return error;
                    }
                    
                    return error;
                },
                validateForm: function(suachua) {
                    let error = {};    
                    if (!suachua._id && $scope.pageOptions.displayMode.current_manage_mode==='update') {
                        error.message = "Vui lòng chọn một lượt sửa chữa trong danh sách để thực hiện cập nhật";
                        return error;
                    }                    
                    if (!suachua.phan_loai.nhom_tb) {
                        error.message = "Chưa có thông tin về nhóm phương tiện.";
                        return error;
                    }
                    if (!suachua.phan_loai.loai_sua_chua) {
                        error.message = "Chưa có thông tin về phân loại sửa chữa.";
                        return error;
                    }
                    if (!suachua.phan_loai.loai_tb) {
                        error.message = "Chưa có thông tin về loại phương tiện.";
                        return error;
                    }
                    if (!suachua.ma_tb.ma_tb) {
                        error.message = "Chưa có thông tin về mã phương tiện.";
                        return error;
                    }
                    if (!suachua.ma_tb.dvql) {
                        error.message = "Chưa có thông tin về mã đơn vị quản lý phương tiện.";
                        return error;
                    }           
                    if (!suachua.dia_diem.dia_diem) {
                        error.message = "Chưa có thông tin về địa điểm sửa chữa.";
                        return error;
                    }
                    if (!suachua.dia_diem.khu_vuc) {
                        error.message = "Chưa có thông tin về khu vực sửa chữa.";
                        return error;
                    }
                    if (!suachua.dia_diem.vi_tri) {
                        error.message = "Chưa có thông tin về vị trí sửa chữa.";
                        return error;
                    }
                    if (!suachua.noi_dung) {
                        error.message = "Chưa có thông tin về nội dung sửa chữa.";
                        return error;
                    }
                    if (!suachua.thoi_gian.bat_dau) {
                        error.message = "Chưa có thông tin về thời gian bắt đầu sửa chữa.";
                        return error;
                    }
                    if (!suachua.thoi_gian.sua_chua_du_kien) {
                        // Trường hợp đặc biệt, nếu đặt thời gian sửa chữa dự kiến = 0 -> thiết bị cần có khoảng thời gian để kiểm tra, chưa xác định lỗi.
                        suachua.thoi_gian.sua_chua_du_kien = 0;
                    }
                    if (!suachua.trang_thai) {
                        error.message = "Chưa có thông tin trạng thái sửa chữa.";
                        return error;
                    }
                    return;
                },
                heroContent: {
                    current: {
                        text: '',
                        mode: 'default'
                    },
                    update: function(text, mode, timeoutStop) {
                        if (!mode)
                            mode = 'default';
                        if (!timeoutStop)
                        	timeoutStop = 38000;

                        if ($scope.pageOptions.ui.heroContent._id) {
                            Notifies.update({
                                _id: $scope.pageOptions.ui.heroContent._id
                            }, {
                                $set: {
                                    'content': {
                                        text: text,
                                        mode: mode
                                    }
                                }
                            }, (error) => {
                                if (!error) {
									this.current.text = text;
									this.current.mode = mode;
									$timeout(() => {
			                        	// Nếu sau 38s không có thông báo khác xen vào thì reset
			                        	if (this.current.text === $scope.pageOptions.ui.heroContent.content.text)
											this.reset();
			                        }, timeoutStop);
                                }
                            });
                        }
                    },
                    reset: function() {
                        // $scope.utils.heroContent.update()
                        this.update('', 'default');
                    }
                }
            }
            
            $scope.utils.reset.newSuaChua($scope.pageData.source.newSuaChua);
            $scope.utils.reset.newMatb($scope.pageData.source.newMatb);
            $scope.utils.reset.selectOptions();

            // Collection Hooks - Nếu có lượt phương tiện được tạo mới thì phát sinh tông báo
            SuaChuas.after.insert(function(userId, doc) {
                let text = '', mode = 'default';
                if (doc.thoi_gian.sua_chua_du_kien)
            	   text = 'Phương tiện ' + $scope.pageData.source.newSuaChua.ma_tb.ma_tb + ' đã được đưa vào ' + $scope.pageData.source.newSuaChua.phan_loai.loai_sua_chua.toLowerCase() + ' tại vị trí ' + $scope.pageData.source.newSuaChua.dia_diem.vi_tri + '. Thời gian nằm xưởng dự kiến: ' + $scope.utils.mics.formatHoursAsHM($scope.pageData.source.newSuaChua.thoi_gian.sua_chua_du_kien) + '.';
                else
                   text = 'Phương tiện ' + $scope.pageData.source.newSuaChua.ma_tb.ma_tb + ' đã được đưa vào ' + $scope.pageData.source.newSuaChua.phan_loai.loai_sua_chua.toLowerCase() + ' tại vị trí ' + $scope.pageData.source.newSuaChua.dia_diem.vi_tri + '. Đang tiến hành các thủ tục kiểm tra...';
                
                mode = 'success';
                $scope.utils.heroContent.update(text, mode, 38000);
            }); 

            // Collection Hooks - Nếu có thay đổi về trạng thái và trạng thái đó là một trong hai dạng 'Chuẩn bị bàn giao' hoặc 'Sửa chữa xong' thì phát sinh thông báo
            SuaChuas.after.update(function(userId, doc) {
                // Trường hợp cập nhật trạng thái sửa chữa phương tiện
        		let text = '', mode = 'default';

        		if (doc.trang_thai == 'Chuẩn bị bàn giao') {
                    // Nếu phương tiện chuẩn bị bàn giao, cần tính được thời gian sẽ bàn giao sắp tới (ph) bằng cách trừ thời gian
                    // dự kiến bàn giao cho thời điểm hiện tại
                    let minutes = Math.ceil(moment.duration(moment(doc.thoi_gian.ket_thuc_du_kien).diff(moment())).asMinutes());

        			text = 'Phương tiện ' + doc.ma_tb.ma_tb + ' dự kiến được bàn giao trong ' + minutes + ' phút tới. Yêu cầu khách hàng tới khu vực ' + doc.dia_diem.vi_tri + ' để chuẩn bị các thủ tục bàn giao.';
        			mode = 'warning';

        			$scope.utils.heroContent.update(text, mode, 38000);
        		}
        		if (doc.trang_thai == 'Sửa chữa xong') {
        			text = 'Phương tiện ' + doc.ma_tb.ma_tb + ' tại khu vực ' + doc.dia_diem.vi_tri + ' đã được ' + doc.phan_loai.loai_sua_chua.toLowerCase() + ' và bàn giao. Thời gian nằm xưởng: ' + $scope.utils.mics.formatHoursAsHM(doc.thong_ke.thoi_gian.sua_chua.thuc_te) + '.';
        			mode = 'success';

        			$scope.utils.heroContent.update(text, mode, 38000);
        		}
                // Trường hợp cập nhật thời gian dự kiến sau khi kiểm tra phương tiện
                if (!this.previous.thoi_gian.sua_chua_du_kien && doc.thoi_gian.sua_chua_du_kien) {
                    text = doc.ma_tb.ma_tb + ': ' + doc.noi_dung + '. Dự kiến bàn giao sau ' + $scope.utils.mics.formatHoursAsHM(doc.thoi_gian.sua_chua_du_kien) + '.';
                    mode = 'warning';
                    $scope.utils.heroContent.update(text, mode, 38000);
                }
            }); 

            // ***************************************************
            // SUBSCRIBE
            // ***************************************************

            // ***************************************************
            // REACTIVE HELPERS
            // ***************************************************

            $scope.helpers({
                datahelpers: () => {
                    // Lấy thông tin dạng thô - raw Data
                    let ma_tbs = DataHelpers.find({
                        subject: 'xuongdvkt',
                        category: 'ma_tbs'
                    }).fetch();
                    // Nhóm theo nhóm phương tiện
                    ma_tbs = _.groupBy(ma_tbs, (item) => { 
                        return item.container.group;
                    });
                    let output = {};
                    // Trích xuất ra thông tin cuối cùng dùng cho kendoselect
                    _.each(_.keys(ma_tbs), (key) => {
                        output[key] = [];
                        _.each( ma_tbs[key], (item) => {
                            output[key].push({
                                'ma_tb': item.container.text,
                                'dvql': item.container.ref
                            });
                        });
                    });
                    $scope.pageOptions.ui.selectOptions.ma_tbs = output;
                    return;
                }
            });
            

            // ***************************************************
            // METHODS
            // ***************************************************
            
            $scope.methods = {
                manage: {
                    insertNewMatb: function () {
                        // Trước khi xử lý ta chuyển mã thiết bị và mã ĐVQL toUpperCase xncg -> XNCG và nb280 -> NB280
                        $scope.pageData.source.newMatb.container.ref = $scope.pageData.source.newMatb.container.ref.toUpperCase();
                        $scope.pageData.source.newMatb.container.text = $scope.pageData.source.newMatb.container.text.toUpperCase();
                        
                        let error = {}
                        if (!Meteor.userId()) {
                            error.message = 'Bạn cần đăng nhập để sử dụng chức năng này.';
                            iNotifier.error(error.message);
                        } else {
                            if (!Roles.userIsInRole(Meteor.userId(), $scope.pageData.rights['can_upsert_sua_chua'], 'sky-project')) {
                                error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                                iNotifier.error(error.message);
                            } else {
                                error = $scope.utils.validateNewMatb($scope.pageData.source.newMatb);
                                if (_.isEmpty(error)) {
                                    $scope.utils.build.newMatb($scope.pageData.source.newMatb);
                                    DataHelpers.insert($scope.pageData.source.newMatb, (err, result) => {
                                        if (err) {
                                            iNotifier.error('Không thể tạo mới dữ liệu này. ' + err.message + '.');
                                        } else {
                                            $scope.$apply(() => {
                                                $scope.utils.reset.newMatb($scope.pageData.source.newMatb);
                                            });
                                            iNotifier.success('Mã thiết bị mới đã được lưu trữ thành công.');
                                        }
                                    });
                                } else {
                                    iNotifier.error(error.message);
                                }
                            }
                        }
                    },
                    insert: function () {
                        let error = {}
                        if (!Meteor.userId()) {
                            error.message = 'Bạn cần đăng nhập để sử dụng chức năng này.';
                            iNotifier.error(error.message);
                        } else {
                            if (!Roles.userIsInRole(Meteor.userId(), $scope.pageData.rights['can_upsert_sua_chua'], 'sky-project')) {
                                error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                                iNotifier.error(error.message);
                            } else {
                            	error = $scope.utils.validateForm($scope.pageData.source.newSuaChua);
                            	if (_.isEmpty(error)) {
                            		$scope.utils.build.newSuaChua($scope.pageData.source.newSuaChua);
                            		SuaChuas.insert($scope.pageData.source.newSuaChua, (err, result) => {
                                        if (err) {
                                            iNotifier.error('Không thể tạo mới dữ liệu về lượt sửa chữa này. ' + err.message + '.');
                                        } else {
                                            $scope.$apply( () => {
                                            	iNotifier.success('Dữ liệu về lượt sửa chữa được tạo mới thành công.');
                                                $scope.utils.reset.newSuaChua($scope.pageData.source.newSuaChua);
                                            });
                                        }
                                    });
								} else {
									iNotifier.error(error.message);
								}
                            }
                        }
                    },
                    update: function () {
                        let error = {}
                        if (!Meteor.userId()) {
                            error.message = 'Bạn cần đăng nhập để sử dụng chức năng này.';
                            iNotifier.error(error.message);
                        } else {
                            if (!Roles.userIsInRole(Meteor.userId(), $scope.pageData.rights['can_upsert_sua_chua'], 'sky-project')) {
                                error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                                iNotifier.error(error.message);
                            } else {
                                error = $scope.utils.validateForm($scope.pageData.source.selectedSuaChua);
                                if (!_.isEmpty(error)) {
                                    iNotifier.error(error.message);
                                } else {
                                    $scope.utils.build.sourceSuaChua($scope.pageData.source.selectedSuaChua);
                                    SuaChuas.update({
	                                    _id: $scope.pageData.source.selectedSuaChua._id
	                                }, {
	                                    $set: {
	                                    	'noi_dung': $scope.pageData.source.selectedSuaChua.noi_dung,
	                                        'trang_thai': $scope.pageData.source.selectedSuaChua.trang_thai,
	                                        'thoi_gian': $scope.pageData.source.selectedSuaChua.thoi_gian,
	                                        'thong_ke': $scope.pageData.source.selectedSuaChua.thong_ke,
	                                        'ghi_chu': $scope.pageData.source.selectedSuaChua.ghi_chu,
	                                        'metadata.ngay_cap_nhat_cuoi': $scope.pageData.source.selectedSuaChua.metadata.ngay_cap_nhat_cuoi,
	                                        'metadata.nguoi_cap_nhat_cuoi': $scope.pageData.source.selectedSuaChua.metadata.nguoi_cap_nhat_cuoi,
	                                        'metadata.nguoi_cap_nhat_cuoi_name': $scope.pageData.source.selectedSuaChua.metadata.nguoi_cap_nhat_cuoi_name,
	                                        'metadata.nguoi_cap_nhat_cuoi_email': $scope.pageData.source.selectedSuaChua.metadata.nguoi_cap_nhat_cuoi_email,
	                                        'metadata.nguoi_cap_nhat_cuoi_field': $scope.pageData.source.selectedSuaChua.metadata.nguoi_cap_nhat_cuoi_field
	                                    }
	                                }, (error) => {
	                                    if (error) {
	                                        iNotifier.error('Không thể cập nhật lượt sửa chữa này. ' + error.message + '.');
	                                    } else {
	                                        iNotifier.success('Lượt sửa chữa được cập nhật thành công.');	                                        
	                                        $scope.$apply(() => {
	                                        	// $scope.pageData.source.master = SuaChuas.findOne({_id: $scope.pageData.source.selectedSuaChua._id});
                        						$scope.pageData.source.selectedSuaChua = angular.copy($scope.pageData.source.master);
	                                        });
	                                    }
	                                });
                                }
                            }
                        }
                    },
                    resetSelected: function(id) {
                        $scope.pageData.source.selectedSuaChua = angular.copy($scope.pageData.source.master);

                        // reset lại isTGSCLabel và tgscDuKienBanGiao 
                        $scope.config.update.inputForm.isTGSCLabel = true;
                        $scope.config.update.inputForm.tgscDuKienBanGiao = 0;
                    }
                }
            }


            // ***************************************************
            // WATCHERS
            // ***************************************************
            $scope.$watch('pageData.source.newSuaChua.dia_diem.khu_vuc', (newVal) => {
                $scope.pageData.source.newSuaChua.dia_diem.vi_tri = '';
            })

        }
    }
});