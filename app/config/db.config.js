module.exports = {
    HOST: 'us-cdbr-east-04.cleardb.com',
    USER: "b474edca8f5e69",
    PASSWORD: "d498c9d1",
    DB: "heroku_050e1ea318114b7",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        aquire: 30000,
        idle: 10000
    }
};