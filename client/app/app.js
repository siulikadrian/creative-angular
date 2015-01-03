'use strict';

angular.module('creativeRecruitmentApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'ui.bootstrap.tpls',
  'ui.bootstrap.transition'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/about'
      });

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth) {

    //general rootScope methods

    function logout(){
      Auth.logout();
      $rootScope.currentUser = {};
    }

    $rootScope.logout = logout;


    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {

      console.log('rootScope', $rootScope.currentUser);

      Auth.isLoggedInAsync(function(loggedIn) {

        var isAdmin = Auth.isAdmin();
        console.log('is admin', isAdmin);

        if(next.isAdmin && !isAdmin){
          console.log('nie masz uprawnien zeby przejsc do tej strony');
          $location.path('/');
        }

        if (next.authenticate && !loggedIn) {
          $location.path('/profiler/login');
        }
      });
    });
  });
