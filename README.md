ngLoading    [![Build Status](https://travis-ci.org/maseh87/ng-loading.svg?branch=master)](https://travis-ci.org/maseh87/ng-loading)   <img src="http://img.shields.io/badge/Built%20with-Gulp-red.svg" />
===============

### A simple and automatic way to add custom loading animations to your angular apps.

## Demo Site
Preview ngLoading in action [here](https://ngloading.firebaseapp.com).

## Dependencies
+ Angular.js (1.2+)
+ lodash

## Downloading
1. The best way to install ngLoading is to use bower
    + ```bower install ng-loading --save```
2. Or, from this repo
  + you'll need the main file in ```dist/```

## Using
+ Adding a loading animation is as simple as adding the ngLoading dependency to your main angular module. ngLoading will listen to any http request made from your application and show the animation, when your application recieves the http response it will remove the animation.

```javascript
angular.module('myApp', ['ngLoading']);
```
+ ngLoading can also be customized a few different ways to show your own animations. Configure ngLoading globally by adding a configuration object into the loadingProvider.

```javascript
angular.module('myApp', ['ngLoading'])
.config(function(loadingProvider) {
  loadingProvider
    .load({
      transitionSpeed: .3s, //default
      class: 'your_css_class', //default is the 'load-bar-inbox' class, another option is the 'spinner' class
        overlay: {
          display: true, //required to apply an overlay
          color: #FEFEFE, //default
          opacity: .3 //default
        }
    });
});
```

+ or configure the loading animation for each individual http request

```javascript
$http({
  loadingConfig: {
    transitionSpeed: '.3s', //default
    overlay: {
      display: true, //required to apply an overlay
      color: #FEFEFE, //default
      opacity: .3 //default
    }
  }
})
```
## Icons
+ Currently ngLoading supports all 3rd party icons. To add an icon just add the icon property to your configuration object.

```javascript
{
  transitionSpeed: '.3s', //default
  icon: 'fa fa-spin fa-spinner fa-5x',
  overlay: {
    display: true, //required to apply an overlay
    color: #FEFEFE, //default
    opacity: .3 //default
  }
}
```
## My app doesn't use http?!
+ ngLoading can also be triggered from anywhere inside your angular app.

```javascript
.controller('MyController', function(Interceptor) {
    //trigger the loading screen to start
    Interceptor.start();

    //trigger it to end
    Interceptor.end();
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
8. Pull request from your branch to ngLoading master

###Format for pull request
+ Pretty standard
  + in your commit message; ```(type) message [issue # closed]```
    + ```(bug) killed that bug, closes #45```
+ Submit issues as you see them. There are probably better, faster, easier ways to achieve what ngLoading is designed to do so.

###Testing
+ ngLoading uses Karma + Mocha + Travis for unit and ci
+ Make sure you didn't break anything
  + run ```karma start``` to test in Chrome with karma
+ Features will not be accepted without specs created for them
+ Run ```gulp watch``` and all the source files will be watched and concatenated
+ Open the ```index.html``` and use the test app as a playground