Meteor.Router.add({
	'/': function() {
		sessionStorage.clickcount;
		if (sessionStorage.clickcount){
			path == sessionStorage.clickcount
		} else {
			var path = Math.round(Math.random()) + 1;	
			sessionStorage.clickcount = path;
		};
		console.log(sessionStorage.clickcount);
		if(path == 1) {
			return 'home1';
		} else {
			return 'home2';
		}
	},
	'/list': function() {
		sessionStorage.clickcount;
		if (sessionStorage.clickcount){
			path == sessionStorage.clickcount
		} else {
			var path = Math.round(Math.random()) + 1;	
			sessionStorage.clickcount = path;
		};
		console.log(sessionStorage.clickcount);
		if(path == 1) {
			return 'owners-form-1';
		} else {
			return 'owners-form-2';
		}
	},
	'/drive': function() {
		sessionStorage.clickcount;
		if (sessionStorage.clickcount){
			path == sessionStorage.clickcount
		} else {
			var path = Math.round(Math.random()) + 1;	
			sessionStorage.clickcount = path;
		};
		console.log(sessionStorage.clickcount);
		if(path == 1) {
			return 'drivers-form-1';
		} else {
			return 'drivers-form-2';
		}
	},
});