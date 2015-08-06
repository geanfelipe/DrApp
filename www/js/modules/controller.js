/**
 * Created by Desenvolvimento on 04/08/2015.
 */

angular.module('controller', ['ui.router', 'calendar'])

    .config(function () {

        moment.locale('pt-br');

    })

    .controller('HomeController', function ($scope, $state) {

        var today = function () {

            var date = new Date();
            var dataFormatada = (date.getMonth()+1) + "/" + date.getDay() + "/" + date.getFullYear();

            console.log(dataFormatada);
            return dataFormatada;
        };

        $scope.calendarView = "month";

        $scope.calendarDay = today();

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