angular.module('creativeRecruitmentApp')
  .service('$modalOps', function ($modal, $rootScope) {
        return {
            error: function (msg) {
                opts = angular.extend({}, {
                    size: 'sm',
                    templateUrl: 'components/modals/modalCreative.html',
                    resolve: {
                        msg: function () {
                            return angular.copy(msg);
                        }
                    },
                    controller: function ($scope, $modalInstance, msg) {
                        $scope.msg = (angular.isDefined(msg)) ? msg : 'Treść nieokreślona';

                        $scope.cancel = function () {
                            $modalInstance.close();
                        }
                    }
                });

                return $modal.open(opts);
            },
            question: function(question, questions){

                opts = angular.extend({}, {
                    size: 'lg',
                    templateUrl: 'components/modals/modalQuestion.html',
                    resolve: {
                        question: function () {
                            return angular.copy(question);
                        },
                        questions: function () {
                            return angular.copy(questions);
                        }
                    },
                    controller: function ($scope, $modalInstance, question, questions) {

                        $scope.emptyQuestion = (angular.isDefined(question)) ? question : 'Cos poszlo nie tak z pobraniem pytania';
                        $scope.emptyQuestions = (angular.isDefined(questions)) ? questions : [];

                        function nextQ(){

                            if($scope.emptyQuestion.answer === "") {
                                console.log('brak odpowiedzi nie mozna isc dalej');
                                return;
                            }

                            _setAnswerToQuestionCollection();

                            $scope.emptyQuestion = $scope.emptyQuestions[0];

                            if(!$scope.emptyQuestions.length) {
                                $scope.emptyQuestion = {}
                                $scope.cancel();
                            }

                        }

                        function _setAnswerToQuestionCollection(){

                            var quest = _.findWhere($rootScope.questions, {id: $scope.emptyQuestion.id});
                            quest.answer = $scope.emptyQuestion.answer;

                            var currentIndex = _.indexOf($scope.emptyQuestions, _.findWhere($scope.emptyQuestions, {id: $scope.emptyQuestion.id}));

                            _removeItemFromArr($scope.emptyQuestions, currentIndex);
                            console.log('TO remove', currentIndex, $scope.emptyQuestion.id, $scope.emptyQuestions);

                            $rootScope.$broadcast('emptyArrRemoveItem', {
                                index: currentIndex,
                                id: $scope.emptyQuestion.id
                            });
                        }

                        function _removeItemFromArr(collection, index){
                            collection.splice(index,1);
                        }

                        $scope.nextQ = nextQ;

                        $scope.lastEmpty = true;

                        $scope.cancel = function () {
                            $modalInstance.close();
                        }
                    }
                });

                return $modal.open(opts);

            },

            info: function (head, msg, showBtn) {
                opts = angular.extend({}, {
                    size: 'sm',
                    templateUrl: 'components/modals/modalCreative.html',
                    resolve: {
                        head: function () {
                            return angular.copy(head);
                        },
                        msg: function () {
                            return angular.copy(msg);
                        }
                    },
                    controller: function ($scope, $modalInstance, head, msg) {
                        $scope.head = (angular.isDefined(head)) ? head : 'Informacja';
                        $scope.msg = (angular.isDefined(msg)) ? msg : 'Treść nieokreślona :-)';
                        $scope.showBtn = true;

                        if(showBtn == false) $scope.showBtn = false;

                        $scope.goToNextQuestionNoAnswer = function(){

                            console.log('rootscope go to next');
                            $rootScope.$broadcast('nextQuestionWithoutAnswer');
                            console.log('bordcast next question');
                            $scope.cancel();

                        }

                        $scope.cancel = function () {
                            $modalInstance.close();
                        }

                        $rootScope.closeModal = function(){
                            $modalInstance.close();
                        }
                    }
                });

                return $modal.open(opts);
            },
            addUser: function () {
                opts = angular.extend({}, {
                    size: 'md',
                    templateUrl: 'components/modals/modalAddUser.html',
                    controller: function($scope, $modalInstance, $location, Auth, sendMailSrv){

                      $scope.user = {};
                      $scope.errors = {};

                      $scope.register = function(form) {

                        $scope.submitted = true;

                        if(form.$valid) {
                          Auth.createUser({
                            name: $scope.user.name,
                            email: $scope.user.email,
                            role: $scope.user.role
                          })
                            .then( function(data) {
                              // Account created, redirect to home
                              console.log('accout created', data);

                             /* sendMailSrv.fetch({
                                email: $scope.user.email
                              }, function(data){
                                console.log(data);
                              });*/

                              $modalInstance.close();
                              //reset model
                              $scope.user = {
                                name: "",
                                email: "",
                                password: ""
                              };

                              $location.path('/');
                            })
                            .catch( function(err) {
                              err = err.data;
                              $scope.errors = {};

                              // Update validity of form fields that match the mongoose errors
                              angular.forEach(err.errors, function(error, field) {
                                form[field].$setValidity('mongoose', false);
                                $scope.errors[field] = error.message;
                              });
                            });
                        }
                      };
                  }

                });

                return $modal.open(opts);
            },
            addCompany: function () {
                opts = angular.extend({}, {
                    size: 'md',
                    templateUrl: 'components/modals/modalAddCompany.html',
                    controller: function ($scope, $modalInstance, ProfilerCompanySrv) {

                        $scope.newCompany = {};

                        ProfilerCompanySrv.query(function(company){
                            console.log('all company from api', company);
                        }, function(err, status){
                            console.log('error get all company', err, status);
                        });

                        $scope.cancel = function () {
                            $modalInstance.close();
                        }

                        $scope.addNewCompany = function(){

                            console.log($scope.newCompany);

                            ProfilerCompanySrv.save($scope.newCompany, function(data){

                                console.log('data from create new company response', data);

                            });

                        }

                    }
                });

                return $modal.open(opts);
            }
        }
    });
