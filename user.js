var courses = [
	{ 'topic': 'math', 'location': 'hendon', 'price': 100 },
	{ 'topic': 'math', 'location': 'colindale', 'price': 80 },
	{ 'topic': 'math', 'location': 'brent cross', 'price': 90 },
	{ 'topic': 'math', 'location': 'golders green', 'price': 120 },
	{ 'topic': 'english', 'location': 'hendon', 'price': 110 },
	{ 'topic': 'english', 'location': 'colindale', 'price': 90 },
	{ 'topic': 'english', 'location': 'brent cross', 'price': 90 },
	{ 'topic': 'english', 'location': 'golders green', 'price': 130 },
	{ 'topic': 'piano', 'location': 'hendon', 'price': 120 },
	{ 'topic': 'piano', 'location': 'golders green', 'price': 140 }
]

var user = new Vue({
	el: '#user',
	data: {
		search: ''
	},
	methods: {
		onSubmit: function () {

		}
	}
});

var filterApp = new Vue({
	el: '#filter',
	data: {
		courses: courses,
		selectedTopic: [],
		selectedLocation: [],
	},
	computed: {
		topics: function () { // return an array of all the topics
			return [...new Set(this.courses.map(x => x.topic))]
		},
		locations: function () {
			return [...new Set(this.courses.map(x => x.location))]
		}
	}
});

var dataTable = new Vue({
	el: '#data-table',
	data: {
		currentCourses: JSON.parse(localStorage.getItem("courses"))
	},
	computed: {

	},
	mounted() {

		var myInit = {
			method: 'GET',
			mode: 'cors',
			cache: 'default',
		};

		var courseRequest = new Request('http://localhost:3000', myInit);

		fetch(courseRequest)
			.then(function (response) {
				if (!response.ok) {
					throw new Error("HTTP error, status = " + response.status);
				}
				return response.json();
			}).catch((error) => {
				alert('Unable to reach the server!');
				return;
			})
			.then(function (json) {
				this.currentCourses = localStorage.getItem("courses")
				localStorage.setItem("courses", JSON.stringify(json))
				// console.log(typeof json);
				// console.log(typeof this.currentCourses);

				// this.currentCourses = json;
				// Vue.set(this.currentCourses, json)
				return console.log(this.currentCourses);
				// location.href = "http://127.0.0.1:8887/user.html";
			})
			.catch(function (error) {
				var p = document.createElement('p');
				p.appendChild(
					document.createTextNode('Error: ' + error.message)
				);
				// document.body.insertBefore(p, myList);
			});
	}
})
