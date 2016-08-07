(function () {
	'use strict';
	angular.module('jivoxHack').
		factory('Home',['$http', '$window', function ($http, $window) {

			return{
				getCategories : function() {
					return $http.get('/category');
				},
				getSearch: function (query) {
					return $http.post('/search', {
						search_query: query
					});
				}
			};
		}]);
})();