(function(){
	'use strict';

	angular.module('jivoxHack')
		.controller('CartController', function($window,Product,$stateParams){
			var self = this;

			self.productList = $window.localStorage.getItem('cart');


		});
})();