angular.module('angularfireSlackApp')
//Create a controller named AuthCtrl
	.controller('AuthCtrl', function
							//and inject Auth and $state into it.
							//The $state service is provided by ui-router for us to control the state of our application.
							(Auth, $state){
	var authCtrl = this;
	//create a user object on our controller with empty strings for email and password. We can use the go() function on $state to redirect our application to a specific state.
	authCtrl.user = {
		email: '',
		password: ''
	};

	authCtrl.login = function (){
		//login function
		Auth.$authWithPassword(authCtrl.user).then(function(auth){
			//When authentication is successful, we want to send the user to the home state. When it fails, we want to set the error on our controller so we can display the error message to our user.
			$state.go('home');
		}, function(error){
			authCtrl.error = error;
		});
	};

	// We want to set error on the controller if $createUser fails, however, when $createUser succeeds, it doesn't automatically log in the user that was just created so we'll need to call the login function we just created to log the user in.
	authCtrl.register = function(){
		Auth.$createUser(authCtrl.user).then(function(user) {
			authCtrl.login();
		}, function(error){
			authCtrl.error = error;
		});
	};
});