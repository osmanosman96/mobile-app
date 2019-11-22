var admin_login = new Vue({
	el: '#user_login',
	data: {
		email: '',
		password: ''
	},
	methods: {
		onSubmit: function() {
			var users = '';
			var newEmail = this.email;

			if (localStorage.getItem('users')) {
				users = JSON.parse(localStorage.getItem('users'));
			};

			if (users) {
				if (users.some(function(user) { return user.email === newEmail && user.password === this.password })) {
					window.location.replace('user.html');
				} else {
					alert('Email or password does not exists!');
				}
			} else {
				alert('No Users Registered');
			}
		}
	}
});
