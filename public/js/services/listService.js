angular
    .module('trelloClone')
    .service('listService', function ($http, $q) {

        this.addList = function (listName) {
            var dfd = $q.defer();
            $http.post('/api/addList', {
                    listName: listName
                })
                .then(function (response) {
                    var list = response.data;
                    dfd.resolve(list);
                })
                .catch(function (err) {
                    dfd.reject(err);
                });

            return dfd.promise;
        };

        this.getLists = function () {
            var dfd = $q.defer();

            $http.get('/api/getLists')
                .then(function (response) {
                    var lists = response.data;
                    dfd.resolve(lists);
                })
                .catch(function (err) {
                    dfd.reject(err);
                });

            return dfd.promise;
        };

        this.deleteList = function (list) {
            var dfd = $q.defer();

            $http.post('/api/deleteList', {
                    list: list
                })
                .then(function (response) {
                    var list = response.data;
                    dfd.resolve(list);
                })
                .catch(function (err) {
                    dfd.reject(err);
                });


            return dfd.promise;
        };

        this.addCard = function (listId, newCard) {
            var dfd = $q.defer();

            $http.post('/api/addCard', {
                    listId: listId,
                    newCard: newCard
                })
                .then(function (response) {
                    var cards = response.data;
                    dfd.resolve(cards);
                })
                .catch(function (err) {
                    dfd.reject(err);
                });

            return dfd.promise;
        };

        this.deleteCard = function (listId, card) {
            var dfd = $q.defer();

            $http.post('/api/deleteCard', {
                    listId: listId,
                    card: card
                })
                .then(function (response) {
                    var cards = response.data;
                    dfd.resolve(cards);
                })
                .catch(function (err) {
                    dfd.reject(err);
                });

            return dfd.promise;
        };

        this.moveCard = function (cardToMove) {
            if (cardToMove.card && cardToMove.toList && cardToMove.fromList) {
                var dfd = $q.defer();
                $http.post('/api/moveCard', cardToMove)
                    .then(function () {
                        dfd.resolve()
                    })
                    .catch(function (err) {
                        dfd.reject(err)
                    });

                return dfd.promise;

            } else {
                return;
            }
        }

});