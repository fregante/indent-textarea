const puppeteer = require('puppeteer');

module.exports = async function withBrowser(t, run) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setContent('<textarea>');

	const field = await page.$('textarea');
	global.document = field.documentOwner;
	global.InputEvent = global.document.defaultView.InputEvent;

	try {
		await run(t, field);
	} finally {
		await page.close();
		await browser.close();
	}
};
