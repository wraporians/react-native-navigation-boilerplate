#!/usr/bin/env node
"use strict";

var prompts = require("prompts");
var shell = require("shelljs");

prompts([
  {
    type: "text",
    name: "projectName",
    message: "What will be your project name?",
    validate: function validate(projectName) {
      var regex = new RegExp("^[a-z-]+$");
      return regex.test(projectName) ? true : false;
    }
  },
  {
    type: "text",
    name: "bundleName",
    message: "What will be your bundle identifire?",
    validate: function validate(bundleName) {
      var regex = new RegExp("^[a-z-]+$");
      return regex.test(bundleName) ? true : false;
    }
  },
  {
    type: "select",
    name: "projectPath",
    message: "Where to generate the project?",
    choices: [
      { title: "Current folder", value: "current" },
      { title: "Create folder from project name", value: "create" }
    ]
  },
  {
    type: "toggle",
    name: "projectConfirm",
    message: "Are you sure you want proceed?",
    initial: true,
    active: "yes",
    inactive: "no"
  }
]).then(function(response) {
  if (response.projectConfirm) {
    // Initialize Current Path
    var currentPath = shell.pwd();
    var projectPath = shell.pwd();
    var projectURL = "";

    // Check type of project
    if (response.projectPath == "create") {
      shell.mkdir(response.projectName);
      projectPath = currentPath + "/" + response.projectName;
    }

    // Move to project path
    shell.cd(projectPath);

    // Pull and Process the project
    projectURL =
      "git clone https://github.com/Sonu654/react-native-navigation-v2-starter.git .";
    shell.exec(projectURL, { silent: true });
    shell.rm('-rf', '.git');
    shell.sed("-i", "reactNativeStarterV2", response.projectName, [
      "package.json",
      "package-lock.json",
      "bin/www"
    ]);
    shell.sed("-i","com.starter",response.bundleName,[
        "/android/app/src/starter/MainActivity.java",
        "/android/app/src/starter/MainApplication.java",
        "/android/app/src/manifest.xml",
    ])
    // Move back to the path where the input was made
    shell.cd(currentPath);

    // Show Greetings
    console.log("\nBoilerplate Generated.");
    console.log("\nThank you for trying Lean Boilerplate.");
  } else {
    console.log("\nBoilerplate Generation Cancelled.");
  }
});
