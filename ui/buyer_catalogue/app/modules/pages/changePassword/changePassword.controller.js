angular.module('catalogueApp')
.controller('changePswdCtrl',
    ['$scope', '$rootScope', '$window', '$location','societyDetailsViewService','$stateParams','commonDataShare','constants','$timeout','Upload','cfpLoadingBar','permissions',
    function ($scope, $rootScope, $window, $location, societyDetailsViewService, $stateParams,commonDataShare,constants,$timeout,Upload,cfpLoadingBar, permissions) {


    console.log("Hello passwrod change World");


        $scope.changePassword = function(){
          var data = {
            password : $scope.userInfo.password,
          }
          changePasswordService.changePassword($scope.userInfo.id,data)
          .then(function onSuccess(response){
            console.log(response);
            $scope.userInfo = {};
            commonDataShare.closeModal('#passwordModal');
            swal(constants.name,constants.changePassword_success,constants.success);
          }).catch(function onError(response){
            console.log(response);
            commonDataShare.showErrorMessage(response);
            // swal(constants.name,constants.errorMsg,constants.error);
          });
        }

        $scope.validatePassword = function(){
          console.log("hello");
          if($scope.model.password == $scope.model.confirm_password)
            $scope.isValid = true;
          else
            $scope.isValid = false;
        }
      }]);
