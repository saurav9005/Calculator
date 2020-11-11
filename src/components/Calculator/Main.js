import React from "react";
import Buttons from "./Buttons";
import History from "./History";
import DisplayToolbar from "./DisplayToolbar";
import * as Calculator from "./calculator-core";

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uppertext: [],
      history: [],
      input: "0",
      isShowHistory: false,
      afterCalculation: false,
    };

    this.onDigit = this.onDigit.bind(this);
    this.onOperator = this.onOperator.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onEqual = this.onEqual.bind(this);
    this.onDecimal = this.onDecimal.bind(this);
    this.onHistory = this.onHistory.bind(this);
    this.onHistoryItemClicked = this.onHistoryItemClicked.bind(this);
    this.onClearHistory = this.onClearHistory.bind(this);
  }

  onDigit({ target }) {
    const digit = target.innerText;
    const input = this.state.input;

    if (this.state.afterCalculation) {
      this.setState({
        input: digit,
        afterCalculation: false,
      });
    } else if (input === "0") {
      this.setState({
        input: digit,
      });
    } else if (Calculator.isNotNumber(input)) {
      this.setState({
        input: digit,
        uppertext: this.state.uppertext.concat(input),
      });
    } else {
      this.setState({
        input: input.concat(digit),
      });
    }
  }

  onDecimal({ target }) {
    const decimal = target.innerText;
    const input = this.state.input;

    if (this.state.afterCalculation) {
      this.setState({
        input: `0${decimal}`,
        afterCalculation: false,
      });
    } else if (Calculator.isNotNumber(input)) {
      this.setState({
        input: `0${decimal}`,
        uppertext: this.state.uppertext.concat(input),
      });
    } else if (!input.includes(decimal)) {
      this.setState({
        input: input.concat(decimal),
      });
    }
  }

  onOperator({ target }) {
    const operator = target.innerText;
    const input = this.state.input;

    if (Calculator.isOperator(input)) {
      this.setState({
        input: operator,
        afterCalculation: false,
      });
    } else if (input !== "(") {
      this.setState({
        uppertext: this.state.uppertext.concat(this.state.input),
        input: operator,
        afterCalculation: false,
      });
    }
  }

  onClear() {
    this.setState({
      uppertext: [],
      input: "0",
      afterCalculation: false,
    });
  }

  onEqual() {
    const finalFormula = this.state.uppertext.concat(this.state.input);
    const result = Calculator.evaluate(finalFormula);

    if (!Number.isNaN(result)) {
      const newHistoryItem = {
        uppertext: finalFormula,
        result: result,
      };

      this.setState({
        input: result + "",
        uppertext: [],
        history: [].concat(newHistoryItem, this.state.history),
        afterCalculation: true,
      });
    }
  }

  onHistory() {
    this.setState({
      isShowHistory: !this.state.isShowHistory,
    });
  }

  onClearHistory() {
    this.setState({
      history: [],
    });
  }

  onHistoryItemClicked({ target }) {
    const number = target.getAttribute("value");
    const input = this.state.input;

    if (Calculator.isNumber(input)) {
      this.setState({
        input: number,
      });
    } else {
      this.setState({
        input: number,
        uppertext: this.state.uppertext.concat(input),
      });
    }
  }

  render() {
    return (
      <div>
        <div className="calculatordd">
          <DisplayToolbar
            uppertext={this.state.uppertext}
            input={this.state.input}
            onHistory={this.onHistory}
            isShowHistory={this.state.isShowHistory}
          />

          <Buttons
            onClear={this.onClear}
            onEqual={this.onEqual}
            onDecimal={this.onDecimal}
            onDigit={this.onDigit}
            onOperator={this.onOperator}
          />

          <History
            isShowHistory={this.state.isShowHistory}
            history={this.state.history}
            onHistoryItemClicked={this.onHistoryItemClicked}
            onEqual={this.onEqual}
            onClearHistory={this.onClearHistory}
          />
        </div>
      </div>
    );
  }
}
