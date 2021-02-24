const server = require("http").createServer()
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
})

const PORT = process.env.PORT || 4000

io.on("connection", (socket) => {
  const { roomId } = socket.handshake.query

  socket.join(roomId)

  socket.on('newChatMessage', (data) => {
    io.in(roomId).emit('newChatMessage', data)
  })

  socket.on("disconnect", () => {
    socket.leave(roomId)
  })
})

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})