"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteConfiguration = exports.GetConfiguration = exports.createConfiguration = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function createConfiguration(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.configuration
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
        })
            .then((configuration) => {
            return configuration;
        })
            .catch((e) => __awaiter(this, void 0, void 0, function* () {
            console.log(e.message);
            return null;
        }));
    });
}
exports.createConfiguration = createConfiguration;
function GetConfiguration() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.configuration
            .findMany({
            include: {
                SourceData: true,
                DestinationData: true,
            },
        })
            .then((configurations) => {
            return configurations;
        })
            .catch((e) => __awaiter(this, void 0, void 0, function* () {
            return e.message;
        }));
    });
}
exports.GetConfiguration = GetConfiguration;
function DeleteConfiguration(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.configuration
            .delete({
            where: {
                id: id,
            },
        })
            .then(() => {
            return "deleted";
        })
            .catch((e) => __awaiter(this, void 0, void 0, function* () {
            return e.message;
        }));
    });
}
exports.DeleteConfiguration = DeleteConfiguration;
