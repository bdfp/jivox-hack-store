(function () {
    'use strict';

    angular.module('jivoxHack', ['ui.router', 'toaster', 'ngAnimate'/*,'scDateTime'*/])
        .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
            
            $urlRouterProvider.otherwise('/home');

            var dir = 'src/';

            $stateProvider
                .state('account', {
                    url: '/user',
                    templateUrl: dir + 'user/account/account.tpl',
                    controller: 'AccountController as account'
                })

                .state('account.login', {
                    url: '/user/login',
                    templateUrl: dir + 'user/account/login/login.tpl',
                    controller: 'LoginController as login'
                })

                .state('account.signup', {
                    url: '/user/signup',
                    templateUrl: dir + 'user/account/signup/signup.tpl',
                    controller: 'SignUpController as signup'
                })
                .state('account.logout',{
                    url: '/user',
                    templateUrl: dir + 'user/account/account.tpl',
                    controller: 'AccountController as account'
                })
                .state('profile',{
                    url: '/user/profile',
                    templateUrl: dir + 'user/profile/profile.tpl',
                    controller: 'ProfileController as profile'
                })
                .state('wishlist' , {
                    url: '/user/wishlist',
                    templateUrl: dir + 'user/wishlist/wishlist.tpl' ,
                    controller : 'WishlistController as wishlist'
                })
                .state('order',{
                    url: '/user/order',
                    templateUrl: dir + 'user/order/order.tpl',
                    controller : 'OrderController as order'
                })
                .state('cart',{
                    url: '/user/cart',
                    templateUrl: dir + 'user/cart/cart.tpl',
                    controller: 'CartController as cart'
                })
                .state('home',{
                    url: '/home',
                    templateUrl: dir + 'home/home.tpl',
                    controller: 'HomeController as home'
                })
                .state('products',{
                    url: '/products/:prodId',
                    templateUrl: dir + 'products/product.tpl',
                    controller: 'ProductController as product'
                })
                .state('category', {
                    url: '/category/:catId',
                    templateUrl: dir + 'category/category.tpl',
                    controller: 'CategoryController as category'
                })
            ;

            $httpProvider.interceptors.push('authInterceptor');
        });
})();
