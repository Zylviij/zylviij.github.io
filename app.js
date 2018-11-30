

// Library Imports
const express = require('express')

// Express
const app = express()
const port = 2999

app.get('/christmas', (req, res) => res.redirect('/christmas.html'))
app.use('/public', express.static(__dirname + '/public'))
app.use('/', express.static(__dirname + '/'))

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`)
})
