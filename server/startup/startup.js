Meteor.startup(function() {

    if (Meteor.users.find().count() === 0) {
        let users = [
        	// Password sẽ được admin thay đổi trong lần đăng nhập đầu tiên
            { name: "Long Hồ", email: "longxuanho@gmail.com", password: "defaultadminpasswordforskynet", roles: ['admin', 'manage-users'] }
        ];

        _.each(users, (user) => {
            let id;

            id = Accounts.createUser({
                email: user.email,
                password: user.password,
                profile: { name: user.name }
            });

            if (user.roles.length > 0) {
            	// Need _id of existing user record so this call must come
    			// after `Accounts.createUser` or `Accounts.onCreate`
    			Roles.addUsersToRoles(id, user.roles, 'sky-project');
            }

        });

    }
    if (Notifies.find().count() === 0) {
        // Chú ý có lỗi khó hiểu xảy ra khi seed item này. Cần phải thêm thủ công các trường thông tin khác _id vào db
        let item = {
            section: 'suachuas',
            category: 'xuongdvkt-dashboard',
            subject: 'hero-content',
            content: {
                text: '',
                mode: 'default'
            }
        }
        Notifies.insert(item);
    }

});
