(function(){
	'use strict';

	angular.module('jivoxHack')
		.factory('Order',["$http", "$window" , function($http, $window) {
			return {
				getOrders: function () {
					return $http.get('/consumer/orders/');
				},
				postOrder: function (data) {
					return $http.post('/consumer/orders/', data);
				}

		}
		}]);
})();