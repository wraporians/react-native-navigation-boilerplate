# React Native Navigation V2 Boilerplate

A simple cli to scaffold your React Native Navigation V2 app fast and hybrid mobile app development. 

## Installation

```bash
npm install -g react-native-navigation-boilerplate
```

## Getting Started

After installing the package as a global executable. You will be able to use **"React-Native-Navigation"** command to generate new React Native Navigation boilerplate.

```bash
$ react-native-boilerplate
```
this will ask you project name, bundle identifier and path for project and generate a fresh project. 

## Configuration

Follow following steps to run project:-

1) After generating project move to projectDirectory using
    
    ```bash
    $ cd ProjectName
    $ yarn 
    ```

2) For Android 
   Run Project using
    ```bash
    $ react-native run-android
    ```

3) For iOS 
   open xcodeproject and in menu click on product select Scheme ==>  Edit Scheme ==> Build 
   a) in build option un-check Parallelize Build 
   b) now click on + icon at left bottom corner and react as target
   c) install third party library using 
        
        ```bash
        $ ./node_modules/react-native/scripts/ios-configure-glog.sh
        ```
   d) Run the project     
   
    ```bash
    $ react-native run-ios
    ```

## Boilerplate Structure

```bash
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

## Preinstalled Packages

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

(dev) Indicates its a Developer Dependency

## Author 

Suraj Sanwal
