const db = require("../models");
const Office = db.offices;
const Staff = db.staff;
const Op = db.Sequelize.Op;

// Create and Save a new Office Space
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create an Office Space
    const office = {
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
        capacity: req.body.capacity,
        color: req.body.color
    }

    // Save Office Space in the database
    Office.create(office)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the office space."
            });
        });
};

// Retrieve all Office Spaces from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    let condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
    let result = {}

    Office.findAll({ where: condition })
        .then(data => {
            result.office = data;

            Staff.findAndCountAll({ where: {officeId: data.id} })
                .then(data => {
                    result.staff = data;
                    res.push(result);
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                        err.message || "Some error occurred while retrieving staff members."
                    });
                });
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving office spaces."
            });
        });
};

// Find a single Office Space by the id in the request
exports.findOne = (req, res) => {
    const id = req.params.id;

    Office.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving office space with id=" + id
            });
        });
};

// Update a Office Space by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Office.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Office space was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update office space with id=${id}. Maybe office space was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating office space with id=" + id
            });
        });
};

// Delete an Office Space with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Office.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Office space was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete office space with id=${id}. Maybe office space was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete office space with id=" + id
            });
        });
};

// Delete all Office Spaces from the database.
exports.deleteAll = (req, res) => {
    Office.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} office spaces were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while removing all office spaces."
            });
        });
};