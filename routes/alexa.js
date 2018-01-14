var express = require("express");
var router = express.Router();
var request = require("request");
var shithole = require("../shithole");

router.get("/", function(req, res, next) {    
    if (req.query.country) {

        console.log("Country:\t" + req.query.country);
        var result = {};

        shithole.isShithole(req.query.country, function(data) {
        result.decision = data ? "Yes" : "No";
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