(function () {
	'use strict';

	angular.module('jivoxHack')
		.controller('CategoryController', function ($stateParams, Category) {
			var cat_id = $stateParams.catId;
            console.log('cat_id', cat_id);
			var self = this;

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
                    self.sort_val = '-cost';

                };
                self.priceDown = function () {
                    self.sort_val = 'cost';
                };
                self.rating = function () {
                    self.sort_val = 'ratings';
                };
                self.filter_val = "";
                self.rat1 = true;
                self.rat2 = true;
                self.rat3 = true;
                self.rat4 = true;
                self.rat5 = true;

                self.selRat = function(){
                    return (self.productList.product.rating >= 1 && self.rat1) ||
                        (self.productList.product.rating >= 2 && self.rat2) ||
                        (self.productList.product.rating >= 3 && self.rat3) ||
                        (self.productList.product.rating >= 4 && self.rat4) ||
                        (self.productList.product.rating >= 5 && self.rat5);
                };

                self.options = {
                    floor: self.min_val,
                    ceil: self.max_val,
                    step: 1
                };
            }

		});
})();