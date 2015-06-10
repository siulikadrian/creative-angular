/**
 * Created by Adrian Siulik on 2014-11-17.
 */
angular.module('creativeRecruitmentApp')
  .directive('adminDctv', function(){

    return {

      restrict: 'E',
      templateUrl: 'app/profiler/dctvTpl/adminDctvTpl.html',
      controller: function($scope, $rootScope, $location, Auth){


        function logout(){
          Auth.logout();
          $rootScope.currentUser = {};
        }

        $rootScope.goToQuestionList = function(){
          $location.path('/profiler/list');
        };

        $scope.logout = logout;

      },
      link: function(scope, element, attr, ctrl){

      }
    }

  })
  .directive('navControllDctv', function(){

    return {
      restrict: 'A',
      controller: function($scope, $rootScope, $location){

        $rootScope.$on('$routeChangeStart', function (event, next) {
              $scope.currentPath = next.$$route.originalPath;
        });

      },
      link: function(scope, element, attr, model){

        scope.$watch('currentPath', function(newvalue, value){
            if(newvalue){
                if(newvalue.indexOf("profiler") > -1){
                  if(element.hasClass('nav-profiler')) return;
                  element.addClass('nav-profiler');
                } else {
                  element.removeClass('nav-profiler');
                }
            }
        });
      }
    }

  })
  .directive('detalisInfo', function(){

    return {

      restrict: 'E',
      templateUrl: 'app/profiler/dctvTpl/detalisInfo.html',
      scope: {
        data: "@"
      },
      controller: function($scope){    

          $scope.detalisInfoShow = false;

          $scope.showDetalis = function(){

              if($scope.detalisInfoShow) {
                $scope.detalisInfoShow = false;
              } else {
                $scope.detalisInfoShow = true;
              }
          };

      },
      link: function(scope, element, attr, ctrl){

        scope.detalisData = attr.data;

      }
    }

  });
