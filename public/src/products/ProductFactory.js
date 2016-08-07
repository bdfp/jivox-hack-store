(function() {
	'use strict';

	angular.module('jivoxHack')
		.factory('Product', function($http, $window) {
			return{
				getProductDetails: function (pro_id) {
					return $http.get('/products/'+pro_id);
				},
				addRating: function (pro_id) {
					return $http.post('/consumer/rating/'+pro_id);
				}
			}

		});
})();