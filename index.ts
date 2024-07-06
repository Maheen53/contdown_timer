#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { differenceInSeconds } from "date-fns";

console.log(chalk.bgYellowBright("\n                               "));
console.log(chalk.bgYellowBright("       "+chalk.bgMagentaBright("COUNTDOWN ")+"    "+chalk.bgMagentaBright("TIMER ")+"            "));
console.log(chalk.bgYellowBright("                                \n"));
console.log(chalk.bgYellow("      "+chalk.bgGreenBright("WELCOME TO MAHEEN IMTIAZ COUNTDOWN TIMER ")+"     "));
console.log(chalk.bgYellowBright("                                \n"));

const runTimer = async () => {
    const res = await inquirer.prompt([
        {
            name: "user_input",
            type: "number",
            message: chalk.bgBlueBright("Please enter the amount of seconds:"), // amount
            validate:(input)=>{
                if(isNaN(input)){
                    return chalk.bgGray("please enter a valid number")
                }else if(input > 60){
                    return chalk.bgRed("Seconds must be in 60")
                }else{
                    return true
                }
            }
        }
    ]);

    let input = res.user_input;

    function startTimer(val:number) {
        const startTime = new Date().getTime();
        const endTime = startTime + val * 1000; // Calculate end time in milliseconds
        const intervalId = setInterval(() => {
            const currentTime = new Date().getTime();
            const timeDiff = Math.floor((endTime - currentTime) / 1000); // Calculate difference in seconds

            if (timeDiff <= 0) {
                clearInterval(intervalId); // Clear interval when time difference is zero or negative
                console.log(chalk.bgGreen("Timer has expired"));
            } else {
                const min = Math.floor(timeDiff / 60);
                const sec = timeDiff % 60;

                console.log(`${min.toString().padStart(2, "0")} : ${sec}`);
            }
        }, 1000);
    }

    startTimer(input);
};

runTimer();
