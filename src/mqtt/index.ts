import * as mqtt from "mqtt";
import pubSubInstance from "../middelman/index";

async function connectToMqtt(url: string) {
  console.log("trying to connect", url);

  return new Promise<mqtt.MqttClient | null>((resolve) => {
    const client = mqtt.connect("mqtt://" + url);

    client.on("error", (error) => {
      console.log("error in mqtt", error.message);
      resolve(null);
    });

    client.on("connect", () => {
      console.log("connected to mqtt");
      resolve(client);
    });
  });
}
async function subscribeToMqtt(
  client: mqtt.MqttClient,
  topic: string,
  id: number
) {
  client.subscribe(topic);
  console.log("subscribed to", topic);
  client.on("message", (topic, message) => {
    pubSubInstance.publish(id.toString(), message);
  });
}
async function publishToMqtt(
  client: mqtt.MqttClient,
  topic: string,
  id: number
) {
  pubSubInstance.subscribe(id.toString(), (message) => {
    client.publish(topic, message.toString());
    console.log("publishing to", topic);
  });
}

export { connectToMqtt, subscribeToMqtt, publishToMqtt };
