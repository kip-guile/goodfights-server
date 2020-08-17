const server = require('./api/server')
const port = process.env.PORT

server.listen(port, () => {
  console.log(`Server listening pon da http://localhost:${port}`)
})
