import { db } from "../utils/db.js";

export const Team = {
  create: (pokemon) => {
    const { pokedex_number, name, type1, type2, hp, attack, defense, special_attack, special_defense, speed, image_url, description } = pokemon;

    const query = "INSERT INTO team (`pokedex_number`, `name`, `type1`, `type2`, `hp`, `attack`, `defense`, `special_attack`, `special_defense`, `speed`, `image_url`, `level`, `description`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)";
    const params = [pokedex_number, name, type1, type2, hp, attack, defense, special_attack, special_defense, speed, image_url, description];

    console.log("Query:", query);
    console.log("Parameters:", params); // Log des paramètres

    return new Promise((resolve, reject) => {
        db.run(query, params, function (err) {
            if (err) {
                console.error("Database error:", err); // Log d'erreur
                reject(err);
            } else {
                console.log("Inserted Pokémon with id:", this.lastID); // ID du dernier Pokémon inséré
                resolve(pokemon);
            }
        });
    });
},



  readAll: () => {
    const query = "SELECT * FROM team";
    console.log("Executing query:", query);
    const params = [];

    return new Promise((resolve, reject) => {
      db.all(query, params, (err, rows) => {
        if (err) {
          console.error("Database error:", err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  update: (id, pokemon) => {
    const fields = Object.keys(pokemon).filter(
      (key) => pokemon[key] !== undefined && pokemon[key] !== null
    );
    const setClause = fields.map((field) => `${field} = ?`).join(", ");
    const values = fields.map((field) => pokemon[field]);
    values.push(id);

    const query = `UPDATE team SET ${setClause} WHERE id = ?`;
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
    const query = "DELETE FROM team WHERE id=?";
    const params = [id];

    return new Promise((resolve, reject) => {
      db.run(query, params, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },
};
