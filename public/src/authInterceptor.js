/**
 * Created by akash on 8/7/16.
 */
(function () {
    angular.module('jivoxHack')
        .factory('authInterceptor',function  ($rootScope,$q,$window) {
            return {
                request: function  (config) {
                    config.headers = config.headers || {};
                    if ($window.localStorage.getItem('token')) {
                        config.headers.Authorization = $window.localStorage.getItem('token');
                    }
                    return config;
                },
                response: function  (response) {
                    if (response.status === 401) {
                        //user not authorized
                    }
                    return response || $q.when(response);
                }
            };
        });
})();