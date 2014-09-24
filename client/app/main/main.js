'use strict';

angular.module('creativeRecruitmentApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/about', {
        templateUrl: 'app/main/about.html',
        controller: 'MainCtrl'
      })
      .when('/co-robimy', {
        templateUrl: 'app/main/doing.html',
        controller: 'MainCtrl'
      })
      .when('/jak-dzialamy', {
        templateUrl: 'app/main/working.html',
        controller: 'MainCtrl'
      })
      .when('/wartosci-misja', {
        templateUrl: 'app/main/values.html',
        controller: 'MainCtrl'
      })
      .when('/obszar-dzialania', {
        templateUrl: 'app/main/area.html',
        controller: 'MainCtrl'
      });
      
  });