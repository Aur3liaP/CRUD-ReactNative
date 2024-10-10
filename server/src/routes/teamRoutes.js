import express from 'express';
import * as TeamControllers from '../controllers/teamControllers.js';

const router = express.Router();

// Définition des routes
router.get("/", TeamControllers.readAllTeam); 
router.put("/:id", TeamControllers.updatePokemon);
router.post("/", (req, res, next) => {
    console.log("Received POST request to add a Pokémon:", req.body);
    next(); 
}, TeamControllers.addTeam);
router.delete("/:id", TeamControllers.deleteTeam);

export default router;
