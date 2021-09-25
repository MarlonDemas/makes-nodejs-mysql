module.exports = app => {
    const offices = require("../controllers/office.controller.js");

    var router = require("express").Router();

    // Create a new Office Space
    router.post("/", offices.create);

    // Retrieve all Office Spaces
    router.get("/", offices.findAll);

    // Retrieve a single Office Space with id
    router.get("/:id", offices.findOne);

    // Update a Office Space with id
    router.put("/:id", offices.update);

    // Delete a Office Space with id
    router.delete("/:id", offices.delete);

    // Delete all Office Spaces
    router.delete("/", offices.deleteAll);

    app.use('/api/offices', router);
};