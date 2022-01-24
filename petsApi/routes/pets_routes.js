import { Router } from "express";
import {
  getPets,
  getOnePet,
  createPet,
  updatePet,
  deletePet,
} from "../controllers/pets_controller";

const router = Router();

router.get("/pets", getPets);
router.get("/pets/:id", getOnePet);
router.post("/pets/create", createPet);
router.put("/pets/update/:id", updatePet);
router.delete("/pets/delete/:id", deletePet);

export default router;
