import inquirer from 'inquirer';
import fs from 'fs';

const questions = [
    {
        message: 'What is the title of your project?',
        type: 'input',
        name: 'title',
    },
    {
        message: 'Please describe your project:',
        type: 'input',
        name: 'description',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'What are the installation instructions?',
    },
    {
        message: 'How do you use this app?',
        type: 'input',
        name: 'usage',
    },
    {
        message: 'What license does your project have?',
        type: 'list',
        name: 'license',
        choices: ['MIT', 'APACHE 2.0', 'GPL 3.0', 'BSD 3', 'None'],
    },
    {
        message: 'What are the contribution guidelines?',
        type: 'input',
        name: 'contributing',
    },
    {
        message: 'What are the test instructions?',
        type: 'input',
        name: 'tests',
    },
    {
        message: 'What is your GitHub username?',
        type: 'input',
        name: 'github',
    },
    {
        message: 'What is your email address?',
        type: 'input',
        name: 'email',
    },
];

// Function to generate license badges
function generateLicenseBadge(license) {
    const badges = {
        'MIT': 'https://img.shields.io/badge/license-MIT-brightgreen.svg',
        'APACHE 2.0': 'https://img.shields.io/badge/license-APACHE%202.0-brightgreen.svg',
        'GPL 3.0': 'https://img.shields.io/badge/license-GPL%203.0-brightgreen.svg',
        'BSD 3': 'https://img.shields.io/badge/license-BSD%203-brightgreen.svg',
        'None': ''
    };
    return badges[license];
}

// Function to generate the license notice
function generateLicenseNotice(license) {
    if (license === 'None') {
        return '';
    } else {
        return `This project is licensed under the ${license} license.`;
    }
}

// Function to generate the README content
function generateREADME(answers) {
    const licenseBadge = generateLicenseBadge(answers.license);
    const licenseNotice = generateLicenseNotice(answers.license); // Get the license notice

    return `# ${answers.title}

${licenseBadge ? `![License](${licenseBadge})` : ''}

## Table of Contents
1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [License](#license)
5. [Contributing](#contributing)
6. [Tests](#tests)
7. [Questions](#questions)

## Description
${answers.description}

## Installation
${answers.installation}

## Usage
${answers.usage}

## License
${licenseNotice}

## Contributing
${answers.contributing}

## Tests
${answers.tests}

## Questions
If you have any questions about the repository, open an issue or contact me directly at [${answers.email}](mailto:${answers.email}). You can find more of my work at [${answers.github}](https://github.com/${answers.github}).
    `;
}

// Function to write the README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {
        if (err) {
            return console.error(err);
        }
        console.log('README.md has been generated!');
    });
}

// Main function to initiate the application
async function init() {
    try {
        console.log("Starting prompt...");
        const answers = await inquirer.prompt(questions);
        console.log("Prompt completed, received answers:", answers);

        const readmeContent = generateREADME(answers);
        writeToFile('README.md', readmeContent);
    } catch (error) {
        console.error('An error occurred while prompting:', error);
    }
}

// Start the application
init();