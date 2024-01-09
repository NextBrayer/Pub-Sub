import { connectToMqtt, subscribeToMqtt, publishToMqtt } from "../mqtt/index";
import { configuration } from "../zodSchema/schema";

async function handelConfiguration(id: number, configuration: configuration) {
  console.log("handel configuration", id, configuration);

  if (configuration.SourceType === "mqtt") {
    const connectedClient = await connectToMqtt(configuration.SourceData.url);
    if (connectedClient !== null) {
      console.log("Successfully connected!");
      subscribeToMqtt(connectedClient, configuration.SourceData.topic, id);
    } else {
      console.log("Failed to connect to MQTT.");
    }
  }
  if (configuration.DestinationType === "mqtt") {
    const connectedClient = await connectToMqtt(
      configuration.DestinationData.url
    );
    if (connectedClient !== null) {
      console.log("Successfully connected!");
      publishToMqtt(connectedClient, configuration.DestinationData.topic, id);
    } else {
      console.log("Failed to connect to MQTT.");
    }
  }
}

export { handelConfiguration };
