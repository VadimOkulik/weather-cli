#!/usr/bin/env node
import { getArgs } from "./helpers/args.js"
import {printHelp, printSuccess, printError, printWeather} from "./services/log.service.js";
import {saveKeyValue, TOKEN_DICTIONARY, getKeyValue} from "./services/storage.service.js";
import {getWeather, getIcon} from "./services/api.service.js";


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

const saveCity = async (city) => {
    if (!city.length) {
        printError('City not value');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city)
        printSuccess('City save');
    } catch(e) {
        printError(e.message);
    }

};

const getForcast = async () => {
    try {
        const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
        const weather = await getWeather(city);
        printWeather(weather, getIcon(weather.weather[0].icon));
    } catch(e) {
        if (e?.response?.status == 404) {
            printError('Not set City ')
        } else if (e?.response?.status == 401) {
            printError('Not set Token ')
        } else {
            printError(e.message);
        }
    }

}

const initCli = () => {
    const args = getArgs(process.argv);
    console.log(args);
    if (args.h) {
        return printHelp();
    };
    if (args.s) {
        return saveCity(args.s)
    };
    if (args.t) {
        return saveToken(args.t);
    };
    return getForcast();
};



initCli();

