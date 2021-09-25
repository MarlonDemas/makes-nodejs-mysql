const db = require("../models");
const Staff = db.staff;

module.exports = (sequelize, Sequelize) => {
    const Office = sequelize.define("office", {
        name: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        capacity: {
            type: Sequelize.STRING
        },
        color: {
            type: Sequelize.STRING
        }
    });

    const Staff = sequelize.define("staff", {
        firstname: {
            type: Sequelize.STRING
        },
        lastname: {
            type: Sequelize.STRING
        },
        avatar: {
            type: Sequelize.STRING
        }
    });

    Office.hasMany(Staff, {as: 'Staff'});

    return Office;
};