(function(){
	'use strict';

	angular.module('jivoxHack')
		.controller('HomeController', function($http, Home, $window, $stateParams, Category, Wishlist){

			var self = this;
			
			self.catList = null;
			self.prodlist = [];
			
			Home.getCategories()
				.then(function(response){
					console.log(response);
					self.catList = response.data.catgList;
				}).catch(function(reason){
					console.log('error:',reason );
				});
			
			self.times = function(n){
				return new Array(n);
			};
			
			self.getCatProd = function(cat_id){
				Category.getCategoryProducts(cat_id)
					.then(function(response){
						console.log(response);
						return response.data.products;
					}).catch(function(reason){
						console.log(reason);
					});

			};
			self.addToCart = function(pro_id) {
				$window.localStorage.setItem('cart',pro_id);

			};
			self.addToWishlist = function (pro_id){

				Wishlist.postWishes(pro_id)
					.then(function(response){
						console.log(response);
					}).catch(function(reason){
						console.log(reason);
					});
			};
	for (var i = 3; i >= 0; i--) {
			 		 
			Category.getCategoryProducts(i)
			.then(function(response){
					console.log(response);
					for(var i = 0; i < response.data.products.length ;i++ ) {
						self.prodlist.push(response.data.products[i]);
						//console.log(self.prodlist);
					}
				}).catch(function(reason){
					console.log(reason);
				});
		}
		});
})();