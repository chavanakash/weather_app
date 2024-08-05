const express=require("express");
const https = require('https');
const {response}=require('express');
const bodyParser=require('body-parser');


const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
});

app.post('/',(req,res)=>{
    const query=req.body.cityName;
    const apiKey='6f15bcb63856f571b655480e2b513c51'
    const url='https://api.openweathermap.org/data/2.5/weather?q='+query +'&appid='+apiKey+'&units=metric'
    https.get(url,(response)=>{
        // console.log(response.statusCode);
        response.on('data',(data)=>{
            // console.log(data);
            const weatherData=JSON.parse(data);
            // console.log(weatherData);
            const Temp=weatherData.main.temp;
            const humid=weatherData.main.humidity;
            console.log(Temp);
            res.send("<h1>Temperature in "+query+" "+ Temp +" degree celcius</h1>");
            //we have to use RES.WRITE" TO SEND MORE THAN ON DATA TO FRONT END INSTEAD OF RES.SEND

        });
        
    });
});



app.listen(3000,()=>{
    console.log("app is running on port 3000");
});



    // res.send("server is running");*/
    
