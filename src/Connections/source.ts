import { connectToMqtt, subscribeToMqtt } from "../mqtt/index";
import { SourceData } from "../zodSchema/schema";

async function handelSourceMqtt(id: number, configuration: SourceData) {
  const connectedClient = await connectToMqtt(configuration.url);
  if (connectedClient !== null) {
    console.log("Successfully connected!");
    subscribeToMqtt(connectedClient, configuration.topic, id);
    return connectedClient
  } else {
    console.log("Failed to connect to MQTT.");
    return null
  }
}

export { handelSourceMqtt };
