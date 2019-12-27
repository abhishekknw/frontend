'use strict';
angular.module('catalogueApp')
.factory('resetPasswordService', ['machadaloHttp','$stateParams','$rootScope','$routeParams', '$location', '$http',
 function (machadaloHttp, $stateParams, $rootScope, $routeParams, $location, $http) {

   var url_base_user = 'v0/';
   var resetPasswordService = {};
   var apiHost = APIBaseUrl;
   resetPasswordService.ResetPassword = function(data){
     var url = url_base_user + "v0/ui/setResetPassword/";
     return machadaloHttp.get(url,data);
   }
   return resetPasswordService;
   }]);
