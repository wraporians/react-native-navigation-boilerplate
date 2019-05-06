#!/usr/bin/env node
"use strict";

var prompts = require("prompts");
var shell = require("shelljs");
// var fs = require("fs");

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
    message: "What will be your bundle identifier?",
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
    shell.rm("-rf", "yarn.lock");
    shell.sed("-i", "reactNativeStarterV2", response.projectName, [
      "package.json",
      "app.json"
    ]);
    shell.mv(
      "-f",
      "android/app/src/main/java/com/starter",
      `android/app/src/main/java/com/${response.projectName}`
    );
    shell.mv(
      "-f",
      "ios/RNFramework.xcodeproj",
      `ios/${response.projectName}.xcodeproj`
    );

    shell.mv("-f", "ios/RNFramework", `ios/${response.projectName}`);
    shell.mv("-f", "ios/RNFramework-tvOS", `ios/${response.projectName}-tvOS`);
    shell.mv(
      "-f",
      "ios/RNFramework-tvOSTests",
      `ios/${response.projectName}-tvOSTests`
    );
    shell.mv(
      "-f",
      "ios/RNFrameworkTests/RNFrameworkTests.m",
      `ios/${response.projectName}Tests/${response.projectName}Tests.m`
    );
    shell.mv("-f", "ios/RNFrameworkTests", `ios/${response.projectName}Tests`);
    shell.mv(
      "-f",
      `ios/${
        response.projectName
      }.xcodeproj/xcshareddata/xcschemes/RNFramework-tvOS.xcscheme`,
      `ios/${response.projectName}.xcodeproj/xcshareddata/xcschemes/${
        response.projectName
      }-tvOS.xcscheme`
    );
    shell.mv(
      "-f",
      `ios/${response.projectName}Tests/RNFrameworkTests.m`,
      `ios/${response.projectName}Tests/${response.projectName}Tests.m`
    );
    shell.mv(
      "-f",
      `ios/${
        response.projectName
      }.xcodeproj/xcshareddata/xcschemes/RNFramework.xcscheme`,
      `ios/${response.projectName}.xcodeproj/xcshareddata/xcschemes/${
        response.projectName
      }.xcscheme`
    );
    shell.rm("-rf", `ios/${response.projectName}.xcodeproj/xcuserdata/`);
    shell.sed("-i", "com.starter", response.bundleName, [
      "android/app/build.gradle",
      `android/app/src/main/java/com/${projectFolder}/MainActivity.java`,
      `android/app/src/main/java/com/${projectFolder}/MainApplication.java`,
      "android/app/src/main/java/manifest.xml",
      `ios/${response.projectName}/info.plist`,
      `ios/${response.projectName}-tvOS/info.plist`,
      `ios/${response.projectName}-tvOSTests/info.plist`,
      `ios/${response.projectName}/info.plist`,
      `ios/${response.projectName}.xcodeproj/project.pbxproj`,
      `ios/${response.projectName}.xcworkspace/contents.xcworkspacedata`,
      `ios/${response.projectName}.xcodeproj/xcshareddata/xcschemes/${
        response.projectName
      }-tvOS.xcscheme`,
      `ios/${response.projectName}.xcodeproj/xcshareddata/xcschemes/${
        response.projectName
      }.xcscheme`,
      `ios/${response.projectName}.xcodeproj/project.pbxproj`,
      `ios/${response.projectName}.xcodeproj/project.xcworkspace`,
      `ios/${response.projectName}/AppDelegate.m`,
      "android/settings.gradle",
      `ios/${response.projectName}Tests/${response.projectName}Tests.m`,
      `ios/${response.projectName}Tests.xcodeproj/project.pbxproj`
    ]);
    shell.sed("-i", "RNFramework", response.projectName, [
      "android/app/build.gradle",
      `android/app/src/main/java/com/${projectFolder}/MainActivity.java`,
      `android/app/src/main/java/com/${projectFolder}/MainApplication.java`,
      "android/app/src/main/java/manifest.xml",
      `ios/${response.projectName}/info.plist`,
      `ios/${response.projectName}-tvOS/info.plist`,
      `ios/${response.projectName}-tvOSTests/info.plist`,
      `ios/${response.projectName}.xcodeproj/project.pbxproj`,
      `ios/${response.projectName}.xcworkspace/contents.xcworkspacedata`,
      `ios/${response.projectName}.xcodeproj/xcshareddata/xcschemes/${
        response.projectName
      }-tvOS.xcscheme`,
      `ios/${response.projectName}.xcodeproj/xcshareddata/xcschemes/${
        response.projectName
      }.xcscheme`,
      `ios/${response.projectName}.xcodeproj/xcshareddata/xcschemes/${
        response.projectName
      }-tvOS.xcscheme`,
      `ios/${response.projectName}/AppDelegate.m`,
      "android/settings.gradle",
      `ios/${response.projectName}Tests/${response.projectName}Tests.m`,
      `ios/${response.projectName}.xcodeproj/project.pbxproj`,
      `ios/${response.projectName}.xcodeproj/project.xcworkspace`
    ]);
    // shell.exec(
    //   "yarn && ./node_modules/react-native/scripts/ios-install-third-party.sh && ./node_modules/react-native/third-party/glog-0.3.5/configure "
    // );
    // Move back to the path where the input was made
    shell.cd(currentPath);

    // Show Greetings
    console.log(
      "\nProject is generated successfully.\n\n\nFollow following steps for start working...."
    );
    console.log(
      "\n\n\n               cd ",
      response.projectName,
      "\n\n\n            react-native run-ios or react-native run-ios"
    );
    console.log(
      "\nThank you for installing react-native-navigation-boilerplate.\n\n\n\n\n ***********  Happy Coding  ************ \n\n\n\n"
    );
  } else {
    console.log("\nProject generation cancelled. try again");
  }
});
