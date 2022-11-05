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

      DashboardService.transactionalTemplateSummaryMca = function (param) {
        let url="v0/ui/mca-bot/template-summary-list/?search=" +param.search
        return machadaloHttp.get( url);
      }
     
      DashboardService.transactionalTemplateDatewiseDetail = function (param){
        let url="v0/ui/mca-bot/template-date-wise-summary/?template_id="+ param.template_id+ "&start_date="+param.start_date+"&end_date="+param.end_date+"&next_page=" + param.next_page;
      return machadaloHttp.get( url);

      }

      DashboardService.transactionalTemplateUserDetail = function (param){
        let url="v0/ui/mca-bot/template-user-summary-list/?template_id="+ param.template_id+ 
                "&date="+param.date+"&next_page="+param.next_page+"&search="+param.search;
 

        return machadaloHttp.get( url);

      }

      DashboardService.transactionalTemplateSummaryDownload = function (param) {
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
      DashboardService.createTemplate= function (data) {
        let url="v0/ui/template/";
        return machadaloHttp.post(url,{data:data});
      }

      DashboardService.sendOptinUserFile = function(data,token,baseUrl){
        let formdata = new FormData();
        let myHeaders = new Headers();
        myHeaders.append("Authorization",'JWT ' + token)
        formdata.append("excel_file", data);
        let requestOptions = {
          headers: myHeaders,
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };
        let url = baseUrl+"v0/ui/mca-bot/optin-users/";
        return fetch(url,requestOptions);
      }
        return DashboardService;



    }]);
