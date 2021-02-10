const express = require('express');
const app = express();
const path = require('path');
const socketIO = require('socket.io');
const cors = require('cors');

// const options = {
//     origin: "http://localhost:3000"
// }

app.use(cors());

// app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/grupo1', express.static(path.join(__dirname, 'public')))
app.use('/grupo2', express.static(path.join(__dirname, 'public')))


const server = app.listen(3000, ()=>{
    console.log("Running Index.js");
})

const messages = {grupo1:[], grupo2:[]}

const io = socketIO(server);

const grupo1 = io.of('/grupo1').on('connection', (socket)=>{
    console.log('New connection')
    socket.emit('update_messages', messages.grupo1)

    socket.on('new_message', (data)=>{
        messages.grupo1.push(data);
        console.log(messages)
        grupo1.emit('update_messages', messages.grupo1)
    })
})
const grupo2 = io.of('/grupo2').on('connection', (socket)=>{
    console.log('New connection')
    socket.emit('update_messages', messages.grupo2)

    socket.on('new_message', (data)=>{
        messages.grupo2.push(data);
        console.log(messages)
        grupo2.emit('update_messages', messages.grupo2)
    })
})
    // io.on('connection', (socket)=>{
    //     console.log('New connection')
    //     socket.emit('update_messages', messages)
    
    //     socket.on('new_message', (data)=>{
    //         messages.push(data);
    //         console.log(messages)
    //         io.emit('update_messages', messages)
    //     })

    // })
