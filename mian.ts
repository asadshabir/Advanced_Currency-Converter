import chalk from "chalk";
import inquirer from "inquirer";


//     Currency Converter API LINK
const apiLink = "https://v6.exchangerate-api.com/v6/b9af1d4125beebadf6d0b3b0/latest/PKR"

//     Fatching Data 
const currencies = async(data:string)=>{
    let fetchData = await fetch(data)
    let res = await fetchData.json()
    return  res.conversion_rates;
}
const data = await currencies(apiLink)

// Converting Object To Array 
const countries = Object.keys(data)

// User Input First Country 
const firstCountry = await inquirer.prompt(
    [
        {
            name : "fc",
            type : "list",
            message : chalk.bold.magentaBright("Converting From :"),
            choices : countries
        }
    ]
)

// First Country Money 

const amount = await inquirer.prompt(
    [
        {
            name : "rupee",
            type : "number",
            message : chalk.bold.yellowBright(`Enter Converting Amount in ${chalk.bold.greenBright(firstCountry.fc)} :`),
            
        }
    ]
)

// Converting Country 
const secondCountry = await inquirer.prompt(
    [
        {
            name : "sc",
            type : "list",
            message : chalk.bold.cyanBright("Converting To :"),
            choices : countries,
        }
    ]
)

// Conversion rate 
const conversion_rates = `https://v6.exchangerate-api.com/v6/b9af1d4125beebadf6d0b3b0/pair/${firstCountry.fc}/${secondCountry.sc}`

// Fatching Conversion rate Data .
const cvr = async(data:string)=>{
    let getData = await fetch(data)
    let res = await getData.json()
    return  res.conversion_rate;
}

const cvrData = await cvr(conversion_rates)
const converted = amount.rupee * cvrData
console.log(chalk.bold(`Your ${chalk.bold.magentaBright(firstCountry.fc)} ${chalk.bold.yellowBright(amount.rupee)} in ${chalk.bold.cyanBright(secondCountry.sc)} is ${chalk.bold.greenBright(converted)}`));
