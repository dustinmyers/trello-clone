angular
    .module('trelloClone')
    .service('authService', function ($http, $q) {
        this.login = function (username) {
            var dfd = $q.defer();
            $http.post('/auth/login', {
                    username: username
                })
                .then(function (response) {
                    dfd.resolve(response.data)
                })
                .catch(function (err) {
                    console.log(err);
                    dfd.reject(err)
                });

            return dfd.promise;
        };

        this.logout = function () {
            var dfd = $q.defer();
            $http.post('/auth/logout')
                .then(function (response) {
                    dfd.resolve(response.data)
                })
                .catch(function (err) {
                    dfd.reject(err)
                });

            return dfd.promise;

        }
});