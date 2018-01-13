var fs = require('fs');
var csv = require('fast-csv');

function parseCSV(inputFile, data) {
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

function eval(country, result) {
    var myCountry = {};
    var apprehended;
    var total;

    parseCSV("data/table34.csv", function(data) {
        apprehended = data;
    });
    
    parseCSV("data/table3.csv", function(data) {
        total = data;
        
        myCountry.apprehended = apprehended[country].reduce(sum, 0);
        myCountry.total = total[country].reduce(sum);
        myCountry.eval = myCountry.apprehended / myCountry.total;

        result(myCountry);
    });
}

function baseline() {
    var haiti = {};

    eval("Haiti", function(data) {
        haiti = data;
        console.log(haiti);
    });
}

function sum(num1, num2) {
    return parseInt(num1) + parseInt(num2);

str = str.replace(/,/g, "");
}

baseline();