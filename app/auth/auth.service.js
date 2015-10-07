//create a new factory called Auth
angular.module('angularfireSlackApp')
	.factory('Auth',
					 //Inject $firebaseAuth and FirebaseUrl into our Auth factory
					 function($firebaseAuth, FirebaseUrl){
	//Create a Firebase reference to our Firebase
	 var ref = new Firebase(FirebaseUrl);
	//Pass the Firebase reference to the $firebaseAuth service
	 var auth = $firebaseAuth(ref);
	//have your factory return it.
	return auth;
});

