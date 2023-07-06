const express = require('express');
const app = express();

require('dotenv').config()
const moviesRouter = require('./routes/moviesRouter')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/api/v1/movies', moviesRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`server running on port ${PORT} ....`)
})