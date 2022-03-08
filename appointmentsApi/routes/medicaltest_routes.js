import { Router } from "express";
import {
  getMedicalTests,
  getOneMedicalTest,
  createMedicalTest,
  updateMedicalTest,
  deleteMedicalTest,
} from "../controllers/medicaltest_controller.js";

import { isAdmin } from "../middlewares/authJwt";

const router = Router();

router.get("medicalTest", isAdmin, getMedicalTests);
router.get("medicalTest/:id", isAdmin, getOneMedicalTest);
router.post("medicalTest/create", isAdmin, createMedicalTest);
router.put("medicalTest/update/:id", isAdmin, updateMedicalTest);
router.delete("medicalTest/delete/:id", isAdmin, deleteMedicalTest);
