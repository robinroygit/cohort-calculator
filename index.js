

  
let screen = document.getElementById("screen");
let buttons = document.querySelectorAll("button");
let screenValue = "";
let lastAnswer = "";


function calculateExpression(expression) {
    try {

        expression = expression.replace(/x/g, "*").replace(/÷/g, "/");


        expression = expression.replace(/(\d*)√(\d+(\.\d+)?)/g, (match, num, rootValue) => {
            return num ? `${num}*Math.sqrt(${rootValue})` : `Math.sqrt(${rootValue})`;
        });

        let result = new Function(`return ${expression}`)();
        if (!isFinite(result)) throw "Math Error";
        return result;
    } catch (error) {
        return "Error";
    }
}


buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        let buttonText = e.target.innerText;

        if (buttonText === "x") {
            screenValue += "x";
        } else if (buttonText === "÷") {
            screenValue += "/";
        } else if (buttonText === "clr") {
            screenValue = "";
        } else if (buttonText === "del") {
            screenValue = screenValue.slice(0, -1);
        } else if (buttonText === "ans") {
            screenValue += lastAnswer;
        } else if (buttonText === "√") {

            let lastChar = screenValue.slice(-1);
            if (lastChar >= "0" && lastChar <= "9") {
                screenValue += "√";
            } else {
                screenValue += "√";
            }
        } else if (buttonText === "±") {
            if (screenValue.length > 0) {
                screenValue = (parseFloat(screenValue) * -1).toString();
            }
        } else if (buttonText === "ENTER") {
            let result = calculateExpression(screenValue);
            lastAnswer = result;
            screenValue = result.toString();
        } else {
            screenValue += buttonText;
        }

        screen.value = screenValue;
    });
});


