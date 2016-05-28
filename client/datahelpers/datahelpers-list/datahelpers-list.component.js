angular.module('angular-skynet').directive('datahelpersList', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/datahelpers/datahelpers-list/datahelpers-list.template.html',
        controllerAs: 'vm',
        bindToController: true,
        controller: function($scope, $stateParams, skynetHelpers, $rootScope, iNotifier, skynetKendoGrid, $reactive, skynetValidator) {

            $reactive(this).attach($scope);

            // ***************************************************
            // INITIALIZE
            // ***************************************************

            // Capture 'this contex - Refer to https://github.com/johnpapa/angular-styleguide#controlleras-with-vm
            let vm = this;

            vm._validator = skynetValidator;
            vm._helpers = skynetHelpers.helpers;
            
            kendo.pdf.defineFont({
                "Roboto": "/assets/fonts/DejaVuSans.ttf",
                "Roboto|Bold": "/assets/fonts/DejaVuSans-Bold.ttf",
                "Roboto|Bold|Italic": "/assets/fonts/DejaVuSans-Oblique.ttf",
                "Roboto|Italic": "/assets/fonts/DejaVuSans-Oblique.ttf"
            });

            // ***************************************************
            // UTILS
            // ***************************************************
            vm.utils = {
                mainGrid: {
                    collapseAllGroups: function() {
                        vm.pageOptions.mainGrid.gridRef.tbody.find("tr.k-grouping-row").each(function (index) {
                            vm.pageOptions.mainGrid.gridRef.collapseGroup(this);
                        });
                        vm.pageOptions.mainGrid.config.isExpandedGroup = false;
                    },
                    expandAllGroups: function() {
                        vm.pageOptions.mainGrid.gridRef.tbody.find("tr.k-grouping-row").each(function (index) {
                            vm.pageOptions.mainGrid.gridRef.expandGroup(this);
                        });
                        vm.pageOptions.mainGrid.config.isExpandedGroup = true;
                    },
                    clearSelection: function() {
                        vm.pageOptions.mainGrid.gridRef.clearSelection();
                        vm.pageOptions.modal.config.mode = 'createNew';
                    }
                }
            }

            // ***************************************************
            // PAGE DATA AND OPTIONS
            // ***************************************************
            vm.pageData = {
                collections: {
                    subjects: [
                        'cauhois',
                        'suachuas'
                    ],
                    categories: {
                        'cauhois': [
                            'nhom_tbs', 'loai_tbs', 'tags', 'bac_this'
                        ],
                        'suachuas': [

                        ]
                    }
                }
            }

            vm.pageOptions = {
                mainGrid: {
                    config: {
                        isExpandedGroup: true,
                        selectedItem: {},
                        selectedId: ''
                    },
                    gridRef: {},
                    gridOptions: {
                        dataSource: kendo.data.DataSource.create({
                            data: [],
                            schema: {
                                model: {
                                    fields: {
                                        '_id': {
                                            type: 'string'
                                        },
                                        'subject': {
                                            type: 'string'
                                        },
                                        'category': {
                                            type: 'string'
                                        },
                                        'container.ref': {
                                            type: 'string'
                                        },
                                        'container.group': {
                                            type: 'string'
                                        },
                                        'container.order': {
                                            type: 'number'
                                        },
                                        'container.text': {
                                            type: 'string'
                                        },
                                        'container.value': {
                                            type: 'number'
                                        },
                                        'metadata.nguoi_tao_name': {
                                            type: 'string'
                                        },
                                        'metadata.ngay_tao': {
                                            tpye: 'date'
                                        }
                                    }
                                } 
                            },
                            group: [
                                { field: "subject" },
                                { field: "category" },
                                { field: "container.ref" }
                            ],
                            page: 1,
                            pageSize: 10
                        }),
                        columns: [
                            {
                                field: "_id",
                                title: "#ID",
                                width: "100px",
                                hidden: true,
                                filterable: {
                                    cell: {
                                        operator: "contains",
                                        showOperators: false
                                    }
                                }
                            }, {
                                field: "subject",
                                title: "Subject",
                                width: "100px",
                                hidden: true,
                                filterable: {
                                    cell: {
                                        operator: "contains",
                                        showOperators: false
                                    }
                                },
                                aggregates: [ "count" ]
                            }, {
                                field: "category",
                                title: "Category",
                                width: "100px",
                                hidden: true,
                                filterable: {
                                    cell: {
                                        operator: "contains",
                                        showOperators: false
                                    }
                                },
                                aggregates: [ "count" ]
                            }, {
                                field: "container.ref",
                                title: "Container-ref",
                                width: "100px",
                                hidden: true,
                                filterable: {
                                    cell: {
                                        operator: "contains",
                                        showOperators: false
                                    }
                                },
                            }, {
                                field: "container.text",
                                title: "Container-text",
                                width: "100px",
                                filterable: {
                                    cell: {
                                        operator: "contains",
                                        showOperators: false
                                    }
                                }
                            }, {
                                field: "container.group",
                                title: "Container-group",
                                width: "100px",
                                filterable: {
                                    cell: {
                                        operator: "contains",
                                        showOperators: false
                                    }
                                }
                            }, {
                                field: "container.order",
                                title: "Container-order",
                                width: "100px",
                                filterable: {
                                    cell: {
                                        operator: "contains",
                                        showOperators: false
                                    }
                                }
                            }, {
                                field: "container.value",
                                title: "Container-value",
                                width: "100px",
                                filterable: {
                                    cell: {
                                        operator: "contains",
                                        showOperators: false
                                    }
                                }
                            }, {
                                field: "metadata.nguoi_tao_name",
                                title: "Created by",
                                width: "100px",
                                filterable: {
                                    cell: {
                                        operator: "contains",
                                        showOperators: false
                                    }
                                }
                            }, {
                                field: "metadata.ngay_tao",
                                title: "Created at",
                                width: "100px",
                                hidden: true
                            }
                        ],
                        columnMenu: {
                            filterable: false,
                            sortable: false
                        },
                        filterable: {
                            mode: 'row',
                            extra: false
                        },
                        pageable: {
                            pageSize: 2,
                            refresh: false,
                            pageSizes: true,
                            info: true,
                            buttonCount: 3,
                            numeric: true,
                            input: false,
                            previousNext: true
                        },
                        groupable: {
                            showFooter: true
                        },
                        reorderable: true,
                        resizable: true,
                        selectable: "row",
                        sortable: {
                            mode: "single",
                            allowUnsort: true
                        },
                        change: function(e) {
                            if (this.select().length)
                                vm.pageOptions.mainGrid.config.selectedId = this.dataItem(this.select()[0])._id;
                            vm.pageOptions.modal.config.mode = 'update';
                        },
                        dataBound: function(e) {
                            // Collapse grid by default
                            // vm.utils.mainGrid.collapseAllGroups(this);
                        }
                    }
                },
                modal: {
                    config: {
                        selector: 'modal_datahelpers_list',
                        mode: 'createNew',
                        isRemoving: false
                    },                    
                    source: {}
                }
            };
            

            // ***************************************************
            // METHODS
            // ***************************************************

            vm.methods = {
                showModal: function() {
                    let modal = UIkit.modal('#' + vm.pageOptions.modal.config.selector);
                    if (!modal.isActive()) {
                        modal.show();
                    }
                },
                closeModal: function() {
                    let modal = UIkit.modal('#' + vm.pageOptions.modal.config.selector);
                    if (modal.isActive()) {
                        modal.hide();
                    }
                },
                create_new: {
                    init: function() {
                        vm.pageOptions.modal.source = {
                            subject: '',
                            category: '',
                            container: '',
                            isPublic: true,
                            isArchived: false,
                            metadata: {}
                        }
                    },
                    build: function(item) {
                        // Build metadata
                        vm._helpers.buildMetadata('buildNew', item.metadata);
                    },
                    cancel: function() {
                        vm.pageOptions.modal.config.mode = 'createNew';
                        vm.utils.mainGrid.clearSelection();
                    },
                    insert: function() {
                        let err = vm._validator.validateDataHelperForm(vm.pageOptions.modal.source);
                        if (_.isEmpty(err)) {
                            this.build(vm.pageOptions.modal.source);
                            console.log('build: (new)', vm.pageOptions.modal.source);
                            DataHelpers.insert(vm.pageOptions.modal.source, (err, result) => {
                                if (err) {
                                    iNotifier.error('Không thể tạo mới dữ liệu này. ' + err.message + '.');
                                } else {
                                    $scope.$apply(() => {
                                        vm.methods.create_new.init();
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
                        vm.pageOptions.modal.source = angular.copy(vm.pageOptions.mainGrid.config.selectedItem);
                    },
                    update: function() {
                        let err = vm._validator.validateUser('can_upsert_datahelpers');
                        if (_.isEmpty(err)) {
                            err = vm._validator.validateDataHelperForm(vm.pageOptions.modal.source);
                            if (_.isEmpty(err)) {
                                this.build(vm.pageOptions.modal.source);
                                console.log('build before update: (new)', vm.pageOptions.modal.source);
                                DataHelpers.update({
                                    _id: vm.pageOptions.modal.source._id
                                }, {
                                    $set: {
                                        'subject': vm.pageOptions.modal.source.subject,
                                        'category': vm.pageOptions.modal.source.category,
                                        'container': vm.pageOptions.modal.source.container,
                                        'metadata.ngay_cap_nhat_cuoi': vm.pageOptions.modal.source.metadata.ngay_cap_nhat_cuoi,
                                        'metadata.nguoi_cap_nhat_cuoi': vm.pageOptions.modal.source.metadata.nguoi_cap_nhat_cuoi,
                                        'metadata.nguoi_cap_nhat_cuoi_name': vm.pageOptions.modal.source.metadata.nguoi_cap_nhat_cuoi_name,
                                        'metadata.nguoi_cap_nhat_cuoi_email': vm.pageOptions.modal.source.metadata.nguoi_cap_nhat_cuoi_email,
                                    }
                                }, (error) => {
                                    if (error) {
                                        iNotifier.error('Có lỗi xảy ra khi cập nhật dữ liệu này này. ' + error.message + '.');
                                    } else {
                                        iNotifier.success('Dữ liệu ngưòi dùng được cập nhật thành công.');

                                        $scope.$apply(() => {
                                            vm.methods.update.cancel();
                                        });                                    
                                    }
                                });
                            } else {
                                iNotifier.error(err.message);
                            }
                        }
                    }
                },
                remove: {
                    cancel: function() {
                        vm.pageOptions.modal.isRemoving = false;
                        vm.pageOptions.modal.config.mode = 'createNew';
                        vm.pageOptions.mainGrid.config.selectedId = '';
                        vm.utils.mainGrid.clearSelection();
                    },
                    remove: function(id) {
                        console.log('removing...');
                        let err = vm._validator.validateUser('can_delete_datahelpers');
                        if (_.isEmpty(err)) {
                            if (id) {
                                let text = vm.pageOptions.mainGrid.config.selectedItem.container.text;
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
                }
            }

            // ***************************************************
            // SUBSCRIBE
            // ***************************************************


            // ***************************************************
            // REACTIVE HELPERS
            // ***************************************************

            vm.helpers({
                datahelpers: () => {
                    vm.pageOptions.mainGrid.gridOptions.dataSource.data(
                        DataHelpers.find({
                        }).fetch() 
                    );  
                },
                selected: () => {
                    vm.pageOptions.mainGrid.config.selectedItem = DataHelpers.findOne({_id: vm.getReactively('pageOptions.mainGrid.config.selectedId')});
                    return;
                }
            });


            // ***************************************************
            // METHODS
            // ***************************************************
            

            // ***************************************************
            // WATCHERS
            // ***************************************************
            
            $scope.$watch('vm.pageOptions.mainGrid.config.selectedItem._id', (newVal) => {
                if (newVal && vm.pageOptions.modal.config.mode==="update") {
                    vm.pageOptions.modal.source = angular.copy(vm.pageOptions.mainGrid.config.selectedItem);
                }
            });

            $scope.$watch('vm.pageOptions.modal.config.mode', (newVal) => {
                if (newVal === 'createNew') {
                    vm.methods.create_new.init();
                } else if (newVal === 'update') {
                    vm.pageOptions.modal.source = angular.copy(vm.pageOptions.mainGrid.config.selectedItem);
                }
            });
        }
    }
});
