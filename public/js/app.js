var app = angular.module('trelloClone', ['ui.router']);

app.config(function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('auth', {
            url: '/',
            controller: 'AuthCtrl',
            templateUrl: '../views/authView.html'
        })
        .state('todo', {
            url: '/list',
            controller: 'MainCtrl',
            templateUrl: '../views/mainView.html',
            resolve: {
                lists: function (listService) {
                    return listService.getLists();
                }
            }
        })
})