nbd> var mapFunctionF = function () {var key = this.sex; var value = { count: 1, height: this.height, weight: this.weight }; emit(key, value); };

nbd> var reduceFunctionF = function (keys, values) { reducedVal = { count: 0, height: 0, weight: 0 }; for (var idx = 0; idx < values.length; idx++) { reducedVal.count += values[idx].count; reducedVal.height += values[idx].height; reducedVal.weight += values[idx].weight; } return reducedVal; };

nbd> var finalizeFunctionF = function (key, reduceVal) { reduceVal.avgH = reduceVal.height / reduceVal.count; reduceVal.avgW = reduceVal.weight / reduceVal.count; return reduceVal; };

nbd> db.people.mapReduce(mapFunctionF, reduceFunctionF, { out: "map_reduceF", finalize: finalizeFunctionF })
{ result: 'map_reduceF', ok: 1 }

