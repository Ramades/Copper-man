const port = 880;
const express = require('express')

const app = express()

app.use(express.static(__dirname + '/'));

app.listen(port,function(){
    console.log('Server is running on port: ' + port)
})
