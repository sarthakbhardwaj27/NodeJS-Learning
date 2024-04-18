const http = require('http')
const fs = require('fs')

const server = http.createServer((req,res)=>{
  // console.log(req.socket.remoteAddress);
  const clientAddress = req.socket.remoteAddress
  const logDetails = `Client Address -> ${clientAddress} logged @ ${Date.now()} \n`
  // console.log(logDetails)
  fs.appendFile('./log.txt', logDetails, (err,data)=>{
    if(err) console.log(err)
    else console.log(`log appended`)
  })
})

server.listen(8000, ()=>{
  console.log(`listening on port 8000`)
})