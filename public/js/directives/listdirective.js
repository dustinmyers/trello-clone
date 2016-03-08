angular
    .module('trelloClone')
    .directive('list', function () {
        return {
            scope: {
                details: '=',
                deleteList: '&',
                setDragging: '&',
                isDragging: '='
            },
            restrict: 'AE',
            templateUrl: '../../views/partials/listView.html',
            controller: function ($scope, listService) {
                $scope.test = 'list';

                $scope.handleEnterOnInput = function (event) {
                    if (event.keyCode === 13) {
                        $scope.addCard();
                    }
                };
                $scope.delete = function (list) {
                    listService.deleteList(list)
                        .then(function (list) {
                            $scope.deleteList(list);
                        })
                        .catch(function (err) {
                            console.log(err);
                        })
                };

                $scope.addCard = function () {
                    var listId = $scope.details._id;
                    var newCard = { title: $scope.newCard };
                    listService.addCard(listId, newCard)
                        .then(function (cards) {
                            $scope.details.cards = cards;
                            $scope.newCard = '';
                        })
                        .catch(function (err) {
                            console.log(err);
                        })
                };

                $scope.deleteCard = function (card) {
                    var listId = $scope.details._id;
                    listService.deleteCard(listId, card)
                        .then(function (cards) {
                            $scope.details.cards = cards;
                        })
                        .catch(function(err) {
                            console.log(err);
                        })
                };

                $scope.setDragCard = function (card) {
                    $scope.setDragging({ card: card });
                }

            }
        }
});