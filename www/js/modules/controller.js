/**
 * Created by Desenvolvimento on 04/08/2015.
 */

angular.module('controller', ['ui.router', 'calendar', 'ionic', 'ionic.service.core', 'ionic.service.push'])

    .config(function () {

        moment.locale('pt-br');

    })
    .run(function($rootScope) {
        /*
            Receive emitted message and broadcast it.
            Event names must be distinct or browser will blow up!
        */
        $rootScope.$on('handleEmit', function(event, args) {
            $rootScope.$broadcast('handleBroadcast', args);
        })
    })

    .controller('HomeController', function ($scope, $state, $rootScope) {

        $scope.calendarDay = moment();

        //TODO: Carregar as consultas do servidor.
        $scope.consultas = [

        ];

        $scope.dayClick = function (day) {
            $state.go('consultas');
        };

        $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
            console.log('Got token', data.token, data.platform);
        });

    })

    .controller('ConsultasCtrl',function ($scope,$rootScope) {
    
            /*Dados de teste*/
            $scope.consultas = [{
                id: "1",
                data: "21/09/2015",
                horarioInicial:"10:00",
                horarioTermino:"10:59",
                local:"Hospital da Unimed",
                endereco:"Rua Odilon Gomes De Lima ",
                bairro:"Capim Macio - 59000-370",
                medico:"Dra. Luciana Raquel",
                especialidade:"Ginecologia",
                logo:"img/unimed.png"
    
            }, {
                id:"2",
                data: "25/12/2015",
                horarioInicial:"16:00",
                horarioTermino:"16:59",
                local:"Hospital da Unimed",
                endereco:"Rua Rodolfo Garcia",
                bairro:"Lagoa Nova - 59000-120",
                medico:"Dr. João Da Silva",
                especialidade:"Clinico geral",
                logo:"img/unimed.png"
            }];

        $scope.$emit('teste', 'Data to send');
    })

    .controller('InformacaoDeConsultaCtrl',['$scope','$controller','$stateParams','$ionicPopup',function($scope,$controller,$stateParams,$ionicPopup){
        
        var keep=true;
        var index;
        /* é um decorator que torna comum as variaveis de escopo do ConsultasController */
        $controller('ConsultasCtrl',{$scope: $scope});

        angular.forEach($scope.consultas,function(value,key){
            if (keep)
            {
                if(value.id==$stateParams.id)
                {
                    index = key;
                    /*break*/
                    keep=false;
                }
            }
        });
       $scope.detalhes = $scope.consultas[index];

        
    }])

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
        };

    })
    
    .controller('AgendamentoCtrl', function($scope,$http){
        /* Dados de teste */
        $http.get('js/Model/agendamento.json').success(function(data){
            $scope.agendamento = data;
        });
        
    })

    .controller('agendamentoEspecialidadeCtrl', ['$scope','$stateParams','$http','$ionicPopup',function($scope,$stateParams,$http,$ionicPopup){

        $scope.calendario = {ano :"2015", mes : "Setembro",dia : "27"};
        $scope.years = ['2015','2016','2017'];
        $scope.months = ['Setembro','Outubro','Novembro','Dezembro'];
        $scope.days = [];

        for (var i = 27; i <= 31; i++) {
            $scope.days.push(i);
        };

        $scope.escolherDia = function(){

            $scope.escolherData={};

            $ionicPopup.show({
                title:"",
                template:'<ion-radio ng-repeat="day in days" ng-model="escolherData.dia" ng-value="'+"'{{day}}'"+'">{{day}}</ion-radio>',
                scope: $scope,
                buttons: [
                 {
                    text: 'Cancelar',
                 },
                 {
                    text: 'Ok',
                    onTap : function(e){
                        if(!$scope.escolherData.dia){
                            e.preventDefault();
                        }else{
                            $scope.calendario.dia = $scope.escolherData.dia;
                        }
                    }                
                }]
            });
       };

       $scope.escolherMes = function(){

            $scope.escolherData={};

            $ionicPopup.show({
                title:"",
                template:'<ion-radio ng-repeat="month in months" ng-model="escolherData.mes" ng-value="'+"'{{month}}'"+'">{{month}}</ion-radio>',
                // templateUrl: '/pages/selectData.html',
                scope: $scope,
                buttons: [
                 {
                    text: 'Cancelar',
                 },
                 {
                    text: 'Ok',
                    onTap : function(e){
                        if(!$scope.escolherData.mes){
                            e.preventDefault();
                        }else{
                            $scope.calendario.mes = $scope.escolherData.mes;
                        }
                    }
                 }
                ]
                }).then(function(){

                });
       };
        $scope.escolherAno = function(){

            $scope.escolherData={};

            $ionicPopup.show({
                title:"",
                template:'<ion-radio ng-repeat="year in years" ng-model="escolherData.ano" ng-value="'+"'{{year}}'"+'">{{year}}</ion-radio>',
                // templateUrl: '/pages/selectData.html',
                scope: $scope,
                buttons: [
                 {
                    text: 'Cancelar',
                 },
                 {
                    text: 'Ok',
                    onTap : function(e){
                        if(!$scope.escolherData.ano){
                            e.preventDefault();
                        }else{
                            $scope.calendario.ano = $scope.escolherData.ano;
                        }
                    }
                 }
                ]
                });
       };
       
       /*a cada modificacao altera o estado do model datamarcada*/
       /*a funcao data retorna uma data com o mes no valor inteiro em vez de string*/
       $scope.$watch(function(scope){
            var data = function(){
                var meses={'Setembro':'09','Outubro':'10','Novembro':'11','Dezembro':'12'};
                return meses[$scope.calendario.mes]+'/'+$scope.calendario.dia+'/'+$scope.calendario.ano;
            };
            $scope.dataMarcada = new Date(data());
        });

       

        /* Dados de teste */
        $http.get('js/Model/agendamento.json').success(function(data){
            var keep = true;
            $scope.especialidade = $stateParams.especialidade;

            angular.forEach(data.especialidades,function(value,key){
                if (keep)
                {
                    if(value.nome==$scope.especialidade)
                    {
                        $scope.datas = value.datas;
                        /*break*/
                        keep=false;

                    }
                }
            });

        });
    }])

    .controller('AgendamentoEscolhaDeMedicoCtrl', ['$scope','$stateParams',function($scope,$stateParams){
            
            $scope.especialidade=$stateParams.especialidade;
            $scope.horario  = $stateParams.horario;
            $scope.dataMarcada = $stateParams.dataMarcada;

            /*declaracoes*/            
            $scope.medicoSelecionado = null;
            $scope.obj = null;

            /* Dados de teste */
            $scope.data = [
                {
                    hospital:"Hospital da Unimed",
                    medicos:
                    [
                        {nome:"Dr. Fernando Lisboa"},
                        {nome:"Dr. João Roberto"}
                    ]
                },
                {
                    hospital:"Hospital do Coração",
                    medicos:
                    [
                        {nome:"Dra. Rossana Silva"},
                        {nome:"Dr. Fulano Garcia"}
                    ]
                }
            ];

            $scope.formarJson = function(nomeMedico,hospital){
                $scope.obj = {
                    especialidade: $scope.especialidade,
                    data: $scope.dataMarcada,
                    horario : $scope.horario,
                    medico: nomeMedico.nome,
                    local: hospital,
                    endereco:"Rua Odilon Gomes De Lima ",
                    bairro:"Capim Macio - 59000-370",
                };
                console.log($scope.obj);
            };

            $scope.getJson =function(){
                return $scope.obj;
            }
    }])

    .controller('ConfirmarAgendamentoCtrl',['$scope','$state','$stateParams','$ionicPopup',function($scope,$state,$stateParams,$ionicPopup){
        
        /*json final para mandar para o servidor*/
        $scope.obj = JSON.parse($stateParams.json);


        $scope.opcoes = function(){
            $scope.data = {}

            $ionicPopup.show({
                title:"Confirmar consulta",
                scope: $scope,
                buttons: [
                {
                    text: 'Sim',
                    onTap : function(){
                        // $scope.consultas.splice(indice);
                        $state.go('consultas');
                    }
                },
                  { text: 'Não'},
                ]
                }).then(function() {
                  console.log("feito");
                });
        };
        
    }])

    .controller('desmarcarConsultaCtrl',['$scope','$stateParams','$ionicPopup','$state','$controller','$rootScope',function($scope,$stateParams,$ionicPopup,$state,$controller,$rootScope){
        
        $controller('ConsultasCtrl',{$scope: $scope});
        
        var keep = true;
        var id = $stateParams.id; 
        var indice; 

        angular.forEach($scope.consultas,function(value,key){
                if (keep)
                {
                    if(value.id==id)
                    {
                        indice = key;    
                        /*break*/
                        keep=false;
                    }
                }
         });

        $scope.opcoes = function(){

            $scope.data = {}

            $ionicPopup.show({
                title:"Cancelar Consulta",
                scope: $scope,
                buttons: [
                 {
                    text: 'Sim',
                    onTap : function(){
                        $state.go('consultas');
                    }
                 },
                 {text: 'Não' }
                ]
                }).then(function() {
                  console.log("feito");
                });
        };
        
    }])
;