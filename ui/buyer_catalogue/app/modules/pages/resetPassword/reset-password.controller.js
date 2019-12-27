angular.module('catalogueApp')
  .controller('resetPasswordCtrl',
    ['$scope', '$rootScope', '$window', '$location', '$routeParams','AuthService', 'resetPasswordService', '$stateParams', 'commonDataShare', 'constants', '$timeout', 'Upload', 'cfpLoadingBar', 'permissions',
      function ($scope, $rootScope, $window, $location, $routeParams,AuthService, resetPasswordService, $stateParams, commonDataShare, constants, $timeout, Upload, cfpLoadingBar, permissions) {


        console.log("Hello passwrod change World");
        $scope.model = {};
        $scope.isValid = false;
        $scope.passwordError = constants.password_error;
      
        $scope.resetPassword = function () {
          var url = $location.url().split("/");
          if (url[2]) {
            $scope.model.code = url[2];
          }
          if (url[3]) {
            $scope.model.email = url[3];
          }
            $scope.loadingSpinner = true;
            AuthService.ResetPassword($scope.model, function(response) {
              $scope.loadingSpinner = false;
               if(response.status == true){
                swal("Success!",response.data,constants.success);
                $location.path("/login");
               } else {
                commonDataShare.showErrorMessage(response);
               }
          });
        }

        

        $scope.validatePassword = function () {
          if ($scope.model.password == $scope.model.confirm_password)
            $scope.isValid = true;
          else
            $scope.isValid = false;
        }
      }]);
