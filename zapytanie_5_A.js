db.people.aggregate([
    { $unwind: "$credit" },
    { $match: { $and: [{ nationality: "Poland" }, { sex: "Female" }] } },
    { $group: { _id: "$credit.currency", total: { $sum: { $toDouble: "$credit.balance" } }, average: { $avg: { $toDouble: "$credit.balance" } } } }
]);
