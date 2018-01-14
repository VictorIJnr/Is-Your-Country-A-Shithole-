var express = require('express');
var router = express.Router();
var shithole = require("../shithole");

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.query.country + "\tHELLO");
    if (req.query.country) {

      if (req.query.country.toLowerCase() === "united states of america" || req.query.country.toLowerCase() === "america") {
        var result = {
          header: "No, Donald Trump doesn't think " + req.query.country + " is a shithole.",
          body: 'America is Great Again'
        }
        res.render('pages/result', {
          title: 'Is Your Country A Shithole?',
          result: result
        });
      }

      var result = {};
      // shithole.allShitholes(function(data) {
      //   console.log(data);
      //   console.log("Hi");
      // });

      shithole.isShithole(req.query.country, function(data) {

        var result = {};

        if (req.query.country.toLowerCase() === "russia") {

          result.header = "да, I MEAN YES RUSSIA IS BEST COUNTRY";
          result.bodyApprehended = "Number of people apprehended 2007-2016: " + 0;
          result.tagApprehended = "Low";

          result.bodyImmigration = "Percentage of people who love Putin: " + 100 + "%";
          result.tagImmigration = "High";

          result.bodyGdp = "Country's Average GDP per captia 2007-2016: " + 1000000000000 + " USD";
          result.tagGdp = "High";

          result.body = "";

          res.render("pages/result", {
            title: 'Is Your Country A Shithole?',
            result: result
          });
        }

        result.decision = data.isShithole ? "Yes" : "No";

        if (result.decision === "Yes") {
          result.header = "Yes, Donald Trump thinks " + req.query.country + " is a \"shithole country\"!";
        } else {
          result.header = "No, Donald Trump doesn't think " + req.query.country + " is a \"shithole country\".";
        }

        if (req.query.country.toLowerCase() === "china") {
          result.header = "No, Donald Trump loves " + req.query.country + "!";
        }

        result.bodyApprehended = "Number of people apprehended 2007-2016: " + data.apprehended;
        result.tagApprehended = data.apprehendedTag;

        result.bodyImmigration = "Number of people who entered the country 2007-2016: " + data.total;
        result.tagImmigration = data.totalTag;

        result.bodyGdp = "Country's Average GDP per captia 2007-2016: " + data.gdp + " USD";
        result.tagGdp = data.gdpTag;

        result.body = "";

        res.render("pages/result", {
          title: 'Is Your Country A Shithole?',
          result: result
        });
      });
    } else {
      res.render('pages/index', {
        title: 'Is Your Country A Shithole?'
      });
    }
});

router.use('/heatmap', function(req, res, next) {

  var c = "Cuba";

  res.render('pages/heatmap', {
    title: 'Is Your Country A Shithole?',
    gb: shithole.isShithole(c, function(data) {
      console.log(c + " " + data.eval);
      return data.eval;
    }),
  });
});

module.exports = router;
