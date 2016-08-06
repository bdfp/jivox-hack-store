(function(){
	'use strict';

	angular.module('jivoxHack')
		.controller('WishlistController', function ($http, $window, Wishlist) {
			var self = this;

			self.wished = function () {
				Wishlist.getWishes()
					.then(function (response) {
						console.log(response);
						self.wished = response.data.products;
			
					}).catch(function (reason) {
						console.log(reason);
			
					});
			
			};
			
		});
})();
