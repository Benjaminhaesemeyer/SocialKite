var myApp = angular.module('myApp', ['ngRoute']);

/// Routes ///
myApp.config(function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  console.log('myApp -- config');
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'LoginController as lc',
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as lc'
    })
    .when('/user', {
      templateUrl: '/views/templates/user.html',
      controller: 'UserController as uc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/activity', {
      templateUrl: '/views/templates/activity.html',
      controller: 'ActivityController as ac',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/challenge', {
      templateUrl: '/views/templates/challenge.html',
      controller: 'ChallengeController as cc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        },
      }
    })
    .otherwise({
      redirectTo: 'home'
    });
});
