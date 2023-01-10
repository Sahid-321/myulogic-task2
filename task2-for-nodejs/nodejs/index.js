const express= require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const reader = require('xlsx');
const mongoose = require("mongoose");
const { type } = require("os");
const PORT = 8000
mongoose.connect("mongodb+srv://user:sahidjamal@ecommerce.qxk5j1r.mongodb.net/?retryWrites=true&w=majority", ()=>{
    console.log("mongodb connected successfully");
})

const mongoSchema = mongoose.Schema({
    id:String,
    Name: String,
    Email: {
type:String,
unique:true
    },
    Mobile: Number,
    Salary: Number
})

const Post = mongoose.model("excel", mongoSchema)

app.use('/publicfiles', express.static(__dirname + '/publicfiles'));
app.use(cors({
    origin:"*"
}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended:true,   parameterLimit: 100000}));



app.get("/readexcelfile",(req,res)=>{
    let filename = req.query.filename;
    let data = []
    try {
        const file = reader.readFile('publicfiles/' + filename + ".xlsx");
        const sheetNames = file.SheetNames

        for(let i=0;i<sheetNames.length;i++) {
            const arr = reader.utils.sheet_to_json(
                file.Sheets[sheetNames[i]])
                arr.forEach((res)=> {
                    data.push(res)
                })
            
        }
        res.send(data)
        data.map((elem)=>{
          Post.insertMany({
            id: elem.id,
            Name: elem.Name,
            Email:elem.Email,
            Salary:elem.Salary
          })
         
        })

      
        
    } catch (err) {
        res.send(err)
        
    }

    
    
})


app.get('/get', (req,res)=>{
    Post.find()
    .then((data)=>res.json(data))
    .catch((err)=> console.log(err))
 })

 app.delete('/delete', (req, res) => {
    console.log("delete");
    Post.find()
        .then((item) => {
            for (var i = 0; i < item.length; i++) {

                Post.findByIdAndDelete({
                    _id: item[i]._id
                })
                    .then((doc) => console.log(doc))
                    .catch((err) => console.log(err))

            }
        }
        )

})
app.listen(PORT, function(){
    console.log("node app is runnig at port 8000");
})