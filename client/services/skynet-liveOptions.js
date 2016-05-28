angular.module('angular-skynet').factory('skynetLiveOptions', function(iNotifier) {
    let factory = {};


    // ***************************************************
    // DATA
    // ***************************************************
    factory.schemas = {
        cauhois: {
            model: {
                fields: {
                    '_id': {
                        type: 'string'
                    },
                    'phan_loai.kieu_cau_hoi.ten': {
                        type: 'string'
                    },
                    'phan_loai.nhom_cau_hoi.ten_ngan': {
                        type: 'string'
                    },
                    'phan_loai.nhom_cau_hoi.ten': {
                        type: 'string'
                    },
                    'fields.loai_tb': {
                        type: 'string'
                    },
                    'phan_loai.muc_do.ten': {
                        type: 'string'
                    },
                    'noi_dung.tieu_de': {
                        type: 'string'
                    },
                    'noi_dung.thong_ke.numOfLuaChons': {
                        type: 'number'
                    },
                    'noi_dung.thong_ke.numOfCorrectAnswers': {
                        type: 'number'
                    },
                    'noi_dung.thong_ke.numOfUrlHinhAnhs': {
                        type: 'number'
                    },
                    'fields.correctAnswer': {
                        type: 'string'
                    },
                    'fields.tags': {
                        type: 'string'
                    },
                    'fields.bac_thi': {
                        type: 'string'
                    },
                    'ghi_chu': {
                        type: 'string'
                    },
                    'mo_ta': {
                        type: 'string'
                    },
                    'metadata.ngay_tao': {
                        tpye: 'date'
                    },
                    'metadata.ngay_cap_nhat_cuoi': {
                        type: 'date'
                    },
                    'fields.thoi_gians.ngay_tao_string': {
                        type: 'string'
                    },
                    'fields.thoi_gians.ngay_cap_nhat_cuoi_string': {
                        type: 'string'
                    },
                    'metadata.nguoi_tao_name': {
                        type: 'string'
                    },
                    'metadata.nguoi_tao_email': {
                        type: 'string'
                    },
                    'metadata.nguoi_cap_nhat_cuoi_name': {
                        type: 'string'
                    },
                    'metadata.nguoi_cap_nhat_cuoi_email': {
                        type: 'string'
                    },
                    'isReserveOrder': {
                        type: 'boolean'
                    },
                    'fields.lua_chons.A': {
                        type: 'string'
                    },
                    'fields.lua_chons.B': {
                        type: 'string'
                    },
                    'fields.lua_chons.C': {
                        type: 'string'
                    },
                    'fields.lua_chons.D': {
                        type: 'string'
                    }
                }
            }
        },
        suachuas: {
            model: {
                fields: {
                    '_id': {
                        type: 'string'
                    },
                    'phan_loai.nhom_tb': {
                        type: 'string'
                    },
                    'phan_loai.loai_tb': {
                        type: 'string'
                    },
                    'ma_tb.ma_tb': {
                        type: 'string'
                    },
                    'phan_loai.loai_sua_chua': {
                        type: 'string'
                    },
                    'trang_thai': {
                        type: 'string'
                    },
                    'dia_diem.khu_vuc': {
                        type: 'string'
                    },
                    'dia_diem.vi_tri': {
                        type: 'string'
                    },
                    'noi_dung': {
                        type: 'string'
                    },
                    'thong_ke.thoi_gian.sua_chua.thuc_te': {
                        type: 'number'
                    },
                    'thoi_gian.sua_chua_du_kien': {
                        type: 'number'
                    },
                    'thong_ke.thoi_gian.bat_dau.ngay': {
                        type: 'string'
                    },
                    'thong_ke.thoi_gian.ket_thuc.ngay': {
                        type: 'string'
                    },
                    'thong_ke.thoi_gian.bat_dau.thang': {
                        type: 'string'
                    },
                    'thong_ke.thoi_gian.bat_dau.nam': {
                        type: 'string'
                    },
                    'thong_ke.thoi_gian.bat_dau.nam': {
                        type: 'string'
                    },
                    'ghi_chu': {
                        tpye: 'string'
                    },
                    'metadata.ngay_tao': {
                        tpye: 'date'
                    },
                    'metadata.ngay_cap_nhat_cuoi': {
                        type: 'date'
                    },
                    'fields.thoi_gians.ngay_tao_string': {
                        type: 'string'
                    },
                    'fields.thoi_gians.ngay_cap_nhat_cuoi_string': {
                        type: 'string'
                    },
                    'metadata.nguoi_tao_name': {
                        type: 'string'
                    },
                    'metadata.nguoi_tao_email': {
                        type: 'string'
                    },
                    'metadata.nguoi_cap_nhat_cuoi_name': {
                        type: 'string'
                    },
                    'metadata.nguoi_cap_nhat_cuoi_email': {
                        type: 'string'
                    }
                }
            }
        }
    }

    factory.cauhois = {
        kendo: {}
    }

    factory.suachuas = {
        kendo: {}
    }

    factory.skylogs = {
        cauhois: {
            time_ranges: {
                week: []
            },
            dataSource: kendo.data.DataSource.create({
                data: [],
                aggregate: [
                    { field: "_id", aggregate: "count" },
                ]
            })
        }
    }

    factory.cauhois.kendo.options = {
        charts: {
            dashboard: {
                dataSource: kendo.data.DataSource.create({
                    data: [],
                    aggregate: [
                        { field: "_id", aggregate: "count" },
                    ],
                    schema: factory.schemas.cauhois
                }),
                color: {
                    palettes: {                        
                        'Vitamin C': ['#004358', '#1F8A70', '#BEDB39', '#FFE11A', '#FD7400'],
                        'Ad Majora - Aspirin C': ['#225378', '#1595A3', '#ACF0F2', '#F2FFE3', '#EB7F00'],
                        'Blue Mono': ['#B0DAFC', '#7B98B0', '#325B7D', '#4681B0', '#455663', '#B0DAFC'],
                        'backup': ['#D7D780', '#FEAB63', '#F95146', '#B2E6C6', '#FE9396', '#91DAA4'],
                        
                    }
                },
                colorPalette: {
                    donut_nhomtbs_countId: ['#D7D780', '#FEAB63', '#F95146', '#B2E6C6', '#FE9396', '#91DAA4'],
                    bar_loaitbs_countId: ['#D7D780', '#FEAB63', '#F95146', '#B2E6C6', '#FE9396', '#91DAA4', '#D7D780', '#FEAB63', '#F95146', '#B2E6C6', '#FE9396', '#91DAA4'],
                }
            },

        },
        grids: {
            cauhois_list: {
                dataSource: kendo.data.DataSource.create({
                    data: [],
                    schema: factory.schemas.cauhois,
                    page: 1,
                    pageSize: 5
                }),

                columns: [
                    // Các trường xuất dữ liệu cho PM thi trắc nghiệm SNP
                    {       // COL.0
                        // field: "noi_dung.tieu_de",
                        field: "export_0",
                        title: "CAUHOI",
                        width: "330px",
                        hidden: true,
                        filterable: {
                            cell: {
                                operator: "contains",
                                suggestionOperator: "contains",
                                minLength: 3,
                                showOperators: false
                            }
                        },
                        template: '# if (isReserveOrder) { # !@#= noi_dung.tieu_de # # } else { # !\\##= noi_dung.tieu_de # # } #' 
                    }, {    // COL.1
                        // field: "noi_dung.thong_ke.numOfLuaChons",
                        field: "export_1",
                        title: "SOCAUTRALOI",
                        width: "150px",
                        hidden: true,
                        filterable: {
                            cell: {
                                operator: "eq",
                                showOperators: false
                            }
                        },
                        attributes: {
                            style: "text-align: center;"
                        },
                        template: '#= noi_dung.thong_ke.numOfLuaChons #' 
                    }, {    // COL.2
                        // field: "noi_dung.thong_ke.numOfUrlHinhAnhs",
                        field: "export_2",
                        title: "ANHCAUHOI",
                        width: "200px",
                        hidden: true,
                        filterable: {
                            cell: {
                                operator: "eq",
                                showOperators: false
                            }
                        },
                        attributes: {
                            style: "text-overflow: ellipsis; white-space: nowrap;"
                        },
                        template: "# if (noi_dung.thong_ke.numOfUrlHinhAnhs) { # #= noi_dung.url_hinh_anhs[0] # # } #"
                    }, {    // COL.3
                        // field: "fields.lua_chons.A",
                        field: "export_3",
                        title: "DAPAN1",
                        width: "330px",
                        hidden: true,
                        filterable: {
                            cell: {
                                operator: "contains",
                                suggestionOperator: "contains",
                                minLength: 3,
                                showOperators: false
                            }
                        },
                        template: "# if (fields.lua_chons.A) { if (fields.correctAnswer=='A') { # $#= fields.lua_chons.A # # } else { # \\##= fields.lua_chons.A # # } } #"
                    }, {    // COL.4
                        // field: "fields.lua_chons.B",
                        field: "export_4",
                        title: "DAPAN2",
                        width: "330px",
                        hidden: true,
                        filterable: {
                            cell: {
                                operator: "contains",
                                suggestionOperator: "contains",
                                minLength: 3,
                                showOperators: false
                            }
                        },
                        template: "# if (fields.lua_chons.B) { if (fields.correctAnswer=='B') { # $#= fields.lua_chons.B # # } else { # \\##= fields.lua_chons.B # # } } #"
                    }, {    // COL.5
                        // field: "fields.lua_chons.C",
                        field: "export_5",
                        title: "DAPAN3",
                        width: "330px",
                        hidden: true,
                        filterable: {
                            cell: {
                                operator: "contains",
                                suggestionOperator: "contains",
                                minLength: 3,
                                showOperators: false
                            }
                        },
                        template: "# if (fields.lua_chons.C) { if (fields.correctAnswer=='C') { # $#= fields.lua_chons.C # # } else { # \\##= fields.lua_chons.C # # } } #"
                    }, {    // COL.6
                        // field: "fields.lua_chons.D",
                        field: "export_6",
                        title: "DAPAN4",
                        width: "330px",
                        hidden: true,
                        filterable: {
                            cell: {
                                operator: "contains",
                                suggestionOperator: "contains",
                                minLength: 3,
                                showOperators: false
                            }
                        },
                        template: "# if (fields.lua_chons.D) { if (fields.correctAnswer=='D') { # $#= fields.lua_chons.D # # } else { # \\##= fields.lua_chons.D # # } } #"
                    }, {    // COL.7
                        // field: "fields.lua_chons.E",
                        field: "export_7",
                        title: "DAPAN5",
                        width: "330px",
                        hidden: true,
                        filterable: {
                            cell: {
                                operator: "contains",
                                suggestionOperator: "contains",
                                minLength: 3,
                                showOperators: false
                            }
                        },
                        template: "# if (fields.lua_chons.E) { if (fields.correctAnswer=='E') { # $#= fields.lua_chons.E # # } else { # \\##= fields.lua_chons.E # # } } #"
                    },

                    // Các trường hiển thị thông tin
                    {       // COL.8
                        field: "_id",
                        title: "ID Câu Hỏi",
                        width: "100px",
                        hidden: true,
                        filterable: {
                            cell: {
                                operator: "contains",
                                showOperators: false
                            }
                        }
                    }, {    // COL.9
                        field: "phan_loai.kieu_cau_hoi.ten",
                        title: "Kiểu câu hỏi",
                        width: "150px",
                        hidden: true,
                        filterable: {
                            cell: {
                                operator: "contains",
                                suggestionOperator: "contains",
                                minLength: 3,
                                showOperators: false
                            }
                        }
                    }, {    // COL.10
                        field: "phan_loai.nhom_cau_hoi.ten_ngan",
                        title: "Mã nhóm câu hỏi",
                        width: "80px",
                        hidden: true,
                        filterable: {
                            cell: {
                                operator: "contains",
                                suggestionOperator: "contains",
                                minLength: 3,
                                showOperators: false
                            }
                        }
                    }, {    // COL.11
                        field: "phan_loai.nhom_cau_hoi.ten",
                        title: "Nhóm câu hỏi",
                        width: "160px",
                        aggregates: ["count"],
                        groupHeaderTemplate: "#= value # (#= count# câu hỏi)",
                        filterable: {
                            cell: {
                                operator: "contains",
                                suggestionOperator: "contains",
                                minLength: 3,
                                showOperators: false
                            }
                        }
                    }, {    // COL.12
                        field: "fields.loai_tb",
                        title: "Loại thiết bị",
                        width: "140px",
                        aggregates: ["count"],
                        groupHeaderTemplate: "#= value # (#= count# câu hỏi)",
                        hidden: false,
                        filterable: {
                            cell: {
                                operator: "contains",
                                suggestionOperator: "contains",
                                minLength: 3,
                                showOperators: false
                            }
                        }
                    }, {    // COL.13
                        field: "phan_loai.muc_do.ten",
                        title: "Mức độ",
                        width: "90px",
                        aggregates: ["count"],
                        groupHeaderTemplate: "Mức độ: #= value # (#= count# câu hỏi)",
                        hidden: true,
                        filterable: {
                            cell: {
                                operator: "contains",
                                suggestionOperator: "contains",
                                minLength: 3,
                                showOperators: false
                            }
                        }
                    }, {    // COL.14
                        field: "noi_dung.tieu_de",
                        title: "Nội dung",
                        width: "330px",
                        aggregates: ["count"],
                        groupHeaderTemplate: "Nội dung: #= value # (#= count# câu hỏi)",
                        hidden: false,
                        filterable: {
                            cell: {
                                operator: "contains",
                                suggestionOperator: "contains",
                                minLength: 3,
                                showOperators: false
                            }
                        }
                    }, {    // COL.15
                        field: "noi_dung.thong_ke.numOfLuaChons",
                        title: "Lựa chọn",
                        width: "115px",
                        attributes: {
                            style: "text-align: center;"
                        },
                        aggregates: ["count"],
                        groupHeaderTemplate: "Số lựa chọn: #= value # (#= count# câu hỏi)",
                        hidden: false,
                        filterable: {
                            cell: {
                                operator: "eq",
                                showOperators: false
                            }
                        }
                    }, {    // COL.16
                        field: "noi_dung.thong_ke.numOfCorrectAnswers",
                        title: "SL câu đúng",
                        width: "115px",
                        attributes: {
                            style: "text-align: center;"
                        },
                        aggregates: ["count"],
                        groupHeaderTemplate: "Số đáp án đúng: #= value # (#= count# câu hỏi)",
                        hidden: false,
                        filterable: {
                            cell: {
                                operator: "eq",
                                showOperators: false
                            }
                        }
                    }, {    
                        field: "noi_dung.thong_ke.numOfUrlHinhAnhs",
                        title: "Hình ảnh",
                        width: "115px",
                        attributes: {
                            style: "text-align: center;"
                        },
                        aggregates: ["count"],
                        groupHeaderTemplate: "Hình ảnh: #= value # (#= count# câu hỏi)",
                        hidden: false,
                        filterable: {
                            cell: {
                                operator: "eq",
                                showOperators: false
                            }
                        }
                    }, {
                        field: "fields.correctAnswer",
                        title: "Đáp án",
                        width: "100px",
                        attributes: {
                            style: "text-align: center;"
                        },
                        aggregates: ["count"],
                        groupHeaderTemplate: "Đáp án đúng: #= value # (#= count# câu hỏi)",
                        hidden: false,
                        filterable: {
                            cell: {
                                operator: "eq",
                                showOperators: false
                            }
                        }
                    }, {
                        field: "fields.tags",
                        title: "Thẻ dấu",
                        width: "200px",
                        aggregates: ["count"],
                        groupHeaderTemplate: "Thẻ: #= value # (#= count# câu hỏi)",
                        hidden: false,
                        filterable: {
                            cell: {
                                operator: "contains",
                                suggestionOperator: "contains",
                                minLength: 3,
                                showOperators: false
                            }
                        }
                    }, {
                        field: "fields.bac_thi",
                        title: "Bậc thi",
                        width: "100px",
                        aggregates: ["count"],
                        groupHeaderTemplate: "Bậc thi: #= value # (#= count# câu hỏi)",
                        hidden: false,
                        filterable: {
                            cell: {
                                operator: "contains",
                                suggestionOperator: "contains",
                                minLength: 3,
                                showOperators: false
                            }
                        }
                    }, {
                        field: "ghi_chu",
                        title: "Ghi chú",
                        width: "300px",
                        hidden: true,
                        filterable: {
                            cell: {
                                operator: "contains",
                                suggestionOperator: "contains",
                                minLength: 3,
                                showOperators: false
                            }
                        }
                    }, {
                        field: "mo_ta",
                        title: "Mô tả",
                        width: "120px",
                        hidden: true,
                        filterable: {
                            cell: {
                                operator: "contains",
                                suggestionOperator: "contains",
                                minLength: 3,
                                showOperators: false
                            }
                        }
                    }, {
                        field: "metadata.ngay_tao",
                        title: "Ngày tạo (D)",
                        format: "{0: yyyy-MM-dd}",
                        width: "160px",
                        aggregates: ["count"],
                        groupHeaderTemplate: "Ngày tạo: #= value # (#= count# câu hỏi)",
                        hidden: true
                    }, {
                        field: "metadata.ngay_cap_nhat_cuoi",
                        title: "Ngày CN cuối (D)",
                        format: "{0: yyyy-MM-dd}",
                        width: "160px",
                        aggregates: ["count"],
                        groupHeaderTemplate: "Ngày cập nhật cuối: #= value # (#= count# câu hỏi)",
                        hidden: true
                    }, {
                        field: "fields.thoi_gians.ngay_tao_string",
                        title: "Ngày tạo (S)",
                        width: "160px",
                        aggregates: ["count"],
                        groupHeaderTemplate: "Ngày tạo: #= value # (#= count# câu hỏi)",
                        filterable: {
                            cell: {
                                operator: "contains",
                                suggestionOperator: "contains",
                                minLength: 3,
                                showOperators: false
                            }
                        }
                    }, {
                        field: "fields.thoi_gians.ngay_cap_nhat_cuoi_string",
                        title: "Ngày CN cuối (S)",
                        width: "160px",
                        aggregates: ["count"],
                        groupHeaderTemplate: "Ngày cập nhật cuối: #= value # (#= count# câu hỏi)",
                        hidden: true,
                        filterable: {
                            cell: {
                                operator: "contains",
                                suggestionOperator: "contains",
                                minLength: 3,
                                showOperators: false
                            }
                        }
                    }, {
                        field: "metadata.nguoi_tao_name",
                        title: "Người tạo",
                        width: "160px",
                        aggregates: ["count"],
                        groupHeaderTemplate: "Người tạo: #= value # (#= count# câu hỏi)",
                        hidden: true,
                        filterable: {
                            cell: {
                                operator: "contains",
                                suggestionOperator: "contains",
                                minLength: 3,
                                showOperators: false
                            }
                        }
                    }, {
                        field: "metadata.nguoi_tao_email",
                        title: "Người tạo (Email)",
                        width: "160px",
                        aggregates: ["count"],
                        groupHeaderTemplate: "Người tạo: #= value # (#= count# câu hỏi)",
                        hidden: true,
                        filterable: {
                            cell: {
                                operator: "contains",
                                suggestionOperator: "contains",
                                minLength: 3,
                                showOperators: false
                            }
                        }
                    }, {
                        field: "metadata.nguoi_cap_nhat_cuoi_name",
                        title: "Người cập nhật cuối",
                        width: "160px",
                        aggregates: ["count"],
                        groupHeaderTemplate: "Người cập nhật cuối: #= value # (#= count# câu hỏi)",
                        hidden: true,
                        filterable: {
                            cell: {
                                operator: "contains",
                                suggestionOperator: "contains",
                                minLength: 3,
                                showOperators: false
                            }
                        }
                    }, {
                        field: "metadata.nguoi_cap_nhat_cuoi_email",
                        title: "Người cập nhật cuối (Email)",
                        width: "160px",
                        aggregates: ["count"],
                        groupHeaderTemplate: "Người cập nhật cuối: #= value # (#= count# câu hỏi)",
                        hidden: true,
                        filterable: {
                            cell: {
                                operator: "contains",
                                suggestionOperator: "contains",
                                minLength: 3,
                                showOperators: false
                            }
                        }
                    }, {
                        field: "isReserveOrder",
                        title: "Đảo đáp án?",
                        width: "150px",
                        filterable: {
                            cell: {
                                operator: "eq",
                                showOperators: false
                            }
                        },
                        attributes: {
                            style: "text-align: center;"
                        },
                        values: [
                            { text: "0", value: true }, // Không được đảo đáp án
                            { text: "1", value: false } // Cho phép đảo đáp án
                        ]
                    }, {
                        field: "fields.lua_chons.A",
                        title: "Lựa chọn A",
                        width: "300px",
                        hidden: true,
                        filterable: {
                            cell: {
                                operator: "contains",
                                suggestionOperator: "contains",
                                minLength: 3,
                                showOperators: false
                            }
                        }
                    }, {
                        field: "fields.lua_chons.B",
                        title: "Lựa chọn B",
                        width: "300px",
                        hidden: true,
                        filterable: {
                            cell: {
                                operator: "contains",
                                suggestionOperator: "contains",
                                minLength: 3,
                                showOperators: false
                            }
                        }
                    }, {
                        field: "fields.lua_chons.C",
                        title: "Lựa chọn C",
                        width: "300px",
                        hidden: true,
                        filterable: {
                            cell: {
                                operator: "contains",
                                suggestionOperator: "contains",
                                minLength: 3,
                                showOperators: false
                            }
                        }
                    }, {
                        field: "fields.lua_chons.D",
                        title: "Lựa chọn D",
                        width: "300px",
                        hidden: true,
                        filterable: {
                            cell: {
                                operator: "contains",
                                suggestionOperator: "contains",
                                minLength: 3,
                                showOperators: false
                            }
                        }
                    }
                ],

                allowCopy: {
                    delimeter: "\t"
                },
                // autoBind: true,
                // columnMenu: false,
                // columnResizeHandleWidth: 3,
                // editable: false,
                excel: {
                    allPages: false,
                    filterable: false,
                    fileName: "From Sky with Love.xlsx",
                },
                filterable: {
                    mode: 'menu',
                    extra: false
                },
                groupable: {
                    enabled: true,
                    showFooter: false,
                    messages: {
                      empty: "Kéo/thả để nhóm theo nội dung được chọn"
                    }
                },
                // navigatable: false,
                // noRecords: false,
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
                pdf: {
                    allPages: false,
                    avoidLinks: true,
                    author: "Long Ho",
                    creator: "Skynet",
                    date: new Date(),
                    fileName: "From Sky with Love.pdf",
                    keywords: "Skynet's database",
                    landscape: false,
                    paperSize: "auto",
                    subject: "From Sky with Love",
                    title: "Tong Hop Cau Hoi Thi Nang Giu Bac - from Skynet"
                },
                reorderable: true,
                resizable: true,
                scrollable: {
                    virtual: false
                },
                selectable: "row",
                sortable: {
                    mode: "single",
                    allowUnsort: true
                },
                toolbar: ["excel", "pdf"],
                filterMenuInit: function(e) {
                    if (_.contains([
                            "phan_loai.nhom_cau_hoi.ten",
                            "_id",
                            "phan_loai.nhom_cau_hoi.ten_ngan",
                            "phan_loai.nhom_cau_hoi.ten",
                            "fields.loai_tb",
                            "phan_loai.muc_do.ten",
                            "noi_dung.tieu_de",
                            "fields.tags",
                            "fields.bac_thi",
                            "ghi_chu",
                            "mo_ta",
                            "metadata.nguoi_cap_nhat_cuoi_name",
                            "metadata.nguoi_cap_nhat_cuoi_email",
                            "fields.lua_chons.A",
                            "fields.lua_chons.B",
                            "fields.lua_chons.C",
                            "fields.lua_chons.D"
                        ], e.field)) {
                        let firstValueDropDown = e.container.find("select:eq(0)").data("kendoDropDownList");
                        firstValueDropDown.value("contains");
                        firstValueDropDown.trigger("change");
                    }
                },
                excelExport: function(e) {
                    let sheet = e.workbook.sheets[0];
                    let template = kendo.template(this.columns[1].template);
                    console.log('sheet rows length: ', sheet.rows.length);
                    for (let i = 1; i < sheet.rows.length; i++) {
                        let row = sheet.rows[i];
                        console.log('num of cell in row: ', row.cells.length);

                        // let dataItem = {
                        //     noi_dung: {
                        //         thong_ke: {
                        //             numOfLuaChons: row.cells[15].value
                        //         }
                        //     }
                        // };

                        // row.cells[1].value = template(dataItem);
                    }
                    iNotifier.success('Dữ liệu đã được trích xuất dưới định dạng Excel.');
                },
                pdfExport: function(e) {
                    iNotifier.success('Dữ liệu đã được trích xuất dưới định dạng Pdf thành công.');
                }
            }
        }
    }

    factory.suachuas.kendo.options = {
        grids: {
            suachuas_list: {
                dataSource: kendo.data.DataSource.create({
                    data: [],
                    schema: factory.schemas.suachuas,
                    page: 1,
                    pageSize: 8
                }),

                columns: [{
                    field: "_id",
                    title: "ID Sửa chữa",
                    type: "string",
                    width: "100px",
                    hidden: "true"
                }, {
                    field: "phan_loai.nhom_tb",
                    title: "Nhóm phương tiện",
                    type: "string",
                    width: "160px",
                    aggregates: ["count"],
                    groupHeaderTemplate: "Nhóm PT: #= value # (#= count# lượt)",
                    hidden: "true"
                }, {
                    field: "phan_loai.loai_tb",
                    title: "Loại PT",
                    type: "string",
                    width: "160px",
                    aggregates: ["count"],
                    groupHeaderTemplate: "Loại PT: #= value # (#= count# lượt)"
                }, {
                    field: "ma_tb.ma_tb",
                    title: "Mã PT",
                    type: "string",
                    width: "120px",
                    aggregates: ["count"],
                    groupHeaderTemplate: "Mã PT: #= value # (#= count# lượt)"
                }, {
                    field: "ma_tb.dvql",
                    title: "ĐVQL",
                    type: "string",
                    width: "120px",
                    aggregates: ["count"],
                    groupHeaderTemplate: "ĐVQL: #= value # (#= count# lượt)"
                }, {
                    field: "phan_loai.loai_sua_chua",
                    title: "Loại sửa chữa",
                    type: "string",
                    width: "160px",
                    aggregates: ["count"],
                    groupHeaderTemplate: "Loại SC: #= value # (#= count# lượt)"
                }, {
                    field: "noi_dung",
                    title: "Nội dung sửa chữa",
                    type: "string",
                    width: "360px",
                    aggregates: ["count"],
                    groupHeaderTemplate: "Nội dung SC: #= value # (#= count# lượt)"
                }, {
                    field: "trang_thai",
                    title: "Trạng thái",
                    type: "string",
                    width: "180px",
                    aggregates: ["count"],
                    groupHeaderTemplate: "Trạng thái: #= value # (#= count# lượt)"
                }, {
                    field: "dia_diem.khu_vuc",
                    title: "Khu vực SC",
                    type: "string",
                    width: "130px",
                    aggregates: ["count"],
                    groupHeaderTemplate: "#= value # (#= count# lượt)"
                }, {
                    field: "dia_diem.vi_tri",
                    title: "Vị trí",
                    type: "string",
                    width: "120px",
                    aggregates: ["count"],
                    groupHeaderTemplate: "Vị trí: #= value # (#= count# lượt)"
                }, {
                    field: "thong_ke.thoi_gian.sua_chua.thuc_te",
                    title: "TGSC (giờ)",
                    type: "number",
                    width: "120px",
                    format: "{0: #.00}",
                    attributes: {
                        style: "text-align: right;"
                    },
                    aggregates: ["min", "max", "average"],
                    groupHeaderTemplate: "Thời gian SC: #= value # (min: #= min#, max: #= max#, avg: #= average#)"
                }, {
                    field: "thoi_gian.sua_chua_du_kien",
                    title: "SC dự kiến (giờ)",
                    type: "number",
                    width: "120px",
                    format: "{0: #.00}",
                    attributes: {
                        style: "text-align: right;"
                    },
                    aggregates: ["min", "max", "average"],
                    groupHeaderTemplate: "Thời gian SC dự kiến: #= value # (min: #= min#, max: #= max#, avg: #= average#)"
                }, {
                    field: "thong_ke.thoi_gian.bat_dau.ngay",
                    title: "Ngày bắt đầu",
                    type: "string",
                    width: "140px",
                    aggregates: ["count"],
                    groupHeaderTemplate: "Ngày: #= value # (#= count# lượt)"
                }, {
                    field: "thong_ke.thoi_gian.ket_thuc.ngay",
                    title: "Ngày kết thúc",
                    type: "string",
                    width: "140px",
                    aggregates: ["count"],
                    groupHeaderTemplate: "Ngày: #= value # (#= count# lượt)"
                }, {
                    field: "thong_ke.thoi_gian.bat_dau.thang",
                    title: "Tháng",
                    type: "string",
                    width: "100px",
                    aggregates: ["count"],
                    groupHeaderTemplate: "Tháng: #= value # (#= count# lượt)"
                }, {
                    field: "thong_ke.thoi_gian.bat_dau.nam",
                    title: "Năm",
                    type: "string",
                    width: "100px",
                    aggregates: ["count"],
                    groupHeaderTemplate: "Năm: #= value # (#= count# lượt)"
                }, {
                    field: "ghi_chu",
                    title: "Ghi chú",
                    type: "string",
                    width: "300px"
                }, {
                    field: "metadata.ngay_tao",
                    title: "Ngày tạo",
                    type: "date",
                    format: "{0: yyyy-MM-dd}",
                    width: "160px",
                    hidden: true
                }, {
                    field: "metadata.ngay_cap_nhat_cuoi",
                    title: "Ngày CN cuối",
                    type: "date",
                    format: "{0: yyyy-MM-dd}",
                    width: "160px",
                    hidden: true
                }, {
                    field: "metadata.nguoi_tao_name",
                    title: "Người tạo",
                    type: "string",
                    width: "160px",
                    aggregates: ["count"],
                    groupHeaderTemplate: "Người tạo: #= value # (#= count# lượt)",
                    hidden: true
                }, {
                    field: "metadata.nguoi_tao_email",
                    title: "Người tạo (Email)",
                    type: "string",
                    width: "160px",
                    aggregates: ["count"],
                    groupHeaderTemplate: "Người tạo: #= value # (#= count# lượt)",
                    hidden: true
                }, {
                    field: "metadata.nguoi_cap_nhat_cuoi_name",
                    title: "Người cập nhật cuối",
                    type: "string",
                    width: "160px",
                    aggregates: ["count"],
                    groupHeaderTemplate: "Người cập nhật cuối: #= value # (#= count# lượt)",
                    hidden: true
                }, {
                    field: "metadata.nguoi_cap_nhat_cuoi_email",
                    title: "Người cập nhật cuối (Email)",
                    type: "string",
                    width: "160px",
                    aggregates: ["count"],
                    groupHeaderTemplate: "Người cập nhật cuối: #= value # (#= count# lượt)",
                    hidden: true
                }],

                allowCopy: {
                    delimeter: "\t"
                },
                excel: {
                    allPages: false,
                    filterable: false,
                    fileName: "From Sky with Love.xlsx",
                },
                filterable: {
                    mode: 'menu',
                    extra: false
                },
                groupable: {
                    enabled: true,
                    showFooter: false,
                    messages: {
                      empty: "Kéo/thả để nhóm theo nội dung được chọn"
                    }
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
                pdf: {
                    allPages: false,
                    avoidLinks: true,
                    author: "Long Ho",
                    creator: "Skynet",
                    date: new Date(),
                    fileName: "From Sky with Love.pdf",
                    keywords: "Skynet's database",
                    landscape: false,
                    paperSize: "auto",
                    subject: "From Sky with Love",
                    title: "Tong Hop Sua Chua Xuong DVKT - from Skynet"
                },
                reorderable: true,
                resizable: true,
                scrollable: {
                    virtual: false
                },
                selectable: "row",
                sortable: {
                    mode: "single",
                    allowUnsort: true
                },
                toolbar: ["excel", "pdf"],
                filterMenuInit: function(e) {
                    if (_.contains([
                            "_id",
                            "phan_loai.nhom_tb",
                            "phan_loai.loai_tb",
                            "ma_tb.ma_tb",
                            "phan_loai.loai_sua_chua",
                            "trang_thai",
                            "dia_diem.khu_vuc",
                            "dia_diem.vi_tri",
                            "noi_dung",
                            "thong_ke.thoi_gian.bat_dau.ngay",
                            "thong_ke.thoi_gian.ket_thuc.ngay",
                            "thong_ke.thoi_gian.bat_dau.thang",
                            "thong_ke.thoi_gian.bat_dau.nam",
                            "ghi_chu",
                            "metadata.nguoi_cap_nhat_cuoi_name",
                            "metadata.nguoi_cap_nhat_cuoi_email",
                            "fields.lua_chons.A",
                            "fields.lua_chons.B",
                            "fields.lua_chons.C",
                            "fields.lua_chons.D"
                        ], e.field)) {
                        let firstValueDropDown = e.container.find("select:eq(0)").data("kendoDropDownList");
                        firstValueDropDown.value("contains");
                        firstValueDropDown.trigger("change");
                    }
                },
                excelExport: function(e) {
                    iNotifier.success('Dữ liệu đã được trích xuất dưới định dạng Excel.');
                },
                pdfExport: function(e) {
                    iNotifier.success('Dữ liệu đã được trích xuất dưới định dạng Pdf thành công.');
                }
            }
        }
    }

    return factory;

});
