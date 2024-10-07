require("dotenv").config()
const app = require("./src/app")

app.listen(4242, (err) => {
    if (err){
        console.error(err);
    } else {
        console.log(`server adress : http://localhost:4242`)
    }
})