// const express = require('express')
// const bodyParser = require('body-parser')
// const cors = require('cors')
// const { pool } = require('./db/index')

// const app = express()

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(cors())

// const getTest = (request, response) => {
//   pool.query('SELECT * FROM test', (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows)
//   })
// }

// app
//   .route('/test')
//   // GET endpoint
//   .get(getTest)

// // Start server
// app.listen(process.env.PORT || 3002, () => {
//   console.log(`Server listening`)
// })