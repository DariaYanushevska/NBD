db.people.updateMany({}, [{$set: { birth_date: { $toDate: "$birth_date" }}}])

printjson(db.people.find({ "birth_date": { "$gte": ISODate("2000-01-01T00:00:00.000Z")}}));
