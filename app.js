const express = require("express");
const logger = require("morgan");
const path= require("path");

const app = express();

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs"); 

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;

app.use(logger("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let teamArray = [
    { id: 1, teamName: "lakers" },
    { id: 2, teamName: "knicks" },
    { id: 3 teamName: "nets" }] 

app.get('/', function (req, res) {
    res.render("index");
});

app.get("/get-team-array", function (req, res ) {
    res.json({teamArray});
});

app.get(`/get-team-by-params-id/:id`, function (req, res) {

    let foundTeam;

    teamArray.forEach((team) => {
        if (team.id === +req.params.id) {
            foundTeam = team;
        }
    });

    res.json({ foundTeam, id: req.params.id });
});

app.get("/get-team-by-params-name/:name", function (req, res) {
    console.log(req.params);
    console.log(req.params.name);
    res.json({ params: req.params, id: req.params.name });
});


app.post("/", function (req, res) {
    // res.send("post path!");
    console.log(req.body);
    teamArray.push(req.body);
    res.json({ team: teamArray});
    //res.json(teamArray);
})

app.listen(PORT, function () {
    console.log(`Server is now running on PORT: ${PORT}`);
});