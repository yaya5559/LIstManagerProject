const express = require("express")
const fs = require('fs')
const Port = 5000;

const app = express()


app.use(express.json())


app.get('/wead', (req, res) =>{
    fs.readFile('data.txt', 'utf8', (err, data) => {
        if(err){
            return res.status(500).send('Error reading file');

        }

        const lines = data.split('\n');
        res.json({items: lines})
    })
})


app.post('/write', (req, res)=>{
    const Content = req.body.Content;
    fs.writeFile('data.txt', Content, 'utf8', (err) =>{
        if(err){
            
            return res.status(500).send('Error reading file')
            
        }
        res.json({Message:'data written' });
    })

})

app.listen(Port, ()=>{console.log(`Server running on ${Port}`)})
