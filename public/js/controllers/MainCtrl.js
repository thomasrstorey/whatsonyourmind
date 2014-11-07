// public/js/controllers/MainCtrl.js

angular.module('MainCtrl', []).controller('MainController', function($scope, $http) {
	$scope.title = 'main';
	$scope.status = {
		"text"	: ""
	};

	//post a status
	$scope.createStatus = function() {
		if($scope.status.text != ""){
			$http.post('/api/status', $scope.status)
			.success(function(data) {
				$scope.status.text = "";
				console.log(data);
			})
			.error(function(data){
				console.log('Error:' + data);
			});	
		}
	};

});