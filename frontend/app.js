import httpLibrary from "./httpLibrary.js"

const client = new httpLibrary("http://localhost:5000")


const textArea = document.getElementById("output")
const get = document.getElementById("Get")
const update = document.getElementById("Update")





 get.addEventListener('click', async function(e){
    e.preventDefault()
    let res = await  client.get('/read')

    
    const lines = res.items;
    for(const item of lines){

        textArea.innerHTML += item +"\n"

    }


    
})


update.addEventListener('click', async function (event) {
     event.preventDefault();
     
    

    const values = textArea.value;
    const lines = values.split("\n")

    try{
        const response = await client.post("/write", {content: lines});
        console.log("Post success:", response);
    }catch(error){
        console.error("Error posting data:", error);
    }
    
})



