const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bookingcare', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully');
    } catch (e) {
        console.error('Unable to connect to the DB: ', e);
    }
}

module.exports = connectDB;