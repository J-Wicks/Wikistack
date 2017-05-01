const express = require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;


router.get('/', function(req, res, next) {
  res.redirect('/');
});

router.post('/', function(req, res, next) {
  User.findOrCreate({
    where: {
      name: req.body.name,
      email: req.body.email
    }
  })
  .then(function(result){
    //console.log(result);
    var user = result[0];

    var page = Page.build({
      content: req.body.content,
       tags: req.body.tags.split(' '),//urlTitle: generateURLTitle(req.body.title),
      title: req.body.title,

    });
    return page.save().then(function (page){
      return page.setAuthor(user);
    });
  })
  .then(function(savedPage){
    res.redirect(savedPage.url) }
    // res.redirect('/')}
    , function(err) {console.error(err)});
  });

  router.get('/add', function(req, res, next) {
    res.render('addpage.html');
  });
  router.get('/search', function(req, res, next) {
    res.render('search');
  });

router.get('/:urlTitle', function(req, res, next){
  Page.findOne({
    where: {urlTitle: req.params.urlTitle},
    include: [
      {model: User, as: 'author'}
    ]
  })
  .then(function(result){
    if (result === null) {
      res.status(404).send();
    } else {
      res.render('wikipage', {page: result});
    }
    // var author = result.getAuthor().then(function(author){ return author; });  //console.log("LOOK HERE", author);
  });
})


// .catch(next);
// router.post('/add', function(req, res, next) {
//
// });



module.exports = router;
