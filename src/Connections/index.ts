import { MqttClient } from "mqtt/*";
import { GetConfiguration } from "../database/db";
import {
  configuration,
  configurationId,
  connectedClientInterface,
} from "../zodSchema/schema";
import { handelDestinationMqtt } from "./destination";
import { handelSourceMqtt } from "./source";

let connectedClientsArray: connectedClientInterface[] = [];

async function handelConfiguration(id: number, configuration: configuration) {
  if (configuration.SourceType === "mqtt") {
    const connectedClient = await handelSourceMqtt(
      id,
      configuration.SourceData
    );
    if (connectedClient != null) {
      connectedClientsArray.push({
        type: "source",
        mqttBroker: configuration.SourceData.url,
      });
    }
  }
  if (configuration.DestinationType === "mqtt") {
    const connectedClient = await handelDestinationMqtt(
      id,
      configuration.DestinationData
    );
    if (connectedClient != null) {
      connectedClientsArray.push({
        type: "Destination",
        mqttBroker: configuration.SourceData.url
      });
    }
  }
}

// get all connected clients
function getConnectedClients() {
  return connectedClientsArray;
}
// connect to connection stored in the database
//************************************************* */
async function connectToOldConnections() {
  connectedClientsArray = [];
  const oldConfiguration = await GetConfiguration();
  oldConfiguration.forEach((configuration: configurationId) => {
    handelConfiguration(configuration.id, configuration);
  });
}
connectToOldConnections();

export { handelConfiguration, getConnectedClients };
