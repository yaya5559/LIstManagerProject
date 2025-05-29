const express = require("express")
const fs = require('fs')
const Port = 5000;
const cors = require("cors")

const app = express()


app.use(express.json())

const corsoption = {
    origin : "http://127.0.0.1:5500"

}

app.use(cors(corsoption))





app.get('/read', (req, res) =>{
    

    fs.readFile('data.txt', 'utf8', (err, data) => {
        if(err){
            return res.status(500).send('Error reading file');

        }

        const lines = data.split('\n');
        
        res.json({items: lines})
    })
})


app.post('/write', (req, res)=>{
    
    
    const Content = req.body.content;
    
    if (!Array.isArray(Content)) {
        return res.status(400).send('Content must be an array');
    }
    

    fs.writeFile('data.txt', '', 'utf8', (err) => {
        if (err) {
            return res.status(500).send('Error clearing file');
        }

        const dataToWrite = Content.join('\n');

        fs.writeFile('data.txt', dataToWrite, 'utf8', (err) =>{
            if(err){
                return res.status(500).send('Error writing file');
            }

            res.json({message:'Data written successfully'});
        });
        
    })

})

app.listen(Port, ()=>{console.log(`Server running on ${Port}`)})
