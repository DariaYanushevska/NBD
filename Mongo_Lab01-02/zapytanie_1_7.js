nbd> db.people.updateMany({}, [{$set: { height: { $toDouble: "$height" }}}]);

nbd> db.people.deleteMany({ "height": { "$gt": 190}})




