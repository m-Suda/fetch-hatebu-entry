import * as puppeteer from 'puppeteer';
import { Browser } from "puppeteer";
import { ISite } from "./site/ISite";
import { Hatebu } from "./site/hatebu/hatebu";

class App {

    private browser!: Browser;
    private site!: ISite;

    constructor(site: ISite) {
        this.site = site;
    }

    async init() {
        this.browser = await puppeteer.launch({
            headless: true,
        });
    }

    async scrape() {
        try {
            await this.site.scraping(this.browser);
        } catch (e) {
            console.error(e);
        } finally {
            await this.browser.close();
        }
    }
}

(async () => {
    const app = new App(new Hatebu());
    await app.init();
    await app.scrape();
})();