(function  () {
	'use strict'

	angular.module('jivox')

		.factory('Account', function  ($http, $window) {

			var token = null;
			var id = null;
			
			function signUp (data) {
				return $http.post('/users', data);
			}

			function login (data) {
				return $http.post('/users/login', data)
						.then(function (response) {
							console.log(response);
							token = response.data.token;
							id = response.data.id;
							$window.localStorage.setItem('token' , token);
							$window.localStorage.setItem('user_id' , id);
							return response;
						})
			}
			function logout(){
				return $window.localStorage.clear();

			}
			function isloggedIn(){
				if(getToken() && getUserId())
					return true;
				else
					return false;
			}
			
			function usernames () {
				return $http.get('/users');
			}
			function getUserId () {
				id = $window.localStorage.getItem('user_id');
				return id;
			}
			function getToken () {
				token = $window.localStorage.getItem('token');
				return token;
			}

			return {
				signUp: signUp,
				login: login,
				getUserNames: usernames,
				getUserId : getUserId,
				getToken: getToken,
				isloggedIn : isloggedIn,
				logout : logout
			}
		});

	
})();