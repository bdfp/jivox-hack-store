(function () {
    'use strict';

    angular.module('jivox', ['ui.router', 'toaster', 'ngAnimate','scDateTime'])
        .config(function ($stateProvider, $urlRouterProvider) {
            
            $urlRouterProvider.otherwise('/home');

            var dir = 'src/';

            $stateProvider

                .state('account', {
                    url: '/user',
                    templateUrl: dir + 'user/account/account.tpl',
                    controller: 'AccountController as account'
                })

                .state('account.login', {
                    url: '/login',
                    templateUrl: dir + 'user/account/login/login.tpl',
                    controller: 'LoginController as login'
                })

                .state('account.signup', {
                    url: '/signup',
                    templateUrl: dir + 'user/account/signup/signup.tpl',
                    controller: 'SignUpController as signup'
                })
                .state('account.logout',{
                    url: '/customer',
                    templateUrl: dir + 'user/account/account.tpl',
                    controller: 'AccountController as account'
                })
                .state('profile',{
                    url: '/profile',
                    templateUrl: dir + 'user/profile/profile.tpl',
                    controller: 'ProfileController as profile'
                })
                .state('wishlist' , {
                    url: '/wishlist',
                    templateUrl: dir + 'user/wishlist/wishlist.tpl' ,
                    controller : 'WishlistController as wishlist'
                })
                .state('order',{
                    url: '/order',
                    templateUrl: dir + 'user/order/order.tpl',
                    controller : 'OrderController as order'
                })
                .state('cart',{
                    url: '/cart',
                    templateUrl: dir + 'user/cart/cart.tpl',
                    controller: 'CartController as cart'
                })
                .state('home',{
                    url: '/home',
                    templateUrl: dir + 'home/home.tpl',
                    controller: 'HomeController as home'
                })
                .state('products',{
                    url: '/products',
                    templateUrl: dir + 'products/products.tpl',
                    controller: 'ProductController as product'
                })

            ;
        });

})();
