"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Appointment.init(
    {
      owner_id: DataTypes.INTEGER,
      pet_id: DataTypes.INTEGER,
      vet_id: DataTypes.INTEGER,
      appointment_date: DataTypes.DATE,
      appointment_hour: DataTypes.DATE,
      appointment_reason: DataTypes.STRING,
      appointment_observ: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Appointment",
    }
  );
  return Appointment;
};
