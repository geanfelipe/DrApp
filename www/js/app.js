// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ionic.service.core','ionic.service.push','ngCordova', 'controller'])

    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: "pages/homePage.html",
                controller: "HomeController"  
            })
            .state('login', {
                url: '/login',
                templateUrl: "pages/login.html",
                controller: "LoginController"
            })
            .state('consultas', {
                url: '/consultas',
                templateUrl: "pages/consultasAgendadas.html",
                controller: "ConsultasCtrl"
            })
            .state('detalhesConsulta', {
                url: '/consultas/:id', 
                templateUrl: "pages/detalhesConsultas.html",
                controller: "InformacaoDeConsultaCtrl"
            })
            .state('agendamento', {
                url: '/agendar', 
                templateUrl: "pages/agendar.html",
                controller: "AgendamentoCtrl"
            })
            .state('agendamentoEspecialidade', {
                url: '/agendar/:especialidade', 
                templateUrl: "pages/agendamentoEspecialidade.html",
                controller: "agendamentoEspecialidadeCtrl"
            })
            .state('agendamentoEscolhaMedico', {
                url: '/agendar/:especialidade/:dataMarcada/:horario', 
                templateUrl: "pages/medicosDisponiveis.html",
                controller: "AgendamentoEscolhaDeMedicoCtrl"
            })
            .state('confirmarAgendamento', {
                url: '/confirmar/:json', 
                templateUrl: "pages/confirmarAgendamento.html",
                controller: "ConfirmarAgendamentoCtrl"
            })
            .state('desmarcarConsulta', {
                url: '/desmarcar-consulta/:id', 
                templateUrl: "pages/desmarcarConsulta.html",
                controller: "desmarcarConsultaCtrl"
            })
            .state('mapa', {
                url: '/mapa', 
                templateUrl: "pages/mapa.html",
                controller: "MapCtrl"
            })
           
        ;

        $urlRouterProvider.otherwise("/consultas");

    })

    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

;
