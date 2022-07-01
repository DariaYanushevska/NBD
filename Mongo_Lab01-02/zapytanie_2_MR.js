nbd> var mapFunction2 = function () { var credits = this.credit; for (var idx = 0; idx < credits.length; idx++) { var key = credits[idx].currency; var value = parseFloat(credits[idx].balance); emit(key, value); } };

nbd> var reduceFunction2 = function (keys, values) { return Array.sum(values); };

nbd> db.people.mapReduce(mapFunction2, reduceFunction2, { out: "map_reduce2"})
{ result: 'map_reduce2', ok: 1 }
