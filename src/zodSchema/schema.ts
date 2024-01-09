import { MqttClient } from "mqtt/*";
import * as z from "zod";

interface configuration {
  SourceType: string;
  SourceData: SourceData;
  DestinationType: string;
  DestinationData: DestinationData;
}

interface SourceData {
  url: string;
  port: number;
  topic: string;
}

interface DestinationData {
  url: string;
  port: number;
  topic: string;
}

interface configurationId extends configuration {
  id: number;
}
const ConfigurationSchema = z.object({
  SourceType: z.string().min(1),
  SourceData: z.object({
    url: z.string().min(5),
    port: z.number(),
    topic: z.string().min(1),
  }),
  DestinationType: z.string().min(1),
  DestinationData: z.object({
    url: z.string().min(5),
    port: z.number(),
    topic: z.string().min(1),
  }),
});
interface connectedClientInterface {
  type: string;
  mqttBroker: string;
}

// module.exports =  ConfigurationSchema ;
export {
  ConfigurationSchema,
  configuration,
  configurationId,
  SourceData,
  DestinationData,
  connectedClientInterface,
};
