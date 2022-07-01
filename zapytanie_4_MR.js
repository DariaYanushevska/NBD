var mapFunction4 = function () {
    var key = this.nationality;
    var bmi = this.weight / Math.pow((this.height / 100), 2);
    var value = { count: 1, bmi: bmi };
    emit(key, value);
};

var reduceFunction4 = function (keys, values) {
    var reducedVal = { count: 0, min_bmi: -1, max_bmi: -1, sum_bmi: 0 };
    for (var idx = 0; idx < values.length; idx++) {
        reducedVal.count += values[idx].count;
        reducedVal.sum_bmi += values[idx].bmi;
        if (reducedVal.min_bmi == -1 || reducedVal.min_bmi > values[idx].bmi) {
            reducedVal.min_bmi = values[idx].bmi;
        }
        if (reducedVal.max_bmi == -1 || reducedVal.max_bmi < values[idx].bmi) {
            reducedVal.max_bmi = values[idx].bmi;
        }
    }
    return reducedVal;
};

var finalizeFunction4 = function (key, reduceVal) {
    var finalVal = { min_bmi: reduceVal.min_bmi, max_bmi: reduceVal.max_bmi };
    finalVal.avg_bmi = reduceVal.sum_bmi / reduceVal.count;
    return finalVal;
};

db.people.mapReduce(mapFunction4, reduceFunction4, { out: "map_reduce4", finalize: finalizeFunction4 });