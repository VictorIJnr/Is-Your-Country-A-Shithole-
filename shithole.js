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

    shithole.parseCSV("data/table34.csv", function(data) {
        apprehended = data;
    });
    
    shithole.parseCSV("data/table3.csv", function(data) {
        total = data;
        
        if (Object.keys(apprehended).includes(country)
            && Object.keys(total).includes(country)) {
                myCountry.apprehended = apprehended[country].reduce(sum, 0);
                myCountry.total = total[country].reduce(sum);
                myCountry.eval = myCountry.apprehended / myCountry.total;
        
                result(myCountry);
        }
    });

    function sum(num1, num2) {
        return parseInt(num1) + parseInt(num2);
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