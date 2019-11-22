var admin_login = new Vue({
	el: '#admin_login',
	data: {
		email: '',
		password: ''
	},
	methods: {
		onSubmit: function() {
			var users = '';
			var newEmail = this.email;

			if (localStorage.getItem('admins')) {
				users = JSON.parse(localStorage.getItem('admins'));
			};

			if (users) {
				if (users.some(function(user) { return user.email === newEmail && user.password === this.password })) {
					window.location.replace('admin_register.html');
				} else {
					alert('Email or password does not exists!');
				}
			} else {
				alert('No Users Registered');
			}
		}
	}
});
