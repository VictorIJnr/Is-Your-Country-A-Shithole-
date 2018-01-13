var express = require('express');
var router = express.Router();
var shithole = require("../shithole");

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.query.country + "\tHELLO");
    if (req.query.country) {
      var result = {};
      // shithole.allShitholes(function(data) {
      //   console.log(data);
      //   console.log("Hi");
      // });

      shithole.isShithole(req.query.country, function(data) {
        result.header = data ? "Yes" : "No";
        result.body = "Some facts about " + req.query.country;
        res.render("pages/index", {
          title: 'Is Your Country A Shithole?',
          result: result
        });
      });
    }
    else {
      res.render('pages/index', {
        title: 'Is Your Country A Shithole?',
        result: {
          header: 'Yes',
          body: 'Some facts about Haiti'
        }
      });
    }
});

module.exports = router;
