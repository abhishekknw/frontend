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
      var interveneApiHost = Config.interveneMeaAPIBaseUrl;
      
      DashboardService.transactionalTemplate = function (param,botType) {
        let url =""
        if(botType=='mca'){
         url =   "v0/ui/mca-bot/template-summary-list/?search=" +param.search
        apiHost = APIBaseUrl;
        }
        if(botType=='mea'){
          url =   "v0/ui/mea-bot/template-summary-list/?search" +param.search
          apiHost =  interveneApiHost; 
        }
        return machadaloHttp.get(url)
        .then(function onSuccess(response) {
          console.log("First response");
           return response

        })
        .catch(function onError(response) {
           return response
        });
      }


      DashboardService.transactionalTemplateDetail = function (botType) {
        // let url =   "v0/ui/mca-bot/template-user-summary-list/" 
        // return machadaloHttp.get( url);
        let url =""
        if(botType=='mca'){
         url =   "v0/ui/mca-bot/template-user-summary-list/" 
        apiHost = APIBaseUrl;
        }
       if(botType=='mea'){
          url =   "v0/ui/mea-bot/template-user-summary-list/"
          apiHost =  interveneApiHost; 
        }
        return machadaloHttp.get(url)
        .then(function onSuccess(response) {
           return response
        })
        .catch(function onError(response) {
           return response
        });
      



        
      }


      // DashboardService.transactionalTemplateSummaryDownload = function () {
      //   // let url = apiHost +  "v0/ui/mca-bot/download-template-summary/";
      //   let url =  "v0/ui/mca-bot/download-template-summary/";
      //   return machadaloHttp.get(url);
      // }

      return DashboardService;



    }]);
