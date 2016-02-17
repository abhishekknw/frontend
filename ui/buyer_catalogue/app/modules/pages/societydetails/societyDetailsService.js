'use strict';

/**
 * @ngdoc function
 * @name machadaloPages.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the machadaloPages
 */

angular.module('machadaloPages')
.factory('societyDetailsService', ['machadaloHttp','$stateParams','$rootScope','$routeParams', '$location',
  function (machadaloHttp, $stateParams, $rootScope, $routeParams, $location) {

  //var url_base = 'http://machadalocore.ap-southeast-1.elasticbeanstalk.com/';
  var url_base = "v0/ui/";
	var societyDetailsService = {};

   societyDetailsService.getSociety = function (id) {
      var url = url_base + "society/" + id;
      return machadaloHttp.get(url);
   };

   societyDetailsService.processParam = function(){
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

  return societyDetailsService;
}]);
