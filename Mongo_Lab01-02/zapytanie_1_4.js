db.people.updateMany({}, [{$set: { weight: { $toDouble: "$weight" }}}]);

db.people.findOne()

printjson(db.people.find({"weight":{"$gte":68, "$lt":71.5}}).toArray())