// let screen = document.getElementById("screen");
// let buttons = document.querySelectorAll("button");
// let screenValue = '';

// for(item of buttons){
    
//     item.addEventListener('click', function(e){
//         let buttonText=e.target.innerText;
//         console.log(buttonText);
//         if(buttonText=='X'){
//             buttonText='*'
//             screenValue += buttonText;
//             screen.value = screenValue;
//         }
//         else if(buttonText=='clr'){
//             screenValue = "";
//             screen.value=screenValue;

//         }
//         else if(buttonText=='ENTER' || buttonText=='ans'){
//             screen.value= eval(screenValue);
            

//         }
//         else if(buttonText=='del'){
//             screenValue =screenValue.slice(0, -1);
        
//             screen.value=screenValue;


//         }
//         else{

//             screenValue += buttonText;
//             screen.value = screenValue;
//         }

//     })
    
// };


    //    let screen = document.getElementById("screen");
    //     let buttons = document.querySelectorAll("button");
    //     let screenValue = '';
    //     let lastAnswer = "";

    //     buttons.forEach(button => {
    //         button.addEventListener('click', (e) => {
    //             let buttonText = e.target.innerText;
                
    //             if (buttonText === 'x') {
    //                 buttonText = 'x';
    //             } else if (buttonText === '÷') {
    //                 buttonText = '/';
    //             } else if (buttonText === 'π') {
    //                 buttonText = 'Math.PI';
    //             } else if (buttonText === 'e') {
    //                 buttonText = 'Math.E';
    //             } else if (buttonText === '√') {
    //                 buttonText = '√';
    //             } else if (buttonText === 'clr') {
    //                 screenValue = "";
    //                 screen.value = screenValue;
    //                 return;
    //             }else if (buttonText === "ans") {
    //                              screenValue += lastAnswer;
    //                  }
                
    //             else if (buttonText === 'del') {
    //                 screenValue = screenValue.slice(0, -1);
    //                 screen.value = screenValue;
    //                 return;
    //             } else if (buttonText === 'ENTER') {
    //                 try {
    //                     screenValue = processExpression(screenValue);
    //                     lastAnswer = screenValue;
    //                     screen.value = screenValue;
    //                 } catch (error) {
    //                     screen.value = "Error";
    //                 }
    //                 return;
    //             }
    //             else {
    //                              screenValue += buttonText;
    //                        }

    //             screen.value = screenValue;
    //         });
    //     });

    //     function processExpression(expression) {
    //         expression = expression.replace(/x/g, "*").replace(/÷/g, "/");
    //         // Convert square root notation: 2√3 → 2 * Math.sqrt(3)
    //         expression = expression.replace(/(\d*)√(\d+(\.\d+)?)/g, (match, num, rootValue) => {
    //             return num ? `${num}*Math.sqrt(${rootValue})` : `Math.sqrt(${rootValue})`;
    //         });

    //         // Replace % with /100 for percentage calculations
    //         expression = expression.replace(/(\d+)%/g, (match, num) => `${num}/100`);

    //         // Ensure only mathematical expressions are executed
    //         return new Function(`return ${expression}`)();
    //     }




  
let screen = document.getElementById("screen");
let buttons = document.querySelectorAll("button");
let screenValue = "";
let lastAnswer = "";

// Function to evaluate expressions safely
function calculateExpression(expression) {
    try {
        // Replace mathematical symbols with valid JavaScript operators
        expression = expression.replace(/x/g, "*").replace(/÷/g, "/");

        // Handle square root: Convert cases like "2√3" into "2*Math.sqrt(3)"
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

// Event listener for button clicks
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
            // If a number exists before `√`, add multiplication symbol (e.g., `2√3` → `2*√3`)
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


