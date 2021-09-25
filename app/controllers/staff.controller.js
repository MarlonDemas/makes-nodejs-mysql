const db = require("../models");
const Staff = db.staff;
const Op = db.Sequelize.Op;

// Create and Save a new Staff
exports.create = (req, res) => {
    // Validate request
    if (!req.body.firstname) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create Staff
    const staff = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        avatar: req.body.avatar
    }

    // Save Staff in the database
    Staff.create(staff)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while adding the staff member."
            });
        });
};

// Retrieve all Staff from the database.
exports.findAll = (req, res) => {
    const firstname = req.query.firstname;
    const lastname = req.query.lastname;
    var condition = firstname ? { firstname: { [Op.like]: `%${firstname}%` } } : lastname ? { lastname: { [Op.like]: `%${lastname}%` } } : null;

    Staff.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving staff members."
            });
        });
};

// Find a single Staff Member by the id in the request
exports.findOne = (req, res) => {
    const id = req.params.id;

    Staff.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving staff member with id=" + id
            });
        });
};

// Update a Staff Member by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Staff.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Staff member was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update staff member with id=${id}. Maybe staff member was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating staff member with id=" + id
            });
        });
};

// Delete Staff Member with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Staff.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Staff member was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete staff member with id=${id}. Maybe staff member was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete staff member with id=" + id
            });
        });
};

// Delete all Staff Members from the database.
exports.deleteAll = (req, res) => {
    Staff.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} staff members were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while removing all staff members."
            });
        });
};