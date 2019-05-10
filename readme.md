# React Native Navigation V2 Boilerplate

A simple cli to scaffold your React Native Navigation V2 app fast and hybrid mobile app development.

## Installation

```
npm install -g react-native-navigation-boilerplate
```

## Getting Started

After installing the package as a global executable. You will be able to use **"React-Native-Navigation"** command to generate new React Native Navigation boilerplate.

#### Usage

```
react-native-boilerplate <appName>
```

this will ask you project name, bundle identifier and path for project and generate a fresh project.

> With custom Bundle Identifier (Android only. For iOS, please use Xcode)

```
react-native-boilerplate <appName> -b <bundleIdentifier>
```

#### Example

```
react-native-boilerplate "SampleApp"
```

> With custom Bundle Identifier

```
react-native-boilerplate "SampleApp" -b com.abc.SampleApp
```

## Configuration

Follow following steps to run project:-

1. After generating project move to projectDirectory using

   ```
    $ cd ProjectName
    $ yarn
   ```

2. For Android Run Project using

   ```
     $ react-native run-android
   ```

3. For iOS : open xCodeProject and in menu click on product select Scheme ==> Edit Scheme ==> Build
   a) In build option un-check Parallelize Build
   b) Now click on + icon at left bottom corner and add react as target
   c) Open project in xCode and build it once then
   d) Install third party library using following commands

   ```
       $ cd node_modules/react-native/third-party/glog-0.3.5
       $ ../../scripts/ios-configure-glog.sh
       $ cd ../../../../
   ```

   if you are using xcode >10 then change build system to "legacy build system"
   d) Run the project

   ```
    $ react-native run-ios
   ```

## React-Native-Boilerplate Structure

```
├── ios
├── android
|-- modified_modules
├── src
│   ├── actionTypes
│   │   └── index.js
│   ├── actions
│   │   ├── auth
│   │   └── dashboard
│   ├── assets
│   │   ├── img
│   │   └── fonts
│   ├── components
│   │   ├── common
│   │   └── dashboard
│   ├── config
│   │   └── navigation.js
│   │   └── routes.js
│   ├── constants
│   │   ├── fonts.js
│   │   └── images.js
│   ├── containers
│   │   ├── auth
│   │   └── dashboard
│   │── helpers
│   │   ├── events.js
│   │   └── restCall.js
│   │── reducers
│   │   ├── auth
│   │   └── dashboard
│   │── store
│   │── utilities
│   │   ├── backHandling.js
├── app.json
├── index.js
├── package.json
```

## Pre-Installed Packages

- lodash
- react
- react-native
- react-native-keyboard-aware-scroll-view
- react-native-linear-gradient
- react-native-navigation
- react-native-vector-icons
- react-redux
- redux
- redux-immutable-state-invariant
- redux-logger
- redux-persist
- redux-thunk
- seamless-immutable
- babel-preset-react-native (dev)
- jest (dev)
- eslint (dev)
- eslint-plugin-react (dev)
- husky (dev)
- lint-staged (dev)
- prettier (dev)

(dev) Indicates its a Developer Dependency

## Author

Suraj Sanwal
