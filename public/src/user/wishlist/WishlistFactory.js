(function(){
	'use strict';

	angular.module('jivoxHack')
		.factory('Wishlist',['$http', '$window', function ($http, $window ) {
			return{
				getWishes: function () {
					return $http.get('/consumer/wishlist/');
					// body...
				},
				postWishes: function (pro_id) {
					$http.post('/consumer/wishlist/' + pro_id);
					// body...
				}
			};
			// body...
		}]);
})();