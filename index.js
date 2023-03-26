const mailchimp = require("@mailchimp/mailchimp_marketing"); //this is to be kept at top
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");




const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    
    res.sendFile(__dirname + "/signup.html");
});

mailchimp.setConfig({
    apiKey: "f0cbd5255ec5344872952c9fbbe990aa-us21",
    server: "us21",

});

app.post("/", function(req, res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const listId = "ed7275ca94";

    const subscribingUser = {
        firstName: firstName,
        lastName: lastName,
        email: email
    };

    async function run() {
        try{
            const response = await mailchimp.lists.addListMember(listId, {
                email_address: subscribingUser.email,
                status: "subscribed",
                merge_fields: {
                    FNAME: subscribingUser.firstName,
                    LNAME: subscribingUser.lastName
                }
              });
            res.sendFile(__dirname + "/success.html");
        }
        catch(error){
            console.log(error.status);
            res.sendFile(__dirname + "/failure.html");
        }
        
    };

    run();
});


app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.listen(3000, function(){
    console.log("Server is up and running in port 3000.");
})


// APIkey - f0cbd5255ec5344872952c9fbbe990aa-us21
// list or audience id - ed7275ca94