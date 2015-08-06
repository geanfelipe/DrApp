/**
 * Created by Desenvolvimento on 04/08/2015.
 */

angular.module('controller', ['ui.router', 'mwl.calendar'])

    .controller('HomeController', function ($scope, $state) {

        $scope.calendarView = "month";

        $scope.today = function () {
            var date = new Date();
            return date.getMonth() + "/" + date.getDay() + "/" + date.getYear();
        };

        //TODO: Carregar as consultas do servidor.
        $scope.consultas = [

        ];

        //Rodar o fullcalendar.js
        $scope.calendarConfiguration = {
            height: "auto",
            titleFormat: "MMM/YYYY",

            dayClick: function () {
                $state.go('schedule');
            }
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

;