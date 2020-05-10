import { readFileSync } from "fs";
import pluralize from "pluralize";
import n2w from "number-names";

const randomArrKey = (items) => items[Math.floor(Math.random() * items.length)];
const wordList = readFileSync(__dirname + "/../assets/words/nouns.txt", "utf-8")
	.split("\n")
	.filter(Boolean);
const adjectiveList = readFileSync(
	__dirname + "/../assets/words/adjectives.txt",
	"utf-8"
)
	.split("\n")
	.filter(Boolean);
const verbList = readFileSync(__dirname + "/../assets/words/verbs.txt", "utf-8")
	.split("\n")
	.filter(Boolean);

const buildUpFanta = ($guys) => {
	const number = n2w(Math.round(999 * Math.random()));
	let words = [];
	$guys.style.setProperty("--rota", Math.round(360 * Math.random()) + "deg");

	const getWord = () =>
		Math.random() > 0.5
			? pluralize(randomArrKey(wordList))
			: randomArrKey(wordList);

	const withoutThe = ["stay", randomArrKey(adjectiveList)].join(" ");
	const withThe = [randomArrKey(verbList), "the", getWord()].join(" ");

	$guys.querySelector("x-sentence").innerText = withoutThe;
	$guys.querySelector("x-other-sentence").innerText = withThe;

	const tweet = `${withoutThe} 👉 ${withThe} 👉 Save lives`.toUpperCase();

	return { number, words, tweet };
};

const go = () => {
	const $guys = document.querySelector("x-guys");
	const data = buildUpFanta($guys, data);

	console.log(JSON.stringify(data));
};
go();
