Schemas = {};


// ***************************************************
// SKYDICTIONARY
// ***************************************************

Schemas.DataHelperSchema = new SimpleSchema({
    subject: {
        // Các giá trị cho phép: cauhois, suachuas, ...
        type: String,
    },
    category: {
        // Các giá trị cho phép: nhom_tbs, loai_tbs, tags, bac_this, ...
        type: String, 
    },
    container: {
        type: Object
    },
        'container.ref': {
            // Về lĩnh vực tra cứu để thu hẹp phạm vi truy vấn, ví dụ: thiet_bi_nang, xe_may,...
            type: String,
            optional: true
        },
        'container.group': {
            // Nhóm dữ liệu (nếu có)
            type: String,
            optional: true
        },
        'container.order': {
            // Thứ tự ưu tiên (nếu có)
            type: Number,
            optional: true
        },
        'container.text': {
            // Giá trị hiển thị (bắt buộc)
            type: String
        },
        'container.value': {
            // Mã giá trị (tùy chọn)
            type: Number,
            optional: true
        },
    isPublic: {
        type: Boolean,
        defaultValue: true
    },
    isArchived: {
        type: Boolean,
        defaultValue: false
    },
    metadata: {
        // Các giá trị khóa khuyên dùng: ngay_tao, ngay_cap_nhat_cuoi, nguoi_tao, nguoi_tao_name, nguoi_tao_email,
        // nguoi_tao_field, nguoi_cap_nhat_cuoi, nguoi_cap_nhat_cuoi_name, nguoi_cap_nhat_cuoi_email, nguoi_cap_nhat_cuoi_field
        // và search_field
        type: Object,
        blackbox: true
    }
});

DataHelpers.attachSchema(Schemas.DataHelperSchema);

// ***************************************************
// NOTIFIES
// ***************************************************

Schemas.NotifySchema = new SimpleSchema({
    section: {        
        // Các giá trị cho phép: suachuas, cauhois, ...
        type: String
    },
    category: {
        // Các giá trị cho phép: xuongdvkt-dashboard, ...
        type: String
    },
    
    subject: {
        // Các giá trị cho phép: hero-content, ...
        type: String
    },
    content: {
        type: Object
    },
        'content.text': {
            type: String,
            optional: true
        },
        'content.mode': {
            type: String
        }
});

Notifies.attachSchema(Schemas.NotifySchema);

// ***************************************************
// SKYLOGS
// ***************************************************

Schemas.SkyLogSchema = new SimpleSchema({
    subject: {
        // Các giá trị cho phép: cauhois, suachuas, thietbis, ...
        type: String
    },
    category: {
        // Các giá trị cho phép. VD với subject cauhois -> ky_thuat / an_toan / ...
        type: String
    },
    section: {
        // Các giá trị cho phép. VD với section ky_thuat -> Thiết bị nâng / Xe - máy / ...
        type: String
    },
    action: {
        // Các giá trị chp phép: Tạo mới, Cập nhật, Gỡ bỏ, Xóa vĩnh viễn
        type: String
    },
    user: {
        type: Object
    },
        'user.userId': {
            type: String
        },
        'user.userName': {
            type: String,
            optional: true
        },
        'user.userEmail': {
            type: String
        },
    target: {
        type: Object,
        optional: true
    },
        'target.keyId': {
            type: String,
            optional: true
        },
        'target.field': {
            type: String,
            optional: true
        },
        'target.desc': {
            type: String,
            optional: true
        },
        'target.ref': {
            type: String,
            optional: true
        },
        'target.from': {
            type: String,
            optional: true
        },
        'target.to': {
            type: String,
            optional: true
        },
    when: {
        type: Object
    },
        'when.time': {
            type: Date,
            defaultValue: new Date()
        },
        'when.time_day_str': {
            // Giá trị String của thời gian. VD. 2015-03-01
            type: String,
            optional: true
        },
        'when.time_month_str': {
            // Giá trị String của tháng. VD. 2015-03
            type: String,
            optional: true
        },
        'when.time_year_str': {
            // Giá trị String của năm. VD. 2015
            type: String,
            optional: true
        }
});

SkyLogs.attachSchema(Schemas.SkyLogSchema);

//==================================
// USERS Collection

Schemas.UserProfile = new SimpleSchema({
    name: {
        type: String,
        optional: true
    },
    firstName: {
        type: String,
        optional: true
    },
    lastName: {
        type: String,
        optional: true
    },
    phone: {
        type: String,
        optional: true
    },
    email_work: {
        type: String,
        optional: true
    },
    avatar: {
        type: Object,
        optional: true,
        blackbox: true
    },
        // 'avatar.keyId': {
        //     type: String,
        //     optional: true
        // },
        // 'avatar.url': {
        //     type: String,
        //     optional: true
        // },
    birthday: {
        type: Date,
        optional: true
    },
    gender: {
        type: String,
        optional: true
    },
    department: {
        type: String,
        optional: true
    },
    organization: {
        type: String,
        optional: true
    },
    website: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        optional: true
    },
    bio: {
        type: String,
        optional: true
    },
    search_field: {
        type: String,
        optional: true
    }
});

Schemas.User = new SimpleSchema({
    username: {
        type: String,
        // regEx: /^[a-z0-9A-Z_]{3,15}$/,
        optional: true
    },
    emails: {
        type: [Object],
        // this must be optional if you also use other login services like facebook,
        // but if you use only accounts-password, then it can be required
        optional: true
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: Schemas.UserProfile,
        optional: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // Add `roles` to your schema if you use the meteor-roles package.
    // Option 1: Object type
    // If you specify that type as Object, you must also specify the
    // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
    // Example:
    // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
    // You can't mix and match adding with and without a group since
    // you will fail validation in some cases.
    roles: {
        type: Object,
        optional: true,
        blackbox: true
    },
    status: {
        type: Object,
        optional: true,
        blackbox: true
    }
});

Meteor.users.attachSchema(Schemas.User);



//==================================
// PARTIES Collection

Schemas.PartySchema = new SimpleSchema({
    name: {
        type: String,
        label: "Tên"
    },
    description: {
        type: String,
        label: "Mô tả"

    },
    owner: {
        type: String,
        label: "Người tạo"
    }
});

Parties.attachSchema(Schemas.PartySchema);

//==================================
// PHANLOAIS Collection


Schemas.LoaiSchema = new SimpleSchema({
    ten: {
        type: String,
        label: "Tên Loại"
    },
    ma: {
        type: String,
        label: "Mã Loại"
    },
    nhom: {
        type: Object,
        label: "Nhóm"
    },
    'nhom.keyId': {
        type: String,
        label: "KeyID Nhóm"
    },
    'nhom.ten': {
        type: String,
        label: "Tên Nhóm"
    },
    'nhom.ma': {
        type: String,
        optional: true,
        label: "Mã Nhóm"
    },
    'nhom.icon': {
        type: String,
        optional: true,
        label: "Icon"
    },
    chung_loai: {
        type: Object,
        label: "Chủng Loại"
    },
    'chung_loai.keyId': {
        type: String,
        label: "KeyID Chủng Loại"
    },
    'chung_loai.ten': {
        type: String,
        label: "Tên Chủng Loại"
    },
    'chung_loai.ma': {
        type: String,
        optional: true,
        label: "Mã Chủng Loại"
    },
    'chung_loai.icon': {
        type: String,
        optional: true,
        label: "Icon"
    },
    mo_ta: {
        type: String,
        optional: true,
        label: "Mô tả"
    },
    ghi_chu: {
        type: String,
        optional: true,
        label: "Ghi chú"
    },
    icon: {
        type: String,
        label: "Icon",
        optional: true
    },
    order: {
        type: Number,
        optional: true,
        defaultValue: 1000
    },
    metadata: {
        type: Object,
        label: "Metadata"
    },
    'metadata.ngay_tao': {
        type: Date,
        label: "Ngày tạo"
    },
    'metadata.ngay_cap_nhat_cuoi': {
        type: Date,
        label: "Ngày cập nhật cuối",
        optional: true
    },
    'metadata.nguoi_tao': {
        type: String
    },
    'metadata.nguoi_tao_name': {
        type: String,
        optional: true
    },
    'metadata.nguoi_tao_email': {
        type: String,
        optional: true
    },
    'metadata.nguoi_tao_field': {
        type: String,
        optional: true
    },
    'metadata.nguoi_cap_nhat_cuoi': {
        type: String,
        label: "Người cập nhật cuối",
        optional: true
    },
    'metadata.nguoi_cap_nhat_cuoi_name': {
        type: String,
        optional: true
    },
    'metadata.nguoi_cap_nhat_cuoi_email': {
        type: String,
        optional: true
    },
    'metadata.nguoi_cap_nhat_cuoi_field': {
        type: String,
        optional: true
    },
    'metadata.search_field': {
        type: String,
        optional: true
    },
    isPublic: {
        type: Boolean,
        label: "Công khai",
        defaultValue: false
    },
    isArchived: {
        type: Boolean,
        label: "isArchived",
        defaultValue: false
    }
});

Loais.attachSchema(Schemas.LoaiSchema);

Schemas.ChungLoaiSchema = new SimpleSchema({
    ten: {
        type: String,
        label: "Tên Chủng Loại"
    },
    ma: {
        type: String,
        label: "Mã Chủng Loại"
    },
    nhom: {
        type: Object,
        label: "Nhóm"
    },
    'nhom.keyId': {
        type: String,
        label: "Nhóm keyID"
    },
    'nhom.ten': {
        type: String,
        label: "Tên Nhóm"
    },
    'nhom.ma': {
        type: String,
        optional: true,
        label: "Mã Nhóm"
    },
    'nhom.icon': {
        type: String,
        optional: true,
        label: "Icon"
    },
    mo_ta: {
        type: String,
        optional: true,
        label: "Mô tả"
    },
    ghi_chu: {
        type: String,
        optional: true,
        label: "Ghi chú"
    },
    icon: {
        type: String,
        label: "Icon",
        optional: true
    },
    order: {
        type: Number,
        optional: true,
        defaultValue: 1000
    },
    metadata: {
        type: Object,
        label: "Metadata"
    },
    'metadata.ngay_tao': {
        type: Date,
        label: "Ngày tạo"
    },
    'metadata.ngay_cap_nhat_cuoi': {
        type: Date,
        label: "Ngày cập nhật cuối",
        optional: true
    },
    'metadata.nguoi_tao': {
        type: String,
        label: "Người tạo"
    },
    'metadata.nguoi_tao_name': {
        type: String,
        optional: true
    },
    'metadata.nguoi_tao_email': {
        type: String,
        optional: true
    },
    'metadata.nguoi_tao_field': {
        type: String,
        optional: true
    },
    'metadata.nguoi_cap_nhat_cuoi': {
        type: String,
        label: "Người cập nhật cuối",
        optional: true
    },
    'metadata.nguoi_cap_nhat_cuoi_name': {
        type: String,
        optional: true
    },
    'metadata.nguoi_cap_nhat_cuoi_email': {
        type: String,
        optional: true
    },
    'metadata.nguoi_cap_nhat_cuoi_field': {
        type: String,
        optional: true
    },
    'metadata.search_field': {
        type: String,
        optional: true
    },
    isPublic: {
        type: Boolean,
        label: "Công khai",
        defaultValue: false
    },
    isArchived: {
        type: Boolean,
        label: "isArchived",
        defaultValue: false
    }
});

ChungLoais.attachSchema(Schemas.ChungLoaiSchema);

Schemas.NhomSchema = new SimpleSchema({
    ten: {
        type: String,
        label: "Tên Nhóm"
    },
    ma: {
        type: String,
        label: "Mã Nhóm"
    },
    mo_ta: {
        type: String,
        optional: true,
        label: "Mô tả"
    },
    ghi_chu: {
        type: String,
        optional: true,
        label: "Ghi chú"
    },
    icon: {
        type: String,
        label: "Icon",
        optional: true
    },
    order: {
        type: Number,
        optional: true,
        defaultValue: 1000
    },
    metadata: {
        type: Object,
        label: "Metadata"
    },
    'metadata.ngay_tao': {
        type: Date,
        label: "Ngày tạo"
    },
    'metadata.ngay_cap_nhat_cuoi': {
        type: Date,
        label: "Ngày cập nhật cuối",
        optional: true
    },
    'metadata.nguoi_tao': {
        type: String,
        label: "Người tạo"
    },
    'metadata.nguoi_tao_name': {
        type: String,
        optional: true
    },
    'metadata.nguoi_tao_email': {
        type: String,
        optional: true
    },
    'metadata.nguoi_tao_field': {
        type: String,
        optional: true
    },
    'metadata.nguoi_cap_nhat_cuoi': {
        type: String,
        label: "Người cập nhật cuối",
        optional: true
    },
    'metadata.nguoi_cap_nhat_cuoi_name': {
        type: String,
        optional: true
    },
    'metadata.nguoi_cap_nhat_cuoi_email': {
        type: String,
        optional: true
    },
    'metadata.nguoi_cap_nhat_cuoi_field': {
        type: String,
        optional: true
    },
    'metadata.search_field': {
        type: String,
        optional: true
    },
    isPublic: {
        type: Boolean,
        label: "Công khai",
        defaultValue: false
    },
    isArchived: {
        type: Boolean,
        label: "isArchived",
        defaultValue: false
    }
});

Nhoms.attachSchema(Schemas.NhomSchema);


//==================================
// DONVIS Collection


Schemas.DonViSchema = new SimpleSchema({
    ten: {
        type: String,
        label: "Tên Đơn Vị"
    },
    ma: {
        type: String,
        label: "Mã Đơn Vị"
    },
    ten_viet_tat: {
        type: String,
        label: "Tên Viết Tắt",
        optional: true
    },
    ten_quoc_te: {
        type: String,
        label: "Tên Quốc Tế",
        optional: true
    },
    phan_loai: {
        type: String,
        optional: true,
        allowedValues: ['tct', 'cty_thanh_vien', 'cty_ve_tinh', 'khac'],
        label: "Phân Loại"
    },
    mo_ta: {
        type: String,
        optional: true,
        label: "Mô tả"
    },
    ghi_chu: {
        type: String,
        optional: true,
        label: "Ghi chú"
    },
    icon: {
        type: String,
        label: "Icon",
        optional: true
    },
    metadata: {
        type: Object,
        label: "Metadata"
    },
    'metadata.ngay_tao': {
        type: Date,
        label: "Ngày tạo"
    },
    'metadata.ngay_cap_nhat_cuoi': {
        type: Date,
        label: "Ngày cập nhật cuối",
        optional: true
    },
    'metadata.nguoi_tao': {
        type: String,
        label: "Người tạo"
    },
    'metadata.nguoi_tao_name': {
        type: String,
        optional: true
    },
    'metadata.nguoi_tao_email': {
        type: String,
        optional: true
    },
    'metadata.nguoi_tao_field': {
        type: String,
        optional: true
    },
    'metadata.nguoi_cap_nhat_cuoi': {
        type: String,
        label: "Người cập nhật cuối",
        optional: true
    },
    'metadata.nguoi_cap_nhat_cuoi_name': {
        type: String,
        optional: true
    },
    'metadata.nguoi_cap_nhat_cuoi_email': {
        type: String,
        optional: true
    },
    'metadata.nguoi_cap_nhat_cuoi_field': {
        type: String,
        optional: true
    },
    'metadata.search_field': {
        type: String,
        optional: true
    },
    isPublic: {
        type: Boolean,
        label: "Công khai",
        defaultValue: false
    },
    isArchived: {
        type: Boolean,
        label: "Công khai",
        defaultValue: false
    }
});

DonVis.attachSchema(Schemas.DonViSchema);

//==================================
// DIABANS Collection

Schemas.GeoCodeSchema = new SimpleSchema({
    ten: {
        type: String,
        label: "name",
        optional: true
    },
    geo_name: {
        type: String,
        label: "Geo Code - Name",
        optional: true
    },
    geo_latitude: {
        type: Number,
        label: "Geo Code - Latitude",
        decimal: true,
        optional: true
    },
    geo_longitude: {
        type: Number,
        label: "Geo Code - Longitude",
        decimal: true,
        optional: true
    }    
});

Schemas.DiaBanSchema = new SimpleSchema({
    ten: {
        type: String,
        label: "Tên Địa Bàn",
        optional: true
    },
    ma: {
        type: String,
        label: "Mã Địa Bàn",
        optional: true
    },
    map_data: {
        type: Object,
        optional: true
    },
        'map_data.location': {
            type: Schemas.GeoCodeSchema,
            label: "Location",
            optional: true
        },
        'map_data.subdepartment': {
            type: Schemas.GeoCodeSchema,
            label: "Sub-Department",
            optional: true
        },
        'map_data.department': {
            type: Schemas.GeoCodeSchema,
            label: "Department",
            optional: true
        },
    mien: {
        type: String,
        allowedValues: ['Bắc', 'Trung', 'Nam'],
        label: "Miền"
    },
    mo_ta: {
        type: String,
        optional: true,
        label: "Mô tả"
    },
    ghi_chu: {
        type: String,
        optional: true,
        label: "Ghi chú"
    },
    icon: {
        type: String,
        label: "Icon",
        optional: true
    },
    metadata: {
        type: Object,
        label: "Metadata"
    },
    'metadata.ngay_tao': {
        type: Date,
        label: "Ngày tạo"
    },
    'metadata.ngay_cap_nhat_cuoi': {
        type: Date,
        label: "Ngày cập nhật cuối",
        optional: true
    },
    'metadata.nguoi_tao': {
        type: String,
        label: "Người tạo"
    },
    'metadata.nguoi_tao_name': {
        type: String,
        optional: true
    },
    'metadata.nguoi_tao_email': {
        type: String,
        optional: true
    },
    'metadata.nguoi_tao_field': {
        type: String,
        optional: true
    },
    'metadata.nguoi_cap_nhat_cuoi': {
        type: String,
        label: "Người cập nhật cuối",
        optional: true
    },
    'metadata.nguoi_cap_nhat_cuoi_name': {
        type: String,
        optional: true
    },
    'metadata.nguoi_cap_nhat_cuoi_email': {
        type: String,
        optional: true
    },
    'metadata.nguoi_cap_nhat_cuoi_field': {
        type: String,
        optional: true
    },
    'metadata.search_field': {
        type: String,
        optional: true
    },
    isPublic: {
        type: Boolean,
        label: "Công khai",
        defaultValue: false
    },
    isArchived: {
        type: Boolean,
        label: "isArchived",
        defaultValue: false
    }
});

DiaBans.attachSchema(Schemas.DiaBanSchema);

//==================================
// QUOCGIAS Collection

Schemas.QuocGiaSchema = new SimpleSchema({
    ten: {
        type: String,
        label: "Tên Quốc Gia",
    },
    name: {
        type: String,
        label: "Tên Quốc Gia (Eng)",
    },
    ma: {
        type: String,
        label: "Mã Quốc Gia",
        optional: true
    },
    mo_ta: {
        type: String,
        label: "Mô tả",
        optional: true
    },
    ghi_chu: {
        type: String,
        label: "Ghi chú",
        optional: true
    },
    icon: {
        type: String,
        label: "Icon",
        optional: true
    },
    metadata: {
        type: Object,
        label: "Metadata"
    },
    'metadata.ngay_tao': {
        type: Date,
        label: "Ngày tạo"
    },
    'metadata.ngay_cap_nhat_cuoi': {
        type: Date,
        label: "Ngày cập nhật cuối",
        optional: true
    },
    'metadata.nguoi_tao': {
        type: String,
        label: "Người tạo"
    },
    'metadata.nguoi_tao_name': {
        type: String,
        optional: true
    },
    'metadata.nguoi_tao_email': {
        type: String,
        optional: true
    },
    'metadata.nguoi_tao_field': {
        type: String,
        optional: true
    },
    'metadata.nguoi_cap_nhat_cuoi': {
        type: String,
        label: "Người cập nhật cuối",
        optional: true
    },
    'metadata.nguoi_cap_nhat_cuoi_name': {
        type: String,
        optional: true
    },
    'metadata.nguoi_cap_nhat_cuoi_email': {
        type: String,
        optional: true
    },
    'metadata.nguoi_cap_nhat_cuoi_field': {
        type: String,
        optional: true
    },
    'metadata.search_field': {
        type: String,
        optional: true
    },
    isPublic: {
        type: Boolean,
        label: "Công khai",
        defaultValue: false
    },
    isArchived: {
        type: Boolean,
        label: "isArchived",
        defaultValue: false
    }
});

QuocGias.attachSchema(Schemas.QuocGiaSchema);

//==================================
// HANGSANXUATS Collection

Schemas.HangSanXuatSchema = new SimpleSchema({
    ten: {
        type: String,
        label: "Tên Hãng Sản Xuất",
    },
    ma: {
        type: String,
        label: "Mã Hãng Sản Xuất",
        optional: true
    },
    quoc_gia: {
        type: Object,
        label: "Mã Quốc Gia",
        optional: true
    },
    'quoc_gia.keyId': {
        type: String,
        label: "Tên Quốc Gia KeyID",
        optional: true
    },
    'quoc_gia.ten': {
        type: String,
        label: "Tên Quốc Gia",
        optional: true
    },
    'quoc_gia.name': {
        type: String,
        label: "Country Name",
        optional: true
    },
    'quoc_gia.ma': {
        type: String,
        label: "Mã Quốc Gia",
        optional: true
    },
    'quoc_gia.icon': {
        type: String,
        label: "Quốc Gia Icon",
        optional: true
    },
    mo_ta: {
        type: String,
        optional: true,
        label: "Mô tả"
    },
    ghi_chu: {
        type: String,
        optional: true,
        label: "Ghi chú"
    },
    icon: {
        type: String,
        label: "Icon",
        optional: true
    },
    metadata: {
        type: Object,
        label: "Metadata"
    },
    'metadata.ngay_tao': {
        type: Date,
        label: "Ngày tạo"
    },
    'metadata.ngay_cap_nhat_cuoi': {
        type: Date,
        label: "Ngày cập nhật cuối",
        optional: true
    },
    'metadata.nguoi_tao': {
        type: String,
        label: "Người tạo"
    },
    'metadata.nguoi_tao_name': {
        type: String,
        optional: true
    },
    'metadata.nguoi_tao_email': {
        type: String,
        optional: true
    },
    'metadata.nguoi_tao_field': {
        type: String,
        optional: true
    },
    'metadata.nguoi_cap_nhat_cuoi': {
        type: String,
        label: "Người cập nhật cuối",
        optional: true
    },
    'metadata.nguoi_cap_nhat_cuoi_name': {
        type: String,
        optional: true
    },
    'metadata.nguoi_cap_nhat_cuoi_email': {
        type: String,
        optional: true
    },
    'metadata.nguoi_cap_nhat_cuoi_field': {
        type: String,
        optional: true
    },
    'metadata.search_field': {
        type: String,
        optional: true
    },
    isPublic: {
        type: Boolean,
        label: "Công khai",
        defaultValue: false
    },
    isArchived: {
        type: Boolean,
        label: "isArchived",
        defaultValue: false
    }
});

HangSanXuats.attachSchema(Schemas.HangSanXuatSchema);

//==================================
// MODELTHIETBIS Collection

Schemas.ModelThietBiSchema = new SimpleSchema({
    ten: {
        type: String,
        label: "Model",
    },
    ma: {
        type: String,
        label: "Mã Model",
        optional: true
    },
    hang_san_xuat: {
        type: Object,
        label: "Hãng Sản Xuất",
        optional: true
    },
    "hang_san_xuat.keyId": {
        type: String,
        label: "ID",
        optional: true
    },
    "hang_san_xuat.ten": {
        type: String,
        label: "ID",
        optional: true
    },
    "hang_san_xuat.ma": {
        type: String,
        label: "ID",
        optional: true
    },
    "hang_san_xuat.icon": {
        type: String,
        label: "ID",
        optional: true
    },
    mo_ta: {
        type: String,
        optional: true,
        label: "Mô tả"
    },
    ghi_chu: {
        type: String,
        optional: true,
        label: "Ghi chú"
    },
    icon: {
        type: String,
        label: "Icon",
        optional: true
    },
    metadata: {
        type: Object,
        label: "Metadata"
    },
    'metadata.ngay_tao': {
        type: Date,
        label: "Ngày tạo"
    },
    'metadata.ngay_cap_nhat_cuoi': {
        type: Date,
        label: "Ngày cập nhật cuối",
        optional: true
    },
    'metadata.nguoi_tao': {
        type: String,
        label: "Người tạo"
    },
    'metadata.nguoi_tao_name': {
        type: String,
        optional: true
    },
    'metadata.nguoi_tao_email': {
        type: String,
        optional: true
    },
    'metadata.nguoi_tao_field': {
        type: String,
        optional: true
    },
    'metadata.nguoi_cap_nhat_cuoi': {
        type: String,
        label: "Người cập nhật cuối",
        optional: true
    },
    'metadata.nguoi_cap_nhat_cuoi_name': {
        type: String,
        optional: true
    },
    'metadata.nguoi_cap_nhat_cuoi_email': {
        type: String,
        optional: true
    },
    'metadata.nguoi_cap_nhat_cuoi_field': {
        type: String,
        optional: true
    },
    'metadata.search_field': {
        type: String,
        optional: true
    },
    isPublic: {
        type: Boolean,
        label: "Công khai",
        defaultValue: false
    },
    isArchived: {
        type: Boolean,
        label: "isArchived",
        defaultValue: false
    }
});

ModelThietBis.attachSchema(Schemas.ModelThietBiSchema);

//==================================
// LOAITHONGSOKYTHUATS Collection

Schemas.LoaiThongSoKyThuatSchema = new SimpleSchema({
    ten: {
        type: String,
        label: "Tên Thông Số",
    },
    ma: {
        type: String,
        label: "Mã Thông Số",
    },
    name: {
        type: String,
        label: "Tên tham chiếu",
        optional: true
    },
    don_vi: {
        type: String,
        label: "Đơn Vị Tính",
        optional: true
    },
    chung_loai: {
        type: Object,
        label: "Chủng Loại Thiết Bị",
    },
    'chung_loai.keyId': {
        type: String,
        label: "KeyID",
        optional: true
    },
    'chung_loai.ten': {
        type: String,
        label: "Tên Chủng Loại Thiết Bị",
        optional: true
    },
    'chung_loai.ma': {
        type: String,
        label: "Mã Chủng Loại Thiết Bị",
        optional: true
    },
    'chung_loai.icon': {
        type: String,
        label: "Icon Chủng Loại Thiết Bị",
        optional: true
    },
    mo_ta: {
        type: String,
        optional: true,
        label: "Mô tả"
    },
    ghi_chu: {
        type: String,
        optional: true,
        label: "Ghi chú"
    },
    icon: {
        type: String,
        label: "Icon",
        optional: true
    },
    metadata: {
        type: Object,
        label: "Metadata"
    },
    'metadata.ngay_tao': {
        type: Date,
        label: "Ngày tạo"
    },
    'metadata.ngay_cap_nhat_cuoi': {
        type: Date,
        label: "Ngày cập nhật cuối",
        optional: true
    },
    'metadata.nguoi_tao': {
        type: String,
        label: "Người tạo"
    },
    'metadata.nguoi_tao_name': {
        type: String,
        optional: true
    },
    'metadata.nguoi_tao_email': {
        type: String,
        optional: true
    },
    'metadata.nguoi_tao_field': {
        type: String,
        optional: true
    },
    'metadata.nguoi_cap_nhat_cuoi': {
        type: String,
        label: "Người cập nhật cuối",
        optional: true
    },
    'metadata.nguoi_cap_nhat_cuoi_name': {
        type: String,
        optional: true
    },
    'metadata.nguoi_cap_nhat_cuoi_email': {
        type: String,
        optional: true
    },
    'metadata.nguoi_cap_nhat_cuoi_field': {
        type: String,
        optional: true
    },
    'metadata.search_field': {
        type: String,
        optional: true
    },
    isPublic: {
        type: Boolean,
        label: "Công khai",
        defaultValue: false
    },
    isArchived: {
        type: Boolean,
        label: "isArchived",
        defaultValue: false
    }

});

LoaiThongSoKyThuats.attachSchema(Schemas.LoaiThongSoKyThuatSchema);

//==================================
// Schemas only: LYLICHTHIETBI

Schemas.LyLichThietBiSchema = new SimpleSchema({
    ten_dang_ky: {
        type: String,
        label: "Tên Đăng Ký",
        optional: true
    },
    ma_ho_so: {
        type: String,
        label: "Mã Hồ Sơ (Số Giấy ĐK)",
        optional: true
    },
    loai_ho_so: {
        type: String,
        label: "Loại Hồ Sơ",
        allowedValues: ['giay_dang_ky', 'giay_dang_kiem', 'giay_kiem_dinh', 'ly_lich_phuong_tien', 'bien_ban'],
        optional: true
    },
    thoi_diem_xac_nhan: {
        type: Date,
        label: "Thời Điểm Xác Nhận",
        optional: true
    },
    nam_xac_nhan: {
        type: Number,
        label: "Năm Xác Nhận",
        optional: true
    },
    ref_imgs: {
        type: [String],
        label: "Liên Kết Tới Hình Ảnh",
        optional: true
    },
    noi_dung: {
        type: String,
        label: "Nội dung",
        optional: true
    },
    mo_ta: {
        type: String,
        optional: true,
        label: "Mô tả"
    },
    ghi_chu: {
        type: String,
        optional: true,
        label: "Ghi chú"
    },
    icon: {
        type: String,
        label: "Icon",
        optional: true
    },
    isOutOfDate: {
        type: Boolean,
        label: "isOutOfDate",
        defaultValue: false,
        optional: true
    }
});

//==================================
// THONGSOKYTHUATS Collection

Schemas.ThongSoKyThuatSchema = new SimpleSchema({
    thiet_bi:{
        type: Object
    },
        'thiet_bi.keyId': {
            type: String
        },
        'thiet_bi.ma_tb': {
            type: Object
        },
            'thiet_bi.ma_tb.ma_tb': {
                type: String
            },
            'thiet_bi.ma_tb.ma_topx': {
                type: String,
                optional: true
            },
            'thiet_bi.ma_tb.ma_maximo': {
                type: String,
                optional: true
            },
            'thiet_bi.ma_tb.ma_topovn': {
                type: String,
                optional: true
            },
            'thiet_bi.ma_tb.ma_tb_field': {
                type: String,
                optional: true
            },
        'thiet_bi.phan_loai': {
            type: Object
        },
            'thiet_bi.phan_loai.nhom': {
                type: Object
            },
                'thiet_bi.phan_loai.nhom.keyId': {
                    type: String
                },
                'thiet_bi.phan_loai.nhom.ten': {
                    type: String
                },
                'thiet_bi.phan_loai.nhom.ma': {
                    type: String
                },
            'thiet_bi.phan_loai.chung_loai': {
                type: Object
            },
                'thiet_bi.phan_loai.chung_loai.keyId': {
                    type: String
                },
                'thiet_bi.phan_loai.chung_loai.ten': {
                    type: String
                },
                'thiet_bi.phan_loai.chung_loai.ma': {
                    type: String
                },
            'thiet_bi.phan_loai.loai': {
                type: Object
            },
                'thiet_bi.phan_loai.loai.keyId': {
                    type: String
                },
                'thiet_bi.phan_loai.loai.ten': {
                    type: String
                },
                'thiet_bi.phan_loai.loai.ma': {
                    type: String
                },
        'thiet_bi.ho_so': {
            type: Object,
            optional: true
        },
            'thiet_bi.ho_so.hang_san_xuat': {
                type: String,
                optional: true
            },
            'thiet_bi.ho_so.model_tb': {
                type: String,
                optional: true
            },
            'thiet_bi.ho_so.nam_sx': {
                type: String,
                optional: true
            },
            'thiet_bi.ho_so.nam_sd': {
                type: String,
                optional: true
            },
            'thiet_bi.ho_so.don_vi_quan_ly': {
                type: String,
                optional: true
            },
            'thiet_bi.ho_so.ma_don_vi_quan_ly': {
                type: String,
                optional: true
            },
            'thiet_bi.ho_so.don_vi_so_huu': {
                type: String,
                optional: true
            },
            'thiet_bi.ho_so.ma_don_vi_so_huu': {
                type: String,
                optional: true
            },
            'thiet_bi.ho_so.dia_ban_hoat_dong': {
                type: String,
                optional: true
            },
            'thiet_bi.ho_so.ma_dia_ban_hoat_dong': {
                type: String,
                optional: true
            },
            'thiet_bi.ho_so.thoi_gian_bao_hanh': {
                type: Number,
                optional: true
            },
            'thiet_bi.ho_so.ket_thuc_bao_hanh': {
                type: Date,
                optional: true
            },
    nhom_thong_so: {
        type: String,
        label: "Nhóm Thông Số"
    },
    ten:{
        type: String,
        label: "Tên Thông Số"  
    },
    don_vi: {
        type: String,
        optional: true
    },
    gia_tri: {
        type: Number,
        decimal: true,
        optional: true,
        label: "Giá trị"
    },
    gia_tri_text: {
        type: String,
        optional: true,
        label: "Giá trị*"
    },
    mo_ta: {
        type: String,
        optional: true,
        label: "Mô tả"
    },
    ghi_chu: {
        type: String,
        optional: true,
        label: "Ghi chú"
    },
    metadata: {
        type: Object,
        label: "Metadata"
    },
        'metadata.ngay_tao': {
            type: Date,
            label: "Ngày tạo"
        },
        'metadata.ngay_cap_nhat_cuoi': {
            type: Date,
            label: "Ngày cập nhật cuối",
            optional: true
        },
        'metadata.nguoi_tao': {
            type: String,
            label: "Người tạo"
        },
        'metadata.nguoi_tao_name': {
            type: String,
            optional: true
        },
        'metadata.nguoi_tao_email': {
            type: String,
            optional: true
        },
        'metadata.nguoi_tao_field': {
            type: String,
            optional: true
        },
        'metadata.nguoi_cap_nhat_cuoi': {
            type: String,
            label: "Người cập nhật cuối",
            optional: true
        },
        'metadata.nguoi_cap_nhat_cuoi_name': {
            type: String,
            optional: true
        },
        'metadata.nguoi_cap_nhat_cuoi_email': {
            type: String,
            optional: true
        },
        'metadata.nguoi_cap_nhat_cuoi_field': {
            type: String,
            optional: true
        },
        'metadata.search_field': {
            type: String,
            optional: true
        },
    isPublic: {
        type: Boolean,
        label: "Công khai",
        defaultValue: false
    }
});

ThongSoKyThuats.attachSchema(Schemas.ThongSoKyThuatSchema);

//==================================
// THIETBIS Collection

Schemas.MaThietBiSchema = new SimpleSchema({
    ma_tb: {
        type: String,
        label: "Mã Thiết Bị"
    },
    ma_topx: {
        type: String,
        label: "Mã TOPX",
        optional: true
    },
    ma_topovn: {
        type: String,
        label: "Mã TOPOVN",
        optional: true
    },
    ma_maximo: {
        type: String,
        label: "Mã Maximo",
        optional: true
    },
    ma_tb_field: {
        type: String,
        optional: true
    }
});

Schemas.PhanLoaiSchema = new SimpleSchema({
    nhom: {
        type: Object,
        label: "Nhóm",
    },
        'nhom.keyId': {
            type: String,
            label: "KeyID Nhóm",
        },
        'nhom.ten': {
            type: String,
            label: "Tên Nhóm",
            optional: true
        },
        'nhom.ma': {
            type: String,
            label: "Mã Nhóm",
            optional: true
        },
        'nhom.icon': {
            type: String,
            label: "Icon Nhóm",
            optional: true
        },
    chung_loai: {
        type: Object,
        label: "Chủng Loại",
    },
        'chung_loai.keyId': {
            type: String,
            label: "KeyID Chủng Loại",
        },
        'chung_loai.ten': {
            type: String,
            label: "Tên Chủng Loại",
            optional: true
        },
        'chung_loai.ma': {
            type: String,
            label: "Mã Chủng Loại",
            optional: true
        },
        'chung_loai.icon': {
            type: String,
            label: "Icon Chủng Loại",
            optional: true
        },
    loai: {
        type: Object,
        label: "Loại",
    },
        'loai.keyId': {
            type: String,
            label: "KeyID Loại",
        },
        'loai.ten': {
            type: String,
            label: "Tên Loại",
            optional: true
        },
        'loai.ma': {
            type: String,
            label: "Mã Loại",
            optional: true
        },
        'loai.icon': {
            type: String,
            label: "Icon Loại",
            optional: true
        },
    phan_loai_field: {
        type: String,
        optional: true
    }
});

Schemas.HoSoThietBi_ThongTinChungSchema = new SimpleSchema({
    nam_sx: {
        type: Number,
        optional: true,
        label: "Năm Sản Xuất"
    },
    nam_sd: {
        type: Number,
        optional: true,
        label: "Năm Sử Dụng"
    },
    ngay_ban_giao_tb: {
        type: Date,
        optional: true,
        label: "Ngày bàn giao thiết bị"
    },
    so_khung: {
        type: String,
        optional: true,
        label: "Số Khung"
    },
    so_dang_ky: {
        type: String,
        optional: true,
        label: "Số Đăng Ký"
    },
    so_dang_kiem: {
        type: String,
        optional: true,
        label: "Số Đăng Kiểm"
    },
    so_may: {
        type: String,
        optional: true,
        label: "Số Máy"
    },
    xuat_xu: {
        type: Object,
        optional: true,
        label: "Xuất Xứ"
    },
        'xuat_xu.keyId': {
            type: String,
            optional: true,
            label: "Xuất Xứ - KeyID"
        },
        'xuat_xu.ten': {
            type: String,
            optional: true,
            label: "Xuất Xứ - Tên Quốc Gia"
        },
        'xuat_xu.name': {
            type: String,
            optional: true,
            label: "Xuất Xứ - Country Name"
        },
        'xuat_xu.ma': {
            type: String,
            optional: true,
            label: "Xuất Xứ - Mã"
        },
        'xuat_xu.icon': {
            type: String,
            optional: true,
            label: "Xuất Xứ - Icon"
        },
    bao_hanh: {
        type: Object,
        optional: true,
        label: "Bảo hành"
    },
        'bao_hanh.ngay_ban_giao': {
            type: Date,
            optional: true
        },
        'bao_hanh.tinh_trang_ban_giao': {
            type: String,
            optional: true,
            // allowedValues: ['Mới', 'Đã qua SD']
        },
        'bao_hanh.isThongTinBaoHanh': {
            type: Boolean,
            defaultValue: false
        },
        'bao_hanh.thoi_gian_bao_hanh': {
            type: Number,
            optional: true
        },
        'bao_hanh.thoi_gian_bat_dau': {
            type: Date,
            optional: true
        },
        'bao_hanh.thoi_gian_ket_thuc': {
            type: Date,
            optional: true  
        },
    hang_san_xuat: {
        type: Object,
        label: "Hãng Sản Xứuất"
    },
        'hang_san_xuat.keyId': {
            type: String,
            label: "Hãng Sản Xuất - keyID"
        },
        'hang_san_xuat.ten': {
            type: String,
            optional: true,
            label: "Hãng Sản Xuất - Tên"
        },
        'hang_san_xuat.ma': {
            type: String,
            optional: true,
            label: "Hãng Sản Xuất - Mã"
        },
        'hang_san_xuat.icon': {
            type: String,
            optional: true,
            label: "Hãng Sản Xuất - Icon"
        },
        'hang_san_xuat.quoc_gia': {
            type: Object,
            optional: true,
            label: "Hãng Sản Xuất - Quốc Gia"
        },
        'hang_san_xuat.quoc_gia.keyId': {
            type: String,
            optional: true,
            label: "Hãng Sản Xuất - Quốc Gia - KeyID"
        },
        'hang_san_xuat.quoc_gia.ten': {
            type: String,
            optional: true,
            label: "Hãng Sản Xuất - Quốc Gia - Tên"
        },
        'hang_san_xuat.quoc_gia.name': {
            type: String,
            optional: true,
            label: "Hãng Sản Xuất - Quốc Gia - Country Name"
        },
        'hang_san_xuat.quoc_gia.ma': {
            type: String,
            optional: true,
            label: "Hãng Sản Xuất - Quốc Gia - Mã"
        },
        'hang_san_xuat.quoc_gia.icon': {
            type: String,
            optional: true,
            label: "Hãng Sản Xuất - Quốc Gia - Icon"
        },
    model_tb: {
        type: Object,
        optional: true,
        label: "Model Thiết Bị"
    },
        'model_tb.keyId': {
            type: String,
            optional: true,
            label: "Model Thiết Bị - KeyID"
        },
        'model_tb.ten': {
            type: String,
            optional: true,
            label: "Model Thiết Bị - Tên"
        },
        'model_tb.ma': {
            type: String,
            optional: true,
            label: "Model Thiết Bị - Mã"
        },
        'model_tb.icon': {
            type: String,
            optional: true,
            label: "Model Thiết Bị - Icon"
        },
    ghi_chu: {
        type: String,
        optional: true,
        label: "Ghi Chú"
    },
    mo_ta: {
        type: String,
        optional: true,
        label: "Mô Tả"
    },
    icon: {
        type: String,
        optional: true,
        label: "Icon"
    },
    ho_so_tb_field: {
        type: String,
        optional: true
    }
});

Schemas.RefImg = new SimpleSchema({
    filename: {
        type: String,
        optional: true,
        label: "Filename"
    },
    filename_original: {
        type: String,
        optional: true,
        label: "Filename Original"
    },
    filename_extension: {
        type: String,
        optional: true,
        label: "Filename Original"
    },
    file_path: {
        type: String,
        optional: true,
        label: "File Path",
    },
    file_url: {
        type: String,
        optional: true,
        label: "File URL"
    },
    file_caption: {
        type: String,
        optional: true,
        label: "File Caption"
    },
    file_description: {
        type: String,
        optional: true,
        label: "File Description"
    },
    file_metadata: {
        type: Object,
        optional: true,
        label: "File Metadata"
    },
    isLocal: {
        type: Boolean,
        defaultValue: false,
        optional: true
    }
});

Schemas.ThietBiSchema = new SimpleSchema({
    ma_tb: {
        type: Schemas.MaThietBiSchema,
        label: "Mã Thiết Bị"
    },
    phan_loai: {
        type: Schemas.PhanLoaiSchema,
        label: "Phân Loại",
        optional: true
    },
    ho_so_tb: {
        type: Object,
        label: "Hồ Sơ Thiết Bị",
    },
        'ho_so_tb.thong_tin_chung': {
            type: Schemas.HoSoThietBi_ThongTinChungSchema,
            label: "Hồ Sơ Thiết Bị - Thông Tin Chung",
        },
        'ho_so_tb.ly_lich_tb': {
            type: [Schemas.LyLichThietBiSchema],
            label: "Hồ Sơ Thiết Bị - Thông Tin Chung",
            optional: true
        },
        'ho_so_tb.ref_img': {
            type: [Schemas.RefImg],
            label: "Hồ Sơ Thiết Bị - Ref Img",
            optional: true
        },
        'ho_so_tb.ghi_chu': {
            type: String,
            label: "Hồ Sơ Thiết Bị - Ghi Chú",
            optional: true
        },
        'ho_so_tb.mo_ta': {
            type: String,
            label: "Hồ Sơ Thiết Bị - Mô Tả",
            optional: true
        },
        'ho_so_tb.icon': {
            type: String,
            label: "Hồ Sơ Thiết Bị - Icon",
            optional: true
        },
    dia_ban_hoat_dong: {
        type: Object,
        label: "Địa Bàn Hoạt Động",
    },
        'dia_ban_hoat_dong.keyId': {
            type: String,
            label: "Địa Bàn Hoạt Động - KeyID",
        },
        'dia_ban_hoat_dong.ten': {
            type: String,
            label: "Địa Bàn Hoạt Động - Tên",
            optional: true
        },
        'dia_ban_hoat_dong.ma': {
            type: String,
            label: "Địa Bàn Hoạt Động - Mã",
            optional: true
        },
        'dia_ban_hoat_dong.map_data': {
            type: Object,
            label: "Địa Bàn Hoạt Động - Map data",
            blackbox: true,
            optional: true
        },
        'dia_ban_hoat_dong.tinh_thanh': {
            type: Schemas.GeoCodeSchema,
            label: "Địa Bàn Hoạt Động - Tỉnh Thành",
            optional: true
        },
        'dia_ban_hoat_dong.mien': {
            type: String,
            label: "Vùng Miền",
            optional: true
        },
        'dia_ban_hoat_dong_field': {
            type: String,
            optional: true
        },
    don_vi_quan_ly: {
        type: Object,
        label: "Đơn Vị Quản Lý"
    },
        'don_vi_quan_ly.keyId': {
            type: String,
            label: "Đơn Vị Quản Lý - KeyID"
        },
        'don_vi_quan_ly.ten': {
            type: String,
            label: "Đơn Vị Quản Lý - Tên Đơn Vị",
            optional: true
        },
        'don_vi_quan_ly.ma': {
            type: String,
            label: "Đơn Vị Quản Lý - Mã Đơn Vị",
            optional: true
        },
        'don_vi_quan_ly.ten_viet_tat': {
            type: String,
            label: "Đơn Vị Quản Lý - Tên Viết Tắt",
            optional: true
        },
        'don_vi_quan_ly.ten_quoc_te': {
            type: String,
            label: "Đơn Vị Quản Lý - Tên Quốc Tế",
            optional: true
        },
        'don_vi_quan_ly.phan_loai': {
            type: String,
            optional: true,
            label: "Đơn Vị Quản Lý - Phân Loại"
        },
        'don_vi_quan_ly.icon': {
            type: String,
            label: "Đơn Vị Quản Lý - Icon",
            optional: true
        },
    don_vi_so_huu: {
        type: Object,
        label: "Đơn Vị Sở Hữu"
    },
        'don_vi_so_huu.keyId': {
            type: String,
            label: "Đơn Vị Sở Hữu - KeyID"
        },
        'don_vi_so_huu.ten': {
            type: String,
            label: "Đơn Vị Sở Hữu - Tên Đơn Vị",
            optional: true
        },
        'don_vi_so_huu.ma': {
            type: String,
            label: "Đơn Vị Sở Hữu - Mã Đơn Vị",
            optional: true
        },
        'don_vi_so_huu.ten_viet_tat': {
            type: String,
            label: "Đơn Vị Sở Hữu - Tên Viết Tắt",
            optional: true
        },
        'don_vi_so_huu.ten_quoc_te': {
            type: String,
            label: "Đơn Vị Sở Hữu - Tên Quốc Tế",
            optional: true
        },
        'don_vi_so_huu.phan_loai': {
            type: String,
            optional: true,
            label: "Đơn Vị Sở Hữu - Phân Loại"
        },
        'don_vi_so_huu.icon': {
            type: String,
            label: "Đơn Vị Sở Hữu - Icon",
            optional: true
        },
    don_vi_field: {
        type: String,
        optional: true
    },
    mo_ta: {
        type: String,
        optional: true,
        label: "Metadata - Mô tả"
    },
    ghi_chu: {
        type: String,
        optional: true,
        label: "Metadata - Ghi chú"
    },
    icon: {
        type: String,
        label: "Metadata - Icon",
        optional: true
    },
    metadata: {
        type: Object,
        optional: true,
        label: "Metadata"
    },
        'metadata.ngay_tao': {
            type: Date,
            label: "Ngày tạo"
        },
        'metadata.ngay_cap_nhat_cuoi': {
            type: Date,
            label: "Ngày cập nhật cuối",
            optional: true
        },
        'metadata.nguoi_tao': {
            type: String,
            label: "Người tạo"
        },
        'metadata.nguoi_tao_name': {
            type: String,
            optional: true
        },
        'metadata.nguoi_tao_email': {
            type: String,
            optional: true
        },
        'metadata.nguoi_tao_field': {
            type: String,
            optional: true
        },
        'metadata.nguoi_cap_nhat_cuoi': {
            type: String,
            label: "Người cập nhật cuối",
            optional: true
        },
        'metadata.nguoi_cap_nhat_cuoi_name': {
            type: String,
            optional: true
        },
        'metadata.nguoi_cap_nhat_cuoi_email': {
            type: String,
            optional: true
        },
        'metadata.nguoi_cap_nhat_cuoi_field': {
            type: String,
            optional: true
        },
        'metadata.search_field': {
            type: String,
            optional: true
        },
    isPublic: {
        type: Boolean,
        label: "Công khai",
        defaultValue: true
    },
    isArchived: {
        type: Boolean,
        label: "isArchived",
        defaultValue: false
    },
    // Các trạng thái của phương tiện: Hoạt động, Niêm cất và Thanh lý.
    status: {
        type: String,
        optional: false,
        allowedValues: ['Hoạt động', 'Sửa chữa', 'Bảo dưỡng', 'Niêm cất', 'Thanh lý'],
        defaultValue: 'Hoạt động'
    }
});

ThietBis.attachSchema(Schemas.ThietBiSchema);


//==================================
// CAUHOIs Collection

Schemas.CauHoiSchema = new SimpleSchema({
    // Tra cứu thông tin tại Dictionary
    lop: {
        type: Object
    },
        'lop.ten': {
            type: String
        },
        'lop.ma': {
            type: String
        },
    phan_lop: {
        type: Object
    },
        'phan_lop.ten': {
            type: String
        },
        'phan_lop.ma': {
            type: String
        },
    phan_loai: {
        type: Object
    },
        'phan_loai.kieu_cau_hoi': {
            type: Object
        },
            'phan_loai.kieu_cau_hoi.ten': {
                type: String
            },
            'phan_loai.kieu_cau_hoi.ma': {
                type: String
            },
        'phan_loai.nhom_tb': {
            type: Object
        },
            'phan_loai.nhom_tb.ten': {
                type: String
            },
            'phan_loai.nhom_tb.ma': {
                type: String
            },
        'phan_loai.loai_tb': {
            type: [String]
        },
        'phan_loai.nhom_cau_hoi': {
            type: Object
        },
            'phan_loai.nhom_cau_hoi.ten': {
                type: String
            },
            'phan_loai.nhom_cau_hoi.ma': {
                type: String
            },
            'phan_loai.nhom_cau_hoi.ten_ngan': {
                type: String
            },
            'phan_loai.nhom_cau_hoi.mo_ta': {
                type: String,
                optional: true
            },
        'phan_loai.muc_do': {
            type: Object,
            optional: true
        },
            'phan_loai.muc_do.ten': {
                type: String,
                optional: true
            },
            'phan_loai.muc_do.ma': {
                type: String,
                optional: true
            },
        'phan_loai.bac_thi': {
            type: [String],
            optional: true
        },          
    noi_dung: {
        type: Object
    },
        'noi_dung.tieu_de': {
            type: String,
        },
        'noi_dung.lua_chons': {
            type: [Object]
        },
            'noi_dung.lua_chons.$.tieu_de': {
                type: String
            },
            'noi_dung.lua_chons.$.isCorrect': {
                type: Boolean
            },
            'noi_dung.lua_chons.$.order': {
                type: Number,
                optional: true
            },
        'noi_dung.isHasImages': {
            type: Boolean,
            defaultValue: false
        },
        'noi_dung.url_hinh_anhs': {
            type: [String],
            optional: true
        },
        'noi_dung.thong_ke': {
            type: Object
        },
            'noi_dung.thong_ke.numOfLuaChons': {
                type: Number
            },
            'noi_dung.thong_ke.numOfCorrectAnswers': {
                type: Number
            },
            'noi_dung.thong_ke.numOfUrlHinhAnhs': {
                type: Number
            },
    tags: {
        type: [String],
        optional: true
    },
    fields: {
        type: Object,
        optional: true
    },
        'fields.tags': {
            type: String,
            optional: true   
        },
        'fields.loai_tb': {
            type: String,
            optional: true   
        },
        'fields.bac_thi': {
            type: String,
            optional: true   
        },
        'fields.correctAnswer': {
            type: String,
            optional: true
        },
        'fields.lua_chons': {
            type: Object,
            optional: true,
            blackbox: true
        },
        'fields.thoi_gians': {
            type: Object,
            optional: true,
            blackbox: true
        },
    mo_ta: {
        type: String,
        optional: true
    },
    ghi_chu: {
        type: String,
        optional: true
    },
    metadata: {
        type: Object,
        optional: true,
        label: "Metadata"
    },
        'metadata.ngay_tao': {
            type: Date,
            label: "Ngày tạo"
        },
        'metadata.ngay_cap_nhat_cuoi': {
            type: Date,
            label: "Ngày cập nhật cuối",
            optional: true
        },
        'metadata.nguoi_tao': {
            type: String,
            label: "Người tạo"
        },
        'metadata.nguoi_tao_name': {
            type: String,
            optional: true
        },
        'metadata.nguoi_tao_email': {
            type: String,
            optional: true
        },
        'metadata.nguoi_tao_field': {
            type: String,
            optional: true
        },
        'metadata.nguoi_cap_nhat_cuoi': {
            type: String,
            label: "Người cập nhật cuối",
            optional: true
        },
        'metadata.nguoi_cap_nhat_cuoi_name': {
            type: String,
            optional: true
        },
        'metadata.nguoi_cap_nhat_cuoi_email': {
            type: String,
            optional: true
        },
        'metadata.nguoi_cap_nhat_cuoi_field': {
            type: String,
            optional: true
        },
        'metadata.search_field': {
            type: String,
            optional: true
        },
    isPublic: {
        type: Boolean,
        defaultValue: true
    },
    isArchived: {
        type: Boolean,
        defaultValue: false
    },
    isReserveOrder: {
        type: Boolean,
        defaultValue: false
    },
    // Các trạng thái của phương tiện: Bản thảo và Hoàn thành.
    status: {
        type: String,
        allowedValues: ['Draft', 'Active'],
    }
});

CauHois.attachSchema(Schemas.CauHoiSchema);

//==================================
// USERS Custom Settings

Schemas.UserSettingSchema = new SimpleSchema({
    ten: {
        type: String,
        label: "Tên Cấu Hình"
    },
    phan_loai: {
        type: String,
        allowedValues: ['uigrid_state', 'thietbis_template', 'kendo_grid', 'thietbis_grid_config_data_skynet', 'thongsokythuats_grid_config_data_skynet', 'cauhois_grid_config_data_skynet', 'suachuas_grid_config_data_skynet'],
        label: "Phân Loại"
    },
    user: {
        type: Object
    },
        'user.keyId': {
            type: String
        },
        'user.email': {
            type: String
        },
        'user.profileName': {
            type: String,
            optional: true
        },
    mo_ta: {
        type: String,
        optional: true,
        label: "Mô tả"
    },
    gia_tri: {
        type: String,   // Sử dụng toJSON để tuyến tính giá trị này
        label: "Giá trị"
    },
    order: {
        type: Number,
        optional: true,
        label: "Mức ưu tiên"
    },
    ghi_chu: {
        type: String,
        optional: true,
        label: "Ghi chú"
    },
    icon: {
        type: String,
        label: "Icon",
        optional: true
    },
    metadata: {
        type: Object,
        label: "Metadata",
        blackbox: true
    },
    isPublic: {
        type: Boolean,
        label: "Công khai",
        defaultValue: false
    }
});

UserSettings.attachSchema(Schemas.UserSettingSchema);


//==================================
// LICHSUACHUAs Collections

Schemas.LichSuaChuaSchema = new SimpleSchema({
    nhom: {
        type: Object
    },
        'nhom.keyId': {
            type: String,
        },
        'nhom.ten': {
            type: String,
            optional: true
        },
        'nhom.ma': {
            type: String,
            optional: true
        },
        'nhom.icon': {
            type: String,
            optional: true
        },
    thiet_bi: {
        type: Object
    },
        'thiet_bi.keyId': {
            type: String
        },
        'thiet_bi.ma_tb': {
            type: Object
        },
            'thiet_bi.ma_tb.ma_tb': {
                type: String,
                optional: true
            },
            'thiet_bi.ma_tb.ma_topx': {
                type: String,
                optional: true
            },
            'thiet_bi.ma_tb.ma_maximo': {
                type: String,
                optional: true
            },
            'thiet_bi.ma_tb.ma_topovn': {
                type: String,
                optional: true
            },
        'thiet_bi.ma_tb_field': {
            type: Object,
            optional: true
        },   
    loai_sua_chua: {
        type: String,
        allowedValues: ['sua_chua_cum', 'sua_chua_lon', 'sua_chua_nho']
    },
    thoi_gian: {
        type: Object
    },
        'thoi_gian.bat_dau': {
            type: Date
        },
        'thoi_gian.ket_thuc': {
            type: Date,
            optional: true
        },
        'thoi_gian.isAllDay': {
            type: Boolean,
            defaultValue: true
        },
    ten: {
        type: String,
        label: "Nội Dung"
    },
    ma: {
        type: String,
        label: "Mã kế hoạch"
    },
    trang_thai: {
        type: String,
        label: "Trạng thái",
        allowedValues: ["hoan_thanh", "tam_dung", "dang_tien_hanh", "ke_hoach"],
        defaultValue: "ke_hoach"
    },
    mo_ta: {
        type: String,
        optional: true
    },
    ghi_chu: {
        type: String,
        optional: true
    },
    icon: {
        type: String,
        optional: true
    },
    // vat_tu: {
    //     type: Array,
    //     optional: true
    // },
    metadata: {
        type: Object,
        optional: true,
        label: "Metadata"
    },
        'metadata.ngay_tao': {
            type: Date,
            label: "Ngày tạo"
        },
        'metadata.ngay_tao': {
            type: Date,
            label: "Ngày tạo"
        },
        'metadata.ngay_cap_nhat_cuoi': {
            type: Date,
            label: "Ngày cập nhật cuối",
            optional: true
        },
        'metadata.nguoi_tao': {
            type: String,
            label: "Người tạo"
        },
        'metadata.nguoi_tao_name': {
            type: String,
            optional: true
        },
        'metadata.nguoi_tao_email': {
            type: String,
            optional: true
        },
        'metadata.nguoi_tao_field': {
            type: String,
            optional: true
        },
        'metadata.nguoi_cap_nhat_cuoi': {
            type: String,
            label: "Người cập nhật cuối",
            optional: true
        },
        'metadata.nguoi_cap_nhat_cuoi_name': {
            type: String,
            optional: true
        },
        'metadata.nguoi_cap_nhat_cuoi_email': {
            type: String,
            optional: true
        },
        'metadata.nguoi_cap_nhat_cuoi_field': {
            type: String,
            optional: true
        },
        'metadata.search_field': {
            type: String,
            optional: true
        },
    isPublic: {
        type: Boolean,
        label: "Công khai",
        defaultValue: false
    },
    isArchived: {
        type: Boolean,
        label: "isArchived",
        defaultValue: false
    }    
});

LichSuaChuas.attachSchema(Schemas.LichSuaChuaSchema);

//==================================
// SUACHUAs Collections

Schemas.SuaChuaSchema = new SimpleSchema({
    phan_loai: {
        type: Object
    },
        // Nhóm thiết bị: 'Thiết bị nâng', 'Xe - Máy'
        'phan_loai.nhom_tb': {
            type: String
        },
        'phan_loai.loai_tb': {
            type: String
        },
        // Loại sửa chữa: 'Sửa chữa nhỏ, Sửa chữa lớn, Sửa chữa cụm, Đại tu, Kiểm tra'
        'phan_loai.loai_sua_chua': {
            type: String
        },
    ma_tb: {
        type: Object
    },
        'ma_tb.ma_tb': {
            type: String
        },
        'ma_tb.dvql': {
            type: String
        },
    dia_diem: {
        type: Object
    },
        // Địa điểm: 'Xưởng DVKT'
        'dia_diem.dia_diem': {
            type: String
        },
        // Khu vực: 'Khu A, B, C.. E'
        'dia_diem.khu_vuc': {
            type: String
        },
        // Vị trí: A01, A02,...
        'dia_diem.vi_tri': {
            type: String
        },
    noi_dung: {
        type: String
    },
    thoi_gian: {
        type: Object
    },
        'thoi_gian.bat_dau': {
            type: Date
        },
        'thoi_gian.ket_thuc': {
            type: Date,
            optional: true
        },
        'thoi_gian.sua_chua_du_kien': {
            type: Number,
            decimal: true
        },
        'thoi_gian.ket_thuc_du_kien': {
            type: Date,
            optional: true
        },
    thong_ke: {
        type: Object,
        optional: true
    },
        'thong_ke.thoi_gian': {
            type: Object,
            optional: true
        },
            'thong_ke.thoi_gian.sua_chua': {
                type: Object,
                optional: true
            },
                'thong_ke.thoi_gian.sua_chua.du_kien': {
                    type: Number,
                    decimal: true,
                    optional: true
                },
                'thong_ke.thoi_gian.sua_chua.thuc_te': {
                    type: Number,
                    decimal: true,
                    optional: true
                },
                'thong_ke.thoi_gian.sua_chua.phut': {
                    type: Number,
                    decimal: true,
                    optional: true
                },
                'thong_ke.thoi_gian.sua_chua.gio': {
                    type: Number,
                    decimal: true,
                    optional: true
                },
                'thong_ke.thoi_gian.sua_chua.ngay': {
                    type: Number,
                    decimal: true,
                    optional: true
                },
            'thong_ke.thoi_gian.bat_dau': {
                type: Object,
                optional: true
            },
                'thong_ke.thoi_gian.bat_dau.gio': {
                    type: String,
                    optional: true
                },
                'thong_ke.thoi_gian.bat_dau.ngay': {
                    type: String,
                    optional: true
                },
                'thong_ke.thoi_gian.bat_dau.thang': {
                    type: String,
                    optional: true
                },
                'thong_ke.thoi_gian.bat_dau.nam': {
                    type: String,
                    optional: true
                },
            'thong_ke.thoi_gian.ket_thuc': {
                type: Object,
                optional: true
            },
                'thong_ke.thoi_gian.ket_thuc.gio': {
                    type: String,
                    optional: true
                },
                'thong_ke.thoi_gian.ket_thuc.ngay': {
                    type: String,
                    optional: true
                },
                'thong_ke.thoi_gian.ket_thuc.thang': {
                    type: String,
                    optional: true
                },
                'thong_ke.thoi_gian.ket_thuc.nam': {
                    type: String,
                    optional: true
                },
    trang_thai: {
        type: String
    },
    mo_ta: {
        type: String,
        optional: true
    },
    ghi_chu: {
        type: String,
        optional: true
    },
    metadata: {
        type: Object,
        optional: true,
        label: "Metadata"
    },
        'metadata.ngay_tao': {
            type: Date,
            label: "Ngày tạo"
        },
        'metadata.ngay_cap_nhat_cuoi': {
            type: Date,
            label: "Ngày cập nhật cuối",
            optional: true
        },
        'metadata.nguoi_tao': {
            type: String,
            label: "Người tạo"
        },
        'metadata.nguoi_tao_name': {
            type: String,
            optional: true
        },
        'metadata.nguoi_tao_email': {
            type: String,
            optional: true
        },
        'metadata.nguoi_tao_field': {
            type: String,
            optional: true
        },
        'metadata.nguoi_cap_nhat_cuoi': {
            type: String,
            label: "Người cập nhật cuối",
            optional: true
        },
        'metadata.nguoi_cap_nhat_cuoi_name': {
            type: String,
            optional: true
        },
        'metadata.nguoi_cap_nhat_cuoi_email': {
            type: String,
            optional: true
        },
        'metadata.nguoi_cap_nhat_cuoi_field': {
            type: String,
            optional: true
        },
        'metadata.search_field': {
            type: String,
            optional: true
        },
    isPublic: {
        type: Boolean,
        label: "Công khai",
        defaultValue: false
    },
    isArchived: {
        type: Boolean,
        label: "isArchived",
        defaultValue: false
    }    
});

SuaChuas.attachSchema(Schemas.SuaChuaSchema);

//==================================
// SUACHUALOGs Collections

Schemas.SuaChuaLogSchema = new SimpleSchema({
    action: {
        type: String,
        allowedValues: ['insert', 'update', 'remove']
    },
    doc: {
        type: Object,
        blackbox: true
    },
    user: {
        type: Object
    },
        'user.userId': {
            type: String
        },
        'user.userName': {
            type: String,
            optional: true
        },
        'user.userEmail': {
            type: String,
            optional: true
        },
    createdAt: {
        type: Date,
        defaultValue: new Date()
    }
});

SuaChuaLogs.attachSchema(Schemas.SuaChuaLogSchema);

//==================================
// HOSOLUUTRUs Collections

Schemas.HoSoLuuTruSchema = new SimpleSchema({
    ten: {
        type: String
    },
    ma: {
        type: String,
        optional: true
    },
    phan_loai: {
        type: String,
        allowedValues: ['tai_lieu_ky_thuat', 'van_ban_hanh_chinh'],
    },
    loai: {
        type: String,
        allowedValues: ['catalog', 'bao_cao', 'cong_van', 'quyet_dinh', 'ke_hoach', 'de_nghi', 'phe_duyet', 'dinh_muc', 'tong_hop'],
    },
    don_vi_phat_hanh: {
        type: String,
        label: "Đơn vị phát hành",
        optional: true
    },
    noi_dung: {
        type: String,
        label: "Nội Dung",
        optional: true
    },
    mo_ta: {
        type: String,
        label: "Mô Tả",
        optional: true
    },
    ngay_ky: {
        type: Date,
        label: "Ngày ký",
        optional: true
    },
    nguoi_ky: {
        type: [String],
        label: "Người ký",
        optional: true
    },
    ghi_chu: {
        type: String,
        label: "Ghi Chú",
        optional: true
    },
    icon: {
        type: String,
        label: "Icon",
        optional: true
    },
    tags: {
        type: [String],
        optional: true
    },
    ngon_ngu: {
        type: String,
        optional: true
    },
    file_dinh_kem: {
        type: [String],
        optional: true
    },
    metadata: {
        type: Object,
        optional: true,
        label: "Metadata"
    },
        'metadata.ngay_tao': {
            type: Date,
            label: "Ngày tạo"
        },
        'metadata.ngay_cap_nhat_cuoi': {
            type: Date,
            label: "Ngày cập nhật cuối",
            optional: true
        },
        'metadata.nguoi_tao': {
            type: String,
            label: "Người tạo"
        },
        'metadata.nguoi_tao_name': {
            type: String,
            optional: true
        },
        'metadata.nguoi_tao_email': {
            type: String,
            optional: true
        },
        'metadata.nguoi_tao_field': {
            type: String,
            optional: true
        },
        'metadata.nguoi_cap_nhat_cuoi': {
            type: String,
            label: "Người cập nhật cuối",
            optional: true
        },
        'metadata.nguoi_cap_nhat_cuoi_name': {
            type: String,
            optional: true
        },
        'metadata.nguoi_cap_nhat_cuoi_email': {
            type: String,
            optional: true
        },
        'metadata.nguoi_cap_nhat_cuoi_field': {
            type: String,
            optional: true
        },
        'metadata.search_field': {
            type: String,
            optional: true
        },
    isPublic: {
        type: Boolean,
        label: "Công khai",
        defaultValue: false
    },
    isArchived: {
        type: Boolean,
        label: "isArchived",
        defaultValue: false
    },
    trang_thai: {
        type: String,
        optional: true
    }  
});

HoSoLuuTrus.attachSchema(Schemas.HoSoLuuTruSchema);


//==================================
// NHANSUs Collections

Schemas.NhanSuSchema = new SimpleSchema({
    ma_nv: {
        type: String
    },
    don_vi: {
        type: Object
    },
        'don_vi.ten': {
            type: String
        },
        'don_vi.ma': {
            type: String
        },
    tieu_su: {
        type: Object
    },
        'tieu_su.ho_ten_dem': {
            type: String
        },
        'tieu_su.ten': {
            type: String
        },
        'tieu_su.ho_ten': {
            type: String
        },
        'tieu_su.ngay_sinh': {
            type: Date,
            optional: true
        },
        'tieu_su.isNhapNgu': {
            type: Boolean,
            defaultValue: false
        },
        'tieu_su.ngay_nhap_ngu': {
            type: Date,
            optional: true
        },
        'tieu_su.gioi_tinh': {
            type: String
        },
        'tieu_su.quoc_tich': {
            type: String
        },
        'tieu_su.dan_toc': {
            type: String,
            optional: true
        },
        'tieu_su.ton_giao': {
            type: String,
            optional: true
        },
        'tieu_su.tinh_trang_hon_nhan': {
            type: String,
            optional: true
        },
        'tieu_su.que_quan': {
            type: Object,
            optional: true
        },
            'tieu_su.que_quan.phuong_xa': {
                type: String,
                optional: true
            },
            'tieu_su.que_quan.quan_huyen': {
                type: String,
                optional: true
            },
            'tieu_su.que_quan.tinh_thanh': {
                type: String,
                optional: true
            },
            'tieu_su.que_quan.summary': {
                type: String,
                optional: true
            },
            'tieu_su.thuong_tru.phuong_xa': {
                type: String,
                optional: true
            },
            'tieu_su.thuong_tru.quan_huyen': {
                type: String,
                optional: true
            },
            'tieu_su.thuong_tru.tinh_thanh': {
                type: String,
                optional: true
            },
            'tieu_su.thuong_tru.summary': {
                type: String,
                optional: true
            },
        'tieu_su.cmnd': {
            type: Object,
            optional: true
        },
            'tieu_su.cmnd.so_cmnd': {
                type: String,
                optional: true
            },
            'tieu_su.cmnd.ngay_cap': {
                type: String,
                optional: true
            },
            'tieu_su.cmnd.noi_cap': {
                type: String,
                optional: true
            },
        'tieu_su.ngay_ke_khai': {
            type: Date,
            optional: true
        },
    thanh_phan_gia_dinh: {
        type: [Object],
        optional: true
    },
        'thanh_phan_gia_dinh.$': {  // quan_he, ngay_sinh, ho_ten, so_dien_thoai, dia_chi, nghe_nghiep, noi_cong_tac
            type: Object,
            optional: true,
            blackbox: true
        },
    hoc_van: {
        type: Object,
        optional: true
    },
        'hoc_van.trinh_do_van_hoa': {
            type: String,
            optional: true
        },
        'hoc_van.trinh_do_chuyen_mon': {
            type: String,
            optional: true
        },
        'hoc_van.nganh_dao_tao': {
            type: String,
            optional: true
        },
        'hoc_van.ngoai_ngu': {
            type: [String],
            optional: true
        },
    cong_viec: {
        type: Object,
        optional: true
    },
        'cong_viec.to_chuc_bien_che': {  
            type: Object,
            optional: true
        },
            'cong_viec.to_chuc_bien_che.loai_bien_che': {  // etc. LĐHĐ, LĐQP
                type: String,
                optional: true
            },
            'cong_viec.to_chuc_bien_che.department': { // etc. Phòng KTVT, Ban Kế hoạch cung ứng, Các đội cơ giới, ...
                type: Object,
                optional: true,
                blackbox: true
            },
            'cong_viec.to_chuc_bien_che.subdepartment': { // etc. Phòng Ban, Tổ Đội, Ban Giám Đốc
                type: Object,
                optional: true,
                blackbox: true
            },
            'cong_viec.to_chuc_bien_che.chuc_danh': {   // etc. Nhân viên, Đội trưởng, Đội phó, Phó Giám đốc
                type: String,
                optional: true
            },
        'cong_viec.trang_thai': {
            type: String
        },
        'cong_viec.ho_so': {
            type: Object,
            optional: true
        },
            'cong_viec.ho_so.ngay_vao_cang': {
                type: String,
                optional: true
            },
            'cong_viec.ho_so.he_so_luong': {
                type: Number,
                optional: true
            },
            'cong_viec.ho_so.bac_bien_che': {
                type: String,
                optional: true,
            },
            'cong_viec.ho_so.nam_nhan_bac_bien_che': {
                type: Number,
                optional: true
            },
            'cong_viec.ho_so.cap_bac_quoc_phong': {
                type: String,
                optional: true
            },
            'cong_viec.ho_so.nam_nhan_bac_quoc_phong': {
                type: Number,
                optional: true
            },
    thong_tin_lien_he: {
        type: Object,
        optional: true
    },
        'thong_tin_lien_he.so_dien_thoai': {
            type: String,
            optional: true
        },
        'thong_tin_lien_he.email': {
            type: String,
            optional: true
        },
        'thong_tin_lien_he.nguoi_bao_tin': {    // quan_he, ho_ten, so_dien_thoai, nghe_nghiep, noi_cong_tac, dia_chi
            type: Object,
            optional: true,
            blackbox: true
        },
        'thong_tin_lien_he.nguoi_bao_lanh': {   // quan_he, ho_ten, so_dien_thoai, noi_cong_tac, chuc_danh
            type: Object,
            optional: true,
            blackbox: true
        },
    bang_cap: {
        type: Object,
        optional: true
    },
        'bang_cap.bang_lai_xe': {   // so_bang, trung_tam_dao_tao, ngay_cap, ngay_het_han
            type: Object,
            optional: true,
            blackbox: true
        },
        'bang_cap.giay_phep_lai_xe_quan_su': {
            type: Object,
            optional: true,
            blackbox: true
        },
        'bang_cap.chung_chi_cau_khung': {
            type: Object,
            optional: true,
            blackbox: true
        },
    mo_ta: {
        type: String,
        optional: true
    },
    ghi_chu: {
        type: String,
        optional: true
    },
    metadata: {
        type: Object,
        optional: true,
        label: "Metadata"
    },
        'metadata.ngay_tao': {
            type: Date,
            label: "Ngày tạo"
        },
        'metadata.ngay_cap_nhat_cuoi': {
            type: Date,
            label: "Ngày cập nhật cuối",
            optional: true
        },
        'metadata.nguoi_tao': {
            type: String,
            label: "Người tạo"
        },
        'metadata.nguoi_tao_name': {
            type: String,
            optional: true
        },
        'metadata.nguoi_tao_email': {
            type: String,
            optional: true
        },
        'metadata.nguoi_tao_field': {
            type: String,
            optional: true
        },
        'metadata.nguoi_cap_nhat_cuoi': {
            type: String,
            label: "Người cập nhật cuối",
            optional: true
        },
        'metadata.nguoi_cap_nhat_cuoi_name': {
            type: String,
            optional: true
        },
        'metadata.nguoi_cap_nhat_cuoi_email': {
            type: String,
            optional: true
        },
        'metadata.nguoi_cap_nhat_cuoi_field': {
            type: String,
            optional: true
        },
        'metadata.search_field': {
            type: String,
            optional: true
        },
    isPublic: {
        type: Boolean,
        label: "Công khai",
        defaultValue: false
    },
    isArchived: {
        type: Boolean,
        label: "isArchived",
        defaultValue: false
    }  
});

NhanSus.attachSchema(Schemas.NhanSuSchema);