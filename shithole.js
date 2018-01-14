var fs = require('fs');
var csv = require('fast-csv');

var shithole = {};

shithole.parseCSV = function(inputFile, data) {
    var stream = fs.createReadStream(inputFile);
    var csvData = {};

    var csvStream = csv()
    .on("data", function(data) {
        var i = 0;
        csvData[data[0]] = data.slice(1);
        csvData[data[0]].forEach(element => {
            csvData[data[0]][i++] = element.replace(/,/g, "");
        });
    })
    .on("end", function() {
        data(csvData);
    });

    stream.pipe(csvStream);
}

shithole.eval = function(country, result) {
    var myCountry = {};
    var apprehended, population;
    var total;
    var gdp, exchange, life;

    shithole.parseCSV("data/life.csv", function(data) {
        life = data;
    });

    shithole.parseCSV("data/gdp.csv", function(data) {
        gdp = data;
    });

    shithole.parseCSV("data/exchange.csv", function(data) {
        exchange = data;
    });

    shithole.parseCSV("data/table34.csv", function(data) {
        apprehended = data;
    });

    shithole.parseCSV("data/population.csv", function(data) {
        population = data;
    });

    shithole.parseCSV("data/table3.csv", function(data) {
        total = data;
        var gdpMax = scale(gdp);
        gdp = average(gdp);
        exchange = average(exchange);
        life = average(life);

        if (Object.keys(apprehended).includes(country)
        && Object.keys(total).includes(country)) {
            var gdpMod = gdpMax / Math.pow(gdp[country], 1);

            myCountry.apprehended = apprehended[country].reduce(sum, gdpMod);
            myCountry.total = total[country].reduce(sum);
            myCountry.gdp = gdp[country];

            myCountry.preRatio = myCountry.apprehended / myCountry.total;
            myCountry.diff = myCountry.total - myCountry.apprehended;
            console.log("Ratio boi:\t" + myCountry.preRatio);

            myCountry.eval = (Math.pow(myCountry.apprehended, 2) / myCountry.total)
                + (gdpMod / (myCountry.diff * life[country] * gdp[country]));
                /* * (myCountry.preRatio / gdpMod) * 100
                + ((1 / (gdp[country] * Math.pow(life[country] - 18, 1)))))
                * (gdpMod / exchange[country]); */
            console.log(country + " eval:\t" + myCountry.eval);
            console.log(country + " average GDP:\t" + gdp[country]);

            result(myCountry);
        }
    });

    function sum(num, current) {
        if (isNaN(num)) parseInt(current);
        else return parseInt(num) + parseInt(current);
    }

    function average(csv) {
        var leaky = scale(csv) * 0.25;
        Object.keys(csv).forEach(key => {
            var average = csv[key].reduce(sum, 0) / csv[key].length;
            csv[key] = (average == 0) ? leaky : average;
            // console.log(csv[key]);
        });

        return csv;
    }

    function scale(csv) {
        var maximum = 0;
        Object.keys(csv).forEach(key => {
            csv[key].forEach(value => {
                if (value > maximum) maximum = value;
            });
        });

        return maximum;
    }
}

shithole.baseline = function(result) {
    shithole.eval("Haiti", function(data) {
        result(data);
    });
}

shithole.isShithole = function(country, result) {
    shithole.eval(country, function(data) {
        var myCountry = data;
        shithole.baseline(function(haiti) {
            var isShithole = myCountry.eval >= haiti.eval;
            var shitholeData = {
              isShithole : isShithole,
              apprehended : myCountry.apprehended,
              apprehendedTag : (myCountry.apprehended >= haiti.apprehended) ? "High" : "Low",
              total : myCountry.total,
              totalTag : (myCountry.total >= haiti.total) ? "High" : "Low",
              gdp : myCountry.gdp,
              gdpTag : (myCountry.gdp > haiti.gdp) ? "High" : "Low"
            }
            result(shitholeData);
        });
    });
}

shithole.allShitholes = function(result) {
    shithole.parseCSV("data/table3.csv", async function(data) {
        var names = Object.keys(data).splice(1);
        var shitholes = [];
        names.forEach(name => {
            shithole.isShithole(name, function(result) {
                if (result) shitholes.push(name);
            });
        });
        await sleep(1000);
        result(shitholes);
    })

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = shithole;
