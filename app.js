const express = require('express')
const path = require('path')
const { db } = require('./DB')
const PORT = 3000
const server = express()

server.set('view engine', 'hbs')
server.set('views', path.join(__dirname, 'src', 'views'))

server.use(express.urlencoded({extended: true}))

server.get('/', (req, res) => {
  const usersQuery = req.query
  let postForRender = db.addPost
  if (usersQuery.limit !== undefined && Number.isNaN(+usersQuery.limit) === false) {
    postForRender = db.addPost.slice(0, usersQuery.limit)
  }
  if (usersQuery.reverse === 'true') {
    postForRender = db.addPost.reverse()
  }
  if (((usersQuery.limit !== undefined && Number.isNaN(+usersQuery.limit) === false) && usersQuery.reverse) === 'true') {
    postForRender = db.addPost.slice(0, usersQuery.limit).reverse()
  }
  res.render('main', { listOfPosts: postForRender })
})

server.post('/photobank', (req, res) => {
  const dataFromForm = req.body
  db.addPost.push(dataFromForm)
  res.redirect('/')
})

server.get('*', (req, res) => {
  res.send(`<div>
  <h1>404</h1>
  <a href = '/'>Link to main page</a>
  </div>`)
})

server.listen(PORT, () => {
    console.log(`Server has been started on port: ${PORT}`)
})