import { Browser, Page } from "puppeteer";

export abstract class ISite {

    /**
     * 実際にページの要素を抽出する抽象クラス
     * @param page
     */
    protected abstract async extract(page: Page): Promise<void>;

    /**
     * 実行のテンプレートメソッド
     * @param browser
     */
    public async scraping(browser: Browser) {
        const page: Page = await browser.newPage();
        try {
            console.log('抽出開始');
            await this.extract(page);
        } catch (e) {
            throw e;
        } finally {
            await page.close();
            console.log('抽出終了');
        }
    }
}