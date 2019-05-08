import { ISite } from '../ISite';
import { Page } from 'puppeteer';
import * as path from 'path';

export class Hatebu extends ISite {

    constructor() {
        super();
    }

    getUrl(): string {
        return 'http://b.hatena.ne.jp/hotentry/it';
    }

    async scraping(page: Page): Promise<void> {
        await page.screenshot({
            path: path.resolve(__dirname, '../../../test/screenshot/test.png'),
            fullPage: true,
        });
    }
}