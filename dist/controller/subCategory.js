'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _login = require('../model/login');

var _login2 = _interopRequireDefault(_login);

var _user = require('../model/user');

var _user2 = _interopRequireDefault(_user);

var _product = require('../model/product');

var _product2 = _interopRequireDefault(_product);

var _subCategory = require('../model/subCategory');

var _subCategory2 = _interopRequireDefault(_subCategory);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var config = _ref.config,
        db = _ref.db;

    var api = (0, _express.Router)();
    //adding a category
    //v1/category/add
    api.post('/add', function (req, res) {
        //check password or match password
        _user2.default.findOne({ email: req.body.email }, function (err, user) {
            if (user == undefined) {
                res.status(400).json({ message: 'User not found!' });
            } else {
                _login2.default.findOne({ email: req.body.email }, function (err, login) {

                    if (!err) {

                        if (login == undefined) {
                            //user not found

                            res.status(400).json({ message: 'User not Logged In!' });
                        } else {

                            if (login.token == req.body.token && user.userType > 0) {
                                //token matching and only admin can add
                                var newCategory = new _subCategory2.default();
                                newCategory.name = req.body.name;
                                newCategory.category = req.body.category;
                                newCategory.save(function (err, subcat) {

                                    if (!err) {

                                        res.status(200).send(subcat);
                                    } else {
                                        res.status(500).send(err);
                                    }
                                });
                            } else {
                                res.status(400).json({ message: 'invalid token!' });
                            }
                        }
                    } else {

                        res.status(400).send(err);
                    }
                });
            }
        });
    });

    //v1/category/update
    api.put('/update/:id', function (req, res) {
        //check password or match password
        _user2.default.findOne({ email: req.body.email }, function (err, user) {
            if (user == undefined) {
                res.status(400).json({ message: 'User not found!' });
            } else {
                _login2.default.findOne({ email: req.body.email }, function (err, login) {

                    if (!err) {

                        if (login == undefined) {
                            //user not found

                            res.status(400).json({ message: 'User not Logged In!' });
                        } else {

                            if (login.token == req.body.token && user.userType > 0) {
                                //token matching and only admin can add


                                _subCategory2.default.findById(req.params.id, function (err, category) {

                                    if (!err) {
                                        if (category === undefined) {
                                            res.status(400).send({ message: "no such subcategory exsist!" });
                                        } else {
                                            category.name = req.body.name;
                                            category.category = req.body.category;
                                            category.save(function (err, SubCategory) {

                                                if (err) {

                                                    res.status(500).send(err);
                                                } else {

                                                    res.status(200).send(SubCategory);
                                                }
                                            });
                                        }
                                    } else {

                                        res.status(500).send(err);
                                    }
                                });
                            } else {
                                res.status(400).json({ message: 'invalid token!' });
                            }
                        }
                    } else {

                        res.status(400).send(err);
                    }
                });
            }
        });
    });

    //v1/category/update
    api.delete('/delete/:id/:token/:email', function (req, res) {
        //check password or match password
        _user2.default.findOne({ email: req.params.email }, function (err, user) {
            if (user == undefined) {
                res.status(400).json({ message: 'User not found!' });
            } else {
                _login2.default.findOne({ email: req.params.email }, function (err, login) {

                    if (!err) {

                        if (login == undefined) {
                            //user not found

                            res.status(400).json({ message: 'User not Logged In!' });
                        } else {

                            if (login.token == req.params.token && user.userType > 0) {
                                //token matching and only admin can add


                                _subCategory2.default.findById(req.params.id, function (err, category) {

                                    if (!err) {
                                        if (category === undefined) {
                                            res.status(400).send({ message: "no such subcategory exsist!" });
                                        } else {
                                            category.remove(function (err) {

                                                if (!err) {

                                                    res.status(200).send({ message: "subcategory deleted!" });
                                                } else {

                                                    res.status(500).send(err);
                                                }
                                            });
                                        }
                                    } else {

                                        res.status(500).send(err);
                                    }
                                });
                            } else {
                                res.status(400).json({ message: 'invalid token!' });
                            }
                        }
                    } else {

                        res.status(400).send(err);
                    }
                });
            }
        });
    });

    //get subCategory here
    api.post('/get', function (req, res) {
        _subCategory2.default.find({ category: req.body.category }, function (err, subcat) {
            res.json({ "subCategories": subcat });
        });
    });
    return api;
};
//# sourceMappingURL=subCategory.js.map