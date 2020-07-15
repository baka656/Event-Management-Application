const exp=require('express');
const app=exp();
const testRoute=require('./user-api');
const mc=require('mongodb').MongoClient;
const path=require('path');
var compression = require('compression');3
var helmet = require('helmet');
const cors = require('cors')

/*var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}*/

app.use(cors());
app.use(exp.static(path.join(__dirname,'./www')));

app.use(compression());
app.use(helmet());

app.use('/user',testRoute);

app.use((req,res,next)=>{
    res.send({message:`${req.url} is invalid!`});
});

var dbUrl="mongodb+srv://baka:ittop@cluster0-ebc9w.mongodb.net/ecficio?retryWrites=true&w=majority";
mc.connect(dbUrl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{
    if(err)
    {
        console.log("Err in db connect ",err);
    }
    else{
        app.locals.dbObject=client;
        console.log('connected to mongodb');
        app.listen(process.env.PORT || 8080,()=>{
            console.log("server listening on port ",process.env.PORT);
        });
    }
});



