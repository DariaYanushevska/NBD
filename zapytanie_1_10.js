db.people.updateMany({"job": "Editor"}, {$unset:{"email":""}})



db.people.findOne({"job": "Editor"})
