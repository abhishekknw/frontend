'use strict';


angular.module('catalogueApp')
  .factory('templateDashboardMeaService', ['$http','machadaloHttp', '$stateParams', '$rootScope', '$routeParams', '$location', 
    function ($http,machadaloHttp, $stateParams, $scope, $rootScope, $routeParams, $location) {

      var url_base = 'v0/ui/website/';
      var url_base_proposal = 'v0/ui/proposal/';
      var url_analytics = 'v0/ui/analytics/';
      var url_root = 'v0/ui/';
      var url_base_user = 'v0/';
      var DashboardService = {};
      var apiHost = APIBaseUrl;
      var interveneApiHost = Config.interveneMeaAPIBaseUrl;
      
       
      
      // DashboardService.transactionalTemplate = function (param,botType) {
      //         // apiHost = APIBaseUrl ;
      //   // let url =   "v0/ui/mca-bot/template-summary-list/?search=" +param.search
      // //   if(botType=='mca'){
      // //     console.log("mca++",botType);
      // //   url =   "v0/ui/mca-bot/template-summary-list/?search=" +param.search
      // //   apiHost = APIBaseUrl;
      // //   }
      // let url =""

      //   if(botType=='mea'){
      //     console.log("mea++",botType);
      //     url =   "v0/ui/mea-bot/template-summary-list/?search" +param.search
      //     apiHost =  interveneApiHost; 
      //   }
      //   if(botType=='mca'){
      //     console.log("mca++",botType);
      //       url =   "v0/ui/mca-bot/template-summary-list/?search=" +param.search
      //       apiHost = APIBaseUrl;
      //   }
      //   return $http.get(apiHost + url)
      //   .then(function onSuccess(response) {
         
      //      return response

      //   })
      //   .catch(function onError(response) {
      //      return response
      //   });
      // DashboardService.transactionalTemplateSummaryMca = function (param) {
      //   let url="v0/ui/mca-bot/template-summary-list/?search=" +param.search
      //   return machadaloHttp.get( url);
      // }
      DashboardService.transactionalTemplateSummaryMea = function (param) {
        let url="v0/ui/mea-bot/template-summary-list/?search=" +param.search
        apiHost = interveneApiHost;
        // return $http.get(url);
        console.log("service")
        return $http.get(interveneApiHost + url);
      }
      DashboardService.transactionalTemplateDetail = function (param){
        let url="v0/ui/mea-bot/template-user-summary-list/?template_id="+ param.template_id+ "&next_page=" + param.next_page+'&search=' + param.search;
        apiHost = interveneApiHost;
        return $http.get(interveneApiHost + url);

      }     

      DashboardService.transactionalTemplateSummaryDownload = function (param) {
        let url ="v0/ui/mea-bot/download-template-user-summary/?template_id="+param.template_id;
        apiHost = interveneApiHost;
        return $http.get(interveneApiHost + url);
      }

      DashboardService.transactionalTemplateDatewiseDetail = function (param){
        let url="v0/ui/mea-bot/template-date-wise-summary/?template_id="+ param.template_id+ "&start_date="+param.start_date+"&end_date="+param.end_date+"&next_page=" + param.next_page;
        apiHost = interveneApiHost;
        return $http.get(interveneApiHost + url);

      }

      DashboardService.transactionalTemplateUserDetail = function (param){
        let url="v0/ui/mea-bot/template-user-summary-list/?template_id="+ param.template_id+ 
                "&date="+param.date+"&next_page="+param.next_page;
                apiHost = interveneApiHost;
                return $http.get(interveneApiHost + url);

      }

      DashboardService.formUpload= function (param) {
        let url="" +param.template_id
        apiHost = interveneApiHost;
        return $http.get(interveneApiHost + url);
      }



        return DashboardService;



    }]);
