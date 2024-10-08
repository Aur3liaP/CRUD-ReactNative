import { db } from "../utils/db.js";

export const Pokemon = {

    create : (pokemon) => {
        const {pokedex_number, name, type1, type2, hp, attack, defense, special_attack, special_defense, speed, image_url, isFavorite} = pokemon;
        const query = "INSERT INTO pokemons (pokedex_number, name, type1, type2, hp, attack, defense, special_attack, special_defense, speed, image_url, isFavorite) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        const params = [pokedex_number, name, type1, type2, hp, attack, defense, special_attack, special_defense, speed, image_url, isFavorite]

        return new Promise ((resolve, reject) => {
            db.run(query, params, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(pokemon)
                }
            })
        })
    },

    readAll: () => {
        const query = "SELECT * FROM pokemons"
        const params = []

        return new Promise ((resolve, reject) => {
            db.all(query, params, (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
        
    },

    updateFavorite : (id, pokemon) => {
        const query = "UPDATE pokemon SET isfavorite = ?"
        const params = [pokemon.isFavorite, id]

        return new Promise ((resolve, reject) => {
            db.run(query, params, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(pokemon)
                }
            })
        })
    },
    
    update : (id, pokemon) => {
        const {pokedex_number, name, type1, type2, hp, attack, defense, special_attack, special_defense, speed, image_url} = pokemon;
        const query = "UPDATE pokemon SET const pokedex_number = ? , name = ? , type1 = ? , type2 = ? , hp = ? , attack = ? , defense = ? , special_attack = ? , special_defense = ? , speed = ? , image_url = ? , isFavorite = 1"
        const params = [pokedex_number, name, type1, type2, hp, attack, defense, special_attack, special_defense, speed, image_url, id]

        return new Promise ((resolve, reject) => {
            db.run(query, params, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(pokemon)
                }
            })
        })
    },

    delete: (id) => {
        const query = "DELETE FROM products WHERE id=?"
        const params = [id]

        return new Promise ((resolve, reject) => {
            db.run(query, params, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

}