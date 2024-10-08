import { Pokemon } from "../models/pokemonsModels.js";


export const createPokemon = async (req, res) => {
    try {
        const newPokemon = await Pokemon.create(req.body)
        res.status(201).json(newPokemon)
    } catch (err) {
        res.status(500).json({error : 'Faild to create Pokemon'})
    }
}

export const readAllPokemon = async (req, res) => {
    try {
        const Pokemons = await Pokemon.readAll()
        res.status(200).json(Pokemons)
    } catch (err) {
        res.status(500).json({error : 'Failed to load Pokemon'})
    }
}

export const updatePokemonFavorite = async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        await Pokemon.updateFavorite(id, data)
        res.status(202).send(`Pokemon with id ${id} was successfully updated`)
    } catch (err) {
        res.status(500).json({error : 'Failed to update Pokemon'})
    }
}

export const updatePokemon = async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        await Pokemon.update(id, data)
        res.status(202).send(`Pokemon with id ${id} was successfully updated`)
    } catch (err) {
        res.status(500).json({error : 'Failed to update Pokemon'})
    }
}

export const deletePokemon = async (req, res) => {
    try {
        const id = req.params.id
        await Pokemon.delete(id)
        res.status(202).send(`Pokemon with id ${id} was successfully deleted`)
    } catch (err) {
        res.status(500).json({error : 'Failed to delete Pokemon'})
    }
}




