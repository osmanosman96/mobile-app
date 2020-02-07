var user_register = new Vue({
	el: '#admin_register',
	data: {
		email: '',
		password: '',
		fullName: '',
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

			if (!this.fullName) {
				this.errors.push("Name required.");
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
		onSubmit: function () {
			var users = '';
			var newEmail = this.email;
			var newPassword = this.password;
			var newFullName = this.fullName

			if (localStorage.getItem('admins')) {
				users = JSON.parse(localStorage.getItem('admins'));
			};

			if (users) {
				if (users.some(function (user) { return user.email === newEmail })) {
					alert('Email already exists!');
					return;
				}

				users.push({ 'email': newEmail, 'password': this.password });
				localStorage.setItem('admins', JSON.stringify(users));
				//Redirect to user page
				location.href = "http://127.0.0.1:8887/admin_login.html";
				return;

			} else {
				var myHeaders = new Headers();

				var myInit = {
					method: 'POST',
					headers: myHeaders,
					mode: 'cors',
					cache: 'default',
					body: { email: newEmail, password: newPassword, role: "Provider", fullName: newFullName }
				};

				var registerRequest = new Request('http://localhost:3000/user/register', myInit);

				fetch(registerRequest)
					.then(function (response) {
						if (!response.ok) {
							throw new Error("HTTP error, status = " + response.status);
						}
						users = [{ 'email': newEmail, 'password': this.password, 'fullName': this.fullName }];
						localStorage.setItem('admins', JSON.stringify(users));
						return response.json();
					}).catch((error) => {
						alert('Unable to reach the server!');
						return;
					})
					.then(function (json) {
						//Redirect to user page
						location.href = "http://127.0.0.1:8887/admin_login.html";
						return;
					})
					.catch(function (error) {
						var p = document.createElement('p');
						p.appendChild(
							document.createTextNode('Error: ' + error.message)
						);
						// document.body.insertBefore(p, myList);
					});
			}
		}
	}
});
