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

  });
