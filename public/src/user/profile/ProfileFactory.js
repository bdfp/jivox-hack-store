(function(){
	'use strict';
	angular.module('jivoxHack')
	.factory('Profile',['$http', '$window', function($http, $window) {
		return {
			postAddress: function(data) {
				return $http.post('/consumer/address/' + data);
			}
		};
	}]);
})();