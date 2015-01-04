'use strict';

angular.module('creativeRecruitmentApp')

  .controller('ProfilerLoginController', function ($scope, Auth, $location){

    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if (form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
          .then(function (data) {
            console.log('login' + data);
            // Logged in, redirect to home
            $location.path('/');
          })
          .catch(function (err) {
            $scope.errors.other = err.message;
          });
      }
    }

  })
  .controller('ProfilerListController', function ($scope, $http, UserListSrv, $modalOps) {

  	UserListSrv.query(function(data){
		$scope.items = data;
	});

	$scope.addUser = function(){
		$modalOps.addUser();
	};

	$scope.addCompany = function(){
		$modalOps.addCompany();
	}

  })
  .controller('ProfilerSingleUser', function ($scope, UserListSrv, $route, $http, $modalOps){

  	function _coutArytmetical(collection){

  		var arytmetical = 0;

  		angular.forEach(collection, function(value){
  			arytmetical = arytmetical + parseInt(value.answer) + 1;
  		})

  		return (arytmetical/collection.length).toFixed(2);

  	}

  	$scope.removeFromArray = function(arr, index) {
  		
  		arr.splice(index, 1);
  		console.log(arr, index);

  	}

  	var ID;

  	UserListSrv.query(function(data){

  		ID = $route.current.params.id;
		$scope.data = _.findWhere(data, {_id: ID});
		$scope.user = $scope.data.user[0];
		$scope.questions = _.sortBy($scope.data.result[0], 'id');

		console.log($scope.data);
		$scope.interpetation = $scope.data.interpretation[0] || {};

		if(!$scope.interpetation.strongSite) $scope.interpetation.strongSite = [];
		if(!$scope.interpetation.wrongSite) $scope.interpetation.wrongSite = [];  
		if(!$scope.interpetation.recomend) $scope.interpetation.recomend = [];

		$scope.parts = {
			asertywnosc: _coutArytmetical(_.where($scope.questions, {requireBy: 0})),
			przywodztwo: _coutArytmetical(_.where($scope.questions, {requireBy: 1})),
			empatia: _coutArytmetical(_.where($scope.questions, {requireBy: 2})),
			sumiennosc: _coutArytmetical(_.where($scope.questions, {requireBy: 3})),
			ekstrawersja: _coutArytmetical(_.where($scope.questions, {requireBy: 4})),
			pozytywne: _coutArytmetical(_.where($scope.questions, {requireBy: 0})),
			otwartosc: _coutArytmetical(_.where($scope.questions, {requireBy: 1})),
			niestabilnosc: _coutArytmetical(_.where($scope.questions, {requireBy: 2}))
		};
	});

  	$scope.sendInterpretations = function(){

  		console.log($scope.interpetation);

  		$http.put('/api/profiler/' + ID, {interpetation: $scope.interpetation})
  			.success(function(data){

  				$modalOps.info('SUKCES', 'Zmiany zostały zapisane');

  			})
  			.error(function(data, error, config, headers){
  				console.log(data, error, config, headers);
  			});
  	};

  	$scope.makePublicProfile = function() {

  		$http.put('/api/profiler/' + ID + '/is-interpreted', {})

		.success(function(data){
			console.log(data);
			$modalOps.info('SUKCES', 'Zmiany zostały zapisane');

		})
		.error(function(data, error, config, headers){
			console.log(data, error, config, headers);
		});
  	}

  	$scope.generatePdf = function(){
  		console.log('generate pdf');
  	};

  	$scope.currentStrong = "";

  	$scope.currentWrong = "";

  	$scope.currentRecomend = "";

  	$scope.addStrongSite = function(){

  		if($scope.currentStrong === "") return;

  		$scope.interpetation.strongSite.push($scope.currentStrong);
  		$scope.currentStrong = "";

  	}

  	$scope.addWrongSite = function(){

  		if($scope.currentWrong === "") return;

  		$scope.interpetation.wrongSite.push($scope.currentWrong);
  		$scope.currentWrong = "";

  	}

  	$scope.addRecomend = function(){

  		if($scope.currentRecomend === "") return;

  		$scope.interpetation.recomend.push($scope.currentRecomend);
  		$scope.currentRecomend = "";

  	}

  	function _GRAPH() {

  		var graphData = [{
        // Visits
	        data: [ [6, 1.9], [7, 3.15], [8, 3.5], [9, 2.16], [10, 4.3], [11, 3.78], [12, 5], [13, 1] ],
	        color: '#000000'
	    }, {
	        // Returning Visits
	        data: [ [6, 3.1], [7, 3.6], [8, 4.1], [9, 3.6], [10, 3.9], [11, 4.1], [12, 3.8], [13, 2.7], ],
	        color: 'red',
	        points: { radius: 4, fillColor: '#ffffff' }
	    }];

	    $.plot($('#graph-lines'), graphData, {
		    series: {
		        points: {
		            show: true,
		            radius: 5
		        },
		        lines: {
		            show: true
		        },
		        shadowSize: 0
		    },
		    grid: {
		        color: '#646464',
		        borderColor: 'transparent',
		        borderWidth: 22,
		        hoverable: true
		    },
		    xaxis: {
		        tickColor: 'transparent',
		        tickDecimals: 2
		    },
		    yaxis: {
		        tickSize: 1
		    }
		});

		// Bars
		$.plot($('#graph-bars'), graphData, {
		    series: {
		        bars: {
		            show: true,
		            barWidth: .9,
		            align: 'center'
		        },
		        shadowSize: 0
		    },
		    grid: {
		        color: '#646464',
		        borderColor: 'transparent',
		        borderWidth: 20,
		        hoverable: true
		    },
		    xaxis: {
		        tickColor: 'transparent',
		        tickDecimals: 2
		    },
		    yaxis: {
		        tickSize: 1000
		    }
		});

		$('#graph-bars').hide();

		$('#lines').on('click', function (e) {
		    $('#bars').removeClass('active');
		    $('#graph-bars').fadeOut();
		    $(this).addClass('active');
		    $('#graph-lines').fadeIn();
		    e.preventDefault();
		});

		$('#bars').on('click', function (e) {
		    $('#lines').removeClass('active');
		    $('#graph-lines').fadeOut();
		    $(this).addClass('active');
		    $('#graph-bars').fadeIn().removeClass('hidden');
		    e.preventDefault();
		});

		function showTooltip(x, y, contents) {
		    $('<div id="tooltip">' + contents + '</div>').css({
		        top: y - 16,
		        left: x + 20
		    }).appendTo('body').fadeIn();
		}

		var previousPoint = null;


  	}

  	_GRAPH();


  })
  .controller('ProfilerController', function ($scope, $rootScope, $http, $location, $timeout, $modalOps, Auth) {

  	function logout(){

      Auth.logout();
      $rootScope.currentUser = {};

    }

  	$scope.getQuestions = function(){

  		$http({method: 'GET', url: '/assets/data/questions.json'})

		  .success(function(questions) {

		    $rootScope.questions = questions.questions;

		    $scope.workQuestions = angular.copy($rootScope.questions);

		    $scope.actualQuestion = $scope.workQuestions[0].id; //tutaj chyba cos nie tak z tym id
		    $scope.currentQuestion = $rootScope.questions[$scope.actualQuestion];

		  })
		  .error(function(data, status, headers, config) {
		    console.log(data,status,headers,config);
		    alert('wystapił błąd', data, status);

		});

		$scope.$watch('actualQuestion', function(){

			$timeout(function(){
				$scope.currentQuestion = $rootScope.questions[$scope.actualQuestion];
				_checkEmptyAnswer();
			}, 100);

		});
  	};

  	function _checkEmptyAnswer(){

  		var arrAns = [];

  		angular.forEach($rootScope.questions, function(value, key){

  			if(value.answer == "") arrAns.push(value);

  		});

  		console.log(arrAns, 'arrAns');

  		if(arrAns.length === 1) $scope.hideNext = true;

  	}

	$scope.userInfo = {},
	$scope.modalCurrentQuestion = "pytanie testowe";

	$scope.questionsEmpty = [];

	var resultToSend = {
		startTime: '',
		endTime: '',
		result: {},
		user: {}
	};

	$scope.hideNext = false;

	function validateAnswers(){

		if($scope.workQuestions.length == 1) {
			alert('teraz odpowiadasz na ostatnie pytanie');
			$scope.hideNext = true;
			console.log($scope.workQuestions, 'workQuestions');
		}

	}

	$scope.profilerFrom = function(){

		if($scope.currentQuestion.answer === "") {

			$modalOps.info('NIE TAK SZYBKO!', 'Musisz zaznaczyć ostatnią odpowiedź zanim zakończysz test.');
			return;

		}

		var e = new Date();
		resultToSend.endTime = e;
		resultToSend.startTime = $rootScope.startTime;

		angular.forEach($rootScope.questions, function(value, key) {
			resultToSend.result[key] = {
				id: value.id,
				question: value.question,
				answer: value.answer,
				requireBy: value.requireBy
			}
		});

		$rootScope.resultToSend = resultToSend;
		console.log(resultToSend);

		$location.path('/profiler/start');

	}

	$scope.sendProfilerQuestions = function(){
		$rootScope.resultToSend.user = $scope.userInfo;
		$rootScope.resultToSend.user._id = $rootScope.currentUser._id;
		$rootScope.resultToSend.user.name = $rootScope.currentUser.name;
		$rootScope.resultToSend.user.email = $rootScope.currentUser.email;
		$rootScope.resultToSend.user.interpetation = {};

		$rootScope.resultToSend.user.isInterpreted = false;
		$rootScope.resultToSend.user.isAnswerd = true;

		console.log($rootScope.resultToSend);

		$http.post('/api/profiler', $rootScope.resultToSend).
		  success(function(data, status, headers, config) {

		  	$http.put('/api/users/' + $rootScope.resultToSend.user._id + '/answered' , {_id: $rootScope.resultToSend.user._id})

	  		.success(function(data){
	  			console.log('put success', data);
	  			$scope.endProfiler();
	  		})
	  		.error(function(data, error, header, status){
	  			console.log('put error', data, error, header, status);
	  		});

		  	$rootScope.resultToSend = {
				startTime: '',
				endTime: '',
				result: {},
				user: {}
			};

		  }).
		  error(function(data, status, headers, config) {
		  	console.log(data, status, headers, config);

		});
	};

	function removeItemFromArr(collection, index){
		collection.splice(index,1);
	}

	$scope.goToNext = function(){

		var currentID = _.findWhere($scope.workQuestions, {id: $scope.actualQuestion});

		removeItemFromArr($scope.workQuestions, currentID);

		$scope.actualQuestion = $scope.workQuestions[0].id;

		console.log($scope.workQuestions, 'new work without erlier question');
		console.log($rootScope.questions);

		$('.questions-wrapper').css('opacity', 0);
		setTimeout(function(){
			$('.questions-wrapper').css('opacity', 1);
		},400);

	}

	$scope.nextQuestion = function(){

		if($scope.currentQuestion.answer === "") {

			$modalOps.info('NIE TAK SZYBKO!', 'Musisz zaznaczyć odpowiedź zanim przejdziesz do następnego pytania.');
			return;
		}

		$scope.goToNext();

	}

	$rootScope.$on('emptyArrRemoveItem', function(event, index, id){
		removeItemFromArr($scope.questionsEmpty, index);
	});

	//removeItemFromArr($scope.workQuestions, _.findWhere($scope.workQuestions, {id: $scope.actualQuestion}));

	$scope.goToNoAnswerQuestion = function(id){

		if(!$scope.questionsEmpty.length) return;

		$modalOps.question(_.findWhere($scope.questionsEmpty, {id: id}), $scope.questionsEmpty);
	}

	$rootScope.$on('nextQuestionWithoutAnswer', function(){
		goToNextQuestionNoAnswer();
	});

	function goToNextQuestionNoAnswer(){

		$scope.questionsEmpty.push($scope.currentQuestion);
		$scope.goToNext();
	}

    $scope.startProfiler = function(){

    	$rootScope.user = $scope.userInfo;

    	var s = new Date();

    	$rootScope.startTime = s;

       	$location.path('/profiler/questions');

    }

    $scope.endProfiler = function(){
    	logout();
    	$location.path('/profiler/result');

    }
});
