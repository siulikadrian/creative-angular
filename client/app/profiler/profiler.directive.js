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

              console.log($scope.detalisData);

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
