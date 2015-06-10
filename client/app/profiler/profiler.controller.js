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
            $location.path('/profiler');
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

	$scope.statusReturner = function(status){
  		return status ? "Udostępniony" : "W oczekiwaniu";
  	}



  })
  .controller('ProfilerSingleClientUser', function ($scope, UserListSrv, $route, $http, $modalOps, $window){

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

  	$scope.parts = {};

  	UserListSrv.query(function(data){


  		ID = $route.current.params.id;
		$scope.data = _.findWhere(data, {_id: ID});
		$scope.user = $scope.data.user[0];
		$scope.questions = _.sortBy($scope.data.result[0], 'id');

	
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
			pozytywne: _coutArytmetical(_.where($scope.questions, {requireBy: 5})),
			otwartosc: _coutArytmetical(_.where($scope.questions, {requireBy: 6})),
			niestabilnosc: _coutArytmetical(_.where($scope.questions, {requireBy: 7}))
		};

		_GRAPH();

	});


  	$scope.generatePdf = function(){
  		$window.print();
  	};

  	function _GRAPH() {

  		var graphData = [{
        // Visits
	        data: [ [6, $scope.parts.asertywnosc ], [7, $scope.parts.przywodztwo], [8, $scope.parts.empatia], [9, $scope.parts.sumiennosc], [10, $scope.parts.ekstrawersja], [11, $scope.parts.pozytywne], [12, $scope.parts.otwartosc], [13, $scope.parts.niestabilnosc] ],
	        color: '#000000'
	    }, {
	        // Returning Visits
	        data: [ [6, 3.1], [7, 3.6], [8, 4.1], [9, 3.6], [10, 3.9], [11, 4.1], [12, 3.8], [13, 2.7], ],
	        color: 'red',
	        points: { radius: 4, fillColor: '#ffffff' }
	    }];

	    var ticks = ['Asertywność', 'Przwództwo', 'Empatia', 'Sumienność', 'Ekstrawagancja', 'Pozytywne', 'Otwartość', 'Niestabilność'];

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
		        tickColor: '#000000',
		        tickDecimals: 2,
		        ticks: ticks
		    },
		    yaxis: {
		        min:0, max: 6,  tickSize: 1
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

		var previousPoint = null, previousLabel = null;


		$.fn.UseTooltip = function () {
		    $(this).bind("plothover", function (event, pos, item) {
		        if (item) {
		            if ((previousLabel != item.series.label) || (previousPoint != item.dataIndex)) {
		                previousPoint = item.dataIndex;
		                previousLabel = item.series.label;
		                $("#tooltip").remove();

		                var x = item.datapoint[0];
		                var y = item.datapoint[1];

		                var color = '#000000';
		                var month = new Date(x).getMonth();

		                //console.log(item);

		                if (item.seriesIndex == 0) {
		                    showTooltip(item.pageX,
		                            item.pageY,
		                            color,
		                            "<strong>" + y + "</strong>");
		                } else {
		                    showTooltip(item.pageX,
		                            item.pageY,
		                            color,
		                            "<strong>" + y + "</strong>");
		                }
		            }
		        } else {
		            $("#tooltip").remove();
		            previousPoint = null;
		        }
		    });
		};

		function showTooltip(x, y, color, contents) {
		    $('<div id="tooltip">' + contents + '</div>').css({
		        position: 'absolute',
		        display: 'none',
		        top: y +10,
		        left: x+10,
		        border: '2px solid ' + color,
		        padding: '3px',
		        'font-size': '12px',
		        'border-radius': '5px',
		        'background-color': '#fff',
		        'color': '#000',
		        'font-family': 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
		        opacity: 0.9
		    }).appendTo("body").fadeIn(200);
		}

		var previousPoint = null;
		$("#graph-wrapper").UseTooltip();
	}
  })
  .controller('ProfilerSingleUser', function ($scope, UserListSrv, $route, $http, $modalOps, $window){


  	function _coutArytmetical(collection){

  		var arytmetical = 0;

  		angular.forEach(collection, function(value){
  			arytmetical = arytmetical + parseInt(value.answer) + 1;
  		})

  		return (arytmetical/collection.length).toFixed(2);

  	}

  	$scope.removeFromArray = function(arr, index) {

  		arr.splice(index, 1);
  		

  	}

  	$scope.parts = {};

  	UserListSrv.query(function(data){


  		$scope.ID = $route.current.params.id;

		$scope.data = _.findWhere(data, {_id: $scope.ID});

		$scope.user = $scope.data.user[0];
		$scope.questions = _.sortBy($scope.data.result[0], 'id');

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
			pozytywne: _coutArytmetical(_.where($scope.questions, {requireBy: 5})),
			otwartosc: _coutArytmetical(_.where($scope.questions, {requireBy: 6})),
			niestabilnosc: _coutArytmetical(_.where($scope.questions, {requireBy: 7}))
		};

		_GRAPH();
	});

  	$scope.sendInterpretations = function(){



  		$http.put('/api/profiler/' + $scope.ID, {interpetation: $scope.interpetation})
  			.success(function(data){

  				$modalOps.info('SUKCES', 'Zmiany zostały zapisane');

  			})
  			.error(function(data, error, config, headers){
  				console.log(data, error, config, headers);
  			});
  	};

  	$scope.makePublicProfile = function() {

  		$http.put('/api/profiler/' + $scope.ID + '/is-interpreted', {})

		.success(function(data){
			$modalOps.info('SUKCES', 'Zmiany zostały zapisane');

		})
		.error(function(data, error, config, headers){
			console.log(data, error, config, headers);
		});
  	}

  	$scope.generatePdf = function(){
  		$window.print();
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
	        data: [ [6, $scope.parts.asertywnosc ], [7, $scope.parts.przywodztwo], [8, $scope.parts.empatia], [9, $scope.parts.sumiennosc], [10, $scope.parts.ekstrawersja], [11, $scope.parts.pozytywne], [12, $scope.parts.otwartosc], [13, $scope.parts.niestabilnosc] ],
	        color: '#000000'
	    }, {
	        // Returning Visits
	        data: [ [6, 3.1], [7, 3.6], [8, 4.1], [9, 3.6], [10, 3.9], [11, 4.1], [12, 3.8], [13, 2.7], ],
	        color: 'red',
	        points: { radius: 4, fillColor: '#ffffff' }
	    }];

	    var ticks = ['Asertywność', 'Przwództwo', 'Empatia', 'Sumienność', 'Ekstrawagancja', 'Pozytywne', 'Otwartość', 'Niestabilność'];

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
		        tickColor: '#000000',
		        tickDecimals: 2,
		        ticks: ticks
		    },
		    yaxis: {
		        min:0, max: 6,  tickSize: 1
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

		var previousPoint = null, previousLabel = null;


		$.fn.UseTooltip = function () {
		    $(this).bind("plothover", function (event, pos, item) {
		        if (item) {
		            if ((previousLabel != item.series.label) || (previousPoint != item.dataIndex)) {
		                previousPoint = item.dataIndex;
		                previousLabel = item.series.label;
		                $("#tooltip").remove();

		                var x = item.datapoint[0];
		                var y = item.datapoint[1];

		                var color = '#000000';
		                var month = new Date(x).getMonth();

		                //console.log(item);

		                if (item.seriesIndex == 0) {
		                    showTooltip(item.pageX,
		                            item.pageY,
		                            color,
		                            "<strong>" + y + "</strong>");
		                } else {
		                    showTooltip(item.pageX,
		                            item.pageY,
		                            color,
		                            "<strong>" + y + "</strong>");
		                }
		            }
		        } else {
		            $("#tooltip").remove();
		            previousPoint = null;
		        }
		    });
		};

		function showTooltip(x, y, color, contents) {
		    $('<div id="tooltip">' + contents + '</div>').css({
		        position: 'absolute',
		        display: 'none',
		        top: y +10,
		        left: x+10,
		        border: '2px solid ' + color,
		        padding: '3px',
		        'font-size': '12px',
		        'border-radius': '5px',
		        'background-color': '#fff',
		        'color': '#000',
		        'font-family': 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
		        opacity: 0.9
		    }).appendTo("body").fadeIn(200);
		}

		var previousPoint = null;
		$("#graph-wrapper").UseTooltip();


  	}
  })
  .controller('ProfilerController', function ($scope, $rootScope, $http, $location, $timeout, $modalOps, Auth, UserListSrv) {


  	$scope.statusReturner = function(status){
  		return status ? "Zinterpretowany" : "Oczekuje na interpretację";
  	}

  	$scope.logout = function(){
  		logout();
  		$location.path('/profiler/login');
  	}



		UserListSrv.query(function(data){
  			if(!$rootScope.currentUser.role === 'client') return;
  			$scope.clientUsers = [];

  			angular.forEach(data, function(value, key){
  				if(value.user[0].client === $rootScope.currentUser.client) $scope.clientUsers.push(value);
  			});

		});


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

  	$scope.getQuestionIndex = function(questionCollections, currentQuestion){

  		return _.indexOf(questionCollections, currentQuestion) + 1;

  	}

  	function _checkEmptyAnswer(){

  		var arrAns = [];

  		angular.forEach($rootScope.questions, function(value, key){

  			if(value.answer == "") arrAns.push(value);

  		});

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
		}

	}

	function _invertAnswerValue(answerValue) {
		switch(answerValue){
			case "0":
				return "4";
				break;
			case "1":
				return "3";
				break;
			case "2":
				return "2";
				break;
			case "3":
				return "1";
				break;
			case "4":
				return "0";
				break;
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
			if(value.revert){
				resultToSend.result[key + 60] = {
					id: value.id + 100,
					reverted: true,
					question: value.question,
					answer: _invertAnswerValue(value.answer),
					requireBy: value.revertRequireBy
				}
			}
		});

		$rootScope.resultToSend = resultToSend;

		$location.path('/profiler/start');

	}

	$scope.sendProfilerQuestions = function(){
		$rootScope.resultToSend.user = $scope.userInfo;
		$rootScope.resultToSend.user._id = $rootScope.currentUser._id;
		$rootScope.resultToSend.user.name = $rootScope.currentUser.name;
		$rootScope.resultToSend.user.email = $rootScope.currentUser.email;
		$rootScope.resultToSend.user.client = $rootScope.currentUser.client;
		$rootScope.resultToSend.user.interpetation = {};

		$rootScope.resultToSend.user.isInterpreted = false;
		$rootScope.resultToSend.user.isAnswerd = true;


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
