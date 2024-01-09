import express from "express";
const app = express();
app.use(express.json());
const expressPort: number = 3000;

import { ConfigurationSchema, configurationId } from "./zodSchema/schema";
let newConfiguration = {} as configurationId;

import {
  DeleteConfiguration,
  GetConfiguration,
  createConfiguration,
} from "./database/db";
import { getConnectedClients, handelConfiguration } from "./Connections/index";

app.post("/configuration", (req, res) => {
  console.log("getting new configuration");
  try {
    ConfigurationSchema.parse(req.body);
    createConfiguration(req.body).then((newConfig: any) => {
      newConfiguration = newConfig;
      res.send(newConfig);
      if (newConfiguration) handelConfiguration(newConfiguration.id, req.body);
    });
  } catch (error: any) {
    res.send(error.message);
  }
});

app.post("/configuration/delete", (req, res) => {
  console.log("delete configuration");
  try {
    if (req.body.id) {
      console.log("id", req.body.id);
      DeleteConfiguration(req.body.id).then((result) => {
        res.send(result);
      });
    }
  } catch (error: any) {
    res.send(error.message);
  }
});

app.get("/configuration", (req, res) => {
  console.log("reading configurations");
  try {
    GetConfiguration().then((configs: any) => {
      res.send(configs);
    });
  } catch (error: any) {
    res.send(error.message);
  }
});
app.get("/status", (req, res) => {
  console.log("get the status");
  try {
    const connectedClients = getConnectedClients();
    res.send(connectedClients);
  } catch (error: any) {
    res.send(error.message);
  }
});

app.listen(expressPort, () => {
  console.log("express Server Listening on port ", expressPort);
});
