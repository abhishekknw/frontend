'use strict';


angular.module('catalogueApp')
  .factory('templateDashboardService', ['machadaloHttp', '$stateParams', '$rootScope', '$routeParams', '$location', '$http',
    function (machadaloHttp, $stateParams, $scope, $rootScope, $routeParams, $location, $http) {

      var url_base = 'v0/ui/website/';
      var url_base_proposal = 'v0/ui/proposal/';
      var url_analytics = 'v0/ui/analytics/';
      var url_root = 'v0/ui/';
      var url_base_user = 'v0/';
      var DashboardService = {};

     

      DashboardService.getTransactionalTemplate = function () {
        console.log('22222222222222222222222222222');
       return true
      }

      return DashboardService;

    }]);
