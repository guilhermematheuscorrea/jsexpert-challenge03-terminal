import DraftLog from "draftlog";
import chalkTable from "chalk-table";
import readline from "readline";
import terminalConfig from "./config/terminal.js";
import chalk from "chalk";

const TABLE_OPTIONS = terminalConfig.table;
class CustomTerminal {
  constructor() {
    this.terminal = {};
    this.print = {};
    this.data = [];
  }

  initialize() {
    DraftLog(console).addLineListener(process.stdin);
    this.terminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.initializeTable();
  }

  initializeTable(data = []) {
    const table = chalkTable(TABLE_OPTIONS, data);

    this.print = console.draft(table);
  }

  question(message = "") {
    return new Promise((resolve) => this.terminal.question(message, resolve));
  }

  updateTable(income) {
    const { position, expectation, conversion01, conversion02, conversion03 } =
      income;

    this.data.push({
      position,
      expectation: expectation.value,
      conversion01: conversion01.value,
      conversion02: conversion02.value,
      conversion03: conversion03.value,
    });

    this.print(chalkTable(TABLE_OPTIONS, this.data));
  }

  printError(message = "") {
    console.draft(chalk.red(message));
  }

  closeTerminal() {
    this.terminal.close();
  }
}

export default CustomTerminal;
