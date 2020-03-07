angular.module('machadaloCommon')
.factory('machadaloHttp', ['$http', '$rootScope', '$location', function($http, $rootScope, $location) {
   var machadaloHttp = {};
   machadaloHttp.baseURL = APIBaseUrl;

   var extendHeaders = function(config) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = 'JWT ' + $rootScope.globals.currentUser.token;
   }
   var stopLoop = true;
   angular.forEach(['get', 'delete', 'head', 'jsonp'], function (name) {
      machadaloHttp[name] = function(url, config) {
         config = config || {};
         extendHeaders(config);
         let promise = $http[name](machadaloHttp.baseURL + url, config);
        promise.then(function (response) {
        }, function (reason) {
          if(stopLoop) {
           if(reason.status == 403){
              alert("Session has expired, please login again");
              $location.path('/login');
              localStorage.clear();
              stopLoop = false;
           }
         }
        });
         return promise;
      };
   });

   angular.forEach(['post', 'put'], function (name) {
      machadaloHttp[name] = function(url, data, config) {
         config = config || {};
         extendHeaders(config);
         let promise = $http[name](machadaloHttp.baseURL + url, data, config);
          promise.then(function (response) {
          }, function (reason) {
            if(stopLoop) {
             if(reason.status == 403){
                alert("Session has expired, please login again");
                $location.path('/login');
                localStorage.clear();
                stopLoop = false;
             }
           }
          });
          return promise;
      };
   });

   return machadaloHttp;
}])
