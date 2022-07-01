db.people.aggregate([
    {
        $project: {
            nationality: "$nationality",
            bmi: {
                $let: {
                    vars: {
                        ht2: { $pow: [{ $divide: ["$height", 100] }, 2] },
                        wt: "$weight"
                    },
                    in: { $divide: ["$$wt", "$$ht2"] }
                }
            }
        }
    },
    {
        $group: {
            _id: "$nationality",
            min_bmi: { $min: "$bmi" },
            max_bmi: { $max: "$bmi" },
            avg_bmi: { $avg: "$bmi" }
        }
    }
]);