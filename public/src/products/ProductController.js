(function () {
	'use strict';
	angular.module('jivoxHack')
	.controller('ProductController', function($rootScope, $window, $stateParams, Product,Wishlist,Cart){
		var self = this;
		self.addedToCart = [];
		self.curProductId = null;
		self.reviewList = [];

		self.curProductId = $stateParams.prodId;

		var getPDet = function () {
			Product.getProductDetails(self.curProductId)
			.then(function(response){
				console.log('details',response);
				self.productDetails = response.data.products;
				self.reviewList = response.data.products.ratings;
				self.pic = response.data.products.photos[0].url;
				self.vendorId = response.data.products.vendor_id; 
				console.log("re", self.reviewList);
			}).catch(function(reason){
				console.log(reason);
			});
		}

		getPDet();

		Product.getReview(self.curProductId)
			.then(function(response){
				console.log('review',response);

			}).catch(function(reason){
				console.log(reason);
			});
		self.addCart = function () {
			Cart.addToCart(self.curProductId);
		};
		self.addWish = function () {
			Wishlist.postWishes(self.curProductId)
				.then(function(response){
					console.log(response);
				}).catch(function(reason){
					console.log(reason);
				})
		};

		self.addReview = function () {
			Product.addRating(self.curProductId,{
				/*product_id: self.curProductId,*/
				vendor_id: self.vendorId,
				rating: self.Urating,
				review: self.Ureview
			})
				.then(function(response){
					getPDet();
					console.log(response);
					self.Ureview="";
					self.Urating =""; 
				}).catch(function(reason){
					console.log(reason);
				});
		};

	});
})();