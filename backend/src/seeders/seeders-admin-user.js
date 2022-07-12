'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      password: '123123',
      firstName: 'Nguyen Duong',
      lastName: 'Long',
      address: 'HCM',
      phoneNumber: '0934072724',
      gender: 1,
      roleId: DataTypes.STRINGm,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
