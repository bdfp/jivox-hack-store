(function () {
	'use strict';

	angular.module('jivoxHack')
		.controller('ProfileController', function($http, $window, $stateParam){
			var self = this;

			self.update = function(){
				Profile.postAddress(data)
					.then(function(response){
						console.log(response);
					}).catch(function(reason){
						console.log(reason);
					});
			};
		});

})();