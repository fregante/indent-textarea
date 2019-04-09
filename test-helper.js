import puppeteer from 'puppeteer';

export default async function withPage(t, run) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setContent('<textarea>');

	t.context.field = page.$('textarea');

	try {
		await run(t, page);
	} finally {
		await page.close();
		await browser.close();
	}
}