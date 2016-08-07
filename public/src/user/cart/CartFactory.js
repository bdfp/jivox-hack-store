(function() {
	'use strict';

	angular.module('jivoxHack')
		.factory("Cart",function($http, $window) {
			return {
				addToCart: function(pro_id) {
					var cartList = $window.localStorage.getItem('cart');
					
					if (!cartList) 
						cartList = [];
					
					cartList.push(pro_id);
					$window.localStorage.setItem('cart',JSON.stringify(cartList));
				},
				getCart: function () {
					return JSON.parse($window.localStorage.getItem('cart'));	
				}
			}
		});
})();