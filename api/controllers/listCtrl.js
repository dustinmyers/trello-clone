// List functions
// save list
// update list name
var _ = require('underscore');
var ObjectID = require('mongodb').ObjectID;
var User = require('../models/UserModel.js')
var List = require('../models/ListModel.js')

module.exports = {

    getLists: function (req, res) {
        var user = req.session.user;
        User.findById(user._id)
            .populate('lists')
            .exec(function (err, foundUser) {
                if (err) {
                    console.log(err);
                    return res.status(500).send(err);
                }
                return res.status(200).json(foundUser.lists)
            })

    },
    addList: function (req, res) {
        var list = req.body;
        var user = req.session.user;
        //create list
        var newList = new List({
            name: list.listName
        });
        newList.save(function (err, savedList) {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            //add ref to user
            User.findById(user._id)
                .exec(function (err, foundUser) {
                    if (err) {
                        console.log(err);
                        return res.status(500).send(err);
                    }
                    foundUser.lists.push(savedList._id);
                    foundUser.save(function (err, savedUser) {
                        if (err) {
                            console.log(err);
                            return res.status(500).send(err)
                        }
                        return res.status(200).json(savedList);
                    })
                })
        })
    },
    deleteList: function (req, res) {
        var listId = req.body.list._id;
        var userId = req.session.user._id;
        List.findByIdAndRemove(listId)
            .exec(function (err, deletedList) {
                console.log(deletedList);
                if (err) {
                    console.log(err);
                    return res.status(500).send(err);
                }
                User.findById(userId)
                    .exec(function (err, foundUser) {
                        foundUser.lists.splice(foundUser.lists.indexOf(listId), 1);
                        foundUser.save(function (err, savedUser) {
                            if (err) {
                                console.log(err);
                                return res.status(500).send(err);
                            }
                            return res.status(200).json(deletedList)
                        })
                    })
            })
    },
    addCard: function (req, res) {
        var listId = req.body.listId;
        var newCard = req.body.newCard;
        List.findById(listId)
            .exec(function (err, list) {
                if (err) {
                    console.log(err);
                    return res.status(500).send(err);
                }
                list.cards.push(newCard);
                list.save(function (err, result) {
                    if (err) {
                        console.log(err)
                        return res.status(500).send(err);
                    }
                    return res.status(200).json(list.cards);
                })
            })
    },
    deleteCard: function (req, res) {
        // list Id, card
        var listId = req.body.listId;
        var card = req.body.card;
        console.log(card);
        List.findById(listId)
            .exec(function (err, list) {
                if (err) {
                    console.log(err);
                    return res.status(500).send(err);
                }
                for (var i = 0; i < list.cards.length; i++) {
                    if (list.cards[i]._id.toHexString() === card._id) {
                        list.cards.splice(i, 1)
                        i--;
                    }
                }
                list.save(function (err, result) {
                    if (err) {
                        console.log(err);
                        return res.status(500).send(err);
                    }
                    return res.status(200).json(list.cards);
                });
            })
    },
    moveCard: function (req, res) {
        var card = req.body.card;
        var toList = req.body.toList;
        var fromList = req.body.fromList;

        List.findById(toList).exec(function (err, list) {
            if (err) {
                res.status(500).send(err);
            }
            list.cards.push(card);
            list.save(function (err, saved) {
                if (err) {
                    res.status(500).send(err)
                }
                List.findById(fromList).exec(function (err, listfrom) {
                    if (err) {
                        res.status(500).send(err)
                    }
                    for (var i = 0; i < listfrom.cards.length; i++) {
                        if (listfrom.cards[i]._id.toHexString() === card._id) {
                            listfrom.cards.splice(i, 1)
                            i--;
                        }
                    }
                    listfrom.save(function (err) {
                        if (err) {
                            res.status(500).send(err)
                        }
                        res.status(200).send('moved card')
                    })
                })
            })
        })
    }

}

// Card functions
// save card (to list)
// move card between lists
// update card title