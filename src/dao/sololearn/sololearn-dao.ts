import { ISololearnDao } from "./i-sololearn-dao";

import axios from "axios";
const cheerio = require("cheerio");

export class SololearnDao implements ISololearnDao {

    private _siteUrl = "https://www.sololearn.com/Profile/";

    private async fetchData(userId: string): Promise<any> {
        const result = await axios.get(this._siteUrl + userId);
        return cheerio.load(result.data);
    }

    async getXPForUser(userId: string): Promise<number> {
        const $ = await this.fetchData(userId);
        return Number($('.detail > div:nth-child(2)')
            .text()
            .replace(' XP', '')
            .trim());
    }
}