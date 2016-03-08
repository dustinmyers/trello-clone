angular
    .module('trelloClone')
    .controller('MainCtrl', function ($scope, lists) {

    $scope.lists = lists;

});