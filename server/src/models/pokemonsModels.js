import { db } from "../utils/db.js";

export const Pokemon = {

    create : (pokemon) => {
        const {pokedex_number, name, type1, type2, hp, attack, defense, special_attack, special_defense, speed, image_url} = pokemon;
        const query = "INSERT INTO pokemons (pokedex_number, name, type1, type2, hp, attack, defense, special_attack, special_defense, speed, image_url, isFavorite) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)"
        const params = [pokedex_number, name, type1, type2, hp, attack, defense, special_attack, special_defense, speed, image_url]

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

    updateFavorite: (id) => {
        const query = "UPDATE pokemons SET isFavorite = 1 WHERE id = ?"
        const params = [id]
    
        return new Promise((resolve, reject) => {
            db.run(query, params, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve({ message: `Pokemon with id ${id} was successfully updated as favorite` })
                }
            })
        })
    },
    
    update: (id, pokemon) => {
        const fields = Object.keys(pokemon).filter(
            (key) => pokemon[key] !== undefined && pokemon[key] !== null
        );
        const setClause = fields.map((field) => `${field} = ?`).join(", ");
        const fullSetClause = setClause + ", isFavorite = 1";
        const values = fields.map((field) => pokemon[field]);
        values.push(id);
    
        const query = `UPDATE pokemons SET ${fullSetClause} WHERE id = ?`;
        return new Promise((resolve, reject) => {
            db.run(query, values, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(pokemon);
                }
            });
        });
    },
    

    delete: (id) => {
        const query = "DELETE FROM pokemons WHERE id=?"
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