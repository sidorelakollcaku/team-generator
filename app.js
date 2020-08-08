const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const managerQuestions = [
    {
        type: "input",
        message: "Managers name: ",
        name: "managerName"
    },
    {
        type: "input",
        message: "Managers ID number: ",
        name: "managerID"
    },
    {
      type: "input",
      message: "Managers Email address: ",
      name: "managerEmail"
    },
    {
      type: "input",
      message: "Managers office number: ",
      name: "managerOffice"
    }
]

const engineerQuestions = [
  {
      type: "input",
      message: "Engineer name: ",
      name: "engName"
  },
  {
      type: "input",
      message: "Engineers ID number: ",
      name: "engID"
  },
  {
    type: "input",
    message: "Engineers Email address: ",
    name: "engEmail"
  },
  {
    type: "input",
    message: " Emgineers github username: ",
    name: "engGithub"
  }
]

const internQuestions = [
  {
      type: "input",
      message: "Interns name: ",
      name: "internName"
  },
  {
      type: "input",
      message: "Interns ID numer: ",
      name: "internID"
  },
  {
    type: "input",
    message: "Interns Email address: ",
    name: "internEmail"
  },
  {
    type: "input",
    message: "Interns present school attendence:",
    name: "internSchool"
  }
]

var employees = [];

newManager = () => {
  
  inquirer.prompt(managerQuestions).then(res => {
    
    employees.push(new Manager(res.managerName, res.managerID, res.managerEmail, res.managerOffice));
    newEmp();
    
  });
}
newEmp = () => {
  inquirer.prompt([
    {
      type: "list",
      message: "Pick one of the choices for employee ",
      name: "empType",
      choices: [
        "Engineer",
        "Intern",
        "Im done"
      ]
    }
  ]).then(res => {
    
    if (res.empType === "Engineer") {
      newEngineer();
    } else if (res.empType === "Intern") {
      newIntern();
    } else {
      if (!fs.existsSync(OUTPUT_DIR)) {
        console.log("Creating output directory..");
        fs.mkdirSync(OUTPUT_DIR);
      }
      
      fs.writeFile(outputPath, render(employees), "utf8", function() {
        console.log("File successfully created!");
      })
    }
  }).catch(error => {
    console.log("Failed creating the file.");
    console.log(error);
  });  
}

newEngineer = () => {
  inquirer.prompt(engineerQuestions).then(res => {
    employees.push(new Engineer(res.engName, res.engID, res.engEmail, res.engGithub));
    newEmp();
  })
}

newIntern = () => {
  inquirer.prompt(internQuestions).then(res => {
    employees.push(new Intern(res.internName, res.internID, res.internEmail, res.internSchool));
    newEmp();
  })
}

newManager();