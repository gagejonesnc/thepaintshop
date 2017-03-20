//---------------------------
//      Initialize
//---------------------------

var path = require("path"),
    express = require("express"),
    fs = require('fs'),
    logger = require("morgan"),
    nodemailer = require('nodemailer'),
    mg = require('nodemailer-mailgun-transport'),
    bodyParser = require('body-parser'),
    nconf = require('nconf'),
    auth = require('./config.json'),
    multer  = require('multer'),
    upload = multer(),
    app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/node_modules/uikit/dist"));
app.use(express.static(__dirname + "/node_modules/lightbox2/dist"));

// include client-side assets and use the bodyParser
app.use(express.static(__dirname + '/assets'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// log requests to stdout and also
// log HTTP requests to a file in combined format
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {
    flags: 'a'
});
app.use(logger('dev'));
app.use(logger('combined', {
    stream: accessLogStream
}));


// make a request app and create the server
var server = require('http').createServer(app);


//---------------------------
//      Routes
//---------------------------

app.get("/", function(req, res) {
    res.render("landing", {
        uikitcss: "css/uikit.css",
        customcss: "assets/css/main.css",
        uikitjs: "js/uikit.js",
        backgroundImage: "assets/images/conveyor-edit.jpg",
        isContact: false
    });
});

app.get("/about", function(req, res) {
    res.render("about", {
        uikitcss: "css/uikit.css",
        customcss: "assets/css/main.css",
        uikitjs: "js/uikit.js",
        isContact: false
    });
});

app.get("/contact", function(req, res) {
    res.render("contact", {
        uikitcss: "css/uikit.css",
        customcss: "assets/css/main.css",
        uikitjs: "js/uikit.js",
        isContact: true
    });
});

app.get("/shop", function(req, res) {
    res.render("shop", {
        uikitcss: "css/uikit.css",
        customcss: "assets/css/main.css",
        uikitjs: "js/uikit.js",
        isContact: false
    });
});

app.get("/work", function(req, res) {
    res.render("work", {
        uikitcss: "css/uikit.css",
        customcss: "assets/css/main.css",
        uikitjs: "js/uikit.js",
        isContact: false
    });
});

app.get("/services", function(req, res) {
    res.render("services", {
        uikitcss: "css/uikit.css",
        customcss: "assets/css/main.css",
        uikitjs: "js/uikit.js",
        isContact: false
    });
});

app.get("/error", function(req, res) {
    res.render("error", {
        uikitcss: "css/uikit.css",
        customcss: "assets/css/main.css",
        uikitjs: "js/uikit.js",
        isContact: false
    });
});

app.get("/thankyou", function(req, res) {
    res.render("thankyou", {
        uikitcss: "css/uikit.css",
        customcss: "assets/css/main.css",
        uikitjs: "js/uikit.js",
        isContact: false
    });
});

app.post("/contact", upload.array("attachments", 5), function(req, res) {
    var tmp = req.files;
    console.log("================================================================================================");
    console.log(tmp);
    console.log("================================================================================================");
    var attachments = [];
    //File down information in attachments to necessary information
    function createAttachments() {
        tmp.forEach(function(file) {
            attachments.push( {
                filename: file.originalname,
                content: file.buffer,
                contentType: file.mimetype
            });
        })
    }
    if(tmp !== undefined) {
        createAttachments();
    }

    var name = req.body.fname + " " + req.body.lname,
        cell = req.body.cell,
        desk = req.body.desk,
        email = req.body.email,
        company = req.body.organization,
        details = req.body.details,
        special = req.body.special,
        isQuote = ((req.body.request_quote === "on") ? true:false),
        isError = false;
    var message = "Hello,\n" +
                    "\nI am " + (isQuote ? "":"NOT ")  + "looking for a quote. Here is my information." +
                    "\nName: " + name +
                    "\nCell Phone: " + cell +
                    "\nDesk Phone: " + desk +
                    "\nEmail: " + email +
                    "\nCompany: " + ((company !== "") ? company:"N/A") +
                    "\nDetails: " + details +
                    "\nSpecial Instructions: " + special;
    if (company) {
        isError = true;
    }
    console.log('\nCONTACT FORM DATA: ' + name + ' ' + email + ' ' + details + '\n');

    // create transporter object capable of sending email using the default SMTP transport
    var transporter = nodemailer.createTransport(mg(auth));

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: '"TPS" <postmaster@thepaintshop.com>', // sender address
        to: 'chris@devchris.io', // list of receivers
        subject: 'Message from The Paint Shop Contact page', // Subject line
        text: message,
        attachments: attachments,
        err: isError
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log('\nERROR: ' + error + '\n');
            //FOR TESTING PURPOSES
            res.redirect("/error");
        } else {
            console.log('\nRESPONSE SENT: ' + info.response + '\n');
            res.redirect("/contact");
        }
    });
});

//---------------------------
//     Listen
//---------------------------
app.listen("3000", function() {
    console.log("\n\n\n###TPS application is listening on port 3000.");
});
