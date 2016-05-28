angular.module('angular-skynet').directive('datahelpersModalManage', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/datahelpers/datahelpers-modal-manage.html',
        controllerAs: 'vm',
        scope: {
        	// Chứa các thông tin về cấu hình cho modal
            kDataHelperOptions: '='
        },
        transclude: true,
        bindToController: true,
        controller: function($scope, $reactive, skynetHelpers, iNotifier) {
        	
        	$reactive(this).attach($scope);

            // ***************************************************
            // INITIALIZE
            // ***************************************************

            // Capture 'this contex - Refer to https://github.com/johnpapa/angular-styleguide#controlleras-with-vm
            let vm = this;

            vm._helpers = skynetHelpers.helpers;
            vm.modalOptions = {
            	modalHeader: vm.kDataHelperOptions.modalHeader,
            	modalId: 'modal_manage_' + vm.kDataHelperOptions.subject + '_' + vm.kDataHelperOptions.category,	
            	gridId: 'kGridManage_' + vm.kDataHelperOptions.subject + '_' + vm.kDataHelperOptions.category,
            	isModalActive : false,
            	mode: '',
            	selectedItem: {},
            	newItem: {
            		subject: vm.kDataHelperOptions.subject,
            		category: vm.kDataHelperOptions.category,
            		container: {},
            		isPublic: true,
            		isArchived: false,
            		metadata: {}
            	}
            };

        	// ***************************************************
            // UTILS
            // ***************************************************

            vm.utils = {
            	create_new: {
            		init: function(item) {
            			item.subject = vm.kDataHelperOptions.subject;
            			item.category = vm.kDataHelperOptions.category;
            			item.container = {};                       

                        // Mọi người đều có thể truy cập bảng tags
                        item.isPublic = true;
                        item.isArchived = false;
                        item.metadata = {}
                    },
                    build: function(item) {
                        // Build metadata
                        vm._helpers.buildMetadata('buildNew', item.metadata);
                    },
                    cancel: function() {
                    	vm.modalOptions.mode = '';
                    	vm.utils.manage.clearSelection();
                    },
                    insert: function() {
                        let err = vm.utils.manage.validateForm(vm.modalOptions.newItem);
                        if (_.isEmpty(err)) {
                            this.build(vm.modalOptions.newItem);
                            console.log('build: (new)', vm.modalOptions.newItem);
                            DataHelpers.insert(vm.modalOptions.newItem, (err, result) => {
                                if (err) {
                                    iNotifier.error('Không thể tạo mới dữ liệu này. ' + err.message + '.');
                                } else {
                                	$scope.$apply(() => {
                                		vm.utils.create_new.init(vm.modalOptions.newItem);
                                	});                                    
                                    iNotifier.success('Dữ liệu người dùng đã được lưu trữ thành công.');
                                }
                            });
                        } else {
                            iNotifier.error(err.message);
                        }
                    }
            	},
            	update: {
            		build: function(source) {
            			vm._helpers.buildMetadata('build', source.metadata);
                    },
                    cancel: function() {
                        vm.modalOptions.mode = '';
                        vm.utils.manage.clearSelection();
                    },
                    update: function() {
                        let err = vm.utils.manage.validateForm(vm.modalOptions.selectedItem);
                        if (_.isEmpty(err)) {
                            this.build(vm.modalOptions.selectedItem);
                            console.log('build before update: (new)', vm.modalOptions.selectedItem);
                            DataHelpers.update({
                                _id: vm.modalOptions.selectedItem._id
                            }, {
                                $set: {
                                	'container.ref': vm.modalOptions.selectedItem.container.ref,
                                	'container.group': vm.modalOptions.selectedItem.container.group,
                                	'container.order': vm.modalOptions.selectedItem.container.order,
                                	'container.text': vm.modalOptions.selectedItem.container.text,
                                	'container.value': vm.modalOptions.selectedItem.container.value,
                                    'metadata.ngay_cap_nhat_cuoi': vm.modalOptions.selectedItem.metadata.ngay_cap_nhat_cuoi,
                                    'metadata.nguoi_cap_nhat_cuoi': vm.modalOptions.selectedItem.metadata.nguoi_cap_nhat_cuoi,
                                    'metadata.nguoi_cap_nhat_cuoi_name': vm.modalOptions.selectedItem.metadata.nguoi_cap_nhat_cuoi_name,
                                    'metadata.nguoi_cap_nhat_cuoi_email': vm.modalOptions.selectedItem.metadata.nguoi_cap_nhat_cuoi_email,
                                }
                            }, (error) => {
                                if (error) {
                                    iNotifier.error('Có lỗi xảy ra khi cập nhật dữ liệu này này. ' + error.message + '.');
                                } else {
                                    iNotifier.success('Dữ liệu ngưòi dùng được cập nhật thành công.');

                                    $scope.$apply(() => {
                                        vm.modalOptions.mode = '';
                                        vm.utils.manage.clearSelection();
                                    });                                    
                                }
                            });
                        } else {
                            iNotifier.error(err.message);
                        }
                    }
            	},
            	manage: {
            		validateForm: function(source) {
            			let error = {};
                        
                        if (!Meteor.userId())
                            error.message = "Bạn cần đăng nhập để sử dụng chức năng này.";
                        
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'super-manager'], 'sky-project'))
                             error.message = "Bạn không đủ quyền hạn để sử dụng chức năng này.";                        
                        
                        if (!source.subject)
                            error.message = "Chưa có thông tin về trường Subject.";
                        if (!source.category)
                            error.message = "Chưa có thông tin về trường Category.";
                        
                        _.each(vm.kDataHelperOptions.renderFields, (item) => {
                        	if (item.isActive)
                        		if (!source['container'][item.field])
                        			error.message = item.textValidation;
                        });
                        
                        return error;
            		},
            		kGridOptions: {
	                    dataSource: kendo.data.DataSource.create({
	                        data: [],
	                        schema: {
	                            model: {
	                                fields: {
	                                    'container.ref': {
	                                        type: 'string'
	                                    },
	                                    'container.group': {
	                                        type: 'string'
	                                    },
	                                    'container.text': {
	                                        type: 'string'
	                                    },
	                                    'container.order': {
	                                    	type: 'number'
	                                    },
	                                    'container.value': {
	                                    	type: 'string'
	                                    }
	                                }
	                            }
	                        },
                            page: 1,
                            pageSize: 8
	                    }),
	                    // Có thể dùng template ở đây hoặc dùng columns.template
                        // rowTemplate: '<tr data-uid="#= uid #"><td>#: ten #</td><td style="text-align: right;">#: order #</td><td>#: kendo.toString(metadata.ngay_tao, "yyyy-MM-dd") #</td></tr>',
                        sortable: true,
                        pageable: {
                            input: false,
                            numeric: true,
                            buttonCount: 5,
                            previousNext: false,
                            info: true
                        },
                        filterable: false,
                        selectable: 'row',
                        change: function(e) {
                            let selected = this.dataItem(this.select()[0]);
                            // Khi người dùng chọn một hàng mới -> load vào selectedItem
                            if (selected) {
                                if (_.isEmpty(vm.modalOptions.selectedItem)) {
                                	vm.utils.setMode('selected');
                                    vm.modalOptions.selectedItem = angular.copy(selected);
                                } else {
                                    // Trường hợp người dùng click lại một lần nữa để bỏ chọn và thoát chế độ update nếu có
                                    if (vm.modalOptions.selectedItem._id === selected._id) {
                                        this.clearSelection();
                                        vm.modalOptions.selectedItem = {};
                                        vm.utils.setMode('');
                                    }
                                    else
                                        vm.modalOptions.selectedItem = angular.copy(selected);
                                }
                            }
                        },
                        columns: angular.copy(vm.kDataHelperOptions.columns)
                    },
                    clearSelection: function() {
                    	vm.modalOptions.selectedItem = {};
                        $('#' + vm.modalOptions.gridId).data("kendoGrid").clearSelection();
                    }
            	},
            	remove: {
            		cancel: function() {
                        vm.modalOptions.mode = '';
                        // Bỏ chọn cấu hình hiện tại
                        vm.utils.manage.clearSelection();
                    },
                    remove: function(id) {
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'super-manager'], 'sky-project'))
                            error.message = "Bạn không đủ quyền hạn để sử dụng chức năng này.";

                        else {
                        	if (id) {
                        		let text = vm.modalOptions.selectedItem.container.text;
                        		DataHelpers.remove({
	                                _id: id
	                            }, (error) => {
	                                if (!error)
	                                    iNotifier.info('Dữ liệu "' + text + '" đã được xóa khỏi hệ thống.');
	                                else
	                                    iNotifier.error(error.message);
	                            });
                        	}
	                        // Thoát khỏi chế độ remove
	                        this.cancel();
                        }
                        
                    },
            	},
            	closeModal: () => {
                    let modal = UIkit.modal('#' + vm.modalOptions.modalId);
                    if (modal.isActive()) {
                        // Reset các giá trị về mặc định
                        vm.modalOptions.mode = '';
                        modal.hide();
                    }
                },
                setMode: function(mode) {
                    vm.modalOptions.mode = mode;
                }
            };

            // ***************************************************
            // HELPERS
            // ***************************************************
            vm.helpers({
                datahelpers: () => {
                	let data = DataHelpers.find({
                		subject: (vm.kDataHelperOptions && vm.kDataHelperOptions.subject) ? vm.kDataHelperOptions.subject : '',
                		category: (vm.kDataHelperOptions && vm.kDataHelperOptions.category) ? vm.kDataHelperOptions.category : ''
                	}, {
                		sort: {
                			'container.text': 1
                		}
                	}).fetch();
                	vm.utils.manage.kGridOptions.dataSource.data(data);
                	return DataHelpers.find()
                }
            });

        }
    }
});
