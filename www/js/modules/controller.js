/**
 * Created by Desenvolvimento on 04/08/2015.
 */

angular.module('controller', ['ui.router'])

    .controller('HomeController', function ($state) {

        //Rodar o fullcalendar.js
        $(".fullcalendar").fullCalendar({
            height: "auto",
            titleFormat: "MMM/YYYY",

            dayClick: function () {
                $state.go('schedule');
            }
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

;