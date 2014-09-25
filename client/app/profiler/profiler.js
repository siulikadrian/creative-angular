'use strict';

angular.module('creativeRecruitmentApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/profiler', {
        templateUrl: 'app/profiler/profiler.html',
        controller: 'ProfilerController'
      })
      .when('/profiler/questions', {
        templateUrl: 'app/profiler/profiler.questions.html',
        controller: 'ProfilerController'
      })
      .when('/profiler/result', {
        templateUrl: 'app/profiler/profiler.result.html',
        controller: 'ProfilerController'
      });      
  });