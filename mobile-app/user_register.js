var user_register = new Vue({
	el: '#user_register',
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
				if (users.some(function(user) { return user.email === newEmail })) {
					alert('Email already exists!');
					return;
				}

				users.push({'email': newEmail, 'password': this.password});
				localStorage.setItem('users', JSON.stringify(users));
			} else {
				users = [{'email': newEmail, 'password': this.password}];
				localStorage.setItem('users', JSON.stringify(users));
			}
		}
	}
});
