(function(){
	'use strict';

	angular.module('jivoxHack')
		.controller('WishlistController', function ($http, $window, Wishlist, toaster) {
			var self = this;

			Wishlist.getWishes()
				.then(function (response) {
					console.log(response);
					self.wished = response.data.wishlist;
				})
				.catch(function (reason) {
					console.log(reason);
					toaster.pop('error', "Sorry", "Please log in");
				});
			
		});
})();
