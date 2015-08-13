/**
 * Created by Desenvolvimento on 04/08/2015.
 */

angular.module('controller', ['ui.router', 'calendar', 'ionic'])

    .config(function () {

        moment.locale('pt-br');

    })

    .controller('HomeController', function ($scope, $state) {

        $scope.calendarDay = moment();

        //TODO: Carregar as consultas do servidor.
        $scope.consultas = [

        ];

        $scope.dayClick = function (day) {
            $state.go('schedule');
        };

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

    .controller('LoginController', function($scope, $http, $state, $ionicPopup) {

        $scope.data = {};

        $scope.login = function () {

            var headers = {
                authorization : "Basic " + btoa($scope.data.login + ":" + $scope.data.senha)
            };

            $http.post("http://localhost:8080/drq-server/rest/login", $scope.data, {headers:headers}).then(function (data) {

                //Sucesso
                $state.go("home");

            }, function (data) {

                //Fracasso
                var popup = $ionicPopup.alert({
                    title: "Erro no login",
                    template: "Usu&aacute;rio ou senha incorretos."
                });

            });
        }

    })

;