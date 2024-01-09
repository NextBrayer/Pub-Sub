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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handelConfiguration = void 0;
const mqtt_1 = __importDefault(require("../mqtt"));
function handelConfiguration(id, configuration) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("handel configuration", id, configuration);
        if (configuration.SourceType === "mqtt") {
            mqtt_1.default
                .connect(configuration.SourceData.url + ":" + configuration.SourceData.port)
                .then((result) => {
                mqtt_1.default.subscribe(result, configuration.SourceData.topic, id);
            })
                .catch((error) => {
                console.log("Source error", error.message);
            });
        }
        if (configuration.DestinationType === "mqtt") {
            mqtt_1.default
                .connect(configuration.DestinationData.url +
                ":" +
                configuration.DestinationData.port)
                .then((result) => {
                mqtt_1.default.publish(result, configuration.DestinationData.topic, id);
            })
                .catch((error) => {
                console.log("Source error", error.message);
            });
        }
    });
}
exports.handelConfiguration = handelConfiguration;
