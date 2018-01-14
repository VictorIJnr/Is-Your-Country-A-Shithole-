var express = require("express");
var router = express.Router();
var request = require("request");
var shithole = require("../shithole");

router.get("/", function(req, res, next) {    
    if (req.query.country) {

        console.log("Country:\t" + req.query.country);
        var result = {};

        if (req.query.country.toLowerCase() === "united states of america" 
            || req.query.country.toLowerCase() === "america"
            || req.query.country.toLowerCase() === "usa") {
            var result = {
                header: "No, Donald Trump doesn't think " + req.query.country + " is a shithole. America is Great Again",
                body: 'America is Great Again'
            }
            res.render('pages/result', {
                title: 'Is Your Country A Shithole?',
                result: result
            });
        }

        shithole.isShithole(req.query.country, function(data) {
            result.decision = data.isShithole ? "Yes" : "No";
            if (result.decision === "Yes") {
                result.header = "Yes, Donald Trump thinks " + req.query.country + " is a Shithole!";
            } else {
                result.header = "No, Donald Trump doesn't think " + req.query.country + " is a Shithole.";
            }

            result.body = "Some facts about " + req.query.country;
            res.send(result);
        });
    } 
    else res.send({header: "You didn't enter a valid country."});
});

module.exports = router;