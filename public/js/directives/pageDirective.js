angular
    .module('trelloClone')
    .directive('page', function () {
        return {
            scope: {
                lists: '='
            },
            restrict: 'AE',
            templateUrl: '../../views/partials/pageView.html',
            controller: function ($scope, listService, $state) {
                $scope.isDragging = { 'currently': false, 'hasMoved': false };
                $scope.test = 'page';

                $scope.setDragging = function (card) {
                    $scope.isDragging = card;
                };

                $scope.handleEnterOnInput = function (event) {
                    if (event.keyCode === 13) {
                        $scope.addList();
                    }
                };

                $scope.addList = function () {
                    listService.addList($scope.newList)
                        .then(function (list) {
                            $scope.lists.push(list);
                            $scope.newList = '';
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                };

                $scope.deleteList = function (list) {
                    $scope.lists.splice($scope.lists.indexOf(list), 1);
                };

                $scope.handleEnterList = function (id, index) {
                    if ($scope.isDragging.currently) {
                        var cards = $scope.lists[index].cards;
                        if (cards.length) {
                            if (cards[cards.length - 1]._id !== undefined) {
                                if ($scope.lists[index]._id !== $scope.isDragging.fromList) {
                                    $scope.lists[index].cards.push({ title: $scope.isDragging.card.title })
                                }
                            }

                        } else {
                            $scope.lists[index].cards.push({ title: $scope.isDragging.card.title })

                        }
                        $scope.isDragging.hasMoved = true;
                        $scope.isDragging.toList = id;

                    }
                };

                $scope.handleExitList = function (index) {
                    var cards = $scope.lists[index].cards;
                    if (cards.length) {
                        if ($scope.lists[index].cards[$scope.lists[index].cards.length - 1]._id === undefined) {
                            $scope.lists[index].cards.pop();
                        }
                    }
                };

                $scope.handleMouseUp = function () {
                    if ($scope.isDragging.currently) {
                        var misMatch = $scope.isDragging.toList !== $scope.isDragging.fromList;
                        if (misMatch && $scope.isDragging.hasMoved) {
                            var cardToMove = {
                                card: {
                                    title: $scope.isDragging.card.title,
                                    _id: $scope.isDragging.card._id
                                },
                                toList: $scope.isDragging.toList,
                                fromList: $scope.isDragging.fromList
                            };
                            listService.moveCard(cardToMove).then(function () {
                                $scope.isDragging = { 'currently': false, hasMoved: false };
                                listService.getLists()
                                    .then(function (lists) {
                                        $scope.lists = lists
                                    })
                                    .catch(function (err) {
                                        console.log(err)
                                    })
                            })
                        } else {
                            $scope.isDragging = { 'currently': false, hasMoved: false };
                            listService.getLists()
                                .then(function (lists) {
                                    $scope.lists = lists
                                })
                                .catch(function (err) {
                                    console.log(err)
                                })
                        }
                    } else {
                        $scope.isDragging = { 'currently': false, hasMoved: false };
                        return false;
                    }
                }

            }
        }
});