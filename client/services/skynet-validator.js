angular.module('angular-skynet').factory('skynetValidator', function($meteor, $rootScope) {
    var factory = {

        // ***************************************************
        // THIETBIs
        // ***************************************************

        validateThietBiForm: function(thietbi) {
            let error = {};
            if (!thietbi.ma_tb.ma_tb) {
                error.message = "Chưa có thông tin về mã thiết bị.";
                return error;
            }
            if (!thietbi.phan_loai.nhom.keyId) {
                error.message = "Chưa có thông tin về nhóm thiết bị.";
                return error;
            }
            if (!thietbi.phan_loai.chung_loai.keyId) {
                error.message = "Chưa có thông tin về chủng loại thiết bị.";
                return error;
            }
            if (!thietbi.phan_loai.loai.keyId) {
                error.message = "Chưa có thông tin về loại thiết bị.";
                return error;
            }
            if (!thietbi.don_vi_so_huu.keyId) {
                error.message = "Chưa có thông tin về đơn vị sở hữu.";
                return error;
            }
            if (!thietbi.don_vi_quan_ly.keyId) {
                error.message = "Chưa có thông tin về đơn vị quản lý.";
                return error;
            }            
            if (!thietbi.dia_ban_hoat_dong.keyId) {
                error.message = "Chưa có thông tin về địa bàn hoạt động.";
                return error;
            }
            if (!thietbi.ho_so_tb.thong_tin_chung.hang_san_xuat.keyId) {
                error.message = "Chưa có thông tin về tên hãng sản xuất.";
                return error;
            }
            
            return;
        },

        // ***************************************************
        // THONGSOKYTHUATs
        // ***************************************************

        validateThongSoKyThuatForm: function(thongsokythuat) {
            let error = {};
            if (!thongsokythuat.thiet_bi.keyId) {
                error.message = "Chưa có thông tin về ID thiết bị.";
                return error;
            }
            if (!thongsokythuat.thiet_bi.ma_tb.ma_tb) {
                error.message = "Chưa có thông tin về mã thiết bị.";
                return error;
            }
            if (!thongsokythuat.thiet_bi.phan_loai.nhom.keyId) {
                error.message = "Chưa có thông tin về nhóm thiết bị.";
                return error;
            }
            if (!thongsokythuat.thiet_bi.phan_loai.chung_loai.keyId) {
                error.message = "Chưa có thông tin về chủng loại thiết bị.";
                return error;
            }
            if (!thongsokythuat.thiet_bi.phan_loai.loai.keyId) {
                error.message = "Chưa có thông tin về loại thiết bị.";
                return error;
            }
            if (!thongsokythuat.thiet_bi.ho_so) {
                error.message = "Chưa có thông tin về hồ sơ thiết bị.";
                return error;
            }
            if (!thongsokythuat.nhom_thong_so) {
                error.message = "Chưa chọn nhóm thông số kỹ thuật của thiết bị.";
                return error;
            }
            if (!thongsokythuat.ten) {
                error.message = "Chưa có thông tin về tên thông số kỹ thuật.";
                return error;
            }
            if (!thongsokythuat.gia_tri && !thongsokythuat.gia_tri_text) {
                error.message = "Chưa có thông tin về giá trị của thông số.";
                return error;
            }
            return;
        },

        // ***************************************************
        // HELPERS - CAUHOIS
        // ***************************************************

        validateCauHoiForm: function(cauhoi) {
            let error = {};
            if (!cauhoi.lop.ten) {
                error.message = "Chưa có thông tin về lớp câu hỏi.";
                return error;
            }
            if (!cauhoi.phan_lop.ten) {
                error.message = "Chưa có thông tin về phân lớp câu hỏi.";
                return error;
            }
            if (!cauhoi.phan_loai.kieu_cau_hoi.ten) {
                error.message = "Chưa có thông tin về kiểu câu hỏi.";
                return error;
            }
            if (!cauhoi.phan_loai.nhom_cau_hoi.ma) {
                error.message = "Chưa có thông tin về nhóm câu hỏi.";
                return error;
            } 
            if (!cauhoi.phan_loai.nhom_tb.ma) {
                error.message = "Chưa có thông tin về nhóm thiết bị.";
                return error;
            }
            if (!cauhoi.phan_loai.loai_tb || !cauhoi.phan_loai.loai_tb.length) {
                error.message = "Chưa có thông tin về loại thiết bị.";
                return error;
            }
            if (!cauhoi.noi_dung.tieu_de) {
                error.message = "Chưa có thông tin về tiêu đề câu hỏi.";
                return error;
            }
            if (!cauhoi.noi_dung.lua_chons.length) {
                error.message = "Chưa có các lựa chọn đối với câu hỏi trắc nghiệm.";
                return error;
            }
            
            // Kiểm tra liệu có ít nhất một đáp án đúng
            let luachons_without_null = _.filter(cauhoi.noi_dung.lua_chons, (item) => {
                return item.tieu_de;
            });
            if (!(_.findWhere(luachons_without_null, {isCorrect: true}))) {
                error.message = "Câu hỏi của bạn cần ít nhất một đáp án đúng.";
                return error;
            }

            return;
        },

        // ***************************************************
        // HELPERS - DATAHELPERS
        // ***************************************************

        validateDataHelperForm: function(datahelper) {
            let error = {};
            if (!datahelper.subject) {
                error.message = "Chưa có thông tin về trường Subject.";
                return error;
            }
            if (!datahelper.category) {
                error.message = "Chưa có thông tin về trường Category.";
                return error;
            }
            if (!datahelper.container.ref) {
                error.message = "Chưa có thông tin về trường Container-ref.";
                return error;
            }
            if (!datahelper.container.text && !datahelper.container.value && !datahelper.container.order) {
                error.message = "Cần có thông tin ít nhất một trong các trường: Container-(text/value/order).";
                return error;
            }
            
            return;
        },


        // ***************************************************
        // HELPERS - SUACHUAS
        // ***************************************************

        validateSuaChuaForm: function(suachua) {
            let error = {};
            if (!suachua.phan_loai.nhom_tb.ten) {
                error.message = "Chưa có thông tin về phân nhóm phương tiện.";
                return error;
            }
            if (!suachua.phan_loai.loai_tb.ten) {
                error.message = "Chưa có thông tin về phân loại phương tiện.";
                return error;
            }
            if (!suachua.ma_tb.ma_tb) {
                error.message = "Chưa có thông tin về mã phương tiện.";
                return error;
            } 
            if (!suachua.phan_loai.loai_sua_chua.ten) {
                error.message = "Chưa có thông tin về phân loại sửa chữa.";
                return error;
            }            
            if (!suachua.dia_diem.dia_diem) {
                error.message = "Chưa có thông tin về địa điểm sửa chữa.";
                return error;
            }
            if (!suachua.dia_diem.khu_vuc.ma) {
                error.message = "Chưa có thông tin về khu vực sửa chữa.";
                return error;
            }
            if (!suachua.dia_diem.vi_tri) {
                error.message = "Chưa có thông tin về vị trí sửa chữa.";
                return error;
            }
            if (!suachua.noi_dung.noi_dung) {
                error.message = "Chưa có thông tin về nội dung sửa chữa.";
                return error;
            }
            if (!suachua.thoi_gian.bat_dau) {
                error.message = "Chưa có thông tin về thời gian bắt đầu sửa chữa.";
                return error;
            }
            if (!suachua.thoi_gian.sua_chua_du_kien) {
                error.message = "Chưa có thông tin về thời gian kết thúc theo dự kiến.";
                return error;
            }
            if (!suachua.trang_thai.ma) {
                error.message = "Chưa có thông tin trạng thái sửa chữa.";
                return error;
            }
            return;
        },


        // ***************************************************
        // HELPERS - NHANSUS
        // ***************************************************

        validateNhanSuForm: function(nhansu) {
            let error = {};
            if (!nhansu.ma_nv) {
                error.message = "Chưa có thông tin về mã nhân viên.";
                return error;
            }
            if (!nhansu.tieu_su.ho_ten_dem) {
                error.message = "Chưa có thông tin về họ tên đệm của nhân viên.";
                return error;
            }
            if (!nhansu.tieu_su.ten) {
                error.message = "Chưa có thông tin về tên nhân viên.";
                return error;
            }
            if (!nhansu.tieu_su.gioi_tinh) {
                error.message = "Chưa có thông tin về giới tính.";
                return error;
            }
            if (!nhansu.tieu_su.quoc_tich) {
                error.message = "Chưa có thông tin về quốc tịch.";
                return error;
            }
            if (!nhansu.don_vi.ma) {
                error.message = "Chưa có thông tin về đơn vị quản lý.";
                return error;
            }
            if (!nhansu.cong_viec.trang_thai) {
                error.message = "Chưa có thông tin về trạng thái công việc hiện tại.";
                return error;
            }
            return;
        },

        // ***************************************************
        // USER RIGHTS
        // ***************************************************

        validateUser: (condition) => {
            let error = {};
            if (Meteor.userId()) {
                switch (condition) {
                    case 'can_update_admin_users':
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'super-manager'], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_delete_admin_users':
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin'], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_upsert_datahelpers':
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin'], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_delete_datahelpers':
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin'], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_upsert_nhom':
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'super-manager'], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_delete_nhom':
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin'], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_upsert_chung_loai':
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'super-manager'], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_delete_chung_loai':
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin'], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_upsert_loai':
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'super-manager'], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_delete_loai':
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin'], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_upsert_quoc_gia':
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'super-manager'], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_delete_quoc_gia':
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'super-manager'], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_upsert_phan_loai':
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'super-manager'], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_delete_phan_loai':
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin'], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_upsert_loai_thong_so_ky_thuat':
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'super-manager'], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_delete_loai_thong_so_ky_thuat':
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'super-manager'], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_upsert_hang_san_xuat':
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'super-manager'], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_delete_hang_san_xuat':
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'super-manager'], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_upsert_model_thiet_bi':
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'super-manager'], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_delete_model_thiet_bi':
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'super-manager'], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_upsert_don_vi':
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'super-manager'], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_delete_don_vi':
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'super-manager'], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_upsert_dia_ban':
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'super-manager'], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_delete_dia_ban':
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'super-manager'], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_upsert_thiet_bi':
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'super-manager'], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_delete_thiet_bi':
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'super-manager'], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_upsert_thong_so_ky_thuat':
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'super-manager'], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_delete_thong_so_ky_thuat':
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'super-manager'], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_view_cau_hoi':
                        if (!Roles.userIsInRole(Meteor.userId(), ["admin", "super-manager", "quanly-cauhois", "xem-cauhois"], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_upsert_cau_hoi':
                        if (!Roles.userIsInRole(Meteor.userId(), ["admin", "super-manager", "quanly-cauhois"], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_delete_cau_hoi':
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'super-manager', 'quanly-cauhois'], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_view_sua_chua':
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'super-manager', 'quanly-suachuas', 'xem-suachuas'], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_upsert_sua_chua':
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'super-manager', 'quanly-suachuas', 'support-suachuas'], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_delete_sua_chua':
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'super-manager', 'quanly-suachuas'], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_upsert_nhan_su':
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'support-staff'], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_delete_nhan_su':
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'support-staff'], 'sky-project') || !Roles.userIsInRole(Meteor.userId(), ['support-staff'], 'xncg'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_upsert_lich_sua_chua':
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'super-manager', 'manager-xemay', 'manager-tbn', 'manager-tau', 'manager'], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_delete_lich_sua_chua':
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'super-manager', 'manager-xemay', 'manager-tbn', 'manager-tau', 'manager'], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_upsert_ho_so_luu_tru':
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'super-manager', 'manager-xemay', 'manager-tbn', 'manager-tau', 'manager'], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_delete_ho_so_luu_tru':
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'super-manager', 'manager-xemay', 'manager-tbn', 'manager-tau', 'manager'], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_upsert_uigrid_state':
                        if (!Meteor.user())
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_delete_uigrid_state':
                        if (!Meteor.user())
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_update_role':
                        if (!Roles.userIsInRole(Meteor.userId(), ['manage-users', 'support-staff'], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_force_reset_password':
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin'], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    case 'can_delete_user':
                        if (!Roles.userIsInRole(Meteor.userId(), ['manage-users', 'support-staff'], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                        break;
                    default:
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin'], 'sky-project'))
                            error.message = 'Bạn không đủ quyền hạn để thực hiện chức năng này.';
                }
            } else
                error.message = 'Bạn cần đăng nhập để thực hiện chức năng này.';

            return error;
        }

    };

    return factory;

});
