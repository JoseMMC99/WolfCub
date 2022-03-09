"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Appointments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      owner_id: {
        type: Sequelize.INTEGER,
      },
      pet_id: {
        type: Sequelize.INTEGER,
      },
      vet_id: {
        type: Sequelize.INTEGER,
      },
      appointment_date: {
        type: Sequelize.DATE,
      },
      appointment_hour: {
        type: Sequelize.DATE,
      },
      appointment_reason: {
        type: Sequelize.STRING,
      },
      appointment_observ: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Appointments");
  },
};
