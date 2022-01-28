import { Router } from "express";
import {
  getPets,
  getOnePet,
  getPetByOwner,
  createPet,
  updatePet,
  deletePet,
  deletePetByOwner,
} from "../controllers/pets_controller";

const router = Router();

router.get("/pets", getPets);
router.get("/pets/:id", getOnePet);
router.get("/pets/owner/:owner_id", getPetByOwner);
router.post("/pets/create", createPet);
router.put("/pets/update/:id", updatePet);
router.delete("/pets/delete/:id", deletePet);
router.delete("/pets/delete/owner/:owner_id", deletePetByOwner);

export default router;
