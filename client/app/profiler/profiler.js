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
        controller: 'ProfilerController'
      })
      .when('/profiler/questions', {
        templateUrl: 'app/profiler/profiler.questions.html',
        controller: 'ProfilerController'
      })
      .when('/profiler/start', {
        templateUrl: 'app/profiler/profiler.from.html',
        controller: 'ProfilerController'
      })
      .when('/profiler/result', {
        templateUrl: 'app/profiler/profiler.result.html',
        controller: 'ProfilerController'
      })
      .when('/profiler/list', {
        templateUrl: 'app/profiler/profiler.list.html',
        controller: 'ProfilerListController'
      })
      .when('/profiler/user/:id', {
        templateUrl: 'app/profiler/profiler.user.html',
        controller: 'ProfilerSingleUser'
      });      
  });