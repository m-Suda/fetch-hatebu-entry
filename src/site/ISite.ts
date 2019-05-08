import { Page } from "puppeteer";

export abstract class ISite {

    public abstract getUrl(): string;

    public abstract scraping(page: Page): Promise<void>;
}