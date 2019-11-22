var user_register = new Vue({
	el: '#admin_register',
	data: {
		email: '',
		password: '',
		errors: []
	},
	methods: {
		checkForm: function (e) {
      		this.errors = [];

      		if (!this.email) {
        		this.errors.push('Email required.');
      		} else if (!this.validEmail(this.email)) {
        		this.errors.push('Valid email required.');
      		}

      		if (!this.password) {
        		this.errors.push("Password required.");
      		}

      		if (!this.errors.length) {
        		this.onSubmit();
      		}

      		e.preventDefault();
    	},
    	validEmail: function (email) {
      		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      		return re.test(email);
  		},
		onSubmit: function() {
			var users = '';
			var newEmail = this.email;

			if (localStorage.getItem('admins')) {
				users = JSON.parse(localStorage.getItem('admins'));
			};

			if (users) {
				if (users.some(function(user) { return user.email === newEmail })) {
					alert('Email already exists!');
					return;
				}

				users.push({'email': newEmail, 'password': this.password});
				localStorage.setItem('admins', JSON.stringify(users));
			} else {
				users = [{'email': newEmail, 'password': this.password}];
				localStorage.setItem('admins', JSON.stringify(users));
			}
		}
	}
});
