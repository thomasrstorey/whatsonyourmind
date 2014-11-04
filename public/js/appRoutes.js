// public/js/appRoutes.js
// NOTE : This file holds Angular (frontend) routes!
// this makes it possible to have a single-page app

angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {
		//NOTE when is a member function of routeProvider
		//the files at templateUrl will be injected into the ng-view
		//the controller files will define how user can interact with 
		//these files
		
		$routeProvider
			.when('/', {
				templateUrl: 'views/home.html',
				controller: 'MainController'
			})
			.when('/statuses', {
				templateUrl: 'views/statuses.html',
				controller: 'StatusController'
			});

		$locationProvider.html5Mode = true;
	}]);