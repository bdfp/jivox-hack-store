(function () {
	'use strict';

	angular.module('jivoxHack')
		.controller('CategoryController', function (Cart,Wishlist,$stateParams, Category) {
			var cat_id = $stateParams.catId;
            console.log('cat_id', cat_id);
			var self = this;

			self.catList = null;
			self.prodlist = [];
			
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
		

			Category.getCategories()
				.then(function(response){
					console.log(response);
					self.catList = response.data.catgList;
				}).catch(function(reason){
					console.log('error:',reason );
				});

			self.rclear = function () {
				
				delete self.rat;
				self.rat = 0;
			}
			
			self.min_val = "";
			self.max_val = "";

			Category.getCategoryProducts(cat_id)
				.then(function (response) {
					console.log('Product list', response);

					self.productList = response.data.products;
                    processData();
				}).catch( function (reason){
					console.log(reason);
				});


            function processData() {
                self.min_val = Math.min.apply(Math,self.productList.map(function(item){return item.cost;}));
                self.max_val = Math.max.apply(Math,self.productList.map(function(item){ return item.cost;}));

                self.sort_val = '-cost';

                self.priceUp = function () {
                	console.log('price');
                    self.sort_val = '-cost';

                };
                self.priceDown = function () {
                	console.log('priceDown');
                    self.sort_val = 'cost';
                };
                self.rating = function () {
                	console.log('rating');
                    self.sort_val = 'cum_rating';
                };
                self.filter_val = "";
                self.rat = 1;

                self.selRat = function(){
                    
                };

                self.options = {
                    floor: self.min_val,
                    ceil: self.max_val,
                    step: 1
                };
                console.log(self);
            }

		});
})();