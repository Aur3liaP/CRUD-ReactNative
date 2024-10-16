import express from 'express'
import cors from 'cors'
import {log} from './middlewares/log.js'
import { initDB } from './utils/db.js'
import "dotenv/config"
import PokemonRoutes from './routes/pokemonRoutes.js'
import TeamRoutes from './routes/teamRoutes.js';

const app = express()
const PORT = process.env.PORT || 3310

app.use(cors())
app.use(express.json())
app.use(log)

app.use("/api/pokemons", PokemonRoutes)
app.use("/api/team", TeamRoutes)

initDB()

app.listen(PORT, () => {
    console.info(`Server is running on port ${PORT}`)
})