import { ISite } from '../ISite';
import { Page } from 'puppeteer';
import { EntryContent } from "../../../interface/EntryContent";
import * as fs from 'fs';
import * as path from 'path';

export class Hatebu extends ISite {

    private readonly hotEntryUrl = 'http://b.hatena.ne.jp/hotentry/it';
    private readonly entryListUrl = 'http://b.hatena.ne.jp/entrylist/it';

    private readonly ENTRY_LIST_CONTENTS = '.entrylist-contents-title';
    private readonly JSON_OUT_DIR = path.resolve(__dirname, '../../../dist/json');
    private readonly HOT_ENTRY_FILE = 'hot-entry.json';
    private readonly ENTRY_LIST_FILE = 'entry-list.json';

    constructor() {
        super();
    }

    protected async extract(page: Page): Promise<void> {

        await page.goto(this.hotEntryUrl);
        const hotEntryArr: EntryContent[] = await page.$$eval(this.ENTRY_LIST_CONTENTS,
            (contents: Element[]) => {
                return contents.map(
                    (content: Element): EntryContent => {
                        const a: any = content.childNodes[ 1 ];
                        return {
                            title: a.title,
                            url: a.href,
                        };
                    });
            });

        await page.goto(this.entryListUrl);
        const entryList: EntryContent[] = await page.$$eval<EntryContent[] | Promise<EntryContent[]>>(this.ENTRY_LIST_CONTENTS,
            (contents: Element[]) => {
                return contents.map(
                    (content: Element): EntryContent => {
                        const a: any = content.childNodes[ 1 ];
                        return {
                            title: a.title,
                            url: a.href,
                        };
                    });
            });

        fs.writeFileSync(`${this.JSON_OUT_DIR}/${this.HOT_ENTRY_FILE}`, JSON.stringify({ results: hotEntryArr }));
        fs.writeFileSync(`${this.JSON_OUT_DIR}/${this.ENTRY_LIST_FILE}`, JSON.stringify({ results: entryList }));
    }
}