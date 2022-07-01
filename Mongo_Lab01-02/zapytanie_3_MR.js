nbd> var mapFunction3 = function () { var key = this.job; emit(key,1); }; 

nbd> var reduceFunction3= function (keys, values) { return Array.sum(values)};

nbd> db.people.mapReduce(mapFunction3, reduceFunction3, { out: "map_reduce3"})
{ result: 'map_reduce3', ok: 1 }

  