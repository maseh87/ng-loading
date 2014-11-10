angular-c3    [![Build Status](https://travis-ci.org/maseh87/c3-chart.svg?branch=master)](https://travis-ci.org/maseh87/c3-chart)   <img src="http://img.shields.io/badge/Built%20with-Gulp-red.svg" />
===============

### A simple way to add custom C3 charts to your angular apps. Charts based off [C3](http://http://c3js.org/).

## Dependencies
+ Angular.js (1.2+)
+ C3js
+ D3js

## Downloading
1. The best way to install angular-c3 is to use bower
    + ```bower install angular-c3 --save```
2. Or, from this repo
  + you'll need the main file in ```dist/c3-chart.js```

## Using
+ Adding a C3 chart is as simple as adding the c3-chart directive to your HTML. Also add the data attribute to point to the data inside your controller.

```html
<c3-chart data="data"></c3-chart>
```

```javascript
angular.module('chartApp', ['angular-c3'])
.controller('ChartController', function($scope){
  $scope.data = {
    columns : [
      ['data1', 30, 200, 100, 400, 150, 250],
      ['data2', 50, 20, 10, 40, 15, 25]
    ]
  };
});
```

##Contributing
1. Fork it
2. Clone your fork
3. Create new branch
4. Make changes
5. Make test and check test
6. Build it, run ```gulp``` and the files will be linted, concatenated, and minified
7. Push to new branch on your forked repo
8. Pull request from your branch to angular-c3 master

###Format for pull request
+ Pretty standard
  + in your commit message; ```(type) message [issue # closed]```
    + ```(bug) killed that bug, closes #45```
+ Submit issues as you see them. There are probably better, faster, easier ways to achieve what angular-c3 is designed to do so.

###Testing
+ angular-c3 uses Karma + Mocha + Travis for unit and ci
+ Make sure you didn't break anything
  + run ```karma start``` to test in Chrome with karma
+ Features will not be accepted without specs created for them
+ Run ```gulp watch``` and all the source files will be watched and concatenated
+ Open the ```index.html``` and use the test app as a playground