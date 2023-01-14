require('dotenv').config()
const PORT = process.env.PORT || 3000
const app = require("./app/app")

app.listen(PORT, ()=>console.log(`http://localhost:${PORT}`))