
const express = require("express");
const path = require("path")
var useragent = require("useragent");
// const request = require("r")
const request = require("request")
const app = express();
const bodyParser = require("body-parser")
app.use(bodyParser.json({ limit: "900mb" }));
app.set('views',path.join(__dirname ,'views'));
app.use(bodyParser.urlencoded({ limit: "900mb", extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Request-Headers", "GET, PUT, POST, DELETE");
  next();
});
let PORT =  process.env.PORT || 3000
app.listen(PORT, function() {
    console.log(`listening to requests on port ${PORT}`);
    // connectDB();
  });
  app.use("/images", express.static("images"));
  app.set("view engine", "ejs");





app.get("/unsub", async (req, res) => {
  
  res.render("unsub.ejs", {
    
  });
})

app.get("/login", async (req, res) => {
  
    res.render("index.ejs", {
      
    });
  })

app.get("/success", async (req, res)=> {
    res.render("success.ejs", {
    
    });
})

app.get("/send-to-power", async (req, res)=> {
    const {phone, email} = req.query;
    try {
        let deba = await ACCESS_HOST(phone, email);
        console.log(deba)
        if(deba == 301){
            return res.json({
                success: true,
                msg: "You are now unsubscribed"
            })
        }
        res.json({
            success: true
        })
        
    } catch (error) {
            console.error(error)
        // await ACCESS_HOST(phone, email);
        res.status(error).json({
            success: false
        })
    }
})


async function ACCESS_HOST(phone,email) {
  return new Promise((resolve, reject) => {
    let options = {
      url: `http://localhost:1001/api/pingoptout?phone=${encodeURIComponent(phone)}&email=${encodeURIComponent(email)}`,
      method: "GET",

    };
    request(options, function(error, response, body) {
        // console.log(error, response.statusCode)
      // if (!error && response.statusCode == 200) {
      //   // console.log(body);
      //   resolve(body);
      // } else {
        if(response.statusCode === 200){
            
                resolve(body)
        } 
            else if(response.statusCode === 301){
                resolve(301)
            }
        else{
            reject(response.statusCode, body)
        }
    });
  });
}
