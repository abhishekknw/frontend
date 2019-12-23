// angular.module('catalogueApp')
//   .controller('leadDataCtrl',
//     ['$scope', '$rootScope', '$window', '$location', '$routeParams','AuthService','pagesService', 'resetPasswordService', '$stateParams', 'commonDataShare', 'constants', '$timeout', 'Upload', 'cfpLoadingBar', 'permissions',
//       function ($scope, $rootScope, $window, $location, $routeParams,AuthService,pagesService, resetPasswordService, $stateParams, commonDataShare, constants, $timeout, Upload, cfpLoadingBar, permissions) {


angular.module('machadaloPages')
  .controller('leadDataCtrl',
    function ($scope, $rootScope, $window, $location, pagesService, leadDateService, constants, Upload, commonDataShare, constants, $timeout, AuthService, $state, permissions) {
      $scope.model = {};
      $scope.isValid = false;
      $scope.getOrganisations = function () {
        $window.localStorage.account_proposals = null;
        var orgId = $rootScope.globals.userInfo.profile.organisation.organisation_id;
        pagesService.getOrganisations(orgId)
          .then(function (response) {
            $scope.organisations = response.data.data;
            $scope.loading = response.data.data;
          })
          .catch(function onError(response) {
            commonDataShare.showErrorMessage(response);
            //  swal(constants.name,constants.errorMsg,constants.error);
          });
      };

      $scope.getAccounts = function () {
        pagesService.getAccounts($scope.model.organisation_id)
          .then(function onSuccess(response) {
            console.log(response);
            $scope.accounts = response.data.data;
            $scope.display = true;
            $scope.loading = response.data.data;
          }).catch(function onError(response) {
            console.log(response);
          })
      }

      $scope.uploadFiles = function (file) {
        $scope.model.file = file;

      }

      $scope.submitLead = function () {
        leadDateService.createUser($scope.model)
          .then(function onSuccess(response) {
            console.log("Successful");
            swal(constants.name, constants.createUser_success, constants.success);
            // alert("Successfully Created");
          })
          .catch(function onError(response) {
            commonDataShare.showErrorMessage(response);
            // swal(constants.name,constants.errorMsg,constants.error);
            // alert("Error Occured");
          });
      }

    });
