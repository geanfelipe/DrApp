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
            $state.go('consultas');
        };

        $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
            console.log('Got token', data.token, data.platform);
        });

    })

    .controller('ConsultasController',function ($scope) {
    
            //Dados de teste
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
           
        })

    .controller('InformacaoDeConsultaController',['$scope','$controller','$stateParams',function($scope,$controller,$stateParams){
        
        var keep=true;
        var index;
        /* é um decorator que torna comum as variaveis de escopo do ConsultasController */
        $controller('ConsultasController',{$scope: $scope});

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
    
    .controller('AgendamentoController', function($scope,$http){
        /* Dados de teste */
        $http.get('js/Model/agendamento.json').success(function(data){
            $scope.agendamento = data;
            console.log($scope.agendamento);
        });
        
    })

    .controller('agendamentoEspecialidade', ['$scope','$stateParams',function($scope,$stateParams){
            /* Dados de teste */
           console.log($stateParams.especialidade);
    }])
;