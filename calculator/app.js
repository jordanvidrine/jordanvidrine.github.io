var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// --  --  --  --  Buttons  --  --  --  -- //
function CalcButton(props) {
  var className = "calcButton";
  var id = props.id;
  return React.createElement(
    "button",
    { className: className, id: id, onClick: props.onClick },
    props.sign
  );
}

// --  --  --  --  Calc Screen Top  --  --  --  -- //
function CalcScreenTop(props) {
  return React.createElement(
    "div",
    { id: "formula" },
    React.createElement(
      "p",
      { className: "formula" },
      props.formula
    )
  );
}

// --  --  --  --  Calc Screen Bottom  --  --  --  -- //
function CalcScreenBottom(props) {
  var input = props.input == "" ? "0" : props.input;
  return React.createElement(
    "div",
    { id: "currentInput" },
    React.createElement(
      "p",
      null,
      input
    )
  );
}

// --  --  --  --  Main App  --  --  --  -- //

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      formula: '',
      currentInput: '',
      buildingFormula: true,
      lastValue: null
    };
    _this.buildFormula = _this.buildFormula.bind(_this);
    _this.solveFormula = _this.solveFormula.bind(_this);
    _this.reset = _this.reset.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: "buildFormula",
    value: function buildFormula(e) {
      debugger;
      var keyPressed = e.target.innerText;
      var formula = void 0,
          currentInput = void 0;
      var stateFormula = this.state.formula;
      keyPressed = keyPressed.replace("X", "x");
      var lastValue = !!(this.state.lastValue !== null);

      //if no numbers are present yet, exit the function
      if (this.state.formula == "" && keyPressed.match(/[x/+-]/g)) {
        return false;
      }

      //if lastValue is true, then use that assign stateFormula to it as the base for new calculations
      if (lastValue) {
        //convert value to string to be parsed by str.match
        stateFormula = this.state.lastValue + '';
      }

      //FORMULA BUILDER
      //if button pressed was operator, add that to the formula (conditionally)
      if (keyPressed.match(/[x/+-]/g)) {
        if (stateFormula.charAt(stateFormula.length - 1).match(/[x/+-]/g)) {
          return false;
        } else {
          formula = stateFormula + keyPressed;
        }
      } else {
        //otherwise add the number to the formula if it is in build mode, if not
        //begin new formula with only the number pressed
        formula = this.state.buildingFormula ? stateFormula + keyPressed : keyPressed;
      }

      //CURRENT VALUE BUILDER
      //if keyPressed is a number
      if (!keyPressed.match(/[x/+-]/g)) {
        //if not in build mode yet, assign current input to keypressed
        if (!this.state.buildingFormula) {
          currentInput = keyPressed;
        } else {
          //If in build mode...
          //first check to see if the last button entered was also a number
          if (!this.state.currentInput.charAt(this.state.currentInput.length - 1).match(/[x/+-]/g)) {
            //if it is, add the current number pressed to the input display
            currentInput = this.state.currentInput + keyPressed;
          } else {
            //if previous button was an operator, then current input will only equal keypressed
            currentInput = keyPressed;
          }
        }
      } else {
        //check to see if previous input was an operator
        if (this.state.currentInput.charAt(this.state.currentInput.length - 1).match(/[x/+-]/g)) {
          //if it was, do nothing
          currentInput = this.state.currentInput;
        } else {
          //if it wasnt, add the operator to the formula
          currentInput = keyPressed;
        }
      }

      this.setState(Object.assign({}, this.state, {
        formula: formula,
        currentInput: currentInput,
        buildingFormula: true,
        lastValue: null
      }));
    }
  }, {
    key: "solveFormula",
    value: function solveFormula() {
      var lastValue = this.state.lastValue;
      debugger;
      //exit function if no numbers are present yet or lastValue is set OR last character was an operator
      var lastChar = this.state.currentInput.charAt(this.state.currentInput.length - 1);

      if (this.state.formula == "" || lastValue !== null || lastChar == "-" || lastChar == "+" || lastChar == "/" || lastChar == "x") {
        return false;
      }
      var numbers = this.state.formula.split(/[-/+x]/);
      var operators = this.state.formula.match(/[x/+-]/g);

      //convert str numbers in array to actual number
      numbers = numbers.map(function (number) {
        return number = Number(number);
      });

      //pretty self explanatory, reducing numbers into a solution by referencing the operators array
      var solution = numbers.reduce(function (acc, currentValue, idx) {
        //since idx starts at 1 for reduce, always subtract one from idx to get right operator location
        if (operators[idx - 1] == "+") {
          acc = acc + currentValue;
          return acc;
        }
        if (operators[idx - 1] == "-") {
          acc = acc - currentValue;
          return acc;
        }
        if (operators[idx - 1] == "/") {
          acc = acc / currentValue;
          return acc;
        }
        if (operators[idx - 1] == "x") {
          acc = acc * currentValue;
          return acc;
        }
        //persuade the number into a string by adding ''
      }) + '';
      var formula = this.state.formula + "= " + solution;
      //use myToFixed to round to 8 if number is too large
      if (solution.length >= 8) {
        solution = myToFixed(solution, 8);
      }
      this.setState(Object.assign({}, this.state, {
        formula: formula,
        currentInput: "" + solution,
        buildingFormula: false,
        lastValue: Number(solution)
      }));
    }
  }, {
    key: "reset",
    value: function reset() {
      this.setState({
        formula: '',
        currentInput: '',
        buildingFormula: true,
        lastValue: null
      });
    }
  }, {
    key: "render",
    value: function render() {
      var regBoxSize = {
        height: "35px",
        width: "35px"
      };
      return React.createElement(
        "div",
        { id: "calc-app" },
        React.createElement(
          "div",
          { id: "screen" },
          React.createElement(CalcScreenTop, { formula: this.state.formula }),
          React.createElement(CalcScreenBottom, { input: this.state.currentInput })
        ),
        React.createElement(
          "div",
          { id: "topRow" },
          React.createElement(CalcButton, { sign: "AC", id: "ac", onClick: this.reset }),
          React.createElement(CalcButton, { sign: "/", id: "div", onClick: this.buildFormula }),
          React.createElement(CalcButton, { sign: "X", id: "mult", onClick: this.buildFormula })
        ),
        React.createElement(
          "div",
          { id: "bottomRow" },
          React.createElement(
            "div",
            { id: "sevenEightNineMinus" },
            React.createElement(CalcButton, { sign: "7", id: "seven", onClick: this.buildFormula }),
            React.createElement(CalcButton, { sign: "8", id: "eight", onClick: this.buildFormula }),
            React.createElement(CalcButton, { sign: "9", id: "nine", onClick: this.buildFormula }),
            React.createElement(CalcButton, { sign: "-", id: "minus", onClick: this.buildFormula })
          ),
          React.createElement(
            "div",
            { id: "fourFiveSixPlus" },
            React.createElement(CalcButton, { sign: "4", id: "four", onClick: this.buildFormula }),
            React.createElement(CalcButton, { sign: "5", id: "five", onClick: this.buildFormula }),
            React.createElement(CalcButton, { sign: "6", id: "six", onClick: this.buildFormula }),
            React.createElement(CalcButton, { sign: "+", id: "plus", onClick: this.buildFormula })
          ),
          React.createElement(
            "div",
            { id: "innerBottomRow" },
            React.createElement(
              "div",
              { id: "oneTwoThreeDec" },
              React.createElement(CalcButton, { sign: "1", id: "one", onClick: this.buildFormula }),
              React.createElement(CalcButton, { sign: "2", id: "two", onClick: this.buildFormula }),
              React.createElement(CalcButton, { sign: "3", id: "three", onClick: this.buildFormula }),
              React.createElement(CalcButton, { sign: "0", id: "zero", onClick: this.buildFormula }),
              React.createElement(CalcButton, { sign: ".", id: "decimal", onClick: this.buildFormula })
            ),
            React.createElement(
              "div",
              { id: "equal" },
              React.createElement(CalcButton, { sign: "=", id: "equals", onClick: this.solveFormula })
            )
          )
        )
      );
    }
  }]);

  return App;
}(React.Component);

var domContainer = document.getElementById('app');
ReactDOM.render(React.createElement(App, null), domContainer);
