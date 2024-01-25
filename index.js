const express = require('express')
const app = express()
const port = 3000

const { initializeApp , cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");


var serviceAccount = require("./serviceAccountKey.json");

initializeApp({
    credential: cert(serviceAccount),
});

const db = getFirestore();

app.set('view engine', 'ejs');

app.get('/',function(req, res){
    res.sendFile(__dirname+"/dashboard.html");
});

app.get('/home', function(req, res) {
    res.sendFile(__dirname+"/home.html");
});

app.get('/signIn', function(req, res) {
    res.sendFile(__dirname+"/signIn.html");
});

app.get('/signUp', function(req, res){
    res.sendFile(__dirname+"/signUp.html");
});

app.get('/signinsubmit', (req, res) => {
    const email = req.query.email;
    const pwd = req.query.pwd;

    db.collection("users_ELearning")
    .where("email", "==",email)
    .where("pwd","==",pwd)
    .get()
    .then((docs)=>{
        if(docs.size > 0){
            res.sendFile(__dirname+"/home.html");
        }else{
            res.send("SignIn Failed");
        }
    });
});

app.get('/signupsubmit', (req, res) => {
    const first_name = req.query.fname;
    const last_name = req.query.lname;
    const email = req.query.email;
    const pwd = req.query.pwd;
    const dob = req.query.dob;
    const addr = req.query.address;
    const gender = req.query.inlineRadioOptions;
    const pin = req.query.pin;
    const course = req.query.course;

    //Adding new data to collection
db.collection('users_ELearning').add({
    name : first_name+" "+last_name,
    email : email,
    pwd : pwd,
    dobb :dob,
    addr : addr,
    gender : gender,
    pin : pin,
    course : course, 
}).then(()=>{
    res.sendFile(__dirname+"/home.html");
});
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});