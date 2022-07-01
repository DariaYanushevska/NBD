var mapFunction5 = function () {
    var credits = this.credit;
    for (var idx = 0; idx < credits.length; idx++) {
        var key = credits[idx].currency;
        var value = { count: 1, balance: parseFloat(credits[idx].balance) };
        emit(key, value);
    }
};

var reduceFunction5 = function (keys, values) {
    var reducedVal = { count: 0, total: 0 };
    for (var idx = 0; idx < values.length; idx++) {
        reducedVal.count += values[idx].count;
        reducedVal.total += values[idx].balance;
    }
    return reducedVal;
};

var finalizeFunction5 = function (key, reduceVal) { 
    var finalVal = { total: reduceVal.total }; 
    finalVal.average = reduceVal.total / reduceVal.count; 
    return finalVal; 
};

db.people.mapReduce(mapFunction5, reduceFunction5, { out: "map_reduce5", query: { nationality: "Poland", sex: "Female" }, finalize: finalizeFunction5 });