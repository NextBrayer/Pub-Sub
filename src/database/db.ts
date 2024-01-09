import { PrismaClient } from "@prisma/client";

import { configuration } from "../zodSchema/schema";
const prisma = new PrismaClient();

async function createConfiguration(data: configuration) {
  return await prisma.configuration
    .create({
      data: {
        SourceType: data.SourceType,
        SourceData: {
          create: {
            url: data.SourceData.url,
            port: data.SourceData.port,
            topic: data.SourceData.topic,
          },
        },
        DestinationType: data.DestinationType,
        DestinationData: {
          create: {
            url: data.DestinationData.url,
            port: data.DestinationData.port,
            topic: data.DestinationData.topic,
          },
        },
      },
    },
    )
    .then((configuration) => {
      return configuration;
    })
    .catch(async (e) => {
      console.log(e.message);
      return null;
    });
}
async function GetConfiguration() {
  return await prisma.configuration
    .findMany({
      include: {
        SourceData: true,
        DestinationData: true,
      },
    })
    .then((configurations) => {
      return configurations;
    })
    .catch(async (e) => {
      return e.message;
    });
}

async function DeleteConfiguration(id: number) {
  return await prisma.configuration
    .delete({
      where: {
        id: id,
      },
    })
    .then(() => {
      return "deleted";
    })
    .catch(async (e) => {
      return e.message;
    });
}

export { createConfiguration, GetConfiguration, DeleteConfiguration };
