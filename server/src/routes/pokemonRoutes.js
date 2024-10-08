import * as PokemonsControllers from '../controllers/pokemonControllers.js';
import express from 'express';

const router = express.Router();

// Définition des routes
router.get("/", PokemonsControllers.readAllPokemon); 
router.put("/:id", PokemonsControllers.updatePokemonFavorite);
router.put("/:id", PokemonsControllers.updatePokemon);
router.post("/", PokemonsControllers.createPokemon); 
router.delete("/:id", PokemonsControllers.deletePokemon);

export default router;
