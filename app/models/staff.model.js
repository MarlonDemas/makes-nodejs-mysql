module.exports = (sequelize, Sequelize) => {
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

    return Staff;
};