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
      var regex = new RegExp(/com\.[a-z]/);
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
    var projectFolderArray = [];
    var projectFolder = "";
    // Check type of project
    if (response.projectPath == "create") {
      shell.mkdir(response.projectName);
      projectPath = currentPath + "/" + response.projectName;
    }

    // Move to project path
    shell.cd(projectPath);

    // Pull and Process the project
    projectFolderArray = response.projectName.split(".");
    projectFolder = projectFolderArray[projectFolderArray.length - 1];
    projectURL =
      "git clone https://github.com/Sonu654/react-native-navigation-v2-starter.git .";
    shell.exec(projectURL, { silent: true });
    shell.rm("-rf", ".git");
    shell.rm("-rf", "package-lock.json");
    shell.sed("-i", "reactNativeStarterV2", response.projectName, [
      "package.json",
      "app.json"
    ]);
    shell.sed("-i", "com.starter", response.bundleName, [
      "android/app/build.gradle",
      "android/app/src/main/java/com/starter/MainActivity.java",
      "android/app/src/main/java/com/starter/MainApplication.java",
      "android/app/src/main/java/manifest.xml",
      "ios/RNFramework/info.plist",
      "ios/RNFramework-tvOS/info.plist",
      "ios/RNFramework-tvOSTests/info.plist",
      "ios/RNFrameworkTests/info.plist"
    ]);
    shell.mv(
      "-f",
      "android/app/src/main/java/com/starter",
      `android/app/src/main/java/com/${projectFolder}`
    );
    shell.mv(
      "-f",
      "ios/RNFramework.xcodeproj",
      `ios/${projectFolder}.xcodeproj`
    );

    shell.mv("-f", "ios/RNFramework", `ios/${projectFolder}`);
    shell.mv("-f", "ios/RNFramework-tvOS", `ios/${projectFolder}-tvOS`);
    shell.mv(
      "-f",
      "ios/RNFramework-tvOSTests",
      `ios/${projectFolder}-tvOSTests`
    );
    shell.mv("-f", "ios/RNFrameworkTests", `ios/${projectFolder}Tests`);

    // Move back to the path where the input was made
    shell.cd(currentPath);

    // Show Greetings
    console.log(
      "\nProject is generated successfully.\n\n\nFollow following steps for start working...."
    );
    console.log(
      "\n\n\n               cd ",
      response.projectName,
      "\n\n\n               yarn && react-native run-ios or react-native run-ios"
    );
    console.log(
      "\n\n\nThank you for installing react-native-navigation-boilerplate.\n\n\n\n\n ***********  Happy Coding  ************ \n\n\n\n"
    );
  } else {
    console.log("\nProject generation cancelled. try again");
  }
});
