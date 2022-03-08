import models from "../models/index";
import axios from "axios";

export async function getAppointments(req, res) {
  try {
    const appointments = await models.Appointment.findAll();
    if (appointments) {
      res.status(200).json({
        appointments: appointments,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

export async function getOneAppointment(req, res) {
  try {
    const { id } = req.params;
    const appointment = await models.Appointment.findOne({
      where: {
        id: id,
      },
    });

    if (appointment) {
      res.status(200).json({
        appointment: appointment,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

export async function createAppointment(req, res) {
  const {
    owner_id,
    pet_id,
    vet_id,
    appointment_date,
    appointment_hour,
    appointment_reason,
    appointment_observ,
  } = req.body;
  try {
    const occupied_time = await models.Appointment.findOne({
      where: {
        appointment_date: appointment_date,
        appointment_hour: appointment_hour,
      },
    });

    if (occupied_time) {
      return res.status(200).json({
        message: "Sorry, that time is taken",
      });
    }

    const now_date = new Date();

    if (appointment_date < now_date || appointment_hour < now_date.getHours) {
      return res.status(200).json({
        message: "Not available time",
      });
    }

    const newAppointment = await models.Appointment.create({
      owner_id,
      pet_id,
      vet_id,
      appointment_date,
      appointment_hour,
      appointment_reason,
      appointment_observ,
    });

    if (newAppointment) {
      req.status(200).json({
        appointment: newAppointment,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

export async function updateAppointment(req, res) {
  const { id } = req.params;
  const {
    owner_id,
    pet_id,
    vet_id,
    appointment_date,
    appointment_hour,
    appointment_reason,
    appointment_observ,
  } = req.body;
  try {
    const appointment = await models.Appointment.findOne({
      where: {
        id: id,
      },
    });

    if (!appointment) {
      res.status(404).json({
        message: `The appointment with the id ${id} was not found`,
      });
    }

    const updateAppointment = await models.Appointment.update(
      {
        owner_id: owner_id,
        pet_id: pet_id,
        vet_id: vet_id,
        appointment_date: appointment_date,
        appointment_hour: appointment_hour,
        appointment_reason: appointment_reason,
        appointment_observ: appointment_observ,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (!updateAppointment) {
      return res.status(500).json({
        message: "There was an error updating the appointment",
      });
    }

    res.status(200).json({
      message: "Updated correctly",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

export async function deleteAppointment(req, res) {
  const { id } = req.params;
  try {
    const appointment = await models.Appointment.findOne({
      where: {
        id: id,
      },
    });

    if (!appointment) {
      res.status(404).json({
        message: `The appointment with the id ${id} was not found`,
      });
    }

    const appointmentDeleted = await models.Appointment.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      message: `The appointment with the id ${id} was not found`,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}
