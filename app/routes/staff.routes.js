module.exports = app => {
    const staff = require("../controllers/staff.controller.js");

    var router = require("express").Router();

    // Create a new Staff Member
    router.post("/", staff.create);

    // Retrieve all Staff Members in Office Space
    router.get("/:officeId", staff.findAndCountAll);

    // Retrieve a single Staff Member with id
    router.get("/:id", staff.findOne);

    // Update a Staff Member with id
    router.put("/:id", staff.update);

    // Delete a Staff Member with id
    router.delete("/:id", staff.delete);

    // Delete all Staff Members
    router.delete("/", staff.deleteAll);

    app.use('/api/staff', router);
};