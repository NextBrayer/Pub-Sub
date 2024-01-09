"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const expressPort = 3000;
const schema_1 = require("./zodSchema/schema");
let newConfiguration = {};
const db_1 = require("./database/db");
const index_1 = require("./Connections/index");
app.post("/configuration", (req, res) => {
    console.log("getting new configuration");
    try {
        schema_1.ConfigurationSchema.parse(req.body);
        (0, db_1.createConfiguration)(req.body).then((newConfig) => {
            newConfiguration = newConfig;
            res.send(newConfig);
            if (newConfiguration)
                (0, index_1.handelConfiguration)(newConfiguration.id, req.body);
        });
    }
    catch (error) {
        res.send(error.message);
    }
});
app.post("/configuration/delete", (req, res) => {
    console.log("delete configuration");
    try {
        if (req.body.id) {
            console.log("id", req.body.id);
            (0, db_1.DeleteConfiguration)(req.body.id).then((result) => {
                res.send(result);
            });
        }
    }
    catch (error) {
        res.send(error.message);
    }
});
app.get("/configuration", (req, res) => {
    console.log("reading configurations");
    try {
        (0, db_1.GetConfiguration)().then((configs) => {
            res.send(configs);
        });
    }
    catch (error) {
        res.send(error.message);
    }
});
app.listen(expressPort, () => {
    console.log("express Server Listening on port ", expressPort);
});
