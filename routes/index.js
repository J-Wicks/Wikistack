const express = require('express');
const path = require('path');
const router = express.Router();
const models = require('../models');
const Page = models.Page;
const wikiRouter = require('./wiki');
const userRouter = require('./user');
const Promise = require('bluebird');

// router.use('./wiki', wikiRouter);
// router.use('./user', userRouter);

router.use('/wiki', wikiRouter);
router.use('/users', userRouter);


router.get('/', function(req, res, next){
	console.log(req.method, req.path)
	Page.findAll({

	})
	.then(function(results){
		console.log(results)
		res.render('index', {page: results})
	}, function(err){console.error(err)});
});

router.get('/search', function(req, res, next){

res.render('search')

});


// router.get('/wiki/', function(req, res, next){
//
// 	console.log(req.method, req.path)
// 	res.render('index');
// });


module.exports = router;
