import models from "../models/index";
import axios from "axios";

export async function getMedicalTests(req, res) {
  try {
    const medicalTest = await models.MedicalTest.findAll();
    if (medicalTest) {
      res.status(200).json({
        medicalTest: medicalTest,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

export async function getOneMedicalTest(req, res) {
  const { id } = req.params;
  try {
    const medicalTest = await models.MedicalTest.findOne({
      where: {
        id: id,
      },
    });

    if (medicalTest) {
      const petData = await axios.get(
        `http://localhost:8008/${medicalTest.pet_id}`
      );

      const ownerData = await axios.get(
        `http://localhost:3000/users/${petData.data.owner_id}`
      );
      res.status(200).json({
        medicalTest: medicalTest,
        pet: petData.data.pet,
        owner: ownerData.data.owner,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

export async function createMedicalTest(req, res) {
  const { pet_id, test_name, results, observations } = req.body;
  try {
    const newMedicalTest = await models.MedicalTest.create({
      pet_id,
      test_name,
      results,
      observations,
    });

    if (newMedicalTest) {
      res.status(200).json({
        medicalTest: newMedicalTest,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

export async function updateMedicalTest(req, res) {
  const { id } = req.params;
  const { pet_id, test_name, results, observations } = req.body;
  try {
    const medicalTest = await models.MedicalTest.findOne({
      where: {
        id: id,
      },
    });

    if (!medicalTest) {
      res.status(404).json({
        message: `The medical test with the id ${id} was not found`,
      });
    }

    const updateMedicalTest = await models.MedicalTest.update(
      {
        pet_id: pet_id,
        test_name: test_name,
        results: results,
        observations: observations,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (!updateMedicalTest) {
      return res.status(500).json({
        message: "There was an error updating the medical test",
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

export async function deleteMedicalTest(req, res) {
  const { id } = req.params;
  try {
    const medicalTest = await models.MedicalTest.findOne({
      where: {
        id: id,
      },
    });

    if (!medicalTest) {
      res.status(404).json({
        message: `The medical test with the id ${id} was not found`,
      });
    }

    const medicalTestDeleted = await models.MedicalTest.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      message: `The medical test with the id ${id} was deleted`,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}
