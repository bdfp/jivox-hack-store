(function () {
	'use strict';
	// body...
	angular.module('jivoxHack')
		.controller('OrderController', function (Order, $window, $stateParams) {
			var self = this;
			self.allOrders = null;
			Order.getOrders()
				.then(function(response){
					console.log(response);
					self.allOrders = response.data.orders;
				}).catch(function(reason){
					console.log(reason);
				});
		});
})();