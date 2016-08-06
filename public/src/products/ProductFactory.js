(function() {
	'use strict';

	angular.module('jivoxHack')
		.factory('Product',['$http' , '$window', function($http, $window) {
			return{
				getProductDetails: function (pro_id) {
					return $http.get('/products/'+pro_id);
				},
				addToWishlist: function (pro_id) {
					return $http.post('/consumer/wishlist/'+pro_id);
				},
				addRating: function (pro_id) {
					return $http.post('/consumer/rating/'+pro_id);
				}
			}

		}]);
});