'use strict';
angular.module('catalogueApp')
.factory('changePasswordService', ['machadaloHttp','$stateParams','$rootScope','$routeParams', '$location', '$http',
 function (machadaloHttp, $stateParams, $rootScope, $routeParams, $location, $http) {

   changePasswordService.changePassword = function(id,data){
     var url = url_base_user + "user/" + id + "/change_password/";
     return machadaloHttp.post(url,data);
   }

   
   return changePasswordService;
   }]);
