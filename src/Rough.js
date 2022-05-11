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

let s = "12/3";
let calculation = [],
  current = "";
for (let i = 0, ch; (ch = s.charAt(i)); i++) {
  if ("^*/+-".indexOf(ch) > -1) {
    if (current === "" && ch == "-") {
      current = "-";
    } else {
      calculation.push(parseFloat(current), ch);
      current = "";
    }
  } else {
    current += s.charAt(i);
  }
}

if (current !== "") {
  calculation.push(parseFloat(current));
}
