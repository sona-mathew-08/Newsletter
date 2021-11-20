const express= require("express");
const bodyParser= require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");

});



app.post("/",function(req,res){
    const firstName= req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    
    const data={
        members: [
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME : firstName,
                    LNAME : lastName

                }
            }
        ]
    }

    const jsonData =JSON.stringify(data);
    const url="https://us5.api.mailchimp.com/3.0/lists/25d79926a7";

    const options={
        method:"POST",
        auth: "sona:57ef04bcc62fb4abf0b850b894b9541a-us5"
    }

    const request = https.request(url,options, function(response){

        if(response.statusCode===200){
            res.sendFile(__dirname+ "/success.html");
        }
        else{
            res.sendFile(__dirname+ "/failure.html");
        }


        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

});



app.post("/failure",function(req,res){
    res.redirect("/")
})







app.listen(3000, function(){
    console.log("Server started on port 3000");
})


// api key
// 57ef04bcc62fb4abf0b850b894b9541a-us5

// list id 
// 25d79926a7