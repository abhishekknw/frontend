'use strict';

/**
 * @ngdoc function
 * @name machadaloPages.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the machadaloPages
 */

angular.module('machadaloPages')
.factory('newsocietyDetailService', ['machadaloHttp','$stateParams','$rootScope','$routeParams', '$location',
  function (machadaloHttp, $stateParams, $rootScope, $routeParams, $location) {

  var url_base = "v0/ui/";
	var newsocietyDetailService = {};

   newsocietyDetailService.getSociety = function (id,supplierTypeCode) {
      var url = url_base + "supplier/" + id + "/image_details/?supplierTypeCode=" + supplierTypeCode;;
      return machadaloHttp.get(url);
   };

  //  newsocietyDetailService.get_inventory_summary = function(id){
  //   var url = url_base + "society/" + id + "/inventory_summary/";
  //   return machadaloHttp.get(url);
  //  };

   newsocietyDetailService.get_inventory_summary = function(id, supplierTypeCode){
     var url = url_base + "society/" + id + "/inventory_summary/?supplierTypeCode=" + supplierTypeCode;
     return machadaloHttp.get(url);
   };

   newsocietyDetailService.getSocietyList = function(data) {
     var url = url_base + "society/filterList/";
     return machadaloHttp.post(url, data);
   };

   newsocietyDetailService.getSocietyIds = function(){
      var url = url_base + "society/societyIds/";
      return machadaloHttp.get(url)
   }

   newsocietyDetailService.processParam = function(){
    if($stateParams.campaignId){
      $rootScope.campaignId = $stateParams.campaignId;
    }else {
      $rootScope.campaignId = null;
     }

     if($stateParams.societyId){
      $rootScope.societyId = $stateParams.societyId;
    }else {
      $rootScope.societyId = null;
    }
   };

   newsocietyDetailService.getShortlistedSocietyCount = function(campaign_id){
      var url = url_base + "website/campaign/" + campaign_id + "/society/count/";
      return machadaloHttp.get(url)
   }

   //for adding shortlisted societies
   newsocietyDetailService.addShortlistedSociety = function(campaign_id, society_id){
     var url = url_base + "website/campaign/society/shortlist/";
     var data = {campaign_id, society_id};
     return machadaloHttp.post(url, data);
   }
  return newsocietyDetailService;
}]);
