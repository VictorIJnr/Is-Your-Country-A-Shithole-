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
        result.decision = data ? "Yes" : "No";
        if (result.decision === "Yes") {
          result.header = "Yes, Donald Trump thinks " + req.query.country + " is a Shithole!";
        } else {
          result.header = "No, Donald Trump doesn't think " + req.query.country + " is a Shithole.";
        }
        result.body = "Some facts about " + req.query.country;
        res.render("pages/result", {
          title: 'Is Your Country A Shithole?',
          result: result
        });
      });
    }
    else {
      res.render('pages/index', {
        title: 'Is Your Country A Shithole?'
      });
    }
});

router.get('/heatmap', function(req, res, next) {
  res.render('pages/heatmap', {
    title: 'Is Your Country A Shithole?'
  });
});

module.exports = router;
