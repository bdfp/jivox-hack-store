(function () {
	'use strict';
	angular.module('jivoxHack').
		factory('Home',['$http', '$window', function ($http, $window) {

			var user_id = $window.localStorage.getItem('user_id');

			function getCategories() {
				return $http.get('/category');
			}
			

		}]);
})();