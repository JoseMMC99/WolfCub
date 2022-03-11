import { Router } from "express";
import {
  getAppointments,
  getOneAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointment_controller.js";

const router = Router();

router.get("/appointments", getAppointments);
router.get("/appointments/:id", getOneAppointment);
router.post("/appointments/create", createAppointment);
router.put("/appointments/update/:id", updateAppointment);
router.delete("/appointments/delete/:id", deleteAppointment);

export default router;
