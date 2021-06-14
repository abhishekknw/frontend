'use strict';

/**
 * @ngdoc overview
 * @name catalogueApp
 * @description
 * # catalogueApp
 *
 * Main module of the application.
 */

// var APIBaseUrl = 'http://coreapi-test.3j6wudg4pu.ap-southeast-1.elasticbeanstalk.com/';
//var APIBaseUrl = 'http://13.232.210.224:8000/';
var APIBaseUrl = Config.APIBaseUrl;

angular.module('Authentication', []);

angular
  .module('catalogueApp', [
    // 'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ui.router',
    'ngSanitize',
    'machadaloCommon',
    'machadaloPages',
    'Authentication',
    'rzModule',
    'ui.bootstrap',
    'angular.filter',
    'angularUtils.directives.dirPagination',
    'angularjs-dropdown-multiselect',
    'ngFileUpload',
    'uiGmapgoogle-maps',
    'ncy-angular-breadcrumb',
    'slickCarousel',
    'scrollable-table',
    'cfp.loadingBar',
    'vcRecaptcha',
    'ngMaterial',
    'nvd3',
    'chart.js',
    'angularUtils.directives.dirPagination',
    'percentCircle-directive',
    'ngTableToCsv',
    'ui.grid',
    'angular-js-xlsx',
    'toastr',
    'smart-table',
    'angular-chartist',
    'angular.morris-chart',
    'textAngular',
    'ngJsTree',
    'xeditable',
    'angular-progress-button-styles',
    'catalogueApp.theme.components',
    'catalogueApp.theme.inputs',
    'catalogueApp.theme',
    'angular-circular-progress',
    'ngMap',
    'AngularPrint',
    'checklist-model',
    'btorfs.multiselect',
    'angularUtils.directives.dirPagination',
    'angularMoment',
    'daterangepicker',
    'ui.select',
    'ngSanitize'
  ])
  .config(function ($routeProvider, $stateProvider, $urlRouterProvider, $httpProvider, $qProvider, $locationProvider, cfpLoadingBarProvider) {
    $stateProvider
    
      // .state('covidHospital', {
      //   url: '',
      //   controller: 'covidHospitalCtrl',
      //   templateUrl: 'modules/pages/covidHospital/covid-hospital.tmpl.html',
      // });

      .state('covidHospital', {
        url: '/hospitalbeds/',
        controller: 'covidHospitalCtrl',
        templateUrl: 'modules/pages/covidHospital/covid-hospital.tmpl.html',
        // data :{
        //   permission : 'loginAccess'
        // }
      })

      .state('covidCylinder', {
        url: '/cylinders/',
        controller: 'covidCylinderCtrl',
        templateUrl: 'modules/pages/covidCylinder/covid-cylinder.tmpl.html',

      })

      .state('covidRefill', {
        url: '/refills/',
        controller: 'covidCylinderCtrl',
        templateUrl: 'modules/pages/covidCylinder/covid-cylinder.tmpl.html',
      })

      .state('covidConcentrators', {
        url: '/concentrators/',
        controller: 'covidCylinderCtrl',
        templateUrl: 'modules/pages/covidCylinder/covid-cylinder.tmpl.html',
      })

      .state('covidMedicines', {
        url: '/medicines/',
        controller: 'covidCylinderCtrl',
        templateUrl: 'modules/pages/covidCylinder/covid-cylinder.tmpl.html',
      })
      .state('covidAmbulance', {
        url: '/ambulance/',
        controller: 'covidCylinderCtrl',
        templateUrl: 'modules/pages/covidCylinder/covid-cylinder.tmpl.html',
      })

      .state('covidPlasma', {
        url: '/plasma/',
        controller: 'covidCylinderCtrl',
        templateUrl: 'modules/pages/covidCylinder/covid-cylinder.tmpl.html',
      })

      .state('covidLanding', {
        url: '',
        controller: 'covidLandingCtrl',
        templateUrl: 'modules/pages/covidLanding/covid-landing.tmpl.html',
      })
      
      // .state('covidCases', {
      //   url: '/covidcases/covidhelpdesk/',
      //   controller: 'covidCasesCtrl',
      //   templateUrl: 'modules/pages/covidCases/covid-cases.tmpl.html',
      // });

  })
  .run(['$rootScope', '$window', '$location', 'AuthService', '$state', '$cookieStore',
    function ($rootScope, $window, $location, AuthService, $state, $cookieStore) {
      $rootScope.globals = $rootScope.globals || {};
      $rootScope.globals.currentUser = AuthService.UserInfo();
      $rootScope.getCurState = function () {
        if ($window.localStorage.isSavedProposal == 'true')
          return 'showCurrentProposal';
        else if ($window.localStorage.isSavedProposal == 'false')
          return 'createProposalMe';
        else if ($window.localStorage.user_code == 'guestUser')
          return 'guestHomePage';
      }

      var whence = $location.path();

      $rootScope.$on('$stateChangeSuccess', function (e, toState, toParams, fromState, fromParams) {

        var permissions = $rootScope.globals.userInfo.profile.permissions;
        var page = toState.data.permission;
        if ($rootScope.globals.currentUser && !(permissions.hasOwnProperty(page.toLowerCase()) && permissions[page.toLowerCase()]) && $location.path() != '/logout') {
          e.preventDefault();
          console.log(permissions.hasOwnProperty(page.toLowerCase()));
          $state.go('forbiddenPage');
        }
      });
      $rootScope.$on('$locationChangeStart', function (e, toState, toParams, fromState, fromParams) {
        var whence = $location.path();
        // redirect to login page if not logged in
        $rootScope.globals.currentUser = AuthService.UserInfo();
        if (!$rootScope.globals.hasOwnProperty('userInfo') || !$rootScope.globals.userInfo.hasOwnProperty('profile')) {
          var url = $location.url().split("/");
          if (url[1] == "beds") {
            $location.path("/beds/covid/machadalo");
          } else if (url[1] == "hospitalbeds") {
            $location.path("/hospitalbeds/");
          } else if (url[1] == "cylinders") {
            $location.path("/cylinders/");
          } else if (url[1] == "refills") {
            $location.path("/refills/");
          } else if (url[1] == "concentrators") {
            $location.path("/concentrators/");
          } else if (url[1] == "medicines") {
            $location.path("/medicines/");
          } else if (url[1] == "covidcases") {
            $location.path("/covidcases/");
          }  else if (url[1] == "ambulance") {
            $location.path("/ambulance/");
          } else if (url[1] == "plasma") {
            $location.path("/plasma/");
          }
        }
        var category = $rootScope.globals.userInfo.profile.organisation.category;
        if (!$rootScope.globals.currentUser) {
          if (url[1] == "beds") {
            $location.path("/beds/covid/machadalo");
          } else if (url[1] == "hospitalbeds") {
            $location.path("/hospitalbeds/");
          } else if (url[1] == "cylinders") {
            $location.path("/cylinders/");
          } else if (url[1] == "refills") {
            $location.path("/refills/");
          } else if (url[1] == "concentrators") {
            $location.path("/concentrators/");
          } else if (url[1] == "medicines") {
            $location.path("/medicines/");
          } else if (url[1] == "covidcases") {
            $location.path("/covidcases/");
          } else if (url[1] == "ambulance") {
            $location.path("/ambulance/");
          } else if (url[1] == "plasma") {
            $location.path("/plasma/");
          }
        }
      });

    }]);
