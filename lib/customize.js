SimpleSchema.messages({
    required: "Thông tin về [label] còn trống",
    minString: "[label] phải có ít nhất [min] ký tự",
    maxString: "[label] không thể vượt quá [max] ký tự",
    minNumber: "[label] phải có ít nhất [min]",
    maxNumber: "[label] không được vượt quá [max]",
    minDate: "[label] must be on or after [min]",
    maxDate: "[label] cannot be after [max]",
    badDate: "[label] không phải là ngày hợp lệ",
    minCount: "You must specify at least [minCount] values",
    maxCount: "You cannot specify more than [maxCount] values",
    noDecimal: "[label] phải là số nguyên",
    notAllowed: "[value] is not an allowed value",
    expectedString: "[label] phải là chuỗi ký tự",
    expectedNumber: "[label] phải là số",
    expectedBoolean: "[label] must be a boolean",
    expectedArray: "[label] must be an array",
    expectedObject: "[label] must be an object",
    expectedConstructor: "[label] must be a [type]",
    regEx: [{
        msg: "[label] failed regular expression validation"
    }, {
        exp: SimpleSchema.RegEx.Email,
        msg: "[label] must be a valid e-mail address"
    }, {
        exp: SimpleSchema.RegEx.WeakEmail,
        msg: "[label] must be a valid e-mail address"
    }, {
        exp: SimpleSchema.RegEx.Domain,
        msg: "[label] must be a valid domain"
    }, {
        exp: SimpleSchema.RegEx.WeakDomain,
        msg: "[label] must be a valid domain"
    }, {
        exp: SimpleSchema.RegEx.IP,
        msg: "[label] must be a valid IPv4 or IPv6 address"
    }, {
        exp: SimpleSchema.RegEx.IPv4,
        msg: "[label] must be a valid IPv4 address"
    }, {
        exp: SimpleSchema.RegEx.IPv6,
        msg: "[label] must be a valid IPv6 address"
    }, {
        exp: SimpleSchema.RegEx.Url,
        msg: "[label] must be a valid URL"
    }, {
        exp: SimpleSchema.RegEx.Id,
        msg: "[label] must be a valid alphanumeric ID"
    }],
    keyNotInSchema: "[key] is not allowed by the schema"
});

Meteor.startup(function() {
    reCAPTCHA.config({
        publickey: '6LeePBoTAAAAAHv6GggVAvVuwcBoZBAJNBTM9fZ1'
    });
});
