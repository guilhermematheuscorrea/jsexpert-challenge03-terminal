import CustomTerminal from "./terminal.js";
import IncomeService from "./service/IncomeService.js";

const VOCABULARY = {
  STOP: ":q",
};

const terminal = new CustomTerminal();
terminal.initialize();

const service = new IncomeService();

async function mainLoop() {
  console.log("🚀  Running...");

  try {
    const answer = await terminal.question(
      "\nQual seu cargo e pretensão salarial em BRL? (position;expectation).\nInsira: "
    );

    if (answer === VOCABULARY.STOP) {
      terminal.closeTerminal();
      return;
    }

    const income = await service.generateIncomeFromString(answer);

    terminal.updateTable(income.format());
  } catch (error) {
    terminal.printError(error.message);
  }
  return mainLoop();
}

await mainLoop();
