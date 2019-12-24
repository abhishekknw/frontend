'use strict';
angular.module('catalogueApp')
.factory('leadDateService', ['machadaloHttp','$stateParams','$rootScope','$routeParams', '$location', '$http',
 function (machadaloHttp, $stateParams, $rootScope, $routeParams, $location, $http) {

  var url_base_user = 'v0/';
  var url_base = 'v0/ui/';
  var url_base_website = 'v0/ui/website/';
  var leadDateService = {};

  leadDateService.createUser = function(data){
    var url = url_base + "create-dummy-proposal/";
    return machadaloHttp.post(url,data);
  }
   return leadDateService;
   }]);
