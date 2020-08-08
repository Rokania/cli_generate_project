#! /usr/bin/env node
const inquirer = require('inquirer');
const runCmd = require('./src/executeCmd');

inquirer.prompt([
	{
		type: 'input',
		name: 'name',
		message: 'What is the name of the project ?'
	},
	{
		type: 'list',
		name: 'type',
		message: 'Which type of project do you want?',
		choices: ['Ionic', 'Angular', 'Node.JS']
	},
	{
		type: 'list',
		name: 'template',
		message: 'Which template do you want?',
		choices: ['Blank', 'Nebular'],
		when: a => a.type === 'Angular'
	},
	{
		type: 'list',
		name: 'template',
		message: 'Which template do you want?',
		choices: ['Express API'],
		when: a => a.type === 'Node.JS'
	}
]).then(project => {
	console.log(`⏳ Génération du projet ${project.type}`);
	if (project.type === 'Ionic app') {
		runCmd('npx', ['ionic', 'start', project.name, 'blank', '--type=angular']);
	} else if (project.type === 'Node.JS') {
		if (project.template === 'Express API') {
			runCmd('npx', ['create-express-api', project.name]);
		}
	} else if (project.type === 'Angular') {
		runCmd('npx', ['ng', 'new', project.name])
			.then(_ => {
				if (project.template === 'Nebular') {
					console.log(`⏳ Ajout de Nebular ...`);
					runCmd('npx', ['ng', 'add', '@nebular/theme'], { cwd: process.cwd() + '/' + project.name })
				}
			})
	}
});