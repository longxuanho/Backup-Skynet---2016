Meteor.startup(function() {

    process.env.MAIL_URL = Meteor.settings.private.data.mailgun.key;

    SSR.compileTemplate('verifyEmail', Assets.getText('templates/verify-email.html'));
    SSR.compileTemplate('resetPasswordEmail', Assets.getText('templates/reset-password-email.html'));

    // Configures "reset password account" email link
    Accounts.urls.resetPassword = function(token){
        return Meteor.absoluteUrl("reset-mat-khau/" + token);
    };

    // // Configures "enroll account" email link
    // Accounts.urls.enrollAccount = function(token){
    //     return Meteor.absoluteUrl("enroll-account/" + token);
    // };

    // Configures "verify email" email link
    Accounts.urls.verifyEmail = function(token){
        return Meteor.absoluteUrl("xac-nhan-email/" + token);
    };

    Accounts.config({
        sendVerificationEmail: true,
        loginExpirationInDays: 7
    });

    
    // let emailData = {
    //     name: "Doug Funny",
    //     favoriteRestaurant: "Honker Burger",
    //     bestFriend: "Skeeter Valentine"
    // };

    Accounts.emailTemplates.siteName = "Skynet Project";
    Accounts.emailTemplates.from = "Skynet <no-reply@skynet.com>";
    Accounts.emailTemplates.verifyEmail.subject = function(user) {
        return "Kích hoạt tài khoản của bạn tại Skynet"
    };
    Accounts.emailTemplates.verifyEmail.html = function(user, url) {
        let emailData = {
            verifyUrl: url
        };
        return SSR.render('verifyEmail', emailData);
    }

    // Accounts.emailTemplates.verifyEmail.text = function(user, url) {
    //     return "\n\nChào mừng bạn đến với hành trình Skynet. Cùng nhau, hãy chung tay xây dựng một tương lai mới!" + "\n\nĐể bắt đầu, hãy kích hoạt tài khoản của bạn bằng liên kết dưới đây:\n\n" + url;
    // };

    Accounts.emailTemplates.resetPassword.subject = function(user) {
        return "Khôi phục mật khẩu của bạn từ Skynet"
    };
    Accounts.emailTemplates.resetPassword.html = function(user, url) {
        let emailData = {
            userName: user.profile.name,
            resetUrl: url
        };
        return SSR.render('resetPasswordEmail', emailData);
    };
    // Accounts.emailTemplates.resetPassword.text = function(user, url) {
    //     return "Dear " + user.profile.name + ",\n\nChúng tôi đã nhận được yêu cầu cung cấp mật khẩu mới cho tài khoản của bạn tại Skynet. Nếu bạn không muốn reset lại mật khẩu hoặc không phải là người đưa ra yêu cầu, xin vui lòng bỏ qua email này. Ngược lại, hãy kích hoạt liên kết dưới đây:\n\n" + url;
    // };

    reCAPTCHA.config({
        privatekey: Meteor.settings.private.data.recaptcha.private
    });

});
