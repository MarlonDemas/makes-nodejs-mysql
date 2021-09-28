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

    return Office;
};