// public/js/controllers/StatusCtrl.js

angular.module('StatusCtrl', []).controller('StatusController', function($scope, $http) {
	$scope.title = 'statuses';

	$scope.statuses =  {};
	$http.get('/api/statuses')
		.success(function(data){
			$scope.statuses = data;
		})
		.error(function(data){
			console.log(data);
		});
});