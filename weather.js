#!/usr/bin/env node
import { getArgs } from "./helpers/args.js"
import {printHelp, printSuccess, printError} from "./services/log.service.js";
import {saveKeyValue, TOKEN_DICTIONARY} from "./services/storage.service.js";
import {getWeather} from "./services/api.service.js";


const saveToken = async (token) => {
    if (!token.length) {
        printError('Token not value');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token)
        printSuccess('Token save');
    } catch(e) {
        printError(e.message);
    }

};

const initCli = () => {
    const args = getArgs(process.argv);
    console.log(args);
    if (args.h) {
        printHelp();
    };
    if (args.s) {

    };
    if (args.t) {
        return saveToken(args.t);
    };
    getWeather('minsk');
};



initCli();

