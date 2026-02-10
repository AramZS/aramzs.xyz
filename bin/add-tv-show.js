const tvTools = require('./enrichers/tv.js');

const {Select, Input, Confirm} = require('enquirer');
const {slugify} = require("../lib/filters");
const {DateTime} = require('luxon');
const yargs = require("yargs");
const cheerio = require('cheerio');

let added = [];

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
    try {
      let showGrabResult = await tvTools.grabShow(showName);
      let titles = [];
      if (showGrabResult.title) {
        titles.push(showGrabResult.title);
      }
      if (showGrabResult.mediaName && showGrabResult.mediaName !== showGrabResult.title) {
        titles.push(showGrabResult.mediaName);
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
        showGrabResult.titleOverride = title;
      }
      showGrabResult.watchedDate = date;
      var filepath = await tvTools.writeTVShows([showGrabResult]);
      console.log('Wrote TV show to', filepath[0]);
      added.push({title: title, filepath: filepath[0]});
      code = 1;
    } catch (e) {
      console.error('Error adding TV show', showName, e.message);
      code = 1;
    }
    const prompt = new Confirm({
      name: 'question',
      message: 'Want to add more TV shows?'
    });

    const answer = await prompt.run();
    if (answer === true) {
      code = -1;
      showName = undefined;
    }

    return code;
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
