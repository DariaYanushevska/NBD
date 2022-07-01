nbd> db.people.aggregate([ { "$unwind": "$credit" }, {$group:{_id:"$credit.currency", sum:{$sum:{$toDouble:"$credit.balance"}}}}])
