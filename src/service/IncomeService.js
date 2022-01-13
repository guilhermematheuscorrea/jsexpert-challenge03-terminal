import IncomeRepository from "./../repository/IncomeRepository.js";
import Income from "./../entity/Income.js";

class IncomeService {
  constructor({ incomeRepository } = {}) {
    this.incomeRepository = incomeRepository || new IncomeRepository();
  }

  async generateIncomeFromString(incomeString, delimiter = ";") {
    const [position, expectation] = incomeString.split(delimiter);

    if (!position) {
      throw new Error(
        "Position is a required field. Please make sure you are providing a position."
      );
    }
    const expectationHasLetters = /\D/g.test(expectation);

    if (expectationHasLetters) {
      throw new Error(
        "A valid Expectation is required. Please note that only numbers are allowed."
      );
    }

    const expectationValue = parseInt(expectation);

    const conversions = await this.incomeRepository.getConversions();

    const income = new Income({
      position,
      expectation: {
        currency: "BRL",
        language: "pt-BR",
        value: expectationValue,
      },
      conversion01: {
        currency: "USD",
        language: "en-US",
        value: expectationValue * conversions["USD"],
      },
      conversion02: {
        currency: "EUR",
        language: "en-GB",
        value: expectationValue * conversions["EUR"],
      },
      conversion03: {
        currency: "RUB",
        language: "ru-RU",
        value: expectationValue * conversions["RUB"],
      },
    });

    return income;
  }
}

export default IncomeService;
