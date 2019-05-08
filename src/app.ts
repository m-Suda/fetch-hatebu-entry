import * as puppeteer from 'puppeteer';
import { Browser, Page } from "puppeteer";
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
        const page: Page = await this.browser.newPage();
        try {
            await page.goto(this.site.getUrl());
            await this.site.scraping(page);
        } catch (e) {
            throw e;
        } finally {
            await page.close();
            await this.browser.close();
        }
    }
}

(async () => {
    const app = new App(new Hatebu());
    await app.init();
    await app.scrape();
})();