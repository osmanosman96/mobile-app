var admin_login = new Vue({
	el: '#admin_login',
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
			var newPassword = this.password;

			if (localStorage.getItem('admins')) {
				users = JSON.parse(localStorage.getItem('admins'));
			};

			if (users) {
				for (var i = users.length - 1; i >= 0; i--) {
					console.log(users[i].email);
					console.log(users[i].password);
					if (users[i].email === newEmail && users[i].password === this.password) {
						alert('success');
						window.location.href = "http://127.0.0.1:8887/user.html";
						return;
					}
				}

				alert('Email Password combination invalid');
			} else {
				var myHeaders = new Headers();

				var myInit = {
					method: 'POST',
					headers: myHeaders,
					mode: 'cors',
					cache: 'default',
					body: { email: newEmail, password: newPassword }
				};

				var registerRequest = new Request('http://localhost:3000/user/login', myInit);

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
						location.href = "http://127.0.0.1:8887/user.html";
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
