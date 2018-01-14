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
    var apprehended;
    var total;
    var gdp;

    shithole.parseCSV("data/gdp.csv", function(data) {
        gdp = data;
    });

    shithole.parseCSV("data/table34.csv", function(data) {
        apprehended = data;
    });
    
    shithole.parseCSV("data/table3.csv", function(data) {
        total = data;
        var gdpMax = scale(gdp);
        gdp = average(gdp);
        
        if (Object.keys(apprehended).includes(country)
        && Object.keys(total).includes(country)) {
                var gdpMod = gdpMax / gdp[country];

                myCountry.apprehended = apprehended[country].reduce(sum, 0);
                myCountry.total = total[country].reduce(sum);

                myCountry.eval = myCountry.apprehended / myCountry.total * (1 + gdpMod);

                console.log(country + " eval:\t" + myCountry.eval);
                console.log(country + " average GDP:\t" + gdp[country] + "\n\n\n");
                
                result(myCountry);
        }
    });

    function sum(num, current) {
        if (isNaN(num)) return parseInt(current);
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
            result(isShithole);
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