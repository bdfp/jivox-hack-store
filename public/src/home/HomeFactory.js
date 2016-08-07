(function () {
	'use strict';
	angular.module('jivoxHack').
		factory('Home',['$http', '$window', function ($http, $window) {

			return{
				getCategories : function() {
					return $http.get('/category');
				}
			};
			

		}]);
})();