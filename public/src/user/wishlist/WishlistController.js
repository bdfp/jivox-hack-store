(function(){
	'use strict';

	angular.module('jivoxHack')
		.controller('WishlistController', function ($http, $window, Wishlist, toaster, Product, Cart) {
			var self = this;
			
			self.prodlist = [];

			self.addToCart = function(pro_id) {
				Cart.addToCart(pro_id)
				.then(function(response){
					console.log(response);

				}).catch(function(reason){
					console.log(reason);
				});
			};


			Wishlist.getWishes()
				.then(function (response) {
					console.log(response);
					self.wished = response.data.wishlist;
					getprodDetails(self.wished);
				})
				.catch(function (reason) {
					console.log(reason);
					toaster.pop('error', "Sorry", "Please log in");
				});
			function getprodDetails(wishlistArr) {
				for (var i =wishlistArr.length - 1; i >= 0; i--) {
					Product.getProductDetails(wishlistArr[i].product_id)
						.then(function(response){
							console.log(response);
							self.prodlist.push(response.data.products);
						}).catch(function(reason){
							console.log(reason);
						});
				}
			}

		});
})();
