import React, { useState, useEffect } from "react";
import "./ReactJavaScriptCalculatorApp.css";

function App() {
  const [currentOperand, setCurrentOperand] = useState("");
  const [previousOperand, setPreviousOperand] = useState("");
  const [operation, setOperation] = useState(null);
  const [error, setError] = useState("");

  const handleNumberClick = (number) => {
    if (error) setError("");
    if (number === "0" && currentOperand === "0") return;
    if (number === "." && currentOperand.includes(".")) return;
    setCurrentOperand(currentOperand + number);
  };

  const handleOperationClick = (op) => {
    if (error) setError("");
    if (currentOperand === "" && op !== "-") return;
    if (previousOperand !== "" && currentOperand !== "") {
      handleEquals();
      return;
    }
    setOperation(op);
    setPreviousOperand(currentOperand);
    setCurrentOperand("");
  };

  const handleClear = () => {
    setCurrentOperand("");
    setPreviousOperand("");
    setOperation(null);
    setError("");
  };

  const handleDelete = () => {
    setCurrentOperand(currentOperand.slice(0, -1));
  };

  const handleEquals = () => {
    let result;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) {
      setError("Invalid operation");
      return;
    }

    switch (operation) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "*":
        result = prev * current;
        break;
      case "÷":
        if (current === 0) {
          setError("Cannot divide by zero");
          return;
        }
        result = prev / current;
        break;
      case "^":
        result = Math.pow(prev, current);
        break;
      default:
        return;
    }

    setCurrentOperand(result.toString());
    setOperation(null);
    setPreviousOperand("");
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key >= 0 && event.key <= 9) handleNumberClick(event.key);
      if (event.key === "Enter" || event.key === "=") handleEquals();
      if (event.key === "Escape") handleClear();
      if (event.key === "Backspace") handleDelete();
      if (["+", "-", "*", "/"].includes(event.key)) handleOperationClick(event.key.replace("/", "÷"));
      if (event.key === ".") handleNumberClick(event.key);
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [currentOperand, previousOperand, operation]);

  return (
    <div className="calculator-grid">
      {error && <div className="error-message">{error}</div>}
      <div className="output">
        <div className="previous-operand">
          {previousOperand} {operation}
        </div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button onClick={handleClear}>AC</button>
      <button onClick={handleDelete}>DEL</button>
      {/* Operation buttons with className "operation" for styling */}
      <button className="operation" onClick={() => handleOperationClick("÷")}>÷</button>
      <button className="operation" onClick={() => handleOperationClick("*")}>*</button>
      <button className="operation" onClick={() => handleOperationClick("-")}>-</button>
      <button className="operation" onClick={() => handleOperationClick("+")}>+</button>
      <button className="operation" onClick={() => handleOperationClick("^")}>^</button>
      <button className="operation" onClick={() => setCurrentOperand(Math.sqrt(parseFloat(currentOperand)).toString())}>√</button>
{/* Number and other buttons */}
      <button onClick={() => handleNumberClick("1")}>1</button>
      <button onClick={() => handleNumberClick("2")}>2</button>
      <button onClick={() => handleNumberClick("3")}>3</button>
      <button onClick={() => handleNumberClick("4")}>4</button>
      <button onClick={() => handleNumberClick("5")}>5</button>
      <button onClick={() => handleNumberClick("6")}>6</button>
      <button onClick={() => handleNumberClick("7")}>7</button>
      <button onClick={() => handleNumberClick("8")}>8</button>
      <button onClick={() => handleNumberClick("9")}>9</button>
      <button onClick={() => handleNumberClick("0")}>0</button>
      <button onClick={() => handleNumberClick(".")}>.</button>
      <button onClick={handleEquals}>=</button>
    </div>
  );
}

export default App;
