#! /usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import { differenceInSeconds } from 'date-fns';

const res = await inquirer.prompt([{
    name:'userInput',
    message:'Please Enter count down from:',
    type:'number',
    validate: (input)=> {
        if(isNaN(input)){
            return 'Please enter valid number'
        }else if(input > 60){
            return 'count down must be in 60'
        }else{
            return true
        }
    }
}]);
let input= res.userInput

function startTime (val:number){
    const intTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date (intTime);
    setInterval((()=>{
        const curreTime = new Date()
        const timeDiff = differenceInSeconds(intervalTime , curreTime);

        if(timeDiff <= 0){
            console.log(chalk.red.italic('Time has expired'));
            process.exit()
            
        }
        const min = Math.floor((timeDiff%(3600 * 24))/3600)
        const sec = Math.floor(timeDiff%60)
        console.log(chalk.blue.bold(`${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`));
        
    }),1000)
}
startTime(input);