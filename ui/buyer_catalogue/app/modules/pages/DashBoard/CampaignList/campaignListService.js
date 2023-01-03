'use strict';

angular.module('catalogueApp')
.factory('campaignListService', ['machadaloHttp','$stateParams','$window','$rootScope','$routeParams', '$location', '$http',

function (machadaloHttp, $stateParams, $rootScope,$window, $routeParams, $location, $http) {

  var base_url = 'v0/ui/';
  var url_base = 'v0/ui/website/';
  var campaignListService = {};

  campaignListService.getCampaignDetails = function(assigned_by,userId,fetch_all,page,search){
    var url = url_base + "campaign-assignment/?include_assigned_by="+ assigned_by +  "&to="+userId + "&fetch_all=" + fetch_all +"&next_page="+page+"&search="+search;
      return machadaloHttp.get(url);
    }

  campaignListService.getAllCampaignDetails = function(fetch_all){
    var url = url_base + "campaign-assignment/?fetch_all=" + fetch_all;
      return machadaloHttp.get(url);
    }

  campaignListService.downloadSheet = function(campaignId){
    var url = base_url + "leads/generate-campaign-hash/" + campaignId + "/";
      return machadaloHttp.get(url);
  }

  campaignListService.sendEmail = function(campaignId,email, emailType){
    var url = url_base + emailType + "/" + campaignId + "/";
    if (email) {
      url = url + "?email=" + email;
    }
    return machadaloHttp.get(url);
  }

  campaignListService.getCampaignWiseSummary = function(){
    var url = url_root  + "campaign/campaign-wise-summary/";
    return machadaloHttp.get(url);
  }


  
  campaignListService.addComment = function(campaignId, data){
    var url = url_base +  campaignId + "/comment/";
    return machadaloHttp.post(url,data);
  }

  campaignListService.viewComments = function(campaignId, spaceId, relatedTo){
    var url = url_base +  campaignId + "/comment/?related_to=" + relatedTo;
    return machadaloHttp.get(url);
  }

  campaignListService.getSuspenseData = function(fromDate,toDate){
 
     var url = base_url + "b2b/suspance-leads/?start_date=" + fromDate + "&end_date=" + toDate;
     $window.open(Config.APIBaseUrl + "b2b/suspance-leads/?start_date=" + fromDate + "&end_date=" + toDate);
       return machadaloHttp.get(url);
  }

  campaignListService.suspenseCount = function(fromDate,toDate){
    var url = base_url + "b2b/suspance-leads-count/?start_date=" + fromDate.getFullYear() +'-'+ JSON.parse(fromDate.getMonth() + 1) +'-'+  fromDate.getDate() + "&end_date=" +  toDate.getFullYear() +'-'+ JSON.parse(toDate.getMonth() + 1) +'-'+  toDate.getDate();
      return machadaloHttp.get(url);
 }

 campaignListService.getAllSuspenseLead = function(){
  var url = base_url + "b2b/suspense-leads/";
    return machadaloHttp.get(url);
  }


  return campaignListService;
}]);
