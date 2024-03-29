import { connectToMqtt, publishToMqtt } from "../mqtt/index";
import { DestinationData } from "../zodSchema/schema";

async function handelDestinationMqtt(id: number, configuration: DestinationData) {
  const connectedClient = await connectToMqtt(
    configuration.url
  );
  if (connectedClient !== null) {
    console.log("Successfully connected!");
    publishToMqtt(connectedClient, configuration.topic, id);
    return connectedClient
  } else {
    console.log("Failed to connect to MQTT.");
    return null
  }
}

export { handelDestinationMqtt };

