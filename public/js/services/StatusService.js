// public/js/services/StatusService.j
angular.module('StatusService', []).factory('Status', ['$http', function($http) {
	return {
		// call to get all statuses
		get : function(){
			//makes the call to app.get in app/routes.js
			return $http.get('api/statuses');
		},

		create : function(statusData) {
			//makes the call to app.post in app/routes.js
			return $http.post('/api/status', statusData);
		}
	}
}]);