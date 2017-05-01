const express = require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;
const Promise = require('bluebird');


router.get('/', function(req, res, next) {
  User.findAll({

  })
  .then(function(result){
    res.render('users', {users: result})
	}, function(err){console.error(err)});
  });

  router.get('/:id', function(req, res, next){
    var p1 = User.findOne({
      where: {
        id: req.params.id
      }
    })
    console.log(p1);
    var p2 = Page.findAll({
      where: {
        authorId: req.params.id
      }
    })

    // Page.findAll({
    //   where: {id: req.params.id}
    // })
    Promise.all([p1, p2])
    .then(function(result){
    res.render('userpage', {users: result[0], pages: result[1]});
      });
  })





module.exports = router;
