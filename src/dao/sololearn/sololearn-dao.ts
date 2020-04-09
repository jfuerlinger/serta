import { ISololearnDao } from "./i-sololearn-dao";

import axios from "axios";
const cheerio = require("cheerio");

const createLogger = require('logging').default;
const logger = createLogger('sololearn-dao');


export class SololearnDao implements ISololearnDao {

    private _siteUrl = "https://www.sololearn.com/Profile/";

    private async fetchData(userId: string): Promise<any> {
        const result = await axios.get(this._siteUrl + userId);
        return cheerio.load(result.data);
    }

    async getXPForUser(userId: string): Promise<number> {
            const $ = await this.fetchData(userId);
            try {
                const divXp = $('.detail > div:nth-child(2)');
                return Number(divXp
                    .text()
                    .replace(' XP', '')
                    .trim());
            } catch (er) {
                logger.error(`Error at fetching the xp from sololearn: ${er}`);
                throw Error("Unable to fetch the xp from sololearn!");
            }
    }
}