import { GetConfiguration } from "../database/db";
import { configuration, configurationId } from "../zodSchema/schema";
import { handelDestinationMqtt } from "./destination";
import { handelSourceMqtt } from "./source";

async function handelConfiguration(id: number, configuration: configuration) {
  if (configuration.SourceType === "mqtt") {
    handelSourceMqtt(id, configuration.SourceData);
  }
  if (configuration.DestinationType === "mqtt") {
    handelDestinationMqtt(id, configuration.DestinationData);
  }
}
async function connectToOldConnections() {
  const oldConfiguration = await GetConfiguration();
  oldConfiguration.forEach((configuration: configurationId) => {
    handelConfiguration(configuration.id, configuration);
  });
}
connectToOldConnections()

export { handelConfiguration };
