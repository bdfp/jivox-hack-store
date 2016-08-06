(function() {
	'use strict';

	angular.module('jivoxHack')
		.factory('Category', ['$http', '$window', function ($http, $window ) {

				return {
					getCategoryProducts : function (cat_id) {
						return $http.get('/products/category/'+ cat_id);
					}

				}

	}]);
});