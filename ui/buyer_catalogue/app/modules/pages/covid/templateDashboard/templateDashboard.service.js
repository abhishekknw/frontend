'use strict';


angular.module('catalogueApp')
  .factory('templateDashboardService', ['machadaloHttp', '$stateParams', '$rootScope', '$routeParams', '$location', 
    function (machadaloHttp,  $stateParams, $scope, $rootScope, $routeParams, $location) {

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
      DashboardService.transactionalTemplateSummaryMca = function (param) {
        let url="v0/ui/mca-bot/template-summary-list/?search=" +param.search
        return machadaloHttp.get( url);
      }
     
      DashboardService.transactionalTemplateDatewiseDetail = function (param){
        let url="v0/ui/mca-bot/template-date-wise-summary/?template_id="+ param.template_id+ "&start_date="+param.start_date+"&end_date="+param.end_date+"&next_page=" + param.next_page;
        // alert("template")
      //   if (param.search) {
      //     url += '&search=' + param.search
      //  }
      console.log(param.template_id,'777')
      return machadaloHttp.get( url);

      }

      DashboardService.transactionalTemplateUserDetail = function (param){
        let url="v0/ui/mca-bot/template-user-summary-list/?template_id="+ param.template_id+ 
                "&date="+param.date+"&next_page="+param.next_page+"&search="+param.search;
 

        return machadaloHttp.get( url);

      }

      // DashboardService.transactionalTemplateDetail = function (botType) {
      //   // let url =   "v0/ui/mca-bot/template-user-summary-list/" 
      //   // return machadaloHttp.get( url);
      //   let url =""
      //   if(botType=='mca'){
      //    url =   "v0/ui/mca-bot/template-user-summary-list/" 
      //   apiHost = APIBaseUrl;
      //   }
      //  if(botType=='mea'){
      //     url =   "v0/ui/mea-bot/template-user-summary-list/"
      //     apiHost =  interveneApiHost; 
      //   }
      //   return  $http.get(url)
      //   .then(function onSuccess(response) {
      //      return response
      //   })
      //   .catch(function onError(response) {
      //      return response
      //   }); 
      // }


      DashboardService.transactionalTemplateSummaryDownload = function (param) {
        // let url = apiHost +  "v0/ui/mca-bot/download-template-summary/";
        let url =  "v0/ui/mca-bot/download-template-user-summary/?template_id="+param.template_id;
        return machadaloHttp.get(url);
      }

      DashboardService.formUpload= function (param) {
        let url="" +param.template_id
        return machadaloHttp.get( url);
      }

      DashboardService.getTemplateTabData= function (page,search,status,campaign) {
        let url="v0/ui/template/view-template/?next_page="+page+"&search="+search+"&status="+status+"&campaign_id="+campaign;
        return machadaloHttp.get( url);
      }
      DashboardService.uploadSendTemplate= function (id,formdata) {
        var url = "v0/ui/template/send-template-by-sheet/?id="+id;
        //var token = $rootScope.globals.currentUser.token;
        var config = {
          "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            // "headers": {
            //   "Authorization": "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6ImFkbWluQG1hY2hhZGFsby5jb20iLCJ1c2VybmFtZSI6InZpZGhpZGV2ZWxvcG1lbnQiLCJuYW1lIjoiQWRtaW4iLCJleHAiOjE2NTk2MTY3NjcsIm9yaWdfaWF0IjoxNjU5NTMwMzY3fQ.W1Dekgi_i4-YmxcMj0sfX__vqYdNgPnT9Mdqla44t18"
            // }
          };
        return machadaloHttp.post(url,formdata,config);
      }

        return DashboardService;



    }]);
