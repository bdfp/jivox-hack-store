(function () {
    'use strict'

    angular.module('jivoxHack')
        .controller('LoginController', function (Account, $state, $rootScope) {
            
            var self = this;
            $rootScope.isSignUp = false;


            self.submit = function () {
                Account.login({
                    email: self.email,
                    password: self.password
                }).then(function (response) {
                    console.log(response);
                    console.log('islo', Account.isLoggedIn);
                    $rootScope.loggedIn = true;
                    $state.go('home');
                }).catch(function (reason) {
                    console.log(reason);
                    self.Message = reason;
                })
            }
        });
})();