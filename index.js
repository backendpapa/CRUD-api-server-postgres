const express = require("express");
const app = express();
const cors = require("cors")
const bodyParser = require("body-parser");
const propertyController = require("./controllers/propertyController");
const AgentController = require("./controllers/agentContoller")
const regController = require("./controllers/regController");



app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

app.get('/', (req, res) => {
    res.send("Zonos Heroku Node Server")
})
app.route('/property')
    .get(propertyController.getProperty)
    .post(propertyController.addProperty)
    .put(propertyController.updateProperty)

// app.put('/',propertyController.updateProperty)

app.route('/agent')
    .get(AgentController.getAgent)
    .post(AgentController.addAgent)
    .put(AgentController.updateAgent)

app.get("/login", regController.login)
app.post("/register", regController.register)
app.post('/jwtlogin', regController.jwtlogin)


app.listen(app.get("port"), () => {
    console.log(`Server running on port :${app.get("port")}`)
})