/**
 * Created by Desenvolvimento on 04/08/2015.
 */

angular.module('controller', ['ui.router', 'calendar', 'ionic', 'ionic.service.core', 'ionic.service.push'])

    .config(function () {

        moment.locale('pt-br');

    })

    .controller('HomeController', function ($scope, $state, $rootScope) {

        $scope.calendarDay = moment();

        //TODO: Carregar as consultas do servidor.
        $scope.consultas = [

        ];

        $scope.dayClick = function (day) {
            $state.go('schedule');
        };

        $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
            console.log('Got token', data.token, data.platform);
        });

    })

    .controller('ScheduleController', function ($scope) {

        //Dados de teste
        $scope.pacientes = [{
            nomePaciente: "Fulano de Tal",
            descricao: "Retorno."
        }, {
            nomePaciente: "Sicrano de Tal",
            descricao: "Primeira consulta."
        }];

    })

    .controller('LoginController', function($scope, $http, $state, $ionicPopup, $ionicUser, $ionicPush) {

        $scope.data = {};

        $scope.login = function () {

            var headers = {
                authorization : "Basic " + btoa($scope.data.login + ":" + $scope.data.senha)
            };

            $http.post("http://localhost:8080/drq-server/rest/login", $scope.data, {headers:headers}).then(function (data) {

                //Sucesso

                var user = $ionicUser.get();
                if (!user.user_id) {
                    //TODO: O ID deve vir do servidor, para garantir que o mesmo usuario possui o mesmo id em diferentes aplicações.
                    user.user_id = $ionicUser.generateGUID();
                }

                //TODO: Adicionar os dados do usuário, lidos do servidor.
                angular.extend(user, {
                    nome: "Usuário",
                    email: "email@drq.com.br"
                });

                $ionicUser.identify(user).then(function () {

                    $ionicPush.register({
                        canShowAlert: false,
                        canSetBadge: true,
                        canPlaySound: true,
                        canRunActionsOnWake: true,
                        onNotification: function (notification) {

                            console.log(notification);
                            return true;

                        }
                    });

                    $state.go("home");

                });



            }, function (data) {

                //Fracasso
                $ionicPopup.alert({
                    title: "Erro no login",
                    template: "Usu&aacute;rio ou senha incorretos."
                });

            });
        }

    })

;