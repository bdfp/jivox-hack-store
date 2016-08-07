(function(){
	'use strict';

	angular.module('jivoxHack')
		.controller('HomeController', function($http, Home, $window, $stateParams, Category, Wishlist){

			var self = this;
			
			self.catList = null;
			
			Home.getCategories()
				.then(function(response){
					console.log(response);
					self.catList = response.data.catgList;
				}).catch(function(reason){
					console.log('error:',reason );
				});
			
			self.times = function(n){
				return n;
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
				Wishlist.postWishes()
					.then(function(response){
						console.log(response);
					}).catch(function(reason){
						console.log(reason);
					});
			};

            self.search = function () {
                Home.getSearch(self.query)
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (reason) {
                        console.log(reason);
                    });
            }
		});
})();