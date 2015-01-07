'use strict';

angular.module('creativeRecruitmentApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/profiler/login', {
        templateUrl: 'app/profiler/profiler.login.html',
        controller: 'ProfilerLoginController'
      })
      .when('/profiler', {
        templateUrl: 'app/profiler/profiler.html',
        controller: 'ProfilerController',
        authenticate: true
      })
      .when('/profiler/questions', {
        templateUrl: 'app/profiler/profiler.questions.html',
        controller: 'ProfilerController',
        authenticate: true
      })
      .when('/profiler/start', {
        templateUrl: 'app/profiler/profiler.from.html',
        controller: 'ProfilerController',
        authenticate: true
      })
      .when('/profiler/result', {
        templateUrl: 'app/profiler/profiler.result.html',
        controller: 'ProfilerController'
      })
      .when('/profiler/list', {
        templateUrl: 'app/profiler/profiler.list.html',
        controller: 'ProfilerListController',
        isAdmin: true
      })
      .when('/profiler/list', {
        templateUrl: 'app/profiler/profiler.list.html',
        controller: 'ProfilerListController',
        isAdmin: true
      })
      .when('/profiler/client/user/:id', {
        templateUrl: 'app/profiler/profiler.clientuser.html',
        controller: 'ProfilerSingleClientUser'
      })
      .when('/profiler/user/:id', {
        templateUrl: 'app/profiler/profiler.user.html',
        controller: 'ProfilerSingleUser',
        isAdmin: true
      });
  });
