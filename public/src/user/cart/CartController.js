(function(){
	'use strict';

	angular.module('jivoxHack')
		.controller('CartController', function($window,Product,$stateParams,Cart, Order){
			var self = this;
			self.prodlist = [];

			var prodIdArr = Cart.getCart();
			console.log('prod id arr', prodIdArr);

			var orderList = []
			var getprodDetails = function (prodIdArr) {
				for (var i =prodIdArr.length - 1; i >= 0; i--) {
					Product.getProductDetails(prodIdArr[i])
						.then(function(response){
							console.log(response);
							self.prodlist.push(response.data.products);
							orderList.push({
								product_id: response.data.products.product_id ,
								vendor_id: response.data.products.vendor_id
							});
						}).catch(function(reason){
							console.log(reason);
						});
				}
			}	
			self.order = function() {
				Order.postOrder(orderList)
					.then(function(response){
						console.log(response);
					}).catch(function(reason){
						console.log(reason);
					});
			};
			console.log(self.prodlist);
			getprodDetails(prodIdArr);


		});
})();