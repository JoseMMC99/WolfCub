import { Router } from "express";
import {
  getAppointments,
  getOneAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointment_controller.js";

import { isAdmin, belongsToUser } from "../middlewares/authJwt";

const router = Router();

router.get("appointments", isAdmin, getAppointments);
router.get("appointments/:id", belongsToUser, getOneAppointment);
router.post("appointments/create", isAdmin, createAppointment);
router.put("appointments/update/:id", isAdmin, updateAppointment);
router.delete("appointments/delete/:id", isAdmin, deleteAppointment);
