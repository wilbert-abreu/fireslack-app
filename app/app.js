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
	});

	$urlRouterProvider.otherwise('/');
})
	.constant('FirebaseUrl', 'https://intense-torch-180.firebaseio.com')
