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
		onSubmit: function() {
			
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
})
