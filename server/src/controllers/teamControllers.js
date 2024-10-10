import { Team } from "../models/teamModels.js";

export const addTeam = async (req, res) => {
  console.log("Request Body:", req.body); // Log du corps de la requête

  if (!req.body || Object.keys(req.body).length === 0) {
      console.error("No data received in request body.");
      return res.status(400).json({ error: "No data provided" });
  }

  try {
      const newPokemon = await Team.create(req.body);
      console.log("New Pokémon added:", newPokemon); // Log du Pokémon ajouté
      res.status(201).json(newPokemon);
  } catch (err) {
      console.error("Error in addTeam:", err); // Log d'erreur
      res.status(500).json({ error: "Failed to add Pokémon" });
  }
};

export const readAllTeam = async (req, res) => {
  try {
    const pokemons = await Team.readAll(); 
    res.status(200).json(pokemons); 
  } catch (err) {
    res.status(500).json({ error: `Failed to load Pokemon: ${err.message}` }); 
  }
};

export const updatePokemon = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await Team.update(id, data);
    res
      .status(202)
      .send({ message: `Pokemon with id ${id} was successfully updated` });
  } catch (err) {
    res.status(500).json({ error: "Failed to update Pokemon" });
  }
};

export const deleteTeam = async (req, res) => {
  try {
    const id = req.params.id;
    await Team.delete(id);
    res.status(202).send(`Pokemon with id ${id} was successfully deleted`);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete Pokemon" });
  }
};
