(function () {
	'use strict';
	angular.module('jivoxHack')
	.controller('ProductController', function($window, $stateParams, Product){
		var self = this;
		self.addedToCart = [];
		self.curProductId = null;

		Product.getProductDetails(curProductId)
			.then(function(response){
				console.log(response);
				self.productDetails = response.data.product;
			}).catch(function(reason){
				console.log(reason);
			});
		self.addCart = function () {
			$window.localStorage.setItem('cart',self.productDetails);
		};
		self.addWish = function () {
			Product.addToWishlist(curProductId)
				.then(function(response){
					console.log(response);
				}).catch(function(reason){
					console.log(reason);
				})
		};
		self.addReview = function () {
			Product.addRating(curProductId)
				.then(function(response){
					console.log(response);
					Product.getProductDetails(curProductId)
					.then(function(response){
						console.log(response);
						self.productDetails = response.data.product;
					}).catch(function(reason){
						console.log(reason);
					});	
				}).catch(function(reason){
					console.log(reason);
				});
		};

	});
})();