angular.module('machadaloPages')
.controller('forgotPasswordCtrl',
    ['$scope', '$rootScope', '$window', '$location', 'AuthService','$state','userService','constants','AuthService','vcRecaptchaService',
    function ($scope, $rootScope, $window, $location, AuthService, $state,userService,constants, AuthService, vcRecaptchaService) {
        AuthService.Clear();

        $scope.error = false;
        $scope.success = false;
       
        $scope.resetPassword = function(){
          $scope.loadingSpinner = true;
          var url = $location.host();
          $scope.host = url;
            
           AuthService.ForgotPassword($scope.userEmail,$scope.host,$location.protocol(), function(response) {
            $scope.loadingSpinner = false;
             if(response.code && response.url){
              swal("Success!",response.msg,constants.success);
              $scope.success = response.msg;
              $scope.error = false
             } else {
              swal(constants.name,constants.errorMsg,constants.error);
              $scope.error = response.message;
              $scope.success = false;
             }
        });
        }
    }]);
