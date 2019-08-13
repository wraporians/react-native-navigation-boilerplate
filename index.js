#!/usr/bin/env node
"use strict";
// var prompts = require("prompts");
var shell = require("shelljs");
var argv = require("minimist")(process.argv.slice(2));
const chalk = require("chalk");
// console.log(argv);

let response = {
  projectName: argv._[0],
  bundleName: argv.b || `com.${argv._[0]}`,
  projectConfirm: true
};

// var fs = require("fs");
// var projectName="";
// var bundleName="";
// if(process.argv.length<1){

// }
// for (let j = 0; j < process.argv.length; j++) {
//   console.log(j + ' -> ' + (process.argv[j]));
// }
// prompts([
//   {
//     type: "text",
//     name: "projectName",
//     message: "What will be your project name?",
//     validate: function validate(projectName) {
//       var regex = new RegExp("^[a-z-]+$");
//       return regex.test(projectName) ? true : false;
//     }
//   },
//   {
//     type: "text",
//     name: "bundleName",
//     message: "What will be your bundle identifier?",
//     validate: function validate(bundleName) {
//       var regex = new RegExp(/com\.[a-z]/);
//       return regex.test(bundleName) ? true : false;
//     }
//   },
//   {
//     type: "select",
//     name: "projectPath",
//     message: "Where to generate the project?",
//     choices: [
//       { title: "Current folder", value: "current" },
//       { title: "Create folder from project name", value: "create" }
//     ]
//   },
//   {
//     type: "toggle",
//     name: "projectConfirm",
//     message: "Are you sure you want proceed?",
//     initial: true,
//     active: "yes",
//     inactive: "no"
//   }
// ]).then(function(response) {

// });
const pattern = /^[A-Za-z0-9_]*$/g;
const bundlePattern = /^([A-Za-z]{1}[A-Za-z\d_]*\.)*[A-Za-z][A-Za-z\d_]*$/g;
if (response.projectConfirm) {
  // Initialize Current Path
  var currentPath = shell.pwd();
  var projectPath = shell.pwd();
  // Check type of project
  if (
    response.projectName === "reactNativeStarterV2" ||
    response.projectName === "reactnativestarterv2"
  ) {
    return console.log(chalk.red("You should try different project name"));
  }

  if (response.bundleName) {
    if (!bundlePattern.test(response.bundleName)) {
      return console.log(
        chalk.red("Invalid Bundle Identifier. should be in lower case")
      );
    }
    const id = response.bundleName.split(".");
    if (id.length < 2)
      return console.log(
        chalk.red(
          'Invalid Bundle Identifier. Add something like "com.myApp" or "abc.example.app"'
        )
      );
  }

  if (!pattern.test(response.projectName)) {
    return console.log(
      chalk.red(
        `"${
          response.projectName
        }" is not a valid name for a project. Please use a valid identifier name (alphanumeric and space).`
      )
    );
  }
  console.log(
    chalk.yellow("Please wait, i am generating a fresh project for you.")
  );
  shell.mkdir(response.projectName);
  projectPath = currentPath + "/" + response.projectName;

  // Move to project path
  shell.cd(projectPath);

  // Pull and Process the project
  let bundleArray = response.bundleName.split(".");
  let projectFolder = bundleArray.join("/");

  // console.log("projectFolder", projectFolder);
  let projectURL =
    "git clone https://github.com/surajSanwal/react-native-navigation-starter.git";
  shell.exec(projectURL, { silent: true });
  shell.rm("-rf", ".git");
  shell.rm("-rf", "package-lock.json");
  shell.rm("-rf", "yarn.lock");
  shell.mkdir("-p", `android/app/src/main/java/${projectFolder}`);
  shell.mv(
    "-f",
    `android/app/src/main/java/com/starter/MainActivity.java`,
    `android/app/src/main/java/${projectFolder}/MainActivity.java`
  );
  shell.mv(
    "-f",
    `android/app/src/main/java/com/starter/MainApplication.java`,
    `android/app/src/main/java/${projectFolder}/MainApplication.java`
  );
  if (bundleArray[0] == "com") {
    shell.rm("-rf", "android/app/src/main/java/com/starter");
  } else {
    shell.rm("-rf", "android/app/src/main/java/com");
  }
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
  shell.sed("-i", "reactNativeStarterV2", response.projectName, [
    "package.json",
    "app.json",
    "android/app/src/main/res/values/strings.xml",
    "android/settings.gradle",
    `ios/${response.projectName}/Base.lproj/LaunchScreen.xib`
  ]);
  shell.sed("-i", "com.starter", response.bundleName, [
    "android/app/build.gradle",
    "android/app/BUCK",
    `android/app/src/main/java/${projectFolder}/MainActivity.java`,
    `android/app/src/main/java/${projectFolder}/MainApplication.java`,
    "android/app/src/main/AndroidManifest.xml",
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
    `ios/${response.projectName}Tests.xcodeproj/project.pbxproj`,
    `ios/${response.projectName}/Base.lproj/LaunchScreen.xib`
  ]);
  shell.sed("-i", "RNFramework", response.projectName, [
    "android/app/build.gradle",
    "android/app/BUCK",
    `android/app/src/main/java/${projectFolder}/MainActivity.java`,
    `android/app/src/main/java/${projectFolder}/MainApplication.java`,
    "android/app/src/main/AndroidManifest.xml",
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
    `ios/${response.projectName}.xcodeproj/project.xcworkspace`,
    `ios/${response.projectName}/Base.lproj/LaunchScreen.xib`
  ]);
  shell.rm("-rf", "android/app/build");
  // shell.exec(
  //   "yarn && ./node_modules/react-native/scripts/ios-install-third-party.sh && ./node_modules/react-native/third-party/glog-0.3.5/configure "
  // );
  // Move back to the path where the input was made
  shell.cd(currentPath);

  // Show Greetings
  console.log(
    chalk.green(
      "\nProject is generated successfully.\n\n\nFollow following steps for start working...."
    )
  );
  console.log(
    chalk.green(
      "\n\n\n  cd ",
      response.projectName,
      "\n\n\n  yarn && react-native run-ios or react-native run-ios"
    )
  );
  console.log(
    chalk.blue(
      "\nThank you for installing react-native-navigation-boilerplate.\n\n\n\n\n ***********  Happy Coding  ************ \n\n\n\n"
    )
  );
} else {
  console.log(chalk.red("\nProject generation cancelled. try again"));
}
