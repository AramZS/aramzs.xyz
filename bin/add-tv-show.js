const tvTools = require('./enrichers/tv.js');

const {Select, Input, Confirm} = require('enquirer');
const {slugify} = require("../lib/filters");
const {DateTime} = require('luxon');
const yargs = require("yargs");
const cheerio = require('cheerio');


const main = async (argv) => {
  const selectYourOwn = 'Other, enter your own';
  let code = -1;
  let {showName} = argv;

  const datePrompt = new Input({
    message: 'Date watched (YYYY-MM-DDTHH:mm:ss)',
    initial: DateTime.now().toFormat('yyyy-LL-dd\'T\'HH:mm:ss')
  });

  const date = await datePrompt.run();

  while(code === -1) {
    if (!showName) {
      const prompt = new Input({
        message: 'TV Show Name (or Q to quit)',
        initial: ''
      });

      showName = (await prompt.run()).trim();
      if (!showName) {
        console.warn('[!] Please enter a TV show string, or Q to quit')
        continue;
      } else if (showName.toUpperCase() === 'Q') {
        break;
      }
    }

    code = await tvTools.grabShow(showName);
    let titles = [];
    if (code.title) {
      titles.push(code.title);
    }
    if (code.mediaName && code.mediaName !== code.title) {
      titles.push(code.mediaName);
    }
    titles.push(selectYourOwn);
    const titlePrompt = new Select({
      name: 'title',
      message: 'Pick a title',
      choices: titles
    });

    let title = await titlePrompt.run();

    if (title === selectYourOwn) {
      const prompt = new Input({
        message: 'Title',
        initial: ''
      });

      title = (await prompt.run()).trim();
      code.titleOverride = title;
    }

    var filepath = await tvTools.writeTVShows([code]);
    console.log('Wrote TV show to', filepath);
    const prompt = new Confirm({
      name: 'question',
      message: 'Want to add more TV shows?'
    });

    const answer = await prompt.run();
    if (answer === true) {
      code = -1;
      showName = undefined;
    }
  }

  if (added.length > 0) {
    console.log('Added TV Wikilinks:')
    added.forEach(a => console.log(`![[ ${a.title} ]]`));
  }

  return code;
}

const options = yargs
  .usage("Usage: -n <string>")
  .option("n", {alias: "name", describe: "TV Show Name", type: "string", demandOption: false})
  .argv;


main(options).then(code => process.exit(code));
