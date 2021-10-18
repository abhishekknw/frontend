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
      var apiHost = APIBaseUrl;


      DashboardService.transactionalTemplate = function (param) {
        let url =   "v0/ui/mca-bot/template-summary-list/?search=" +param.search
        return machadaloHttp.get( url);
      }

      // DashboardService.transactionalTemplateSummaryDownload = function () {
      //   // let url = apiHost +  "v0/ui/mca-bot/download-template-summary/";
      //   let url =  "v0/ui/mca-bot/download-template-summary/";
      //   return machadaloHttp.get(url);
      // }

      return DashboardService;



    }]);
