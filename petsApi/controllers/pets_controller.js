import models from "../models/index.js";

export async function getPets(req, res) {
  try {
    const pets = await models.Pet.findAll({});
    if (pets) {
      res.status(200).json({
        pets: pets,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

export async function getOnePet(req, res) {
  const { id } = req.params;
  try {
    const pet = await models.Pet.findOne({
      where: {
        id: id,
      },
    });

    if (pet) {
      res.status(200).json({
        pet: pet,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

export async function createPet(req, res) {
  const { name, age, gender, pet_type } = req.body;
  try {
    const newPet = await models.Pet.create({
      name,
      age,
      gender,
      pet_type,
    });

    if (newPet) {
      res.status(200).json({
        pet: newPet,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

export async function updatePet(req, res) {
  const { id } = req.params;
  const { name, age, gender, pet_type } = req.body;
  try {
    const pet = await models.Pet.findOne({
      where: {
        id: id,
      },
    });

    if (!pet) {
      return res.status(404).json({
        message: `The pet with the id ${id} was not found`,
      });
    }

    const updatedPet = await models.Pet.update(
      {
        name: name,
        age: age,
        gender: gender,
        pet_type: pet_type,
      },
      {
        where: {
          id: id,
        },
      }
    );
    console.table(updatePet);

    if (!updatedPet) {
      return res.status(500).json({
        message: "There was an error updating the pet",
      });
    }

    res.status(200).json({
      message: "Updated correctly",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

export async function deletePet(req, res) {
  const { id } = req.params;
  try {
    const pet = await models.Pet.findOne({
      where: {
        id: id,
      },
    });

    if (!pet) {
      return res.status(404).json({
        message: `The pet with the id ${id} was not found`,
      });
    }

    const petDeleted = await models.Pet.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      message: `The pet with the id ${id} was deleted`,
    });
  } catch (error) {
    res.status(500).json({
      message: "There was an error deleting the pet",
      error: error.message,
    });
  }
}
