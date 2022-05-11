import { useState } from "react";
import "./App.css";
import Button from "./Button";
import Display from "./Display";
import DisplayHistory from "./DisplayHistory";
import Keypad from "./Keypad";

function calculateResult(calc) {
  let ops = [
    { "^": (a, b) => Math.pow(a, b) },
    { "*": (a, b) => a * b, "/": (a, b) => a / b },
    { "+": (a, b) => a + b, "-": (a, b) => a - b },
  ];
  let newCalc = [];
  let currentOp;

  for (let i = 0; i < ops.length; i++) {
    for (let j = 0; j < calc.length; j++) {
      if (ops[i][calc[j]]) {
        currentOp = ops[i][calc[j]];
      } else if (currentOp) {
        newCalc[newCalc.length - 1] = currentOp(
          newCalc[newCalc.length - 1],
          calc[j]
        );
        currentOp = null;
      } else {
        newCalc.push(calc[j]);
      }
    }
    calc = newCalc;
    newCalc = [];
  }
  if (calc.length > 1) {
    console.log("Error: unable to resolve calculation");
    return calc;
  } else {
    return calc[0];
  }
}

function App() {
  const [displayData, setDisplayData] = useState("");
  const [allData, setAllData] = useState([]);

  const calculate = (exp) => {
    try {
      const operator = ["/", "*", "+", "-"];
      let num = [];
      let indexPoint = -1;
      let i;

      for (i = 0; i < exp.length; i++) {
        if (operator.includes(exp[i])) {
          num.push(+exp.slice(indexPoint + 1, i), exp[i]);
          indexPoint = i;
        }
        if (i == exp.length - 1) {
          console.log(indexPoint);
          num.push(+exp.slice(indexPoint + 1, i + 1));
        }
      }

      let newNum = [...num];

      let j;
      let result = 0;
      for (j = 0; j < operator.length; j++) {
        if (newNum.includes(operator[j])) {
          let index = newNum.indexOf(operator[j]);

          switch (operator[j]) {
            case "/":
              result = newNum[index - 1] / newNum[index + 1];

              break;
            case "*":
              result = newNum[index - 1] * newNum[index + 1];

              break;
            case "+":
              result = newNum[index - 1] + newNum[index + 1];

              break;
            case "-":
              result = newNum[index - 1] - newNum[index + 1];

              break;
            default:
          }
          newNum.splice(index - 1, 3, result);
          j = -1;
        }
      }

      // result = math.format(result, { precision: 14 });
      if (result) {
        allData.push(displayData + "=" + result);
        setDisplayData(result);
      }
    } catch (e) {
      setDisplayData("error");
    }
  };
  const handleButtonClick = (e) => {
    const value = e.target.getAttribute("data-value");
    switch (value) {
      case "clear":
        setDisplayData("");
        break;
      case "equal":
        calculate(displayData);
        break;
      case "clr":
        setDisplayData("");
        setAllData([]);
        break;
      default:
        setDisplayData(displayData + value);
    }
  };
  return (
    <div className="Calculator">
      <Display data={displayData} />
      <Keypad>
        <Button onClick={handleButtonClick} label="C" value="clear" />
        <Button onClick={handleButtonClick} label="7" value="7" />
        <Button onClick={handleButtonClick} label="4" value="4" />
        <Button onClick={handleButtonClick} label="1" value="1" />
        <Button onClick={handleButtonClick} label="0" value="0" />

        <Button onClick={handleButtonClick} label="/" value="/" />
        <Button onClick={handleButtonClick} label="8" value="8" />
        <Button onClick={handleButtonClick} label="5" value="5" />
        <Button onClick={handleButtonClick} label="2" value="2" />
        <Button onClick={handleButtonClick} label="." value="." />

        <Button onClick={handleButtonClick} label="x" value="*" />
        <Button onClick={handleButtonClick} label="9" value="9" />
        <Button onClick={handleButtonClick} label="6" value="6" />
        <Button onClick={handleButtonClick} label="3" value="3" />
        <Button onClick={handleButtonClick} label="CLR" value="clr" />

        <Button onClick={handleButtonClick} label="-" value="-" />
        <Button onClick={handleButtonClick} label="+" size="2" value="+" />
        <Button onClick={handleButtonClick} label="=" size="2" value="equal" />
      </Keypad>
      {allData ? <DisplayHistory data={allData} /> : null}
    </div>
  );
}

export default App;
