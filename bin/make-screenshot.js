const config = require("../.fantarc");
const puppeteer = require("puppeteer");
const Bundler = require("parcel-bundler");

const outPath = config.paths.screenie;

const startServer = () =>
	new Promise(rt => {
		const bundler = new Bundler(__dirname + "/../code/index.html");
		bundler.on("buildEnd", () => {
			rt(`http://localhost:${config.ports.test}`);
		});
		bundler.serve(config.ports.test);
	});

const takeScreenshot = async url => {
	const browser = await puppeteer.launch({
		args: ["--no-sandbox"],
		ignoreHTTPSErrors: true
	});
	const page = await browser.newPage();

	return new Promise((yay, nay) => {
		page.on("console", async msg => {
			try {
				const log = JSON.parse(msg.text());
				if (!log.number) {
					throw new Error("invalid fanta");
				}
				await page.waitFor(1000); /* webfont */
				await page.screenshot({ path: outPath, type: "png" });
				await browser.close();
				yay(log);
			} catch (e) {
				nay([e, msg]);
			}
		});
		Promise.all([page.setViewport({ width: 1280, height: 720 }), page.goto(url)]);
	});
};

module.exports = () => startServer().then(url => takeScreenshot(url));
