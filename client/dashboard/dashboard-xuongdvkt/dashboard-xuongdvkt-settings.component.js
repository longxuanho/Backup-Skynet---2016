angular.module('angular-skynet').directive('dashboardXuongdvktSettings', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/dashboard/dashboard-xuongdvkt/dashboard-xuongdvkt-settings.template.html',
        scope: {
            pageOptions: '=',
            pageData: '='
        },
        controller: function($scope, $rootScope, iNotifier) {

            // ***************************************************
            // INITIALIZE
            // ***************************************************
            
            $scope.heroContent = {
                manual: {
                    content: {
                        text: '',
                        mode: 'default'
                    }
                },
                auto: {
                    dataSource: {
                        modes: [
                            'Yêu cầu bàn giao'
                        ]
                    },
                    mode: {
                        name: '',
                        config: {
                            ma_tb: ''
                        }
                    },
                    content: {
                        text: '',
                        mode: 'default'
                    }
                },
                isAuto: false
            }

            // ***************************************************
            // SUBSCRIBE
            // ***************************************************

            // ***************************************************
            // UTILS
            // ***************************************************

            $scope.utils = {
            	thong_bao: {
            		validateForms: function() {
            			let error = {
            				message: ''
            			};
            			if (!Meteor.userId()) {
                            error.message = 'Bạn cần đăng nhập để sử dụng chức năng này.';
                        } else {
                            
                            if (!Roles.userIsInRole(Meteor.userId(), $scope.pageData.rights['can_upsert_sua_chua'], 'sky-project')) {
                                error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                            } else {
                            	if (!$scope.heroContent.isAuto) {
		            				// Chế độ nhập liệu thủ công isAuto == false
		            				if (!$scope.heroContent.manual.content.mode)
		            					error.message = 'Chưa có thông tin về kiểu thông báo.';
		            				if (!$scope.heroContent.manual.content.text)
		            					error.message = 'Bạn cần nhập nội dung cho thông báo cần hiển thị.';            				
		            			} else {
		            				// Chế độ thông báo tự động isAuto == true
		            				if (!$scope.heroContent.auto.content.mode)
		            					error.message = 'Chưa có thông tin về kiểu thông báo.';
		            				if (!$scope.heroContent.auto.content.text)
		            					error.message = 'Có lỗi khi khởi tạo thông báo tự động cho phương tiện này. Xin vui lòng thử lại.';
		            				if ($scope.heroContent.auto.mode.name) {
		            					if ($scope.heroContent.auto.mode.name == 'Yêu cầu bàn giao') {
		            						if (!$scope.heroContent.auto.mode.config.ma_tb)
		            							error.message = 'Chưa có thông tin về mã phương tiện dùng cho thông báo.';
		            					}		            					
		            				} else {
		            					error.message = 'Bạn chưa chọn loại thông báo cần hiển thị.';
		            				}
		            			}
                            }             
                        }
            			return error;
            		}
            	}
            }
            

            // ***************************************************
            // METHODS
            // ***************************************************
            $scope.methods = {
                thong_bao: {
                    buildAutoText: function() {                        
                        let item = {};
                        if ($scope.pageData.suachuas.raw.length) {
                        	// Tìm tất cả các thông tin liên quan đến mã thiết bị được chọn
                            item = _.find($scope.pageData.suachuas.raw, (suachua) => {
                                return suachua.ma_tb.ma_tb === $scope.heroContent.auto.mode.config.ma_tb
                            });
                            if (!_.isEmpty(item)) {
                                if ($scope.heroContent.auto.mode.name === 'Yêu cầu bàn giao') {
                                    $scope.heroContent.auto.content.mode = 'warning';
                                    $scope.heroContent.auto.content.text = 'Yêu cầu khách hàng của lượt ' + item.phan_loai.loai_sua_chua.toLowerCase() + ' phương tiện ' + item.ma_tb.ma_tb + ' tới khu vực ' + item.dia_diem.vi_tri + ' để làm thủ tục bàn giao.'; 
                                }
                            }
                        }
                    },
                    resetFields: function () {
                    	$scope.heroContent.manual.content = {
                    		text: '',
                        	mode: 'default'
                    	};
                    	$scope.heroContent.auto.mode = {
                    		name: '',
	                        config: {
	                            ma_tb: ''
	                        }
                    	};
                    	$scope.heroContent.auto.content = {
                    		text: '',
                        	mode: 'default'
                    	};
                    },
                    update: function(content) {
                    	Notifies.update({
                            _id: $scope.pageOptions.ui.heroContent._id
                        }, {
                            $set: {
                                'content': content
                            }
                        }, (error) => {
                            if (error) {
                                iNotifier.error('Có lỗi xảy ra khi cập nhật thông báo. ' + error.message + '.');
                            } else {
                                iNotifier.success('Thông báo đã được cập nhật thành công.');
                                $scope.$apply(() => {
                                	$scope.methods.thong_bao.resetFields();
                                })
                            }
                        });
                    },                    
                    setText: function() {
                    	if ($scope.heroContent.isAuto)
                        	this.buildAutoText();

                        let error = $scope.utils.thong_bao.validateForms(); 
                        if (!error.message) {
                        	if (!$scope.heroContent.isAuto) {
                            	this.update($scope.heroContent.manual.content);
                            } else {
                            	this.update($scope.heroContent.auto.content);
                            }
                        } else {
                        	iNotifier.error(error.message);
                        }
                    },
                    clearText: function() {
                        this.resetFields();
                        this.update
                        Notifies.update({
                            _id: $scope.pageOptions.ui.heroContent._id
                        }, {
                            $set: {
                                'content': $scope.heroContent.manual.content
                            }
                        }, (error) => {
                            if (error) {
                                iNotifier.error('Có lỗi xảy ra khi reset thông báo này. ' + error.message + '.');
                            }
                        });
                    }
                }
            }

            // ***************************************************
            // UTILS
            // ***************************************************


            // ***************************************************
            // WATCHERS
            // ***************************************************


        }
    }
});