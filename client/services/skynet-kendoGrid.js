angular.module('angular-skynet').factory('skynetKendoGrid', function($rootScope, iNotifier) {

    let factory = {
        thietbis: {},
        thongsokythuats: {},
        cauhois: {},
        suachuas: {},
    };


    // ***************************************************
    // THIETBIS DATA
    // ***************************************************

    factory.thietbis.data = {
        config: {
            schema: {
                props: {},
                fields: {
                    columns: []
                }
            },
            defaultColumns: [
                'ma_tb.ma_tb',
                'ma_tb.ma_topx',
                'phan_loai.chung_loai.ten',
                'phan_loai.loai.ten',
                'ho_so_tb.thong_tin_chung.hang_san_xuat.ten',
                'ho_so_tb.thong_tin_chung.nam_sd',
                'don_vi_so_huu.ten',
                'don_vi_quan_ly.ten'
            ],
            defaultDataSource: {
                aggregate: undefined,
                batch: false,
                filter: undefined,
                group: [],
                offlineStorage: null,
                page: 1,
                pageSize: 5,
                // schema: {
                //     model: factory.thietbis.helpers.buildGridSchemaModel(this.defaultColumns)
                // },
                select: null,
                serverAggregates: false,
                serverFiltering: false,
                serverGrouping: false,
                serverPaging: false,
                serverSorting: false,
                sort: undefined,
                table: null,
                serverPaging: false,
                serverSorting: false,
            },
            defaultOptions: {
                allowCopy: {
                    delimeter: "\t"
                },
                altRowTemplate: "",
                autoBind: true,
                columnMenu: false,
                columnResizeHandleWidth: 3,
                // columns: factory.thietbis.helpers.buildGridColumns(this.defaultColumns),
                detailTemplate: null,
                editable: false,
                excel: {
                    allPages: true,
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
                height: null,
                mobile: "",
                name: "thietbisGrid",
                navigatable: false,
                noRecords: false,
                pageable: {
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
                    title: "Tong Hop Thuc Luc TCT Tan Cang Sai Gon - from Skynet"
                },
                prefix: "",
                reorderable: true,
                resizable: true,
                rowTemplate: "",
                scrollable: {
                    virtual: false
                },
                selectable: "row",
                sortable: {
                    mode: "single",
                    allowUnsort: true
                },
                toolbar: ["excel", "pdf"]
            },
            availableColumns: [{
                field: "_id",
                title: "ID TB",
                type: "string",
                width: "120px"
            }, {
                field: "ma_tb.ma_tb",
                title: "Mã TB",
                type: "string",
                width: "100px"
            }, {
                field: "ma_tb.ma_topx",
                title: "Mã TOPX",
                type: "string",
                width: "100px"
            }, {
                field: "ma_tb.ma_maximo",
                title: "Mã Maximo",
                type: "string",
                width: "100px"
            }, {
                field: "ma_tb.ma_topovn",
                title: "Mã TopoVn",
                type: "string",
                width: "100px"
            }, {
                field: "phan_loai.nhom.keyId",
                title: "ID nhóm",
                type: "string",
                width: "130px"
            }, {
                field: "phan_loai.nhom.ten",
                title: "Nhóm",
                type: "string",
                width: "120px"
            }, {
                field: "phan_loai.nhom.ma",
                title: "Mã nhóm",
                type: "string",
                width: "120px"
            }, {
                field: "phan_loai.chung_loai.keyId",
                title: "ID chủng loại",
                type: "string",
                width: "120px"
            }, {
                field: "phan_loai.chung_loai.ten",
                title: "Chủng loại",
                type: "string",
                width: "120px"
            }, {
                field: "phan_loai.chung_loai.ma",
                title: "Mã chủng loại",
                type: "string",
                width: "120px"
            }, {
                field: "phan_loai.loai.keyId",
                title: "ID loại TB",
                type: "string",
                width: "120px"
            }, {
                field: "phan_loai.loai.ten",
                title: "Loại TB",
                type: "string",
                width: "120px"
            }, {
                field: "phan_loai.loai.ma",
                title: "Mã loại",
                type: "string",
                width: "120px"
            }, {
                field: "dia_ban_hoat_dong.keyId",
                title: "ID địa bàn",
                type: "string",
                width: "120px"
            }, {
                field: "dia_ban_hoat_dong.ten",
                title: "Địa bàn hoạt động",
                type: "string",
                width: "120px"
            }, {
                field: "dia_ban_hoat_dong.ma",
                title: "Mã địa bàn",
                type: "string",
                width: "120px"
            }, {
                field: "dia_ban_hoat_dong.mien",
                title: "Vùng miền",
                type: "string",
                width: "120px"
            }, {
                field: "dia_ban_hoat_dong.map_data.subdepartment.ten",
                title: "Địa phương",
                type: "string",
                width: "120px"
            }, {
                field: "dia_ban_hoat_dong.map_data.department.ten",
                title: "Tỉnh thành",
                type: "string",
                width: "120px"
            }, {
                field: "don_vi_so_huu.ten",
                title: "Sở hữu",
                type: "string",
                width: "160px"
            }, {
                field: "don_vi_so_huu.ma",
                title: "Mã ĐVSH",
                type: "string",
                width: "120px"
            }, {
                field: "don_vi_so_huu.phan_loai",
                title: "SH: Phân loại",
                type: "string",
                width: "120px"
            }, {
                field: "don_vi_quan_ly.ten",
                title: "Quản lý",
                type: "string",
                width: "160px"
            }, {
                field: "don_vi_quan_ly.ma",
                title: "Mã ĐVQL",
                type: "string",
                width: "120px"
            }, {
                field: "don_vi_quan_ly.phan_loai",
                title: "QL: Phân loại",
                type: "string",
                width: "120px"
            }, {
                field: "ho_so_tb.thong_tin_chung.nam_sd",
                title: "Năm SD",
                type: "number",
                width: "120px"
            }, {
                field: "ho_so_tb.thong_tin_chung.nam_sx",
                title: "Năm SX",
                type: "number",
                width: "120px"
            }, {
                field: "ho_so_tb.thong_tin_chung.so_khung",
                title: "Số khung",
                type: "string",
                width: "120px"
            }, {
                field: "ho_so_tb.thong_tin_chung.so_may",
                title: "Số máy",
                type: "string",
                width: "120px"
            }, {
                field: "ho_so_tb.thong_tin_chung.so_dang_ky",
                title: "Số đăng ký",
                type: "string",
                width: "120px"
            }, {
                field: "ho_so_tb.thong_tin_chung.so_dang_kiem",
                title: "Số đăng kiểm",
                type: "string",
                width: "120px"
            }, {
                field: "ho_so_tb.thong_tin_chung.xuat_xu.ten",
                title: "Xuất xứ",
                type: "string",
                width: "120px"
            }, {
                field: "ho_so_tb.thong_tin_chung.bao_hanh.ngay_ban_giao",
                title: "Ngày bàn giao",
                type: "string",
                width: "120px"
            }, {
                field: "ho_so_tb.thong_tin_chung.bao_hanh.tinh_trang_ban_giao",
                title: "BG: Tình trạng",
                type: "string",
                width: "120px"
            }, {
                field: "ho_so_tb.thong_tin_chung.bao_hanh.isTrongThoiGianBaoHanh",
                title: "Trong thời hạn BH",
                type: "boolean",
                width: "120px"
            }, {
                field: "ho_so_tb.thong_tin_chung.bao_hanh.thoi_gian_ban_hanh",
                title: "Thời gian BH",
                type: "string",
                width: "120px"
            }, {
                field: "ho_so_tb.thong_tin_chung.bao_hanh.thoi_gian_bat_dau",
                title: "BH: Bắt đầu",
                type: "string",
                width: "date"
            }, {
                field: "ho_so_tb.thong_tin_chung.bao_hanh.thoi_gian_ket_thuc",
                title: "BH: Kết thúc",
                type: "string",
                width: "date"
            }, {
                field: "ho_so_tb.thong_tin_chung.hang_san_xuat.ten",
                title: "Hãng sản xuất",
                type: "string",
                width: "120px"
            }, {
                field: "ho_so_tb.thong_tin_chung.hang_san_xuat.ma",
                title: "Mã HSX",
                type: "string",
                width: "120px"
            }, {
                field: "ho_so_tb.thong_tin_chung.model_tb.ten",
                title: "Model TB",
                type: "string",
                width: "120px"
            }, {
                field: "ho_so_tb.thong_tin_chung.model_tb.ma",
                title: "Mã model",
                type: "string",
                width: "120px"
            }, {
                field: "ghi_chu",
                title: "Ghi chú",
                type: "string",
                width: "120px"
            }, {
                field: "mo_ta",
                title: "Mô tả",
                type: "string",
                width: "120px"
            }, {
                field: "icon",
                title: "Icon",
                type: "string",
                width: "120px"
            }]
        }
    };

    factory.thongsokythuats.data = {
        config: {
            schema: {
                props: {},
                fields: {
                    columns: []
                }
            },
            defaultColumns: [
                'thiet_bi.ma_tb.ma_tb',
                'thiet_bi.phan_loai.chung_loai.ten',
                'thiet_bi.ho_so.hang_san_xuat.ten',
                'thiet_bi.ho_so.model_tb.ten',
                'nhom_thong_so',
                'ten',
                'gia_tri',
                'don_vi',
                'gia_tri_text'
            ],
            defaultDataSource: {
                aggregate: undefined,
                batch: false,
                filter: undefined,
                group: [],
                offlineStorage: null,
                page: 1,
                pageSize: 5,
                // schema: {
                //     model: factory.thietbis.helpers.buildGridSchemaModel(this.defaultColumns)
                // },
                select: null,
                serverAggregates: false,
                serverFiltering: false,
                serverGrouping: false,
                serverPaging: false,
                serverSorting: false,
                sort: undefined,
                table: null,
                serverPaging: false,
                serverSorting: false,
            },
            defaultOptions: {
                allowCopy: {
                    delimeter: "\t"
                },
                altRowTemplate: "",
                autoBind: true,
                columnMenu: false,
                columnResizeHandleWidth: 3,
                // columns: factory.thietbis.helpers.buildGridColumns(this.defaultColumns),
                detailTemplate: null,
                editable: false,
                excel: {
                    allPages: true,
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
                height: null,
                mobile: "",
                name: "thongsokythuatsGrid",
                navigatable: false,
                noRecords: false,
                pageable: {
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
                    title: "Tong Hop Thuc Luc TCT Tan Cang Sai Gon - from Skynet"
                },
                prefix: "",
                reorderable: true,
                resizable: true,
                rowTemplate: "",
                scrollable: {
                    virtual: false
                },
                selectable: "row",
                sortable: {
                    mode: "single",
                    allowUnsort: true
                },
                toolbar: ["excel", "pdf"]
            },
            availableColumns: [{
                field: "_id",
                title: "ID TSKT",
                type: "string",
                width: "100px"
            }, {
                field: "thiet_bi.ma_tb.ma_tb",
                title: "Mã TB",
                type: "string",
                width: "80px"
            }, {
                field: "thiet_bi.ma_tb.ma_topx",
                title: "Mã TOPX",
                type: "string",
                width: "80px"
            }, {
                field: "thiet_bi.ma_tb.ma_maximo",
                title: "Mã Maximo",
                type: "string",
                width: "80px"
            }, {
                field: "thiet_bi.ma_tb.ma_topovn",
                title: "Mã TopoVn",
                type: "string",
                width: "80px"
            }, {
                field: "thiet_bi.phan_loai.nhom.keyId",
                title: "ID nhóm",
                type: "string",
                width: "100px"
            }, {
                field: "thiet_bi.phan_loai.nhom.ten",
                title: "Nhóm",
                type: "string",
                width: "100px"
            }, {
                field: "thiet_bi.phan_loai.nhom.ma",
                title: "Mã nhóm",
                type: "string",
                width: "100px"
            }, {
                field: "thiet_bi.phan_loai.chung_loai.keyId",
                title: "ID chủng loại",
                type: "string",
                width: "100px"
            }, {
                field: "thiet_bi.phan_loai.chung_loai.ten",
                title: "Chủng loại",
                type: "string",
                width: "100px"
            }, {
                field: "thiet_bi.phan_loai.chung_loai.ma",
                title: "Mã chủng loại",
                type: "string",
                width: "100px"
            }, {
                field: "thiet_bi.phan_loai.loai.keyId",
                title: "ID loại TB",
                type: "string",
                width: "100px"
            }, {
                field: "thiet_bi.phan_loai.loai.ten",
                title: "Loại TB",
                type: "string",
                width: "100px"
            }, {
                field: "thiet_bi.phan_loai.loai.ma",
                title: "Mã loại",
                type: "string",
                width: "100px"
            }, {
                field: "thiet_bi.ho_so.hang_san_xuat",
                title: "Hãng sản xuất",
                type: "string",
                width: "120px"
            }, {
                field: "thiet_bi.ho_so.model_tb",
                title: "Model TB",
                type: "string",
                width: "120px"
            }, {
                field: "thiet_bi.ho_so.nam_sd",
                title: "Năm SD",
                type: "number",
                width: "120px"
            }, {
                field: "thiet_bi.ho_so.nam_sx",
                title: "Năm SX",
                type: "number",
                width: "120px"
            }, {
                field: "thiet_bi.ho_so.don_vi_quan_ly",
                title: "Đơn vị quản lý",
                type: "string",
                width: "120px"
            }, {
                field: "thiet_bi.ho_so.ma_don_vi_quan_ly",
                title: "Mã ĐVQL",
                type: "string",
                width: "120px"
            }, {
                field: "thiet_bi.ho_so.don_vi_so_huu",
                title: "Đơn vị sở hữu",
                type: "string",
                width: "160px"
            }, {
                field: "thiet_bi.ho_so.ma_don_vi_so_huu",
                title: "Mã ĐVSH",
                type: "string",
                width: "120px"
            }, {
                field: "thiet_bi.ho_so.dia_ban_hoat_dong",
                title: "Địa bàn hoạt động",
                type: "string",
                width: "120px"
            }, {
                field: "thiet_bi.ho_so.ma_dia_ban_hoat_dong",
                title: "Mã địa bàn hoạt động",
                type: "string",
                width: "160px"
            }, {
                field: "thiet_bi.ho_so.thoi_gian_bao_hanh",
                title: "TGBH (tháng)",
                type: "number",
                width: "120px"
            }, {
                field: "thiet_bi.ho_so.ket_thuc_bao_hanh",
                title: "Kết thúc bảo hành",
                type: "date",
                width: "120px"
            }, {
                field: "nhom_thong_so",
                title: "Nhóm thông số",
                type: "string",
                width: "150px"
            }, {
                field: "ten",
                title: "Thông số",
                type: "string",
                width: "180px"
            }, {
                field: "don_vi",
                title: "Đơn vị",
                type: "string",
                width: "80px"
            }, {
                field: "gia_tri",
                title: "Giá trị",
                type: "number",
                width: "100px"
            }, {
                field: "gia_tri_text",
                title: "Giá trị *",
                type: "string",
                width: "120px"
            }, {
                field: "metadata.nguoi_tao_name",
                title: "Người tạo",
                type: "string",
                width: "120px"
            }, {
                field: "metadata.nguoi_tao_email",
                title: "Người tạo (Email)",
                type: "string",
                width: "120px"
            }, {
                field: "metadata.nguoi_cap_nhat_cuoi_name",
                title: "Cập nhật cuối",
                type: "string",
                width: "120px"
            }, {
                field: "metadata.nguoi_cap_nhat_cuoi_email",
                title: "Cập nhật cuối (Email)",
                type: "string",
                width: "120px"
            }]
        }
    };

    factory.cauhois.data = {
        config: {
            schema: {
                props: {},
                fields: {
                    columns: []
                }
            },
            defaultOptions: {
                allowCopy: {
                    delimeter: "\t"
                },
                autoBind: true,
                columnMenu: false,
                columnResizeHandleWidth: 3,
                editable: false,
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
                navigatable: false,
                noRecords: false,
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
                    iNotifier.success('Dữ liệu đã được trích xuất dưới định dạng Excel.');
                },
                pdfExport: function(e) {
                    iNotifier.success('Dữ liệu đã được trích xuất dưới định dạng Pdf thành công.');
                }              
            },
            availableColumns: [{
                field: "_id",
                title: "ID Câu Hỏi",
                type: "string",
                width: "100px",
                hidden: true,
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false
                    }
                }
            }, {
                field: "phan_loai.kieu_cau_hoi.ten",
                title: "Kiểu câu hỏi",
                type: "string",
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
            }, {
                field: "phan_loai.nhom_cau_hoi.ten_ngan",
                title: "Mã nhóm câu hỏi",
                type: "string",
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
            }, {
                field: "phan_loai.nhom_cau_hoi.ten",
                title: "Nhóm câu hỏi",
                type: "string",
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
            }, {
                field: "fields.loai_tb",
                title: "Loại thiết bị",
                type: "string",
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
            }, {
                field: "phan_loai.muc_do.ten",
                title: "Mức độ",
                type: "string",
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
            }, {
                field: "noi_dung.tieu_de",
                title: "Nội dung",
                type: "string",
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
            }, {
                field: "noi_dung.thong_ke.numOfLuaChons",
                title: "Lựa chọn",
                type: "number",
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
            }, {
                field: "noi_dung.thong_ke.numOfCorrectAnswers",
                title: "SL câu đúng",
                type: "number",
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
                type: "number",
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
                type: "string",
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
                type: "string",
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
                type: "string",
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
                type: "string",
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
                type: "string",
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
                type: "date",
                format: "{0: yyyy-MM-dd}",
                width: "160px",
                aggregates: ["count"],
                groupHeaderTemplate: "Ngày tạo: #= value # (#= count# câu hỏi)",
                hidden: true
            }, {
                field: "metadata.ngay_cap_nhat_cuoi",
                title: "Ngày CN cuối (D)",
                type: "date",
                format: "{0: yyyy-MM-dd}",
                width: "160px",
                aggregates: ["count"],
                groupHeaderTemplate: "Ngày cập nhật cuối: #= value # (#= count# câu hỏi)",
                hidden: true
            }, {
                field: "fields.thoi_gians.ngay_tao_string",
                title: "Ngày tạo (S)",
                type: "string",
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
                type: "string",
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
                type: "string",
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
                type: "string",
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
                type: "string",
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
                type: "string",
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
                field: "fields.lua_chons.A",
                title: "Lựa chọn A",
                type: "string",
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
                type: "string",
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
                type: "string",
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
                type: "string",
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
            }]
        }
    };

    factory.suachuas.data = {
        config: {
            schema: {
                props: {},
                fields: {
                    columns: []
                }
            },
            defaultColumns: [
                'phan_loai.loai_tb',
                'ma_tb.ma_tb',
                'phan_loai.loai_sua_chua',
                'trang_thai',
                'dia_diem.khu_vuc',
                'dia_diem.vi_tri',
                'noi_dung',                
                'thong_ke.thoi_gian.bat_dau.ngay',
                'thong_ke.thoi_gian.sua_chua.thuc_te',
                'thoi_gian.thoi_gian.sua_chua.du_kien'
            ],
            defaultOptions: {
                allowCopy: {
                    delimeter: "\t"
                },
                altRowTemplate: "",
                autoBind: true,
                columnMenu: {
                    sortable: false
                },
                columnResizeHandleWidth: 3,
                // columns: factory.thietbis.helpers.buildGridColumns(this.defaultColumns),
                editable: false,
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
                height: null,
                mobile: "",
                name: "suachuasGrid",
                navigatable: false,
                noRecords: false,
                pageable: {
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
                    title: "Tong Hop Sua Chua - from Skynet"
                },
                prefix: "",
                reorderable: true,
                resizable: true,
                rowTemplate: "",
                scrollable: {
                    virtual: false
                },
                selectable: "row",
                sortable: {
                    mode: "single",
                    allowUnsort: true
                },
                toolbar: ["excel", "pdf"],
                detailTemplate: "",
                detailInit: function(e) {
                    e.detailRow.find(".myGridDetails").kendoGrid({
                        dataSource: e.data.noi_dung.lua_chons
                    });
                }                
            },
            availableColumns: [{
                field: "_id",
                title: "ID Sửa chữa",
                type: "string",
                width: "100px"
            }, {
                field: "phan_loai.nhom_tb",
                title: "Nhóm phương tiện",
                type: "string",
                width: "160px",
                aggregates: ["count"],
                groupHeaderTemplate: "Nhóm PT: #= value # (#= count# lượt)"
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
                field: "phan_loai.loai_sua_chua",
                title: "Loại sửa chữa",
                type: "string",
                width: "160px",
                aggregates: ["count"],
                groupHeaderTemplate: "Loại SC: #= value # (#= count# lượt)"
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
                field: "noi_dung",
                title: "Nội dung sửa chữa",
                type: "string",
                width: "320px",
                aggregates: ["count"],
                groupHeaderTemplate: "Nội dung SC: #= value # (#= count# lượt)"
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
                width: "160px"
            }, {
                field: "metadata.ngay_cap_nhat_cuoi",
                title: "Ngày CN cuối",
                type: "date",
                format: "{0: yyyy-MM-dd}",
                width: "160px"
            }, {
                field: "metadata.nguoi_tao_name",
                title: "Người tạo",
                type: "string",
                width: "160px",
                aggregates: ["count"],
                groupHeaderTemplate: "Người tạo: #= value # (#= count# lượt)"
            }, {
                field: "metadata.nguoi_tao_email",
                title: "Người tạo (Email)",
                type: "string",
                width: "160px",
                aggregates: ["count"],
                groupHeaderTemplate: "Người tạo: #= value # (#= count# lượt)"
            }, {
                field: "metadata.nguoi_cap_nhat_cuoi_name",
                title: "Người cập nhật cuối",
                type: "string",
                width: "160px",
                aggregates: ["count"],
                groupHeaderTemplate: "Người cập nhật cuối: #= value # (#= count# lượt)"
            }, {
                field: "metadata.nguoi_cap_nhat_cuoi_email",
                title: "Người cập nhật cuối (Email)",
                type: "string",
                width: "160px",
                aggregates: ["count"],
                groupHeaderTemplate: "Người cập nhật cuối: #= value # (#= count# lượt)"
            }]
        }
    };

    // ***************************************************
    // THIETBIS HELPERS
    // ***************************************************

    factory.thietbis.helpers = {
        initDefaultDataSource: function(source) {
            source.aggregate = angular.copy(factory.thietbis.data.config.defaultDataSource.aggregate);
            source.batch = factory.thietbis.data.config.defaultDataSource.batch;
            source.filter = angular.copy(factory.thietbis.data.config.defaultDataSource.filter);
            source.group = angular.copy(factory.thietbis.data.config.defaultDataSource.group);
            source.offlineStorage = angular.copy(factory.thietbis.data.config.defaultDataSource.offlineStorage);
            source.page = factory.thietbis.data.config.defaultDataSource.page;
            source.pageSize = factory.thietbis.data.config.defaultDataSource.pageSize;
            source.select = angular.copy(factory.thietbis.data.config.defaultDataSource.select);
            source.serverAggregates = factory.thietbis.data.config.defaultDataSource.serverAggregates;
            source.serverFiltering = factory.thietbis.data.config.defaultDataSource.serverFiltering;
            source.serverGrouping = factory.thietbis.data.config.defaultDataSource.serverGrouping;
            source.serverPaging =  factory.thietbis.data.config.defaultDataSource.serverPaging;
            source.serverSorting = factory.thietbis.data.config.defaultDataSource.serverSorting;
            source.sort = angular.copy(factory.thietbis.data.config.defaultDataSource.sort);
            source.table = angular.copy(factory.thietbis.data.config.defaultDataSource.table);
            source.serverPaging = factory.thietbis.data.config.defaultDataSource.serverPaging;
            source.serverSorting = factory.thietbis.data.config.defaultDataSource.serverSorting;

            source.schema = angular.copy(this.buildGridSchemaModel(factory.thietbis.data.config.defaultColumns));
        },
        initDefaultOptions: function() {
            let options = angular.copy(factory.thietbis.data.config.defaultOptions);
            options.columns = angular.copy(this.buildGridColumns(factory.thietbis.data.config.defaultColumns));
            
            return options;
        },
        buildGridColumns: function(columns) {
            return _.without(_.map(factory.thietbis.data.config.availableColumns, (item) => {
                if (_.contains(columns, item.field)) {
                    return _.omit(item, 'type');
                }
            }), undefined);
        },
        buildGridSchemaModel: function(columns) {
            let model = {
                id: "_id",
                fields: {}
            };
            _.each(factory.thietbis.data.config.availableColumns, (item) => {
                if (_.contains(columns, item.field)) {
                    model.fields[item.field] = {
                        type: item.type
                    }
                }
            });
            return model;
        }
    };

    factory.thongsokythuats.helpers = {
        initDefaultDataSource: function(source) {
            source.aggregate = angular.copy(factory.thongsokythuats.data.config.defaultDataSource.aggregate);
            source.batch = factory.thongsokythuats.data.config.defaultDataSource.batch;
            source.filter = angular.copy(factory.thongsokythuats.data.config.defaultDataSource.filter);
            source.group = angular.copy(factory.thongsokythuats.data.config.defaultDataSource.group);
            source.offlineStorage = angular.copy(factory.thongsokythuats.data.config.defaultDataSource.offlineStorage);
            source.page = factory.thongsokythuats.data.config.defaultDataSource.page;
            source.pageSize = factory.thongsokythuats.data.config.defaultDataSource.pageSize;
            source.select = angular.copy(factory.thongsokythuats.data.config.defaultDataSource.select);
            source.serverAggregates = factory.thongsokythuats.data.config.defaultDataSource.serverAggregates;
            source.serverFiltering = factory.thongsokythuats.data.config.defaultDataSource.serverFiltering;
            source.serverGrouping = factory.thongsokythuats.data.config.defaultDataSource.serverGrouping;
            source.serverPaging =  factory.thongsokythuats.data.config.defaultDataSource.serverPaging;
            source.serverSorting = factory.thongsokythuats.data.config.defaultDataSource.serverSorting;
            source.sort = angular.copy(factory.thongsokythuats.data.config.defaultDataSource.sort);
            source.table = angular.copy(factory.thongsokythuats.data.config.defaultDataSource.table);
            source.serverPaging = factory.thongsokythuats.data.config.defaultDataSource.serverPaging;
            source.serverSorting = factory.thongsokythuats.data.config.defaultDataSource.serverSorting;

            source.schema = angular.copy(this.buildGridSchemaModel(factory.thongsokythuats.data.config.defaultColumns));
        },
        initDefaultOptions: function() {
            let options = angular.copy(factory.thongsokythuats.data.config.defaultOptions);
            options.columns = angular.copy(this.buildGridColumns(factory.thongsokythuats.data.config.defaultColumns));
            
            return options;
        },
        buildGridColumns: function(columns) {
            return _.without(_.map(factory.thongsokythuats.data.config.availableColumns, (item) => {
                if (_.contains(columns, item.field)) {
                    return _.omit(item, 'type');
                }
            }), undefined);
        },
        buildGridSchemaModel: function(columns) {
            let model = {
                id: "_id",
                fields: {}
            };
            _.each(factory.thongsokythuats.data.config.availableColumns, (item) => {
                if (_.contains(columns, item.field)) {
                    model.fields[item.field] = {
                        type: item.type
                    }
                }
            });
            return model;
        }
    };

    factory.cauhois.helpers = {
        initDefaultDataSource: function() {
            let source = kendo.data.DataSource.create({
                data: [],
                page: 1,
                pageSize: 5,
                schema: {
                    model: this.buildGridSchemaModel()
                }
            });
            console.log('build DataSource: ', source);
            return source;
        },
        initDefaultOptions: function() {
            // Khởi tạo các cấu hình cơ bản
            let options = angular.copy(factory.cauhois.data.config.defaultOptions);
            // Khởi tạo các cột dữ liệu
            options.columns = angular.copy(this.buildGridColumns());
            // Khởi tạo nguồn dữ liệu - dataSource
            options.dataSource = this.initDefaultDataSource();

            return options;
        },
        // buildGridColumns: function(columns) {
        //     return _.without(_.map(factory.cauhois.data.config.availableColumns, (item) => {
        //         if (_.contains(columns, item.field)) {
        //             // return _.omit(item, 'type');
        //             return item;
        //         }
        //     }), undefined);
        // },
        buildGridColumns: function() {
            return factory.cauhois.data.config.availableColumns;
        },
        buildGridSchemaModel: function() {
            let model = {
                fields: {}
            };
            _.each(factory.cauhois.data.config.availableColumns, (item) => {
                model.fields[item.field] = {
                    type: item.type
                }
            });
            console.log('Build Schema: ', model);
            return model;
        }
    };

    factory.suachuas.helpers = {
        initDefaultDataSource: function() {
            let source = {
                aggregate: undefined,
                batch: false,
                filter: undefined,
                group: [],
                offlineStorage: null,
                page: 1,
                pageSize: 10,
                select: null,
                serverAggregates: false,
                serverFiltering: false,
                serverGrouping: false,
                serverPaging: false,
                serverSorting: false,
                sort: undefined,
                table: null,
                serverPaging: false,
                serverSorting: false,

                schema: this.buildGridSchemaModel(factory.suachuas.data.config.defaultColumns),
                data: []
            };
            return source;
        },
        initDefaultOptions: function() {
            let options = angular.copy(factory.suachuas.data.config.defaultOptions);
            options.columns = angular.copy(this.buildGridColumns(factory.suachuas.data.config.defaultColumns));
            
            return options;
        },
        buildGridColumns: function(columns) {
            return _.without(_.map(factory.suachuas.data.config.availableColumns, (item) => {
                if (_.contains(columns, item.field)) {
                    // return _.omit(item, 'type');
                    return item;
                }
            }), undefined);
        },
        buildGridSchemaModel: function(columns) {
            let model = {
                id: "_id",
                fields: {}
            };
            _.each(factory.suachuas.data.config.availableColumns, (item) => {
                if (_.contains(columns, item.field)) {
                    model.fields[item.field] = {
                        type: item.type
                    }
                }
            });
            console.log('Build Schema: ', model);
            return model;
        }
    };
    

    return factory;

});
