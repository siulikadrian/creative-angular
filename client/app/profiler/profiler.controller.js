'use strict';

angular.module('creativeRecruitmentApp')
  .controller('ProfilerController', function ($scope, $http, $location, $timeout) {

	  		

	$http({method: 'GET', url: '/assets/data/questions.json'})

	  .success(function(questions) {
	    $scope.questions = questions.questions;
	    $scope.currentQuestion = $scope.questions[$scope.actualQuestion];
	    
	  })
	  .error(function(data, status, headers, config) {
	    console.log(data,status,headers,config);
	    alert('wystapił błąd', data, status);

	});

	var resultToSend = {
		startTime: '',
		endTime: '',
		result: {}
	};

	$scope.hideNext = false;

	$scope.$watch('actualQuestion', function(){

		$timeout(function(){
			$scope.currentQuestion = $scope.questions[$scope.actualQuestion];
			if($scope.actualQuestion === ($scope.questions.length - 1)) $scope.hideNext = true
		}, 100);



		console.log('from watcher', $scope.actualQuestion);

	});

	$scope.actualQuestion = 0;

	$scope.sendProfilerQuestions = function(){

		if($scope.currentQuestion.answer === "") {

			alert('nie wypelniles odpowiedzi!!!');
			return;

		}

		var e = new Date();
		resultToSend.endTime = e;

		angular.forEach($scope.questions, function(value, key) {
			resultToSend.result[key] = {
				question: value.question,
				answer: value.answer
			}
		});	

		console.log(resultToSend);

		resultToSend = {
			startTime: '',
			endTime: '',
			result: {}
		};
		
		$scope.endProfiler();
	};

	$scope.nextQuestion = function(){

		if($scope.currentQuestion.answer === "") {

			alert('nie wypelniles odpowiedzi!!!');
			return;

		}

		console.log($scope.currentQuestion);
		$scope.actualQuestion++;
	}
    
    $scope.startProfiler = function(){
    	var s = new Date();
    	resultToSend.startTime = s;
      	$location.path('/profiler/questions');

    }

    $scope.endProfiler = function(){

    	$location.path('/profiler/result');

    }

});
