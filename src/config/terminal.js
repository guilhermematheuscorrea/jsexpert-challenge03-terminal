import chalk from "chalk";

export default {
  table: {
    leftPad: 2,
    columns: [
      { field: "position", name: chalk.cyan("Position") },
      { field: "expectation", name: chalk.red("BRL") },
      { field: "conversion01", name: chalk.green("USD") },
      { field: "conversion02", name: chalk.blue("EUR") },
      { field: "conversion03", name: chalk.black("RUB") },
    ],
  },
};
