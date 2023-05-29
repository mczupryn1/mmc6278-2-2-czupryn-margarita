const { program } = require("commander");
const fs = require("fs/promises");
const chalk = require("chalk");
const QUOTE_FILE = "quotes.txt";

program
  .name("quotes")
  .description("CLI tool for inspiration")
  .version("0.1.0");

program
  .command("getQuote")
  .description("Retrieves a random quote")
  .action(async () => {
    try {
      const quotes = await fs.readFile(QUOTE_FILE, 'utf-8');
      const quotesArray = quotes.split('\n').filter(Boolean); // Filter out any empty lines
      const randomQuote = quotesArray[Math.floor(Math.random() * quotesArray.length)];
      const [quote, author] = randomQuote.split('|').map(s => s.trim());
      
      console.log(`${chalk.green(quote)} - ${chalk.yellow(author)}`);
    } catch (err) {
      console.error(chalk.red('Error while retrieving quote:', err));
    }
  });

program
  .command("addQuote <quote> [author]")
  .description("adds a quote to the quote file")
  .action(async (quote, author = 'Anonymous') => {
    try {
      const formattedQuote = `${quote} | ${author}\n`;
      await fs.appendFile(QUOTE_FILE, formattedQuote);

      console.log(chalk.blue('Quote was added successfully:'));
      console.log(`${chalk.green(quote)} - ${chalk.yellow(author)}`);
    } catch (err) {
      console.error(chalk.red('Error while adding quote:', err));
    }
  });

program.parse();
