'use strict';

/**
 * @ngdoc overview
 * @name angularfireSlackApp
 * @description
 * # angularfireSlackApp
 *
 * Main module of the application.
 */
angular
	.module('angularfireSlackApp', [
	'firebase',
	'angular-md5',
	'ui.router'
])
	.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('home', {
		url: '/',
		templateUrl: 'home/home.html'
	})
	//specify AuthCtrl as our controller for both the login and register states.
		.state('login', {
		url: '/login',
		controller: 'AuthCtrl as authCtrl',
		templateUrl: 'auth/login.html',
		resolve: {
			//In our requireNoAuth dependency, if the User is logged in we want to send them back to the home state, otherwise, we need to catch the error that gets thrown and handle it gracefully by returning nothing
			requireNoAuth: function($state, Auth){
				return
				//The $firebaseAuth service provides us with a $requireAuth function which returns a promise. This promise will get resolved with an auth object if the user is logged in.
				Auth.$requireAuth().then(function(auth){
					$state.go('home');
				}, function(error){
					return;
				});
			}
		}
	})
		.state('register', {
		url: '/register',
		controller: 'AuthCtrl as authCtrl',
		templateUrl: 'auth/register.html',
		resolve: {
			//In our requireNoAuth dependency, if the User is logged in we want to send them back to the home state, otherwise, we need to catch the error that gets thrown and handle it gracefully by returning nothing
			requireNoAuth: function($state, Auth){
				return
				//The $firebaseAuth service provides us with a $requireAuth function which returns a promise. This promise will get resolved with an auth object if the user is logged in.
				Auth.$requireAuth().then(function(auth){
					$state.go('home');
				}, function(error){
					return;
				});
			}
		}
	})
		.state('profile', {
		url: '/profile',
controller: 'ProfileCtrl as profileCtrl',
templateUrl: 'users/profile.html',
		resolve: {
			//The auth dependency is similar to the requireNoAuth dependency we created for login and register, except it does the inverse, where the user is redirected to the home state if they're not authenticated. 
			auth: function($state, Users, Auth){
				//The .catch function is a shorthand for handling promises if we don't want to provide a success handler
				 return Auth.$requireAuth().catch(function(){
					$state.go('home');
				});
			},
			//The profile dependency also ensures authentication, but resolves to the user's profile using the getProfile function we created in our Users service.
			 profile: function(Users, Auth){
      return Auth.$requireAuth().then(function(auth){
					//$loaded is a function provided by both $firebaseObject and $firebaseArray that returns a promise that gets resolved when the data from Firebase is available locally.
					return Users.getProfile(auth.uid).$loaded();
				});
			}
		}
	})

	$urlRouterProvider.otherwise('/');
})
	.constant('FirebaseUrl', 'https://intense-torch-180.firebaseio.com')
