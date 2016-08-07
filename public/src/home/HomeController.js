(function(){
	'use strict';

	angular.module('jivoxHack')
		.controller('HomeController', function($state,$http, Home, $window, $stateParams, Category, Wishlist, Cart,$rootScope){

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
				Cart.addToCart(pro_id);
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
		self.viewProd = function(pro_id){
			console.log(pro_id);
			$rootScope.curProdId = pro_id;
			$state.go('products');
		};

            self.search = function () {
                Home.getSearch(self.query)
                    .then(function (response) {
                        self.productList = response.data.productList;
                    })
                    .catch(function (reason) {
                        console.log(reason);
                    });
            };
		});
})();